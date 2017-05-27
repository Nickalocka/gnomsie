<?php 
session_start();
$_SESSION['feedbacktype'] = $_POST['FeedbackType'];
$_SESSION['feedbackmessage'] = $_POST['FeedbackMessage'];
?>