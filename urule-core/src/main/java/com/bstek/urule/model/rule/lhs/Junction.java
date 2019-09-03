package com.bstek.urule.model.rule.lhs;

import java.util.ArrayList;
import java.util.List;


public abstract class Junction extends BaseCriterion {
    private List<Criterion> criterions;

    public List<Criterion> getCriterions() {
        return criterions;
    }

    public void addCriterion(Criterion criterion) {
        if (criterions == null) {
            criterions = new ArrayList<Criterion>();
        }
        criterion.setParent(this);
        criterions.add(criterion);
    }

    public void setCriterions(List<Criterion> criterions) {
        for (Criterion criterion : criterions) {
            criterion.setParent(this);
        }
        this.criterions = criterions;
    }

    public abstract String getJunctionType();
}
