package com.bstek.urule.runtime;

import com.bstek.urule.model.flow.FlowDefinition;
import com.bstek.urule.model.rete.Rete;
import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.runtime.rete.ReteInstance;

import java.util.List;
import java.util.Map;

public interface KnowledgePackage {
    Rete getRete();

    Map<String, String> getVariableCateogoryMap();

    Map<String, FlowDefinition> getFlowMap();

    Map<String, String> getParameters();

    ReteInstance newReteInstance();

    long getTimestamp();

    void resetTimestamp();

    List<Rule> getNoLhsRules();

    List<Rule> getWithElseRules();

    String getId();
}
