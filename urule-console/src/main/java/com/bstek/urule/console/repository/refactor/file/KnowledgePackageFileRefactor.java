package com.bstek.urule.console.repository.refactor.file;

public class KnowledgePackageFileRefactor extends FileRefactor {
    public KnowledgePackageFileRefactor() {
    }

    @Override
    public String doRefactor(String oldPath, String newPath, String content) {
        oldPath = "jcr:" + this.perfectPath(oldPath);
        newPath = "jcr:" + this.perfectPath(newPath);
        return content.replaceAll(oldPath, newPath);
    }

    @Override
    public boolean support(String path) {
        return path.endsWith("___res__package__file__");
    }
}
