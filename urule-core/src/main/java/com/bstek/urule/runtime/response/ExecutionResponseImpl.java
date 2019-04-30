package com.bstek.urule.runtime.response;

import com.bstek.urule.action.ActionValue;
import com.bstek.urule.model.rule.RuleInfo;

import java.util.ArrayList;
import java.util.List;

public class ExecutionResponseImpl implements RuleExecutionResponse, FlowExecutionResponse {
    private long duration;
    private String flowId;
    private List<String> nodeNames = new ArrayList<>();
    private List<RuleExecutionResponse> ruleExecutionResponses = new ArrayList<>();
    private List<FlowExecutionResponse> flowExecutionResponses = new ArrayList<>();
    private List<RuleInfo> rulesFired;
    private List<RuleInfo> matchedRules = new ArrayList<RuleInfo>();
    private List<ActionValue> actionValues;

    @Override
    public String getFlowId() {
        return flowId;
    }

    public void setFlowId(String flowId) {
        this.flowId = flowId;
    }

    public void addFlowExecutionResponse(FlowExecutionResponse response) {
        flowExecutionResponses.add(response);
    }

    @Override
    public List<FlowExecutionResponse> getFlowExecutionResponses() {
        return flowExecutionResponses;
    }

    @Override
    public List<RuleExecutionResponse> getRuleExecutionResponses() {
        return ruleExecutionResponses;
    }

    public void addRuleExecutionResponse(RuleExecutionResponse response) {
        ruleExecutionResponses.add(response);
    }

    @Override
    public List<String> getNodeNames() {
        return nodeNames;
    }

    public void addNodeName(String nodeName) {
        nodeNames.add(nodeName);
    }

    @Override
    public List<ActionValue> getActionValues() {
        return actionValues;
    }

    public void setActionValues(List<ActionValue> actionValues) {
        this.actionValues = actionValues;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public List<RuleInfo> getMatchedRules() {
        return matchedRules;
    }

    public void addMatchedRules(List<RuleInfo> matchedRules) {
        this.matchedRules.addAll(matchedRules);
    }

    public List<RuleInfo> getFiredRules() {
        return rulesFired;
    }

    public void setFiredRules(List<RuleInfo> rulesFired) {
        this.rulesFired = rulesFired;
    }
}
