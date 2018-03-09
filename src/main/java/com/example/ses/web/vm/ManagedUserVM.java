package com.example.ses.web.vm;

import com.example.ses.domain.User;
import com.example.ses.domain.enums.OrganizationTypeEnum;
import com.example.ses.domain.enums.UserStatusEnum;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class ManagedUserVM {

    @NotNull(message = "用户名不能为空")
    private String userName;

    @NotNull(message = "手机号不能为空")
    private String telephone;

    @Email(message = "email 格式不正确")
    private String email;

    @NotNull(message = "密码不能为空")
    private String password;

    @NotNull(message = "请输入确认密码")
    private String passwordConfirm;

    @NotNull(message = "组织类别不能为空")
    private OrganizationTypeEnum belongType;

    @NotNull(message = "组织 id 不能为空")
    private Long belongId;

    private String nameCn;

    private UserStatusEnum status;

    private String nickname;

    @NotNull
    private List<Long> roles;

    public User toUser() {
        User user = new User();
        user.setUserName(userName);
        user.setTelephone(telephone);
        user.setEmail(email);
        user.setPassword(password);
        user.setBelongType(belongType);
        user.setBelongId(belongId);
        user.setNameCn(nameCn);
        user.setStatus(status);
        user.setNickname(nickname);
        return user;
    }

}
