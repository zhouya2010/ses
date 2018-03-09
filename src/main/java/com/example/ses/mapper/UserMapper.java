package com.example.ses.mapper;

import com.example.ses.domain.User;
import com.example.ses.web.query.UserQuery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User selectByUsername(String username);

    int insertUserRole(@Param("userId") Long userId, @Param("roleId") Long roleId);

    User selectWithAuthoritiesByLogin(String lowercaseLogin);

    List<User> selectAll(UserQuery userQuery);
}