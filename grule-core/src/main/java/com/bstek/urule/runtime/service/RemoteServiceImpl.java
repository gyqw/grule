package com.bstek.urule.runtime.service;

import com.bstek.urule.Utils;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.flow.FlowDefinition;
import com.bstek.urule.model.rete.JsonUtils;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgePackageWrapper;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class RemoteServiceImpl implements RemoteService {
    private Logger logger = LoggerFactory.getLogger(RemoteServiceImpl.class.getName());

    private String resporityServerUrl;

    public KnowledgePackage getKnowledge(String packageId, String timestamp) {
        if (StringUtils.isEmpty(resporityServerUrl)) {
            return null;
        }
        logger.info("Load knowledge package from remote...");
        String content = sendRequest(packageId, timestamp);
        if (StringUtils.isEmpty(content)) {
            return null;
        }
        KnowledgePackageWrapper wrapper = JsonUtils.parseKnowledgePackageWrapper(content);
        KnowledgePackage knowledgePackage = wrapper.getKnowledgePackage();
        Map<String, FlowDefinition> flowMap = knowledgePackage.getFlowMap();
        if (flowMap != null && flowMap.size() > 0) {
            for (FlowDefinition fd : flowMap.values()) {
                fd.buildConnectionToNode();
            }
        }
        return knowledgePackage;
    }

    private String sendRequest(String packageId, String timestamp) {
        HttpURLConnection connection = null;
        OutputStreamWriter writer = null;
        InputStream inputStream = null;
        InputStreamReader inputStreamReader = null;
        BufferedReader bufferedReader = null;
        try {
            packageId = Utils.encodeURL(packageId);
            packageId = Utils.encodeURL(packageId);
            String content = "packageId=" + packageId + "";
            if (StringUtils.isNotEmpty(timestamp)) {
                content += "&timestamp=" + timestamp + "";
            }
            URL url = new URL(resporityServerUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept-Charset", "utf-8");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("Content-Length", String.valueOf(content.length()));
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            connection.connect();
            writer = new OutputStreamWriter(connection.getOutputStream());
            writer.write(content);
            writer.flush();
            if (connection.getResponseCode() != 200) {
                throw new RuleException("Server request was failed, Response message : " + connection.getResponseMessage());
            }
            inputStream = connection.getInputStream();
            inputStreamReader = new InputStreamReader(inputStream, "utf-8");
            bufferedReader = new BufferedReader(inputStreamReader);
            String line = null;
            StringBuilder sb = new StringBuilder();
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuleException(e);
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
                if (inputStreamReader != null) {
                    inputStreamReader.close();
                }
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public void setResporityServerUrl(String resporityServerUrl) {
        if (StringUtils.isEmpty(resporityServerUrl) || resporityServerUrl.equals("urule.resporityServerUrl")) {
            return;
        }
        if (resporityServerUrl.endsWith("/")) {
            resporityServerUrl += "urule/loadknowledge";
        } else {
            resporityServerUrl += "/urule/loadknowledge";
        }
        this.resporityServerUrl = resporityServerUrl;
    }
}
