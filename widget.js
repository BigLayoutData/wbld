var wbld = { 
    id: 'wbld',
    widget_name: 'no_data',
    widget_domain: 'no_data',
    widget_url: 'no_data',
    visitor_id: 'no_data',
    partner_id: 'no_data',
    filters_json: 'no_data',
    project_id: 'no_data',
    project_json: 'no_data',
    onboardingClickOn: true,
    onboardingScrollXOn: true,
    // some const for img urls
    pics: 'https://space.biglayoutdata.com/pics/',
    mood_board_img: 'https://space.biglayoutdata.com/mood-boards/',
    layout_without_items_img: 'https://space.biglayoutdata.com/room-in-layout-img/',
    layout_with_items_img: 'https://space.biglayoutdata.com/room-in-layout-img/',
    room_in_layout_img: 'https://space.biglayoutdata.com/room-in-layout-img/',
    products_bucket: 'https://space.biglayoutdata.com/products_',
    // some const for api urls
    api1: 'https://api.biglayoutdata.com/',
    api2: 'https://api1.biglayoutdata.com/',
    // widget initialization method 
    init: function(id, widget_name, url_params) {
        // check if the HTML element with the specified id exists on the page
        if (!document.getElementById(id)) {
            console.log(`The specified block id="${id}" is missing`);
            return;
        }

        // check if the identifier is equal to the default id="wbld"
        if (id != 'wbld') {
            console.log(`The specified block id="${id}" not id="wbld"`);
            return;
        }
        
        // check if the widget name is specified
        if (!widget_name) {
            console.log(`Widget name is missing`);
            return;
        }

        // start loading progress bar
        wbld.loadingBar = new loadingBar('loading-bar', this.id, 'We are downloading your widget!');
        wbld.loadingBar.start(speed=200);

        // set widget name
        this.widget_name = widget_name;

        // get domain name and url
        this.widget_domain = location.hostname;
        this.widget_url = location.href;

        // get url params
        url_search_params = new URLSearchParams(window.location.search);
        if (url_search_params.get('project_id')) {
            this.project_id = url_search_params.get('project_id');
        }

        if (url_search_params.get('partner_id')) {
            this.partner_id = url_search_params.get('partner_id');
        }

        if (url_params.size == 0) {
            url_params = url_search_params;
        }

        // start wo check_widget for basic widget
        const is_basic_widget = (this.widget_name === 'wbld_widget_test_server' || this.widget_name === 'wbld_widget') && this.project_id === 'no_data';
        if (is_basic_widget) {
            widget_layout_id = 5;
            widget_n_bedrooms = [{"n_bedrooms_name": "Studio", "n_bedrooms": 0, "selected": "", "layout_sizes": [{"layout_size_name": "30-35 m2", "selected": "", "layout_id": 1}, {"layout_size_name": "35-45 m2", "selected": "selected", "layout_id": 2}, {"layout_size_name": "45-60 m2", "selected": "", "layout_id": 3}]},         {"n_bedrooms_name": "1 Bedroom", "n_bedrooms": 1, "selected": "selected", "layout_sizes": [{"layout_size_name": "60-70 m2", "selected": "", "layout_id": 4}, {"layout_size_name": "70-80 m2", "selected": "selected", "layout_id": 5}, {"layout_size_name": "80-95 m2", "selected": "", "layout_id": 6}]},         {"n_bedrooms_name": "2 Bedroom", "n_bedrooms": 2, "selected": "", "layout_sizes": [{"layout_size_name": "110-130 m2", "selected": "", "layout_id": 7}, {"layout_size_name": "130-140 m2", "selected": "selected", "layout_id": 8}, {"layout_size_name": "140-160 m2", "selected": "", "layout_id": 9}]},         {"n_bedrooms_name": "3 Bedroom", "n_bedrooms": 3, "selected": "", "layout_sizes": [{"layout_size_name": "130-160 m2", "selected": "", "layout_id": 10}, {"layout_size_name": "160-190 m2", "selected": "selected", "layout_id": 11}, {"layout_size_name": "190-230 m2", "selected": "", "layout_id": 12}]},         {"n_bedrooms_name": "4 Bedroom", "n_bedrooms": 4, "selected": "", "layout_sizes": [{"layout_size_name": "240-270 m2", "selected": "", "layout_id": 13}, {"layout_size_name": "270-320 m2", "selected": "selected", "layout_id": 14}]}];
            widget_n_bedrooms = JSON.stringify(widget_n_bedrooms);
            widget_budgets = [{"budget_name": "Premium", "selected": "", "budget_id": 1}, {"budget_name": "Balanced", "selected": "selected", "budget_id": 2}, {"budget_name": "Smart Saving", "selected": "", "budget_id": 3}];
            widget_budgets = JSON.stringify(widget_budgets);
            widget_styles = [{"style_name": "Contemporary", "selected": "selected", "style_id": 1}, {"style_name": "Neoclassic", "selected": "", "style_id": 2}];
            widget_styles = JSON.stringify(widget_styles);
            widget_shops = [{"country_name": "UAE", "country_code": "AE", "country_id": 1, "country_flag": "&#127462;&#127466;", "country_currency": "AED", "selected": "", "shops_list": [{"shop_name": "IKEA", "selected": "selected", "shop_id": 1}, {"shop_name": "Home Box", "selected": "", "shop_id": 2}, {"shop_name": "Home Centre", "selected": "", "shop_id": 3}, {"shop_name": "West Elm", "selected": "", "shop_id": 4}, {"shop_name": "Pottery Barn", "selected": "", "shop_id": 5}]}, {"country_name": "KSA", "country_code": "SA", "country_id": 2, "country_flag": "&#127480;&#127462;", "country_currency": "SAR", "selected": "", "shops_list": [{"shop_name": "IKEA", "selected": "selected", "shop_id": 1}, {"shop_name": "Home Box", "selected": "", "shop_id": 2}, {"shop_name": "Home Centre", "selected": "", "shop_id": 3}, {"shop_name": "West Elm", "selected": "", "shop_id": 4}, {"shop_name": "Pottery Barn", "selected": "", "shop_id": 5}]}, {"country_name": "USA", "country_code": "US", "country_id": 3, "country_flag": "&#127482;&#127480;", "country_currency": "USD", "selected": "selected", "shops_list": [{"shop_name": "IKEA", "selected": "selected", "shop_id": 1}]}, {"country_name": "IND", "country_code": "IN", "country_id": 4, "country_flag": "&#127470;&#127475;", "country_currency": "INR", "selected": "", "shops_list": [{"shop_name": "IKEA", "selected": "selected", "shop_id": 1}]}];
            widget_shops = JSON.stringify(widget_shops);
            widget_parameters = {"widget_font": "'Raleway', sans-serif", "widget_font_link": "https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap", "btn_color": "#E4B944", "btn_font_color": "#000000"};
            widget_parameters = JSON.stringify(widget_parameters);
            start(
                widget_layout_id,
                widget_n_bedrooms,
                widget_budgets,
                widget_styles,
                widget_shops,
                widget_parameters,
            );
            return;
        }

        // need to check that the widget name is available
        const data = {
            "widget_name": widget_name,
            "widget_domain": location.hostname,
            "layout_id": url_params.get('layout_id'),
            "property_size": url_params.get('property_size'),
            "bedrooms": url_params.get('bedrooms'),
            "search": url_params.get('search'),
            "project_id": this.project_id,
        };
        //console.log("data:", data);
        jQuery.ajax({
            url: this.api1 + 'check_widget/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                if (response.data.widget_status != 'active') {
                    console.log(`Widget widget_name="${widget_name}" status is not active`);
                    return;
                }

                // get project_json and parse it
                if (response.data.widget_project_json != "no_data") {
                    wbld.project_json = JSON.parse(response.data.widget_project_json);
                }

                // start widget draw
                start(
                    response.data.widget_layout_id,
                    response.data.widget_n_bedrooms,
                    response.data.widget_budgets,
                    response.data.widget_styles,
                    response.data.widget_shops,
                    response.data.widget_parameters,
                );
            },
            error: function(error) {
                if (error.status === 404) {
                    console.log(`Widget widget_name="${widget_name}" is not found or widget domain is not correct`);
                } else {
                    console.error(error);
                }
            }
        });
    }, 
    // widget style connection method
    addStyles: function(font_style_href) { 
        const font_style = document.createElement('link'); 
        font_style.rel = 'stylesheet'; 
        font_style.type = 'text/css'; 
        font_style.href = font_style_href; 
        document.head.appendChild(font_style);
    }
};



