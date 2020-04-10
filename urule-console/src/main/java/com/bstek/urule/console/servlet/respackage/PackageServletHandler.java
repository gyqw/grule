package com.bstek.urule.console.servlet.respackage;

import static com.bstek.urule.console.repository.BaseRepositoryService.RES_PACKGE_FILE;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bstek.urule.Configure;
import com.bstek.urule.KnowledgePackageReceiverServlet;
import com.bstek.urule.Utils;
import com.bstek.urule.builder.KnowledgeBase;
import com.bstek.urule.builder.KnowledgeBuilder;
import com.bstek.urule.builder.ResourceBase;
import com.bstek.urule.console.EnvironmentUtils;
import com.bstek.urule.console.User;
import com.bstek.urule.console.repository.ClientConfig;
import com.bstek.urule.console.repository.ExternalRepository;
import com.bstek.urule.console.repository.PackageConfig;
import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.console.repository.model.ResourcePackage;
import com.bstek.urule.console.servlet.RenderPageServletHandler;
import com.bstek.urule.console.servlet.RequestContext;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.GeneralEntity;
import com.bstek.urule.model.flow.FlowDefinition;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.library.variable.Variable;
import com.bstek.urule.model.library.variable.VariableCategory;
import com.bstek.urule.model.rule.RuleInfo;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgePackageWrapper;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.KnowledgeSessionFactory;
import com.bstek.urule.runtime.cache.CacheUtils;
import com.bstek.urule.runtime.response.ExecutionResponse;
import com.bstek.urule.runtime.response.ExecutionResponseImpl;
import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.response.NodeExecutionResponse;
import java.awt.Color;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Jacky.gao
 * @author fred 2016年6月3日
 */
public class PackageServletHandler extends RenderPageServletHandler {

    private Logger logger = LoggerFactory.getLogger(PackageServletHandler.class);

    public static final String KB_KEY = "_kb";
    public static final String VCS_KEY = "_vcs";
    public static final String IMPORT_EXCEL_DATA = "_import_excel_data";
    public static final String EXPORT_EXCEL_TEST_DATA = "_export_excel_test_data";

    private RepositoryService repositoryService;
    private KnowledgeBuilder knowledgeBuilder;
    private HttpSessionKnowledgeCache httpSessionKnowledgeCache;

