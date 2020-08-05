package com.bstek.urule.console.repository.database.system;

import com.bstek.urule.console.repository.database.BaseDbFileSystem;

import javax.sql.DataSource;

/**
 * @author Jacky.gao
 * 2017年12月6日
 */
public class MysqlFileSystem extends BaseDbFileSystem {

    @Override
    public String databaseType() {
        return "mysql";
    }
}
