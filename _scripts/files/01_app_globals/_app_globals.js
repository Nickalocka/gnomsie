var global = (function (_module) {
    // add capabilities...

    _module.Init = function () {
        WireEvents();
    };

    _module.settings = {
        //TODO: path
        RootPath: "/gnomsie",
        RootPathAdmin: "/gnomsie/admin"
    };

    var WireEvents = function () {
        global.toggle_collapse.Init();
    };

    return _module;
}(global || {}));

var admin = (function (_module) {
    return _module;
}(admin || {}));

// $(document).ready(function() {
//    global.OnDocumentReady();
// });

// var app = (function () {
//  })();

// var global = (function(){
//     var settings = {
//         //TODO: path
//         RootPath: "/gnomsie",
//         RootPathAdmin: "/gnomsie/admin"
//     };

//     var OnDocumentReady = function() {
//         global.toggle_collapse.Init();
//     };

//     return {
//         settings: settings,
//         OnDocumentReady: OnDocumentReady
//     }; 
// })();

// var admin = (function (_module) {
//     return _module;
// })();