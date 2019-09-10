package com.bstek.urule.console.repository;

import com.bstek.urule.exception.RuleException;
import org.apache.commons.lang.StringUtils;
import org.apache.jackrabbit.core.RepositoryImpl;
import org.apache.jackrabbit.core.config.BeanConfig;
import org.apache.jackrabbit.core.config.PersistenceManagerConfig;
import org.apache.jackrabbit.core.config.RepositoryConfig;
import org.apache.jackrabbit.core.config.VersioningConfig;
import org.apache.jackrabbit.core.fs.FileSystem;
import org.apache.jackrabbit.core.fs.FileSystemException;
import org.apache.jackrabbit.core.fs.FileSystemFactory;
import org.apache.jackrabbit.core.fs.local.LocalFileSystem;
import org.apache.jackrabbit.core.state.DefaultISMLocking;
import org.apache.jackrabbit.core.state.ISMLocking;
import org.apache.jackrabbit.core.state.ISMLockingFactory;
import org.eclipse.jgit.api.Git;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;
import org.w3c.dom.Element;

import javax.jcr.RepositoryException;
import javax.servlet.ServletContext;
import java.io.File;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * @author Jacky.gao
 * 2016年5月24日
 */
public class RepositoryBuilder implements InitializingBean, ApplicationContextAware {
    private Logger log = Logger.getLogger(RepositoryBuilder.class.getName());

    private String repoHomeDir;
    private Element workspaceTemplate;
    private RepositoryImpl repository;
    private String repositoryXml;
    private ApplicationContext applicationContext;

    public RepositoryImpl getRepository() {
        return repository;
    }

    private FileSystemFactory buildFileSystemFactory(final String dirName) {
        return new FileSystemFactory() {
            public FileSystem getFileSystem() throws RepositoryException {
                try {
                    LocalFileSystem fs = new LocalFileSystem();
                    fs.setPath("" + repoHomeDir + "/" + dirName);
                    fs.init();
                    return fs;
                } catch (FileSystemException e) {
                    throw new RepositoryException("File system initialization failure.", e);
                }
            }
        };
    }

    private VersioningConfig buildVersioningConfig() {
        String homeDir = "" + repoHomeDir + "/version";
        FileSystemFactory fileSystemFactory = buildFileSystemFactory("version");
        PersistenceManagerConfig persistenceManagerConfig = buildPersistenceManagerConfig();
        ISMLockingFactory ismLockingFactory = buildISMLockingFactory();
        return new VersioningConfig(homeDir, fileSystemFactory, persistenceManagerConfig, ismLockingFactory);
    }

    private ISMLockingFactory buildISMLockingFactory() {
        return new ISMLockingFactory() {
            public ISMLocking getISMLocking() throws RepositoryException {
                return new DefaultISMLocking();
            }
        };
    }

    private PersistenceManagerConfig buildPersistenceManagerConfig() {
        Properties prop = new Properties();
        BeanConfig beanConfig = new BeanConfig("org.apache.jackrabbit.core.persistence.bundle.BundleFsPersistenceManager", prop);
        PersistenceManagerConfig persistenceManagerConfig = new PersistenceManagerConfig(beanConfig);
        return persistenceManagerConfig;
    }

    private void initRepositoryByXml(String xml) throws Exception {
        log.info("Build repository from user custom xml file...");
        InputStream inputStream = null;
        try {
            inputStream = this.applicationContext.getResource(xml).getInputStream();
            String tempRepoHomeDir = System.getProperty("java.io.tmpdir");
            if (StringUtils.isNotBlank(tempRepoHomeDir) && tempRepoHomeDir.length() > 1) {
                if (tempRepoHomeDir.endsWith("/") || tempRepoHomeDir.endsWith("\\")) {
                    tempRepoHomeDir += "urule-temp-repo-home/";
                } else {
                    tempRepoHomeDir += "/urule-temp-repo-home/";
                }
                File tempDir = new File(tempRepoHomeDir);
                clearTempDir(tempDir);
            } else {
                tempRepoHomeDir = "";
            }
            RepositoryConfig repositoryConfig = RepositoryConfig.create(inputStream, tempRepoHomeDir);
            repository = RepositoryImpl.create(repositoryConfig);
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }

    private void clearTempDir(File file) {
        if (file.isDirectory()) {
            for (File childFile : file.listFiles()) {
                clearTempDir(childFile);
            }
        }
        file.delete();
    }

    private void initDefaultRepository() throws Exception {
        // 初始化git
        File dir = new File(this.repoHomeDir + "/.git");
        Git.init().setGitDir(dir).setDirectory(dir.getParentFile()).call();

        VersioningConfig versioningConfig = buildVersioningConfig();
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    private void initRepositoryDir(ApplicationContext applicationContext) {
        if (applicationContext instanceof WebApplicationContext) {
            WebApplicationContext context = (WebApplicationContext) applicationContext;
            ServletContext servletContext = context.getServletContext();
            File file = new File(repoHomeDir);
            if (!file.exists()) {
                repoHomeDir = servletContext.getRealPath(repoHomeDir);
            }
            file = new File(repoHomeDir);
            if (!file.exists()) {
                throw new RuleException("Repository root dir " + repoHomeDir + " is not exist.");
            }
        } else {
            log.info("Current is not a standard web container,so can't resolve real path for repo home dir.");
        }
        log.info("Use \"" + repoHomeDir + "\" as urule repository home directory.");
    }

    public void afterPropertiesSet() throws Exception {
        if (repository != null) {
            repository.shutdown();
        }
        if (StringUtils.isNotBlank(repoHomeDir) && !repoHomeDir.equals("${urule.repository.dir}")) {
            initRepositoryDir(applicationContext);
        }
        if (StringUtils.isNotBlank(repositoryXml)) {
            initRepositoryByXml(repositoryXml);
        } else {
            if (StringUtils.isBlank(repoHomeDir)) {
                throw new RuleException("You need config \"urule.repository.dir\" property for set repository home dir.");
            }
            initDefaultRepository();
        }
    }

    public void setRepoHomeDir(String repoHomeDir) {
        this.repoHomeDir = repoHomeDir;
    }

    public void setRepositoryXml(String repositoryXml) {
        this.repositoryXml = repositoryXml;
    }

    public void destroy() {
        System.out.println("Shutdown repository...");
        repository.shutdown();
        System.out.println("Shutdown repository completed...");
    }
}
