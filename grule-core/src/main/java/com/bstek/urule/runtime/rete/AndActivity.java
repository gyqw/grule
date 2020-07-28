package com.bstek.urule.runtime.rete;

import com.bstek.urule.model.rule.lhs.BaseCriteria;

import java.util.*;

/**
 * @author Jacky.gao
 * 2015年1月8日
 */
public class AndActivity extends JoinActivity {
    private boolean passed = false;
    private FactTracker currentTracker;
    private List<Path> fromPaths = new ArrayList<>();

    public AndActivity() {
    }

    public Collection<FactTracker> enter(EvaluationContext context, Object obj, FactTracker tracker) {
        if (this.currentTracker != null) {
            Map<Object, List<BaseCriteria>> map = tracker.getObjectCriteriaMap();
            Map<Object, List<BaseCriteria>> currentMap = this.currentTracker.getObjectCriteriaMap();

            for (Object key : currentMap.keySet()) {
                if (!map.containsKey(key)) {
                    map.put(key, currentMap.get(key));
                }

            }
        }

        this.currentTracker = tracker;
        if (this.isAllPassed()) {
            List<FactTracker> allTrackers = new ArrayList<>();
            List<FactTracker> trackers = this.visitPaths(context, obj, tracker);
            if (trackers != null && trackers.size() > 0) {
                allTrackers.addAll(trackers);
            }

            return allTrackers;
        } else {
            return null;
        }
    }

    private boolean isAllPassed() {
        Iterator var1 = this.fromPaths.iterator();

        Path path;
        do {
            if (!var1.hasNext()) {
                return true;
            }

            path = (Path) var1.next();
        } while (path.isPassed());

        return false;
    }

    public void addFromPath(Path fromPath) {
        this.fromPaths.add(fromPath);
    }

    public void passAndNode() {
        this.passed = true;
        this.doPassAndNode();
    }

    public boolean joinNodeIsPassed() {
        if (!this.passed) {
            List<Path> paths = this.getPaths();
            if (paths.size() == 1) {
                Path path = paths.get(0);
                AbstractActivity activity = (AbstractActivity) path.getTo();
                return activity.joinNodeIsPassed();
            }
        }

        return this.passed;
    }

    public void reset() {
        this.currentTracker = null;
        this.passed = false;
    }
}
