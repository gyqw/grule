package com.bstek.urule.runtime.rete;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ReteInstance {
    private Map<String, List<ReteInstanceUnit>> activationGroupReteInstancesMap;
    private Map<String, List<ReteInstanceUnit>> agendaGroupReteInstancesMap;
    private List<ObjectTypeActivity> objectTypeActivities;
    private String id = UUID.randomUUID().toString();

    public ReteInstance(List<ObjectTypeActivity> objectTypeActivities, Map<String, List<ReteInstanceUnit>> activationGroupReteInstancesMap, Map<String, List<ReteInstanceUnit>> agendaGroupReteInstancesMap) {
        this.objectTypeActivities = objectTypeActivities;
        this.activationGroupReteInstancesMap = activationGroupReteInstancesMap;
        this.agendaGroupReteInstancesMap = agendaGroupReteInstancesMap;
    }

    public Collection<FactTracker> enter(EvaluationContext context, Object obj) {
        Collection<FactTracker> trackers = null;
        for (ObjectTypeActivity objectTypeActivity : this.objectTypeActivities) {
            if (objectTypeActivity.support(obj)) {
                Collection<FactTracker> result = objectTypeActivity.enter(context, obj, new FactTracker());
                if (result != null) {
                    if (trackers == null) {
                        trackers = result;
                    } else {
                        trackers.addAll(result);
                    }
                }
            }
        }
        return trackers;
    }

    public List<ObjectTypeActivity> getObjectTypeActivities() {
        return objectTypeActivities;
    }

    public void reset() {
        for (ObjectTypeActivity objectTypeActivity : objectTypeActivities) {
            List<Path> paths = objectTypeActivity.getPaths();
            resetActivities(paths, false);
        }
    }

    public void resetForReevaluate(Object valuateObj) {
        for (ObjectTypeActivity objectTypeActivity : objectTypeActivities) {
            if (objectTypeActivity.support(valuateObj)) {
                List<Path> paths = objectTypeActivity.getPaths();
                resetActivities(paths, true);
            }
        }
    }

    private void resetActivities(List<Path> paths, boolean forReevaluate) {
        if (paths == null) return;
        for (Path path : paths) {
            path.setPassed(false);
            Activity activity = path.getTo();
            if (forReevaluate) {
                if (activity instanceof OrActivity) {
                    OrActivity ac = (OrActivity) activity;
                    ac.reset();
                }
                if (activity instanceof CriteriaActivity) {
                    CriteriaActivity ac = (CriteriaActivity) activity;
                    ac.reset();
                }
            } else {
                if (activity instanceof AbstractActivity) {
                    AbstractActivity ac = (AbstractActivity) activity;
                    ac.reset();
                }
            }
            resetActivities(activity.getPaths(), forReevaluate);
        }
    }

    public Map<String, List<ReteInstanceUnit>> getActivationGroupReteInstancesMap() {
        return this.activationGroupReteInstancesMap;
    }

    public Map<String, List<ReteInstanceUnit>> getAgendaGroupReteInstancesMap() {
        return this.agendaGroupReteInstancesMap;
    }

    public String getId() {
        return this.id;
    }

}
