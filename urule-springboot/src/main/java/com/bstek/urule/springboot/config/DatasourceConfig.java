package com.bstek.urule.springboot.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author fred
 * @since 2019-06-26 6:49 PM
 */
@Configuration
public class DatasourceConfig {

    @Value("${urule.datasource.uruleDataSource.driver}")
    private String uruleDriver;
    @Value("${urule.datasource.uruleDataSource.url}")
    private String uruleUrl;
    @Value("${urule.datasource.uruleDataSource.username}")
    private String uruleUsername;
    @Value("${urule.datasource.uruleDataSource.password}")
    private String urulePwd;

    @Value("${urule.datasource.remoteDataSource.driver}")
    private String remoteDriver;
    @Value("${urule.datasource.remoteDataSource.url}")
    private String remoteUrl;
    @Value("${urule.datasource.remoteDataSource.username}")
    private String remoteUsername;
    @Value("${urule.datasource.remoteDataSource.password}")
    private String remotePwd;

    @Bean
    public BasicDataSource uruleDataSource() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName(this.uruleDriver);
        basicDataSource.setUrl(this.uruleUrl);
        basicDataSource.setUsername(this.uruleUsername);
        basicDataSource.setPassword(this.urulePwd);
        return basicDataSource;
    }

    @Bean
    public BasicDataSource remoteDataSource() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName(this.remoteDriver);
        basicDataSource.setUrl(this.remoteUrl);
        basicDataSource.setUsername(this.remoteUsername);
        basicDataSource.setPassword(this.remotePwd);
        return basicDataSource;
    }

}
