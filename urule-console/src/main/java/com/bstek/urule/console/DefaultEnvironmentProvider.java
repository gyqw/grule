package com.bstek.urule.console;

import com.bstek.urule.console.servlet.RequestContext;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Jacky.gao
 * 2016年5月25日
 */
public class DefaultEnvironmentProvider implements EnvironmentProvider {

    @Override
    public User getLoginUser(RequestContext context) {
        DefaultUser user = new DefaultUser();
        user.setUsername("admin");
        user.setEmail("admin@bstek.com");
        user.setCompanyId("bstek");
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
