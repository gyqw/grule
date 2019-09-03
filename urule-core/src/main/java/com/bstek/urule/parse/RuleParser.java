package com.bstek.urule.parse;

import com.bstek.urule.model.rule.Rule;
import org.dom4j.Element;

public class RuleParser extends AbstractRuleParser<Rule> {
    public Rule parse(Element element) {
        Rule rule = new Rule();
        parseRule(rule, element);
        return rule;
    }

    public boolean support(String name) {
        return name.equals("rule");
    }
}
