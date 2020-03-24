package geex.grule.console.repository.refactor;

public class CategoryItem implements Item {
    private String oldCategory;
    private String newCategory;

    public CategoryItem() {
    }

    public String getOldCategory() {
        return this.oldCategory;
    }

    public void setOldCategory(String oldCategory) {
        this.oldCategory = oldCategory;
    }

    public String getNewCategory() {
        return this.newCategory;
    }

    public void setNewCategory(String newCategory) {
        this.newCategory = newCategory;
    }

    @Override
    public String toString() {
        return "CategoryItem{" +
                "oldCategory='" + oldCategory + '\'' +
                ", newCategory='" + newCategory + '\'' +
                '}';
    }
}

