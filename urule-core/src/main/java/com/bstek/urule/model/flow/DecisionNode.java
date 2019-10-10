package com.bstek.urule.model.flow;

import com.bstek.urule.action.Action;
import com.bstek.urule.action.VariableAssignAction;
import com.bstek.urule.model.flow.ins.FlowContext;
import com.bstek.urule.model.flow.ins.FlowInstance;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.*;
import com.bstek.urule.model.rule.lhs.LeftType;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.response.ExecutionResponseImpl;
import com.bstek.urule.runtime.response.NodeExecutionResponseImpl;

import java.util.*;
import java.util.logging.Logger;

public class DecisionNode extends BindingNode {
    private final Logger log = Logger.getLogger(DecisionNode.class.getName());
    private List<DecisionItem> items;
    private FlowNodeType type;
    private DecisionType decisionType;

    public DecisionNode() {
        this.type = FlowNodeType.Decision;
        this.decisionType = DecisionType.Criteria;
    }

    public DecisionNode(String name) {
        super(name);
        this.type = FlowNodeType.Decision;
        this.decisionType = DecisionType.Criteria;
    }

    public void enterNode(FlowContext context, FlowInstance instance) {
        instance.setCurrentNode(this);
        if (this.decisionType.equals(DecisionType.Criteria)) {
            this.doCriteria(context, instance);
        } else {
            this.doPercent(context, instance);
        }

        this.executeNodeEvent(EventType.enter, context, instance);
    }

    private void doPercent(FlowContext context, FlowInstance instance) {
        String nodeKey = instance.getProcessDefinition().getId() + "_" + this.getName();
        long total = this.getAmount(nodeKey, context) + 1L;
        List<PercentItem> percentItems = new ArrayList<>();
        Iterator var7 = this.items.iterator();

        while (var7.hasNext()) {
            DecisionItem item = (DecisionItem) var7.next();
            PercentItem percent = new PercentItem();
            percent.setName(item.getTo());
            percent.setPercent(item.getPercent());
            String itemKey = nodeKey + "." + item.getTo();
            long itemTotal = this.getAmount(itemKey, context);
            percent.setTotal(itemTotal);
            percentItems.add(percent);
        }

        PercentItem percentItem = this.computePercent(percentItems, total);
        this.setAmount(nodeKey, total, context);
        this.setAmount(nodeKey + "." + percentItem.getName(), percentItem.getTotal() + 1L, context);
        this.executeNodeEvent(EventType.leave, context, instance);
        this.leave(percentItem.getName(), context, instance);
    }

    private long getAmount(String key, FlowContext context) {
        Object value = context.getWorkingMemory().getSessionValue(key);
        return value == null ? 0L : (Long) value;
    }

    private void setAmount(String key, long value, FlowContext context) {
        context.getWorkingMemory().setSessionValue(key, value);
    }

    private void doCriteria(FlowContext context, FlowInstance instance) {
        KnowledgeSession session = this.executeKnowledgePackage(context, instance);
        this.executeNodeEvent(EventType.leave, context, instance);
        Object to = session.getParameter("return_to__");

        ExecutionResponseImpl executionResponse = (ExecutionResponseImpl) context.getResponse();

        NodeExecutionResponseImpl nodeExecutionResponse = new NodeExecutionResponseImpl();
        nodeExecutionResponse.setSort(executionResponse.getNodeExecutionResponseList().size() + 1);
        nodeExecutionResponse.setDecisionNodeName(this.name);
        nodeExecutionResponse.setDecisionNodeResult(to);
        executionResponse.addNodeExecutionResponse(nodeExecutionResponse);

        if (to == null) {
            this.log.info("Decision node [" + this.getName() + "] no matching conditions.");
        } else {
            // 记录分流流向
            executionResponse.addArrowList(to.toString());

            session.getParameters().remove("return_to__");
            this.leave(to.toString(), context, instance);
        }
    }

    private PercentItem computePercent(List<PercentItem> items, long total) {
        // 总权重
        int totalWeight = 0;
        // 权重item map
        Map<Integer, PercentItem> percentItemMap = new LinkedHashMap<>();

        for (PercentItem item : items) {
            totalWeight += item.getPercent();
            percentItemMap.put(totalWeight, item);
        }

        // 加权随机
        int random = (int) (Math.random() * totalWeight + 1);
        for (Integer key : percentItemMap.keySet()) {
            if (random <= key) {
                return percentItemMap.get(key);
            }
        }

        return items.get(0);
    }

    public FlowNodeType getType() {
        return this.type;
    }

    public List<DecisionItem> getItems() {
        return this.items;
    }

    public void setItems(List<DecisionItem> items) {
        this.items = items;
    }

    public RuleSet buildRuleSet(List<Library> libraries, boolean debug, String flowId) {
        RuleSet rs = new RuleSet();
        rs.setLibraries(libraries);
        List<Rule> rules = new ArrayList<>();
        rs.setRules(rules);
        int i = 0;
        Iterator var7 = this.items.iterator();

        while (var7.hasNext()) {
            DecisionItem item = (DecisionItem) var7.next();
            ++i;
            if (item.getConditionType() != null && !item.getConditionType().equals("script")) {
                Rule rule = new Rule();
                rules.add(rule);
                rule.setRuleType(RuleType.DECISION_RULE);
                rule.setLhs(item.getLhs());
                rule.setDebug(debug);
                rule.setName(flowId + "-" + this.getName() + "-decision" + i);
                Rhs rhs = new Rhs();
                rule.setRhs(rhs);
                List<Action> actions = new ArrayList<>();
                rhs.setActions(actions);
                VariableAssignAction action = new VariableAssignAction();
                actions.add(action);
                action.setDatatype(Datatype.String);
                action.setDebug(debug);
                action.setVariableCategory("parameter");
                action.setVariableLabel("return_to__");
                action.setVariableName("return_to__");
                action.setType(LeftType.variable);
                SimpleValue value = new SimpleValue();
                value.setContent(item.getTo());
                action.setValue(value);
            }
        }

        return rs;
    }

    public String buildDSLScript(List<Library> libraries, boolean debug, String flowId) {
        StringBuffer sb = new StringBuffer();
        if (libraries != null) {
            Iterator var5 = libraries.iterator();

            while (var5.hasNext()) {
                Library lib = (Library) var5.next();
                String path = lib.getPath();
                if (lib.getVersion() != null) {
                    path = path + ":" + lib.getVersion();
                }

                LibraryType type = lib.getType();
                switch (type) {
                    case Action:
                        sb.append("importActionLibrary \"" + path + "\"");
                        sb.append("\r\n");
                        break;
                    case Constant:
                        sb.append("importConstantLibrary \"" + path + "\"");
                        sb.append("\r\n");
                        break;
                    case Parameter:
                        sb.append("importParameterLibrary \"" + path + "\"");
                        sb.append("\r\n");
                        break;
                    case Variable:
                        sb.append("importVariableLibrary \"" + path + "\"");
                        sb.append("\r\n");
                }
            }
        }

        boolean exist = false;

        for (int i = 0; i < this.items.size(); ++i) {
            DecisionItem item = (DecisionItem) this.items.get(i);
            if (item.getConditionType() == null || !item.getConditionType().equals("config")) {
                exist = true;
                sb.append(item.buildDSLScript(i, debug, flowId, this.getName()));
                sb.append("\r\n");
            }
        }

        if (exist) {
            return sb.toString();
        } else {
            return null;
        }
    }

    public DecisionType getDecisionType() {
        return this.decisionType;
    }

    public void setDecisionType(DecisionType decisionType) {
        this.decisionType = decisionType;
    }
}
