package geex.grule.console.model;

import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年8月30日
 */
public class UserPermission {
    private String username;
    private List<ProjectConfig> projectConfigs;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<ProjectConfig> getProjectConfigs() {
        return projectConfigs;
    }

    public void setProjectConfigs(List<ProjectConfig> projectConfigs) {
        this.projectConfigs = projectConfigs;
    }
}
