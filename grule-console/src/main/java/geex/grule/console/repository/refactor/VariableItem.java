package geex.grule.console.repository.refactor;

public class VariableItem extends FieldItem {
    private String category;
    private String oldDatatype;
    private String newDatatype;

    public VariableItem() {
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOldDatatype() {
        return this.oldDatatype;
    }

    public void setOldDatatype(String oldDatatype) {
        this.oldDatatype = oldDatatype;
    }

    public String getNewDatatype() {
        return this.newDatatype;
    }

    public void setNewDatatype(String newDatatype) {
        this.newDatatype = newDatatype;
    }

    @Override
    public String toString() {
        return "VariableItem{" +
                "category='" + category + '\'' +
                ", oldDatatype='" + oldDatatype + '\'' +
                ", newDatatype='" + newDatatype + '\'' +
                '}';
    }
}
