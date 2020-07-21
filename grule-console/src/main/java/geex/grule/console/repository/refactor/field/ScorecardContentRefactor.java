package geex.grule.console.repository.refactor.field;

import geex.grule.console.repository.model.FileType;
import geex.grule.console.repository.refactor.Item;

public class ScorecardContentRefactor extends ContentRefactor {
    public ScorecardContentRefactor() {
    }

    @Override
    public String doRefactor(String path, String content, Item item) {
        return this.doXmlContentRefactor(path, content, item);
    }

    @Override
    public boolean support(String path) {
        return path.toLowerCase().endsWith(FileType.Scorecard.toString());
    }
}

