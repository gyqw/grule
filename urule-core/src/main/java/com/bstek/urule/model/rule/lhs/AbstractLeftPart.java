package com.bstek.urule.model.rule.lhs;

import com.bstek.urule.Utils;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.runtime.rete.EvaluationContext;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public abstract class AbstractLeftPart implements LeftPart {
    protected String id;
    protected String variableName;
    protected String variableLabel;
    protected String variableCategory;
    protected MultiCondition multiCondition;

    protected ExprValue computeValue(EvaluationContext context, Object obj, List<Object> allMatchedObjects) {
        ExprValue value = new ExprValue();
        Collection<?> facts = getTargetFacts(context, obj);
        int total = facts.size();
        int match = 0;
        int notMatch = 0;
        List<Object> matchFacts = new ArrayList<Object>();
        for (Object fact : facts) {
            boolean result = true;
            if (multiCondition != null) {
                result = multiCondition.evaluate(context, fact, allMatchedObjects);
            }
            if (result) {
                match++;
                matchFacts.add(fact);
            } else {
                notMatch++;
            }
        }
        value.setFacts(matchFacts);
        value.setMatch(match);
        value.setTotal(total);
        value.setNotMatch(notMatch);
        return value;
    }

    private Collection<?> getTargetFacts(EvaluationContext context, Object obj) {
        Object value = Utils.getObjectProperty(obj, variableName);
        if (value == null) {
            throw new RuleException("Collection value can not be null.");
        }
        if (value instanceof Collection) {
            return (Collection<?>) value;
        }
        throw new RuleException("Value is not collection type.");
    }

    public String getVariableCategory() {
        return variableCategory;
    }

    public void setVariableCategory(String variableCategory) {
        this.variableCategory = variableCategory;
    }

    public String getVariableName() {
        return variableName;
    }

    public void setVariableName(String variableName) {
        this.variableName = variableName;
    }

    public String getVariableLabel() {
        return variableLabel;
    }

    public void setVariableLabel(String variableLabel) {
        this.variableLabel = variableLabel;
    }

    public MultiCondition getMultiCondition() {
        return multiCondition;
    }

    public void setMultiCondition(MultiCondition multiCondition) {
        this.multiCondition = multiCondition;
    }
}
