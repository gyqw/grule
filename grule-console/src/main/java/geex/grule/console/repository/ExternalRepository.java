package geex.grule.console.repository;

import com.alibaba.fastjson.JSONArray;

import java.util.Date;

/**
 * @author fred
 * @since 2019-09-25 4:17 PM
 */
public interface ExternalRepository {
    JSONArray findDataByDate(Date start, Date end);

    JSONArray findDataByDate(Date start, Date end, String projectId, String packageId);
}
