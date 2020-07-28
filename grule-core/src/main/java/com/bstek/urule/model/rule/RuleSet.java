package com.bstek.urule.model.rule;

import java.util.ArrayList;
import java.util.List;

public class RuleSet {
    private String remark;
    private List<Library> libraries;
    private List<Rule> rules;

    public RuleSet() {
    }

    public String getRemark() {
        return this.remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<Library> getLibraries() {
        return this.libraries;
    }

    public void setLibraries(List<Library> libraries) {
        this.libraries = libraries;
    }

    public void addLibrary(Library library) {
        if (this.libraries == null) {
            this.libraries = new ArrayList();
        }

        this.libraries.add(library);
    }

    public List<Rule> getRules() {
        return this.rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }
}
