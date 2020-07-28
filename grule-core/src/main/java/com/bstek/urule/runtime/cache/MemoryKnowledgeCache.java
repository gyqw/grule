package com.bstek.urule.runtime.cache;

import com.bstek.urule.runtime.KnowledgePackage;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MemoryKnowledgeCache implements KnowledgeCache {

    private Map<String, KnowledgePackage> map = new ConcurrentHashMap<>();

    @Override
    public KnowledgePackage getKnowledge(String packageId) {
        if (packageId.startsWith("/")) {
            packageId = packageId.substring(1);
        }
        return map.get(packageId);
    }

    @Override
    public void putKnowledge(String packageId, KnowledgePackage knowledgePackage) {
        if (packageId.startsWith("/")) {
            packageId = packageId.substring(1);
        }
        map.put(packageId, knowledgePackage);
    }

    @Override
    public void removeKnowledge(String packageId) {
        map.remove(packageId);
    }
}
