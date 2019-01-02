package com.bstek.urule.console.repository.refactor.field;

import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.refactor.Item;

public class FlowContentRefactor extends ContentRefactor {
    public FlowContentRefactor() {
    }

    @Override
    public String doRefactor(String path, String content, Item item) {
        String xml = this.doScriptContentRefactor(path, content, item);
        if (xml == null) {
            xml = content;
        }

        return this.doXmlContentRefactor(path, xml, item);
    }

    @Override
    public boolean support(String path) {
        return path.toLowerCase().endsWith(FileType.RuleFlow.toString());
    }
}
