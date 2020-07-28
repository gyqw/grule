package geex.grule.console.controller;

import com.bstek.urule.Utils;
import geex.grule.console.EnvironmentUtils;
import geex.grule.console.GRuleBasePackageClazz;
import geex.grule.console.User;
import geex.grule.console.repository.Repository;
import geex.grule.console.repository.RepositoryService;
import geex.grule.console.repository.model.FileType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author fred
 * @since 2020/07/27 6:07 PM
 */
@Slf4j
@RequestMapping("urule/frame")
@RestController
public class FrameController implements GRuleBasePackageClazz {

    private RepositoryService repositoryService;

    @PostMapping("/loadProjects")
    public Map<String, Object> loadProjects(@RequestParam(value = "projectName", required = false) String projectName,
                                            @RequestParam(value = "searchFileName", required = false) String searchFileName,
                                            @RequestParam(value = "types", required = false) String typesStr,
                                            @RequestParam(value = "classify", required = false) String classifyValue) {
        try {
            User user = EnvironmentUtils.getLoginUser();
            boolean classify = getClassify(classifyValue);
            projectName = Utils.decodeURL(projectName);
            FileType[] types = null;
            if (StringUtils.isNotBlank(typesStr) && !typesStr.equals("all")) {
                switch (typesStr) {
                    case "lib":
                        types = new FileType[]{FileType.VariableLibrary, FileType.ConstantLibrary, FileType.ParameterLibrary, FileType.ActionLibrary};
                        break;
                    case "rule":
                        types = new FileType[]{FileType.Ruleset, FileType.UL, FileType.RulesetLib};
                        break;
                    case "table":
                        types = new FileType[]{FileType.DecisionTable, FileType.ScriptDecisionTable, FileType.ComplexScorecard};
                        break;
                    case "tree":
                        types = new FileType[]{FileType.DecisionTree};
                        break;
                    case "flow":
                        types = new FileType[]{FileType.RuleFlow};
                        break;
                }
            }

            Repository repo = repositoryService.loadRepository(projectName, user, classify, types, searchFileName);
            Map<String, Object> map = new HashMap<>();
            map.put("repo", repo);
            map.put("classify", classify);
            return map;
        } catch (Exception e) {
            log.error("loadProjects error", e);
            return new HashMap<>();
        }
    }

    private boolean getClassify(String classifyValue) {
//        if (StringUtils.isBlank(classifyValue)) {
//            Cookie[] cookies = req.getCookies();
//            if (cookies != null) {
//                for (Cookie cookie : cookies) {
//                    if (CLASSIFY_COOKIE_NAME.equals(cookie.getName())) {
//                        classifyValue = cookie.getValue();
//                        break;
//                    }
//                }
//            }
//        } else {
//            Cookie classifyCookie = new Cookie(CLASSIFY_COOKIE_NAME, classifyValue);
//            classifyCookie.setMaxAge(2100000000);
//            resp.addCookie(classifyCookie);
//        }

        boolean classify = true;
        if (StringUtils.isNotBlank(classifyValue)) {
            classify = Boolean.parseBoolean(classifyValue);
        }
        return classify;
    }

    @Autowired
    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }
}
