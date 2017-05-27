global.toggle_collapse = (function (_module) {

    _module.Init = function(){
        WireEvents();
    };

    var WireEvents = function() {
         $('[data-collapse="toggle"]').off().on("click", Toggle);
    };

    var Toggle = function() {
        var toggleTarget = $(this).data("collapse-target");
        $('[data-collapse-id="' + toggleTarget + '"]').slideToggle();
    };

	return _module;
}(global.toggle_collapse || {}));