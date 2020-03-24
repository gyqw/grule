package geex.grule.console.repository.refactor;

public class ConstItem extends FieldItem {
    private String category;

    public ConstItem() {
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "ConstItem{" +
                "category='" + category + '\'' +
                '}';
    }
}
