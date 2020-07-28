package com.bstek.urule.runtime.assertor;

import com.bstek.urule.exception.RuleException;
import com.bstek.urule.model.library.Datatype;
import com.bstek.urule.model.rule.Op;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.util.Collection;

/**
 * @author Jacky.gao
 * 2015年1月6日
 */
public class AssertorEvaluator implements ApplicationContextAware {
    public static final String BEAN_ID = "urule.assertorEvaluator";
    private Collection<Assertor> assertors;

    public boolean evaluate(Object left, Object right, Datatype datatype, Op op) {
        Assertor targetAssertor = null;
        for (Assertor assertor : assertors) {
            if (assertor.support(op)) {
                targetAssertor = assertor;
                break;
            }
        }
        if (targetAssertor == null) {
            throw new RuleException("Unsupport op:" + op);
        }
        return targetAssertor.eval(left, right, datatype);
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        assertors = applicationContext.getBeansOfType(Assertor.class).values();
    }
}
