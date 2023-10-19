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
<link href="https://widget.biglayoutdata.com/widget.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    jQuery(document).ready(function($) {
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://widget.biglayoutdata.com/widget.js';
        scriptElement.type = 'text/javascript';
        scriptElement.onload = function() {
            var url_params = new Map();
            wbld.init(id='wbld', widget_name='YOUR_WIDGET_NAME', url_params=url_params);
        };
        document.body.appendChild(scriptElement);
    });
</script>
```

Replace ```YOUR_WIDGET_NAME``` with the widget name you received in step 1.

The widget should now be installed and activated!

## partner_id in URL

To open a URL with partner_id parameter, you can use the following format:

```https://widget.biglayoutdata.com/?partner_id=[partner_id]```

Replace ```[partner_id]``` with your partner name.

For example, to open a URL with partner name ```partner_test```:

https://widget.biglayoutdata.com/?partner_id=partner_test

## Getting help

If you encounter any issues or have questions while integrating the widget, please do not hesitate to contact us at contact@biglayoutdata.com. We are here to support you throughout the process.
