package com.bstek.urule.console.repository;

import com.bstek.urule.console.User;
import com.bstek.urule.console.exception.NoPermissionException;
import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.model.RepositoryFile;
import com.bstek.urule.console.repository.permission.PermissionService;
import com.bstek.urule.console.servlet.permission.UserPermission;
import com.bstek.urule.exception.RuleException;
import org.apache.jackrabbit.value.DateValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextAware;

import javax.jcr.Node;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author fred
 * 2019-09-03 9:57 PM
 */
public class RepositoryServiceGitImpl extends BaseRepositoryService implements RepositoryService, ApplicationContextAware {
    private PermissionService permissionService;

    @Override
    public boolean fileExistCheck(String filePath) throws Exception {
        return false;
    }

    @Override
    public RepositoryFile createProject(String projectName, User user, boolean classify) throws Exception {
        if (!permissionService.isAdmin()) {
            throw new NoPermissionException();
        }
        repositoryInteceptor.createProject(projectName);
        Node rootNode = getRootNode();
        if (rootNode.hasNode(projectName)) {
            throw new RuleException("Project [" + projectName + "] already exist.");
        }
        Node projectNode = rootNode.addNode(projectName);
        projectNode.addMixin("mix:versionable");
        projectNode.setProperty(FILE, true);
        projectNode.setProperty(CRATE_USER, user.getUsername());
        projectNode.setProperty(COMPANY_ID, user.getCompanyId());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        DateValue dateValue = new DateValue(calendar);
        projectNode.setProperty(CRATE_DATE, dateValue);
        session.save();
        createResourcePackageFile(projectName, user);
        createClientConfigFile(projectName, user);
        return buildProjectFile(projectNode, null, classify, null);

        return null;
    }

    @Override
    public void createDir(String path, User user) throws Exception {

    }

    @Override
    public void createFile(String path, String content, User user) throws Exception {

    }

    @Override
    public void saveFile(String path, String content, boolean newVersion, String versionComment, User user) throws Exception {

    }

    @Override
    public void deleteFile(String path, User user) throws Exception {

    }

    @Override
    public void lockPath(String path, User user) throws Exception {

    }

    @Override
    public void unlockPath(String path, User user) throws Exception {

    }

    @Override
    public Repository loadRepository(String project, User user, boolean classify, FileType[] types, String searchFileName) throws Exception {
        return null;
    }

    @Override
    public void fileRename(String path, String newPath) throws Exception {

    }

    @Override
    public List<String> getReferenceFiles(String path, String searchText) throws Exception {
        return null;
    }

    @Override
    public void exportXml(String projectPath, OutputStream outputStream) throws Exception {

    }

    @Override
    public void importXml(InputStream inputStream, boolean overwrite) throws Exception {

    }

    @Override
    public List<RepositoryFile> getDirectories(String project) throws Exception {
        return null;
    }

    @Override
    public List<ClientConfig> loadClientConfigs(String project) throws Exception {
        return null;
    }

    @Override
    public List<UserPermission> loadResourceSecurityConfigs(String companyId) throws Exception {
        return null;
    }

    @Override
    public boolean fileExist(String var1) throws Exception {
        return false;
    }

    @Override
    public String getProject(String var1) {
        return null;
    }

    @Override
    public List<RepositoryFile> loadTemplates(String var1) throws Exception {
        return null;
    }

    @Override
    public String saveTemplateFile(String var1, String var2) throws Exception {
        return null;
    }

    @Autowired
    public void setPermissionService(PermissionService permissionService) {
        this.permissionService = permissionService;
    }
}
