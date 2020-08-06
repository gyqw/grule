package com.bstek.urule.springboot.service.impl;

import com.bstek.urule.console.EnvironmentProvider;
import com.bstek.urule.console.User;
import com.bstek.urule.console.repository.Repository;
import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.console.repository.model.RepositoryFile;
import com.bstek.urule.console.repository.model.VersionFile;
import com.bstek.urule.springboot.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * @author fred
 * @since 2020/08/05 2:09 PM
 */
@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {
    private RepositoryService repositoryService;
    private RepositoryService remoteRepositoryService;
    private final EnvironmentProvider environmentProvider;

    public ProjectServiceImpl(EnvironmentProvider environmentProvider) {
        this.environmentProvider = environmentProvider;
    }

    @Override
    public String syncProject(String projectName) {
        if (!projectName.startsWith("/")) {
            projectName = "/" + projectName;
        }

        User user = this.environmentProvider.getLoginUser(null);

        // 删除项目
        try {
            repositoryService.deleteFile(projectName, user);
        } catch (Exception ignore) {
        }

        // 导出项目
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            this.remoteRepositoryService.exportXml(projectName, outputStream);

            // 导入项目
            try (ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
                this.repositoryService.importXml(inputStream, true);
            } catch (Exception e) {
                log.error("syncProject ByteArrayInputStream error", e);
                return e.getMessage();
            }
        } catch (Exception e) {
            log.error("syncProject ByteArrayOutputStream error", e);
            return e.getMessage();
        }

        // 同步版本
        try {
            Repository repository = this.remoteRepositoryService.loadRepository(projectName, user, false, null, null);
            log.info("repository: {}", repository);

            iterateRepositoryFile(repository.getRootFile(), user);
        } catch (Exception e) {
            log.error("syncProject error", e);
            return e.getMessage();
        }

        return "success";
    }

    private void iterateRepositoryFile(RepositoryFile repositoryFile, User user) {
        List<RepositoryFile> repositoryFileList = repositoryFile.getChildren();
        if (repositoryFileList != null && repositoryFileList.size() > 0) {
            for (RepositoryFile repositoryFileItem : repositoryFileList) {
                if (repositoryFileItem.getChildren() != null && repositoryFileItem.getChildren().size() > 0) {
                    iterateRepositoryFile(repositoryFileItem, user);
                } else {
                    log.info("iterateRepositoryFile repositoryFileItem: {}", repositoryFileItem);
                    syncVersionFileList(repositoryFileItem, user);
                }
            }
        }
    }

    private void syncVersionFileList(RepositoryFile repositoryFile, User user) {
        try {
            // 删除旧版本
            this.repositoryService.deleteFileVersionHistory(repositoryFile.getFullPath(), user);

            List<VersionFile> versionFileList = this.remoteRepositoryService.getVersionFiles(repositoryFile.getFullPath());
            log.info("syncVersionFileList versionFileList: {}", versionFileList);

            if (versionFileList != null && versionFileList.size() > 0) {
                for (VersionFile versionFile : versionFileList) {
                    InputStream inputStream = this.remoteRepositoryService.readFile(versionFile.getPath(), versionFile.getName());
                    String data = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
                    log.info("syncVersionFileList versionFile: {}, data: {}", versionFile, data);

                    // 保存新版本
                    this.repositoryService.saveFile(versionFile.getPath(), data, true,
                            versionFile.getComment(), versionFile.getBeforeComment(), versionFile.getAfterComment(), user);
                }
            }
        } catch (Exception e) {
            log.error("syncVersionFileList error", e);
        }
    }

    @Qualifier("urule.repositoryService")
    @Autowired
    public void setRepositoryService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @Qualifier("geexRepositoryService")
    @Autowired
    public void setRemoteRepositoryService(RepositoryService remoteRepositoryService) {
        this.remoteRepositoryService = remoteRepositoryService;
    }
}
