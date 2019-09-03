package com.bstek.urule.model.flow;

import com.bstek.urule.model.rule.Library;

import java.util.List;

/**
 * @author Jacky.gao
 * @since 2015年7月20日
 */
public interface ProcessDefinition {
    List<Library> getLibraries();

    String getId();

    boolean isDebug();

    List<FlowNode> getNodes();

}
