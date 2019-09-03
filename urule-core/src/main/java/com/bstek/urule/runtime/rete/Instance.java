package com.bstek.urule.runtime.rete;

import java.util.Collection;

public interface Instance {
    Collection<FactTracker> enter(EvaluationContext context, Object obj, FactTracker tracker);
}
