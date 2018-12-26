package com.bstek.urule.console.repository.refactor.field;

import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.refactor.Item;

public class RulesetContentRefactor extends ContentRefactor {
    public RulesetContentRefactor() {
    }

    @Override
    public String doRefactor(String path, String content, Item item) {
        return this.doXmlContentRefactor(path, content, item);
    }

    @Override
    public boolean support(String path) {
        path = path.toLowerCase();
        return path.endsWith(FileType.Ruleset.toString()) || path.indexOf("__rules_templates__") > 0;
    }
}
