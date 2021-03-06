package com.bstek.urule.console.repository;

import com.bstek.urule.console.User;
import com.bstek.urule.console.repository.model.FileType;
import com.bstek.urule.console.repository.model.RepositoryFile;
import com.bstek.urule.console.repository.model.VersionFile;
import com.bstek.urule.console.servlet.permission.UserPermission;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * 2015年3月24日
 */
public interface RepositoryService extends RepositoryReader {
    public static final String BEAN_ID = "urule.repositoryService";

    boolean fileExistCheck(String filePath) throws Exception;

    RepositoryFile createProject(String projectName, User user, boolean classify) throws Exception;

    void createDir(String path, User user) throws Exception;

    void createFile(String path, String content, User user) throws Exception;

    void saveFile(String path, String content, boolean newVersion, String versionComment, User user) throws Exception;

    /**
     * 保存文件
     *
     * @param path           文件路径
     * @param content        文件内容
     * @param newVersion     新版本
     * @param versionComment 版本描述
     * @param beforeComment  变更前描述
     * @param afterComment   变更后描述
     * @param user           更新用户
     * @throws Exception 异常
     */
    void saveFile(String path, String content, boolean newVersion, String versionComment, String beforeComment, String afterComment, User user) throws Exception;

    void deleteFile(String path, User user) throws Exception;

    void lockPath(String path, User user) throws Exception;

    void unlockPath(String path, User user) throws Exception;

    Repository loadRepository(String project, User user, boolean classify, FileType[] types, String searchFileName) throws Exception;

    void fileRename(String path, String newPath) throws Exception;

    List<String> getReferenceFiles(String path, String searchText) throws Exception;

    InputStream readFile(String path, String version) throws Exception;

    List<VersionFile> getVersionFiles(String path) throws Exception;

    void exportXml(String projectPath, OutputStream outputStream) throws Exception;

    void importXml(InputStream inputStream, boolean overwrite) throws Exception;

    List<RepositoryFile> getDirectories(String project) throws Exception;

    List<ClientConfig> loadClientConfigs(String project) throws Exception;

    PackageConfig loadPackageConfigs(String project) throws Exception;

    void updatePackageConfigs(String project, PackageConfig packageConfig) throws Exception;

    List<UserPermission> loadResourceSecurityConfigs(String companyId) throws Exception;

    boolean fileExist(String var1) throws Exception;

    String getProject(String var1);

    List<RepositoryFile> loadTemplates(String var1) throws Exception;

    String saveTemplateFile(String var1, String var2) throws Exception;
}
