package com.bstek.urule.runtime.agenda;

import com.bstek.urule.action.ActionValue;
import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.model.rule.RuleInfo;

import java.util.List;

public interface RuleBox {

    List<RuleInfo> execute(AgendaFilter filter, int max, List<ActionValue> actionValues);

    boolean add(Activation activation);

    RuleBox next();

    List<Rule> getRules();

    void retract(Object obj);

    void clean();
}
