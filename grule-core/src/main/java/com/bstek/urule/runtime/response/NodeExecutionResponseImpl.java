package com.bstek.urule.runtime.response;

/**
 * @author fred
 * 2019-08-31 6:50 PM
 */
public class NodeExecutionResponseImpl implements NodeExecutionResponse {
    private int sort;
    private String decisionNodeName;
    private Object decisionNodeResult;
    private String ruleNodeName;
    private String matchedRuleKey;
    private String matchedRuleName;
    private String matchedRuleAction;

    public String getDecisionNodeName() {
        return decisionNodeName;
    }

    public void setDecisionNodeName(String decisionNodeName) {
        this.decisionNodeName = decisionNodeName;
    }

    public Object getDecisionNodeResult() {
        return decisionNodeResult;
    }

    public void setDecisionNodeResult(Object decisionNodeResult) {
        this.decisionNodeResult = decisionNodeResult;
    }

    public String getRuleNodeName() {
        return ruleNodeName;
    }

    public void setRuleNodeName(String ruleNodeName) {
        this.ruleNodeName = ruleNodeName;
    }

    public String getMatchedRuleKey() {
        return matchedRuleKey;
    }

    public void setMatchedRuleKey(String matchedRuleKey) {
        this.matchedRuleKey = matchedRuleKey;
    }

    public String getMatchedRuleName() {
        return matchedRuleName;
    }

    public void setMatchedRuleName(String matchedRuleName) {
        this.matchedRuleName = matchedRuleName;
    }

    public String getMatchedRuleAction() {
        return matchedRuleAction;
    }

    public void setMatchedRuleAction(String matchedRuleAction) {
        this.matchedRuleAction = matchedRuleAction;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
