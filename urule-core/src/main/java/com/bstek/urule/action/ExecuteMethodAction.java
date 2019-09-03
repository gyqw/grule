package com.bstek.urule.action;

import com.bstek.urule.debug.MsgType;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.Parameter;
import com.bstek.urule.runtime.rete.Context;
import com.bstek.urule.runtime.rete.ValueCompute;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.*;

public class ExecuteMethodAction extends AbstractAction {
    private String beanId;
    private String beanLabel;
    private String methodLabel;
    private String methodName;
    private List<Parameter> parameters;
    private ActionType actionType;

    public ExecuteMethodAction() {
        this.actionType = ActionType.ExecuteMethod;
    }

    public ActionValue execute(Context context, Object matchedObject, List<Object> allMatchedObjects) {
        String info = (beanLabel == null ? beanId : beanLabel) + (methodLabel == null ? methodName : methodLabel);
        info = "$$$ 执行动作：" + info;
        try {
            Object obj = context.getApplicationContext().getBean(beanId);
            java.lang.reflect.Method method = null;
            if (parameters != null && parameters.size() > 0) {
                ParametersWrap wrap = buildParameterClasses(context, matchedObject, allMatchedObjects);
                Method[] methods = obj.getClass().getMethods();
                Datatype[] targetDatatypes = wrap.getDatatypes();
                boolean match = false;
                for (Method m : methods) {
                    method = m;
                    String name = m.getName();
                    if (!name.equals(methodName)) {
                        continue;
                    }
                    Class<?> parameterClasses[] = m.getParameterTypes();
                    if (parameterClasses.length != parameters.size()) {
                        continue;
                    }
                    for (int i = 0; i < parameterClasses.length; i++) {
                        Class<?> clazz = parameterClasses[i];
                        Datatype datatype = targetDatatypes[i];
                        match = classMatch(clazz, datatype);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        break;
                    }
                }
                if (!match) {
                    throw new RuleException("Bean [" + beanId + "." + methodName + "] with " + parameters.size() + " parameters not exist");
                }
                String valueKey = methodName;
                ActionId actionId = method.getAnnotation(ActionId.class);
                if (actionId != null) {
                    valueKey = actionId.value();
                }
                Object value = method.invoke(obj, wrap.getValues());

                // 执行信息
                String msg = info + "(" + wrap.valuesToString() + ")";
                context.logMsg(msg, MsgType.ExecuteBeanMethod);

                if (value != null) {
                    return new ActionValueImpl(valueKey, value);
                } else {
                    return null;
                }
            } else {
                method = obj.getClass().getMethod(methodName, new Class[]{});
                String valueKey = methodName;
                ActionId actionId = method.getAnnotation(ActionId.class);
                if (actionId != null) {
                    valueKey = actionId.value();
                }
                Object value = method.invoke(obj);

                // 执行信息
                String msg = info + "()";
                context.logMsg(msg, MsgType.ExecuteBeanMethod);

                if (value != null) {
                    return new ActionValueImpl(valueKey, value);
                } else {
                    return null;
                }
            }
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    private boolean classMatch(Class<?> clazz, Datatype datatype) {
        boolean match = false;
        switch (datatype) {
            case String:
                if (clazz.equals(String.class)) {
                    match = true;
                }
                break;
            case BigDecimal:
                if (clazz.equals(BigDecimal.class)) {
                    match = true;
                }
                break;
            case Boolean:
                if (clazz.equals(Boolean.class) || clazz.equals(boolean.class)) {
                    match = true;
                }
                break;
            case Date:
                if (clazz.equals(Date.class)) {
                    match = true;
                }
                break;
            case Double:
                if (clazz.equals(Double.class) || clazz.equals(double.class)) {
                    match = true;
                }
                break;
            case Enum:
                if (Enum.class.isAssignableFrom(clazz)) {
                    match = true;
                }
                break;
            case Float:
                if (clazz.equals(Float.class) || clazz.equals(float.class)) {
                    match = true;
                }
                break;
            case Integer:
                if (clazz.equals(Integer.class) || clazz.equals(int.class)) {
                    match = true;
                }
                break;
            case Char:
                if (clazz.equals(Character.class) || clazz.equals(char.class)) {
                    match = true;
                }
                break;
            case List:
                if (List.class.isAssignableFrom(clazz)) {
                    match = true;
                }
                break;
            case Long:
                if (clazz.equals(Long.class) || clazz.equals(long.class)) {
                    match = true;
                }
                break;
            case Map:
                if (Map.class.isAssignableFrom(clazz)) {
                    match = true;
                }
                break;
            case Set:
                if (Set.class.isAssignableFrom(clazz)) {
                    match = true;
                }
                break;
            case Object:
                match = true;
                break;
        }
        return match;
    }

    private ParametersWrap buildParameterClasses(Context context, Object matchedObject, List<Object> allMatchedObjects) {
        List<Datatype> list = new ArrayList<>();
        List<Object> values = new ArrayList<>();
        ValueCompute valueCompute = context.getValueCompute();
        for (Parameter param : parameters) {
            Datatype type = param.getType();
            list.add(type);
            Object value = valueCompute.complexValueCompute(param.getValue(), matchedObject, context, allMatchedObjects);
            values.add(type.convert(value));
        }
        Datatype[] datatypes = new Datatype[list.size()];
        list.toArray(datatypes);
        Object[] objs = new Object[values.size()];
        values.toArray(objs);
        ParametersWrap wrap = new ParametersWrap();
        wrap.setDatatypes(datatypes);
        wrap.setValues(objs);
        return wrap;
    }

    public String getMethodLabel() {
        return methodLabel;
    }

    public void setMethodLabel(String methodLabel) {
        this.methodLabel = methodLabel;
    }

    public String getBeanId() {
        return beanId;
    }

    public void setBeanId(String beanId) {
        this.beanId = beanId;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getBeanLabel() {
        return beanLabel;
    }

    public void setBeanLabel(String beanLabel) {
        this.beanLabel = beanLabel;
    }

    public List<Parameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

    public void addParameter(Parameter parameter) {
        if (parameters == null) {
            parameters = new ArrayList<Parameter>();
        }
        parameters.add(parameter);
    }

    public ActionType getActionType() {
        return actionType;
    }
}

class ParametersWrap {
    private Datatype[] datatypes;
    private Object[] values;

    public Datatype[] getDatatypes() {
        return datatypes;
    }

    public void setDatatypes(Datatype[] datatypes) {
        this.datatypes = datatypes;
    }

    public Object[] getValues() {
        return values;
    }

    public void setValues(Object[] values) {
        this.values = values;
    }

    public String valuesToString() {
        if (values == null) {
            return "";
        }
        StringBuffer sb = new StringBuffer();
        for (Object obj : values) {
            if (sb.length() > 0) {
                sb.append(",");
            }
            if (obj == null) {
                sb.append("null");
            } else {
                sb.append(obj);
            }
        }
        return sb.toString();
    }
}
