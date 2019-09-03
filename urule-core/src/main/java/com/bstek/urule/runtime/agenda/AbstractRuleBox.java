package com.bstek.urule.runtime.agenda;

import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.model.rule.RuleInfo;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.event.impl.ActivationCancelledEventImpl;
import com.bstek.urule.runtime.rete.Context;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public abstract class AbstractRuleBox implements RuleBox {
    protected List<RuleInfo> executedRules;
    protected Context context;
    protected List<Rule> rules;

    public AbstractRuleBox(Context context, List<RuleInfo> executedRules) {
        this.context = context;
        this.rules = new ArrayList();
        this.executedRules = executedRules;
    }

    protected void retract(Object obj, List<Activation> activations) {
        List<Activation> needRemovedList = new ArrayList();
        Iterator var4 = activations.iterator();

        while (var4.hasNext()) {
            Activation activation = (Activation) var4.next();
            if (activation.contain(obj)) {
                needRemovedList.add(activation);
            }
        }

        KnowledgeSession session = (KnowledgeSession) this.context.getWorkingMemory();
        Iterator var7 = needRemovedList.iterator();

        while (var7.hasNext()) {
            Activation ac = (Activation) var7.next();
            activations.remove(ac);
            session.fireEvent(new ActivationCancelledEventImpl(ac, session));
        }

    }

    protected boolean addActivation(Activation activation, List<Activation> list) {
        boolean result = list.add(activation);
        Collections.sort(list);
        return result;
    }

    protected boolean activationShouldAdd(Activation activation) {
        Rule rule = activation.getRule();
        Iterator var3 = this.rules.iterator();

        Rule r;
        do {
            if (!var3.hasNext()) {
                return true;
            }

            r = (Rule) var3.next();
        } while (!r.equals(rule));

        if (r.getLoop() != null && r.getLoop()) {
            return true;
        } else {
            return false;
        }
    }

    public List<Rule> getRules() {
        return this.rules;
    }
}
