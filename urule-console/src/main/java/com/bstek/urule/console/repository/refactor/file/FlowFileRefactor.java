package com.bstek.urule.console.repository.refactor.file;

import com.bstek.urule.console.repository.model.FileType;

public class FlowFileRefactor extends FileRefactor {
    public FlowFileRefactor() {
    }

    @Override
    public String doRefactor(String oldPath, String newPath, String content) {
        String oldPathStr = "jcr:" + this.perfectPath(oldPath);
        String newPathStr = "jcr:" + this.perfectPath(newPath);
        content = content.replaceAll(oldPathStr, newPathStr);
        String oldProjectName = this.fetchProjectName(oldPath);
        String newProjectName = this.fetchProjectName(newPath);
        if (!oldProjectName.equals(newProjectName)) {
            String oldStr = " project=\"" + oldProjectName + "\"";
            String newStr = " project=\"" + newProjectName + "\"";
            content = content.replaceAll(oldStr, newStr);
        }

        return content;
    }

    private String fetchProjectName(String path) {
        if (path.startsWith("/")) {
            path = path.substring(1, path.length());
        }

        int pos = path.indexOf("/");
        if (pos > 0) {
            path = path.substring(0, pos);
        }

        return path;
    }

    @Override
    public boolean support(String path) {
        return path.toLowerCase().endsWith(FileType.RuleFlow.toString());
    }
}

