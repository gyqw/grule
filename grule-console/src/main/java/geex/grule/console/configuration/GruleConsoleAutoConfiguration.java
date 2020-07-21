package geex.grule.console.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * @author fred
 * 2020-03-24 10:11 AM
 */
@Configuration
@ComponentScan({"geex.grule"})
@ImportResource("classpath:urule-core-context.xml")
public class GruleConsoleAutoConfiguration {
}
