package com.bstek.urule.console.repository;

import com.bstek.urule.console.repository.model.RepositoryFile;

import java.util.List;

public class Repository {
    private RepositoryFile rootFile;
    private List<String> projectNames;

    public RepositoryFile getRootFile() {
        return rootFile;
    }

    public void setRootFile(RepositoryFile rootFile) {
        this.rootFile = rootFile;
    }

    public List<String> getProjectNames() {
        return projectNames;
    }

    public void setProjectNames(List<String> projectNames) {
        this.projectNames = projectNames;
    }
}
