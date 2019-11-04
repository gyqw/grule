package com.bstek.urule.runtime.assertor;

import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.Op;

/**
 * @author Jacky.gao
 * 2017年12月21日
 */
public class NotContainAssertor extends ContainAssertor {
    public boolean eval(Object left, Object right, Datatype datatype) {
        if (left == null && right != null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        return !super.eval(left, right, datatype);
    }

    public boolean support(Op op) {
        return op.equals(Op.NotContain);
    }
}
