package com.bstek.urule.runtime.assertor;

import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.Op;

import java.util.Collection;

/**
 * @author Jacky.gao
 * 2017年12月21日
 */
public class ContainAssertor implements Assertor {
    public boolean eval(Object left, Object right, Datatype datatype) {
        if (left == null || right == null) {
            return false;
        }
        if (left instanceof String) {
            return left.toString().contains(right.toString());
        }
        if (left instanceof Collection) {
            Collection<?> list = (Collection<?>) left;
            if (right instanceof Collection) {
                Collection<?> rightList = (Collection<?>) right;
                return list.containsAll(rightList);
            } else {
                return list.contains(right);
            }
        }
        String leftStr = left.toString();
        String rightStr = right.toString();
        return leftStr.contains(rightStr);
    }

    public boolean support(Op op) {
        return op.equals(Op.Contain);
    }
}
