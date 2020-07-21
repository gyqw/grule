package com.bstek.urule.parse;

import com.bstek.urule.Configure;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.rule.Rule;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Element;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public abstract class AbstractRuleParser<T> implements Parser<T> {
    protected LhsParser lhsParser;
    protected RhsParser rhsParser;
    private OtherParser otherParser;

    public void parseRule(Rule rule, Element element) {
        rule.setName(element.attributeValue("name"));
        String salience = element.attributeValue("salience");
        if (StringUtils.isNotEmpty(salience)) {
            rule.setSalience(Integer.valueOf(salience));
        }
        String effectiveDate = element.attributeValue("effective-date");
        SimpleDateFormat sd = new SimpleDateFormat(Configure.getDateFormat());
        if (StringUtils.isNotEmpty(effectiveDate)) {
            try {
                rule.setEffectiveDate(sd.parse(effectiveDate));
            } catch (ParseException e) {
                throw new RuleException(e);
            }
        }
        String expiresDate = element.attributeValue("expires-date");
        if (StringUtils.isNotEmpty(expiresDate)) {
            try {
                rule.setExpiresDate(sd.parse(expiresDate));
            } catch (ParseException e) {
                throw new RuleException(e);
            }
        }
        String enabled = element.attributeValue("enabled");
        if (StringUtils.isNotEmpty(enabled)) {
            rule.setEnabled(Boolean.valueOf(enabled));
        }
        String debug = element.attributeValue("debug");
        if (StringUtils.isNotEmpty(debug)) {
            rule.setDebug(Boolean.valueOf(debug));
        }
        String loop = element.attributeValue("loop");
        if (StringUtils.isNotEmpty(loop)) {
            rule.setLoop(Boolean.valueOf(loop));
        }
        rule.setActivationGroup(element.attributeValue("activation-group"));
        rule.setAgendaGroup(element.attributeValue("agenda-group"));
        String autoFocus = element.attributeValue("auto-focus");
        if (StringUtils.isNotEmpty(autoFocus)) {
            rule.setAutoFocus(Boolean.valueOf(autoFocus));
        }
        rule.setRuleflowGroup(element.attributeValue("ruleflow-group"));

        for (Object obj : element.elements()) {
            if (obj == null || !(obj instanceof Element)) {
                continue;
            }
            Element ele = (Element) obj;
            if (lhsParser.support(ele.getName())) {
                rule.setLhs(lhsParser.parse(ele));
            } else if (rhsParser.support(ele.getName())) {
                rule.setRhs(rhsParser.parse(ele));
            } else if (otherParser.support(ele.getName())) {
                rule.setOther(otherParser.parse(ele));
            } else if (ele.getName().equals("remark")) {
                rule.setRemark(ele.getText());
            }
        }
    }

    public void setLhsParser(LhsParser lhsParser) {
        this.lhsParser = lhsParser;
    }

    public void setRhsParser(RhsParser rhsParser) {
        this.rhsParser = rhsParser;
    }

    public void setOtherParser(OtherParser otherParser) {
        this.otherParser = otherParser;
    }
}
