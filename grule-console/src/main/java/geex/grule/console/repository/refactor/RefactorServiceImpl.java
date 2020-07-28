package geex.grule.console.repository.refactor;

import geex.grule.console.EnvironmentUtils;
import geex.grule.console.User;
import geex.grule.console.repository.Repository;
import geex.grule.console.repository.RepositoryService;
import geex.grule.console.repository.model.FileType;
import geex.grule.console.repository.model.RepositoryFile;
import geex.grule.console.repository.model.Type;
import geex.grule.console.repository.refactor.field.ContentRefactor;
import geex.grule.console.repository.refactor.file.FileRefactor;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@Service
public class RefactorServiceImpl implements RefactorService {
    private RepositoryService repositoryService;
    private Collection<FileRefactor> fileRefactors;
    private Collection<ContentRefactor> contentRefactors;

    @Override
    public void refactorFile(String oldPath, String newPath, Repository repo) throws Exception {
        String resPackagePath = oldPath.substring(1) + "/" + "___res__package__file__";
        User user = EnvironmentUtils.getLoginUser();
        RepositoryFile rootFile = repo.getRootFile();
        List<RepositoryFile> children = rootFile.getChildren();
        if (oldPath.contains("___temp_mount_project_node_for_import__")) {
            oldPath = oldPath.substring("___temp_mount_project_node_for_import__".length() + 1, oldPath.length());
        }

        if (newPath.contains("___temp_mount_project_node_for_import__")) {
            newPath = newPath.substring("___temp_mount_project_node_for_import__".length() + 1, newPath.length());
        }

        this.doFileRefactor(oldPath, newPath, user, children);
        if (this.repositoryService.fileExist(resPackagePath)) {
            InputStream inputStream = this.repositoryService.readFile(resPackagePath);
            String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            inputStream.close();
            Iterator var10 = this.fileRefactors.iterator();

            while (var10.hasNext()) {
                FileRefactor refactor = (FileRefactor) var10.next();
                if (refactor.support(resPackagePath)) {
                    String newContent = refactor.doRefactor(oldPath, newPath, content);
                    if (newContent != null) {
                        this.repositoryService.saveFile(resPackagePath, newContent, false, (String) null, user);
                    }
                    break;
                }
            }
        }

    }

    @Override
    public void refactorFile(String oldPath, String newPath) throws Exception {
        String project = this.repositoryService.getProject(oldPath);
        User user = EnvironmentUtils.getLoginUser();
        FileType[] types = new FileType[]{FileType.DecisionTable, FileType.Crosstab, FileType.DecisionTree, FileType.RuleFlow, FileType.Ruleset, FileType.UL, FileType.Scorecard, FileType.ComplexScorecard, FileType.ScriptDecisionTable};
        Repository repo = this.repositoryService.loadRepository(project, user, false, types, (String) null);
        RepositoryFile rootFile = repo.getRootFile();
        List<RepositoryFile> children = rootFile.getChildren();
        this.doFileRefactor(oldPath, newPath, user, children);
        String resPackagePath = project + "/" + "___res__package__file__";
        if (this.repositoryService.fileExist(resPackagePath)) {
            InputStream inputStream = this.repositoryService.readFile(resPackagePath);
            String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            inputStream.close();
            Iterator var12 = this.fileRefactors.iterator();

            while (var12.hasNext()) {
                FileRefactor refactor = (FileRefactor) var12.next();
                if (refactor.support(resPackagePath)) {
                    String newContent = refactor.doRefactor(oldPath, newPath, content);
                    if (newContent != null) {
                        this.repositoryService.saveFile(resPackagePath, newContent, false, (String) null, user);
                    }
                    break;
                }
            }
        }

    }

    private void doFileRefactor(String oldPath, String newPath, User user, List<RepositoryFile> children) throws Exception, IOException {
        if (children != null && children.size() != 0) {
            Iterator var5 = children.iterator();

            while (true) {
                while (var5.hasNext()) {
                    RepositoryFile file = (RepositoryFile) var5.next();
                    Type type = file.getType();
                    if (!Type.rule.equals(type) && !Type.ul.equals(type) && !Type.decisionTable.equals(type) && !Type.crosstab.equals(type) && !Type.decisionTree.equals(type) && !Type.flow.equals(type) && !Type.scorecard.equals(type) && !Type.complexscorecard.equals(type)) {
                        this.doFileRefactor(oldPath, newPath, user, file.getChildren());
                    } else {
                        String fullPath = file.getFullPath();
                        InputStream inputStream = this.repositoryService.readFile(fullPath);
                        String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
                        inputStream.close();
                        Iterator var11 = this.fileRefactors.iterator();

                        while (var11.hasNext()) {
                            FileRefactor refactor = (FileRefactor) var11.next();
                            if (refactor.support(fullPath)) {
                                String newContent = refactor.doRefactor(oldPath, newPath, content);
                                if (newContent != null) {
                                    this.repositoryService.saveFile(fullPath, newContent, false, (String) null, user);
                                }
                                break;
                            }
                        }
                    }
                }

                return;
            }
        }
    }

    @Override
    public void refactorItem(String path, Item item) throws Exception {
        String project = this.repositoryService.getProject(path);
        User user = EnvironmentUtils.getLoginUser();
        FileType[] types = new FileType[]{FileType.DecisionTable, FileType.Crosstab, FileType.DecisionTree, FileType.RuleFlow, FileType.Ruleset, FileType.UL, FileType.Scorecard, FileType.ComplexScorecard, FileType.ScriptDecisionTable};
        Repository repo = this.repositoryService.loadRepository(project, user, false, types, (String) null);
        RepositoryFile rootFile = repo.getRootFile();
        List<RepositoryFile> children = rootFile.getChildren();
        this.doContentRefactor(path, item, user, children);
        List<RepositoryFile> templateFiles = this.repositoryService.loadTemplates(project);
        Iterator var10 = templateFiles.iterator();

        while (var10.hasNext()) {
            RepositoryFile category = (RepositoryFile) var10.next();
            this.doContentRefactor(path, item, user, category.getChildren());
        }

    }

    private void doContentRefactor(String path, Item item, User user, List<RepositoryFile> children) throws Exception, IOException {
        if (children != null && children.size() != 0) {
            Iterator var5 = children.iterator();

            while (true) {
                while (var5.hasNext()) {
                    RepositoryFile file = (RepositoryFile) var5.next();
                    Type type = file.getType();
                    if (!type.equals(Type.decisionTable) && !type.equals(Type.crosstab) && !type.equals(Type.decisionTree) && !type.equals(Type.rule) && !type.equals(Type.flow) && !type.equals(Type.scorecard) && !type.equals(Type.complexscorecard) && !type.equals(Type.ul)) {
                        this.doContentRefactor(path, item, user, file.getChildren());
                    } else {
                        String fullPath = file.getFullPath();
                        InputStream inputStream = this.repositoryService.readFile(fullPath);
                        String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
                        inputStream.close();
                        Iterator var11 = this.contentRefactors.iterator();

                        while (var11.hasNext()) {
                            ContentRefactor refactor = (ContentRefactor) var11.next();
                            if (refactor.support(fullPath)) {
                                String newContent = refactor.doRefactor(path, content, item);
                                if (newContent != null) {
                                    if (fullPath.indexOf("__rules_templates__") > 0) {
                                        this.repositoryService.saveTemplateFile(fullPath, newContent);
                                    } else {
                                        this.repositoryService.saveFile(fullPath, newContent, false, (String) null, user);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }

                return;
            }
        }
    }
}

