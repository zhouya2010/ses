package com.example.ses.web.query;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class MenuQuery extends BasePageQuery {

    private String name;

    @Max(value = 3, message = "最大三级")
    @Min(value = 1, message = "最小一级")
    private Integer level;

    private Long pid;

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "MenuQuery{" +
                "name='" + name + '\'' +
                "level='" + level + '\'' +
                "page='" + getPage() + '\'' +
                "rows='" + getRows() + '\'' +
                '}';
    }
}
