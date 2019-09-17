package com.bstek.urule.console;

/**
 * @author Jacky.gao
 * @author fred
 * 2016年5月25日
 */
public class DefaultUser implements User {
    private String username;
    private String email;
    private String companyId;
    private boolean isAdmin;

    public String getUsername() {
        return username;
    }

    @Override
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
}
