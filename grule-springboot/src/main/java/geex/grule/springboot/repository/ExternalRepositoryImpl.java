package geex.grule.springboot.repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import geex.grule.console.repository.ExternalRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * @author fred
 * @since 2019-09-25 4:43 PM
 */
@Repository
public class ExternalRepositoryImpl implements ExternalRepository {

    @Override
    public JSONArray findDataByDate(Date start, Date end) {
        return findDataByDate(start, end, null, null);
    }

    @Override
    public JSONArray findDataByDate(Date start, Date end, String projectId, String packageId) {
        return JSON.parseArray("[{\"com.bstek.urule.springboot.model.OrderModel\":{\"appStatus\":1,\"ddgStatus\":1,\"storeTag\":\"fhp\"}}," +
                "{\"com.bstek.urule.springboot.model.OrderModel\":{\"appStatus\":1,\"ddgStatus\":1,\"storeTag\":\"fhp\"}}]");
    }
}