class loadingBar {
    constructor(id, parent_id, text) {
        this.id = id;
        this.parent_id = parent_id;
        this.text = text;
        this.intervalId = 0;
        this.progress = 0;
        this.div = this.createDiv();
        this.appendToParent();
    }

    createDiv() {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = 'widget-container';
        div.innerHTML = `
            <div class="text-editor">
                <p class="p-box">${this.text}</p>
                <div class="progress">
                    <div class="bar"></div>
                    <div class="label">0%</div>
                </div>
            </div>
        `;
        return div;
    }

    appendToParent() {
        const parent = document.getElementById(this.parent_id);
        parent.appendChild(this.div);
    }

    start(speed) {
        this.div.style.display = 'block';
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.progress += 1;
            this.update();
            if (this.progress === 100) { 
                this.finish();
            }
        }, speed);
    }

    update() {
        this.div.querySelector('.bar').style.maxWidth = `${this.progress}%`;
        this.div.querySelector('.label').innerHTML = `${this.progress}%`;
    }

    finish() {
        clearInterval(this.intervalId);
        this.div.style.display = 'none';
        this.progress = 0;
        this.update();
    }
}

class progressBar extends loadingBar {
    constructor(id, parent_id, text) {
        super(id, parent_id, text);
    }

    start(speed) {
        this.div.style.display = 'block';
        const generateBtnBlock = document.getElementById('generate-btn-block');
        generateBtnBlock.style.display = 'none';
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.progress += 1;
            speed += 10;
            this.update();
            if (this.progress === 100) { 
                this.finish();
            }
        }, speed);
    }

    finish() {
        clearInterval(this.intervalId);
        this.div.style.display = 'none';
        const generateBtnBlock = document.getElementById('generate-btn-block');
        generateBtnBlock.style.display = 'block';
        this.progress = 0;
        this.update();
    }
}

function start(widget_layout_id, widget_n_bedrooms, widget_budgets, widget_styles, widget_shops, widget_parameters) {

    // widget parameters
    widget_parameters = JSON.parse(widget_parameters);

    // add widget styles
    wbld.addStyles(font_style_href=widget_parameters.widget_font_link);

    // set widget font family and color
    const root = document.documentElement;
    root.style.setProperty('--widget-font', widget_parameters.widget_font);
    root.style.setProperty('--btn-color', widget_parameters.btn_color);
    root.style.setProperty('--btn-font-color', widget_parameters.btn_font_color);
    
    jQuery("#wbld").append(jQuery('<div id="mainbar"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="input"></div>'));
    jQuery("#input").append(jQuery('<div id="input-line-1"></div>'));
    jQuery("#input").append(jQuery('<div id="input-line-2"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="before-output"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="output"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="product-popup" style="display: none;"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="poweredby"></div>'));

    // widget layout_id
    //widget_layout_id = decodeURIComponent(widget_layout_id);
    //const layout_id = widget_layout_id;
    //console.log("layout_id:", layout_id);

    // widget n_bedrooms
    widget_n_bedrooms = decodeURIComponent(widget_n_bedrooms);
    const n_bedrooms_list = JSON.parse(widget_n_bedrooms);
    //console.log("n_bedrooms_list:", n_bedrooms_list);

    // widget budgets
    widget_budgets = decodeURIComponent(widget_budgets);
    const budgets_list = JSON.parse(widget_budgets);

    // widget styles
    //widget_styles = decodeURIComponent(widget_styles);
    //const styles_list = JSON.parse(widget_styles);

    // widget countries
    widget_shops = decodeURIComponent(widget_shops);
    const countries_list = JSON.parse(widget_shops);
    let shops_list = countries_list.find(item => item.selected === 'selected').shops_list;

    // get country_name from wbld.widget_domain
    // change countries_list.selected if needed
    // if share loading - not needed to change countries_list.selected
    if (wbld.project_id !== 'no_data' || countries_list.length === 1) {
        generate_input(n_bedrooms_list, countries_list, shops_list, budgets_list);
        return;
    }

    // if standart loading
    if (["uae", "ksa", "usa", "ind"].includes(wbld.widget_domain.split('-')[0])) {
        countries_list.forEach(function(item) {
            if (item.country_name === wbld.widget_domain.split('-')[0].toUpperCase()) {
                item.selected = 'selected';
            } else {
                item.selected = '';
            }
        });

        shops_list = countries_list.find(item => item.selected === 'selected').shops_list;
        generate_input(n_bedrooms_list, countries_list, shops_list, budgets_list);
        return;
    }

    // if countries_list.length > 1
    fetch("https://ipinfo.io/json?token=20e5b2bc3a74f5")
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (["AE", "SA", "US", "IN"].includes(jsonResponse.country)) {
                countries_list.forEach(function(item) {
                    if (item.country_code === jsonResponse.country) {
                        item.selected = 'selected';
                    } else {
                        item.selected = '';
                    }
                });
            }
            shops_list = countries_list.find(item => item.selected === 'selected').shops_list;
            generate_input(n_bedrooms_list, countries_list, shops_list, budgets_list);
        })
        .catch((error) => {
            console.error('Error fetching IP information:', error);
        });
}

