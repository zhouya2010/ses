package com.example.ses.domain;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Role {
    private Long id;

    @NotNull(message = "角色名称不能为空")
    private String name;

    @NotNull(message = "服务商 ID 不能为空")
    private String instId;

    private String remark;
}