package geex.grule.console.repository.refactor.field;


import geex.grule.console.repository.refactor.*;

public abstract class ContentRefactor implements Refactor {
    public ContentRefactor() {
    }

    public abstract String doRefactor(String var1, String var2, Item var3);

    protected String doXmlContentRefactor(String path, String content, Item item) {
        String pathstr = "jcr:" + this.perfectPath(path);
        boolean contains = content.contains(pathstr);
        if (!contains) {
            return null;
        } else {
            String oldstr;
            String newstr;
            if (item instanceof VariableItem) {
                VariableItem varItem = (VariableItem)item;
                oldstr = "var-category=\"" + varItem.getCategory() + "\" var=\"" + varItem.getOldName() + "\" var-label=\"" + varItem.getOldLabel() + "\" datatype=\"" + varItem.getOldDatatype() + "\"";
                newstr = "var-category=\"" + varItem.getCategory() + "\" var=\"" + varItem.getNewName() + "\" var-label=\"" + varItem.getNewLabel() + "\" datatype=\"" + varItem.getNewDatatype() + "\"";
                content = content.replaceAll(oldstr, newstr);
                if (this instanceof ComplexScorecardContentRefactor) {
                    oldstr = "var-label=\"" + varItem.getOldLabel() + "\" var=\"" + varItem.getOldName() + "\"";
                    newstr = "var-label=\"" + varItem.getNewLabel() + "\" var=\"" + varItem.getNewName() + "\"";
                    content = content.replaceAll(oldstr, newstr);
                }

                return content;
            } else if (item instanceof VariableCategoryItem) {
                VariableCategoryItem categoryItem = (VariableCategoryItem)item;
                oldstr = "var-category=\"" + categoryItem.getOldCategory() + "\"";
                newstr = "var-category=\"" + categoryItem.getNewCategory() + "\"";
                content = content.replaceAll(oldstr, newstr);
                if (this instanceof ScorecardContentRefactor) {
                    oldstr = "attr-col-category=\"" + categoryItem.getOldCategory() + "\"";
                    newstr = "attr-col-category=\"" + categoryItem.getNewCategory() + "\"";
                    content = content.replaceAll(oldstr, newstr);
                }

                return content;
            } else if (item instanceof ConstItem) {
                ConstItem constItem = (ConstItem)item;
                oldstr = "const=\"" + constItem.getOldName() + "\" const-label=\"" + constItem.getOldLabel() + "\" type=\"Constant\"";
                newstr = "const=\"" + constItem.getNewName() + "\" const-label=\"" + constItem.getNewLabel() + "\" type=\"Constant\"";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof ConstCategoryItem) {
                ConstCategoryItem categoryItem = (ConstCategoryItem)item;
                oldstr = "const-category=\"" + categoryItem.getOldCategory() + "\"";
                newstr = "const-category=\"" + categoryItem.getNewCategory() + "\"";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof BeanItem) {
                BeanItem it = (BeanItem)item;
                oldstr = "bean=\"" + it.getOldBeanId() + "\" bean-label=\"" + it.getOldBeanLabel() + "\"";
                newstr = "bean=\"" + it.getNewBeanId() + "\" bean-label=\"" + it.getNewBeanLabel() + "\"";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof BeanMethodItem) {
                BeanMethodItem it = (BeanMethodItem)item;
                oldstr = "bean=\"" + it.getBeanId() + "\" bean-label=\"" + it.getBeanLabel() + "\" method-label=\"" + it.getOldMethodLabel() + "\" method-name=\"" + it.getOldMethodName() + "\"";
                newstr = "bean=\"" + it.getBeanId() + "\" bean-label=\"" + it.getBeanLabel() + "\" method-label=\"" + it.getNewMethodLabel() + "\" method-name=\"" + it.getNewMethodName() + "\"";
                return content.replaceAll(oldstr, newstr);
            } else {
                return null;
            }
        }
    }

    public String doScriptContentRefactor(String path, String content, Item item) {
        String pathstr = "jcr:" + this.perfectPath(path);
        boolean contains = content.contains(pathstr);
        if (!contains) {
            return null;
        } else {
            String oldstr;
            String newstr;
            if (item instanceof VariableItem) {
                VariableItem varItem = (VariableItem)item;
                oldstr = varItem.getCategory() + "." + varItem.getOldLabel();
                newstr = varItem.getCategory() + "." + varItem.getNewLabel();
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof VariableCategoryItem) {
                VariableCategoryItem categoryItem = (VariableCategoryItem)item;
                oldstr = categoryItem.getOldCategory() + "\\.";
                newstr = categoryItem.getNewCategory() + "\\.";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof ConstItem) {
                ConstItem constItem = (ConstItem)item;
                oldstr = "\\$" + constItem.getCategory() + "." + constItem.getOldLabel();
                newstr = "\\$" + constItem.getCategory() + "." + constItem.getNewLabel();
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof ConstCategoryItem) {
                ConstCategoryItem categoryItem = (ConstCategoryItem)item;
                oldstr = "\\$" + categoryItem.getOldCategory() + ".";
                newstr = "\\$" + categoryItem.getNewCategory() + ".";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof BeanItem) {
                BeanItem it = (BeanItem)item;
                oldstr = "" + it.getOldBeanLabel() + ".";
                newstr = "" + it.getNewBeanLabel() + ".";
                return content.replaceAll(oldstr, newstr);
            } else if (item instanceof BeanMethodItem) {
                BeanMethodItem it = (BeanMethodItem)item;
                oldstr = "" + it.getBeanLabel() + "." + it.getOldMethodLabel() + "";
                newstr = "" + it.getBeanLabel() + "." + it.getNewMethodLabel() + "";
                return content.replaceAll(oldstr, newstr);
            } else {
                return null;
            }
        }
    }

    protected String perfectPath(String path) {
        if (!path.startsWith("/")) {
            path = "/" + path;
        }

        return path;
    }
}

