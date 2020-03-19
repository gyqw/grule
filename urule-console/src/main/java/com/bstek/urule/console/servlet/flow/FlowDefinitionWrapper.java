package com.bstek.urule.console.servlet.flow;

import com.bstek.urule.model.flow.FlowNode;
import com.bstek.urule.model.flow.ProcessDefinition;
import com.bstek.urule.model.rule.Library;

import java.util.List;

/**
 * @author Jacky.gao
 * 2016年7月27日
 */
public class FlowDefinitionWrapper {
    private String id;
    private boolean debug;
    private List<Library> libraries;
    private List<FlowNode> nodes;

    public FlowDefinitionWrapper(ProcessDefinition flowDefinition) {
        this.id = flowDefinition.getId();
        this.debug = flowDefinition.isDebug();
        this.libraries = flowDefinition.getLibraries();
        this.nodes = flowDefinition.getNodes();
    }

    public List<FlowNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<FlowNode> nodes) {
        this.nodes = nodes;
    }

    public List<Library> getLibraries() {
        return libraries;
    }

    public void setLibraries(List<Library> libraries) {
        this.libraries = libraries;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isDebug() {
        return debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }

}
