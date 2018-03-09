$(function () {

    $.get("/api/v1/menus/" + $.getUrlParam("mi") + "/operator", function (data) {

        if (!data.editable) {
            $("#edit").hide();
        }

        if (!data.addable) {
            $("#add").hide();
        }

        if (!data.deletable) {
            $("#delete").hide();
        }

        $("#loading").fadeOut();
    });


    $('#menuDg').iDatagrid({
        url: '/api/v1/menus',
        method: 'GET',
        columns: [[
            {field: 'uuid', title: 'UUID', checkbox: true},
            {field: 'id', title: 'ID', width: 100, hidden: true},
            {field: 'name', title: '名称', width: 100},
            {field: 'url', title: 'URL', width: 200},
            {field: 'method', title: '方法', width: 100},
            {field: 'pid', title: '父级菜单', width: 100},
            {field: 'icon', title: '图标', width: 100},
            {field: 'addable', title: '新增', width: 100},
            {field: 'editable', title: '编辑', width: 100},
            {field: 'deletable', title: '删除', width: 100},
            {field: 'selectable', title: '详情', width: 100},
            {field: 'exportable', title: '导出', width: 100},
            {field: 'auditable', title: '审核', width: 100}
        ]]
    });


    $("#add").iMenubutton({
        method: 'openDialog',
        extend: '#menuDg-toolbar',
        iconCls: 'fa fa-plus',
        dialog: {
            id: 'menuAddDialog',
            height: 350,
            href: _ctx + '/modules/menu/menu_add.html',
            buttons: [
                {
                    text: '保存',
                    url: '/api/v1/menus',
                    iconCls: 'fa fa-plus',
                    handler: newMenu,
                    btnCls: 'topjui-btn-brown'
                },
                {
                    text: '取消',
                    iconCls: 'fa fa-close',
                    handler: function () {
                        $("#menuAddDialog").iDialog('close');
                    },
                    btnCls: 'topjui-btn-red'
                }
            ]
        }
    });


    $("#edit").iMenubutton({
        iconCls: 'fa fa-pencil',
        btnCls: 'topjui-btn-green',
        onClick: editMenu
    });


    $("#delete").iMenubutton({
        iconCls: 'fa fa-trash',
        btnCls: 'topjui-btn-brown',
        onClick: deleteMenu
    });


    $('#resetBtn').iMenubutton({
        btnCls: 'topjui-btn-blue',
        onClick: reset
    });

    $('#queryBtn').iMenubutton({
        iconCls: 'fa fa-search',
        btnCls: 'topjui-btn-blue',
        onClick: query
    });


    function editMenu() {
        var rows = $('#menuDg').iDatagrid('getChecked');
        if (rows.length !== 1) {
            $.iMessager.alert('提示', '请选中一行！', 'messager-info');
        } else {
            location.href = '/modules/menu/menu_edit.html?&id=' + rows[0].id;
        }
    }

    function deleteMenu() {

        var rows = $('#menuDg').iDatagrid('getChecked');
        if (rows.length !== 1) {
            $.iMessager.alert('提示', '请选中一行！', 'messager-info');
        } else {
            $.iMessager.confirm('Confirm', '确定删除？', function (r) {
                if (r) {
                    $.ajax({
                        url: '/api/v1/menus/' + rows[0].id,
                        type: 'delete',
                        contentType: 'application/json; charset=UTF-8',
                        cache: false,
                        beforeSend: function () {
                            $.iMessager.progress({
                                text: '正在操作...'
                            });
                        },
                        success: function (data, response, status) {
                            $.iMessager.progress('close');
                            $.iMessager.show({
                                title: '提示',
                                msg: '删除成功'
                            });
                            $('#menuDg').iDatagrid('reload');
                        }
                    }, "json");
                }
            });
        }

    };

    function query() {
        // 提交参数查询表格数据
        $('#menuDg').iDatagrid('reload', getQueryParam());
    }


    function getQueryParam() {
        var queryParam = {};
        if ($('#name').iTextbox('getValue') !== "") {
            queryParam.name = $('#name').iTextbox('getValue');
        }
        return queryParam;
    }

    function reset() {
        $("#name").iTextbox('setValue', "");
    }


    function newMenu() {
        if ($('#menuAddDialog').form('validate')) {
            var formData = $("#addMenuForm").serializeJSON();

            $.ajax({
                url: '/api/v1/menus',
                type: 'post',
                contentType: 'application/json; charset=UTF-8',
                cache: false,
                data: JSON.stringify(formData),
                beforeSend: function () {
                    $.iMessager.progress({
                        text: '正在操作...'
                    });
                },
                success: function (data, response, status) {
                    $.iMessager.progress('close');
                    $.iMessager.show({
                        title: '提示',
                        msg: '操作成功'
                    });
                    $("#menuAddDialog").iDialog('close').form('reset');
                    $('#menuDg').iDatagrid('reload');
                }
            }, "json");
        }

    }
});

