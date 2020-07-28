package com.bstek.urule.runtime.rete;


public interface EvaluationContext extends Context {

    Activity getPrevActivity();

    void setPrevActivity(Activity activity);

    Object getCriteriaValue(String id);

    Object getPartValue(String id);

    void storeCriteriaValue(String id, Object obj);

    void storePartValue(String id, Object obj);

    boolean partValueExist(String id);
}