    @Override
    public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = retriveMethod(req);
        if (method != null) {
            invokeMethod(method, req, resp);
        } else {
            VelocityContext context = new VelocityContext();
            context.put("contextPath", req.getContextPath());
            resp.setContentType("text/html");
            resp.setCharacterEncoding("utf-8");
            Template template = ve.getTemplate("html/package-editor.html", "utf-8");
            PrintWriter writer = resp.getWriter();
            template.merge(context, writer);
            writer.close();
        }
    }

    public void loadPackages(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = project.replace(".rp", "");
        project = Utils.decodeURL(project);
        List<ResourcePackage> packages = repositoryService.loadProjectResourcePackages(project);
        writeObjectToJson(resp, packages);
    }

    public void loadPackageConfig(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = project.split(":")[0];
        project = project.replace(".rp", "");
        project = Utils.decodeURL(project);
        PackageConfig packageConfig = repositoryService.loadPackageConfigs(project);
        writeObjectToJson(resp, packageConfig);
    }

    @SuppressWarnings("unchecked")
    public void exportExcelTemplate(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        List<VariableCategory> variableCategories = (List<VariableCategory>) httpSessionKnowledgeCache
            .get(req, VCS_KEY);
        if (variableCategories == null) {
            KnowledgeBase knowledgeBase = buildKnowledgeBase(req);
            variableCategories = knowledgeBase.getResourceLibrary().getVariableCategories();
        }
        SXSSFWorkbook wb = new SXSSFWorkbook();
        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();
        Color c = new Color(147, 208, 15);
        XSSFColor xssfColor = new XSSFColor(c);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFillForegroundColor(xssfColor);
        for (VariableCategory vc : variableCategories) {
            buildSheet(wb, vc, style);
        }
        resp.setContentType("application/x-xls");
        resp.setHeader("Content-Disposition", "attachment; filename=urule-batch-test-template.xlsx");
        OutputStream outputStream = resp.getOutputStream();
        wb.write(outputStream);

        outputStream.flush();
        outputStream.close();
    }

    @SuppressWarnings("unchecked")
    public void exportExcelData(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        List<VariableCategory> variableCategories = (List<VariableCategory>) httpSessionKnowledgeCache
            .get(req, VCS_KEY);

        if (variableCategories == null) {
            KnowledgeBase knowledgeBase = buildKnowledgeBase(req);
            variableCategories = knowledgeBase.getResourceLibrary().getVariableCategories();
        }

        // 获取历史数据
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String startDateStr = req.getParameter("startTime");
        String endDateStr = req.getParameter("endTime");
        Date startDate = sdf.parse(startDateStr);
        Date endDate = sdf.parse(endDateStr);
        String projectName = req.getParameter("projectName");
        String packageName = req.getParameter("packageName");
        JSONArray data = applicationContext.getBean(ExternalRepository.class)
            .findDataByDate(startDate, endDate, projectName, packageName);

        SXSSFWorkbook wb = new SXSSFWorkbook();
        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();
        Color c = new Color(147, 208, 15);
        XSSFColor xssfColor = new XSSFColor(c);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFillForegroundColor(xssfColor);

        for (VariableCategory vc : variableCategories) {
            buildSheet(wb, vc, style, data);
        }

        resp.setContentType("application/x-xls");
        resp.setHeader("Content-Disposition", "attachment; filename=urule-batch-data.xlsx");
        OutputStream outputStream = resp.getOutputStream();
        wb.write(outputStream);

        outputStream.flush();
        outputStream.close();
    }

    private void buildSheet(SXSSFWorkbook wb, VariableCategory vc, XSSFCellStyle style, JSONArray data) {
        String name = vc.getName();
        Sheet sheet = wb.createSheet(name);
        int rowNum = 0;

        // 表头
        Row row0 = sheet.createRow(rowNum);
        List<Variable> variables = vc.getVariables();
        for (int i = 0; i < variables.size(); i++) {
            sheet.setColumnWidth(i, 4000);
            Cell cell = row0.createCell(i);
            Variable var = variables.get(i);
            cell.setCellValue(var.getLabel());
            cell.setCellStyle(style);
        }

        // 历史数据
        if (data != null) {
            for (Object obj : data.toArray()) {
                rowNum++;

                JSONObject jobj = (JSONObject) obj;
                Object dataSource = jobj.get(vc.getClazz());
                if (dataSource == null) {
                    continue;
                }

                JSONObject dataSourceJobj = (JSONObject) dataSource;
                Row row = sheet.createRow(rowNum);
                for (int i = 0; i < variables.size(); i++) {
                    Cell cell = row.createCell(i);
                    Variable var = variables.get(i);

                    if (dataSourceJobj.get(var.getName()) == null) {
                        continue;
                    }
                    switch (var.getType()) {
                        case Integer:
                            cell.setCellValue(dataSourceJobj.getInteger(var.getName()));
                            break;
                        case Double:
                            cell.setCellValue(dataSourceJobj.getDouble(var.getName()));
                            break;
                        case Long:
                            cell.setCellValue(dataSourceJobj.getLong(var.getName()));
                            break;
                        case BigDecimal:
                            cell.setCellValue(dataSourceJobj.getBigDecimal(var.getName()).doubleValue());
                            break;
                        case String:
                        default:
                            cell.setCellValue(dataSourceJobj.getString(var.getName()));
                    }
                }
            }
        }
    }

    private void buildSheet(SXSSFWorkbook wb, VariableCategory vc, XSSFCellStyle style,
        List<Map<String, Object>> data) {
        String name = vc.getName();
        Sheet sheet = wb.createSheet(name);
        int rowNum = 0;

        // 表头
        Row row0 = sheet.createRow(rowNum);
        List<Variable> variables = vc.getVariables();
        for (int i = 0; i < variables.size(); i++) {
            sheet.setColumnWidth(i, 4000);
            Cell cell = row0.createCell(i);
            Variable var = variables.get(i);
            cell.setCellValue(var.getLabel());
            cell.setCellStyle(style);
        }

        // 输出信息
        if (data != null) {
            for (Map<String, Object> map : data) {
                Map<String, Object> mapItem = (Map<String, Object>) map.get(name);
                rowNum++;
                Row row = sheet.createRow(rowNum);

                for (int i = 0; i < variables.size(); i++) {
                    Cell cell = row.createCell(i);
                    Variable var = variables.get(i);

                    if (mapItem == null || mapItem.get(var.getName()) == null) {
                        continue;
                    }
                    switch (var.getType()) {
                        case Integer:
                            cell.setCellValue((Integer) mapItem.get(var.getName()));
                            break;
                        case Double:
                            cell.setCellValue((Double) mapItem.get(var.getName()));
                            break;
                        case Long:
                            cell.setCellValue((Long) mapItem.get(var.getName()));
                            break;
                        case BigDecimal:
                            cell.setCellValue(((BigDecimal) mapItem.get(var.getName())).doubleValue());
                            break;
                        case String:
                        default:
                            cell.setCellValue((String) mapItem.get(var.getName()));
                    }
                }
            }
        }
    }

    private void buildSheet(SXSSFWorkbook wb, VariableCategory vc, XSSFCellStyle style) {
        String name = vc.getName();
        Sheet sheet = wb.createSheet(name);
        Row row = sheet.createRow(0);
        List<Variable> variables = vc.getVariables();
        for (int i = 0; i < variables.size(); i++) {
            sheet.setColumnWidth(i, 4000);
            Cell cell = row.createCell(i);
            Variable var = variables.get(i);
            cell.setCellValue(var.getLabel());
            cell.setCellStyle(style);
        }
    }

    public void importExcelTemplate(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        List<FileItem> items = upload.parseRequest(req);
        Iterator<FileItem> itr = items.iterator();
        Map<Integer, Map<String, Object>> mapData = null;
        while (itr.hasNext()) {
            FileItem item = itr.next();
            String name = item.getFieldName();
            if (!name.equals("file")) {
                continue;
            }
            InputStream stream = item.getInputStream();
            mapData = parseExcel(stream);
            httpSessionKnowledgeCache.put(req, IMPORT_EXCEL_DATA, mapData);
            stream.close();
            break;
        }
        httpSessionKnowledgeCache.put(req, IMPORT_EXCEL_DATA, mapData);

        mapData = null;
        writeObjectToJson(resp, mapData);
    }

    @SuppressWarnings("resource")
    private Map<Integer, Map<String, Object>> parseExcel(InputStream stream) throws Exception {
        Map<Integer, Map<String, Object>> mapMap = new HashMap<>();
        XSSFWorkbook wb = new XSSFWorkbook(stream);

        // 遍历excel
        for (int i = 0; i < wb.getNumberOfSheets(); i++) {
            XSSFSheet sheet = wb.getSheetAt(i);
            if (sheet == null) {
                continue;
            }

            String name = sheet.getSheetName();
            // 遍历每个变量的数据
            int ii = 0;
            for (Map<String, String> sheetVariable : buildVariables(sheet)) {
                if (mapMap.get(ii) == null) {
                    mapMap.put(ii, new HashMap<String, Object>());
                }
                Map<String, Object> row = mapMap.get(ii);
                row.put(name, sheetVariable);

                ii++;
            }
        }

        return mapMap;
    }

    private List<Map<String, String>> buildVariables(XSSFSheet sheet) {
        Map<Integer, String> headerMap = new HashMap<>();
        List<Map<String, String>> mapList = new ArrayList<>();
        int totalRow = sheet.getLastRowNum();
        XSSFRow headerRow = sheet.getRow(0);
        int totalColumn = headerRow.getLastCellNum();
        Map<String, String> noDataRowMap = new HashMap<>();
        for (int i = 0; i < totalColumn; i++) {
            XSSFCell cell = headerRow.getCell(i);
            String value = cell.getStringCellValue();
            headerMap.put(i, value);
            String headerName = value.replaceAll("\\.", "-");
            noDataRowMap.put(headerName, null);
        }
        for (int i = 1; i <= totalRow; i++) {
            XSSFRow row = sheet.getRow(i);
            if (row == null) {
                continue;
            }
            Map<String, String> map = new HashMap<>();
            mapList.add(map);
            for (int j = 0; j < totalColumn; j++) {
                XSSFCell cell = row.getCell(j);
                String headerName = headerMap.get(j);
                if (headerName == null) {
                    continue;
                }
                if (cell == null) {
                    headerName = headerName.replaceAll("\\.", "-");
                    map.put(headerName, "");
                } else {
                    String value = "";
                    int cellType = cell.getCellType();
                    switch (cellType) {
                        case Cell.CELL_TYPE_STRING:
                            value = cell.getStringCellValue();
                            break;
                        case Cell.CELL_TYPE_BLANK:
                            value = "";
                            break;
                        case Cell.CELL_TYPE_BOOLEAN:
                            value = String.valueOf(cell.getBooleanCellValue());
                            break;
                        case Cell.CELL_TYPE_NUMERIC:
                            value = String.valueOf(cell.getNumericCellValue());
                            break;
                        case Cell.CELL_TYPE_ERROR:
                            value = "";
                            break;
                        case Cell.CELL_TYPE_FORMULA:
                            value = cell.getCellFormula();
                            break;
                    }
                    if (value == null) {
                        value = "";
                    }
                    headerName = headerName.replaceAll("\\.", "-");
                    map.put(headerName, value);
                }
            }
        }
        if (mapList.size() == 0) {
            mapList.add(noDataRowMap);
        }
        return mapList;
    }

    public void loadFlows(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        KnowledgeBase knowledgeBase = (KnowledgeBase) httpSessionKnowledgeCache.get(req, KB_KEY);
        Collection<FlowDefinition> col = knowledgeBase.getFlowMap().values();
        writeObjectToJson(resp, col);
    }

    public void pushKnowledgePackageToClients(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = Utils.decodeURL(project);
        String packageId = project + "/" + Utils.decodeURL(req.getParameter("packageId"));
        if (packageId.startsWith("/")) {
            packageId = packageId.substring(1);
        }
        KnowledgePackage knowledgePackage = CacheUtils.getKnowledgeCache().getKnowledge(packageId);

        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Inclusion.NON_NULL);
        mapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
        mapper.setDateFormat(new SimpleDateFormat(Configure.getDateFormat()));
        StringWriter writer = new StringWriter();
        mapper.writeValue(writer, new KnowledgePackageWrapper(knowledgePackage));
        String content = writer.getBuffer().toString();
        writer.close();
        StringBuffer sb = new StringBuffer();
        List<ClientConfig> clients = repositoryService.loadClientConfigs(project);
        int i = 0;
        for (ClientConfig config : clients) {
            if (i > 0) {
                sb.append("<br>");
            }
            boolean result = pushKnowledgePackage(packageId, content, config.getClient());
            if (result) {
                sb.append("<span class=\"text-info\" style='line-height:30px'>推送到客户端：" + config.getName() + "：" + config
                    .getClient() + " 成功</span>");
            } else {
                sb.append(
                    "<span class=\"text-danger\" style='line-height:30px'>推送到客户端：" + config.getName() + "：" + config
                        .getClient() + " 失败</span>");
            }
            i++;
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("info", sb.toString());
        writeObjectToJson(resp, map);
    }

    private boolean pushKnowledgePackage(String packageId, String content, String client) {
        HttpURLConnection connection = null;
        try {
            if (client.endsWith("/")) {
                client = client.substring(0, client.length() - 1);
            }
            String clientUrl = client + KnowledgePackageReceiverServlet.URL;
            content = "packageId=" + URLEncoder.encode(packageId, "utf-8") + "&content=" + URLEncoder
                .encode(content, "utf-8");
            URL url = new URL(clientUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Charset", "UTF-8");
            connection.setRequestProperty("Accept-Charset", "utf-8");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.connect();
            OutputStream outputStream = connection.getOutputStream();
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(content);
            wr.flush();
            wr.close();
            if (connection.getResponseCode() >= 300) {
                return false;
            }
            InputStream inputStream = connection.getInputStream();
            String result = IOUtils.toString(inputStream, "UTF-8");
            outputStream.close();
            inputStream.close();
            if (!result.equals("ok")) {
                return false;
            }
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public void refreshKnowledgeCache(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = Utils.decodeURL(project);
        String packageId = project + "/" + Utils.decodeURL(req.getParameter("packageId"));
        if (packageId.startsWith("/")) {
            packageId = packageId.substring(1, packageId.length());
        }
        KnowledgeBase knowledgeBase = buildKnowledgeBase(req);
        KnowledgePackage knowledgePackage = knowledgeBase.getKnowledgePackage();
        CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
        Map<String, Object> map = new HashMap<>();
        List<ClientConfig> clients = repositoryService.loadClientConfigs(project);
        if (clients.size() > 0) {
            StringBuffer sb = new StringBuffer();
            int i = 1;
            for (ClientConfig config : clients) {
                if (i > 1) {
                    sb.append("<br>");
                }
                sb.append(config.getName() + "：" + config.getClient());
                i++;
            }
            map.put("clientInfo", sb.toString());
        }
        writeObjectToJson(resp, map);
    }

    public void loadForTestVariableCategories(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        KnowledgeBase knowledgeBase = buildKnowledgeBase(req);
        List<VariableCategory> vcs = knowledgeBase.getResourceLibrary().getVariableCategories();
        httpSessionKnowledgeCache.put(req, VCS_KEY, vcs);
        writeObjectToJson(resp, vcs);
    }

    private KnowledgeBase buildKnowledgeBase(HttpServletRequest req) throws IOException {
        String files = req.getParameter("files");
        files = Utils.decodeURL(files);
        ResourceBase resourceBase = knowledgeBuilder.newResourceBase();
        String[] paths = files.split(";");
        for (String path : paths) {
            String[] subpaths = path.split(",");
            path = subpaths[0];
            String version = null;
            if (subpaths.length > 1) {
                version = subpaths[1];
            }
            resourceBase.addResource(path, version);
        }
        KnowledgeBase knowledgeBase = knowledgeBuilder.buildKnowledgeBase(resourceBase);
        httpSessionKnowledgeCache.remove(req, KB_KEY);
        httpSessionKnowledgeCache.put(req, KB_KEY, knowledgeBase);
        return knowledgeBase;
    }

    public void saveResourcePackages(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = project.split(":")[0];
        project = project.replace(".rp", "");
        String versionComment = req.getParameter("versionComment");
        String beforeComment = req.getParameter("beforeComment");
        String afterComment = req.getParameter("afterComment");

        project = Utils.decodeURL(project);
        String path = project + "/" + RES_PACKGE_FILE;
        String xml = req.getParameter("xml");
        xml = Utils.decodeURL(xml);
        User user = EnvironmentUtils.getLoginUser(new RequestContext(req, resp));
        repositoryService.saveFile(path, xml, true, versionComment, beforeComment, afterComment, user);
    }

    @SuppressWarnings("unchecked")
    private List<VariableCategory> mapToVariableCategories(List<Map<String, Object>> mapList) {
        List<VariableCategory> list = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            VariableCategory category = new VariableCategory();
            list.add(category);
            for (String key : map.keySet()) {
                switch (key) {
                    case "name":
                        category.setName((String) map.get(key));
                        break;
                    case "clazz":
                        category.setClazz((String) map.get(key));
                        break;
                    case "variables":
                        List<Map<String, Object>> variables = (List<Map<String, Object>>) map.get(key);
                        if (variables != null) {
                            for (Map<String, Object> m : variables) {
                                Variable var = new Variable();
                                category.addVariable(var);
                                for (String varName : m.keySet()) {
                                    switch (varName) {
                                        case "name":
                                            var.setName((String) m.get(varName));
                                            break;
                                        case "label":
                                            var.setLabel((String) m.get(varName));
                                            break;
                                        case "type":
                                            var.setType(Datatype.valueOf((String) m.get(varName)));
                                            break;
                                        case "defaultValue":
                                            var.setDefaultValue((String) m.get(varName));
                                            break;
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    public void doBatchTest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        try {
            String flowId = req.getParameter("flowId");

            Map<Integer, Map<String, Map<String, Object>>> data =
                (Map<Integer, Map<String, Map<String, Object>>>) httpSessionKnowledgeCache.get(req, IMPORT_EXCEL_DATA);
            if (data == null) {
                throw new RuleException(
                    "Import excel data for test has expired, please import the excel and try again.");
            }

            // 获取项目变量
            List<VariableCategory> vcs = (List<VariableCategory>) httpSessionKnowledgeCache.get(req, VCS_KEY);
            if (vcs == null) {
                vcs = buildKnowledgeBase(req).getResourceLibrary().getVariableCategories();
            }
            Map<String, VariableCategory> vcmap = new HashMap<>();
            for (VariableCategory vc : vcs) {
                vcmap.put(vc.getName(), vc);
            }

            List<Map<String, Object>> rowList = new ArrayList<>();
            // 遍历每条数据
            for (Map<String, Map<String, Object>> map : data.values()) {
                Map<String, Object> row = new HashMap<>();
                // 遍历每个变量
                for (String name : map.keySet()) {
                    VariableCategory vc = vcmap.get(name);
                    if (vc == null) {
                        continue;
                    }
                    String clazz = vc.getClazz();
                    List<Variable> variables = vc.getVariables();
                    Object entity = null;
                    if (vc.getName().equals(VariableCategory.PARAM_CATEGORY)) {
                        entity = new HashMap<String, Object>();
                    } else {
                        entity = new GeneralEntity(clazz);
                    }
                    buildObject(entity, map.get(name), variables);
                    row.put(name, entity);
                }

                rowList.add(row);
            }

            if (rowList.size() == 0) {
                throw new RuleException("Import data cannot match current knowledge package.");
            }

            KnowledgeBase knowledgeBase = buildKnowledgeBase(req);
            KnowledgePackage knowledgePackage = knowledgeBase.getKnowledgePackage();
            Set<String> flowIdSet = knowledgePackage.getFlowMap().keySet();
            if (flowIdSet.size() > 0) {
                flowId = flowIdSet.iterator().next();
            }

            Map<String, Integer> flowMap = new HashMap<>();
            for (Map<String, Object> row : rowList) {
                // 试算每条数据
                doSingleBatchTest(knowledgePackage, flowId, row, flowMap);
            }

            // 输出测试excel
            SXSSFWorkbook wb = buildExcel(vcs, rowList, flowMap);
            httpSessionKnowledgeCache.put(req, EXPORT_EXCEL_TEST_DATA, wb);

            writeObjectToJson(resp, flowMap);
        } catch (Exception e) {
            logger.error("doBatchTest error", e);
            throw e;
        }
    }

    public void exportBatchTestExcel(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        SXSSFWorkbook wb = (SXSSFWorkbook) httpSessionKnowledgeCache.get(req, EXPORT_EXCEL_TEST_DATA);
        resp.setContentType("application/x-xls");
        resp.setHeader("Content-Disposition", "attachment; filename=urule-test-batch-data.xlsx");
        OutputStream outputStream = resp.getOutputStream();
        wb.write(outputStream);
        outputStream.flush();
        outputStream.close();
    }

    private void doSingleBatchTest(KnowledgePackage knowledgePackage, String flowId, Map<String, Object> row,
        Map<String, Integer> flowMap) {
        long start = System.currentTimeMillis();

        // 获取session
        KnowledgeSession session = KnowledgeSessionFactory.newKnowledgeSession(knowledgePackage);

        Map<String, Object> parameterMap = null;
        for (String name : row.keySet()) {
            Object fact = row.get(name);
            if ((fact instanceof Map) && !(fact instanceof GeneralEntity)) {
                parameterMap = (Map<String, Object>) fact;
            } else {
                session.insert(fact);
            }
        }

        if (!org.springframework.util.StringUtils.isEmpty(flowId)) {
            FlowExecutionResponse flowExecutionResponse;
            if (parameterMap != null) {
                flowExecutionResponse = session.startProcess(flowId, parameterMap);
            } else {
                flowExecutionResponse = session.startProcess(flowId);
            }

            Map<String, Object> result = new HashMap<>();
            // 记录执行节点
            for (NodeExecutionResponse nodeExecutionResponse : flowExecutionResponse.getNodeExecutionResponseList()) {
                String nodeName = nodeExecutionResponse.getDecisionNodeName();
                if (!org.springframework.util.StringUtils.isEmpty(nodeName)) {
                    result.put(nodeName, nodeExecutionResponse.getDecisionNodeResult());
                } else {
                    nodeName = nodeExecutionResponse.getRuleNodeName();
                    result.put(nodeName, 1);
                }

                // 汇总流程图数据
                if (flowMap.get(nodeName) == null) {
                    flowMap.put(nodeName, 0);
                }
                flowMap.put(nodeName, flowMap.get(nodeName) + 1);
            }
            long end = System.currentTimeMillis();
            long elapse = end - start;

            result.put("耗时", elapse);

            row.put("测试结果", result);
        }
    }

    private SXSSFWorkbook buildExcel(List<VariableCategory> vcs, List<Map<String, Object>> resultList,
        Map<String, Integer> flowMap) {
        SXSSFWorkbook wb = new SXSSFWorkbook();

        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();
        Color c = new Color(147, 208, 15);
        XSSFColor xssfColor = new XSSFColor(c);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFillForegroundColor(xssfColor);

        for (VariableCategory vc : vcs) {
            buildSheet(wb, vc, style, resultList);
        }

        // 输出结果表
        String testSheetName = "测试结果";
        Sheet sheet = wb.createSheet(testSheetName);
        // 表头
        Row row0 = sheet.createRow(0);
        List<String> testResultSheetHead = new ArrayList<>();
        testResultSheetHead.add("耗时");
        testResultSheetHead.addAll(flowMap.keySet());
        for (int i = 0; i < testResultSheetHead.size(); i++) {
            sheet.setColumnWidth(i, 4000);
            Cell cell = row0.createCell(i);
            String var = testResultSheetHead.get(i);
            cell.setCellValue(var);
            cell.setCellStyle(style);
        }
        // 内容
        int i = 1;
        for (Map<String, Object> map : resultList) {
            Map<String, Object> testResult = (Map<String, Object>) map.get(testSheetName);
            Row rowx = sheet.createRow(i);
            Cell row1Cell1 = rowx.createCell(0);
            row1Cell1.setCellValue((long) testResult.get("耗时"));
            for (int ii = 1; ii < testResultSheetHead.size(); ii++) {
                Cell cell = rowx.createCell(ii);
                Object cellVal = testResult.get(testResultSheetHead.get(ii));
                cell.setCellValue(String.valueOf(cellVal));
            }

            i++;
        }

        return wb;
    }

    private void buildObject(Object obj, Map<String, Object> map, List<Variable> variables) {
        for (String name : map.keySet()) {
            name = name.replaceAll("-", "\\.");
            if (name.contains(".")) {
                instanceChildObject(obj, name);
            }
            Object value = map.get(name);
            Variable var = null;
            for (Variable variable : variables) {
                if (name.equals(variable.getLabel()) || name.equals(variable.getName())) {
                    var = variable;
                    break;
                }
            }
            if (var == null) {
                throw new RuleException("Variable [" + name + "] not exist.");
            }
            Datatype type = var.getType();
            if (type.equals(Datatype.List) || type.equals(Datatype.Set) || type.equals(Datatype.Map)) {
                continue;
            }
            if (!org.springframework.util.StringUtils.isEmpty(value)) {
                value = type.convert(value);
            } else {
                value = null;
            }
            Utils.setObjectProperty(obj, var.getName(), value);
        }
    }

    @SuppressWarnings({"unchecked"})
    public void doTest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String data = req.getParameter("data");
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> list = mapper.readValue(data, ArrayList.class);
        List<VariableCategory> variableCategories = mapToVariableCategories(list);
        Map<VariableCategory, Object> facts = new HashMap<>();
        for (VariableCategory vc : variableCategories) {
            String clazz = vc.getClazz();
            Object entity = null;
            if (vc.getName().equals(VariableCategory.PARAM_CATEGORY)) {
                entity = new HashMap<String, Object>();
            } else {
                entity = new GeneralEntity(clazz);
            }
            for (Variable var : vc.getVariables()) {
                buildObject(entity, var);
            }
            facts.put(vc, entity);
        }
        String flowId = req.getParameter("flowId");
        long start = System.currentTimeMillis();
        KnowledgeBase knowledgeBase = (KnowledgeBase) httpSessionKnowledgeCache.get(req, KB_KEY);
        if (knowledgeBase == null) {
            knowledgeBase = buildKnowledgeBase(req);
        }
        KnowledgePackage knowledgePackage = knowledgeBase.getKnowledgePackage();
        KnowledgeSession session = KnowledgeSessionFactory.newKnowledgeSession(knowledgePackage);
        Map<String, Object> parameters = null;
        for (Object obj : facts.values()) {
            if (!(obj instanceof GeneralEntity) && (obj instanceof HashMap)) {
                parameters = (Map<String, Object>) obj;
            } else {
                session.insert(obj);
            }
        }
        ExecutionResponse response = null;
        if (StringUtils.isNotEmpty(flowId)) {
            if (parameters != null) {
                response = session.startProcess(flowId, parameters);
            } else {
                response = session.startProcess(flowId);
            }
        } else {
            if (parameters == null) {
                response = session.fireRules();
            } else {
                response = session.fireRules(parameters);
            }
        }
        for (VariableCategory vc : facts.keySet()) {
            Object obj = facts.get(vc);
            if (obj == null) {
                continue;
            }
            if (obj instanceof Map && !(obj instanceof GeneralEntity)) {
                obj = session.getParameters();
            }
            for (Variable var : vc.getVariables()) {
                buildVariableValue(obj, var);
            }
        }
        long end = System.currentTimeMillis();
        long elapse = end - start;
        session.writeLogFile();
        ExecutionResponseImpl res = (ExecutionResponseImpl) response;
        List<RuleInfo> firedRules = res.getFiredRules();
        List<RuleInfo> matchedRules = res.getMatchedRules();
        StringBuffer sb = new StringBuffer();
        sb.append("耗时：" + elapse + "ms");
        if (StringUtils.isEmpty(flowId)) {
            sb.append("，");
            sb.append("匹配的规则共" + matchedRules.size() + "个");
            if (matchedRules.size() > 0) {
                buildRulesName(matchedRules, sb);
            }
            sb.append("；");
            sb.append("触发的规则共" + firedRules.size() + "个");
            buildRulesName(firedRules, sb);
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("info", sb.toString());
        resultMap.put("data", variableCategories);
        writeObjectToJson(resp, resultMap);
    }

    private void buildObject(Object obj, Variable var) {
        String name = var.getName();
        if (name.contains(".")) {
            instanceChildObject(obj, name);
        }
        String defaultValue = var.getDefaultValue();
        if (StringUtils.isBlank(defaultValue)) {
            return;
        }
        Datatype type = var.getType();
        if (type.equals(Datatype.List)) {
            Utils.setObjectProperty(obj, name, buildList(defaultValue));
        } else if (type.equals(Datatype.Set)) {
            Utils.setObjectProperty(obj, name, buildSet(defaultValue));
        } else if (type.equals(Datatype.Map)) {
            return;
        } else {
            Object value = type.convert(defaultValue);
            Utils.setObjectProperty(obj, name, value);
        }
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private List<GeneralEntity> buildList(String value) {
        try {
            List<GeneralEntity> result = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(value, HashMap.class);
            if (map.containsKey("rows")) {
                List<Object> list = (List<Object>) map.get("rows");
                for (Object obj : list) {
                    if (obj instanceof Map) {
                        GeneralEntity entity = new GeneralEntity((String) map.get("type"));
                        entity.putAll((Map) obj);
                        result.add(entity);
                    }
                }
                return result;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new RuleException(e);
        }
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private Set<GeneralEntity> buildSet(String value) {
        try {
            Set<GeneralEntity> result = new HashSet<>();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(value, HashMap.class);
            if (map.containsKey("rows")) {
                List<Object> list = (List<Object>) map.get("rows");
                for (Object obj : list) {
                    if (obj instanceof Map) {
                        GeneralEntity entity = new GeneralEntity((String) map.get("type"));
                        entity.putAll((Map) obj);
                        result.add(entity);
                    }
                }
                return result;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new RuleException(e);
        }
    }

    private void instanceChildObject(Object obj, String propertyName) {
        int pointIndex = propertyName.indexOf(".");
        if (pointIndex == -1) {
            return;
        }
        String name = propertyName.substring(0, pointIndex);
        propertyName = propertyName.substring(pointIndex + 1);
        try {
            Object instance = PropertyUtils.getProperty(obj, name);
            if (instance != null) {
                instanceChildObject(instance, propertyName);
                return;
            }
            Object targetEntity = new GeneralEntity(name);
            PropertyUtils.setProperty(obj, name, targetEntity);
            instanceChildObject(targetEntity, propertyName);
        } catch (Exception e) {
            throw new RuleException(e);
        }
    }

    private void buildRulesName(List<RuleInfo> firedRules, StringBuffer sb) {
        sb.append("：");
        int i = 0;
        for (RuleInfo rule : firedRules) {
            if (i > 0) {
                sb.append("，");
            }
            sb.append(rule.getName());
            i++;
        }
    }

    private void buildVariableValue(Object object, Variable var) {
        String name = var.getName();
        Object value = Utils.getObjectProperty(object, name);
        if (value != null) {
            Datatype type = var.getType();
            if (type.equals(Datatype.List) || type.equals(Datatype.Set)) {
                //var.setDefaultValue(value.toString());
            } else {
                String str = type.convertObjectToString(value);
                var.setDefaultValue(str);
            }
        }
    }

    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    public void setKnowledgeBuilder(KnowledgeBuilder knowledgeBuilder) {
        this.knowledgeBuilder = knowledgeBuilder;
    }

    public void setHttpSessionKnowledgeCache(
        HttpSessionKnowledgeCache httpSessionKnowledgeCache) {
        this.httpSessionKnowledgeCache = httpSessionKnowledgeCache;
    }

    @Override
    public String url() {
        return "/packageeditor";
    }
}
