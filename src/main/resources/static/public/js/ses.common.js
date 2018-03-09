$.ajaxSetup({
    aysnc: true, // 默认同步加载
    headers: { // 默认添加请求头
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    },
    error: function (xhr, status, errorMsg) { // 出错时默认的处理函数
    },
    complete: function(xhr,status) {
        switch (xhr.status) {
            case 200:
                break;
            case 400:
                $.iMessager.show({title: '操作提示', msg: $.parseJSON(xhr.responseText).message});
                break;
            case 401:
                $.iMessager.confirm('提示', '登录失效,点击退出', function (r) {
                    if (r) {
                        $.iMessager.progress({
                            text: '正在退出中...'
                        });
                        window.location.href = '.login.html';
                    }
                });
                break;

            case 404:
                $.iMessager.alert('404', '页面不存在', 'messager-info');
                break;

            case 500:
                $.iMessager.alert('500', '服务器内部错误', 'messager-info');
                break;

            case 403:
                $.iMessager.alert('403', '权限不足', 'messager-info');
                break;
            default:
                $.iMessager.alert('警告', '未知错误', 'messager-info');
        }
    }
});


// 获取地址栏参数
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};
