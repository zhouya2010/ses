package com.example.ses.web.vm;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * @author zy
 */
@Data
@AllArgsConstructor
public class CommonGridData<T> {

    private Long total;

    private List<T> rows;

}
