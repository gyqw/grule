package com.bstek.urule.console.repository;

import com.bstek.urule.exception.RuleException;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.jackrabbit.core.RepositoryImpl;
import org.apache.jackrabbit.core.config.*;
import org.apache.jackrabbit.core.data.DataStore;
import org.apache.jackrabbit.core.data.DataStoreFactory;
import org.apache.jackrabbit.core.data.FileDataStore;
import org.apache.jackrabbit.core.fs.FileSystem;
import org.apache.jackrabbit.core.fs.FileSystemException;
import org.apache.jackrabbit.core.fs.FileSystemFactory;
import org.apache.jackrabbit.core.fs.local.LocalFileSystem;
import org.apache.jackrabbit.core.query.QueryHandlerFactory;
import org.apache.jackrabbit.core.state.DefaultISMLocking;
import org.apache.jackrabbit.core.state.ISMLocking;
import org.apache.jackrabbit.core.state.ISMLockingFactory;
import org.apache.jackrabbit.core.util.CooperativeFileLock;
import org.apache.jackrabbit.core.util.RepositoryLockMechanism;
import org.apache.jackrabbit.core.util.RepositoryLockMechanismFactory;
import org.apache.jackrabbit.core.util.db.ConnectionFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

import javax.jcr.RepositoryException;
import javax.servlet.ServletContext;
import javax.sql.DataSource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Logger;

/**
 * @author Jacky.gao
 * @since 2016年5月24日
 */
public class RepositoryBuilder implements InitializingBean, ApplicationContextAware {
    private String repoHomeDir;
    private Element workspaceTemplate;
    private RepositoryImpl repository;
    private String repositoryXml;
    private ApplicationContext applicationContext;
    private String repositoryDatasourceName;
    private String databaseType;
    private DataSource datasource;
    private static Map<String, DataSource> dataSourceMap = new HashMap<>();
    private final Logger log = Logger.getLogger(RepositoryBuilder.class.getName());

    public RepositoryImpl getRepository() {
        return repository;
    }

    private SecurityConfig buildSecurityConfig() {
        return new SecurityConfig("uruleRepoSecurity", buildSecurityManagerConfig(), buildAccessManagerConfig(), buildLoginModuleConfig());
    }

