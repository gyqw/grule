package geex.grule.console.repository;

import java.util.HashMap;
import java.util.Map;

/**
 * @author fred
 * 2019-12-27 5:31 PM
 */
public class PackageConfig {
    private String version;
    private Boolean lock;
    private Map<String, Integer> auditStatusMap;

    public PackageConfig() {
        this.auditStatusMap = new HashMap<>();
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Boolean getLock() {
        return lock;
    }

    public void setLock(Boolean lock) {
        this.lock = lock;
    }

    public Map<String, Integer> getAuditStatusMap() {
        return auditStatusMap;
    }

    public void setAuditStatusMap(Map<String, Integer> auditStatusMap) {
        this.auditStatusMap = auditStatusMap;
    }

    @Override
    public String toString() {
        return "PackageConfig{" +
                "version='" + version + '\'' +
                ", lock=" + lock +
                ", auditStatusMap=" + auditStatusMap +
                '}';
    }
}
