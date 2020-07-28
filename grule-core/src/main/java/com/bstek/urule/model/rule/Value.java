package com.bstek.urule.model.rule;

/**
 * @author Jacky.gao
 * 2014年12月25日
 */
public interface Value {
    ComplexArithmetic getArithmetic();

    ValueType getValueType();

    String getId();
}
