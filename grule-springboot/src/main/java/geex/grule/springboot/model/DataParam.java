package geex.grule.springboot.model;

import java.io.Serializable;
import java.util.Map;

/**
 * @author fred
 * @since 2020/07/23 10:09 AM
 */
public class DataParam implements Serializable {
    private String modelName;
    private Map<String, Object> params;

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "DataParam{" +
                "modelName='" + modelName + '\'' +
                ", params=" + params +
                '}';
    }
}
