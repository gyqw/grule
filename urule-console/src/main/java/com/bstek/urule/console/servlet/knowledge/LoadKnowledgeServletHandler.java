package com.bstek.urule.console.servlet.knowledge;

import com.bstek.urule.Utils;
import com.bstek.urule.console.servlet.RenderPageServletHandler;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgePackageWrapper;
import com.bstek.urule.runtime.cache.CacheUtils;
import com.bstek.urule.runtime.service.KnowledgePackageService;
import org.apache.commons.lang.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author Jacky.gao
 * @since 2016年8月17日
 */
public class LoadKnowledgeServletHandler extends RenderPageServletHandler {
    private KnowledgePackageService knowledgePackageService;

    @Override
    public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String packageId = req.getParameter("packageId");
        if (StringUtils.isEmpty(packageId)) {
            resp.setContentType("text/html");
            PrintWriter pw = resp.getWriter();
            pw.write("<html>");
            pw.write("<header>");
            pw.write("</header>");
            pw.write("<body>");
            pw.write("<h1>packageId can not be null<h1>");
            pw.write("</body>");
            pw.write("</html>");
            pw.flush();
            pw.close();
            return;
        }
        packageId = Utils.decodeURL(packageId);
        String timestamp = req.getParameter("timestamp");
        KnowledgePackage knowledgePackage = CacheUtils.getKnowledgeCache().getKnowledge(packageId);
        if (knowledgePackage == null) {
            knowledgePackage = knowledgePackageService.buildKnowledgePackage(packageId);
            CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
        }
        if (StringUtils.isNotEmpty(timestamp)) {
            long remoteTimestamp = Long.valueOf(timestamp);
            long localTimestamp = knowledgePackage.getTimestamp();
            if (localTimestamp > remoteTimestamp) {
                writeObjectToJson(resp, new KnowledgePackageWrapper(knowledgePackage));
            }
        } else {
            writeObjectToJson(resp, new KnowledgePackageWrapper(knowledgePackage));
        }
    }

    @Override
    public String url() {
        return "/loadknowledge";
    }

    public void setKnowledgePackageService(KnowledgePackageService knowledgePackageService) {
        this.knowledgePackageService = knowledgePackageService;
    }
}
