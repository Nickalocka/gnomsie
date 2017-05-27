<?php
$PostID = $_GET['id'];
if ($PostID != "0") {
    $EditMode = True;
    include('php_functions/read-blog-post.php');
    $blog_post = $result;
} else {
    $EditMode = False;
}
?>

<div id="blog-wrapper">  

    <section class="blog-post" data-container="blog-post">
        
        <nav class="blog-post_controls">
            <div class="controls-menu_toggle" data-collapse="toggle" data-collapse-target="controls-menu">
                <i class="icon-menu"></i>
            </div>
            <div class="controls-menu" data-collapse-id="controls-menu" style="display:none;">
                <div class="control-group">
                    <div class="group-title">
                        <span class="icon"><i class="icon-add-to-list"></i></span>
                        <span class="text">Add:</span>
                    </div>
                    <div class="link control" data-add-control="title">                    
                    <span class="text">Title</span>
                </div>
                <div class="link control" data-add-control="text_block">
                    <span class="text">Text Block</span>
                </div>
                </div>                
                <div class="link control" data-blog-content-controls="toggle">
                    <span class="icon"><i class="icon-eye"></i></span> 
                    <span class="text">Hide Controls</span>
                </div>               
            </div>
        </nav>

        <header class="blog-post_title">
            <h1> 
                <?php if($EditMode)  {
                    echo "<textarea class='seamless-textarea' data-blog-post='title'>" . $blog_post['Title'] . "</textarea>";                      
                } else { 
                    echo "<textarea class='seamless-textarea' data-blog-post='title'/>Type Title Here</textarea>";   
                } ?>
            </h1>                    
        </header>

        <article class="blog-post_content" data-container="blog-post_content">
            <?php 
                if($EditMode) {
                    echo $blog_post['Content'];
                };
            ?>
        </article>

    </section>

    <div class="bottom-btns">
        <a class="link back" href="<?php echo $PATH_HTML_ADMIN ?>/blog"><i class="icon-chevron-left"></i>Back to Post List</a>
        <button class="btn-action" data-blog-post="save" data-blog-post-id="<?php if($EditMode) echo $blog_post['ID'] ?>"> Save </button>
    </div>

</div>
