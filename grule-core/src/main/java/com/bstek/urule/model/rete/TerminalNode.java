package com.bstek.urule.model.rete;

import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.runtime.rete.Activity;
import com.bstek.urule.runtime.rete.Context;
import com.bstek.urule.runtime.rete.TerminalActivity;

import java.util.Map;

public class TerminalNode extends ReteNode {
    private Rule rule;
    private NodeType nodeType = NodeType.terminal;

    public TerminalNode() {
        super(0);
    }

    public TerminalNode(Rule rule, int id) {
        super(id);
        this.rule = rule;
    }

    @Override
    public NodeType getNodeType() {
        return nodeType;
    }

    public Rule[] enter(Context context, Object object) {
        return new Rule[]{rule};
    }

    public Rule getRule() {
        return rule;
    }

    public void setRule(Rule rule) {
        this.rule = rule;
    }

    @Override
    public Activity newActivity(Map<Object, Object> context) {
        if (context.containsKey(this)) {
            return (TerminalActivity) context.get(this);
        }
        TerminalActivity activity = new TerminalActivity(rule);
        context.put(this, activity);
        return activity;
    }
}
