package com.example.ses.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Implementation of AuditorAware based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    public static final String SYSTEM_ACCOUNT = "system";


    @Override
    public String getCurrentAuditor() {
        String userName = SecurityUtils.getCurrentUserLogin();
        return userName != null ? userName : SYSTEM_ACCOUNT;
    }
}
