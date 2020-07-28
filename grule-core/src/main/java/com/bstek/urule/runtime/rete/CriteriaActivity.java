package com.bstek.urule.runtime.rete;

import com.bstek.urule.debug.MsgType;
import com.bstek.urule.model.rule.ValueType;
import com.bstek.urule.model.rule.VariableValue;
import com.bstek.urule.model.rule.lhs.Criteria;
import com.bstek.urule.model.rule.lhs.EvaluateResponse;
import com.bstek.urule.model.rule.lhs.VariableLeftPart;

import java.util.ArrayList;
import java.util.List;

public class CriteriaActivity extends AbstractActivity {
    protected Criteria criteria;
    private boolean passed;
    private boolean debug;

    public CriteriaActivity(Criteria criteria, boolean debug) {
        this.criteria = criteria;
        this.debug = debug;
    }

    public List<FactTracker> enter(EvaluationContext context, Object obj, FactTracker tracker) {
        if (this.passed) {
            return null;
        } else if (this.joinNodeIsPassed()) {
            return null;
        } else {
            List<Object> allMatchedObjects = new ArrayList<>();
            EvaluateResponse response = null;
            String criteriaId = this.criteria.getId();
            Object storeValue = context.getCriteriaValue(criteriaId);
            if (storeValue != null) {
                response = (EvaluateResponse) storeValue;
            } else {
                response = this.criteria.evaluate(context, obj, allMatchedObjects);
                context.storeCriteriaValue(criteriaId, response);
            }

            boolean result = response.getResult();
            logMessage(response, context);
            if (!result) {
                this.passAndNode();
                return null;
            } else {
                this.passed = true;
                tracker.addObjectCriteria(obj, this.criteria);

                for (Object object : allMatchedObjects) {
                    tracker.addObjectCriteria(object, this.criteria);
                }

                return this.visitPaths(context, obj, tracker);
            }
        }
    }

    public void passAndNode() {
        this.doPassAndNode();
    }

    private void logMessage(EvaluateResponse response, Context context) {
        String id = this.criteria.getId();
        String leftVariable = ((VariableLeftPart) this.criteria.getLeft().getLeftPart()).getVariableLabel();
        String leftVariableValue = response.getLeftResult() == null ? "null" : response.getLeftResult().toString();
        String rightVariable = "system";
        if(this.criteria.getValue() != null ) {
            if (this.criteria.getValue().getValueType() == ValueType.Variable) {
                rightVariable = ((VariableValue) this.criteria.getValue()).getVariableLabel();
            } else {
                rightVariable = this.criteria.getValue().getValueType().name();
            }
        }
        String rightVariableValue = response.getRightResult() == null ? "null" : response.getRightResult().toString();

        String msg = String.format("^^^ 条件： %s => %s, 左值： %s, 右值： %s",
                id, response.getResult() ? "满足" : "不满足",
                leftVariableValue, rightVariableValue);

        context.logMsg(msg, MsgType.Condition, leftVariable, leftVariableValue, rightVariable, rightVariableValue);
    }

    public boolean joinNodeIsPassed() {
        List<Path> paths = this.getPaths();
        if (paths != null) {
            if (paths.size() > 1) {
                return false;
            }

            if (paths.size() == 1) {
                Path path = (Path) paths.get(0);
                AbstractActivity activity = (AbstractActivity) path.getTo();
                return activity.joinNodeIsPassed();
            }
        }

        return false;
    }

    public void reset() {
        this.passed = false;
    }
}
