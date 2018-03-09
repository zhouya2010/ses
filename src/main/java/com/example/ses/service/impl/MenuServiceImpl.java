package com.example.ses.service.impl;

import com.example.ses.domain.Menu;
import com.example.ses.mapper.MenuMapper;
import com.example.ses.service.MenuService;
import com.example.ses.service.dto.RoleMenuDto;
import com.example.ses.web.query.MenuQuery;
import com.example.ses.web.vm.MenuTreeVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public int add(Menu menu) {
        return menuMapper.insertSelective(menu);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Menu> findByRoles(List<Long> roleIds) {
        return menuMapper.selectByRole(roleIds);
    }

    @Override
    public List<Menu> findByRoleId(Long roleId) {
        return menuMapper.selectByRoleId(roleId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Menu> findList(MenuQuery menuQuery) {
        return menuMapper.selectAll(menuQuery);
    }

    @Override
    @Transactional(readOnly = true)
    public Menu findOperator(Long roleId, Long menuId) {
        return menuMapper.selectOperator(roleId, menuId);
    }


    @Override
    @Transactional(readOnly = true)
    public Menu findOne(Long id) {
        return menuMapper.selectByPrimaryKey(id);
    }

    @Override
    public int delete(Long id) {
        return menuMapper.deleteByPrimaryKey(id);
    }

    @Override
    public Menu update(Menu menu) {
        menuMapper.updateByPrimaryKey(menu);
        return menu;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuTreeVM> findAuthorizeTree(Long pid, Long roleId) {
        return menuMapper.selectMenuAuthorize(pid, roleId);
    }

    @Override
    public int updateAuthorizeTree(RoleMenuDto roleMenuDto) {
        menuMapper.deleteRoleMenusByRoleId(roleMenuDto.getRoleId());
        if (roleMenuDto.getMenus() == null || roleMenuDto.getMenus().size() == 0) {
            return 1;
        }

        return menuMapper.insertRoleMenu(roleMenuDto.getMenus());
    }
}
