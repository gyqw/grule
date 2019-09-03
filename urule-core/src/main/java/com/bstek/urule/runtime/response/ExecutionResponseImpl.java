package com.bstek.urule.runtime.response;

import com.bstek.urule.action.ActionValue;
import com.bstek.urule.model.rule.RuleInfo;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ExecutionResponseImpl implements RuleExecutionResponse, FlowExecutionResponse {
    private long duration;
    private String flowId;
    private List<String> arrowList = new LinkedList<>();
    private List<String> nodeNames = new ArrayList<>();
    private List<NodeExecutionResponse> nodeExecutionResponseList = new LinkedList<>();
    private List<RuleExecutionResponse> ruleExecutionResponses = new ArrayList<>();
    private List<FlowExecutionResponse> flowExecutionResponses = new ArrayList<>();
    private List<RuleInfo> rulesFired;
    private List<RuleInfo> matchedRules = new ArrayList<>();
    private List<ActionValue> actionValues;

    @Override
    public String getFlowId() {
        return flowId;
    }

    @Override
    public List<String> getArrowList() {
        return this.arrowList;
    }

    public void setFlowId(String flowId) {
        this.flowId = flowId;
    }

    public void addArrowList(String arrow) {
        this.arrowList.add(arrow);
    }

    public void addNodeExecutionResponse(NodeExecutionResponse nodeExecutionResponse) {
        this.nodeExecutionResponseList.add(nodeExecutionResponse);
    }

    public List<NodeExecutionResponse> getNodeExecutionResponseList() {
        return nodeExecutionResponseList;
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

    @Override
    public String toString() {
        return "ExecutionResponseImpl{" +
                "duration=" + duration +
                ", flowId='" + flowId + '\'' +
                ", arrowList=" + arrowList +
                ", nodeNames=" + nodeNames +
                ", ruleExecutionResponses=" + ruleExecutionResponses +
                ", flowExecutionResponses=" + flowExecutionResponses +
                ", rulesFired=" + rulesFired +
                ", matchedRules=" + matchedRules +
                ", actionValues=" + actionValues +
                '}';
    }
}
