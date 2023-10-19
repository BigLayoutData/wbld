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
    api1: 'https://api1.biglayoutdata.com/',
    api2: 'https://api.biglayoutdata.com/',
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
                    response.data.widget_addresses,
                    response.data.widget_address_address,
                    response.data.widget_address_id,
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
                clearInterval(this.intervalId);
                this.div.style.display = 'none';
                this.progress = 0;
                this.update();
            }
        }, speed);
    }

    update() {
        this.div.querySelector('.bar').style.maxWidth = `${this.progress}%`;
        this.div.querySelector('.label').innerHTML = `${this.progress}%`;
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
            this.update();
            if (this.progress === 100) { 
                clearInterval(this.intervalId);
                this.div.style.display = 'none';
                generateBtnBlock.style.display = 'block';
                this.progress = 0;
                this.update();
            }
        }, speed);
    }
}

function start(widget_addresses, widget_address_address, widget_address_id, widget_layout_id, widget_n_bedrooms, widget_budgets, widget_styles, widget_shops, widget_parameters) {

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
    jQuery("#mainbar").append(jQuery('<div id="output"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="product-popup" style="display: none;"></div>'));
    jQuery("#mainbar").append(jQuery('<div id="poweredby"></div>'));

    // first auto click is 0
    const click_n = 0;

    // widget addresses
    let addresses_list = widget_addresses;

    // widget address_id
    widget_address_id = decodeURIComponent(widget_address_id);
    const address_id = widget_address_id;
    //console.log("address_id:", address_id);

    // widget layout_id
    widget_layout_id = decodeURIComponent(widget_layout_id);
    const layout_id = widget_layout_id;
    //console.log("layout_id:", layout_id);

    // widget n_bedrooms
    widget_n_bedrooms = decodeURIComponent(widget_n_bedrooms);
    const n_bedrooms_list = JSON.parse(widget_n_bedrooms);
    //console.log("n_bedrooms_list:", n_bedrooms_list);

    // widget budgets
    widget_budgets = decodeURIComponent(widget_budgets);
    const budgets_list = JSON.parse(widget_budgets);

    // widget styles
    widget_styles = decodeURIComponent(widget_styles);
    const styles_list = JSON.parse(widget_styles);

    // sort addresses_list by address_address ASC
    addresses_list.sort((a, b) => {
        // Assuming `address_address` is a string, for alphanumeric sorting
        return a.address_address.localeCompare(b.address_address);
    });

    // create addresses_list.done like
    // true if address_id != 99999
    // and true if addresses_list.address_selected == selected and addresses_list.address_id == address_id
    addresses_list.forEach(function(item) {
        if (item.address_id != 99999) {
            if (item.address_selected == 'selected' && item.address_id == address_id) {
                item.address_done = '';
            } else {
                item.address_done = 'done';
            }
        } else {
            item.address_done = 'done';
        }   
    });

    // widget countries
    widget_shops = decodeURIComponent(widget_shops);
    const countries_list = JSON.parse(widget_shops);
    let shops_list = countries_list.find(item => item.selected === 'selected').shops_list;

    // get country_name from wbld.widget_domain
    // change countries_list.selected if needed
    // if share loading - not needed to change countries_list.selected
    if (wbld.project_id !== 'no_data') {
        generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, countries_list, shops_list, styles_list, budgets_list, click_n);
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
        generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, countries_list, shops_list, styles_list, budgets_list, click_n);
    } else {
        if (countries_list.length > 1) {
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
                    generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, countries_list, shops_list, styles_list, budgets_list, click_n);
                })
                .catch((error) => {
                  console.error('Error fetching IP information:', error);
                });
        }
    }
}

function generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, countries_list, shops_list, styles_list, budgets_list, click_n) {

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
                            ${n_bedrooms_list.find(item => item.selected === 'selected').layout_sizes.map(item => `<button class="filter-btn layout_size-btn ${item.selected}" data-layout_id=${item.layout_id} data-address_id=${item.address_id} >${item.layout_size_name}</button>`).join('')}
                        </div>
                    </div>

                    <div class="widget-container">
                        <button class="generate-btn" style="float: right; width: 220px;" data-click_n=${click_n}>Close and Create Project</button>
                    </div>

                    <div class="widget-container done" id="building-scroll">
                        <div class="small-text">Search Layout by Building (Optional)</div>
                        <div class="input-container">
                            <input type="text" id="address-search" placeholder="Search building name..." autocomplete="off">
                            <span class="clear-button" id="clear-button">✕</span>
                        </div>
                        <div id="address-buttons">
                            ${addresses_list.map(item => `<button class="filter-btn address-btn ${item.address_selected} ${item.address_done === "" ? "" : "done"}" data-address_id=${item.address_id} data-address_address=${encodeURIComponent(item.address_address)}>${item.address_address}</button>`).join('')}
                        </div>
                    </div>

                    <div class="widget-container ${addresses_list.filter(item => item.address_done == '').length >= 1 ? "" : "done"}" id="layout-change-container">
                        <div class="small-text">Pick Your Layout (Optional)</div>
                        <div id="layout-change" data-layout_id=${layout_id}>
                            <div id="wait-bar">
                                <div class="wait-bar-bar"></div>
                                <div class="wait-bar-spinner"></div>
                            </div>
                            <div class="layout-change"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    `);
    
    jQuery('#input-line-2').append(`
        <div class="input-block-left">
            
            <div class="widget-container">
                <div class="small-text">More Filters</div> 
                <div class="select-btn">
                    <div id="advanced-select" class="select">Advanced</div>
                </div>
                <div id="advancedPopup" class="popup done">
                
                    <div class="widget-container">
                        <div class="small-text">Pick Target Budget</div>
                        <div id="budgets-buttons">
                            ${budgets_list.map(item => `<button class="filter-btn budget-btn ${item.selected}" data-budget_id=${item.budget_id} data-max_budget=${item.max_budget} data-min_budget=${item.min_budget} data-budget_name=${encodeURIComponent(item.budget_name)}>${item.budget_name}</button>`).join('')} 
                        </div>
                    </div>
                    <div class="widget-container">
                        <div class="small-text">Choose Style</div>
                        <div id="styles-buttons">
                            ${styles_list.map(item => `<button class="filter-btn style-btn ${item.selected}" data-style_id=${item.style_id} data-style_name=${encodeURIComponent(item.style_name)}>${item.style_name}</button>`).join('')} 
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
                <button class="generate-btn" data-click_n=${click_n}>Create Project</button>
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
        generate_output();
    } else {
        // finish loadingBar
        wbld.loadingBar.start(speed=1);

        // imitate click on generate-btn
        jQuery(`.generate-btn`).click();
    }

    generate_product_popup();
    
    generate_poweredby();
    
    // Update layout based on address and number of bedrooms
    layout_change(
        address_id, 
        n_bedrooms_list.find(item => item.selected === 'selected').n_bedrooms, 
        n_bedrooms_list.find(item => item.selected === 'selected').n_bedrooms_name, 
        layout_id
    );

}

function generate_output() {
    // Create a function to handle the image load event
    let imagesLoaded = 0;
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            wbld.loadingBar.start(speed=1);
        }
    }

    jQuery('#output').append(`
        <div class="widget-container">
            <div class="onboarding-title">
                Furnish Your <span class='word-room'>Rooms</span> from Store Next Door Using <span class='word-room'>AI</span>
            </div>
            <div class="onboarding-description">
                Get started by selecting store, picking your layout, choosing style, then creating project.
            </div>
        </div>
        <div class="widget-container">
            <div class="onboarding-images">
                <div class="onboarding-image-left" >
                    <img src="${wbld.pics + 'contemporary.webp'}" width="500" height="500" alt="Contemporary style" id="contemporary-style" data-style_id="1" />
                    <div class="onboarding-image-desc" >Contemporary</div>
                </div>
                <div class="onboarding-image-right" >
                    <img src="${wbld.pics + 'neoclassic.webp'}" width="500" height="500" alt="Neoclassic style" id="neoclassic-style" data-style_id="2" />
                    <div class="onboarding-image-desc" >Neoclassic</div>
                </div>
            </div>
        </div>
    `);

    // Attach load event listener to each image
    jQuery(".onboarding-images img").on("load", imageLoaded);
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

function layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id_selected) {

    startWaitBar("wait-bar");
    jQuery('.layout-change').css('display', 'none');
    
    jQuery.ajax({
        url: wbld.api1 + "layouts/" + address_id + "/" + n_bedrooms + "/",
        type: "GET",
        cache: true,
        dataType: "json",
        success: function(response) {
            if (!response.data.length) {
                jQuery(".layout-change").html(`
                    <div class="text-editor">
                        <p class="p-box">No layouts for <b>${n_bedrooms_name}</b>.</p>
                    </div>
                `);
                
                jQuery('.layout-change').css('display', 'block');
                finishWaitBar("wait-bar");
            } else {
                let imagesLoaded = 0;
                const totalImages = response.data.length;

                // Create a function to handle the image load event
                function imageLoaded() {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        jQuery('.layout-change').css('display', 'block');
                        finishWaitBar("wait-bar");
                    }
                }

                jQuery(".layout-change").html(`
                    ${response.data.map(layout => `<div class="layout-change-block"><img src="${wbld.layout_without_items_img}${layout.layout_img_without_items}" data-layout_id=${layout.layout_id} data-layout_min_budgets=${layout.layout_min_budgets} data-layout_max_budgets=${layout.layout_max_budgets} /><div class="layout-change-description">Floors: ${layout.layout_floors}</div><div class="layout-change-description">Area: ${(layout.layout_area_from < layout.layout_area_to) ? Math.round(layout.layout_area_from) + ' - ' + Math.round(layout.layout_area_to) : Math.round(layout.layout_area_from)} m2</div></div>`).join('')}
                `);

                // Attach load event listener to each image
                jQuery(".layout-change img").on("load", imageLoaded);

                if (layout_id_selected) {
                    jQuery(`.layout-change img[data-layout_id='${layout_id_selected}']`).addClass("img-selected");
                    jQuery("#layout-change").data('layout_id', layout_id_selected);
                    
                    update_price_budget_range(layout_id_selected);
                } else {
                
                    // select first of child 
                    const firstChild = jQuery('.layout-change img');
                    if (firstChild) {
                        const layout_id = firstChild.data('layout_id');
                        jQuery("#layout-change").data('layout_id', layout_id);
                        jQuery(`.layout-change img[data-layout_id='${layout_id}']`).addClass("img-selected");
                        update_price_budget_range(layout_id);
                    } else {
                        console.log('No layout img!');
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", errorThrown);
        }
    });

}

function update_price_budget_range(layout_id_selected) {
    let layout_min_budgets = jQuery(`.layout-change img[data-layout_id='${layout_id_selected}']`).data( "layout_min_budgets" );
    let layout_max_budgets = jQuery(`.layout-change img[data-layout_id='${layout_id_selected}']`).data( "layout_max_budgets" );
    
    layout_min_budgets = decodeURIComponent(layout_min_budgets);
    layout_max_budgets = decodeURIComponent(layout_max_budgets);
    
    layout_min_budgets = JSON.parse(layout_min_budgets);
    layout_max_budgets = JSON.parse(layout_max_budgets);
    
    const style = decodeURIComponent(jQuery(".style-btn.selected").data( "style_name" ));
    const country = decodeURIComponent(jQuery(".country-btn.selected").data( "country_name" ));
    const country_currency = decodeURIComponent(jQuery(".country-btn.selected").data( "country_currency" ));
    const shop = decodeURIComponent(jQuery(".shop-btn.selected").data( "shop_name" ));
    
    // Retrieve the budget based on the shop and style values
    //const layout_min_budget = layout_min_budgets[shop][style];
    //const layout_max_budget = layout_max_budgets[shop][style];
    const layout_min_budget = layout_min_budgets[country][shop][style];
    const layout_max_budget = layout_max_budgets[country][shop][style];
    
    const budgets = [];
    // First btn id=0 is All budgets from 0 to 999999
    //budgets.push([layout_max_budget, layout_min_budget]);
    budgets.push([999999, 0]);
    
    const n_parts = 3;
    let part = (layout_max_budget - layout_min_budget) / n_parts;
    part = (part < 1000) ? 1000 : part;
    
    let nextNumber = layout_max_budget;
    while (nextNumber > layout_min_budget) {
        const max_budget = Math.ceil(nextNumber / 1000) * 1000;
        const min_budget = Math.ceil((nextNumber - part) / 1000) * 1000;
        budgets.push([max_budget, min_budget]);
        
        nextNumber -= part;
    }
    
    const budgetButtonSelected = jQuery('.filter-btn.budget-btn.selected');
    
    let budgetButtons = jQuery('.filter-btn.budget-btn');
    let budgetButtonCount = budgetButtons.length;
    
    // Add more budgetButtons if budgets.length is greater than budgetButtonCount
    if (budgets.length > budgetButtonCount) {
        for (let i = budgetButtonCount; i < budgets.length; i++) {
            const max_budget = budgets[i][0];
            const min_budget = budgets[i][1];
            const budgetId = i;
            let budgetName = `${max_budget.toLocaleString()} ${country_currency}`;
            if (budgetId == 0) {
                budgetName = `All`;
            }
            
            const newButton = jQuery('<button class="filter-btn budget-btn"></button>');
            newButton.data('max_budget', max_budget);
            newButton.data('min_budget', min_budget);
            newButton.data('budget_name', encodeURIComponent(budgetName));
            newButton.data('budget_id', budgetId);
            newButton.text(budgetName);
            
            budgetButtons.parent().append(newButton);
        }
    }
    // Remove extra budgetButtons if budgets.length is less than budgetButtonCount
    else if (budgets.length < budgetButtonCount) {
        for (let i = budgets.length; i < budgetButtonCount; i++) {
            budgetButtons.eq(i).remove();
        }
    }
    
    budgetButtons = jQuery('.filter-btn.budget-btn');
    budgetButtonCount = budgetButtons.length;
    
    budgetButtons.each(function () {
        //console.log("budgetButton:", jQuery(this));
        const budgetId = jQuery(this).data('budget_id');
        //console.log("budgets:", budgets);
        const max_budget = budgets[budgetId][0];
        const min_budget = budgets[budgetId][1];
        let budgetName = `${max_budget.toLocaleString()} ${country_currency}`;
        if (budgetId == 0) {
            budgetName = `All`;
        }
    
        jQuery(this).data('max_budget', max_budget);
        jQuery(this).data('min_budget', min_budget);
        jQuery(this).data('budget_name', budgetName);
        jQuery(this).text(budgetName);
    });
    
    let budgetIdSelected = budgetButtonSelected.data('budget_id');
    if (!budgetButtons.is(`[data-budget_id='${budgetIdSelected}']`)) {
        budgetIdSelected = 0;
        budgetButtons.removeClass('selected');
        budgetButtons.filter(`[data-budget_id='${budgetIdSelected}']`).addClass('selected');
    }
    
}

function setCoordinates(element, coords) {
    const parentWidth = element.parentNode.offsetWidth;
    const parentHeight = element.parentNode.offsetHeight;
  
    const x = coords[0] * parentWidth;
    const y =  ( 1 - coords[1] - coords[3] ) * parentHeight;
    const width = coords[2] * parentWidth;
    const height = coords[3] * parentHeight;
  
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}

function update_output(click_n, address_id, layout_id) {
    // clean output from previous info
    jQuery("#output").empty();

    //console.log("click_n:", click_n,"address_id:", address_id, "layout_id:", layout_id);

    // check layout_id not null
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
    
    const min_budget = jQuery(".budget-btn.selected").data( "min_budget" );
    const max_budget = jQuery(".budget-btn.selected").data( "max_budget" );
    const style = jQuery(".style-btn.selected").data( "style_name" );
    const country = jQuery(".country-btn.selected").data( "country_name" );
    const shop = jQuery(".shop-btn.selected").data( "shop_name" );
    
    if (wbld.project_id === 'no_data') {
        jQuery.ajax({
            url: wbld.api2 + "generate/" + wbld.widget_name + "/" + wbld.visitor_id + "/" + wbld.partner_id + "/" + click_n + "/" + address_id + "/" + layout_id + "/" + style + "/" + country + "/" + shop + "/" + min_budget + "/" + max_budget + "/",
            type: "GET",
            cache: false,
            dataType: "json",
            success: function(response) {
                if ( !response.data.address_id ) {
                    jQuery('#output').append(`
                        <div class="widget-container">
                            <div class="text-editor">
                                <p class="p-box">No items for <b>address_id=${address_id}</b> and <b>layout_id=${layout_id}</b>.</p>
                            </div>
                        </div>
                    `);
                    
                    //progressBar.start(speed=10);
                    outputBar.start(speed=10);
                
                } else {

                    // save response to wbld.project_json
                    wbld.project_json = response;
                    output_content(response, click_n, outputBar);
                    
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", errorThrown);
            }
        });
    } else {
        const response = wbld.project_json;
        output_content(response, click_n, outputBar);
    }
    
}

function output_content(response, click_n, outputBar) {
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
            
            wcDiv.appendChild(pmbDiv);
            jQuery('#output').append(wcDiv);

            roomMoodboardHeight = parseInt(room.room_moodboard_height) / 10;
            pmbDiv.style.height = pmbDiv.offsetWidth * roomMoodboardHeight + 'px';

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
                
                /*const grayPoint = document.createElement('div');
                grayPoint.className = 'gray-point';
                grayPoint.dataset.product = JSON.stringify(product);
                grayPoint.dataset.product_id = product.product_id;
                grayPoint.dataset.room_id = room.room_id;
                grayPoint.dataset.product_price = product.product_price;
                grayPoint.dataset.product_currency = product.product_currency;
                grayPoint.dataset.item_ax = product.item_ax;
                grayPoint.dataset.products_list_total = JSON.stringify(filteredList);
                productDiv.appendChild(grayPoint);*/

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

                    // Add load event listener to fingerClickImg
                    //items_n += 1;
                }
                
                productDiv.appendChild(img);

                pmbDiv.appendChild(productDiv);
                setCoordinates(productDiv, JSON.parse(product.item_ax));
            }

        }
        
    });

    jQuery(".total-budget-title").text(`Total: ${Number(response.data.budget_total).toLocaleString()} ${response.data.budget_total_currency}`);
    jQuery(".total-budget-title").data("budget_total", response.data.budget_total);
    
    // next click number
    click_n += 1;
    jQuery(".generate-btn").data("click_n", click_n);
    
    // Attach load event listener to each item image
    const itemImage = jQuery('img.product-div-img').last();
    // Was problem. On last image click after request this event was triggered
    let requestNode = true;
    itemImage.on('load', function () {
        // Check if all item images have finished loading
        if (jQuery('img.product-div-img').length === items_n & requestNode) {
            //progressBar.start(speed=10);
            outputBar.start(speed=10);
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

function clear_input_box() {
    jQuery('#address-search').val('');
    jQuery('.address-btn').hide();
    jQuery('#layout-change-container').addClass("done");

    // select address_id and layout_id from layout_sizes
    const address_id = jQuery(".layout_size-btn.selected").data( "address_id" );
    const layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );
    const n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
    const n_bedrooms_name = decodeURIComponent(jQuery(".bedroom-btn.selected").data( "n_bedrooms_name" ));

    jQuery(".address-btn").removeClass("selected");
    jQuery(`.address-btn[data-address_id='${address_id}']`).addClass("selected");

    layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);
}

function set_zero_click_n() {
    jQuery(".generate-btn").data("click_n", 0);
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

function startWaitBar(wait_bar_id) {
    jQuery('#' + wait_bar_id).css('display', 'block');
    let bar = jQuery(".wait-bar-bar");
    let angle = 0;
    clearInterval(wbld.waitBarIntervalId);
    wbld.waitBarIntervalId = setInterval(function() {
        angle += 5;
        bar.css('transform', 'rotate(' + angle + 'deg)');
        if (angle >= 360) angle = 0;
    }, 10);
}

function finishWaitBar(wait_bar_id) {
    jQuery('#' + wait_bar_id).css('display', 'none');
}

jQuery(document).ready(function(){
    
    jQuery(document).on('click', '.generate-btn', function(event) {
        const click_n = parseInt(jQuery(this).data("click_n"));
        //console.log("click_n:", click_n);
        jQuery('#bedroomsPopup').scrollTop(0);
        jQuery('#bedroomsPopup').toggleClass("done");
        
        let address_id = jQuery(".address-btn.selected").data( "address_id" );
        //let layout_id = jQuery(".img-selected").data( "layout_id" );
        let layout_id = jQuery("#layout-change").data( "layout_id" );

        if (layout_id == null) {
            clear_input_box();
            address_id = jQuery(".layout_size-btn.selected").data( "address_id" );
            layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );
        }

        if (wbld.visitor_id != "no_data") {
            update_output(click_n, address_id, layout_id);
        } else {
            const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js')
                .then(FingerprintJS => FingerprintJS.load());
            fpPromise
                .then(fp => fp.get())
                .then(result => {
                    wbld.visitor_id = result.visitorId;
                    //console.log("visitor_id:", wbld.visitor_id);
                    update_output(click_n, address_id, layout_id);
                });
        }

        // hide generate-btn
        // show save-share-btn
        jQuery('#generate-btn-block').css('display', 'none');
        jQuery('.generate-btn').css('display', 'none');
        jQuery('#save-share-btn').css('display', 'block');
    });
    
    jQuery(document).on('click', '.filter-btn', function(event) {
        jQuery(this).toggleClass("selected");
        
        // change click_n to 0 after each change of filter
        set_zero_click_n();

        // show generate-btn
        // hide save-share-btn
        // rest wbld.project_id
        wbld.project_id = 'no_data';
        jQuery('.generate-btn').css('display', 'block');
        jQuery('#save-share-btn').css('display', 'none');
    });
    
    jQuery(document).on('click', '.address-btn', function(event) {
        jQuery(".address-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery(".address-btn").hide();
        jQuery(this).show();
        
        const address_id = jQuery(this).data( "address_id" );
        const n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent(jQuery(".bedroom-btn.selected").data( "n_bedrooms_name" ));
        
        layout_change(address_id, n_bedrooms, n_bedrooms_name, null);
        jQuery('#layout-change-container').removeClass("done");

        // Get a reference to the bedroomsPopup and building-scroll elements
        const bedroomsPopup = document.getElementById("bedroomsPopup");
        const buildingScroll = document.getElementById("building-scroll");

        // Scroll the bedroomsPopup element to the building-scroll element
        bedroomsPopup.scrollTop = buildingScroll.offsetTop;

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "address-btn",
            "filter_value": `address_id: ${address_id}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.bedroom-btn', function(event) {
        jQuery(".bedroom-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        
        //const address_id = jQuery(".address-btn.selected").data( "address_id" );
        const n_bedrooms = jQuery(this).data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent(jQuery(this).data( "n_bedrooms_name" ));
        
        jQuery("#bedrooms-select").text(n_bedrooms_name);

        let layout_sizes = decodeURIComponent(jQuery(this).data( "n_bedrooms_layout_sizes" ));
        layout_sizes = JSON.parse(layout_sizes);
        jQuery("#layoutsize-buttons").html(`
            ${layout_sizes.map(item => `<button class="filter-btn layout_size-btn ${item.selected}" data-layout_id=${item.layout_id} data-address_id=${item.address_id} >${item.layout_size_name}</button>`).join('')}
        `);

        const layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );
        const address_id = jQuery(".layout_size-btn.selected").data( "address_id" );

        jQuery('#address-search').val('');
        jQuery('.address-btn').hide();
        jQuery('#layout-change-container').addClass("done");

        jQuery(".address-btn").removeClass("selected");
        jQuery(`.address-btn[data-address_id='${address_id}']`).addClass("selected");
        jQuery("#layout-change").data('layout_id', layout_id);
        
        layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);
        
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

        jQuery('#address-search').val('');
        jQuery('.address-btn').hide();
        jQuery('#layout-change-container').addClass("done");

        const address_id = jQuery(this).data( "address_id" );
        const layout_id = jQuery(this).data( "layout_id" );
        const n_bedrooms = jQuery(".bedroom-btn.selected").data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent(jQuery(".bedroom-btn.selected").data( "n_bedrooms_name" ));

        jQuery(".address-btn").removeClass("selected");
        jQuery(`.address-btn[data-address_id='${address_id}']`).addClass("selected");
        jQuery("#layout-change").data('layout_id', layout_id);

        layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "layout_size-btn",
            "filter_value": `layout_id: ${layout_id}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.layout-change img', function(event) {
        jQuery(".layout-change img").removeClass("img-selected");
        jQuery(this).addClass("img-selected");
        jQuery('#bedroomsPopup').scrollTop(0);
        jQuery('#bedroomsPopup').toggleClass("done");
        
        //update price range for selected layout
        const layout_id_selected = jQuery(this).data( "layout_id" );
        jQuery("#layout-change").data('layout_id', layout_id_selected);
        update_price_budget_range(layout_id_selected);
        
        // change click_n to 0 after each change of layout
        set_zero_click_n();

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "layout-change img",
            "filter_value": `layout_id_selected: ${layout_id_selected}`
        };
        send_POST_to_API(wbld.api2, "user_filter_click/", data);
    });
    
    jQuery(document).on('click', '.budget-btn', function(event) {
        jQuery(".budget-btn").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery('#advancedPopup').scrollTop(0);
        jQuery('#advancedPopup').toggleClass("done");

        const budget_name = decodeURIComponent(jQuery(this).data( "budget_name" ));

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
        
        //update price range for selected layout
        //const layout_id_selected = jQuery(".img-selected").data( "layout_id" );
        const layout_id_selected = jQuery("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }

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
        
        //update price range for selected layout
        //const layout_id_selected = jQuery(".img-selected").data( "layout_id" );
        const layout_id_selected = jQuery("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }

        // add class done to #building-scroll if counrty_name not UAE
        /*if (country_name != "UAE") {
            jQuery('#building-scroll').addClass("done");
        } else {
            jQuery('#building-scroll').removeClass("done");
        }*/

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
        
        //update price range for selected layout
        //const layout_id_selected = jQuery(".img-selected").data( "layout_id" );
        const layout_id_selected = jQuery("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }

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

        /*const mbGrayPoint = jQuery(`.gray-point[data-product_id="${product_id_for_change}"][data-room_id="${room_id}"][data-item_ax="${item_ax_for_change}"]`);
        mbGrayPoint.attr('data-product', JSON.stringify(product));
        mbGrayPoint.attr('data-product_id', product.product_id);
        mbGrayPoint.attr('data-product_price', product.product_price);
        //mbGrayPoint.attr('data-product_currency', product.product_currency);
        //mbGrayPoint.attr('data-item_ax', product.item_ax);*/
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

        // Close finger scroll
        wbld.onboardingScrollXOn = false;
        jQuery('.finger-scroll-x').hide();

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

    // Attach an input event listener to the search box
    jQuery(document).on('input', '#address-search', function(event) {
        const searchTerm = jQuery('#address-search').val().toLowerCase();
        if (searchTerm === '') {
            clear_input_box();
            return;
        }

        jQuery('#address-buttons .address-btn').each(function () {
            const address = decodeURIComponent(jQuery(this).data('address_address')).toLowerCase();
            const address_id = jQuery(this).data('address_id');
            if (address.includes(searchTerm) & address_id != 0) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    });

    // Add an event listener to track user input when the input loses focus
    jQuery(document).on('blur', '#address-search', function(event) {
        const userInput = jQuery('#address-search').val();
        if (userInput == '') {
            return;
        }

        const data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "user_input": userInput,
        };

        send_POST_to_API(wbld.api1, 'user_search/', data);
    });

    // Clear input address search after clear button click
    jQuery(document).on('click', '#clear-button', function(event) {
        clear_input_box();
    }); 

    // Select style on onboarding. Click on style image. Change styles buttons
    jQuery(document).on('click', '#contemporary-style, #neoclassic-style', function(event) {
        // if one or another
        if (jQuery(this).attr('id') == 'contemporary-style') {
            jQuery('#contemporary-style').addClass('img-selected');
            jQuery('#neoclassic-style').removeClass('img-selected');
        }

        if (jQuery(this).attr('id') == 'neoclassic-style') {
            jQuery('#neoclassic-style').addClass('img-selected');
            jQuery('#contemporary-style').removeClass('img-selected');
        }

        // get style_id
        const style_id = jQuery(this).data('style_id');

        jQuery(".style-btn").removeClass("selected");
        jQuery(`.style-btn[data-style_id='${style_id}']`).addClass("selected");
        
        //update price range for selected layout
        const layout_id_selected = jQuery("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }

        // send filter button click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "filter_name": "style image",
            "filter_value": jQuery(this).attr('id')
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
            //files: [new File(['Furnish-Your-Rooms.webp'], 'https://space.biglayoutdata.com/pics/Furnish-Your-Rooms.webp', { type: 'image/webp' })]
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
        wbld.filters_json.layout_size_layout_id = jQuery(".layout_size-btn.selected").data( "layout_id" );
        wbld.filters_json.address_id = jQuery(".address-btn.selected").data( "address_id" );
        wbld.filters_json.layout_id = jQuery("#layout-change").data( "layout_id" );

        // send save-share-btn click to API
        data = {
            "widget_name": wbld.widget_name,
            "visitor_id": wbld.visitor_id,
            "partner_id": wbld.partner_id,
            "filters_json": JSON.stringify(wbld.filters_json),
            "project_id": hash,
            "project_json": JSON.stringify(wbld.project_json),
        };
        send_POST_to_API(wbld.api2, "user_project/", data);
    });
    
});
