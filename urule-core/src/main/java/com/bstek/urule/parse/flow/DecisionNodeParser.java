package com.bstek.urule.parse.flow;

import com.bstek.urule.model.flow.DecisionItem;
import com.bstek.urule.model.flow.DecisionNode;
import com.bstek.urule.model.flow.DecisionType;
import com.bstek.urule.parse.LhsParser;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Element;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * @author Jacky.gao
 * 2014年12月23日
 */
public class DecisionNodeParser extends FlowNodeParser<DecisionNode> {
    private LhsParser lhsParser;

    public DecisionNodeParser() {
    }

    public DecisionNode parse(Element element) {
        DecisionNode decision = new DecisionNode(element.attributeValue("name"));
        decision.setEventBean(element.attributeValue("event-bean"));
        String decitionType = element.attributeValue("decision-type");
        if (StringUtils.isNotEmpty(decitionType)) {
            decision.setDecisionType(DecisionType.valueOf(decitionType));
        }

        decision.setX(element.attributeValue("x"));
        decision.setY(element.attributeValue("y"));
        decision.setWidth(element.attributeValue("width"));
        decision.setHeight(element.attributeValue("height"));
        decision.setConnections(this.parseConnections(element));
        List<DecisionItem> items = new ArrayList();
        Iterator var5 = element.elements().iterator();

        while (var5.hasNext()) {
            Object obj = var5.next();
            if (obj != null && obj instanceof Element) {
                Element ele = (Element) obj;
                if (ele.getName().equals("item")) {
                    DecisionItem item = this.parseDecisionItem(ele);
                    items.add(item);
                }
            }
        }

        decision.setItems(items);
        return decision;
    }

    private DecisionItem parseDecisionItem(Element element) {
        DecisionItem item = new DecisionItem();
        item.setTo(element.attributeValue("connection"));
        String percent = element.attributeValue("percent");
        if (StringUtils.isNotEmpty(percent)) {
            item.setPercent(Integer.parseInt(percent));
        }

        String conditionType = element.attributeValue("condition-type");
        if (conditionType == null) {
            conditionType = "script";
        }

        item.setConditionType(conditionType);
        if (conditionType.equals("script")) {
            String script = element.getStringValue();
            item.setScript(script);
        } else {
            Iterator var8 = element.elements().iterator();

            while (var8.hasNext()) {
                Object obj = var8.next();
                if (obj != null && obj instanceof Element) {
                    Element ele = (Element) obj;
                    if (this.lhsParser.support(ele.getName())) {
                        item.setLhs(this.lhsParser.parse(ele));
                        item.setLhsXml(ele.asXML());
                    }
                }
            }
        }

        return item;
    }

    public boolean support(String name) {
        return name.equals("decision");
    }

    public void setLhsParser(LhsParser lhsParser) {
        this.lhsParser = lhsParser;
    }
}
