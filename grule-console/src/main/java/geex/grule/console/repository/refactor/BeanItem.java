package geex.grule.console.repository.refactor;

public class BeanItem implements Item {
    private String oldBeanId;
    private String newBeanId;
    private String oldBeanLabel;
    private String newBeanLabel;

    public BeanItem() {
    }

    public String getOldBeanId() {
        return this.oldBeanId;
    }

    public void setOldBeanId(String oldBeanId) {
        this.oldBeanId = oldBeanId;
    }

    public String getNewBeanId() {
        return this.newBeanId;
    }

    public void setNewBeanId(String newBeanId) {
        this.newBeanId = newBeanId;
    }

    public String getOldBeanLabel() {
        return this.oldBeanLabel;
    }

    public void setOldBeanLabel(String oldBeanLabel) {
        this.oldBeanLabel = oldBeanLabel;
    }

    public String getNewBeanLabel() {
        return this.newBeanLabel;
    }

    public void setNewBeanLabel(String newBeanLabel) {
        this.newBeanLabel = newBeanLabel;
    }

    @Override
    public String toString() {
        return "BeanItem{" +
                "oldBeanId='" + oldBeanId + '\'' +
                ", newBeanId='" + newBeanId + '\'' +
                ", oldBeanLabel='" + oldBeanLabel + '\'' +
                ", newBeanLabel='" + newBeanLabel + '\'' +
                '}';
    }
}

