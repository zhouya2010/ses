package com.example.ses.service;


import com.example.ses.domain.Menu;
import com.example.ses.service.dto.RoleMenuDto;
import com.example.ses.web.query.MenuQuery;
import com.example.ses.web.vm.MenuTreeVM;

import java.util.List;

public interface MenuService {

    int add(Menu menu);

    List<Menu> findByRoles(List<Long> roleIds);

    List<Menu> findByRoleId(Long roleId);

    List<Menu> findList(MenuQuery menuQuery);

    Menu findOperator(Long roleId, Long menuId);

    Menu findOne(Long id);

    int delete(Long id);

    Menu update(Menu menu);

    List<MenuTreeVM> findAuthorizeTree(Long pid, Long roleId);

    int updateAuthorizeTree(RoleMenuDto roleMenuDto);
}
