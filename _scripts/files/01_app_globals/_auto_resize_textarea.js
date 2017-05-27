global.auto_resize_textarea = (function (_module) {

    _module.Init = function () {
        WireEvents();
    };

    var WireEvents = function () {
        $("[data-textarea='auto-resize']").each(function () {
            _module.AutoSize(this);
        });

        $("[data-textarea='auto-resize']").off().on("input", function () {
            _module.AutoSize(this);
        });
    };

    _module.AutoSize = function (textarea) {
        $(textarea).height(1);
        $(textarea).height($(textarea).prop("scrollHeight"));
    };

    return _module;
}(global.auto_resize_textarea || {}));