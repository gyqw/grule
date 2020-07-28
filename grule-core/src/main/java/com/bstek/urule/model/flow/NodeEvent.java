package com.bstek.urule.model.flow;

import com.bstek.urule.model.flow.ins.FlowContext;
import com.bstek.urule.model.flow.ins.ProcessInstance;

/**
 * @author Jacky.gao
 * @since 2015年4月20日
 */
public interface NodeEvent {
    /**
     * 规则流流入当前节点触发的方法
     *
     * @param node     当前节点对象
     * @param instance 当前规则流实例对象
     * @param context  规则流上下文件对象
     */
    void enter(FlowNode node, ProcessInstance instance, FlowContext context);

    /**
     * 规则流流出当前节点触发的方法
     *
     * @param node     当前节点对象
     * @param instance 当前规则流实例对象
     * @param context  规则流上下文件对象
     */
    void leave(FlowNode node, ProcessInstance instance, FlowContext context);
}
