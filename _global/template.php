<?php 
    //TODO: path
    $GLOBAL_VARS_PATH = $_SERVER['DOCUMENT_ROOT'] . '/gnomsie/config.php';
    include($GLOBAL_VARS_PATH);
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Gnome & Pheonix</title>
    <meta name="description" content="Gnome & Pheonix">
    <link href="https://fonts.googleapis.com/css?family=Advent+Pro|Neucha" rel="stylesheet">
    <!--TODO: path-->
    <link rel="stylesheet" href="<?php echo $PATH_HTML; ?>/_styles/css/styles.css">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <!--TODO: path-->
    <script src="<?php echo $PATH_HTML; ?>/_scripts/app.js"></script>
</head>
<body>
    <header class="main-header">
        <h1><?php echo $page_title ?></h1>
    </header>
    <div class="main-feedback-container">
        <?php include($PATH_INCLUDE.'/_global/php_functions/get-feedback.php'); ?>
    </div>
    <main class="main-content-wrapper">
        <div class="main-content-inner">
            <?php include($page_content);?>
        </div>
    </main>

<?php
    echo 
    "
    <script>
        $(document).ready(function() {
            global.Init();"
            . $page_js_init .
        "});
    </script>
    ";
?>



</body>
</html>