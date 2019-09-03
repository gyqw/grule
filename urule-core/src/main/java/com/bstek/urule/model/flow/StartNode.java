package com.bstek.urule.model.flow;

import com.bstek.urule.model.flow.ins.FlowContext;
import com.bstek.urule.model.flow.ins.FlowInstance;
import com.bstek.urule.runtime.KnowledgeSession;
import com.bstek.urule.runtime.event.impl.ProcessAfterStartedEventImpl;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年4月20日
 */
public class StartNode extends FlowNode {
    private FlowNodeType type = FlowNodeType.Start;

    public StartNode() {
    }

    public StartNode(String name) {
        super(name);
    }

    @Override
    public FlowNodeType getType() {
        return type;
    }

    @Override
    public void enterNode(FlowContext context, FlowInstance instance) {
        KnowledgeSession session = (KnowledgeSession) context.getWorkingMemory();
        session.fireEvent(new ProcessAfterStartedEventImpl(instance, session));
        executeNodeEvent(EventType.enter, context, instance);
        executeNodeEvent(EventType.leave, context, instance);
        leave(null, context, instance);
    }
}
