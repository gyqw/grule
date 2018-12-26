package com.bstek.urule.console.repository.refactor;

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
}

