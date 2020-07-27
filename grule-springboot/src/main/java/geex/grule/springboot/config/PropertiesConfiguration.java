package geex.grule.springboot.config;

import java.util.Properties;

import org.springframework.beans.factory.InitializingBean;

import com.bstek.urule.URulePropertyPlaceholderConfigurer;

//@Component
public class PropertiesConfiguration extends URulePropertyPlaceholderConfigurer implements InitializingBean {
    @Override
    public void afterPropertiesSet() throws Exception {
        Properties props = new Properties();
        props.setProperty("urule.repository.xml", "classpath:mysql.xml");
        setProperties(props);
    }
}
