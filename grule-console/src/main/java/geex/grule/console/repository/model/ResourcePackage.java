package geex.grule.console.repository.model;

import java.util.Date;
import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年1月7日
 */

public class ResourcePackage {

    private String id;
    private String name;
    private String project;
    private Date createDate;
    private List<ResourceItem> resourceItems;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<ResourceItem> getResourceItems() {
        return resourceItems;
    }

    public void setResourceItems(List<ResourceItem> resourceItems) {
        this.resourceItems = resourceItems;
    }

	@Override
	public String toString() {
		return "ResourcePackage{" +
				"id='" + id + '\'' +
				", name='" + name + '\'' +
				", project='" + project + '\'' +
				", createDate=" + createDate +
				", resourceItems=" + resourceItems +
				'}';
	}
}
