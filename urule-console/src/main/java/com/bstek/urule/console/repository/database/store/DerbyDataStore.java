package com.bstek.urule.console.repository.database.store;

import com.bstek.urule.console.repository.database.DatabaseDataStore;
import org.apache.jackrabbit.core.data.DataStoreException;
import org.apache.jackrabbit.core.util.db.ConnectionHelper;
import org.apache.jackrabbit.core.util.db.DerbyConnectionHelper;

import javax.sql.DataSource;
import java.sql.SQLException;

public class DerbyDataStore extends DatabaseDataStore {

    /**
     * {@inheritDoc}
     */
    @Override
    protected ConnectionHelper createConnectionHelper(DataSource dataSrc) throws Exception {
        return new DerbyConnectionHelper(dataSrc, false);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public synchronized void close() throws DataStoreException {
        super.close();
        try {
            ((DerbyConnectionHelper) conHelper).shutDown(getDriver());
        } catch (SQLException e) {
            throw new DataStoreException(e);
        }
    }
}
