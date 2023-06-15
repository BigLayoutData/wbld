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
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://widget.biglayoutdata.com/widget.js';
    scriptElement.type = 'text/javascript';
    scriptElement.onload = function() {
        wbld.init(id='wbld', widget_name='YOUR_WIDGET_NAME');
    };
    document.body.appendChild(scriptElement);
</script>
```

Replace ```YOUR_WIDGET_NAME``` with the widget name you received in step 1.

The widget should now be installed and activated!

## urlParams for pre-search

To open a URL with specific parameters for pre-search, you can use the following format:

```https://widget.biglayoutdata.com/?bedrooms=[bedrooms]&property_size=[property_size]&search=[search]```

Replace ```[bedrooms]``` with the number of bedrooms (0 for Studio, 1 for 1 bedroom, 2 for 2 bedrooms, 3 for 3 bedrooms), ```[property_size]``` with the property size in square meters, and ```[search]``` with the name of the building/address where spaces are replaced by '+'.

For example, to open a URL for a 2-bedroom apartment with a property size of 140.5m² in Armada Tower 3, the URL would be:

https://widget.biglayoutdata.com/?bedrooms=2&property_size=140.5&search=Armada+Tower+3

## Getting help

If you encounter any issues or have questions while integrating the widget, please do not hesitate to contact us at contact@biglayoutdata.com. We are here to support you throughout the process.
