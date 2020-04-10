package com.bstek.urule.builder.resource;

import org.dom4j.Element;


/**
 * @author Jacky.gao
 * 2014年12月22日
 */
public interface ResourceBuilder<T> {
    T build(Element root);

    boolean support(Element root);

    ResourceType getType();
}
