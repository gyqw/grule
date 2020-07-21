package geex.grule.console.repository.model;


/**
 * @author Jacky.gao
 * @author fred
 * @since 2015年1月7日
 */
public class ResourceItem {
    private String name;
    private String path;
    private String packageId;
    private String version;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPackageId() {
        return packageId;
    }

    public void setPackageId(String packageId) {
        this.packageId = packageId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "ResourceItem{" +
                "name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", packageId='" + packageId + '\'' +
                ", version='" + version + '\'' +
                '}';
    }
}
