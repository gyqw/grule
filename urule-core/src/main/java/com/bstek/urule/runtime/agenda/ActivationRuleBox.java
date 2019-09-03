package com.bstek.urule.runtime.agenda;

import com.bstek.urule.action.ActionValue;
import com.bstek.urule.model.rule.RuleInfo;
import com.bstek.urule.runtime.rete.Context;

import java.util.ArrayList;
import java.util.List;

/**
 * 所有未定义activation-group及agenda-group的满足条件的规则都放在此处
 */
public class ActivationRuleBox extends AbstractRuleBox {
    private List<Activation> activations = new ArrayList<>();

    public ActivationRuleBox(Context context, List<RuleInfo> executedRules) {
        super(context, executedRules);
    }

    public List<RuleInfo> execute(AgendaFilter filter, int max, List<ActionValue> actionValues) {
        Activation activation = findNextActivation();
        List<RuleInfo> ruleInfos = new ArrayList<>();
        while (activation != null) {
            ActivationImpl ac = (ActivationImpl) activation;
            ac.setProcessed(true);
            if (filter != null && !filter.accept(activation)) {
                continue;
            }
            if (ruleInfos.size() >= max) {
                break;
            }
            RuleInfo ruleInfo = activation.execute(context, executedRules, actionValues);
            if (ruleInfo != null) {
                ruleInfos.add(ruleInfo);
            }
            activation = RuleGroup.fetchNextExecutableActivation(activations);
        }
        return ruleInfos;
    }

    public Activation findNextActivation() {
        return RuleGroup.fetchNextExecutableActivation(activations);
    }

    @Override
    public RuleBox next() {
        Activation activation = findNextActivation();
        if (activation != null) {
            return this;
        }
        return null;
    }

    @Override
    public void clean() {
        executedRules.clear();
        activations.clear();
        rules.clear();
    }

    public void retract(Object obj) {
        super.retract(obj, activations);
    }


    @Override
    public boolean add(Activation activation) {
        boolean shouldAdd = this.activationShouldAdd(activation);
        if (!shouldAdd) {
            return false;
        }
        rules.add(activation.getRule());
        return addActivation(activation, activations);
    }
}
