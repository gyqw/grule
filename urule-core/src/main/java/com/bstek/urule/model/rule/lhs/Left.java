package com.bstek.urule.model.rule.lhs;

import com.bstek.urule.model.rule.ComplexArithmetic;
import org.codehaus.jackson.annotate.JsonIgnore;

public class Left {
    @JsonIgnore
    private String id;
    private LeftPart leftPart;
    private LeftType type;
    private ComplexArithmetic arithmetic;

    public Left() {
    }

    public LeftPart getLeftPart() {
        return this.leftPart;
    }

    public void setLeftPart(LeftPart leftPart) {
        this.leftPart = leftPart;
    }

    public ComplexArithmetic getArithmetic() {
        return this.arithmetic;
    }

    public void setArithmetic(ComplexArithmetic arithmetic) {
        this.arithmetic = arithmetic;
    }

    public LeftType getType() {
        return this.type;
    }

    public void setType(LeftType type) {
        this.type = type;
    }

    public String getId() {
        if (this.id == null) {
            this.id = this.leftPart.getId();
            if (this.arithmetic != null) {
                this.id = this.id + this.arithmetic.getId();
            }
        }

        return this.id;
    }
}
