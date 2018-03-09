/**
 * 配置文件说明
 * @type {string}
 * topJUI.language: 消息提示框的中文提示，可根据情况调整
 *
 */

var myConfig = {
    config: {
        pkName: 'uuid', //数据表主键名
        singleQuotesParam: true, //是否对批量提交表格选中记录的参数值使用单引号，默认为false，true:'123','456'，false:123,456
        aloneUse: false,
        datagrid: {
            size: 'rows', //提交到后台的每页显示多少条记录
            page: 'page', //提交到后台的显示第几页的数据
            rows: 'list', //后台返回的数据行对象参数名
            total: 'total' //后台返回的总记录数参数名
        }
    },
    language: {
        message: {
            title: {
                operationTips: "操作提示",
                confirmTips: "确认提示"
            },
            msg: {
                success: "操作成功",
                failed: "操作失败",
                error: "未知错误",
                checkSelfGrid: "请先勾选中要操作的数据前的复选框",
                selectSelfGrid: "请先选中要操作的数据",
                selectParentGrid: "请先选中主表中要操作的一条数据",
                permissionDenied: "对不起，你没有操作权限",
                confirmDelete: "你确定要删除所选的数据吗？",
                confirmMsg: "确定要执行该操作吗？"
            }
        }
    },
    l: '09a2e61373295e663a0edf8cd1511c3a0b9d7b25c96a88d816f8933332e280cd76d157d0ea4691a8b54d2b611eb6fe27ead4295ccd36ee2f'
};