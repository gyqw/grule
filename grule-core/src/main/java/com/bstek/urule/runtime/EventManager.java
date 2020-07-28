package com.bstek.urule.runtime;

import com.bstek.urule.runtime.event.KnowledgeEvent;
import com.bstek.urule.runtime.event.KnowledgeEventListener;

import java.util.List;

public interface EventManager {
    void addEventListener(KnowledgeEventListener listener);

    boolean removeEventListener(KnowledgeEventListener listener);

    void fireEvent(KnowledgeEvent event);

    List<KnowledgeEventListener> getKnowledgeEventListeners();
}
