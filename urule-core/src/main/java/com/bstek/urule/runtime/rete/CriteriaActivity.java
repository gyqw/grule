package com.bstek.urule.runtime.rete;

import com.bstek.urule.Utils;
import com.bstek.urule.debug.MsgType;
import com.bstek.urule.model.rule.lhs.Criteria;
import com.bstek.urule.model.rule.lhs.EvaluateResponse;

import java.util.ArrayList;
import java.util.Iterator;
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
            this.doDebug(response, context);
            if (!result) {
                this.passAndNode();
                return null;
            } else {
                this.passed = true;
                tracker.addObjectCriteria(obj, this.criteria);
                Iterator var9 = allMatchedObjects.iterator();

                while (var9.hasNext()) {
                    Object object = var9.next();
                    tracker.addObjectCriteria(object, this.criteria);
                }

                return this.visitPaths(context, obj, tracker);
            }
        }
    }

    public void passAndNode() {
        this.doPassAndNode();
    }

    private void doDebug(EvaluateResponse response, Context context) {
        if (this.debug && Utils.isDebug()) {
            String id = this.criteria.getId();
            StringBuffer sb = new StringBuffer();
            sb.append("^^^条件：" + id);
            String result = response.getResult() ? "满足" : "不满足";
            sb.append(" =>" + result);
            sb.append(", 左值：" + (response.getLeftResult() == null ? "null" : response.getLeftResult()));
            sb.append(", 右值：" + (response.getRightResult() == null ? "null" : response.getRightResult()));
            context.debugMsg(sb.toString(), MsgType.Condition, this.debug);
        }
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
