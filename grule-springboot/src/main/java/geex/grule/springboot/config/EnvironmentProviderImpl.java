package geex.grule.springboot.config;

import geex.grule.console.DefaultUser;
import geex.grule.console.EnvironmentProvider;
import geex.grule.console.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author fred
 * @since 2019-11-19 11:27 AM
 */
@Component
public class EnvironmentProviderImpl implements EnvironmentProvider {
    @Override
    public User getLoginUser() {
        DefaultUser user = new DefaultUser();
        user.setUsername("user1");
        user.setCompanyId("bstek");
        user.setAdmin(true);
        return user;
    }

    @Override
    public List<User> getUsers() {
        DefaultUser user1 = new DefaultUser();
        user1.setCompanyId("bstek");
        user1.setUsername("user1");
        List<User> users = new ArrayList<>();
        users.add(user1);
        return users;

    }
}
