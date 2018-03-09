package com.example.ses.domain;

import com.example.ses.domain.enums.OrganizationTypeEnum;
import com.example.ses.domain.enums.UserStatusEnum;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class User {
    private Long id;

    private String userName;

    private String telephone;

    private String email;

    private String password;

    private OrganizationTypeEnum belongType;

    private Long belongId;

    private String nameCn;

    private UserStatusEnum status;

    private String nickname;

    private String createdBy;

    private String lastModifiedBy;

    private LocalDateTime createDate;

    private LocalDateTime lastModifiedDate;
}