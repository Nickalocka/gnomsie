<?php

    include('db-connection.php');

    $PostID = $_POST['PostID'];

    $sql = "DELETE FROM blog_posts WHERE ID = :ID";

    $params = array(
        ':ID' => $PostID
    ); 

    try{
        $s = $conn->prepare($sql);               
        $s->execute($params);
    } catch (PDOException $e) {
        echo $e->getMessage();
    };

    $conn = null;

?>