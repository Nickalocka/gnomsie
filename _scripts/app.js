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
        global.auto_resize_textarea.Init();
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
admin.blog_post_edit = (function (_module) {

    var settings = {        
        content_block_controls: {
            hidden: function(){
                var hidden = localStorage.getItem("admin_blog_content_block_controls_hidden");
                if(hidden === null){
                    return "false";
                } else {
                    return hidden;
                }
            },
            class: function () {
                if (settings.content_block_controls.hidden() === "true") {
                    return "controls-hidden";
                } else {
                    return "";
                }
            }
        }
    };

    _module.Init = function () {
        WireEvents();
    };

    var WireEvents = function () {
        $(document).ready(function(){
           CheckContentBlockControlsSettings(); 
        });
        $('[data-blog-post="save"]').off().on("click", SaveBlogPost);
        $('[data-blog-post="delete"]').off().on("click", DeleteBlogPost);
        $('[data-add-control]').off().on("click", InsertContentBlock);
        //TODO - look into best place to bind this
        $("#blog-wrapper").off().on("click", "[data-content-block-move]", MoveContentBlock);
        $('[data-blog-content-controls="toggle"]').off().on("click", ToggleContentBlockControls);
    };

    var InsertContentBlock = function () {
        var control = $(this);
        var InsertType = control.data("add-control");
        var contentChunk = $('[data-container="blog-post_content"]');
        var id = $("[data-content-block]").length + 1;

        var masterTemplate = {
            top:
                    "<div class='content-block " + settings.content_block_controls.class() + "' data-content-block='" + id + "' data-content-block-order='" + id + "'>" +
                    "<div class='content-block-controls'>" +
                    "<div class='content-block-control' data-content-block-move='up'><i class='icon-chevron-with-circle-up'></i></div>" +
                    "<div class='content-block-control' data-content-block-move='down'><i class='icon-chevron-with-circle-down'></i></div>" +
                    "<div class='content-block-control' data-content-block-control='menu'><i class='icon-cog'></i></div>" +
                    "</div>",
            bottom:
                    "</div>"
        };

        var templates = {
            title:
                    masterTemplate.top +
                    "<h1><textarea data-textarea='auto-resize' class='seamless-textarea'>Type your title here</textarea></h1>" +
                    masterTemplate.bottom,
            text_block:
                    masterTemplate.top +
                    "<p><textarea class='seamless-textarea' data-textarea='auto-resize'>Type your text here</textarea></p>" +
                    masterTemplate.bottom
        };

        contentChunk.append(templates[InsertType]);
        global.auto_resize_textarea.Init();
    };

    var MoveContentBlock = function () {
        var control = $(this);
        var direction = control.data("content-block-move");
        var contentBlocks = $("[data-content-block]");
        var contentBlock = control.closest("[data-content-block]");
        var oldposition = contentBlock.data("content-block-order");
        var newPosition;
        var switchBlock;

        if (direction === "up" && oldposition !== 1) {
            newPosition = oldposition - 1;
            switchBlock = true;
        } else if (direction === "down" && oldposition !== contentBlocks.length) {
            newPosition = oldposition + 1;
            switchBlock = true;
        }

        if (switchBlock) {
            var contentBlockToSwap = $("[data-content-block-order='" + newPosition + "']");
            contentBlock.data("content-block-order", newPosition).attr("data-content-block-order", newPosition);
            contentBlockToSwap.data("content-block-order", oldposition).attr("data-content-block-order", oldposition);
            var clone = contentBlock.clone();
            contentBlock.remove();

            if (direction === "up") {
                clone.insertBefore(contentBlockToSwap);
            } else {
                clone.insertAfter(contentBlockToSwap);
            }         
        }
    };

    var SaveBlogPost = function () {

        var PostID = $(this).data("blog-post-id");

        if (PostID === "") {
            PostID = 0;
        }
     
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
  
        if (mm < 10) {
            mm = '0' + mm;
        }

        today = dd + '/' + mm + '/' + yyyy;

        $('textarea').not('[data-blog-post="title"]').each(function () {
            var textarea = $(this);
            textarea.html(textarea.val());
        });

        var Title = $('[data-blog-post="title"]').val();
        var Content = $('[data-container="blog-post_content"]').html();

        $.ajax({
            type: "POST",
            //TODO: path
            url: global.settings.RootPathAdmin + "/blog/php_functions/save-blog-post.php",
            data: {PostID: PostID, PostDate: today, Title: Title, Content: Content},
            success: function (resp) {
                var postID = resp;
                var FeedbackType = "positive";
                var FeedbackMessage = "Post Saved Successfully";
                $.ajax({
                    type: "POST",
                    //TODO: path
                    url: global.settings.RootPath + "/_global/php_functions/set-feedback.php",
                    data: {FeedbackType: FeedbackType, FeedbackMessage: FeedbackMessage},
                    success: function (resp) {
                        window.location.replace(global.settings.RootPathAdmin + "/blog/post?id=" + postID);
                    }
                });
            }
        });

    };

    var DeleteBlogPost = function () {

        var row = $(this).closest("tr");
        var PostID = $(this).data("post-id");

        $.ajax({
            type: "POST",
            //TODO: path
            url: global.settings.RootPathAdmin + "/blog/php_functions/delete-blog-post.php",
            data: {PostID: PostID},
            success: function (resp) {
                if ($(".blog-table tr").length < 3) {
                    location.reload();
                } else {
                    row.remove();
                }
            },
            error: function (resp) {
                console.log(resp);
            }
        });

    };

    var ToggleContentBlockControls = function () {
        var ContentBlock = $('[data-content-block]');
        if (settings.content_block_controls.hidden() === "true") {
            localStorage.setItem("admin_blog_content_block_controls_hidden", "false");
            ContentBlock.removeClass("controls-hidden");
            $('[data-blog-content-controls="toggle"] .text').html("Hide Controls");
        } else {
            localStorage.setItem("admin_blog_content_block_controls_hidden", "true");
            ContentBlock.addClass("controls-hidden");
            $('[data-blog-content-controls="toggle"] .text').html("Show Controls");
        }
    };
    
    var CheckContentBlockControlsSettings = function(){
        var ContentBlock = $('[data-content-block]');
        if (settings.content_block_controls.hidden() === "true") {
            ContentBlock.addClass("controls-hidden");
            $('[data-blog-content-controls="toggle"] .text').html("Show Controls");
        } else {
            ContentBlock.removeClass("controls-hidden");
            $('[data-blog-content-controls="toggle"] .text').html("Hide Controls");
        }
    };
    
    return _module;
}(admin.blog_post_edit || {}));