function generate_input(n_bedrooms_list, countries_list, shops_list, budgets_list) {

    jQuery('#input-line-1').append(`
        <div class="input-block-left">
            
            <div class="widget-container">
                <div class="small-text">Furniture Store</div> 
                <div class="select-btn">
                    <div id="shops-select" class="select">${shops_list.find(item => item.selected === 'selected').shop_name} ${countries_list.find(item => item.selected === 'selected').country_flag}</div>
                </div>
                <div id="shopsPopup" class="popup done">
                    <div class="widget-container">
                        <div class="small-text">Your Country</div>
                        <div id="countries-buttons">
                            ${countries_list.map(item => `<button class="filter-btn country-btn ${item.selected}" data-country_id=${item.country_id} data-country_name=${encodeURIComponent(item.country_name)} data-country_flag=${encodeURIComponent(item.country_flag)} data-country_currency=${item.country_currency} data-country_shops_list=${encodeURIComponent(JSON.stringify(item.shops_list))} >${item.country_name} ${item.country_flag}</button>`).join('')}
                        </div>
                    </div>

                    <div class="widget-container">
                        <div class="small-text">Pick Furniture Store</div>
                        <div id="shops-buttons">
                            ${shops_list.map(item => `<button class="filter-btn shop-btn ${item.selected}" data-shop_id=${item.shop_id} data-shop_name=${encodeURIComponent(item.shop_name)}>${item.shop_name}</button>`).join('')}
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    `);

    jQuery('#input-line-1').append(`
        <div class="input-block-right">
            
            <div class="widget-container">
                <div class="small-text">Your Layout</div> 
                <div class="select-btn">
                    <div id="bedrooms-select" class="select">${n_bedrooms_list.find(item => item.selected === 'selected').n_bedrooms_name}</div>
                </div>
                <div id="bedroomsPopup" class="popup done">
                
                    <div class="widget-container">
                        <div class="small-text">Pick Your Bedrooms Number</div>
                        <div id="bedrooms-buttons">
                            ${n_bedrooms_list.map(item => `<button class="filter-btn bedroom-btn ${item.selected}" data-n_bedrooms=${item.n_bedrooms} data-n_bedrooms_name=${encodeURIComponent(item.n_bedrooms_name)} data-n_bedrooms_layout_sizes=${encodeURIComponent(JSON.stringify(item.layout_sizes))} >${item.n_bedrooms_name}</button>`).join('')}
                        </div>
                    </div>

                    <div class="widget-container">
                        <div class="small-text">Pick Your Layout Size</div>
                        <div id="layoutsize-buttons">
                            ${n_bedrooms_list.find(item => item.selected === 'selected').layout_sizes.map(item => `<button class="filter-btn layout_size-btn ${item.selected}" data-layout_id=${item.layout_id} >${item.layout_size_name}</button>`).join('')}
                        </div>
                    </div>

                    <div class="widget-container">
                        <button class="generate-btn" style="float: right; width: 220px;">Close and Create Project</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    `);

    
    jQuery('#input-line-2').append(`
        <div class="input-block-left">
            
            <div class="widget-container">
                <div class="small-text">Target Budget</div> 
                <div class="select-btn">
                    <div id="advanced-select" class="select">${budgets_list.find(item => item.selected === 'selected').budget_name}</div>
                </div>
                <div id="advancedPopup" class="popup done">
                
                    <div class="widget-container">
                        <div class="small-text">Pick Target Budget</div>
                        <div id="budgets-buttons">
                            ${budgets_list.map(item => `<button class="filter-btn budget-btn ${item.selected}" data-budget_id=${item.budget_id} data-max_budget=${item.max_budget} data-min_budget=${item.min_budget} data-budget_name=${encodeURIComponent(item.budget_name)}>${item.budget_name}</button>`).join('')} 
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    `);
    
    jQuery('#input-line-2').append(`
        <div class="input-block-right" id="generate-btn-block">

            <div class="widget-container">
                <div class="small-text">&nbsp;</div> 
                <button class="generate-btn">Create Project</button>
                <button class="save-share-btn" id="save-share-btn">
                    <div class="save-share-btn-text">Share Project</div>
                    <div class="save-share-btn-icon">
                        <img src="${wbld.pics + 'share-icon.webp'}" width="79" height="104" alt="Share">
                    </div>
                    <div id="copyMessage">Link copied to clipboard</div>
                </button>
            </div>

        </div>
    `);

    // Start generate_output if project_id is no_data
    if (wbld.project_id === 'no_data') {
        generate_before_output(display='block');
    } else {
        generate_before_output(display='none');
        // finish loadingBar
        wbld.loadingBar.finish();

        // imitate click on generate-btn
        jQuery(`.generate-btn`).click();
    }

    generate_product_popup();
    
    generate_poweredby();
}

function generate_before_output() {
    jQuery('#before-output').css('display', display);

    // Create a function to handle the image load event
    let imagesLoaded = 0;
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 7) {
            wbld.loadingBar.finish();
        }
    }

    jQuery('#before-output').append(`
        <div class="widget-container">
            <div class="main-title">
                Furnish Your <span class='word-room'>Rooms</span> from Store Next Door Using <span class='word-room'>AI</span>
            </div>
            <div class="main-description">
                Start by uploading an inspiring image, and we'll match you with similar furniture nearby. Then, tap 'Create Project'
            </div>
        </div>

        <div class="widget-container">
            <div class="user-inspiring-image">
                <div id="file-upload">
                    <label for="file">
                        Upload an Inspiring Image
                        <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png, .webp">
                    </label>
                </div>
                <div id="file-preview">
                    ${wbld.project_id !== 'no_data' ? `<img class="inspiring-image img-selected" alt="Inspiring Image" data-inspiring_image_id=${wbld.project_json.data.inspiring_image_id} data-inspiring_image_name=${wbld.project_json.data.inspiring_image_name} />` : ''}
                </div>
            </div>
        </div>

        <div class="widget-container">
            <div class="main-description">
                <button class="generate-btn">Create Project</button>
            </div>
        </div>

        <div class="widget-container">
            <div class="main-description">
                Or choose one of our inspiring images
            </div>
        </div>

        <div class="widget-container">
            <div class="inspiring-images">
                <div class="inspiring-image-left" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-1.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 1" class="inspiring-image ${wbld.project_id !== 'no_data' ? '' : 'img-selected'}" data-inspiring_image_id="1" data-inspiring_image_name="no_data" />
                </div>
                <div class="inspiring-image-right" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-2.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 2" class="inspiring-image" data-inspiring_image_id="2" data-inspiring_image_name="no_data" />
                </div>
                <div class="inspiring-image-left" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-3.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 3" class="inspiring-image" data-inspiring_image_id="3" data-inspiring_image_name="no_data" />
                </div>
                <div class="inspiring-image-right" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-4.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 4" class="inspiring-image" data-inspiring_image_id="4" data-inspiring_image_name="no_data" />
                </div>
                <div class="inspiring-image-left" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-5.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 5" class="inspiring-image" data-inspiring_image_id="5" data-inspiring_image_name="no_data" />
                </div>
                <div class="inspiring-image-right" >
                    <img src="${wbld.pics + 'bld-inspiring-pic-6.webp'}" width="500" height="500" alt="Big Layout Data Inspiring Picture 6" class="inspiring-image" data-inspiring_image_id="6" data-inspiring_image_name="no_data" />
                </div>
            </div>
        </div>

        <div class="widget-container">
            <div class="main-description">
                <button class="generate-btn">Create Project</button>
            </div>
        </div>
    `);


    // Attach load event listener to each image
    //jQuery(".onboarding-images img").on("load", imageLoaded);
    jQuery(".inspiring-images img").on("load", imageLoaded);
    // Attach load event listener to save-share-btn-icon image
    jQuery(".save-share-btn-icon img").on("load", imageLoaded);
}

function generate_product_popup() {
    jQuery('#product-popup').append(`
        <div class="widget-container">
            <div id="product-popup-content"></div>
        </div>
    `);
}

