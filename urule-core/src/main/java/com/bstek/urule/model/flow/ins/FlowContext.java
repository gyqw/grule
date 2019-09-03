package com.bstek.urule.model.flow.ins;

import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.rete.Context;

import java.util.List;
import java.util.Map;

/**
 * @author Jacky.gao
 * @since 2015年2月28日
 */
public interface FlowContext extends Context {
    Object getVariable(String key);

    Map<String, Object> getVariables();

    void addVariable(String key, Object object);

    void removeVariable(String key);

    List<FlowInstance> getFlowInstances();

    void addFlowInstance(FlowInstance instance);

    void setSessionValue(String key, Object value);

    Object getSessionValue(String key);

    FlowExecutionResponse getResponse();
}
