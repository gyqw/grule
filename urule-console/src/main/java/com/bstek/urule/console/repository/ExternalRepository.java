package com.bstek.urule.console.repository;

import com.alibaba.fastjson.JSONArray;

import java.util.Date;

/**
 * @author fred
 * 2019-09-25 4:17 PM
 */
public interface ExternalRepository {
    JSONArray findDataByDate(Date start, Date end);
}
