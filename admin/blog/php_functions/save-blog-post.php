<?php
include('db-connection.php');

$PostID=$_POST['PostID'];
$PostDate=$_POST['PostDate'];
$Title=$_POST['Title'];
$Content=$_POST['Content'];
$NewPost;

if ($PostID != "0") {
    $sql = "UPDATE blog_posts SET
        PostDate = :PostDate,
        Title = :Title,
        Content = :Content
        WHERE ID = $PostID
        ";
    $NewPost = false;
} else {
    $sql = "INSERT INTO blog_posts SET
        PostDate = :PostDate,
        Title = :Title,
        Content = :Content
        ";
    $NewPost = true;
}

$params = array(
    ':PostDate' => $PostDate,
    ':Title' => $Title,
    ':Content' => $Content
); 

try{
    $s = $conn->prepare($sql);               
    $s->execute($params);
    if($NewPost) {
        echo $conn->lastInsertId();
    } else {
        echo $PostID;
    }
    
} catch (PDOException $e) {
    echo $e->getMessage();
};

$conn = null;

?>