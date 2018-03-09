package com.example.ses.web.query;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

public class BasePageQuery {

    @NotNull(message = "page 不能为空")
    private Integer page;

    @NotNull(message = "rows 不能为空")
    @Max(value = 200, message = "最大读取 200 条数据")
    private Integer rows;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }
}
