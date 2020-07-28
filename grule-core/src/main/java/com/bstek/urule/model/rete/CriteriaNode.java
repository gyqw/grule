package com.bstek.urule.model.rete;

import com.bstek.urule.model.rule.lhs.Criteria;
import com.bstek.urule.runtime.rete.Activity;
import com.bstek.urule.runtime.rete.CriteriaActivity;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;

public class CriteriaNode extends BaseReteNode implements ConditionNode {
    @JsonIgnore
    private String criteriaInfo;
    private Criteria criteria;
    private boolean debug;
    private NodeType nodeType;

    public CriteriaNode() {
        super(0);
        this.nodeType = NodeType.criteria;
    }

    public CriteriaNode(Criteria criteria, int id, boolean debug) {
        super(id);
        this.nodeType = NodeType.criteria;
        this.criteria = criteria;
        this.setCriteriaInfo(criteria.getId());
        this.debug = debug;
    }

    public NodeType getNodeType() {
        return this.nodeType;
    }

    public Criteria getCriteria() {
        return this.criteria;
    }

    public void setCriteria(Criteria criteria) {
        this.criteria = criteria;
    }

    public String getCriteriaInfo() {
        return this.criteriaInfo;
    }

    public void setCriteriaInfo(String criteriaInfo) {
        this.criteriaInfo = criteriaInfo;
    }

    public boolean isDebug() {
        return this.debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }

    public Activity newActivity(Map<Object, Object> context) {
        if (context.containsKey(this)) {
            return (CriteriaActivity) context.get(this);
        } else {
            CriteriaActivity activity = new CriteriaActivity(this.criteria, this.debug);
            for (Line line : this.lines) {
                activity.addPath(line.newPath(context));
            }

            context.put(this, activity);
            return activity;
        }
    }
}
