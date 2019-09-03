package com.bstek.urule.console;

/**
 * @author Jacky.gao
 * @since 2015年5月7日
 */
public interface User {
    /**
     * @return 用户名
     */
    String getUsername();

    /**
     * @return 所在公司ID
     */
    String getCompanyId();

    /**
     * @return 是否为管理员
     */
    boolean isAdmin();
}
