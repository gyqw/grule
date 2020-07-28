package com.bstek.urule.model.flow.ins;

import com.bstek.urule.model.flow.FlowNode;
import com.bstek.urule.model.flow.ProcessDefinition;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author Jacky.gao
 * @since 2015年4月20日
 */
public class FlowInstance implements ProcessInstance {
    private String id;
    private int parallelInstanceCount;
    private ProcessDefinition flowDefinition;
    private FlowInstance parent;
    private List<ProcessInstance> children = new ArrayList<ProcessInstance>();
    private FlowNode currentNode;
    private boolean debug;

    public FlowInstance(ProcessDefinition flowDefinition, boolean debug) {
        this.flowDefinition = flowDefinition;
        id = UUID.randomUUID().toString();
        this.debug = debug;
    }

    public boolean isDebug() {
        return debug;
    }

    @Override
    public ProcessDefinition getProcessDefinition() {
        return flowDefinition;
    }

    @Override
    public List<ProcessInstance> getChildren() {
        return children;
    }

    public void addChild(FlowInstance child) {
        children.add(child);
    }

    @Override
    public int getParallelInstanceCount() {
        return parallelInstanceCount;
    }

    public void setParallelInstanceCount(int parallelInstanceCount) {
        this.parallelInstanceCount = parallelInstanceCount;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public FlowNode getCurrentNode() {
        return currentNode;
    }

    public void setCurrentNode(FlowNode currentNode) {
        this.currentNode = currentNode;
    }

    public void setParent(FlowInstance parent) {
        this.parent = parent;
    }

    @Override
    public FlowInstance getParent() {
        return parent;
    }

    public FlowInstance newChildInstance(int childCount) {
        FlowInstance instance = new FlowInstance(flowDefinition, debug);
        instance.setParallelInstanceCount(childCount);
        instance.setParent(this);
        addChild(instance);
        return instance;
    }
}
