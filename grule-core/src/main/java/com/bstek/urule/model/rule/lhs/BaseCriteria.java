package com.bstek.urule.model.rule.lhs;

import com.bstek.urule.runtime.rete.EvaluationContext;

import java.util.List;

/**
 * @author Jacky.gao
 * 2016年8月15日
 */
public interface BaseCriteria {

    EvaluateResponse evaluate(EvaluationContext context, Object obj, List<Object> allMatchedObjects);

    String getId();
}
