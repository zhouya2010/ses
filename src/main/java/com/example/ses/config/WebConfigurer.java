package com.example.ses.config;

import com.example.ses.security.MyProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfigurer {

    private final Logger log = LoggerFactory.getLogger(WebConfigurer.class);

    @Autowired
    private MyProperties myProperties;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = myProperties.getCors();

        if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
            log.debug("Registering CORS filter");
            source.registerCorsConfiguration("/api/**", config);
            source.registerCorsConfiguration("/v2/api-docs", config);
        }
        return new CorsFilter(source);
    }

}
