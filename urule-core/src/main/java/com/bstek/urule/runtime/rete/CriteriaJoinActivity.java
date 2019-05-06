package com.bstek.urule.runtime.rete;

import com.bstek.urule.model.rule.lhs.Criteria;

import java.util.List;

public class CriteriaJoinActivity extends CriteriaActivity {
    public CriteriaJoinActivity(Criteria criteria) {
        super(criteria, false);
    }

    @Override
    public List<FactTracker> enter(EvaluationContext context, Object obj, FactTracker tracker) {
        return super.enter(context, obj, tracker);
    }
}
