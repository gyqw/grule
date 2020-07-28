package geex.grule.console.config;

import geex.grule.console.GRuleBasePackageClazz;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * @author fred
 * @since 2020-03-24 10:11 AM
 */
@Configuration
@ComponentScan(basePackageClasses = {GRuleBasePackageClazz.class})
@ImportResource("classpath:urule-core-context.xml")
public class GruleConsoleAutoConfiguration {
}
