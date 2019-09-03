package com.bstek.urule.runtime.rete;

import com.bstek.urule.exception.RuleAssertException;
import com.bstek.urule.model.GeneralEntity;

import java.util.Collection;

public class ObjectTypeActivity extends AbstractActivity {
    private Class<?> typeClass;
    private String clazz;

    public ObjectTypeActivity(String clazz) {
        this.clazz = clazz;
    }

    public ObjectTypeActivity(Class<?> typeClass) {
        this.typeClass = typeClass;
    }

    public Collection<FactTracker> enter(EvaluationContext context, Object obj, FactTracker tracker) {
        try {
            return this.visitPaths(context, obj, tracker);
        } catch (Exception e) {
            String tipMsg = context.getTipMsg();
            throw new RuleAssertException(tipMsg, e);
        }
    }

    public boolean support(Object object) {
        if (this.clazz != null && this.clazz.equals("__*__") && this.clazz.equals(object)) {
            return true;
        } else if (this.typeClass == null && this.clazz == null) {
            return true;
        } else {
            if (object instanceof GeneralEntity) {
                GeneralEntity generalEntity = (GeneralEntity) object;
                String targetClass = generalEntity.getTargetClass();
                if (this.clazz != null) {
                    if (targetClass.equals(this.clazz)) {
                        return true;
                    }
                } else if (targetClass.equals(this.typeClass.getName())) {
                    return true;
                }
            } else if (this.typeClass != null) {
                Class<?> c = object.getClass();
                if (this.typeClass.isAssignableFrom(c) || this.typeClass.getName().equals(c.getName())) {
                    return true;
                }
            }

            return false;
        }
    }

    public void passAndNode() {
    }

    public boolean joinNodeIsPassed() {
        return false;
    }

    public void reset() {
    }
}
