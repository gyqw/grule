package com.bstek.urule.parse.deserializer;

import com.bstek.urule.model.rule.RuleSet;
import com.bstek.urule.parse.RuleSetParser;
import org.dom4j.Element;

/**
 * @author Jacky.gao
 * @since 2014年12月23日
 */
public class RuleSetDeserializer implements Deserializer<RuleSet> {

    public static final String BEAN_ID = "urule.ruleSetDeserializer";
    private RuleSetParser ruleSetParser;

    public RuleSet deserialize(Element root) {
        return ruleSetParser.parse(root);
    }

    public boolean support(Element root) {
        if (ruleSetParser.support(root.getName())) {
            return true;
        } else {
            return false;
        }
    }

    public void setRuleSetParser(RuleSetParser ruleSetParser) {
        this.ruleSetParser = ruleSetParser;
    }
}
