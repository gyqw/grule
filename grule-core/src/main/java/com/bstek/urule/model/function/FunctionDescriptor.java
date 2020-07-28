package com.bstek.urule.model.function;

import com.bstek.urule.runtime.WorkingMemory;

/**
 * @author Jacky.gao
 * 2015年7月22日
 */
public interface FunctionDescriptor {
    /**
     * 通过定义一个Argument实例来定义函数所采用的参数，该方法必须要返回一个Argument对象，不能返回null。
     *
     * @return 返回参数对象
     */
    Argument getArgument();

    /**
     * 函数运行时要执行的方法
     *
     * @param object        第一个参数运行时的具体值对象
     * @param property      当Argument对象中needProperty属性为true时，在使用该函数时定义的具体的属性名，注意这里是属性name而非Label
     * @param workingMemory 当前运行时的WorkingMemory对象
     * @return 函数运行后的返回值，如没有返回值则返回null
     */
    Object doFunction(Object object, String property, WorkingMemory workingMemory);

    /**
     * 返回函数名，建议返回一个首字母大写的英文名，该名称不能与既有函数同名
     *
     * @return 函数名称
     */
    String getName();

    /**
     * 返回函数显示名称，该名称不能与既有函数Label同名
     *
     * @return 返回函数的Label，既显示名称
     */
    String getLabel();

    /**
     * @return 返回当前函数是否禁用
     */
    boolean isDisabled();
}
