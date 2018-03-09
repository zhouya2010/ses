package com.example.ses.security;

import com.example.ses.domain.User;
import com.example.ses.domain.enums.UserStatusEnum;
import com.example.ses.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(final String login) {

        log.debug("Authenticating {}", login);
        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        Optional<User> userFromDatabase = Optional.ofNullable(userMapper.selectWithAuthoritiesByLogin(lowercaseLogin));
        return userFromDatabase.map(user -> {
            if (UserStatusEnum.FREEZE == user.getStatus()) {
                throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
            }
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

            log.error("ROLE ==> " + "ROLE_" + user.getBelongType().name());
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + user.getBelongType().name()));

            return new org.springframework.security.core.userdetails.User(lowercaseLogin,
                    user.getPassword(),
                    grantedAuthorities);
        }).orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " +
                "database"));

    }
}
