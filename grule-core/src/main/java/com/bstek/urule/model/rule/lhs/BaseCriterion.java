package com.bstek.urule.model.rule.lhs;

import org.codehaus.jackson.annotate.JsonIgnore;

public abstract class BaseCriterion implements Criterion {
    @JsonIgnore
    private Junction parent;

    public Junction getParent() {
        return parent;
    }

    public void setParent(Junction parent) {
        this.parent = parent;
    }
}
