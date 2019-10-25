package com.bstek.urule.console.servlet.respackage;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Jacky.gao
 * 2017年8月20日
 */
public class SessionObject {
    private long start;
    private static final long MILLISECOND = 1200000;//default expired time is 20 minutes.
    private Map<String, Object> map = new HashMap<>();

    public SessionObject() {
        this.start = System.currentTimeMillis();
    }

    public void put(String key, Object obj) {
        this.start = System.currentTimeMillis();
		map.remove(key);
        map.put(key, obj);
    }

    public Object get(String key) {
        this.start = System.currentTimeMillis();
        return map.get(key);
    }

    public void remove(String key) {
        this.start = System.currentTimeMillis();
        map.remove(key);
    }

    public boolean isExpired() {
        long end = System.currentTimeMillis();
        long value = end - start;
        if (value >= MILLISECOND) {
            return true;
        }
        return false;
    }
}
