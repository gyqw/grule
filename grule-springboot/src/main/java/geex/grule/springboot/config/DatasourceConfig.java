package geex.grule.springboot.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author fred
 * 2019-06-26 6:49 PM
 */
@Configuration
public class DatasourceConfig {

    @Bean
    public BasicDataSource uruleDataSource() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName("com.mysql.jdbc.Driver");
        basicDataSource.setUrl("jdbc:mysql://192.168.8.232:3306/urule?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&autoReconnect=true&useSSL=false");
        basicDataSource.setUsername("root");
        basicDataSource.setPassword("123");
        return basicDataSource;
    }
}
