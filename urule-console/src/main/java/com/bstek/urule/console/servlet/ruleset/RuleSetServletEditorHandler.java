package com.bstek.urule.console.servlet.ruleset;

import com.bstek.urule.Utils;
import com.bstek.urule.console.servlet.RenderPageServletHandler;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Jacky.gao
 * 2016年8月1日
 */
public class RuleSetServletEditorHandler extends RenderPageServletHandler {
    @Override
    public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = retriveMethod(req);
        if (method != null) {
            invokeMethod(method, req, resp);
        } else {
            VelocityContext context = new VelocityContext();
            context.put("contextPath", req.getContextPath());
            String file = req.getParameter("file");
            file = Utils.decodeURL(file);
            String project = buildProjectNameFromFile(file);
            if (project != null) {
                context.put("project", project);
            }
            resp.setContentType("text/html");
            resp.setCharacterEncoding("utf-8");
            Template template = ve.getTemplate("html/ruleset-editor.html", "utf-8");
            PrintWriter writer = resp.getWriter();
            template.merge(context, writer);
            writer.close();
        }
    }

    @Override
    public String url() {
        return "/ruleseteditor";
    }

}
