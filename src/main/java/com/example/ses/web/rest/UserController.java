package com.example.ses.web.rest;

import com.example.ses.domain.User;
import com.example.ses.service.RoleService;
import com.example.ses.service.UserService;
import com.example.ses.utils.ResponseUtil;
import com.example.ses.web.errors.ErrorVM;
import com.example.ses.web.query.UserQuery;
import com.example.ses.web.vm.ManagedUserVM;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {

        log.debug("REST request to get User : {}", username);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userService.findByUsername(username)));
    }


    @PostMapping("/users")
    public ResponseEntity addUser(@Valid @RequestBody ManagedUserVM userVM) {
        log.debug("REST request to add User : {}", userVM);

        if (!userVM.getPassword().equals(userVM.getPasswordConfirm())) {
            return ResponseEntity.badRequest()
                    .body(new ErrorVM("两次输入密码不一致"));
        }

        userVM.setUserName(userVM.getUserName().toLowerCase());

        return ResponseEntity.ok(userService.add(userVM));
    }


    @GetMapping("users")
    public ResponseEntity<PageInfo<User>> getUsers(@Valid UserQuery userQuery) {
        log.debug("REST request to get all User UserQuery: {}", userQuery);

        return ResponseEntity.ok(PageHelper.startPage(userQuery.getPage(), userQuery.getRows()).
                doSelectPageInfo(() -> userService.findList(userQuery)));
    }

}
