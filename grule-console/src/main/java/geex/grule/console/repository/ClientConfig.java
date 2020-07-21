package geex.grule.console.repository;

/**
 * @author Jacky.gao
 * @author fred
 * 2016年8月11日
 */
public class ClientConfig {
    private String name;
    private String client;
    private String project;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "ClientConfig{" +
                "name='" + name + '\'' +
                ", client='" + client + '\'' +
                ", project='" + project + '\'' +
                '}';
    }
}
