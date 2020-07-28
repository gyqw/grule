package com.bstek.urule.runtime;

import com.bstek.urule.runtime.event.KnowledgeEvent;
import com.bstek.urule.runtime.event.KnowledgeEventListener;

import java.util.List;

public interface KnowledgeEventManager {
    void addEventListener(KnowledgeEventListener var1);

    List<KnowledgeEventListener> getKnowledgeEventListeners();

    boolean removeEventListener(KnowledgeEventListener var1);

    void fireEvent(KnowledgeEvent var1);
}