function generate_poweredby() {
    jQuery('#poweredby').append(`
        <div class="widget-container">
            <div class="poweredby">
                <div class="poweredby-links"><a href="https://biglayoutdata.com/useragreement/" target="_blank" style="color: #000000; cursor: pointer; text-decoration: none;">User Agreement</a></div>
                <div class="poweredby-text">Powered by</div>
                <div class="poweredby-img">
                    <a href="https://biglayoutdata.com/" target="_blank" rel="noopener">
                        <img src="${wbld.pics + 'poweredby.webp'}" alt="Big Layout Data Logo" width="298" height="76" />
                    </a>
                </div>
                <div class="poweredby-links-big"><a href="https://biglayoutdata.com/how-to-use-our-free-tool-to-furnish-apartment/" target="_blank" style="color: #000000; cursor: pointer; text-decoration: none;">How to Use Smart Funishing System BLD</a></div>
                <div class="poweredby-whatsapp">
                    <a aria-label="Chat on WhatsApp" href="https://wa.me/37129109173" target="_blank" rel="noopener noreferrer">
                        <img alt="Chat on WhatsApp" src="${wbld.pics + 'WhatsAppButtonGreenLarge.webp'}" width="378" height="80" />
                    </a></div>
            </div>
        </div>
    `);
}

function setCoordinates(parentWidth, parentHeight, element, coords) {
    const x = coords[0] * parentWidth;
    const y =  ( 1 - coords[1] - coords[3] ) * parentHeight;
    const width = coords[2] * parentWidth;
    const height = coords[3] * parentHeight;
  
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}

function update_output() {
    // clean output from previous info
    jQuery("#output").empty();

    // check layout_id not null
    const layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );
    if (!layout_id) {
        jQuery('#output').append(`
            <div class="widget-container">
                <div class="text-editor">
                    <p class="p-box">You need to choose layout.</p>
                </div>
            </div>
        `);
        return;
    }
    
    // start outputBar
    const outputBar = new progressBar('progress-bar', 'output', 'We are selecting furniture that fits your layout!');
    outputBar.start(speed=200);
    
    if (wbld.project_id === 'no_data') {
        // get style, country, shop, budget_id
        //const style = jQuery(".style-btn.selected").data( "style_name" );
        const inspiring_image_id = jQuery(".inspiring-image.img-selected").data( "inspiring_image_id" );
        const inspiring_image_name = jQuery(".inspiring-image.img-selected").data( "inspiring_image_name" );
        const country = jQuery(".country-btn.selected").data( "country_name" );
        const shop = jQuery(".shop-btn.selected").data( "shop_name" );
        const budget_id = jQuery(".budget-btn.selected").data( "budget_id" );

        // Create a FormData object to send the file and other data
        const formData = new FormData();
        formData.append("widget_name", wbld.widget_name);
        formData.append("visitor_id", wbld.visitor_id);
        formData.append("partner_id", wbld.partner_id);
        formData.append("layout_id", layout_id);
        formData.append("inspiring_image_id", inspiring_image_id);
        formData.append("inspiring_image_name", inspiring_image_name);
        formData.append("country", country);
        formData.append("shop", shop);
        formData.append("budget_id", budget_id);

        if (inspiring_image_id === 0) {
            const fileInput = document.getElementById("file");
            const selectedFile = fileInput.files[0];
            formData.append("file", selectedFile);
        }

        jQuery.ajax({
            url: `${wbld.api1}generate/`,
            type: "POST", // Use POST method to send data
            data: formData, // Send the FormData object
            cache: false,
            contentType: false, // Set contentType to false for FormData
            processData: false, // Set processData to false for FormData
            dataType: "json",
            success: function (response) {
                if (!response.data.layout_id) {
                    jQuery("#output").append(`
                        <div class="widget-container">
                            <div class="text-editor">
                                <p class="p-box">No items for <b>layout_id=${layout_id}</b>.</p>
                            </div>
                        </div>
                    `);

                    // outputBar.start(speed = 10);
                    outputBar.finish();
                } else {
                    // save response to wbld.project_json
                    wbld.project_json = response;
                    output_content(response, outputBar);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", errorThrown);
            },
        });

    } else {
        const response = wbld.project_json;
        output_content(response, outputBar);
    }
    
}

function output_content(response, outputBar) {
    let items_n = 0;

    all_possible_products_srcs = [];

    //sort rooms_list by room_position_output ASC
    response.data.rooms_list.sort((a, b) => a.room_position_output - b.room_position_output);
    
    response.data.rooms_list.forEach( function(room) {
        
        if (room.room_has_moodboard == "Y" && room.products_list.length > 0) {

            items_n += room.products_list.length;
        
            jQuery('#output').append(`
                <div class="widget-container">
                    <div class="heading-subtitle room-budget-title" data-room_id="${room.room_id}" data-room_name="${encodeURIComponent(room.room_name)}" data-room_budget="${room.room_budget}">${room.room_name}: ${Number(room.room_budget).toLocaleString()} ${room.room_budget_currency}</div>
                    <div class="heading-subtitle total-budget-title"></div>
                </div>
            `);

            const wcDiv = document.createElement('div');
            wcDiv.className = 'widget-container';

            const pmbDiv = document.createElement('div');
            pmbDiv.className = 'product-mood-board';
            
            //pmbDiv.appendChild(tempDiv);
            wcDiv.appendChild(pmbDiv);
            jQuery('#output').append(wcDiv);

            // get pmbDiv css width with jQuery
            var getWidth;
            getWidth = function($el){
                return $el.offsetWidth || getWidth($el.parentElement);
            }
            let roomMoodboardWidth = getWidth(pmbDiv);
            if (roomMoodboardWidth > 650) {
                roomMoodboardWidth = 650;
            }
            const roomMoodboardHeight = roomMoodboardWidth * parseInt(room.room_moodboard_height) / 10;
            pmbDiv.style.height = roomMoodboardHeight + 'px';

            // Assuming room.products_list is an array of objects with the parameter item_significance
            room.products_list.sort((a, b) => b.item_significance - a.item_significance);
            for (let i = 0; i < room.products_list.length; i++) {
                const product = room.products_list[i];

                const productDiv = document.createElement('div');
                productDiv.className = 'product-div';

                const img = document.createElement('img');
                img.className = 'product-div-img';
                img.src = get_bucket(product.product_image, product.product_shop);
                
                img.dataset.product = JSON.stringify(product);
                img.dataset.product_id = product.product_id;
                img.dataset.room_id = room.room_id;
                img.dataset.product_price = product.product_price;
                img.dataset.product_currency = product.product_currency;
                img.dataset.item_ax = product.item_ax;

                // Filter the array based on the condition item_id == product.item_id
                // const filteredList = room.products_list_total.filter(item => item.item_id === product.item_id);
                // new version product.item_ids.includes(item.item_id)
                const filteredList = room.products_list_total.filter(item => product.item_ids.includes(item.item_id));
                // Loop through the filtered list and add item_ids, item_ax to each item
                filteredList.forEach(item => {
                    item.item_ids = product.item_ids;
                    item.item_ax = product.item_ax;
                });

                // Convert the filtered array to a string and store it in the 'data-products_list_total' attribute
                img.dataset.products_list_total = JSON.stringify(filteredList);

                // Add all room.products_list_total img src to the array of all possible product images
                room.products_list_total.forEach( function (item) {
                    all_possible_products_srcs.push(get_bucket(item.product_image, item.product_shop));
                });

                const cartIcon = document.createElement('div');
                cartIcon.className = 'cart-icon';
                const cartIconImg = document.createElement('img');
                cartIconImg.className = 'cart-icon-img';
                cartIconImg.src = wbld.pics + 'cart-icon.webp';
                cartIconImg.width = 32;
                cartIconImg.height = 32;
                cartIconImg.alt = 'Link to Store';
                
                const cartIconA = document.createElement('a');
                cartIconA.href = get_url(product.product_url);
                cartIconA.target = '_blank';
                cartIconA.rel = 'noopener';
                cartIconA.className = 'btn-product-link';
                cartIconA.dataset.product_id = product.product_id;
                cartIconA.dataset.product_sku = product.product_sku;
                cartIconA.dataset.product_name = product.product_name;
                cartIconA.dataset.product_price = product.product_price;
                cartIconA.dataset.product_currency = product.product_currency;
                cartIconA.dataset.item_name = product.item_name;
                cartIconA.dataset.item_amount = product.item_amount;
                cartIconA.dataset.item_ax = product.item_ax;
                cartIconA.dataset.room_id = room.room_id;
                cartIconA.appendChild(cartIconImg);
                cartIcon.appendChild(cartIconA);
                productDiv.appendChild(cartIcon);

                if (i == room.products_list.length - 1 && wbld.onboardingClickOn) {
                    const fingerClick = document.createElement('div');
                    fingerClick.className = 'finger-click';
                    const fingerClickImg = document.createElement('img');
                    fingerClickImg.src = wbld.pics + 'hand-cursor-icon-clip-art-free-png.webp';
                    fingerClickImg.width = 89;
                    fingerClickImg.height = 100;
                    fingerClickImg.alt = 'Click to change image';

                    fingerClickImg.dataset.product = JSON.stringify(product);
                    fingerClickImg.dataset.product_id = product.product_id;
                    fingerClickImg.dataset.room_id = room.room_id;
                    fingerClickImg.dataset.product_price = product.product_price;
                    fingerClickImg.dataset.product_currency = product.product_currency;
                    fingerClickImg.dataset.item_ax = product.item_ax;
                    fingerClickImg.dataset.products_list_total = JSON.stringify(filteredList);

                    fingerClick.appendChild(fingerClickImg);
                    productDiv.appendChild(fingerClick);

                }
                
                productDiv.appendChild(img);

                pmbDiv.appendChild(productDiv);
                setCoordinates(roomMoodboardWidth, roomMoodboardHeight, productDiv, JSON.parse(product.item_ax));
            }

        }
        
    });

    // Add total budget
    jQuery(".total-budget-title").text(`Total: ${Number(response.data.budget_total).toLocaleString()} ${response.data.budget_total_currency}`);
    jQuery(".total-budget-title").data("budget_total", response.data.budget_total);

    // Add buttons back to before home and save project
    jQuery('#output').append(`
        <div class="widget-container">
            <div class="output-btns">
                <button class="output-btn-left" id="back-to-before-output-btn">Upload new image</button>
                <button class="output-btn-right" id="download-pdf-btn">Products list in PDF</button>
            </div>
        </div>
    `);

    
    // Attach load event listener to each item image
    const itemImage = jQuery('img.product-div-img').last();
    // Was problem. On last image click after request this event was triggered
    let requestNode = true;
    itemImage.on('load', function () {
        // Check if all item images have finished loading
        if (jQuery('img.product-div-img').length === items_n & requestNode) {
            // outputBar.start(speed=10);
            outputBar.finish();
            requestNode = false;
        }
    });

    // Attach click event listener to each item image in all_possible_products_srcs
    // to push them in cache
    all_possible_products_srcs.forEach( function (item) {
        const img = new Image();
        img.src = item;
    });
}

