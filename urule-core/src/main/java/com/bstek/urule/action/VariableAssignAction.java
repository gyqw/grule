package com.bstek.urule.action;

import com.bstek.urule.Utils;
import com.bstek.urule.debug.MsgType;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.Value;
import com.bstek.urule.model.rule.lhs.LeftType;
import com.bstek.urule.runtime.rete.Context;
import com.bstek.urule.runtime.rete.ValueCompute;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.List;


public class VariableAssignAction extends AbstractAction {
    private String referenceName;
    private String variableName;
    private String variableLabel;
    private String variableCategory;
    private Datatype datatype;
    private Value value;
    private LeftType type;
    private ActionType actionType;

    public VariableAssignAction() {
        this.actionType = ActionType.VariableAssign;
    }

    public ActionValue execute(Context context, Object matchedObject, List<Object> allMatchedObjects) {
        Object targetFact = null;
        ValueCompute valueCompute = context.getValueCompute();
        Object obj = null;
        if (this.value == null) {
            return null;
        } else {
            obj = valueCompute.complexValueCompute(this.value, matchedObject, context, allMatchedObjects);
            String label = null;
            String className = context.getVariableCategoryClass(this.variableCategory);
            if (className.equals(HashMap.class.getName())) {
                targetFact = context.getWorkingMemory().getParameters();
            } else {
                targetFact = valueCompute.findObject(className, matchedObject, context);
            }

            if (targetFact == null) {
                throw new RuleException("Class[" + className + "] not found in workingmemory.");
            } else {
                if (this.datatype.equals(Datatype.Enum) && obj != null && StringUtils.isNotBlank(obj.toString())) {
                    PropertyDescriptor pd = BeanUtils.getPropertyDescriptor(targetFact.getClass(), this.variableName);
                    Class<Enum> targetClass = (Class<Enum>) pd.getPropertyType();
                    obj = Enum.valueOf(targetClass, obj.toString());
                } else if (obj != null) {
                    obj = this.datatype.convert(obj);
                }

                String propertyName = this.variableName;
                label = this.variableCategory + "." + (this.variableLabel == null ? this.variableName : this.variableLabel);
                Utils.setObjectProperty(targetFact, propertyName, obj);

                // 执行信息
                String msg = "### 变量赋值：" + label + "=" + obj;
                context.logMsg(msg, MsgType.VarAssign);

                return null;
            }
        }

    }

    public LeftType getType() {
        return this.type;
    }

    public void setType(LeftType type) {
        this.type = type;
    }

    public String getReferenceName() {
        return this.referenceName;
    }

    public void setReferenceName(String referenceName) {
        this.referenceName = referenceName;
    }

    public String getVariableName() {
        return this.variableName;
    }

    public void setVariableName(String variableName) {
        this.variableName = variableName;
    }

    public String getVariableLabel() {
        return this.variableLabel;
    }

    public void setVariableLabel(String variableLabel) {
        this.variableLabel = variableLabel;
    }

    public String getVariableCategory() {
        return this.variableCategory;
    }

    public void setVariableCategory(String variableCategory) {
        this.variableCategory = variableCategory;
    }

    public Value getValue() {
        return this.value;
    }

    public void setValue(Value value) {
        this.value = value;
    }

    public Datatype getDatatype() {
        return this.datatype;
    }

    public void setDatatype(Datatype datatype) {
        this.datatype = datatype;
    }

    public ActionType getActionType() {
        return this.actionType;
    }
}
