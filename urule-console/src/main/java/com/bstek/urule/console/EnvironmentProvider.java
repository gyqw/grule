package com.bstek.urule.console;

import com.bstek.urule.console.servlet.RequestContext;

import java.util.List;

/**
 * @author Jacky.gao
 * 2015年3月27日
 */
public interface EnvironmentProvider {
    /**
     * @param context 请求上下文对象
     * @return 返回当前登录用户
     */
    User getLoginUser(RequestContext context);

    /**
     * @return 返回当前系统当中用户集合 ，供配置资源库权限使用
     */
    List<User> getUsers();
}
