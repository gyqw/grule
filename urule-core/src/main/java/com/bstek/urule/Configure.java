package com.bstek.urule;

import org.apache.commons.lang.StringUtils;

public class Configure {
    private static String dateFormat;
    private static String tempStorePath;

    public void setDateFormat(String dateFormat) {
        if (StringUtils.isEmpty(dateFormat) || dateFormat.equals("${urule.dateFormat}")) {
            Configure.dateFormat = "yyyy-MM-dd HH:mm:ss";
        } else {
            Configure.dateFormat = dateFormat;
        }
    }

    public void setTempStorePath(String tempStorePath) {
        if (!tempStorePath.equals("${urule.tempStorePath}")) {
            Configure.tempStorePath = tempStorePath;
        }
    }

    public static String getTempStorePath() {
        return tempStorePath;
    }

    public static String getDateFormat() {
        return dateFormat;
    }
}
