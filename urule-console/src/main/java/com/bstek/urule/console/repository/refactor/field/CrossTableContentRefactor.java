package com.bstek.urule.console.repository.refactor.field;

import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.refactor.Item;

public class CrossTableContentRefactor extends ContentRefactor {
    public CrossTableContentRefactor() {
    }

    @Override
    public String doRefactor(String path, String content, Item item) {
        return this.doXmlContentRefactor(path, content, item);
    }

    @Override
    public boolean support(String path) {
        return path.toLowerCase().endsWith(FileType.Crosstab.toString());
    }
}

