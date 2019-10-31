package com.bstek.urule.console.repository.database.manager;

import com.bstek.urule.console.repository.database.DbPersistenceManager;
import org.apache.jackrabbit.core.persistence.PMContext;

/**
 * @author Jacky.gao
 * 2017年12月7日
 */
public class H2PersistenceManager extends DbPersistenceManager {

    /**
     * the lock time out. see
     */
    private long lockTimeout = 10000;

    /**
     * Returns the lock timeout.
     *
     * @return the lock timeout
     */
    public String getLockTimeout() {
        return String.valueOf(lockTimeout);
    }

    /**
     * Sets the lock timeout in milliseconds.
     *
     * @param lockTimeout the lock timeout.
     */
    public void setLockTimeout(String lockTimeout) {
        this.lockTimeout = Long.parseLong(lockTimeout);
    }

    /**
     * {@inheritDoc}
     */
    public void init(PMContext context) throws Exception {
        // init default values
        if (getDriver() == null) {
            setDriver("org.h2.Driver");
        }
        if (getUrl() == null) {
            setUrl("jdbc:h2:file:" + context.getHomeDir().getPath() + "/db/itemState");
        }
        if (getDatabaseType() == null) {
            setDatabaseType("h2");
        }
        if (getSchemaObjectPrefix() == null) {
            setSchemaObjectPrefix("");
        }

        super.init(context);

        conHelper.exec("SET LOCK_TIMEOUT " + lockTimeout);
    }
}
