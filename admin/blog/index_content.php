<?php include('php_functions/read-blog-post.php'); ?>
<?php if(count($result) > 0): ?>

<table class="blog-table">
    <thead>
        <tr>
            <th>Posted</th>
            <th>Title</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
            <?php 
                foreach($result as $blog_post){
                    echo "<tr>";
                    echo "<td>{$blog_post['PostDate']}</td>";
                    echo "<td>{$blog_post['Title']}</td>";
                    echo "<td><a class='link' href='post?id={$blog_post['ID']}'><i class='icon-cog'></i></a></td>";
                    echo "<td><a class='link' data-blog-post='delete' data-post-id='{$blog_post['ID']}' href='#!'><i class='icon-circle-with-cross'></i></a></td>";
                    echo "</tr>";
                }
            ?>
    </tbody>
</table>

<?php else: ?>
    <p>
        You have no blog posts, click "Add New Post" to get started!
    </p>
<?php endif; ?>

<!-- TODO: path -->
<div class="bottom-btns">    
    <a href="<?php echo $PATH_HTML_ADMIN ?>/blog/post.php?id=0" class="btn-action">Add New Post</a>
</div>