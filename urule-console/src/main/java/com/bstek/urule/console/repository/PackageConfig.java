package com.bstek.urule.console.repository;

/**
 * @author fred
 * 2019-12-27 5:31 PM
 */
public class PackageConfig {
    private String version;
    private Boolean lock;

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

    @Override
    public String toString() {
        return "PackageConfig{" +
                "version='" + version + '\'' +
                ", lock=" + lock +
                '}';
    }
}
