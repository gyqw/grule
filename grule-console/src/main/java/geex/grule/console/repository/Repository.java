package geex.grule.console.repository;


import geex.grule.console.repository.model.RepositoryFile;

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

    @Override
    public String toString() {
        return "Repository{" +
                "rootFile=" + rootFile +
                ", projectNames=" + projectNames +
                '}';
    }
}
