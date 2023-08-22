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
        var url_params = new Map();
        wbld.init(id='wbld', widget_name='YOUR_WIDGET_NAME', url_params=url_params);
    };
    document.body.appendChild(scriptElement);
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

## url_params for pre-search in URL

To open a URL with specific parameters for pre-search, you can use the following format:

```https://widget.biglayoutdata.com/?bedrooms=[bedrooms]&property_size=[property_size]&search=[search]```

Replace ```[bedrooms]``` with the number of bedrooms (0 for Studio, 1 for 1 bedroom, 2 for 2 bedrooms, 3 for 3 bedrooms), ```[property_size]``` with the property size in square meters, and ```[search]``` with the name of the building/address where spaces are replaced by '+'.

For example, to open a URL for a 2-bedroom apartment with a property size of 140.5m² in Armada Tower 3, the URL would be:

https://widget.biglayoutdata.com/?bedrooms=2&property_size=140.5&search=Armada+Tower+3

## url_params for pre-search in wbld.init()

To initialise widget with specific parameters for pre-search, you can set the parameters inside the onload function as follows:

```
scriptElement.onload = function() {
    var url_params = new Map();
    url_params.set('bedrooms', [bedrooms]);
    url_params.set('property_size', [property_size]);
    url_params.set('search', [search]);

    wbld.init(id='wbld', widget_name='YOUR_WIDGET_NAME', url_params=url_params);
};
```

Replace ```[bedrooms]``` with the number of bedrooms (0 for Studio, 1 for 1 bedroom, 2 for 2 bedrooms, 3 for 3 bedrooms), ```[property_size]``` with the property size in square meters, and ```[search]``` with the name of the building/address where spaces are replaced by '+'.

For example, to init widget for a 2-bedroom apartment with a property size of 140.5m² in Armada Tower 3, the script would be:

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
        var url_params = new Map();
        url_params.set('bedrooms', 2);
        url_params.set('property_size', 140.5);
        url_params.set('search', 'Armada+Tower+3');

        wbld.init(id='wbld', widget_name='YOUR_WIDGET_NAME', url_params=url_params);
    };
    document.body.appendChild(scriptElement);
</script>
```

## Getting help

If you encounter any issues or have questions while integrating the widget, please do not hesitate to contact us at contact@biglayoutdata.com. We are here to support you throughout the process.
