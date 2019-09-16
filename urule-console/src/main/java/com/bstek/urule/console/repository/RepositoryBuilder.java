package com.bstek.urule.console.repository;

import com.bstek.urule.exception.RuleException;
import org.apache.commons.lang.StringUtils;
import org.eclipse.jgit.api.Git;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.InputStream;

/**
 * @author Jacky.gao
 * @author fred
 * 2016年5月24日
 */
public class RepositoryBuilder implements InitializingBean, ApplicationContextAware {
    private Logger log = LoggerFactory.getLogger(RepositoryBuilder.class);

    private Git git;
    private String repoHomeDir;
    private String repositoryXml;
    private ApplicationContext applicationContext;

    private boolean buildVersioningConfig() {
        String homeDir = "" + repoHomeDir + "/version";
        return FileOperator.createDir(homeDir);
    }

    private void initRepositoryByXml(String xml) throws Exception {
        // TODO: 9/11/19
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
        this.git = Git.init().setGitDir(dir).setDirectory(dir.getParentFile()).call();

        // 创建配置文件夹
        if (buildVersioningConfig()) {
            this.git.add().addFilepattern(".").call();
            this.git.commit().setMessage("config init commit").call();
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

    public Git getGit() {
        return git;
    }

    public String getRepoHomeDir() {
        return repoHomeDir;
    }

    public void setRepoHomeDir(String repoHomeDir) {
        this.repoHomeDir = repoHomeDir;
    }

    public void setRepositoryXml(String repositoryXml) {
        this.repositoryXml = repositoryXml;
    }

    public void destroy() {
        System.out.println("Shutdown repository...");
        this.git.close();
        System.out.println("Shutdown repository completed...");
    }
}
