<?php
$version = "1.7.11";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Furniture Planner</title>
    <meta name="description" content="Furnish Rooms Using AI from IKEA, Home Centre, Home Box, West Elm, Pottery Barn, Danube Home, OC Home.">
    <meta name="keywords" content="furniture, select furniture, ai interior design, ai interior, ai design, ai tool for furnishing, Home Centre, IKEA, Home Box, Danube Home, OC Home, West Elm, Pottery Barn">
    <meta property="og:title" content="AI Furniture Planner">
    <meta property="og:description" content="Furnish Rooms Using AI from IKEA, Home Centre, Home Box, West Elm, Pottery Barn, Danube Home, OC Home.">
    <meta property="og:url" content="https://widget.biglayoutdata.com">
    <meta property="og:image" content="https://space.biglayoutdata.com/pics/Furnish-Your-Rooms.webp">
    <link rel="canonical" href="https://widget.biglayoutdata.com" />

    <link rel="preload" as="script" href="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript">
    <link rel="preload" as="script" href="widget.js?v=<?php echo $version; ?>" type="text/javascript">
    <link rel="preload" as="style" href="widget.css?v=<?php echo $version; ?>" type="text/css">
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" type="text/css" onload="this.onload=null;this.rel='stylesheet'">

    <?php if (!isset($_GET['project_id'])) { ?>
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-1.webp" type="image/webp">
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-2.webp" type="image/webp">
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-3.webp" type="image/webp">
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-4.webp" type="image/webp">
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-5.webp" type="image/webp">
    <link rel="preload" as="image" href="https://space.biglayoutdata.com/pics/bld-inspiring-pic-6.webp" type="image/webp">
    <?php } ?>
</head>
<body>
    <div id="logo" style="max-width: 165px; margin-left: calc(50% - 173px);">
        <a href="https://biglayoutdata.com/">
            <img src="bld.webp" alt="Big Layout Data Logo" width="640" height="163" style="width: 100%; height: auto;" />
        </a>
    </div>
    <!-- BigLayoutData widget (widget.js) -->
    <div id="wbld"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="widget.js?v=<?php echo $version; ?>" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            window.addEventListener('load', function() {
                wbld_widget = new WBLD(id='wbld', widget_name='wbld_widget', url_params=url_params);
            });
        });
    </script>
    <link href="widget.css?v=<?php echo $version; ?>" rel="stylesheet" type="text/css">
    <!-- BigLayoutData widget (widget.js) -->

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VHFE18GNY6"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-VHFE18GNY6');
    </script>
    <!-- Google tag (gtag.js) -->
</body>
</html>