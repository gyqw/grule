package com.bstek.urule.runtime.cache;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.util.Collection;

public class CacheUtils implements ApplicationContextAware {
    private static KnowledgeCache knowledgeCache;

    public static KnowledgeCache getKnowledgeCache() {
        return knowledgeCache;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        Collection<KnowledgeCache> caches = applicationContext.getBeansOfType(KnowledgeCache.class).values();
        if (caches.size() > 0) {
            CacheUtils.knowledgeCache = caches.iterator().next();
        } else {
            CacheUtils.knowledgeCache = new MemoryKnowledgeCache();
        }
    }
}
