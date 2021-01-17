let sysNoticeTextEdit;
layui.use(['colorpicker','form'], function () {
    let form = layui.form;//select、单选、复选等依赖form
    let colorpicker = layui.colorpicker;

    //开启全功能
    colorpicker.render({
        elem: '#test-form-sysColor'
        ,color: $('#sysColor').val()
        ,format: 'rgb'
        ,predefine: true
        ,alpha: true
        ,done: function(color){
            $('#sysColor').val(color);
        }
        ,change: function(color){
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //建立编辑器
    sysNoticeTextEdit = UE.getEditor('sysNoticeTextEdit');
    //回显
    sysNoticeTextEdit.ready(function() {
        sysNoticeTextEdit.setContent($("#sysNoticeText").val());
    });

    //radio checkbox
    $("#sysForm").find("[name='sysApiEncrypt'][value='" + $("#sysApiEncrypt").val() + "']").attr("checked", true);
    form.render();
});

/**
 * 提交保存
 */
function sysFormSave() {
    let serializeObject = $("#sysForm").serializeObject();
    //获取编辑器内容
    serializeObject.sysNoticeText = sysNoticeTextEdit.getContent();
    $.post(ctx + "/sys/sysSetting/save", serializeObject, function (data) {
        layer.msg("修改成功！", {icon: 1, time: 2000}, function () {});
        $("#sysForm").form(data.data);
        $("#sysApiEncrypt").val(data.data.sysApiEncrypt)
        //动态修改系统名称，logo图标，背景颜色
        var system_name = window.parent.document.getElementById("system-name");
        var system_header = window.parent.document.getElementsByClassName("system-background-color");
        var system_logo = window.parent.document.getElementById("system-logo");
        $(system_name).html(data.data.sysName);
        $(system_header).css("background-color", data.data.sysColor);
        $(system_logo).attr('src', data.data.sysLogo);
    });
}