<?php 
session_start();
if( isset($_SESSION["feedbacktype"]) && isset( $_SESSION["feedbackmessage"] )) {

    $FEEDBACK_TYPE = $_SESSION["feedbacktype"];
    $FEEDBACK_MESSAGE = $_SESSION["feedbackmessage"];

    echo "<div class='feedback-alert $FEEDBACK_TYPE'>
            <div class='feedback-alert-message'>
                $FEEDBACK_MESSAGE
            </div>
          </div>";

    unset($_SESSION["feedbacktype"]);
    unset($_SESSION["feedbackmessage"]);
};
?>