    private RepositoryLockMechanismFactory buildRepositoryLockMechanismFactory() {
        return new RepositoryLockMechanismFactory() {
            public RepositoryLockMechanism getRepositoryLockMechanism() throws RepositoryException {
                return new CooperativeFileLock();
            }
        };
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

    private DataStoreFactory buildDataStoreFactory() {
        return new DataStoreFactory() {
            public DataStore getDataStore() throws RepositoryException {
                FileDataStore datastore = new FileDataStore();
                datastore.setPath("" + repoHomeDir + "/repository/datastore");
                datastore.setMinRecordLength(100);
                return null;
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
        return new PersistenceManagerConfig(beanConfig);
    }

    private SecurityManagerConfig buildSecurityManagerConfig() {
        Properties prop = new Properties();
        BeanConfig beanConfig = new BeanConfig("org.apache.jackrabbit.core.security.simple.SimpleSecurityManager", prop);
        return new SecurityManagerConfig(beanConfig, "default", null);
    }

    private AccessManagerConfig buildAccessManagerConfig() {
        Properties prop = new Properties();
        BeanConfig beanConfig = new BeanConfig("org.apache.jackrabbit.core.security.simple.SimpleAccessManager", prop);
        return new AccessManagerConfig(beanConfig);
    }

    private LoginModuleConfig buildLoginModuleConfig() {
        Properties prop = new Properties();
        prop.put("anonymousId", "anonymous");
        prop.put("adminId", "admin");
        BeanConfig beanConfig = new BeanConfig("org.apache.jackrabbit.core.security.simple.SimpleLoginModule", prop);
        return new LoginModuleConfig(beanConfig);
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
                tempRepoHomeDir += UUID.randomUUID().toString().replace("-", "") + "/";
                File tempDir = new File(tempRepoHomeDir);
                clearTempDir(tempDir);
            } else {
                tempRepoHomeDir = "";
            }

            Properties properties = new Properties(System.getProperties());
            properties.setProperty("rep.home", tempRepoHomeDir);
            properties.setProperty("dataSourceName", this.repositoryDatasourceName);
            RepositoryConfig repositoryConfig = RepositoryConfig.create(new InputSource(inputStream), properties);
            repository = RepositoryImpl.create(repositoryConfig);
        } catch (Exception e) {
            log.info("initRepositoryByXml error: " + e.getMessage());
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
        SecurityConfig securityConfig = buildSecurityConfig();
        FileSystemFactory fileSystemFactory = buildFileSystemFactory("repository");
        String workspaceDirectory = "" + repoHomeDir + "/workspaces";
        String workspaceConfigDirectory = null;
        String defaultWorkspace = "default";
        int workspaceMaxIdleTime = 0;
        VersioningConfig versioningConfig = buildVersioningConfig();
        QueryHandlerFactory queryHandlerFactory = null;
        ClusterConfig clusterConfig = null;
        DataStoreFactory dataStoreFactory = buildDataStoreFactory();
        RepositoryLockMechanismFactory repositoryLockMechanismFactory = buildRepositoryLockMechanismFactory();
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        ConnectionFactory connectionFactory = new ConnectionFactory();
        RepositoryConfigurationParser repositoryConfigurationParser = new RepositoryConfigurationParser(new Properties());
        initWorkspaceTemplate();
        RepositoryConfig repositoryConfig = new RepositoryConfig(repoHomeDir, securityConfig,
                fileSystemFactory, workspaceDirectory,
                workspaceConfigDirectory, defaultWorkspace,
                workspaceMaxIdleTime, workspaceTemplate, versioningConfig,
                queryHandlerFactory, clusterConfig, dataStoreFactory,
                repositoryLockMechanismFactory, dataSourceConfig,
                connectionFactory, repositoryConfigurationParser);
        repositoryConfig.init();
        repository = RepositoryImpl.create(repositoryConfig);
    }

    private void initWorkspaceTemplate() {
        InputStream inputStream = null;
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            inputStream = applicationContext.getResource("classpath:com/bstek/urule/console/repository/workspace_template.xml").getInputStream();
            Document doc = builder.parse(inputStream);
            workspaceTemplate = doc.getDocumentElement();
        } catch (Exception e) {
            throw new RuleException(e);
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
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
        if (StringUtils.isNotBlank(repositoryDatasourceName)) {
            this.datasource = (DataSource) this.applicationContext.getBean(repositoryDatasourceName);
            if (RepositoryBuilder.dataSourceMap.get(this.repositoryDatasourceName) == null) {
                RepositoryBuilder.dataSourceMap.put(this.repositoryDatasourceName, this.datasource);
            }
        }
        if (repository != null) {
            repository.shutdown();
        }
        if (StringUtils.isNotBlank(repoHomeDir) && !repoHomeDir.equals("${urule.repository.dir}")) {
            initRepositoryDir(applicationContext);
        }
        if (StringUtils.isNotBlank(repositoryXml)) {
            initRepositoryByXml(repositoryXml);
        } else if (this.datasource != null) {
            if (this.databaseType == null) {
                throw new RuleException("You need config \"urule.repository.databasetype\" property when use spring datasource!");
            }
            initRepositoryFromSpringDatasource();
        } else {
            if (StringUtils.isBlank(repoHomeDir)) {
                throw new RuleException("You need config \"urule.repository.dir\" property for set repository home dir.");
            }
            initDefaultRepository();
        }
    }

    private void initRepositoryFromSpringDatasource() throws Exception {
        log.info("Init repository from spring datasource [" + repositoryDatasourceName + "] with database type [" + this.databaseType + "]...");
        String xml = "classpath:com/bstek/urule/console/repository/database/configs/" + this.databaseType + ".xml";
        initRepositoryByXml(xml);
    }

    public void setRepoHomeDir(String repoHomeDir) {
        this.repoHomeDir = repoHomeDir;
    }

    public void setRepositoryXml(String repositoryXml) {
        this.repositoryXml = repositoryXml;
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    public void setRepositoryDatasourceName(String repositoryDatasourceName) {
        this.repositoryDatasourceName = repositoryDatasourceName;
    }

    public static DataSource getDatasourceByName(String name) {
        return RepositoryBuilder.dataSourceMap.get(name);
    }

    public void destroy() {
        log.info("Shutdown repository...");
        repository.shutdown();
        log.info("Shutdown repository completed...");
    }
}
