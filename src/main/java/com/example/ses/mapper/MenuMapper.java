package com.example.ses.mapper;

import com.example.ses.domain.Menu;
import com.example.ses.web.query.MenuQuery;
import com.example.ses.web.vm.MenuTreeVM;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);

    List<Menu> selectByRole(List<Long> roleIds);

    List<Menu> selectAll(MenuQuery menuQuery);

    Menu selectOperator(@Param("roleId") Long roleId, @Param("menuId") Long menuId);

    /**
     * todo sql 待优化
     */
    List<MenuTreeVM> selectMenuAuthorize(@Param("pid") Long pid, @Param("roleId") Long roleId);

    List<Menu> selectByRoleId(Long roleId);

    int deleteRoleMenusByRoleId(Long roleId);

    int insertRoleMenu(List<MenuTreeVM> menus);
}