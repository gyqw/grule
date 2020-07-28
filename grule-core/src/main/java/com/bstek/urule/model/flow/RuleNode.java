package com.bstek.urule.model.flow;

import com.bstek.urule.model.flow.ins.FlowContext;
import com.bstek.urule.model.flow.ins.FlowInstance;
import org.slf4j.Logger;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年4月20日
 */
public class RuleNode extends BindingNode {
    private FlowNodeType type = FlowNodeType.Rule;
    // 规则文件或决策表文件的路径
    private String file;
    private String version;

    public RuleNode() {
    }

    public RuleNode(String name) {
        super(name);
    }

    @Override
    public FlowNodeType getType() {
        return type;
    }

    @Override
    public void enterNode(FlowContext context, FlowInstance instance) {
        instance.setCurrentNode(this);
        executeNodeEvent(EventType.enter, context, instance);
        executeKnowledgePackage(context, instance);
        executeNodeEvent(EventType.leave, context, instance);
        leave(null, context, instance);
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
