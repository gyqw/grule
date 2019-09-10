//package com.bstek.urule.console.repository;
//
//import com.bstek.urule.console.User;
//import com.bstek.urule.console.exception.NoPermissionException;
//import com.bstek.urule.console.repository.model.FileType;
//import com.bstek.urule.console.repository.model.RepositoryFile;
//import com.bstek.urule.console.repository.model.Type;
//import com.bstek.urule.console.repository.permission.PermissionService;
//import com.bstek.urule.console.servlet.permission.UserPermission;
//import com.bstek.urule.exception.RuleException;
//import org.apache.jackrabbit.value.DateValue;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContextAware;
//
//import javax.jcr.Node;
//import java.io.File;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.List;
//
///**
// * @author fred
// * 2019-09-03 9:57 PM
// */
//public class RepositoryServiceGitImpl extends BaseRepositoryService implements RepositoryService, ApplicationContextAware {
//    private PermissionService permissionService;
//
//    @Override
//    public boolean fileExistCheck(String filePath) throws Exception {
//        return false;
//    }
//
//    @Override
//    public RepositoryFile createProject(String projectName, User user, boolean classify) throws Exception {
//        // 权限校验
//        if (!permissionService.isAdmin()) {
//            throw new NoPermissionException();
//        }
//
//        // 拦截器
//        repositoryInteceptor.createProject(projectName);
//
//        // 判断项目是否存在
//        // TODO: 9/4/19
//        File root = getRootDir();
//        if (root.listFiles() != null) {
//            for (File file : root.listFiles()) {
//                if (file.isDirectory() && file.getName().equals(projectName)) {
//                    throw new RuleException("Project [" + projectName + "] already exist.");
//                }
//            }
//        }
//
//        // 创建项目目录
//        Node projectNode = rootNode.addNode(projectName);
//        projectNode.setProperty(FILE, true);
//        projectNode.setProperty(CRATE_USER, user.getUsername());
//        projectNode.setProperty(COMPANY_ID, user.getCompanyId());
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(new Date());
//        DateValue dateValue = new DateValue(calendar);
//        projectNode.setProperty(CRATE_DATE, dateValue);
//        session.save();
//
//        // 创建资源文件
//        createResourcePackageFile(projectName, user);
//        createClientConfigFile(projectName, user);
//        return buildProjectFile(projectNode, null, classify, null);
//    }
//
//    private void createResourcePackageFile(String project, User user) throws Exception {
//        String filePath = processPath(project) + "/" + RES_PACKGE_FILE;
//        Node rootNode = getRootNode();
//        if (!rootNode.hasNode(filePath)) {
//            createFile(filePath, "<?xml version=\"1.0\" encoding=\"utf-8\"?><res-packages></res-packages>", user);
//        }
//    }
//
//    private void createClientConfigFile(String project, User user) throws Exception {
//        Node rootNode = getRootNode();
//        String filePath = processPath(project) + "/" + CLIENT_CONFIG_FILE;
//        if (!rootNode.hasNode(filePath)) {
//            createFile(filePath, "<?xml version=\"1.0\" encoding=\"utf-8\"?><client-config></client-config>", user);
//        }
//    }
//
//    private RepositoryFile buildProjectFile(Node projectNode, FileType[] types, boolean classify, String searchFileName) throws Exception {
//        RepositoryFile projectFile = new RepositoryFile();
//        projectFile.setType(Type.project);
//        projectFile.setName(projectNode.getName());
//        projectFile.setFullPath("/" + projectNode.getName());
//        RepositoryFile resDir = new RepositoryFile();
//        resDir.setFullPath(projectFile.getFullPath());
//        resDir.setName("资源");
//        if ((types == null || types.length == 0) && permissionService.projectPackageHasReadPermission(projectNode.getPath())) {
//            RepositoryFile packageFile = new RepositoryFile();
//            packageFile.setName("知识包");
//            packageFile.setType(Type.resourcePackage);
//            packageFile.setFullPath(projectFile.getFullPath());
//            projectFile.addChild(packageFile, false);
//        }
//        if (classify) {
//            resDir.setType(Type.resource);
//            createResourceCategory(projectNode, resDir, types, searchFileName);
//        } else {
//            resDir.setType(Type.all);
//            buildResources(projectNode, resDir, types, searchFileName);
//        }
//        projectFile.addChild(resDir, false);
//        return projectFile;
//    }
//
//    @Override
//    public void createDir(String path, User user) throws Exception {
//
//    }
//
//    @Override
//    public void createFile(String path, String content, User user) throws Exception {
//
//    }
//
//    @Override
//    public void saveFile(String path, String content, boolean newVersion, String versionComment, User user) throws Exception {
//
//    }
//
//    @Override
//    public void deleteFile(String path, User user) throws Exception {
//
//    }
//
//    @Override
//    public void lockPath(String path, User user) throws Exception {
//
//    }
//
//    @Override
//    public void unlockPath(String path, User user) throws Exception {
//
//    }
//
//    @Override
//    public Repository loadRepository(String project, User user, boolean classify, FileType[] types, String searchFileName) throws Exception {
//        return null;
//    }
//
//    @Override
//    public void fileRename(String path, String newPath) throws Exception {
//
//    }
//
//    @Override
//    public List<String> getReferenceFiles(String path, String searchText) throws Exception {
//        return null;
//    }
//
//    @Override
//    public void exportXml(String projectPath, OutputStream outputStream) throws Exception {
//
//    }
//
//    @Override
//    public void importXml(InputStream inputStream, boolean overwrite) throws Exception {
//
//    }
//
//    @Override
//    public List<RepositoryFile> getDirectories(String project) throws Exception {
//        return null;
//    }
//
//    @Override
//    public List<ClientConfig> loadClientConfigs(String project) throws Exception {
//        return null;
//    }
//
//    @Override
//    public List<UserPermission> loadResourceSecurityConfigs(String companyId) throws Exception {
//        return null;
//    }
//
//    @Override
//    public boolean fileExist(String var1) throws Exception {
//        return false;
//    }
//
//    @Override
//    public String getProject(String var1) {
//        return null;
//    }
//
//    @Override
//    public List<RepositoryFile> loadTemplates(String var1) throws Exception {
//        return null;
//    }
//
//    @Override
//    public String saveTemplateFile(String var1, String var2) throws Exception {
//        return null;
//    }
//
//    @Autowired
//    public void setPermissionService(PermissionService permissionService) {
//        this.permissionService = permissionService;
//    }
//}
