package com.bstek.urule.runtime.rete;

import com.bstek.urule.debug.MsgType;
import com.bstek.urule.model.rule.lhs.Criteria;
import com.bstek.urule.model.rule.lhs.EvaluateResponse;

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
        String msg = String.format("^^^ 条件： %s => %s, 左值： %s, 右值： %s",
                id, response.getResult() ? "满足" : "不满足",
                response.getLeftResult() == null ? "null" : response.getLeftResult(),
                response.getRightResult() == null ? "null" : response.getRightResult());
        context.logMsg(msg, MsgType.Condition);
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
