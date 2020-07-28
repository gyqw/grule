package com.bstek.urule.action;

import com.bstek.urule.debug.MsgType;
import com.bstek.urule.model.rule.Value;
import com.bstek.urule.runtime.rete.Context;
import com.bstek.urule.runtime.rete.ValueCompute;

import java.math.BigDecimal;
import java.util.List;

public class ConsolePrintAction extends AbstractAction {
    private Value value;
    private ActionType actionType = ActionType.ConsolePrint;

    public ActionValue execute(Context context, Object matchedObject, List<Object> allMatchedObjects) {
        ValueCompute valueCompute = (ValueCompute) context.getApplicationContext().getBean(ValueCompute.BEAN_ID);
        Object content = valueCompute.complexValueCompute(value, matchedObject, context, allMatchedObjects);
        if (content instanceof BigDecimal) {
            BigDecimal b = (BigDecimal) content;
            context.logMsg("☢☢☢ 控制台输出：" + b.toPlainString(), MsgType.ConsoleOutput);
        } else if (content instanceof Double) {
            Double d = (Double) content;
            context.logMsg("☢☢☢ 控制台输出：" + d.toString(), MsgType.ConsoleOutput);
        } else {
            String msg = (content == null ? "null" : content.toString());
            context.logMsg("☢☢☢ 控制台输出：" + msg, MsgType.ConsoleOutput);
        }
        return null;
    }

    public Value getValue() {
        return value;
    }

    public void setValue(Value value) {
        this.value = value;
    }

    public ActionType getActionType() {
        return actionType;
    }
}
