package com.example.ses.web.vm;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class MenuTreeVM {


    private Long id;

    @NotNull
    private Long menuId;

    @NotNull
    private Long roleId;

    private String name;

    private Long pid;

    private Boolean checked;

    private String ref;

    private String method;

    private String icon;

    private Integer order;

    private Integer level;

    @NotNull
    private Boolean addable;

    @NotNull
    private Boolean editable;

    @NotNull
    private Boolean deletable;

    @NotNull
    private Boolean selectable;

    @NotNull
    private Boolean exportable;

    @NotNull
    private Boolean auditable;

}
