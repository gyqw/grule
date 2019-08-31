package com.bstek.urule.model.flow.ins;

import com.bstek.urule.debug.MessageItem;
import com.bstek.urule.runtime.WorkingMemory;
import com.bstek.urule.runtime.response.ExecutionResponseImpl;
import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.rete.ContextImpl;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Jacky.gao
 * @since 2015年1月20日
 */
public class FlowContextImpl extends ContextImpl implements FlowContext {
    private Map<String, Object> variableMap;
    private Map<String, Object> sessionValueMap;
    private List<FlowInstance> flowInstances = new ArrayList<FlowInstance>();
    private ExecutionResponseImpl response;

    public FlowContextImpl(WorkingMemory workingMemory, Map<String, String> variableCategoryMap, ApplicationContext applicationContext, List<MessageItem> debugMessageItems) {
        super(workingMemory, applicationContext, variableCategoryMap, debugMessageItems);
        sessionValueMap = new HashMap<>();
    }

    public void setResponse(ExecutionResponseImpl response) {
        this.response = response;
    }

    @Override
    public FlowExecutionResponse getResponse() {
        return response;
    }

    @Override
    public Map<String, Object> getVariables() {
        return variableMap;
    }

    public Object getVariable(String key) {
        return variableMap.get(key);
    }

    public void removeVariable(String key) {
        variableMap.remove(key);
    }

    public void addVariable(String key, Object object) {
        variableMap.put(key, object);
    }

    public void setVariableMap(Map<String, Object> variableMap) {
        this.variableMap = variableMap;
    }

    public void addFlowInstance(FlowInstance instance) {
        flowInstances.add(instance);
    }

    public List<FlowInstance> getFlowInstances() {
        return flowInstances;
    }

    @Override
    public Object getSessionValue(String key) {
        return sessionValueMap.get(key);
    }

    @Override
    public void setSessionValue(String key, Object value) {
        sessionValueMap.put(key, value);
    }
}
