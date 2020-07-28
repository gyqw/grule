package com.bstek.urule.runtime.rete;

import com.bstek.urule.debug.MessageItem;
import com.bstek.urule.runtime.WorkingMemory;
import org.springframework.context.ApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EvaluationContextImpl extends ContextImpl implements EvaluationContext {
    private Activity prevActivity;
    private Map<String, Object> criteriaValueMap = new HashMap<>();
    private Map<String, Object> partValueMap = new HashMap<>();

    public EvaluationContextImpl(WorkingMemory workingMemory,
                                 ApplicationContext applicationContext,
                                 Map<String, String> variableCategoryMap, List<MessageItem> debugMessageItems) {
        super(workingMemory, applicationContext, variableCategoryMap, debugMessageItems);
    }

    @Override
    public Activity getPrevActivity() {
        return prevActivity;
    }

    @Override
    public void setPrevActivity(Activity activity) {
        this.prevActivity = activity;
    }

    @Override
    public Object getCriteriaValue(String id) {
        if (!criteriaValueMap.containsKey(id)) {
            return null;
        }
        return criteriaValueMap.get(id);
    }

    @Override
    public Object getPartValue(String id) {
        return partValueMap.get(id);
    }

    @Override
    public void storeCriteriaValue(String id, Object obj) {
        criteriaValueMap.put(id, obj);
    }

    @Override
    public void storePartValue(String id, Object obj) {
        partValueMap.put(id, obj);
    }

    @Override
    public boolean partValueExist(String id) {
        return partValueMap.containsKey(id);
    }

    public void clean() {
        criteriaValueMap.clear();
        partValueMap.clear();
    }
}
