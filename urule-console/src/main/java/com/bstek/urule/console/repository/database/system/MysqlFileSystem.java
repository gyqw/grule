package com.bstek.urule.console.repository.database.system;

import com.bstek.urule.console.repository.database.BaseDbFileSystem;

public class MysqlFileSystem extends BaseDbFileSystem {
    @Override
    public String databaseType() {
        return "mysql";
    }
}