function send_ajax_request(api, method, data) {
    jQuery.ajax({
        url: api + method,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            //console.log(response);
        },
        error: function(error) {
            console.error(error);
        }
    });
}

function send_POST_to_API(api, method, data) {
    if (wbld.visitor_id != "no_data") {
        send_ajax_request(api, method, data);
        return;
    }

    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js')
            .then(FingerprintJS => FingerprintJS.load());
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            wbld.visitor_id = result.visitorId;
            //console.log("visitor_id:", wbld.visitor_id);
            // change visitor_id in data
            data.visitor_id = wbld.visitor_id;
            send_ajax_request(api, method, data);
        });
    
}

function get_bucket(product_image, product_shop) {    
    let bucket_name = wbld.products_bucket + product_shop.replace(" ", "_") + "/";
    return bucket_name + product_image;
}

function get_url(product_url) {

    if (product_url.includes("https://www.westelm.ae")) {
        admitad_url = "https://ad.admitad.com/g/03mwou5x7x21d78ab6e7cf8e2e3afe/?ulp=";
        product_url = admitad_url + encodeURIComponent(product_url);
        product_url += "&subid=" + wbld.widget_name;
        product_url += "&subid1=" + wbld.partner_id;
    }

    if (product_url.includes("https://www.potterybarn.ae")) {
        admitad_url = "https://ad.admitad.com/g/hak848wxff21d78ab6e73929b57187/?ulp=";
        product_url = admitad_url + encodeURIComponent(product_url);
        product_url += "&subid=" + wbld.widget_name;
        product_url += "&subid1=" + wbld.partner_id;
    }

    // if product_url contains ? then add & otherwise add ?
    // add utm_widget=wbld.widget_name
    if (product_url.includes("?")) {
        product_url += "&utm_widget=" + wbld.widget_name;
    } else {
        product_url += "?utm_widget=" + wbld.widget_name;
    }
    product_url += "&utm_partner=" + wbld.partner_id;
    
    return product_url;
}

