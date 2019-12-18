package com.bstek.urule.console.servlet.common;

import com.bstek.urule.Utils;
import com.bstek.urule.console.EnvironmentUtils;
import com.bstek.urule.console.User;
import com.bstek.urule.console.repository.Repository;
import com.bstek.urule.console.repository.RepositoryResourceProvider;
import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.model.RepositoryFile;
import com.bstek.urule.console.repository.model.Type;
import com.bstek.urule.console.servlet.RenderPageServletHandler;
import com.bstek.urule.console.servlet.RequestContext;
import com.bstek.urule.dsl.RuleParserLexer;
import com.bstek.urule.dsl.RuleParserParser;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.flow.*;
import com.bstek.urule.model.function.FunctionDescriptor;
import com.bstek.urule.model.library.action.ActionLibrary;
import com.bstek.urule.model.library.action.SpringBean;
import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.model.rule.RuleSet;
import com.bstek.urule.parse.deserializer.*;
import com.bstek.urule.parse.flow.FlowDefinitionParser;
import com.bstek.urule.runtime.BuiltInActionLibraryBuilder;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * 2016年7月25日
 */
public class CommonServletHandler extends RenderPageServletHandler {
    private RepositoryService repositoryService;
    private BuiltInActionLibraryBuilder builtInActionLibraryBuilder;
    private List<Deserializer<?>> deserializers = new ArrayList<>();
    private List<FunctionDescriptor> functionDescriptors = new ArrayList<>();

