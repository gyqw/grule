package com.bstek.urule.parse;

import com.bstek.urule.builder.RulesRebuilder;
import com.bstek.urule.model.rule.Library;
import com.bstek.urule.model.rule.LibraryType;
import com.bstek.urule.model.rule.Rule;
import com.bstek.urule.model.rule.RuleSet;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Element;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Jacky.gao
 * 2014年12月23日
 */
public class RuleSetParser implements Parser<RuleSet> {
    private RuleParser ruleParser;
    private LoopRuleParser loopRuleParser;
    private RulesRebuilder rulesRebuilder;

    public RuleSet parse(Element element) {
        RuleSet ruleSet = new RuleSet();
        String parameterLibrary = element.attributeValue("parameter-library");
        if (StringUtils.isNotEmpty(parameterLibrary)) {
            ruleSet.addLibrary(new Library(parameterLibrary, null, LibraryType.Parameter));
        }
        List<Rule> rules = new ArrayList<>();
        for (Object obj : element.elements()) {
            if (obj == null) {
                continue;
            }
            if (!(obj instanceof Element)) {
                continue;
            }
            Element ele = (Element) obj;
            String name = ele.getName();
            if (ruleParser.support(name)) {
                rules.add(ruleParser.parse(ele));
            } else if (loopRuleParser.support(name)) {
                rules.add(loopRuleParser.parse(ele));
            } else if (name.equals("import-variable-library")) {
                ruleSet.addLibrary(new Library(ele.attributeValue("path"), null, LibraryType.Variable));
            } else if (name.equals("import-constant-library")) {
                ruleSet.addLibrary(new Library(ele.attributeValue("path"), null, LibraryType.Constant));
            } else if (name.equals("import-action-library")) {
                ruleSet.addLibrary(new Library(ele.attributeValue("path"), null, LibraryType.Action));
            } else if (name.equals("import-parameter-library")) {
                ruleSet.addLibrary(new Library(ele.attributeValue("path"), null, LibraryType.Parameter));
            } else if (name.equals("remark")) {
                ruleSet.setRemark(ele.getText());
            }
        }
        ruleSet.setRules(rules);
        rulesRebuilder.rebuildRules(ruleSet.getLibraries(), rules);
        return ruleSet;
    }

    public void setRulesRebuilder(RulesRebuilder rulesRebuilder) {
        this.rulesRebuilder = rulesRebuilder;
    }

    public boolean support(String name) {
        return name.equals("rule-set");
    }

    public void setRuleParser(RuleParser ruleParser) {
        this.ruleParser = ruleParser;
    }

    public void setLoopRuleParser(LoopRuleParser loopRuleParser) {
        this.loopRuleParser = loopRuleParser;
    }
}
