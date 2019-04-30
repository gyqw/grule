package com.bstek.urule.model.rete;

import com.bstek.urule.model.Node;
import com.bstek.urule.runtime.rete.Activity;

import java.util.Map;

public abstract class ReteNode implements Node {
    private int id;

    public ReteNode(int id) {
        this.id = id;
    }

    public abstract NodeType getNodeType();

    public abstract Activity newActivity(Map<Object, Object> context);

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