    @Override
    public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = retriveMethod(req);
        if (method != null) {
            invokeMethod(method, req, resp);
        } else {
            throw new ServletException("Unsupport this operation.");
        }
    }

    public void findRuleByKey(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        List<Rule> ruleList = new ArrayList<>();

        String ruleKey = req.getParameter("ruleKey");
        String projectName = req.getParameter("projectName");
        User user = EnvironmentUtils.getLoginUser(new RequestContext(req, resp));
        FileType[] types = new FileType[]{FileType.RulesetLib};

        Repository repo = repositoryService.loadRepository(projectName, user, false, types, "");

        List<RepositoryFile> repositoryFileList = fetchRsl(repo.getRootFile());
        // 遍历文件
        for (RepositoryFile repositoryFile : repositoryFileList) {
            try {
                InputStream inputStream = null;
                inputStream = repositoryService.readFile(repositoryFile.getFullPath(), null);
                Element element = parseXml(inputStream);

                // 编译文件
                RuleSetDeserializer ruleSetDeserializer = (RuleSetDeserializer) applicationContext.getBean(RuleSetDeserializer.BEAN_ID);
                RuleSet ruleSet = ruleSetDeserializer.deserialize(element);
                inputStream.close();

                // 遍历规则
                for (Rule rule : ruleSet.getRules()) {
                    if (ruleKey.equals(rule.getName())) {
                        ruleList.add(rule);
                    }
                }
            } catch (Exception ex) {
                throw new RuleException(ex);
            }
        }
        writeObjectToJson(resp, ruleList);
    }

    private List<RepositoryFile> fetchRsl(RepositoryFile repositoryFile) {
        List<RepositoryFile> repositoryFileList = new ArrayList<>();
        // 判断文件类型
        if (Type.rule == repositoryFile.getType()) {
            repositoryFileList.add(repositoryFile);
        } else if (repositoryFile.getChildren() != null) {
            for (RepositoryFile repositoryFile1 : repositoryFile.getChildren()) {
                repositoryFileList.addAll(fetchRsl(repositoryFile1));
            }
        }

        return repositoryFileList;
    }

    public void saveFile(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String file = req.getParameter("file");
        String content = req.getParameter("content");
        content = Utils.decodeContent(content);
        String versionComment = req.getParameter("versionComment");
        String beforeComment = req.getParameter("beforeComment");
        String afterComment = req.getParameter("afterComment");
        boolean newVersion = Boolean.parseBoolean(req.getParameter("newVersion"));
        User user = EnvironmentUtils.getLoginUser(new RequestContext(req, resp));

        // 检验文件合规性
        try {
            InputStream inputStream = new ByteArrayInputStream(content.getBytes(StandardCharsets.UTF_8));
            Element element = parseXml(inputStream);
            for (Deserializer<?> des : deserializers) {
                if (des.support(element)) {
                    des.deserialize(element);
                    break;
                }
            }

            // 决策流节点语法校验
            FlowDefinitionParser flowDefinitionParser = applicationContext.getBean(FlowDefinitionParser.class);
            if (flowDefinitionParser.support(element.getName())) {
                FlowDefinition flowDefinition = flowDefinitionParser.parse(element);
                for (FlowNode flowNode : flowDefinition.getNodes()) {
                    if (flowNode instanceof DecisionNode) {
                        DecisionNode decisionNode = (DecisionNode) flowNode;
                        if (DecisionType.Criteria == decisionNode.getDecisionType()) {
                            for (DecisionItem decisionItem : decisionNode.getItems()) {
                                if ("script".equals(decisionItem.getConditionType())) {
                                    List<ErrorInfo> errorInfoList = scriptValidationText(decisionItem.getScript(), "DecisionNode");
                                    if (errorInfoList != null && errorInfoList.size() > 0) {
                                        throw new RuleException(String.format("[%s]决策节点的[%s]流向有语法错误",
                                                decisionNode.getName(), decisionItem.getTo()));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw new RuleException(e);
        }

        // 保存文件
        try {
            repositoryService.saveFile(file, content, newVersion, versionComment, beforeComment, afterComment, user);
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    public void loadReferenceFiles(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getParameter("path");
        path = Utils.decodeURL(path);
        String searchText = buildSearchText(path, req, false);
        try {
            List<String> files = repositoryService.getReferenceFiles(path, searchText);
            searchText = buildSearchText(path, req, true);
            List<String> scriptFiles = repositoryService.getReferenceFiles(path, searchText);
            if (scriptFiles.size() > 0) {
                files.addAll(scriptFiles);
            }
            List<RefFile> refFiles = new ArrayList<>();
            for (String file : files) {
                RefFile ref = new RefFile();
                refFiles.add(ref);
                ref.setPath(file);
                if (file.endsWith(FileType.Ruleset.toString())) {
                    ref.setEditor("/ruleseteditor");
                    ref.setType("决策集");
                } else if (file.endsWith(FileType.UL.toString())) {
                    ref.setEditor("/uleditor");
                    ref.setType("脚本决策集");
                } else if (file.endsWith(FileType.DecisionTable.toString())) {
                    ref.setEditor("/decisiontableeditor");
                    ref.setType("决策表");
                } else if (file.endsWith(FileType.ScriptDecisionTable.toString())) {
                    ref.setEditor("/scriptdecisiontableeditor");
                    ref.setType("脚本决策表");
                } else if (file.endsWith(FileType.DecisionTree.toString())) {
                    ref.setEditor("/decisiontreeeditor");
                    ref.setType("决策树");
                } else if (file.endsWith(FileType.RuleFlow.toString())) {
                    ref.setEditor("/ruleflowdesigner");
                    ref.setType("决策流");
                }
                int pos = file.lastIndexOf("/");
                String name = file;
                if (pos > -1) {
                    name = file.substring(pos + 1);
                }
                ref.setName(name);
            }
            writeObjectToJson(resp, refFiles);
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    private String buildSearchText(String path, HttpServletRequest req, boolean isScript) {
        StringBuilder sb = new StringBuilder();
        if (path.endsWith(FileType.ActionLibrary.toString())) {
            if (isScript) {
                sb.append(req.getParameter("beanLabel"));
                sb.append(".");
                sb.append(req.getParameter("methodLabel"));
            } else {
                sb.append("bean=\"" + req.getParameter("beanName") + "\"");
                sb.append(" bean-label=\"" + req.getParameter("beanLabel") + "\"");
                sb.append(" method-label=\"" + req.getParameter("methodLabel") + "\"");
                sb.append(" method-name=\"" + req.getParameter("methodName") + "\"");
            }
            return sb.toString();
        } else if (path.endsWith(FileType.ConstantLibrary.toString())) {
            if (isScript) {
                sb.append(req.getParameter("constCategoryLabel"));
                sb.append(".");
                sb.append(req.getParameter("constLabel"));
            } else {
                sb.append("const-category=\"" + req.getParameter("constCategoryLabel") + "\"");
                sb.append(" const=\"" + req.getParameter("constName") + "\"");
            }
            return sb.toString();
        } else if (path.endsWith(FileType.ParameterLibrary.toString())) {
            if (isScript) {
                sb.append("参数.");
                sb.append(req.getParameter("varLabel"));
            } else {
                sb.append("var-category=\"参数\"");
                sb.append(" var=\"" + req.getParameter("varName") + "\"");
            }
            return sb.toString();
        } else if (path.endsWith(FileType.VariableLibrary.toString())) {
            if (isScript) {
                sb.append(req.getParameter("varCategory"));
                sb.append(".");
                sb.append(req.getParameter("varLabel"));
            } else {
                sb.append("var-category=\"" + req.getParameter("varCategory") + "\"");
                sb.append(" var=\"" + req.getParameter("varName") + "\"");
            }
            return sb.toString();

        } else {
            throw new RuleException("Unknow file : " + path);
        }
    }

    public void loadResourceTreeData(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = Utils.decodeURL(project);
        String forLib = req.getParameter("forLib");
        String fileType = req.getParameter("fileType");
        String searchFileName = req.getParameter("searchFileName");

        User user = EnvironmentUtils.getLoginUser(new RequestContext(req, resp));
        FileType[] types = null;
        if (StringUtils.isNotBlank(forLib) && forLib.equals("true")) {
            types = new FileType[]{FileType.ActionLibrary, FileType.ConstantLibrary, FileType.VariableLibrary, FileType.ParameterLibrary};
        } else if (StringUtils.isNotBlank(fileType)) {
            String[] fileTypes = fileType.split(",");
            types = new FileType[fileTypes.length];
            for (int i = 0; i < fileTypes.length; i++) {
                types[i] = FileType.valueOf(fileTypes[i]);
            }
        } else {
            types = new FileType[]{FileType.UL, FileType.Ruleset, FileType.RuleFlow, FileType.DecisionTable, FileType.ScriptDecisionTable, FileType.DecisionTree, FileType.Scorecard, FileType.ComplexScorecard};
        }
        try {
            Repository repo = repositoryService.loadRepository(project, user, false, types, searchFileName);
            writeObjectToJson(resp, repo.getRootFile());
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    public void loadFunctions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        writeObjectToJson(resp, functionDescriptors);
    }

    public void scriptValidation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String content = req.getParameter("content");
        String type = req.getParameter("type");
        writeObjectToJson(resp, scriptValidationText(content, type));
    }

    private List<ErrorInfo> scriptValidationText(String content, String type) {
        if (StringUtils.isNotBlank(content)) {
            ScriptType scriptType = ScriptType.valueOf(type);
            ANTLRInputStream antlrInputStream = new ANTLRInputStream(content);
            RuleParserLexer lexer = new RuleParserLexer(antlrInputStream);
            CommonTokenStream steam = new CommonTokenStream(lexer);
            RuleParserParser parser = new RuleParserParser(steam);
            parser.removeErrorListeners();
            ScriptErrorListener errorListener = new ScriptErrorListener();
            parser.addErrorListener(errorListener);
            switch (scriptType) {
                case Script:
                    parser.ruleSet();
                    break;
                case DecisionNode:
                    parser.condition();
                    break;
                case ScriptNode:
                    parser.actions();
            }
            return errorListener.getInfos();
        }

        return new ArrayList<>();
    }

    public void loadXml(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Object> result = new ArrayList<>();
        String files = req.getParameter("files");
        files = Utils.decodeURL(files);
        boolean isaction = false;
        if (files != null) {
            if (files.startsWith("builtinactions")) {
                isaction = true;
            } else {
                String[] paths = files.split(";");
                for (String path : paths) {
                    if (path.startsWith(RepositoryResourceProvider.JCR)) {
                        path = path.substring(4);
                    }
                    String[] subpaths = path.split(",");
                    path = subpaths[0];
                    String version = null;
                    if (subpaths.length == 2) {
                        version = subpaths[1];
                    }
                    try {
                        InputStream inputStream = null;
                        if (StringUtils.isEmpty(version)) {
                            inputStream = repositoryService.readFile(path, null);
                        } else {
                            inputStream = repositoryService.readFile(path, version);
                        }
                        Element element = parseXml(inputStream);
                        for (Deserializer<?> des : deserializers) {
                            if (des.support(element)) {
                                result.add(des.deserialize(element));
                                if (des instanceof ActionLibraryDeserializer) {
                                    isaction = true;
                                }
                                break;
                            }
                        }
                        inputStream.close();
                    } catch (Exception ex) {
                        throw new RuleException(ex);
                    }
                }
            }
        }
        if (isaction) {
            List<SpringBean> beans = builtInActionLibraryBuilder.getBuiltInActions();
            if (beans.size() > 0) {
                ActionLibrary al = new ActionLibrary();
                al.setSpringBeans(beans);
                result.add(al);
            }
        }
        writeObjectToJson(resp, result);
    }

    protected Element parseXml(InputStream stream) {
        SAXReader reader = new SAXReader();
        Document document;
        try {
            document = reader.read(stream);
            return document.getRootElement();
        } catch (DocumentException e) {
            throw new RuleException(e);
        }
    }

    public void setBuiltInActionLibraryBuilder(BuiltInActionLibraryBuilder builtInActionLibraryBuilder) {
        this.builtInActionLibraryBuilder = builtInActionLibraryBuilder;
    }

    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @Override
    public String url() {
        return "/common";
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        super.setApplicationContext(applicationContext);
        ActionLibraryDeserializer actionLibraryDeserializer = (ActionLibraryDeserializer) applicationContext.getBean(ActionLibraryDeserializer.BEAN_ID);
        VariableLibraryDeserializer variableLibraryDeserializer = (VariableLibraryDeserializer) applicationContext.getBean(VariableLibraryDeserializer.BEAN_ID);
        ConstantLibraryDeserializer constantLibraryDeserializer = (ConstantLibraryDeserializer) applicationContext.getBean(ConstantLibraryDeserializer.BEAN_ID);
        RuleSetDeserializer ruleSetDeserializer = (RuleSetDeserializer) applicationContext.getBean(RuleSetDeserializer.BEAN_ID);
        DecisionTableDeserializer decisionTableDeserializer = (DecisionTableDeserializer) applicationContext.getBean(DecisionTableDeserializer.BEAN_ID);
        ScriptDecisionTableDeserializer scriptDecisionTableDeserializer = (ScriptDecisionTableDeserializer) applicationContext.getBean(ScriptDecisionTableDeserializer.BEAN_ID);
        DecisionTreeDeserializer decisionTreeDeserializer = (DecisionTreeDeserializer) applicationContext.getBean(DecisionTreeDeserializer.BEAN_ID);
        ScorecardDeserializer scorecardDeserializer = (ScorecardDeserializer) applicationContext.getBean(ScorecardDeserializer.BEAN_ID);
        ComplexScorecardDeserializer complexScorecardDeserializer = (ComplexScorecardDeserializer) applicationContext.getBean(ComplexScorecardDeserializer.BEAN_ID);

        ParameterLibraryDeserializer parameterLibraryDeserializer = (ParameterLibraryDeserializer) applicationContext.getBean(ParameterLibraryDeserializer.BEAN_ID);
        deserializers.add(actionLibraryDeserializer);
        deserializers.add(variableLibraryDeserializer);
        deserializers.add(constantLibraryDeserializer);
        deserializers.add(ruleSetDeserializer);
        deserializers.add(decisionTableDeserializer);
        deserializers.add(scriptDecisionTableDeserializer);
        deserializers.add(decisionTreeDeserializer);
        deserializers.add(parameterLibraryDeserializer);
        deserializers.add(scorecardDeserializer);
        deserializers.add(complexScorecardDeserializer);

        Collection<FunctionDescriptor> coll = applicationContext.getBeansOfType(FunctionDescriptor.class).values();
        for (FunctionDescriptor fun : coll) {
            if (fun.isDisabled()) {
                continue;
            }
            functionDescriptors.add(fun);
        }
    }
}
