package com.bstek.urule.console.repository.database;

import com.bstek.urule.console.repository.RepositoryBuilder;
import org.apache.jackrabbit.core.fs.FileSystemException;
import org.apache.jackrabbit.core.fs.db.DbFileSystem;

/**
 * @author Jacky.gao
 * 2017年12月6日
 */
public abstract class BaseDbFileSystem extends DbFileSystem {
    @Override
    public void init() throws FileSystemException {
        if (initialized) {
            throw new IllegalStateException("already initialized");
        }
        try {
            setSchema(databaseType());
            conHelper = createConnectionHelper(RepositoryBuilder.datasource);

            // make sure schemaObjectPrefix consists of legal name characters only
            schemaObjectPrefix = conHelper.prepareDbIdentifier(schemaObjectPrefix);

            // check if schema objects exist and create them if necessary
            if (isSchemaCheckEnabled()) {
                createCheckSchemaOperation().run();
            }

            // build sql statements
            buildSQLStatements();

            // finally verify that there's a file system root entry
            verifyRootExists();

            initialized = true;
        } catch (Exception e) {
            String msg = "failed to initialize file system";
            throw new FileSystemException(msg, e);
        }
    }

    public abstract String databaseType();
}
