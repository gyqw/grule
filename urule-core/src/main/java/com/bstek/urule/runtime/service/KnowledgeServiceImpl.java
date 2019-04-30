package com.bstek.urule.runtime.service;


import com.bstek.urule.exception.RuleException;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.cache.CacheUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.io.IOException;

public class KnowledgeServiceImpl implements KnowledgeService, ApplicationContextAware {
    private Logger logger = LoggerFactory.getLogger(KnowledgeServiceImpl.class.getName());

    private long knowledgeUpdateCycle;
    private RemoteService remoteService;
    private KnowledgePackageService knowledgePackageService;

    @Override
    public KnowledgePackage[] getKnowledges(String[] packageIds) throws IOException {
        KnowledgePackage[] packages = new KnowledgePackage[packageIds.length];
        for (int i = 0; i < packageIds.length; i++) {
            String packageId = packageIds[i];
            packages[i] = getKnowledge(packageId);
        }
        return packages;
    }

    public KnowledgePackage getKnowledge(String packageId) throws IOException {
        if (knowledgeUpdateCycle == 0) {
            return fetchKnowledgePackage(packageId);
        }
        KnowledgePackage knowledgePackage = CacheUtils.getKnowledgeCache().getKnowledge(packageId);
        if (knowledgeUpdateCycle == 1) {
            if (knowledgePackage == null) {
                knowledgePackage = fetchKnowledgePackage(packageId);
                knowledgePackage.resetTimestamp();
                CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
            }
            return knowledgePackage;
        }
        if (knowledgePackage == null) {
            knowledgePackage = fetchKnowledgePackage(packageId);
            CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
        } else {
            long timestamp = knowledgePackage.getTimestamp();
            long now = System.currentTimeMillis();
            long mm = now - timestamp;
            if (mm >= knowledgeUpdateCycle) {
                KnowledgePackage remoteKnowledgePackage = remoteService.getKnowledge(packageId, String.valueOf(knowledgePackage.getTimestamp()));
                if (remoteKnowledgePackage == null) {
                    // 表示repository中knowledge package与本地的比较无更新
                    logger.info("Not need update remote knowledge package.");
                    knowledgePackage.resetTimestamp();
                    CacheUtils.getKnowledgeCache().putKnowledge(packageId, knowledgePackage);
                } else {
                    logger.info("Need update remote knowledge package.");
                    remoteKnowledgePackage.resetTimestamp();
                    CacheUtils.getKnowledgeCache().putKnowledge(packageId, remoteKnowledgePackage);
                }
            }
        }

        return knowledgePackage;
    }

    private KnowledgePackage fetchKnowledgePackage(String packageId) throws IOException {
        KnowledgePackage knowledgePackage = remoteService.getKnowledge(packageId, null);
        if (knowledgePackage == null) {
            // 表示无法连接远程server.
            if (knowledgePackageService == null) {
                throw new RuleException("Remote service and local KnowledgePackageService all unavailable");
            } else {
                knowledgePackage = knowledgePackageService.buildKnowledgePackage(packageId);
            }
        }
        return knowledgePackage;
    }

    public void setRemoteService(RemoteService remoteService) {
        this.remoteService = remoteService;
    }

    public void setKnowledgeUpdateCycle(String knowledgeUpdateCycle) {
        if (StringUtils.isEmpty(knowledgeUpdateCycle) || knowledgeUpdateCycle.equals("${urule.knowledgeUpdateCycle}")) {
            return;
        }
        this.knowledgeUpdateCycle = Long.valueOf(knowledgeUpdateCycle);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        boolean hasBean = applicationContext.containsBean(KnowledgePackageService.BEAN_ID);
        if (hasBean) {
            knowledgePackageService = (KnowledgePackageService) applicationContext.getBean(KnowledgePackageService.BEAN_ID);
        }
    }
}
