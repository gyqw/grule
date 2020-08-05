package com.bstek.urule.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource({"classpath:urule-console-context.xml"})
public class URuleApplication {

    public static void main(String[] args) {
        SpringApplication.run(URuleApplication.class, args);
    }
}
