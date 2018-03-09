// 首页加载完后，取消加载中状态
$(window).load(function () {
    $("#loading").fadeOut();
});
var isFullScreen = false;

var App = function () {
    var setFullScreen = function () {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
        else {
            App.alert({message: "该浏览器不支持全屏！", type: "danger"});
        }
    };

    //退出全屏 判断浏览器种类
    var exitFullScreen = function () {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen ||    //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    };

    return {
        init: function () {

        },
        handleFullScreen: function () {
            if (isFullScreen) {
                exitFullScreen();
                isFullScreen = false;
            } else {
                setFullScreen();
                isFullScreen = true;
            }
        }
    };
};

$(function () {
    //获取用户名
    $("#user-name").html(sessionStorage.getItem("username"));
    $("#bottomUser").html('当前用户：' + sessionStorage.getItem("username"));

    $(".collapseMenu").on("click", function () {
        var p = $("#index_layout").iLayout("panel", "west")[0].clientWidth;
        if (p > 0) {
            $('#index_layout').iLayout('collapse', 'west');
            $(this).children('span').removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
        } else {
            $('#index_layout').iLayout('expand', 'west');
            $(this).children('span').removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
        }
    });

    // 首页tabs选项卡
    var index_tabs = $('#index_tabs').iTabs({
        fit: true,
        tools: [{
            iconCls: 'fa fa-home',
            handler: function () {
                $('#index_tabs').iTabs('select', 0);
            }
        }, {
            iconCls: 'fa fa-refresh',
            handler: function () {
                var refresh_tab = $('#index_tabs').iTabs('getSelected');
                var refresh_iframe = refresh_tab.find('iframe')[0];
                refresh_iframe.contentWindow.location.href = refresh_iframe.src;
                //$('#index_tabs').trigger(TOPJUI.eventType.initUI.base);

                //var index = $('#index_tabs').iTabs('getTabIndex', $('#index_tabs').iTabs('getSelected'));
                //console.log(index);
                //$('#index_tabs').iTabs('getTab', index).iPanel('refresh');
            }
        }, {
            iconCls: 'fa fa-close',
            handler: function () {
                var index = $('#index_tabs').iTabs('getTabIndex', $('#index_tabs').iTabs('getSelected'));
                var tab = $('#index_tabs').iTabs('getTab', index);
                if (tab.iPanel('options').closable) {
                    $('#index_tabs').iTabs('close', index);
                }
            }
        }, {
            iconCls: 'fa fa-arrows-alt',
            handler: function () {
                App().handleFullScreen();
            }
        }],
        //监听右键事件，创建右键菜单
        onContextMenu: function (e, title, index) {
            e.preventDefault();
            if (index >= 0) {
                $('#mm').iMenu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });

    //tab右键菜单
    $("#mm").iMenu({
        onClick: function (item) {
            tabMenuOprate(this, item.name);
        }
    });

    // 初始化accordion
    $("#RightAccordion").iAccordion({
        fit: true,
        border: false
    });

    // 绑定横向导航菜单点击事件
    $(".systemName").on("click", function (e) {
        $(".systemName").removeClass("selected");
        $(this).addClass("selected");
    });

    // 主页打开初始化时显示第一个系统的菜单
    $('.systemName').eq('0').trigger('click');

    generateMenuTree();


    $("#setThemes").click(function () {
        $("#themeStyle").dialog({
            title: '设置主题风格',
        }).dialog('open');
    });

    // 保存主题
    $(".topjuiTheme").on("click", function () {
        var theme = $('input[name="themes"]:checked').val();
        var menu = $('input[name="menustyle"]:checked').val();
        var topmenu = $('input[name="topmenu"]').is(':checked');
        $.post("/json/response/success.json", {
            theme: theme,
            menu: menu,
            topmenu: topmenu
        }, function (data) {
            changeTheme(theme);
            //window.location.reload();
        }, "json");
    });


    // 修改密码窗口
    $('#pwdDialog').iDialog({
        buttons: [{
            text: '确定',
            iconCls: 'fa fa-save',
            btnCls: 'topjui-btn-green',
            handler: function () {
                if ($('#pwdDialog').form('validate')) {
                    if ($("#password").val().length < 6) {
                        $.iMessager.alert('警告', '密码长度不能小于6位', 'messager-warning');
                    } else {
                        var formData = $("#pwdDialog").serialize();
                        $.ajax({
                            url: './json/response/success.json',
                            type: 'post',
                            cache: false,
                            data: formData,
                            beforeSend: function () {
                                $.iMessager.progress({
                                    text: '正在操作...'
                                });
                            },
                            success: function (data, response, status) {
                                $.iMessager.progress('close');
                                if (data.statusCode == 200) {
                                    $.iMessager.show({
                                        title: '提示',
                                        msg: '操作成功'
                                    });
                                    $("#pwdDialog").iDialog('close').form('reset');

                                } else {
                                    $.iMessager.alert('操作失败！', '未知错误或没有任何修改，请重试！', 'messager-error');
                                }
                            }
                        });
                    }
                }
            }
        }],
        onOpen: function () {
            $(this).panel('refresh');
        }
    });
    
});

// Tab菜单操作
function tabMenuOprate(menu, type) {
    var allTabs = $('#index_tabs').iTabs('tabs');
    var allTabtitle = [];
    $.each(allTabs, function (i, n) {
        var opt = $(n).iPanel('options');
        if (opt.closable)
            allTabtitle.push(opt.title);
    });
    var curTabTitle = $(menu).data("tabTitle");
    var curTabIndex = $('#index_tabs').iTabs("getTabIndex", $('#index_tabs').iTabs("getTab", curTabTitle));
    switch (type) {
        case "1"://关闭当前
            if (curTabIndex > 0) {
                $('#index_tabs').iTabs("close", curTabTitle);
                return false;
                break;
            } else {
                $.iMessager.show({
                    title: '操作提示',
                    msg: '首页不允许关闭！'
                });
                break;
            }
        case "2"://全部关闭
            for (var i = 0; i < allTabtitle.length; i++) {
                $('#index_tabs').iTabs('close', allTabtitle[i]);
            }
            break;
        case "3"://除此之外全部关闭
            for (var i = 0; i < allTabtitle.length; i++) {
                if (curTabTitle != allTabtitle[i])
                    $('#index_tabs').iTabs('close', allTabtitle[i]);
            }
            $('#index_tabs').iTabs('select', curTabTitle);
            break;
        case "4"://当前侧面右边
            for (var i = curTabIndex; i < allTabtitle.length; i++) {
                $('#index_tabs').iTabs('close', allTabtitle[i]);
            }
            $('#index_tabs').iTabs('select', curTabTitle);
            break;
        case "5": //当前侧面左边
            for (var i = 0; i < curTabIndex - 1; i++) {
                $('#index_tabs').iTabs('close', allTabtitle[i]);
            }
            $('#index_tabs').iTabs('select', curTabTitle);
            break;
        case "6": //刷新
            var refresh_tab = $('#index_tabs').iTabs('getSelected');
            var refresh_iframe = refresh_tab.find('iframe')[0];
            refresh_iframe.contentWindow.location.href = refresh_iframe.src;
            break;
        case "7": //在新窗口打开
            var refresh_tab = $('#index_tabs').iTabs('getSelected');
            var refresh_iframe = refresh_tab.find('iframe')[0];
            window.open(refresh_iframe.src);
            break;
    }

}

//选项卡右键菜单
function findTabElement(target) {
    var $ele = $(target);
    if (!$ele.is("a")) {
        $ele = $ele.parents("a.menu_tab");
    }
    return $ele;
}

//保存页面id的field
var pageIdField = "data-pageId";

function getPageId(element) {
    if (element instanceof jQuery) {
        return element.attr(pageIdField);
    } else {
        return $(element).attr(pageIdField);
    }
}

function findTabTitle(pageId) {
    var $ele = null;
    $(".page-tabs-content").find("a.menu_tab").each(function () {
        var $a = $(this);
        if ($a.attr(pageIdField) == pageId) {
            $ele = $a;
            return false;//退出循环
        }
    });
    return $ele;
}

function getTabUrlById(pageId) {
    var $iframe = findIframeById(pageId);
    return $iframe[0].contentWindow.location.href;
}

function getTabUrl(element) {
    var pageId = getPageId(element);
    getTabUrlById(pageId);
}

function findTabPanel(pageId) {
    var $ele = null;
    $("#index_tabs").find("div.tab-pane").each(function () {
        var $div = $(this);
        if ($div.attr(pageIdField) == pageId) {
            $ele = $div;
            return false;//退出循环
        }
    });
    return $ele;
}

function findIframeById(pageId) {
    return findTabPanel(pageId).children("iframe");
}

function getActivePageId() {
    var $a = $('.page-tabs-content').find('.active');
    return getPageId($a);
}

//激活Tab,通过id
function activeTabByPageId(pageId) {
    $(".menu_tab").removeClass("active");
    $("#index_tabs").find(".active").removeClass("active");
    //激活TAB
    var $title = findTabTitle(pageId).addClass('active');
    findTabPanel(pageId).addClass("active");
    // scrollToTab($('.menu_tab.active'));
    scrollToTab($title[0]);
}

/**
 * 更换页面风格
 * @param topjuiThemeName
 */
function changeTheme(themeName) {/* 更换主题 */
    var $dynamicTheme = $('#dynamicTheme');
    var themeHref = $dynamicTheme.attr('href');
    var themeHrefNew = themeHref.substring(0, themeHref.indexOf('themes')) + 'themes/default/topjui.' + themeName + '.css';
    // 更换主页面风格
    $dynamicTheme.attr('href', themeHrefNew);

    // 更换iframe页面风格
    var $iframe = $('iframe');
    if ($iframe.length > 0) {
        for (var i = 1; i < $iframe.length; i++) {
            var ifr = $iframe[i];
            var $iframeDynamicTheme = $(ifr).contents().find('#dynamicTheme');
            var iframeThemeHref = $iframeDynamicTheme.attr('href');
            var iframeThemeHrefNew = iframeThemeHref.substring(0, iframeThemeHref.indexOf('themes')) + 'themes/default/topjui.' + themeName + '.css';
            $iframeDynamicTheme.attr('href', iframeThemeHrefNew);
        }
    }

    $.cookie('topjuiThemeName', themeName, {
        expires: 7,
        path: '/'
    });
};
if ($.cookie('topjuiThemeName')) {
    changeTheme($.cookie('topjuiThemeName'));
}

// 退出系统
function logout() {
    $.iMessager.confirm('提示', '确定要退出吗?', function (r) {
        if (r) {
            $.iMessager.progress({
                text: '正在退出中...'
            });
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            window.location.href = './login.html' + location.search;
        }
    });
}

// 生成左侧导航菜单
function generateMenuTree() {
    $(".panel-header .panel-title:first").html("服务商系统");
    var allPanel = $("#RightAccordion").iAccordion('panels');
    var size = allPanel.length;
    if (size > 0) {
        for (i = 0; i < size; i++) {
            var index = $("#RightAccordion").iAccordion('getPanelIndex', allPanel[i]);
            $("#RightAccordion").iAccordion('remove', 0);
        }
    }

    var url = "/api/v1/menus/tree";
    $.get(
        url,
        function (data) {
            if (data == "0") {
                window.location = "/";
            }
            // 循环创建手风琴的项
            $.each(data, function (i, e) {
                var pid = e.pid;
                $('#RightAccordion').iAccordion('add', {
                    fit: false,
                    title: e.name,
                    content: "<ul id='tree" + e.id + "' ></ul>",
                    border: false,
                    selected: false,
                    iconCls: e.icon
                });
                var level2Menu = e.childMenu;
                $.parser.parse();

                if(level2Menu) {
                    var treeDatas = [];
                    $.each(level2Menu, function (i, c) {
                        var treeData = {};
                        treeData.text = c.name;
                        treeData.state = 'open';
                        treeData.iconCls = c.icon;
                        treeData.url = c.url == '' ? c.url : c.url + '?&mi=' + c.id;
                        //三级菜单
                        if(c.childMenu) {
                            treeData.state = 'close';
                            treeData.children = [];
                            $.each(c.childMenu, function (i, t) {
                                var threeData = {};
                                threeData.text = t.name;
                                threeData.state = 'open';
                                threeData.iconCls = t.icon;
                                threeData.url = t.url == '' ? t.url : t.url + '?&mi=' + t.id;
                                treeData.children.push(threeData);
                            });
                        }

                        treeDatas.push(treeData);

                        $("#tree" + e.id).tree({
                            data: treeDatas,
                            lines: false,
                            animate: true,
                            // onBeforeExpand: function (node, param) {
                            //     console.log('onBeforeExpand ');
                            //     $("#tree" + e.id).tree('options').url = c.url;
                            // },
                            onClick: function (node) {
                                if (node.url) {
                                    /*if(typeof node.attributes != "object") {
                                     node.attributes = $.parseJSON(node.attributes);
                                     }*/
                                    addTab(node);
                                } else {
                                    if (node.state == "closed") {
                                        $("#tree" + e.id).tree('expand', node.target);
                                    } else if (node.state == 'open') {
                                        $("#tree" + e.id).tree('collapse', node.target);
                                    }
                                }
                            }
                        });
                    });
                }
            });
        }, "json"
    );
}

//打开Tab窗口
function addTab(params) {
    var iframe = '<iframe src="' + params.url + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
    var t = $('#index_tabs');
    var $selectedTab = t.iTabs('getSelected');
    var selectedTabOpts = $selectedTab.iPanel('options');
    var opts = {
        id: getRandomNumByDef(),
        refererTab: {},
        title: params.text,
        closable: typeof(params.closable) != "undefined" ? params.closable : true,
        iconCls: params.iconCls ? params.iconCls : 'fa fa-file-text-o',
        content: iframe,
        //href: params.url,
        border: params.border || true,
        fit: true
        //cls: 'leftBottomBorder'
    };
    if (t.iTabs('exists', opts.title)) {
        t.iTabs('select', opts.title);
    } else {
        var lastMenuClickTime = $.cookie("menuClickTime");
        var nowTime = new Date().getTime();
        if ((nowTime - lastMenuClickTime) >= 500) {
            $.cookie("menuClickTime", new Date().getTime());
            t.iTabs('add', opts);
        } else {
            $.iMessager.show({
                title: '温馨提示',
                msg: '操作过快，请稍后重试！'
            });
        }
    }
}

function addParentTab(options) {
    var src, title;
    src = options.href;
    title = options.title;

    var iframe = '<iframe src="' + src + '" frameborder="0" style="border:0;width:100%;height:100%;"></iframe>';
    parent.$('#index_tabs').iTabs("add", {
        title: title,
        content: iframe,
        closable: true,
        iconCls: 'fa fa-th',
        border: true
    });
}

function modifyPwd() {
    $("#pwdDialog").iDialog('open');
};
