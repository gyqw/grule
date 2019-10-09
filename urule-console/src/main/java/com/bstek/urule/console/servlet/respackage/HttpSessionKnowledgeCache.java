package com.bstek.urule.console.servlet.respackage;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author Jacky.gao
 * 2017年8月20日
 */
public class HttpSessionKnowledgeCache {
    private Map<String, SessionObject> sessionMap = new HashMap<String, SessionObject>();

    public Object get(HttpServletRequest req, String key) {
        SessionObject sessionObject = getSessionObject(req);
        return sessionObject.get(key);
    }

    public void put(HttpServletRequest req, String key, Object obj) {
        SessionObject sessionObject = getSessionObject(req);
        sessionObject.put(key, obj);
    }

    public void remove(HttpServletRequest req, String key) {
        SessionObject sessionObject = getSessionObject(req);
        sessionObject.remove(key);
    }

    private SessionObject getSessionObject(HttpServletRequest req) {
        clean();
        String sessionId = req.getSession().getId();
        SessionObject sessionObject = null;
        if (sessionMap.containsKey(sessionId)) {
            sessionObject = sessionMap.get(sessionId);
        } else {
            sessionObject = new SessionObject();
            sessionMap.put(sessionId, sessionObject);
        }
        return sessionObject;
    }

    private void clean() {
        List<String> list = new ArrayList<String>();
        for (String key : sessionMap.keySet()) {
            SessionObject obj = sessionMap.get(key);
            if (obj.isExpired()) {
                list.add(key);
            }
        }
        for (String key : list) {
            sessionMap.remove(key);
        }
    }
}
