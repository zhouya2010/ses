package com.example.ses.mapper;

import com.example.ses.domain.Role;
import com.example.ses.web.query.RoleQuery;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

    Role selectByUserId(Long userId);

    List<Role> selectAll(RoleQuery roleQuery);
}