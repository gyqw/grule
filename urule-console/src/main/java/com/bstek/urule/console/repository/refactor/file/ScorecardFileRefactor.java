package com.bstek.urule.console.repository.refactor.file;

import com.bstek.urule.console.repository.model.FileType;

public class ScorecardFileRefactor extends FileRefactor {
    public ScorecardFileRefactor() {
    }

    @Override
    public String doRefactor(String oldPath, String newPath, String content) {
        oldPath = "jcr:" + this.perfectPath(oldPath);
        newPath = "jcr:" + this.perfectPath(newPath);
        return content.replaceAll(oldPath, newPath);
    }

    @Override
    public boolean support(String path) {
        return path.toLowerCase().endsWith(FileType.Scorecard.toString());
    }
}

