package com.bstek.urule.springboot.service.impl;

import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.springboot.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

/**
 * @author fred
 * @since 2020/08/05 2:09 PM
 */
@Service
public class ProjectServiceImpl implements ProjectService {
    private final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private RepositoryService repositoryService;
    private RepositoryService remoteRepositoryService;

    @Override
    public void syncProject(String project) {
        if (!project.startsWith("/")) {
            project = "/" + project;
        }

        // 删除项目
        try {
            repositoryService.deleteFile(project, null);
        } catch (Exception ignore) {
        }

        // 导出项目
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            this.remoteRepositoryService.exportXml(project, outputStream);

            // 导入项目
            try (ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
                this.repositoryService.importXml(inputStream, true);
            } catch (Exception e) {
                logger.error("syncProject ByteArrayInputStream error", e);
            }
        } catch (Exception e) {
            logger.error("syncProject ByteArrayOutputStream error", e);
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
