package com.example.ses.service.impl;

import com.example.ses.domain.User;
import com.example.ses.mapper.UserMapper;
import com.example.ses.security.SecurityUtils;
import com.example.ses.service.UserService;
import com.example.ses.web.query.UserQuery;
import com.example.ses.web.vm.ManagedUserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author zy
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public User add(ManagedUserVM userVM) {
        User user = userVM.toUser();
        user.setCreatedBy(SecurityUtils.getCurrentUserLogin());
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userMapper.insertSelective(user);
        userVM.getRoles().forEach(roleId -> userMapper.insertUserRole(user.getId(), roleId));
        user.setPassword(null);
        return user;
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public User findByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    public int updateByPrimaryKey(User user) {
        return userMapper.updateByPrimaryKey(user);
    }

    @Override
    public List<User> findList(UserQuery userQuery) {
        return userMapper.selectAll(userQuery);
    }
}
