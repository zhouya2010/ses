package com.example.ses.service;

import com.example.ses.domain.Role;
import com.example.ses.web.query.RoleQuery;

import java.util.List;

public interface RoleService {

    Integer add(Role role);

    Role findByUser(Long userId);

    Long findIdByUser(Long userId);

    Integer update(Role role);

    List<Role> findList(RoleQuery roleQuery);

    Integer delete(Long id);

    Role findById(Long id);
}
