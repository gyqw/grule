package com.bstek.urule.runtime.service;

import com.bstek.urule.runtime.KnowledgePackage;

import java.io.IOException;

public interface KnowledgeService {
    String BEAN_ID = "urule.knowledgeService";

    /**
     * 根据给定的资源包ID获取对应的KnowledgePackage对象
     *
     * @param packageId 资源包ID
     * @return 返回与给定的资源包ID获取对应的KnowledgePackage对象
     * @throws IOException 抛出IO异常
     */
    KnowledgePackage getKnowledge(String packageId) throws IOException;

    /**
     * 根据给定的一个或多个资源包ID获取对应的KnowledgePackage对象的集合
     *
     * @param packageIds 资源包ID数组
     * @return 返回与给定的一个或多个资源包ID获取对应的KnowledgePackage对象集合
     * @throws IOException 抛出IO异常
     */
    KnowledgePackage[] getKnowledges(String[] packageIds) throws IOException;
}
