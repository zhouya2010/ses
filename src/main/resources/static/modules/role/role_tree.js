$(function () {
    var zTreeObj;
    var roleId = $.getUrlParam("id");

    $.get("/api/v1/menus/tree/" + roleId + "/authorize", function (data) {

        data.splice(0, 0, {
            menuId: 0,
            name: '全选/反选',
            order: 0,
            checkState: 'indeterminate',
            check: {
                enable: true
            }
        });
        initTree({
            treeId: "roleTree",
            nodes: data,
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "menuId",
                        pIdKey: "pid",
                        rootPId: 0,
                        ref: "ref",
                        addable: "addable",
                        editable: "editable",
                        deletable: "deletable",
                        selectable: "selectable",
                        exportable: "exportable",
                        auditable: "auditable"
                    }
                },
                check: {
                    enable: true
                },
                view: {
                    showIcon: false,
                    addDiyDom: addDiyDom
                },
                callback: {
                    onClick: nodeOnClick
                }
            }

        });
    });


    function nodeOnClick() {
    }

    function initTree(options) {
        zTreeObj = $.fn.zTree.init($("#" + options.treeId), options.setting, options.nodes);
        zTreeObj.expandAll(true);
    }

    function getSelections() {
        return zTreeObj.getSelectedNodes();
    }

    function getCheckNode() {
        return zTreeObj.getCheckedNodes(true);
    }

    function getZtree() {
        return zTreeObj;
    }

    var IDMark_Switch = "_switch",
        IDMark_Icon = "_ico",
        IDMark_Span = "_span",
        IDMark_Input = "_input",
        IDMark_Check = "_check",
        IDMark_Edit = "_edit",
        IDMark_Remove = "_remove",
        IDMark_Ul = "_ul",
        IDMark_A = "_a";


    function addDiyDom(treeId, treeNode) {

        if (treeNode.isParent) return;
        if (treeNode['ref'] == null || treeNode['ref'] == '') return;
        var aObj = $("#" + treeNode.tId + IDMark_Span);

        var editStr = "<span>\n" +
            "                    &nbsp;&nbsp;&nbsp;\n" +
            "                    &nbsp;&nbsp;&nbsp;\n" +
            "                    &nbsp;&nbsp;&nbsp;\n";

        editStr += checkDom('addable', '新增', treeNode);
        editStr += checkDom('editable', '编辑', treeNode);
        editStr += checkDom('selectable', '详情', treeNode);
        editStr += checkDom('deletable', '删除', treeNode);
        editStr += checkDom('exportable', '导出', treeNode);
        editStr += checkDom('auditable', '审核', treeNode);
        editStr += "                </span>";
        aObj.append(editStr);
    }


    function checkDom(filed, labelName, treeNode) {
        if (treeNode[filed] !== undefined) {
            var editStr =
                "                    &nbsp;&nbsp;&nbsp;\n" +
                "                    <label> " + labelName +
                "</label>\n" +
                "                    <input type=\"checkbox\" ";

            if (treeNode[filed] == true) {
                editStr += "  checked=\"checked\" ";
            }

            editStr += "id=\"" + filed + "_" + treeNode.menuId + "\" value=\"true\">\n" +
                "\n";
            return editStr;
        }
        return '';
    }


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
        var checkList = getCheckNode();
        var data = {
            roleId: roleId,
            menus: []
        };
        var childrenNode = [];
        for (var index in checkList) {

            var id = checkList[index]['menuId'];
            if (id == 0 || id == undefined) {
                continue;
            }
            childrenNode.push({
                menuId: id,
                roleId: roleId,
                addable: $("#addable_"+id).is(':checked'),
                editable: $("#editable_"+id).is(':checked'),
                deletable: $("#deletable_"+id).is(':checked'),
                selectable: $("#selectable_"+id).is(':checked'),
                exportable: $("#exportable_"+id).is(':checked'),
                auditable: $("#auditable_"+id).is(':checked')
            });
        }
        data.menus = childrenNode;

        $.ajax({
            url: '/api/v1/menus/tree/authorize',
            type: 'PUT',
            contentType: 'application/json; charset=UTF-8',
            cache: false,
            data: JSON.stringify(data),
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


    function cancel() {
        window.history.go(-1);
    }

});


