$(function () {

    $.get("/api/v1/menus/" + $.getUrlParam("id"), function (data) {

        $("#id").val(data.id);
        $("#newName").iTextbox("setValue",data.name);
        $("#newUrl").iTextbox("setValue",data.url);
        $("#newIcon").iTextbox("setValue",data.icon);
        $("#newOrder").iTextbox("setValue",data.order);
        $("#pidDg").iCombobox("select",data.pid);
        $("#newLevel").iCombobox("select",data.level);

        if (data.addable) {
            $("#newAddable").click();
        }

        if (data.editable) {
            $("#newEditable").click();
        }

        if (data.deletable) {
            $("#newDeletable").click();
        }

        if (data.selectable) {
            $("#newSelectable").click();
        }

        if (data.exportable) {
            $("#newExportable").click();
        }

        if (data.auditable) {
            $("#newAuditable").click();
        }

        $("#loading").fadeOut();
    });

    $("#confirm").iMenubutton({
        iconCls: '',
        btnCls: 'topjui-btn-green',
        onClick: save
    });

    $("#cancel").iMenubutton({
        iconCls: '',
        btnCls: 'topjui-btn-blue',
        onClick: cancel
    });

    getMenuTree();

    function save() {
        if ($('#editMenuForm').form('validate')) {
            var formData = $("#editMenuForm").serializeJSON({checkboxUncheckedValue: "false", parseNumbers: true});

            if(formData.pid == '' || formData.pid == null) {
                formData.pid = 0;
            }

            $.ajax({
                url: '/api/v1/menus',
                type: 'PUT',
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
                    window.history.go(-1);
                }
            }, "json");
        }
    }

    function cancel() {
        window.history.go(-1);
    }
    
    function getMenuTree() {
        var values = [];
        var url = "/api/v1/menus/tree";
        values.push({
            text: '首页',
            value: 0
        });
        $.get(
            url,
            function (data) {
                $.each(data, function (i, e) {
                    values.push({
                        text: e.name,
                        value: e.id
                    });

                    var level2Menu = e.childMenu;
                    $.parser.parse();

                    if (level2Menu) {
                        $.each(level2Menu, function (i, c) {
                            values.push({
                                id: c.id,
                                text: c.name,
                                value: c.id
                            });
                        });
                    }
                });

                $('#pidDg').iCombobox({
                    valueField: 'value',
                    textField: 'text',
                    data: values
                });


            }, "json"
        );
    }
});