# Widget BigLayoutData Quickstart

User-friendly furnishing widget for your apartment layout in Dubai.
We leverage AI and a database of floor plans to curate furniture sets from local stores that align with users&#039; layout, budget, and style preferences.

## Setup

1. To start the setup process, you will need to obtain your ```YOUR_WIDGET_NAME```. Please email us at contact@biglayoutdata.com to receive this.
2. Once you have your widget name, insert the following code within the ```<body>``` tag on your website:

```
<!-- BigLayoutData widget (widget.js) -->
<div id="wbld"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="widget.js" type="text/javascript"></script>
<script type="text/javascript">
    jQuery(document).ready(function() {
        window.addEventListener('load', function() {
            wbld_widget = new WBLD(id='wbld', widget_name='YOUR_WIDGET_NAME', url_params=url_params);
        });
    });
</script>
<link href="widget.css" rel="stylesheet" type="text/css">
<!-- BigLayoutData widget (widget.js) -->
```

Replace ```YOUR_WIDGET_NAME``` with the widget name you received in step 1.

The widget should now be installed and activated!

## Getting help

If you encounter any issues or have questions while integrating the widget, please do not hesitate to contact us at contact@biglayoutdata.com. We are here to support you throughout the process.
