package com.example.ses.service.impl;

import com.example.ses.domain.Role;
import com.example.ses.mapper.MenuMapper;
import com.example.ses.mapper.RoleMapper;
import com.example.ses.service.RoleService;
import com.example.ses.web.query.RoleQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public Integer add(Role role) {
        return roleMapper.insertSelective(role);
    }

    @Override
    @Transactional(readOnly = true)
    public Role findByUser(Long userId) {
        return roleMapper.selectByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Long findIdByUser(Long userId) {
        return findByUser(userId).getId();
    }

    @Override
    public Integer update(Role role) {
        return roleMapper.updateByPrimaryKeySelective(role);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> findList(RoleQuery roleQuery) {
        return roleMapper.selectAll(roleQuery);
    }

    @Override
    public Integer delete(Long id) {
        menuMapper.deleteRoleMenusByRoleId(id);
        return roleMapper.deleteByPrimaryKey(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Role findById(Long id) {
        return roleMapper.selectByPrimaryKey(id);
    }
}
