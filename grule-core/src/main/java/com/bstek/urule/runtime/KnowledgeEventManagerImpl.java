package com.bstek.urule.runtime;

import com.bstek.urule.runtime.event.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author fred
 * 2018-11-05 5:43 PM
 */
public class KnowledgeEventManagerImpl implements KnowledgeEventManager {
    private List<KnowledgeEventListener> listeners = new ArrayList<>();

    public void addEventListener(KnowledgeEventListener listener) {
        this.listeners.add(listener);
    }

    public List<KnowledgeEventListener> getKnowledgeEventListeners() {
        return this.listeners;
    }

    public boolean removeEventListener(KnowledgeEventListener listener) {
        return this.listeners.remove(listener);
    }

    public void fireEvent(KnowledgeEvent event) {
        if (event instanceof ActivationEvent) {
            for (KnowledgeEventListener listener : this.listeners) {
                if (listener instanceof AgendaEventListener) {
                    AgendaEventListener lis = (AgendaEventListener) listener;
                    if (event instanceof ActivationCancelledEvent) {
                        ActivationCancelledEvent e = (ActivationCancelledEvent) event;
                        lis.activationCancelled(e);
                    } else if (event instanceof ActivationCreatedEvent) {
                        ActivationCreatedEvent e = (ActivationCreatedEvent) event;
                        lis.activationCreated(e);
                    } else if (event instanceof ActivationBeforeFiredEvent) {
                        ActivationBeforeFiredEvent e = (ActivationBeforeFiredEvent) event;
                        lis.beforeActivationFired(e);
                    } else if (event instanceof ActivationAfterFiredEvent) {
                        ActivationAfterFiredEvent e = (ActivationAfterFiredEvent) event;
                        lis.afterActivationFired(e);
                    }
                }
            }
        } else if (event instanceof ProcessEvent) {
            for (KnowledgeEventListener listener : this.listeners) {
                if (listener instanceof ProcessEventListener) {
                    ProcessEventListener lis = (ProcessEventListener) listener;
                    if (event instanceof ProcessAfterCompletedEvent) {
                        ProcessAfterCompletedEvent e = (ProcessAfterCompletedEvent) event;
                        lis.afterProcessCompleted(e);
                    } else if (event instanceof ProcessAfterStartedEvent) {
                        ProcessAfterStartedEvent e = (ProcessAfterStartedEvent) event;
                        lis.afterProcessStarted(e);
                    } else if (event instanceof ProcessBeforeCompletedEvent) {
                        ProcessBeforeCompletedEvent e = (ProcessBeforeCompletedEvent) event;
                        lis.beforeProcessCompleted(e);
                    } else if (event instanceof ProcessBeforeStartedEvent) {
                        ProcessBeforeStartedEvent e = (ProcessBeforeStartedEvent) event;
                        lis.beforeProcessStarted(e);
                    } else if (event instanceof ProcessAfterNodeTriggeredEvent) {
                        ProcessAfterNodeTriggeredEvent e = (ProcessAfterNodeTriggeredEvent) event;
                        lis.afterNodeTriggered(e);
                    } else if (event instanceof ProcessBeforeNodeTriggeredEvent) {
                        ProcessBeforeNodeTriggeredEvent e = (ProcessBeforeNodeTriggeredEvent) event;
                        lis.beforeNodeTriggered(e);
                    }
                }
            }
        }
    }
}