package com.bstek.urule.model.flow;

import com.bstek.urule.model.flow.ins.FlowContext;
import com.bstek.urule.model.flow.ins.ProcessInstance;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.KnowledgePackageWrapper;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.KnowledgeSessionFactory;
import com.bstek.urule.runtime.response.ExecutionResponseImpl;
import com.bstek.urule.runtime.response.FlowExecutionResponse;
import com.bstek.urule.runtime.response.RuleExecutionResponse;

import java.util.Map;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年4月20日
 */
public abstract class BindingNode extends FlowNode {
    private KnowledgePackageWrapper knowledgePackageWrapper;

    public BindingNode() {
    }

    public BindingNode(String name) {
        super(name);
    }

    protected KnowledgeSession executeKnowledgePackage(FlowContext context, ProcessInstance instance) {
        KnowledgeSession parentSession = (KnowledgeSession) context.getWorkingMemory();
        KnowledgePackage knowledgePackage = this.knowledgePackageWrapper.getKnowledgePackage();
        KnowledgeSession session = KnowledgeSessionFactory.newKnowledgeSession(this.knowledgePackageWrapper, context, parentSession);
        if (knowledgePackage.getFlowMap() != null && knowledgePackage.getFlowMap().size() != 0) {
            String processId = knowledgePackage.getFlowMap().values().iterator().next().getId();
            FlowExecutionResponse flowExecutionResponse = session.startProcess(processId, context.getVariables());
            ((ExecutionResponseImpl) context.getResponse()).addFlowExecutionResponse(flowExecutionResponse);
        } else {
            RuleExecutionResponse ruleExecutionResponse = session.fireRules(context.getVariables());
            ((ExecutionResponseImpl) context.getResponse()).addRuleExecutionResponse(ruleExecutionResponse);
        }

        Map<String, Object> parameters = session.getParameters();
        Map<String, Object> variables = context.getVariables();

        for (String key : parameters.keySet()) {
            if (!key.equals("return_to__")) {
                variables.put(key, parameters.get(key));
            }
        }

        return session;
    }

    public KnowledgePackageWrapper getKnowledgePackageWrapper() {
        return this.knowledgePackageWrapper;
    }

    public void setKnowledgePackageWrapper(KnowledgePackageWrapper knowledgePackageWrapper) {
        this.knowledgePackageWrapper = knowledgePackageWrapper;
    }
}
