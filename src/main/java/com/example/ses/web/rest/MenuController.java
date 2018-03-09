package com.example.ses.web.rest;

import com.example.ses.domain.Menu;
import com.example.ses.domain.User;
import com.example.ses.security.SecurityUtils;
import com.example.ses.service.MenuService;
import com.example.ses.service.RoleService;
import com.example.ses.service.UserService;
import com.example.ses.service.dto.RoleMenuDto;
import com.example.ses.web.errors.CustomParameterizedException;
import com.example.ses.web.query.MenuQuery;
import com.example.ses.web.vm.MenuTreeVM;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("api/v1")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;


    @GetMapping("menus")
    public ResponseEntity<PageInfo<Menu>> getMenus(@Valid MenuQuery menuQuery) {

        log.debug("Request to get menus menuQuery:{}", menuQuery);

        return ResponseEntity.ok(PageHelper.startPage(menuQuery.getPage(), menuQuery.getRows()).
                doSelectPageInfo(() -> menuService.findList(menuQuery)));
    }

    @GetMapping("menus/{id}")
    public ResponseEntity<Menu> getMenu(@PathVariable("id") Long id) {
        log.debug("Request to get menus id:{}", id);
        return ResponseEntity.ok(menuService.findOne(id));
    }


    @PostMapping("menus")
    public ResponseEntity<Menu> createMenu(@Valid @RequestBody Menu menu) {
        menuService.add(menu);
        return ResponseEntity.ok(menu);
    }

    @GetMapping("menus/tree")
    public ResponseEntity<List<Menu>> getMenuTree() {
        log.debug("Request to get menus Tree username : {}", SecurityUtils.getCurrentUserLogin());
        Long roleId = getUserRoleId();
        List<Menu> menus = menuService.findByRoleId(roleId);
        return ResponseEntity.ok(buildMenuTree(menus));
    }


    @DeleteMapping("menus/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable("id") Long id) {
        log.debug("Request to delete menus id:{}", id);
        menuService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("menus/{id}/operator")
    public ResponseEntity<Menu> getOperator(@PathVariable("id") Long id) {
        log.debug("Request to get menu operator id : {}", id);
        Long roleId = getUserRoleId();
        return ResponseEntity.ok(menuService.findOperator(roleId, id));
    }


    @PutMapping("menus")
    public ResponseEntity<Menu> updateMenus(@Valid @RequestBody Menu menu) {

        log.debug("Request to update menus :{}", menu);

        if (menu.getId() == null) {
            throw new CustomParameterizedException("id 不能为空", "id");
        }

        return ResponseEntity.ok(menuService.update(menu));
    }

    @GetMapping("menus/tree/{id}/authorize")
    public ResponseEntity<List<MenuTreeVM>> getMenuTreeAuthorize(@PathVariable("id") Long id) {
        log.debug("Request to get menus Tree authorize username : {}", SecurityUtils.getCurrentUserLogin());
        Long roleId = getUserRoleId();
        return ResponseEntity.ok(menuService.findAuthorizeTree(roleId, id));
    }

    @PutMapping("menus/tree/authorize")
    public ResponseEntity<Void> updateAuthorize(@Valid @RequestBody RoleMenuDto roleMenuDto) {
        log.error("Request to update menus Tree authorize  : {}", roleMenuDto);
//        Long roleId = getUserRoleId();
        menuService.updateAuthorizeTree(roleMenuDto);
        return ResponseEntity.ok().build();
    }

    private Long getUserRoleId() {
        User user = userService.findByUsername(SecurityUtils.getCurrentUserLogin());
        return roleService.findIdByUser(user.getId());
    }

    private List<Menu> buildMenuTree(List<Menu> menus) {
        List<Menu> trees = new ArrayList<>();
        for (Menu menu : menus) {
            if (menu.getPid() == 0) {
                trees.add(findChildren(menu, menus));
            }
        }
        return trees;
    }

    private Menu findChildren(Menu parentMenu, List<Menu> children) {
        for (Menu child : children) {
            if (child.getPid().equals(parentMenu.getId())) {
                if (parentMenu.getChildMenu() == null) {
                    parentMenu.setChildMenu(new ArrayList<>());
                }
                parentMenu.getChildMenu().add(findChildren(child, children));
            }
        }
        //根据 order 排序
        if (parentMenu.getChildMenu() != null) {
            parentMenu.setChildMenu(parentMenu.getChildMenu().stream().sorted(Comparator.comparingInt(Menu::getOrder)).collect(Collectors.toList()));
        }
        return parentMenu;
    }

}
