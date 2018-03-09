package com.example.ses.domain;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class Menu {
    private Long id;

    @NotNull
    private String name;

    private String url;

    private String method;

    private String icon;

    @NotNull
    private Long pid;

    @NotNull
    @Max(125)
    private Integer order;

    @NotNull
    @Min(1)
    @Max(3)
    private Integer level;

    /**
     * 是否可新增
     */
    private Boolean addable;

    /**
     * 是否可编辑
     */
    private Boolean editable;

    /**
     * 是否可删除
     */
    private Boolean deletable;

    /**
     * 是否可查找
     */
    private Boolean selectable;

    /**
     * 是否可导出
     */
    private Boolean exportable;

    /**
     * 是否可审核
     */
    private Boolean auditable;

    /**
     * 子菜单表
     */
    private List<Menu> childMenu;

}