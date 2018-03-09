package com.example.ses.service;

import com.example.ses.domain.User;
import com.example.ses.web.query.UserQuery;
import com.example.ses.web.vm.ManagedUserVM;

import java.util.List;

/**
 * @author zy
 */
public interface UserService {


    /**
     * 添加用户
     *
     * @param userVM
     * @return User
     */
    User add(ManagedUserVM userVM);


    /**
     * 根据 ID 查找用户
     *
     * @param id
     * @return int
     */
    User findById(Long id);

    /**
     * 根据 ID 查找用户
     *
     * @param username
     * @return int
     */
    User findByUsername(String username);


    /**
     * 更新用户
     *
     * @param user
     * @return int
     */
    int updateByPrimaryKey(User user);

    /**
     * 获取用户列表
     *
     * @param userQuery
     * @return int
     */
    List<User> findList(UserQuery userQuery);
}
