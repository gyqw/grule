package geex.grule.console.repository.refactor;

public abstract class FieldItem implements Item {
    private String newName;
    private String newLabel;
    private String oldName;
    private String oldLabel;

    public FieldItem() {
    }

    public String getNewName() {
        return this.newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public String getNewLabel() {
        return this.newLabel;
    }

    public void setNewLabel(String newLabel) {
        this.newLabel = newLabel;
    }

    public String getOldName() {
        return this.oldName;
    }

    public void setOldName(String oldName) {
        this.oldName = oldName;
    }

    public String getOldLabel() {
        return this.oldLabel;
    }

    public void setOldLabel(String oldLabel) {
        this.oldLabel = oldLabel;
    }

    @Override
    public String toString() {
        return "FieldItem{" +
                "newName='" + newName + '\'' +
                ", newLabel='" + newLabel + '\'' +
                ", oldName='" + oldName + '\'' +
                ", oldLabel='" + oldLabel + '\'' +
                '}';
    }
}