function validateEmail(email) {
    // Regular expression for a simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

jQuery(document).ready(function(){
    
    jQuery(document).on('click', '.generate-btn', function(event) {
        jQuery('#bedroomsPopup').scrollTop(0);
        jQuery('#bedroomsPopup').toggleClass("done");
        
        if (wbld.visitor_id != "no_data") {
            update_output();
        } else {
            const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js')
                .then(FingerprintJS => FingerprintJS.load());
            fpPromise
                .then(fp => fp.get())
                .then(result => {
                    wbld.visitor_id = result.visitorId;
                    //console.log("visitor_id:", wbld.visitor_id);
                    update_output();
                });
        }

        // hide generate-btn
        // show save-share-btn
        jQuery('#generate-btn-block').css('display', 'none');
        jQuery('.generate-btn').css('display', 'none');
        jQuery('#save-share-btn').css('display', 'block');

        // hide before-output
        jQuery('#before-output').css('display', 'none');
        jQuery('#output').css('display', 'block');
    });
    
    jQuery(document).on('click', '.filter-btn', function(event) {
        jQuery(this).toggleClass("selected");

        // show generate-btn
        // hide save-share-btn
        // reset wbld.project_id
        wbld.project_id = 'no_data';
        jQuery('.generate-btn').css('display', 'block');
        jQuery('#save-share-btn').css('display', 'none');
    });
    
    jQuery(document).on('click', '.bedroom-btn', function(event) {
        jQuery(".bedroom-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        
        const n_bedrooms_name = decodeURIComponent(jQuery(this).data( "n_bedrooms_name" ));
        jQuery("#bedrooms-select").text(n_bedrooms_name);

        let layout_sizes = decodeURIComponent(jQuery(this).data( "n_bedrooms_layout_sizes" ));
        layout_sizes = JSON.parse(layout_sizes);
        jQuery("#layoutsize-buttons").html(`
            ${layout_sizes.map(item => `<button class="filter-btn layout_size-btn ${item.selected}" data-layout_id=${item.layout_id} data-address_id=${item.address_id} >${item.layout_size_name}</button>`).join('')}
        `);
        
        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "bedroom-btn",
            "filter_value": `n_bedrooms_name: ${n_bedrooms_name}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.layout_size-btn', function(event) {
        jQuery(".layout_size-btn").removeClass("selected");
        jQuery(this).addClass("selected");

        const layout_id = jQuery(this).data( "layout_id" );

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "layout_size-btn",
            "filter_value": `layout_id: ${layout_id}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.budget-btn', function(event) {
        jQuery(".budget-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery('#advancedPopup').scrollTop(0);
        jQuery('#advancedPopup').toggleClass("done");

        const budget_name = decodeURIComponent(jQuery(this).data( "budget_name" ));
        jQuery("#advanced-select").text(budget_name);

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "budget-btn",
            "filter_value": `budget_name: ${budget_name}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.style-btn', function(event) {
        jQuery(".style-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery('#advancedPopup').scrollTop(0);
        jQuery('#advancedPopup').toggleClass("done");

        const style_name = decodeURIComponent(jQuery(this).data( "style_name" ));

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "style-btn",
            "filter_value": `style_name: ${style_name}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });

    jQuery(document).on('click', '.country-btn', function(event) {
        jQuery(".country-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        //jQuery('#shopsPopup').scrollTop(0);
        //jQuery('#shopsPopup').toggleClass("done");
        
        const country_name = decodeURIComponent(jQuery(this).data( "country_name" ));
        const country_flag = decodeURIComponent(jQuery(this).data( "country_flag" ));
        let country_shops_list = decodeURIComponent(jQuery(this).data( "country_shops_list" ));
        country_shops_list = JSON.parse(country_shops_list);
        const shop_name_selected = country_shops_list.find(item => item.selected == "selected").shop_name;
        
        jQuery("#shops-select").html(`${shop_name_selected} ${country_flag}`);

        //update shops for selected country
        jQuery("#shops-buttons").html(`
            ${country_shops_list.map(item => `<button class="filter-btn shop-btn ${item.selected}" data-shop_id=${item.shop_id} data-shop_name=${encodeURIComponent(item.shop_name)} >${item.shop_name}</button>`).join('')}
        `);

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "country-btn",
            "filter_value": `country_name: ${country_name}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.shop-btn', function(event) {
        jQuery(".shop-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery('#shopsPopup').scrollTop(0);
        jQuery('#shopsPopup').toggleClass("done");
        
        const shop_name = decodeURIComponent(jQuery(this).data( "shop_name" ));
        const country_flag = decodeURIComponent(jQuery(".country-btn.selected").data( "country_flag" ));
        
        jQuery("#shops-select").html(`${shop_name} ${country_flag}`);

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "shop-btn",
            "filter_value": `shop_name: ${shop_name}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', function(event) {
        if (!jQuery(event.target).closest('.select-btn, .popup').length) {
            jQuery('.popup').addClass("done");
        }
    });
    
    jQuery(document).on('click', '.select-btn', function(event) { 
        let popup_id = "no_data";
        if (jQuery(this).find('#bedrooms-select').length > 0) {
            jQuery('#bedroomsPopup').toggleClass("done");
            jQuery('#shopsPopup').addClass("done");
            jQuery('#advancedPopup').addClass("done");
            popup_id = "bedroomsPopup";
        }
        
        if (jQuery(this).find('#shops-select').length > 0) {
            jQuery('#bedroomsPopup').addClass("done");
            jQuery('#shopsPopup').toggleClass("done");
            jQuery('#advancedPopup').addClass("done");
            popup_id = "shopsPopup";
        }
        
        if (jQuery(this).find('#advanced-select').length > 0) {
            jQuery('#bedroomsPopup').addClass("done");
            jQuery('#shopsPopup').addClass("done");
            jQuery('#advancedPopup').toggleClass("done");
            popup_id = "advancedPopup";
        }

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "select-btn",
            "filter_value": popup_id
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', 'a.btn-product-link', function(event) {
        const product_url = jQuery(this).attr('href');
        const product_id = jQuery(this).attr('data-product_id');
        const product_sku = jQuery(this).attr('data-product_sku');
        const product_name = jQuery(this).attr('data-product_name');
        const product_price = jQuery(this).attr('data-product_price');
        const product_currency = jQuery(this).attr('data-product_currency');
        const item_name = jQuery(this).attr('data-item_name');
        const item_amount = jQuery(this).attr('data-item_amount');
        
        const data = {
        "widget_name": wbld.widget_name,
        "visitor_id": wbld.visitor_id,
        "partner_id": wbld.partner_id,
        "product_id": product_id,
        "product_url": product_url,
        "product_sku": product_sku,
        "product_name": product_name,
        "product_price": product_price,
        "product_currency": product_currency,
        "item_name": item_name,
        "item_amount": item_amount
        };
        
        send_POST_to_API(wbld.api1, 'product_click/', data);
    });

    //open product change popup on product image click
    jQuery(document).on('click', '.product-div-img, .gray-point', function(event) {
        const product = JSON.parse(jQuery(this).attr('data-product'));
        const product_id = product.product_id;
        const productsListTotal = JSON.parse(jQuery(this).attr('data-products_list_total'));
        const room_id = jQuery(this).attr('data-room_id');
        const item_ax = jQuery(this).attr('data-item_ax');
        
        // Clear the previous content
        jQuery('#product-popup-content').empty();

        jQuery('#product-popup-content').append(`<div id="product-popup-image"><img src="${get_bucket(product.product_image, product.product_shop)}"/></div>`);

        jQuery('#product-popup-content').append(`
        <div id="product-popup-info">
            <div id="product-popup-info-title">${product.product_name}</div>
            <div id="product-popup-info-amount">Quantity: <span style="font-weight: 700;">${product.item_amount}</span></div>
            <div id="product-popup-info-price">Price: <span style="font-weight: 700;">${Number(product.product_price).toLocaleString()} ${product.product_currency}</span></div>
            <div class="product-popup-info-product-comment-btn">${product.product_comment}</div>
            <div class="product-popup-info-product-link-btn">
                <a href="${get_url(product.product_url)}" target="_blank" rel="noopener" class="btn-product-link" data-product_id="${product.product_id}" data-product_sku="${product.product_sku}" data-product_name="${product.product_name}" data-product_price="${product.product_price}" data-product_currency="${product.product_currency}" data-item_name="${product.item_name}" data-item_amount="${product.item_amount}">
                    <button class="link-btn">Link to Store</button>
                </a>
            </div>
        </div>
        `);

        jQuery('#product-popup-content').append(`<div id="product-popup-list"><div id="product-popup-list-title">Try these alternatives:</div><div id="product-popup-list-items"></div></div>`);

        // Add each product to the list
        // sort productsListTotal by price
        productsListTotal.sort((a, b) => a.product_price - b.product_price);
        productsListTotal.forEach(function(product) {
            const dataProduct = JSON.stringify(product);
            const encodedDataProduct = encodeURIComponent(dataProduct);
            jQuery('#product-popup-list-items').append(`<div id="product-popup-list-item"><img data-product_id_for_change="${product_id}" data-product=${encodedDataProduct} data-room_id=${room_id} data-item_ax_for_change="${item_ax}" src="${get_bucket(product.product_image, product.product_shop)}"/><p>${Number(product.product_price).toLocaleString()} ${product.product_currency}</p></div>`);
        });

        if (productsListTotal.length > 2 && wbld.onboardingScrollXOn) {
            const fingerScrollX = document.createElement('div');
            fingerScrollX.className = 'finger-scroll-x';
            const fingerScrollXImg = document.createElement('img');
            fingerScrollXImg.src = wbld.pics + 'hand-cursor-icon-clip-art-free-png.webp';
            fingerScrollXImg.width = 89;
            fingerScrollXImg.height = 100;
            fingerScrollXImg.alt = 'Click to change image';
            fingerScrollX.appendChild(fingerScrollXImg);
            // add fingerScrollX to product-popup-list like first child
            const productPopupList = document.getElementById('product-popup-list');
            productPopupList.insertBefore(fingerScrollX, productPopupList.firstChild);
        }

        // Show the popup
        jQuery('#product-popup').fadeIn();

        // Add the 'no-scroll' class to the body to prevent scrolling on the background content
        jQuery('body').addClass('no-scroll');

        // Close finger point and send product change event
        if (!wbld.onboardingClickOn) {
            return;
        }

        // Close finger point
        wbld.onboardingClickOn = false;
        jQuery('.finger-click').hide();

        // Send product change event
        const data = {
        "widget_name": wbld.widget_name,
        "visitor_id": wbld.visitor_id,
        "partner_id": wbld.partner_id,
        "in_product_id": product.product_id,
        "in_product_url": product.product_url,
        "in_product_name": product.product_name,
        "in_product_price": product.product_price,
        "in_product_currency": product.product_currency,
        "in_item_id": product.item_id,
        "in_item_name": product.item_name,
        "out_product_id": 0
        };
        
        send_POST_to_API(wbld.api2, 'product_change_click/', data);
    });

    // Close the popup when clicking outside the content
    jQuery(document).on('click', '#product-popup', function(event) {
        if (event.target.id === 'product-popup') {
            jQuery('#product-popup').fadeOut();

            // Remove the 'no-scroll' class from the body to allow scrolling on the background content
            jQuery('body').removeClass('no-scroll');
        }
    });

    //change product on product image click
    jQuery(document).on('click', '#product-popup-list-item img', function(event) {
        const decodedDataProduct = decodeURIComponent(jQuery(this).attr('data-product'));
        const product = JSON.parse(decodedDataProduct);
        const product_id_for_change = jQuery(this).attr('data-product_id_for_change');
        const item_ax_for_change = jQuery(this).attr('data-item_ax_for_change');
        const room_id = jQuery(this).attr('data-room_id');

        const mbProduct = jQuery(`.product-div-img[data-product_id="${product_id_for_change}"][data-room_id="${room_id}"][data-item_ax="${item_ax_for_change}"]`);
        const ProductPriceOld = mbProduct.attr('data-product_price');
        mbProduct.attr('src', get_bucket(product.product_image, product.product_shop));
        mbProduct.attr('data-product', JSON.stringify(product));
        mbProduct.attr('data-product_id', product.product_id);
        mbProduct.attr('data-product_price', product.product_price);
        //mbProduct.attr('data-product_currency', product.product_currency);
        //mbProduct.attr('data-item_ax', product.item_ax);

        const mbCartIcon = jQuery(`.cart-icon a[data-product_id="${product_id_for_change}"][data-room_id="${room_id}"][data-item_ax="${item_ax_for_change}"]`);
        mbCartIcon.attr('href', get_url(product.product_url));
        mbCartIcon.attr('data-product_id', product.product_id);
        mbCartIcon.attr('data-product_sku', product.product_sku);
        mbCartIcon.attr('data-product_name', product.product_name);
        mbCartIcon.attr('data-product_price', product.product_price);
        //mbCartIcon.attr('data-product_currency', product.product_currency);
        mbCartIcon.attr('data-item_name', product.item_name);
        mbCartIcon.attr('data-item_amount', product.item_amount);

        let projectTotalBudget = 0;
        jQuery(".total-budget-title").each(function(index, element) {
            const mbTotalBudget = jQuery(element);
            const mbTotalBudgetValue = mbTotalBudget.data("budget_total");
            const mbTotalBudgetValueNew = mbTotalBudgetValue + (product.product_price - ProductPriceOld) * product.item_amount;
            projectTotalBudget = mbTotalBudgetValueNew;
            mbTotalBudget.text(`Total: ${Number(mbTotalBudgetValueNew).toLocaleString()} ${product.product_currency}`);
            mbTotalBudget.data("budget_total", mbTotalBudgetValueNew);
        });

        const roomBudgetTitle = jQuery(`.room-budget-title[data-room_id="${room_id}"]`);
        const roomBudgetValue = roomBudgetTitle.data('room_budget');
        const roomBudgetRoomName = decodeURIComponent(roomBudgetTitle.data('room_name'));
        const roomBudgetValueNew = roomBudgetValue + (product.product_price - ProductPriceOld) * product.item_amount;
        roomBudgetTitle.text(`${roomBudgetRoomName}: ${Number(roomBudgetValueNew).toLocaleString()} ${product.product_currency}`);
        roomBudgetTitle.data("room_budget", roomBudgetValueNew);

        jQuery('#product-popup').fadeOut();
        // Remove the 'no-scroll' class from the body to allow scrolling on the background content
        jQuery('body').removeClass('no-scroll');

        // Change in wbld.project_json
        // firstly change product in product_list
        const roomIndex = wbld.project_json.data.rooms_list.findIndex(room => room.room_id === parseInt(room_id));
        //const productIndex = wbld.project_json.data.rooms_list[roomIndex].products_list.findIndex(product => product.product_id === parseInt(product_id_for_change));
        const productIndex = wbld.project_json.data.rooms_list[roomIndex].products_list.findIndex(product => {
            return product.product_id === parseInt(product_id_for_change) && product.item_ax === item_ax_for_change;
        });

        if (roomIndex !== -1 && productIndex !== -1) {
            wbld.project_json.data.rooms_list[roomIndex].products_list[productIndex] = product;
        }
        // second change room budget
        wbld.project_json.data.rooms_list[roomIndex].room_budget = roomBudgetValueNew;
        // third change total budget
        wbld.project_json.data.budget_total = projectTotalBudget;

        // Close finger scroll and send product change event
        if (!wbld.onboardingScrollXOn) {
            return;
        }

        // Close finger scroll
        wbld.onboardingScrollXOn = false;
        jQuery('.finger-scroll-x').hide();

        // Send product change event
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "partner_id": wbld.partner_id,
            "in_product_id": product.product_id,
            "in_product_url": product.product_url,
            "in_product_name": product.product_name,
            "in_product_price": product.product_price,
            "in_product_currency": product.product_currency,
            "in_item_id": product.item_id,
            "in_item_name": product.item_name,
            "out_product_id": product_id_for_change
        };
        
        send_POST_to_API(wbld.api2, 'product_change_click/', data);
    }); 

    // Inspiring Image File Upload
    jQuery(document).on('change', '#file', function(event) {
        const selectedFile = this.files[0];
        //console.log(selectedFile);
        //console.log(selectedFile.type);
        //console.log(selectedFile.size);
        //console.log(URL.createObjectURL(selectedFile));
        if (selectedFile) {
            const imgElement = document.createElement('img');
            imgElement.className = 'inspiring-image';
            imgElement.alt = 'Inspiring Image';
            imgElement.dataset.inspiring_image_id = '0';
            imgElement.dataset.inspiring_image_name = 'no_data';
            imgElement.src = URL.createObjectURL(selectedFile);
            imgElement.onload = () => {
                URL.revokeObjectURL(imgElement.src);
            };
            $('#file-preview').empty(); // Clear previous content
            $('#file-preview').append(imgElement);

            jQuery('.inspiring-image').removeClass('img-selected');
            jQuery('#file-preview img').addClass('img-selected');

            $('#file-preview').show(); // Show the file preview div
            $('#file-upload').hide(); // Hide the file upload div
        }

        // send filter button click to API
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "input file",
            "filter_value": selectedFile.name
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });

    // Inspiring Image img-selected click
    jQuery(document).on('click', '.inspiring-image', function(event) {
        jQuery('.inspiring-image').removeClass('img-selected');
        jQuery(this).addClass('img-selected');

        const inspiring_image_id = jQuery(this).data( "inspiring_image_id" );

        // send filter button click to API
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "inspiring-image",
            "filter_value": inspiring_image_id
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });

    // Open Web Share API on save-share-btn click
    jQuery(document).on('click', '#save-share-btn', function(event) {
        const visitor_id = wbld.visitor_id;
        const timestamp = Date.now();

        // Combine visitor ID and timestamp into a single string
        const hash = `${visitor_id}${timestamp}`;
        //console.log(`Unique URL hash ${hash}, length ${hash.length}`);

        // get selected shop_name
        const shop_name = decodeURIComponent(jQuery(".shop-btn.selected").data( "shop_name" ));
        let url = wbld.widget_url;
        if (url.includes("project_id=")) {
            url = url.replace(/project_id=\w+/, "project_id=" + hash);
        } else if (url.includes("?")) {
            url += "&project_id=" + hash;
        } else {
            url += "?project_id=" + hash;
        }
        const title = 'AI furniture mood boards from ' + shop_name;
        const text = 'AI furniture mood boards from ' + shop_name;

        const shareData = {
            title: title,
            text: text,
            url: url,
        }
        if (navigator.share) {
            navigator.share(shareData)
                //.then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));
        }

        //console.log('Your browser does not support Web Share API');

        // Copy link in clipboard and show copyMessage
        navigator.clipboard.writeText(url)
            //.then(() => console.log('Link copied to clipboard'))
            .catch((error) => console.log('Copy failed', error));
        
        jQuery('#copyMessage').css('display', 'block');
        setTimeout(() => {
            jQuery('#copyMessage').css('display', 'none');
        }, 2000);

        // get all filters buttons selected
        wbld.filters_json = {}
        wbld.filters_json.country_id = jQuery(".country-btn.selected").data( "country_id" );
        wbld.filters_json.shop_id = jQuery(".shop-btn.selected").data( "shop_id" );
        wbld.filters_json.style_id = jQuery(".style-btn.selected").data( "style_id" );
        wbld.filters_json.budget_id = jQuery(".budget-btn.selected").data( "budget_id" );
        wbld.filters_json.n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
        wbld.filters_json.layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );

        // send save-share-btn click to API
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "partner_id": wbld.partner_id,
            "filters_json": JSON.stringify(wbld.filters_json),
            "project_id": hash,
            "project_json": JSON.stringify(wbld.project_json),
        };
        send_POST_to_API(wbld.api1, "user_project/", data);
    });

    // back-to-before-output-btn click
    jQuery(document).on('click', '#back-to-before-output-btn', function(event) {
        // show generate-btn
        // hide save-share-btn
        // reset wbld.project_id
        wbld.project_id = 'no_data';
        jQuery('.generate-btn').css('display', 'block');
        jQuery('#save-share-btn').css('display', 'none');

        // hide inspiring image preview
        jQuery('#file-preview').hide();
        jQuery('#file').val('');
        jQuery('#file-upload').show();

        // select inspiring image 1
        jQuery('.inspiring-image').removeClass('img-selected');
        jQuery('.inspiring-image[data-inspiring_image_id="1"]').addClass('img-selected');

        jQuery('#before-output').css('display', 'block');
        jQuery('#output').css('display', 'none');

        // scroll to top
        jQuery('#before-output').scrollTop(0);

        // send filter button click to API
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "back-to-before-output-btn",
            "filter_value": "click"
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });

    // download-btn click
    jQuery(document).on('click', '#download-pdf-btn', function(event) {
        // Clear the previous content
        jQuery('#product-popup-content').empty();

        // Add input box for email
        // Button to send email
        jQuery('#product-popup-content').append(`
            <div class="widget-container">
                <div id="email-block">
                    <div id="email-title">Enter your email and we will send you the list of products with store links and quantity</div>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                    <div id="email-error"></div>
                    <button id="email-btn">Send PDF</button>
                </div>
            </div>
        `);

        // Show the popup
        jQuery('#product-popup').fadeIn();

        // stop body scroll
        jQuery('body').addClass('no-scroll');

        // send filter button click to API
        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "download-pdf-btn",
            "filter_value": "click"
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });

    // send-email-btn click
    jQuery(document).on('click', '#email-btn', function(event) {
        let email = jQuery('#email').val();
        email = email.trim();

        if (!validateEmail(email)) {
            jQuery('#email-error').text('Invalid email address');
            jQuery('#email-error').css('display', 'block');
            return;
        }

        jQuery('#email-error').css('display', 'none');
        //console.log(email);
        //console.log("Logic like share. Send email with link to project_id");
        // send email with link to project_id
        const visitor_id = wbld.visitor_id;
        const timestamp = Date.now();

        // Combine visitor ID and timestamp into a single string
        const hash = `${visitor_id}${timestamp}`;
        //console.log(`Unique URL hash ${hash}, length ${hash.length}`);

        // get selected shop_name
        const shop_name = decodeURIComponent(jQuery(".shop-btn.selected").data( "shop_name" ));
        const n_bedrooms_name = decodeURIComponent(jQuery(".bedroom-btn.selected").data( "n_bedrooms_name" ));
        const n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
        const layout_name = jQuery(".layout_size-btn.selected").text();
        let url = wbld.widget_url;
        if (url.includes("project_id=")) {
            url = url.replace(/project_id=\w+/, "project_id=" + hash);
        } else if (url.includes("?")) {
            url += "&project_id=" + hash;
        } else {
            url += "?project_id=" + hash;
        }
        const title = 'Your design is ready, ' + n_bedrooms_name + ' ' + shop_name;
        const text = n_bedrooms_name + ' ' + shop_name;

        // get all filters buttons selected
        wbld.filters_json = {}
        wbld.filters_json.country_id = jQuery(".country-btn.selected").data( "country_id" );
        wbld.filters_json.shop_id = jQuery(".shop-btn.selected").data( "shop_id" );
        wbld.filters_json.style_id = jQuery(".style-btn.selected").data( "style_id" );
        wbld.filters_json.budget_id = jQuery(".budget-btn.selected").data( "budget_id" );
        wbld.filters_json.n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
        wbld.filters_json.layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );

        // send email-btn click to API
        const data = {
            widget_name: wbld.widget_name,
            visitor_id: wbld.visitor_id,
            partner_id: wbld.partner_id,
            filters_json: JSON.stringify(wbld.filters_json),
            project_id: hash,
            project_json: JSON.stringify(wbld.project_json),
            title: title,
            text: text,
            url: url,
            email: email,
            bedroom_name: n_bedrooms_name,
            n_bedrooms: n_bedrooms,
            layout_name: layout_name,
            shop_name: shop_name,
        };
        //console.log(sharedData);
        send_POST_to_API(wbld.api1, "send_email/", data);


        // close product-popup
        jQuery('#product-popup').fadeOut();
        jQuery('body').removeClass('no-scroll');
    });
    
});
