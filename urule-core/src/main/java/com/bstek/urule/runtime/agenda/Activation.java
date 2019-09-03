package com.bstek.urule.runtime.agenda;

import com.bstek.urule.action.ActionValue;
import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.model.rule.RuleInfo;
import com.bstek.urule.runtime.rete.Context;

import java.util.List;

public interface Activation extends Comparable<Activation> {
    boolean isProcessed();

    Rule getRule();

    boolean contain(Object var1);

    RuleInfo execute(Context var1, List<RuleInfo> var2, List<ActionValue> var3);
}
