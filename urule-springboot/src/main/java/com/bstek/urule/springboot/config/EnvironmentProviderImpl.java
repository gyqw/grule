package com.bstek.urule.springboot.config;

import com.bstek.urule.console.DefaultUser;
import com.bstek.urule.console.EnvironmentProvider;
import com.bstek.urule.console.User;
import com.bstek.urule.console.servlet.RequestContext;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author fred
 * 2019-11-19 11:27 AM
 */
@Component
public class EnvironmentProviderImpl implements EnvironmentProvider {
    @Override
    public User getLoginUser(RequestContext context) {
        DefaultUser user = new DefaultUser();
        user.setUsername("user1");
        user.setCompanyId("bstek");
        user.setAdmin(false);
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
