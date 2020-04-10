package com.bstek.urule.parse;

import com.bstek.urule.model.rule.loop.LoopEnd;
import com.bstek.urule.model.rule.loop.LoopRule;
import com.bstek.urule.model.rule.loop.LoopRuleUnit;
import com.bstek.urule.model.rule.loop.LoopStart;
import com.bstek.urule.model.rule.loop.LoopTarget;
import java.util.ArrayList;
import java.util.List;
import org.dom4j.Element;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年5月31日
 */
public class LoopRuleParser extends AbstractRuleParser<LoopRule> {

    private ValueParser valueParser;

    public LoopRule parse(Element element) {
        LoopRule rule = new LoopRule();
        parseRule(rule, element);

        LoopStart loopStart = new LoopStart();
        rule.setLoopStart(loopStart);
        LoopEnd loopEnd = new LoopEnd();
        rule.setLoopEnd(loopEnd);
        for (Object obj : element.elements()) {
            if (obj == null || !(obj instanceof Element)) {
                continue;
            }
            Element ele = (Element) obj;
            String name = ele.getName();
            if (name.equals("loop-start")) {
                loopStart.setActions(rhsParser.parseActions(ele));
            } else if (name.equals("loop-end")) {
                loopEnd.setActions(rhsParser.parseActions(ele));
            } else if (name.equals("loop-target")) {
                LoopTarget loopTarget = new LoopTarget();
                rule.setLoopTarget(loopTarget);
                for (Object eleObj : ele.elements()) {
                    if (eleObj == null || !(eleObj instanceof Element)) {
                        continue;
                    }
                    Element e = (Element) eleObj;
                    if (valueParser.support(e.getName())) {
                        loopTarget.setValue(valueParser.parse(e));
                        break;
                    }
                }
            }
        }

        // 添加循环规则
        List<LoopRuleUnit> units = new ArrayList<>();
        LoopRuleUnit loopRuleUnit = new LoopRuleUnit();
        loopRuleUnit.setName(rule.getName() + "-loopUnit");
        loopRuleUnit.setLhs(rule.getLhs());
        loopRuleUnit.setRhs(rule.getRhs());
        loopRuleUnit.setOther(rule.getOther());

        units.add(loopRuleUnit);
        rule.setUnits(units);

        return rule;
    }


    public void setValueParser(ValueParser valueParser) {
        this.valueParser = valueParser;
    }

    public boolean support(String name) {
        return name.equals("loop-rule");
    }
}
