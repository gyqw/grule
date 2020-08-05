package com.bstek.urule.springboot.config;

import com.bstek.urule.console.repository.RepositoryBuilder;
import com.bstek.urule.console.repository.RepositoryService;
import com.bstek.urule.console.repository.RepositoryServiceImpl;
import com.bstek.urule.console.servlet.URuleServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class UruleConfiguration {
    private final Logger log = LoggerFactory.getLogger(UruleConfiguration.class);

    @Bean
    public ServletRegistrationBean registerURuleServlet() {
        return new ServletRegistrationBean(new URuleServlet(), "/urule/*");
    }

    @Bean(destroyMethod = "destroy")
    public RepositoryBuilder geexRepositoryBuilder(ApplicationContext applicationContext) {
        RepositoryBuilder repositoryBuilder = new RepositoryBuilder();
        repositoryBuilder.setRepositoryDatasourceName("remoteDataSource");
        repositoryBuilder.setDatabaseType("mysql");
        return repositoryBuilder;
    }

    @Bean
    public RepositoryService geexRepositoryService(RepositoryBuilder geexRepositoryBuilder) {
        RepositoryServiceImpl repositoryService = new RepositoryServiceImpl();
        repositoryService.setRepositoryBuilder(geexRepositoryBuilder);
        return repositoryService;
    }
}
