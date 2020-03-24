package geex.grule.console;

import com.bstek.urule.builder.KnowledgeBase;
import com.bstek.urule.builder.KnowledgeBuilder;
import com.bstek.urule.builder.ResourceBase;
import com.bstek.urule.exception.RuleException;
import com.bstek.urule.runtime.KnowledgePackage;
import com.bstek.urule.runtime.service.KnowledgePackageService;
import geex.grule.console.repository.PackageConfig;
import geex.grule.console.repository.RepositoryService;
import geex.grule.console.repository.model.ResourceItem;
import geex.grule.console.repository.model.ResourcePackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DefaultKnowledgePackageService implements KnowledgePackageService {
    private KnowledgeBuilder knowledgeBuilder;
    private RepositoryService repositoryService;

    @Override
    public KnowledgePackage buildKnowledgePackage(String packageInfo) throws IOException {
        try {
            String[] info = packageInfo.split("/");
            if (info.length != 2) {
                throw new RuleException("PackageInfo [" + packageInfo + "] is invalid. Correct such as \"projectName/packageId\".");
            }
            String project = info[0];
            String packageId = info[1];

            // 加载版本配置
            PackageConfig packageConfig = this.repositoryService.loadPackageConfigs(project);
            if (packageConfig.getVersion() != null) {
                project += ":" + packageConfig.getVersion();
            }

            List<ResourcePackage> packages = repositoryService.loadProjectResourcePackages(project);
            List<ResourceItem> list = null;
            for (ResourcePackage p : packages) {
                if (p.getId().equals(packageId)) {
                    list = p.getResourceItems();
                    break;
                }
            }
            if (list == null) {
                throw new RuleException("PackageId [" + packageId + "] was not found in project [" + project + "].");
            }
            ResourceBase resourceBase = knowledgeBuilder.newResourceBase();
            for (ResourceItem item : list) {
                resourceBase.addResource(item.getPath(), item.getVersion());
            }
            KnowledgeBase knowledgeBase = knowledgeBuilder.buildKnowledgeBase(resourceBase);
            return knowledgeBase.getKnowledgePackage();
        } catch (Exception ex) {
            throw new RuleException(ex);
        }
    }

    @Autowired
    public void setKnowledgeBuilder(KnowledgeBuilder knowledgeBuilder) {
        this.knowledgeBuilder = knowledgeBuilder;
    }

    @Autowired
    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }
}
