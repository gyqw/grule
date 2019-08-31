package com.bstek.urule.runtime.response;

import java.util.List;

public interface FlowExecutionResponse extends ExecutionResponse {
    /**
     * @return 返回执行的决策流ID
     */
    String getFlowId();

    /**
     * @return 所有分流信息
     */
    List<String> getArrowList();

    /**
     * @return 返回当前决策流经过的节点名称列表
     */
    List<String> getNodeNames();

    List<NodeExecutionResponse> getNodeExecutionResponseList();

    /**
     * @return 返回规则集执行信息
     */
    List<RuleExecutionResponse> getRuleExecutionResponses();

    /**
     * @return 返回决策流执行信息
     */
    List<FlowExecutionResponse> getFlowExecutionResponses();
}
