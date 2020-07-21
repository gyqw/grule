package geex.grule.console.repository.refactor;

public class BeanMethodItem implements Item {
    private String beanId;
    private String beanLabel;
    private String oldMethodName;
    private String newMethodName;
    private String oldMethodLabel;
    private String newMethodLabel;

    public BeanMethodItem() {
    }

    public String getBeanId() {
        return this.beanId;
    }

    public void setBeanId(String beanId) {
        this.beanId = beanId;
    }

    public String getBeanLabel() {
        return this.beanLabel;
    }

    public void setBeanLabel(String beanLabel) {
        this.beanLabel = beanLabel;
    }

    public String getOldMethodName() {
        return this.oldMethodName;
    }

    public void setOldMethodName(String oldMethodName) {
        this.oldMethodName = oldMethodName;
    }

    public String getNewMethodName() {
        return this.newMethodName;
    }

    public void setNewMethodName(String newMethodName) {
        this.newMethodName = newMethodName;
    }

    public String getOldMethodLabel() {
        return this.oldMethodLabel;
    }

    public void setOldMethodLabel(String oldMethodLabel) {
        this.oldMethodLabel = oldMethodLabel;
    }

    public String getNewMethodLabel() {
        return this.newMethodLabel;
    }

    public void setNewMethodLabel(String newMethodLabel) {
        this.newMethodLabel = newMethodLabel;
    }

    @Override
    public String toString() {
        return "BeanMethodItem{" +
                "beanId='" + beanId + '\'' +
                ", beanLabel='" + beanLabel + '\'' +
                ", oldMethodName='" + oldMethodName + '\'' +
                ", newMethodName='" + newMethodName + '\'' +
                ", oldMethodLabel='" + oldMethodLabel + '\'' +
                ", newMethodLabel='" + newMethodLabel + '\'' +
                '}';
    }
}

