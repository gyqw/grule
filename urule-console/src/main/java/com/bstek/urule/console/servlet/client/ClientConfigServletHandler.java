package com.bstek.urule.console.servlet.client;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;

import com.bstek.urule.exception.RuleException;
import com.bstek.urule.Utils;
import com.bstek.urule.console.EnvironmentUtils;
import com.bstek.urule.console.User;
import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.console.repository.RepositoryServiceImpl;
import com.bstek.urule.console.servlet.RenderPageServletHandler;
import com.bstek.urule.console.servlet.RequestContext;

/**
 * @author Jacky.gao
 * 2016年8月11日
 */
public class ClientConfigServletHandler extends RenderPageServletHandler {
    private RepositoryService repositoryService;

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
            Template template = ve.getTemplate("html/client-config-editor.html", "utf-8");
            PrintWriter writer = resp.getWriter();
            template.merge(context, writer);
            writer.close();
        }
    }

    public void loadData(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String project = req.getParameter("project");
        project = Utils.decodeURL(project);
        writeObjectToJson(resp, repositoryService.loadClientConfigs(project));
    }

    public void save(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String project = req.getParameter("project");
        project = Utils.decodeURL(project);
        String file = project + "/" + RepositoryServiceImpl.CLIENT_CONFIG_FILE;
        String content = req.getParameter("content");
        content = Utils.decodeURL(content);
        User user = EnvironmentUtils.getLoginUser(new RequestContext(req, resp));
        try {
            repositoryService.saveFile(file, content, false, null, user);
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @Override
    public String url() {
        return "/clientconfig";
    }
}
