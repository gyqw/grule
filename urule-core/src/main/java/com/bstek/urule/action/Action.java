package com.bstek.urule.action;

import com.bstek.urule.runtime.rete.Context;

import java.util.List;

public interface Action extends Comparable<Action> {
    ActionValue execute(Context context, Object matchedObject, List<Object> allMatchedObjects);

    ActionType getActionType();

    int getPriority();

    void setDebug(boolean debug);
}
