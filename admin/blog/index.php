<?php
$page_content = 'index_content.php';
$page_title = 'Blog Posts';
$page_js_init = 'admin.blog_posts.Init();';
//TODO: path
$TEMPLATE_PATH = $_SERVER['DOCUMENT_ROOT'] . '/gnomsie/_global/template.php';
include($TEMPLATE_PATH);
?>