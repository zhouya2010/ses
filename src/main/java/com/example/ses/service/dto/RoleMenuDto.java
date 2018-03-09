package com.example.ses.service.dto;

import com.example.ses.web.vm.MenuTreeVM;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class RoleMenuDto {

    @NotNull
    private Long roleId;

    List<MenuTreeVM> menus;

}
