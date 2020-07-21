package geex.grule.console;

import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年3月27日
 */
public interface EnvironmentProvider {
    /**
     * @return 返回当前登录用户
     */
    User getLoginUser();

    /**
     * @return 返回当前系统当中用户集合 ，供配置资源库权限使用
     */
    List<User> getUsers();
}
