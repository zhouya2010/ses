package com.example.ses;

import com.example.ses.security.MyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@EnableConfigurationProperties(MyProperties.class)
@SpringBootApplication
public class SesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SesApplication.class, args);
	}
}
