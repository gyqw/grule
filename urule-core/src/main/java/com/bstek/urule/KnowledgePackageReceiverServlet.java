package com.bstek.urule;

import com.bstek.urule.model.flow.FlowDefinition;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgePackageWrapper;
import com.bstek.urule.runtime.cache.CacheUtils;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class KnowledgePackageReceiverServlet extends HttpServlet {
    private static final long serialVersionUID = -4342175088856372588L;
    public static final String URL = "/knowledgepackagereceiver";

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String packageId = req.getParameter("packageId");
        if (StringUtils.isEmpty(packageId)) {
            return;
        }
        packageId = URLDecoder.decode(packageId, "utf-8");
        if (packageId.startsWith("/")) {
            packageId = packageId.substring(1, packageId.length());
        }
        String content = req.getParameter("content");
        if (StringUtils.isEmpty(content)) {
            return;
        }
        content = URLDecoder.decode(content, "utf-8");
        ObjectMapper mapper = new ObjectMapper();
        mapper.getDeserializationConfig().withDateFormat(new SimpleDateFormat(Configure.getDateFormat()));
        KnowledgePackageWrapper wrapper = mapper.readValue(content, KnowledgePackageWrapper.class);
        wrapper.buildDeserialize();
        KnowledgePackage knowledgePackage = wrapper.getKnowledgePackage();
        Map<String, FlowDefinition> flowMap = knowledgePackage.getFlowMap();
        if (flowMap != null && flowMap.size() > 0) {
            for (FlowDefinition fd : flowMap.values()) {
                fd.buildConnectionToNode();
            }
        }
        CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("[" + sd.format(new Date()) + "] " + "Successfully receive the server side to pushed package:" + packageId);
        resp.setContentType("text/plain");
        PrintWriter pw = resp.getWriter();
        pw.write("ok");
        pw.flush();
        pw.close();
    }
}
