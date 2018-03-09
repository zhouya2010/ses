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

    $('#userDg').iDatagrid({
        url: '/api/v1/users',
        method: 'GET',
        columns: [[
            {field: 'uuid', title: 'UUID', checkbox: true},
            {field: 'id', title: 'ID', width: 100, hidden: true},
            {field: 'userName', title: '用户名', width: 100},
            {field: 'telephone', title: '手机号', width: 100},
            {field: 'email', title: '邮箱', width: 100},
            {field: 'belongType', title: '所属类型', width: 100},
            {field: 'belongId', title: '所属id', width: 100},
            {field: 'status', title: '用户状态', width: 100},
            {field: 'createdBy', title: '创建人', width: 100},
            {field: 'createDate', title: '创建时间', width: 150}
        ]]
    });

    $("#add").iMenubutton({
        method: 'openDialog',
        extend: '#userDg-toolbar',
        iconCls: 'fa fa-plus',
        dialog: {
            id: 'addDialog',
            height: 350,
            href: _ctx + '/modules/menu/menu_add.html',
            buttons: [
                {
                    text: '保存',
                    url: '/api/v1/menus',
                    iconCls: 'fa fa-plus',
                    handler: add,
                    btnCls: 'topjui-btn-brown'
                },
                {
                    text: '取消',
                    iconCls: 'fa fa-close',
                    handler: function () {
                        $("#addDialog").iDialog('close');
                    },
                    btnCls: 'topjui-btn-red'
                }
            ]
        }
    });


    $("#edit").iMenubutton({
        iconCls: 'fa fa-pencil',
        btnCls: 'topjui-btn-green',
        onClick: editRow
    });


    $("#delete").iMenubutton({
        iconCls: 'fa fa-trash',
        btnCls: 'topjui-btn-brown',
        onClick: deleteRow
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

    function add() {

    }

    function editRow() {

    }

    function deleteRow() {

    }

    function query() {

    }

    function reset() {

    }



});


