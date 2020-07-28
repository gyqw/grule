package com.bstek.urule.model.rule;

import com.bstek.urule.action.Action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Rhs {
    private List<Action> actions;

    public List<Action> getActions() {
        return actions;
    }

    public void setActions(List<Action> actions) {
        this.actions = actions;
        Collections.sort(actions);
    }

    public void addAction(Action action) {
        if (actions == null) {
            actions = new ArrayList<Action>();
        }
        actions.add(action);
        Collections.sort(actions);
    }
}
