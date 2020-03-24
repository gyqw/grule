package geex.grule.console;


import java.util.ArrayList;
import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年5月25日
 */
public class DefaultEnvironmentProvider implements EnvironmentProvider {

    @Override
    public User getLoginUser() {
        DefaultUser user = new DefaultUser();
        user.setCompanyId("bstek");
        user.setUsername("admin");
        user.setAdmin(true);
        return user;
    }

    @Override
    public List<User> getUsers() {
        DefaultUser user1 = new DefaultUser();
        user1.setCompanyId("bstek");
        user1.setUsername("user1");
        DefaultUser user2 = new DefaultUser();
        user2.setCompanyId("bstek");
        user2.setUsername("user2");
        DefaultUser user3 = new DefaultUser();
        user3.setCompanyId("bstek");
        user3.setUsername("user3");
        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);
        users.add(user3);
        return users;
    }
}
