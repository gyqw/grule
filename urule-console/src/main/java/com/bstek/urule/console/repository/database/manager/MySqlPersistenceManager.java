package com.bstek.urule.console.repository.database.manager;

import com.bstek.urule.console.repository.database.DbPersistenceManager;
import org.apache.jackrabbit.core.persistence.PMContext;

/**
 * @author Jacky.gao
 * @since 2017年12月7日
 */
public class MySqlPersistenceManager extends DbPersistenceManager {

    /**
     * {@inheritDoc}
     */
    public void init(PMContext context) throws Exception {
        // init default values
        if (getDriver() == null) {
            setDriver("org.gjt.mm.mysql.Driver");
        }
        if (getDatabaseType() == null) {
            setDatabaseType("mysql");
        }
        super.init(context);
    }
}
