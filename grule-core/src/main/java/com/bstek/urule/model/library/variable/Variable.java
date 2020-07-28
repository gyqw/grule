package com.bstek.urule.model.library.variable;

import com.bstek.urule.model.library.Datatype;

/**
 * @author Jacky.gao
 * @since 2014年12月23日
 */
public class Variable {

    private String name;
    private String label;
    private Datatype type;
    private String defaultValue;
    private Act act;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Datatype getType() {
        return type;
    }

    public void setType(Datatype type) {
        this.type = type;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public Act getAct() {
        return act;
    }

    public void setAct(Act act) {
        this.act = act;
    }

    @Override
    public String toString() {
        return "Variable{" +
                "name='" + name + '\'' +
                ", label='" + label + '\'' +
                ", type=" + type +
                ", defaultValue='" + defaultValue + '\'' +
                ", act=" + act +
                '}';
    }
}
