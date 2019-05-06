package com.bstek.urule.console.servlet.console;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DebugMessageHolder {
    private int num = 0;
    private Map<String, DebugMessage> messageMap = new HashMap<String, DebugMessage>();

    public String getDebugMessage(String key) {
        DebugMessage msg = messageMap.get(key);
        String info = null;
        if (msg == null) {
            info = "<h2 style='color:red'>Key为[" + key + "]的调试信息已失效，不能查看，当前key值为:" + this.num + "。<br>调试消息有效期为3分钟，请在有效期内查看!</h2>";
        } else {
            info = msg.getMessage();
        }
        clean();
        return info;
    }

    public void putDebugMessage(String key, String msg) {
        clean();
        DebugMessage m = new DebugMessage(msg);
        messageMap.put(key, m);
    }

    private void clean() {
        long current = System.currentTimeMillis();
        List<String> list = new ArrayList<>();
        for (String key : messageMap.keySet()) {
            DebugMessage msg = messageMap.get(key);
            long dif = current - msg.getTimestamp();
            if (dif > 180000) {
                list.add(key);
            }
        }
        for (String key : list) {
            messageMap.remove(key);
        }
    }

    public synchronized String generateKey() {
        num++;
        return String.valueOf(num);
    }
}
