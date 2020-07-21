package geex.grule.console.repository;

import org.apache.jackrabbit.oak.InitialContent;
import org.apache.jackrabbit.oak.Oak;
import org.apache.jackrabbit.oak.api.ContentRepository;
import org.apache.jackrabbit.oak.jcr.repository.RepositoryImpl;
import org.apache.jackrabbit.oak.plugins.commit.ConflictValidatorProvider;
import org.apache.jackrabbit.oak.plugins.commit.JcrConflictHandler;
import org.apache.jackrabbit.oak.plugins.document.DocumentNodeStore;
import org.apache.jackrabbit.oak.plugins.name.NamespaceEditorProvider;
import org.apache.jackrabbit.oak.plugins.nodetype.TypeEditorProvider;
import org.apache.jackrabbit.oak.spi.security.OpenSecurityProvider;
import org.apache.jackrabbit.oak.spi.whiteboard.DefaultWhiteboard;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.w3c.dom.Element;

import java.util.logging.Logger;

import static org.apache.jackrabbit.oak.plugins.document.mongo.MongoDocumentNodeStoreBuilder.newMongoDocumentNodeStoreBuilder;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2016年5月24日
 */
@Component
public class RepositoryBuilder implements InitializingBean {
    private Logger log = Logger.getLogger(RepositoryBuilder.class.getName());

    private RepositoryImpl repository;
    private Element workspaceTemplate;
    private String repoHomeDir;

    private void initDefaultRepository() throws Exception {
        String workspaceDirectory = "" + repoHomeDir + "/workspaces";
        String workspaceConfigDirectory = null;
        String defaultWorkspace = "default";
        int workspaceMaxIdleTime = 0;

        DefaultWhiteboard whiteboard = new DefaultWhiteboard();
        DocumentNodeStore nodeStore = newMongoDocumentNodeStoreBuilder()
                .setMongoDB("mongodb://localhost:27017", "test2", 0).build();
        final Oak oak = new Oak(nodeStore)
                .with(new InitialContent())
                .with(JcrConflictHandler.createJcrConflictHandler())
                .with(new OpenSecurityProvider())
                .with(new NamespaceEditorProvider())
                .with(new TypeEditorProvider())
                .with(new ConflictValidatorProvider())
                .with(defaultWorkspace)
                .with(whiteboard);
        final ContentRepository contentRepository = oak.createContentRepository();
        repository = new RepositoryImpl(contentRepository, whiteboard, new OpenSecurityProvider(), 1000, null);
    }

    public void afterPropertiesSet() throws Exception {
        if (repository != null) {
            repository.shutdown();
        }

        initDefaultRepository();
    }

    // TODO: 3/24/20 destory
    public void destroy() {
        System.out.println("Shutdown repository...");
        repository.shutdown();
        System.out.println("Shutdown repository completed...");
    }

    public RepositoryImpl getRepository() {
        return repository;
    }
}
