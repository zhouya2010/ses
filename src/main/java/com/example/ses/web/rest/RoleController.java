package com.example.ses.web.rest;

import com.example.ses.domain.Role;
import com.example.ses.service.RoleService;
import com.example.ses.service.UserService;
import com.example.ses.web.query.RoleQuery;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("api/v1")
public class RoleController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/roles")
    public ResponseEntity<PageInfo<Role>> getRoles(@Valid RoleQuery roleQuery) {
        return ResponseEntity.ok(PageHelper.startPage(roleQuery.getPage(), roleQuery.getRows()).
                doSelectPageInfo(() -> roleService.findList(roleQuery)));
    }

//    @GetMapping("/roles/{username}")
//    public ResponseEntity<List<Role>> getUserRoles(@PathVariable("username") String username) {
//
//        log.debug("REST request to getUserRoles User : {}", username);
//        Optional<User> user = Optional.ofNullable(userService.findByUsername(username));
//        if (!user.isPresent()) {
//            return ResponseEntity.badRequest()
//                    .headers(HeaderUtil.createAlert("用户不存在", "username"))
//                    .body(null);
//        }
//
//        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(roleService.findByUser(user.get().getId())));
//    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<Role> getRole(@PathVariable("id") Long id) {
        return ResponseEntity.ok(roleService.findById(id));
    }

    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role) {
        log.debug("Request to create role :{}", role);

        roleService.add(role);
        return ResponseEntity.ok(role);
    }

    @PutMapping("/roles")
    public ResponseEntity<Role> updateRole(@Valid @RequestBody Role role) {
        log.debug("Request to update role :{}", role);

        roleService.update(role);
        return ResponseEntity.ok(role);
    }

    @DeleteMapping("/roles/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
        log.debug("Request to delete role id:{}", id);
        roleService.delete(id);
        return ResponseEntity.ok().build();
    }
}
