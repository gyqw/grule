package com.bstek.urule.parse.deserializer;

import org.dom4j.Element;

/**
 * @author Jacky.gao
 * 2014年12月23日
 */
public interface Deserializer<T> {
    T deserialize(Element root);

    boolean support(Element root);
}
