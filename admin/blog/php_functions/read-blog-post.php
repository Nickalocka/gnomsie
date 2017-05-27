<?php
 
 include('db-connection.php');

 try {
    if(isset($PostID)) {
        $sql= "SELECT * FROM blog_posts WHERE ID = $PostID"; 
        $query = $conn->query($sql); 
        $result = $query->fetch(PDO::FETCH_ASSOC);
    } else {
        $query = $conn->prepare("SELECT * FROM blog_posts"); 
        $query->execute();
        $result = $query->fetchAll();
    }

 }
 catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
 }

 $conn = null;

?>