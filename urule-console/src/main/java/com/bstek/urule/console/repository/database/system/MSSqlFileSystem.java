package com.bstek.urule.console.repository.database.system;

import com.bstek.urule.console.repository.database.BaseDbFileSystem;
import org.apache.jackrabbit.core.util.db.CheckSchemaOperation;

public class MSSqlFileSystem extends BaseDbFileSystem {
    @Override
    public String databaseType() {
        // TODO Auto-generated method stub
        return "mssql";
    }

    /**
     * the variable for the MS SQL table space
     */
    public static final String TABLE_SPACE_VARIABLE = "${tableSpace}";

    /**
     * the MS SQL table space to use
     */
    protected String tableSpace = "";

    /**
     * Returns the configured MS SQL table space.
     *
     * @return the configured MS SQL table space.
     */
    public String getTableSpace() {
        return tableSpace;
    }

    /**
     * Sets the MS SQL table space.
     *
     * @param tableSpace the MS SQL table space.
     */
    public void setTableSpace(String tableSpace) {
        if (tableSpace != null && tableSpace.length() > 0) {
            this.tableSpace = "on " + tableSpace.trim();
        } else {
            this.tableSpace = "";
        }
    }

    /**
     * Creates a new <code>MSSqlFileSystem</code> instance.
     */
    public MSSqlFileSystem() {
        // preset some attributes to reasonable defaults
        schema = "mssql";
        driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected CheckSchemaOperation createCheckSchemaOperation() {
        return super.createCheckSchemaOperation().addVariableReplacement(
                CheckSchemaOperation.TABLE_SPACE_VARIABLE, tableSpace);
    }

}
