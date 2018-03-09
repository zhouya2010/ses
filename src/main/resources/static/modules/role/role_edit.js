$(function () {

    $.get("/api/v1/roles/" + $.getUrlParam("id"), function (data) {

        $("#id").val(data.id);
        $("#name").iTextbox("setValue",data.name);
        $("#remark").iTextbox("setValue",data.remark);
        $("#instId").iCombobox("select",data.instId);

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


    function save() {
        if ($('#editRoleForm').form('validate')) {
            var formData = $("#editRoleForm").serializeJSON();

            $.ajax({
                url: '/api/v1/roles',
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

});