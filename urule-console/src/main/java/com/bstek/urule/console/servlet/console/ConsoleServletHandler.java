package com.bstek.urule.console.servlet.console;

import com.bstek.urule.console.servlet.RenderPageServletHandler;
import org.apache.commons.lang.StringUtils;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Jacky.gao
 * 2017年11月28日
 */
public class ConsoleServletHandler extends RenderPageServletHandler {
    private DebugMessageHolder debugMessageHolder;

    @Override
    public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String key = req.getParameter("key");
        String msg = null;
        if (StringUtils.isBlank(key)) {
            msg = "<h2 style='color:red'>请指定要查看的调试消息的key值</h2>";
        } else {
            msg = debugMessageHolder.getDebugMessage(key);
        }
        VelocityContext context = new VelocityContext();
        context.put("title", "URule Console");
        context.put("msg", msg);
        resp.setContentType("text/html");
        resp.setCharacterEncoding("utf-8");
        Template template = ve.getTemplate("html/console.html", "utf-8");
        PrintWriter writer = resp.getWriter();
        template.merge(context, writer);
        writer.close();
    }

    public void setDebugMessageHolder(DebugMessageHolder debugMessageHolder) {
        this.debugMessageHolder = debugMessageHolder;
    }

    @Override
    public String url() {
        return "/console";
    }
}
