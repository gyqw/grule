package com.bstek.urule.model;

import com.bstek.urule.model.rule.Rule;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.ObjectCodec;
import org.codehaus.jackson.map.DeserializationContext;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * @author Jacky.gao
 * 2015年10月21日
 */
public class RuleJsonDeserializer extends AbstractJsonDeserializer<List<Rule>> {
    @Override
    public List<Rule> deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        ObjectCodec oc = jp.getCodec();
        JsonNode jsonNode = oc.readTree(jp);
        Iterator<JsonNode> childrenNodesIter = jsonNode.getElements();
        List<Rule> rules = new ArrayList<Rule>();
        while (childrenNodesIter.hasNext()) {
            JsonNode childNode = childrenNodesIter.next();
            rules.add(parseRule(jp, childNode));
        }
        return rules;
    }
}
