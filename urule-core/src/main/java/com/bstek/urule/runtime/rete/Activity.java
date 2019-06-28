package com.bstek.urule.runtime.rete;

import java.util.List;

/**
 * @author Jacky.gao
 * @since 2015年1月12日
 */
public interface Activity extends Instance {
    List<Path> getPaths();
}
