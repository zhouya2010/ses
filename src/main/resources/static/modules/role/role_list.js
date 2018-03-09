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


    $('#roleDg').iDatagrid({
        url: '/api/v1/roles',
        method: 'GET',
        columns: [[
            {field: 'uuid', title: 'UUID', checkbox: true},
            {field: 'id', title: 'ID', width: 100, hidden: true},
            {field: 'name', title: '名称', width: 100},
            {field: 'instId', title: '机构 ID', formatter: formatter, width: 100},
            {field: 'remark', title: '备注', width: 100}
        ]]
    });

    function formatter(value, row, index) {
        switch (value) {
            case '':
                return '公有角色';
            default:
                return value;
        }
    }

    $("#add").iMenubutton({
        method: 'openDialog',
        extend: '#roleDg-toolbar',
        iconCls: 'fa fa-plus',
        dialog: {
            id: 'roleAddDialog',
            height: 350,
            href: _ctx + '/modules/role/role_add.html',
            buttons: [
                {
                    text: '保存',
                    iconCls: 'fa fa-plus',
                    handler: newRole,
                    btnCls: 'topjui-btn-brown'
                },
                {
                    text: '取消',
                    iconCls: 'fa fa-close',
                    handler: function () {
                        $("#roleAddDialog").iDialog('close');
                    },
                    btnCls: 'topjui-btn-red'
                }
            ]
        }
    });


    $("#edit").iMenubutton({
        iconCls: 'fa fa-pencil',
        btnCls: 'topjui-btn-green',
        onClick: editRole
    });


    $("#delete").iMenubutton({
        iconCls: 'fa fa-trash',
        btnCls: 'topjui-btn-brown',
        onClick: deleteRole
    });

    $("#authorize").iMenubutton({
        iconCls: 'fa fa-pencil',
        btnCls: 'topjui-btn-green',
        onClick: authorize
    });

    $('#resetBtn').iMenubutton({
        btnCls: 'topjui-btn-black',
        iconCls: '',
        onClick: reset
    });

    $('#queryBtn').iMenubutton({
        iconCls: 'fa fa-search',
        btnCls: 'topjui-btn-blue',
        onClick: query
    });

    function newRole() {
        if ($('#roleAddDialog').form('validate')) {
            // var formData = $('#addRoleForm').serializeJSON();
            var formData = {
                name :$('#newName').val(),
                instId: $('#newInstId').val(),
                remark: $('#newRemark').val()
            };

            $.ajax({
                url: '/api/v1/roles',
                type: 'POST',
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
                    $("#roleAddDialog").iDialog('close').form('reset');
                    $('#roleDg').iDatagrid('reload');
                }
            }, "json");
        }
    }

    function editRole() {
        var rows = $('#roleDg').iDatagrid('getChecked');
        if (rows.length !== 1) {
            $.iMessager.alert('提示', '请选中一行！', 'messager-info');
        } else {
            location.href = '/modules/role/role_edit.html?&id=' + rows[0].id;
        }
    }

    function authorize() {
        var rows = $('#roleDg').iDatagrid('getChecked');
        if (rows.length !== 1) {
            $.iMessager.alert('提示', '请选中一行！', 'messager-info');
        } else {
            location.href = '/modules/role/role_tree.html?&id=' + rows[0].id;
        }
    }

    function deleteRole() {
        var rows = $('#roleDg').iDatagrid('getChecked');
        if (rows.length !== 1) {
            $.iMessager.alert('提示', '请选中一行！', 'messager-info');
        } else {
            $.iMessager.confirm('Confirm', '确定删除？', function (r) {
                if (r) {
                    $.ajax({
                        url: '/api/v1/roles/' + rows[0].id,
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
                            $('#roleDg').iDatagrid('reload');
                        }
                    }, "json");
                }
            });
        }
    }


    function reset() {

    }

    function query() {

    }

});


