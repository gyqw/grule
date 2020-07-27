package geex.grule.springboot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource({"classpath:urule-console-context.xml"})
public class GRuleApplication {
    private final Logger logger = LoggerFactory.getLogger(GRuleApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(GRuleApplication.class, args);
    }

}
