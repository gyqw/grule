package com.bstek.urule.springboot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource({"classpath:urule-console-context.xml"})
public class URuleApplication implements CommandLineRunner {
    private Logger logger = LoggerFactory.getLogger(URuleApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(URuleApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
    }
}
