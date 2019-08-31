package com.bstek.urule.runtime.response;

/**
 * @author fred
 * 2019-08-31 6:50 PM
 */
public interface NodeExecutionResponse {
    int getSort();

    String getDecisionNodeName();

    Object getDecisionNodeResult();

    String getRuleNodeName();

    String getMatchedRuleKey();

    String getMatchedRuleName();

    String getMatchedRuleAction();
}
