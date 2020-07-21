package geex.grule.console.repository;

import geex.grule.console.repository.model.RepositoryFile;
import geex.grule.console.repository.model.ResourcePackage;
import geex.grule.console.repository.model.VersionFile;

import java.io.InputStream;
import java.util.List;

/**
 * @author Jacky.gao
 * @author fred
 * @since 2017年12月15日
 */
public interface RepositoryReader {
    public static final String BEAN_ID = RepositoryService.BEAN_ID;

    /**
     * 加载指定的companyId下创建的所有的项目信息
     *
     * @param companyId 指定的公司ID
     * @return 返回所有的项目信息
     * @throws Exception 抛出异常
     */
    List<RepositoryFile> loadProjects(String companyId) throws Exception;

    /**
     * 读取指定的最新版本的文件
     *
     * @param path 文件考路径
     * @return 返回文件内容
     * @throws Exception 抛出异常
     */
    InputStream readFile(String path) throws Exception;

    /**
     * 加载指定项目下的知识包信息
     *
     * @param project 项目名称
     * @return 返回已定义的知识包信息
     * @throws Exception 抛出异常
     */
    List<ResourcePackage> loadProjectResourcePackages(String project) throws Exception;

    /**
     * 获取指定路径文件的所有版本信息
     *
     * @param path 文件路径
     * @return 返回版本信息列表
     * @throws Exception
     */
    List<VersionFile> getVersionFiles(String path) throws Exception;

    /**
     * 读取指定版本文件
     *
     * @param path    文件路径
     * @param version 文件版本号
     * @return 返回文件内容
     * @throws Exception 抛出异常
     */
    InputStream readFile(String path, String version) throws Exception;
}
