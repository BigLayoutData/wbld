var wbld = { 
    widget_name: 'no_data',
    widget_domain: 'no_data',
    visitor_id: 'no_data',
    partner_id: 'no_data',
    progressBarIntervalId: 0,
    waitBarIntervalId: 0,
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

        // add loading bar
        $('#' + id).append(`
            <div class="widget-container" id="loading-bar">
                <div class="loading-bar-text-editor">
                    <p class="p-box">We are downloading your widget!</p>
                    <div class="progress">
                        <div class="bar"></div>
                        <div class="label">0%</div>
                    </div>
                </div>
            </div>
        `);

        // start progress bar
        startLoadingProgressBar(200);

        // set widget name
        this.widget_name = widget_name;

        // get domain name
        this.widget_domain = location.hostname;

        // get url params
        url_search_params = new URLSearchParams(window.location.search);
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
        };
        //console.log("data:", data);
        $.ajax({
            url: this.api1 + 'check_widget/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                if (response.data.widget_status == 'active') {
                    // get visitor_id and start widget draw
                    fpPromise
                        .then(fp => fp.get())
                        .then(result => {
                            start(
                                result.visitorId,
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
                        })
                } else {
                    console.log(`Widget widget_name="${widget_name}" status is not active`);
                }
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

function start(visitor_id, widget_addresses, widget_address_address, widget_address_id, widget_layout_id, widget_n_bedrooms, widget_budgets, widget_styles, widget_shops, widget_parameters) {

    // widget parameters
    widget_parameters = JSON.parse(widget_parameters);

    // add widget styles
    wbld.addStyles(font_style_href=widget_parameters.widget_font_link);

    // set widget font family and color
    const root = document.documentElement;
    root.style.setProperty('--widget-font', widget_parameters.widget_font);
    root.style.setProperty('--btn-color', widget_parameters.btn_color);
    root.style.setProperty('--btn-font-color', widget_parameters.btn_font_color);

    // set visitor_id
    wbld.visitor_id = visitor_id;
    
    $("#wbld").append($('<div id="mainbar"></div>'));
    
    $("#mainbar").append($('<div id="input"></div>'));
    $("#input").append($('<div id="input-line-1"></div>'));
    $("#input").append($('<div id="input-line-2"></div>'));
    $("#mainbar").append($('<div id="output"></div>'));
    $("#mainbar").append($('<div id="product-popup" style="display: none;"></div>'));
    $("#mainbar").append($('<div id="poweredby"></div>'));

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

    // widget shops
    widget_shops = decodeURIComponent(widget_shops);
    const shops_list = JSON.parse(widget_shops);

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
    
    generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, shops_list, styles_list, budgets_list, click_n);

    generate_output();

    generate_product_popup();
    
    generate_poweredby();
}

function generate_input(addresses_list, address_id, layout_id, n_bedrooms_list, shops_list, styles_list, budgets_list, click_n) {

    $('#input-line-1').append(`
        <div class="input-block-left">
            
            <div class="widget-container">
                <div class="small-text">Furniture Store</div> 
                <div class="select-btn">
                    <div id="shops-select" class="select">${shops_list.find(item => item.selected === 'selected').shop_name}</div>
                </div>
                <div id="shopsPopup" class="popup done">
                
                    <div class="widget-container">
                        <div class="small-text">Pick Furniture Ftore</div>
                        <div id="shops-buttons">
                            ${shops_list.map(item => `<button class="filter-btn shop-btn ${item.selected}" data-shop_id=${item.shop_id} data-shop_name=${encodeURIComponent(item.shop_name)}>${item.shop_name}</button>`).join('')}
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    `);

    $('#input-line-1').append(`
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
                        <button class="generate-btn " style="float: right; width: 220px;" data-click_n=${click_n}>Close and Create Project</button>
                    </div>

                    <div class="widget-container" id="building-scroll">
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
    
    $('#input-line-2').append(`
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
    
    $('#input-line-2').append(`
        <div class="input-block-right" id="generate-btn-block">

            <div class="widget-container">
                <div class="small-text">&nbsp;</div> 
                <button class="generate-btn generate-btn-block" data-click_n=${click_n}>Create Project</button>
            </div>

        </div>
    `);
    
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
        if (imagesLoaded === 2) {
            startLoadingProgressBar(1);
        }
    }

    $('#output').append(`
        <div class="widget-container">
            <div class="onboarding-images">
                <div class="onboarding-image-left">
                    <img src="${wbld.pics + 'onboarding-main-left.webp'}" width="328" height="700" alt="Onboarding how to pick store." />
                </div>
                <div class="onboarding-image-right">
                    <img src="${wbld.pics + 'onboarding-main-right.webp'}" width="328" height="700" alt="Onboarding how to pick layout." />
                </div>
            </div>
        </div>
    `);

    // Attach load event listener to each image
    $(".onboarding-images img").on("load", imageLoaded);
}

function generate_product_popup() {
    $('#product-popup').append(`
        <div class="widget-container">
            <div id="product-popup-content"></div>
        </div>
    `);
}

function generate_poweredby() {
    $('#poweredby').append(`
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
            </div>
        </div>
    `);
}

function layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id_selected) {

    startWaitBar("wait-bar");
    $('.layout-change').css('display', 'none');
    
    $.ajax({
        url: wbld.api1 + "layouts/" + address_id + "/" + n_bedrooms + "/",
        type: "GET",
        cache: true,
        dataType: "json",
        success: function(response) {
            if (!response.data.length) {
                $(".layout-change").html(`
                    <div class="error-text-editor">
                        <p class="p-box">No layouts for <b>${n_bedrooms_name}</b>.</p>
                    </div>
                `);
                
                $('.layout-change').css('display', 'block');
                finishWaitBar("wait-bar");
            } else {
                let imagesLoaded = 0;
                const totalImages = response.data.length;

                // Create a function to handle the image load event
                function imageLoaded() {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        $('.layout-change').css('display', 'block');
                        finishWaitBar("wait-bar");
                    }
                }

                $(".layout-change").html(`
                    ${response.data.map(layout => `<div class="layout-change-block"><img src="${wbld.layout_without_items_img}${layout.layout_img_without_items}" data-layout_id=${layout.layout_id} data-layout_min_budgets=${layout.layout_min_budgets} data-layout_max_budgets=${layout.layout_max_budgets} /><div class="layout-change-description">Floors: ${layout.layout_floors}</div><div class="layout-change-description">Area: ${(layout.layout_area_from < layout.layout_area_to) ? Math.round(layout.layout_area_from) + ' - ' + Math.round(layout.layout_area_to) : Math.round(layout.layout_area_from)} m2</div></div>`).join('')}
                `);

                // Attach load event listener to each image
                $(".layout-change img").on("load", imageLoaded);

                if (layout_id_selected) {
                    $(`.layout-change img[data-layout_id='${layout_id_selected}']`).addClass("img-selected");
                    $("#layout-change").data('layout_id', layout_id_selected);
                    
                    update_price_budget_range(layout_id_selected);
                } else {
                
                    // select first of child 
                    const firstChild = $('.layout-change img');
                    if (firstChild) {
                        const layout_id = firstChild.data('layout_id');
                        $("#layout-change").data('layout_id', layout_id);
                        $(`.layout-change img[data-layout_id='${layout_id}']`).addClass("img-selected");
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
    let layout_min_budgets = $(`.layout-change img[data-layout_id='${layout_id_selected}']`).data( "layout_min_budgets" );
    let layout_max_budgets = $(`.layout-change img[data-layout_id='${layout_id_selected}']`).data( "layout_max_budgets" );
    
    layout_min_budgets = decodeURIComponent(layout_min_budgets);
    layout_max_budgets = decodeURIComponent(layout_max_budgets);
    
    layout_min_budgets = JSON.parse(layout_min_budgets);
    layout_max_budgets = JSON.parse(layout_max_budgets);
    
    const style = decodeURIComponent($(".style-btn.selected").data( "style_name" ));
    const shop = decodeURIComponent($(".shop-btn.selected").data( "shop_name" ));
    
    // Retrieve the budget based on the shop and style values
    const layout_min_budget = layout_min_budgets[shop][style];
    const layout_max_budget = layout_max_budgets[shop][style];
    
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
    
    const budgetButtonSelected = $('.filter-btn.budget-btn.selected');
    
    let budgetButtons = $('.filter-btn.budget-btn');
    let budgetButtonCount = budgetButtons.length;
    
    // Add more budgetButtons if budgets.length is greater than budgetButtonCount
    if (budgets.length > budgetButtonCount) {
        for (let i = budgetButtonCount; i < budgets.length; i++) {
            const max_budget = budgets[i][0];
            const min_budget = budgets[i][1];
            const budgetId = i;
            let budgetName = `${max_budget.toLocaleString()} AED`;
            if (budgetId == 0) {
                budgetName = `All`;
            }
            
            const newButton = $('<button class="filter-btn budget-btn"></button>');
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
    
    budgetButtons = $('.filter-btn.budget-btn');
    budgetButtonCount = budgetButtons.length;
    
    budgetButtons.each(function () {
        //console.log("budgetButton:", $(this));
        const budgetId = $(this).data('budget_id');
        //console.log("budgets:", budgets);
        const max_budget = budgets[budgetId][0];
        const min_budget = budgets[budgetId][1];
        let budgetName = `${max_budget.toLocaleString()} AED`;
        if (budgetId == 0) {
            budgetName = `All`;
        }
    
        $(this).data('max_budget', max_budget);
        $(this).data('min_budget', min_budget);
        $(this).data('budget_name', budgetName);
        $(this).text(budgetName);
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
    $("#output").empty();

    //console.log("click_n:", click_n,"address_id:", address_id, "layout_id:", layout_id);

    // check layout_id not null
    if (!layout_id) {
        $('#output').append(`
            <div class="widget-container">
                <div class="text-editor">
                    <p class="p-box">You need to choose layout.</p>
                </div>
            </div>
        `);
        return;
    }
    
    // add progress bar
    $('#output').append(`
        <div class="widget-container" id="progress-bar">
            <div class="text-editor">
                <p class="p-box">We are selecting furniture that fits your layout!</p>
                <div class="progress">
                    <div class="bar"></div>
                    <div class="label">0%</div>
                </div>
            </div>
        </div>
    `);
    
    // start progress bar
    startProgressBar(200);
    
    const min_budget = $(".budget-btn.selected").data( "min_budget" );
    const max_budget = $(".budget-btn.selected").data( "max_budget" );
    const style = $(".style-btn.selected").data( "style_name" );
    const shop = $(".shop-btn.selected").data( "shop_name" );
    
    $.ajax({
        url: wbld.api2 + "generate/" + wbld.widget_name + "/" + wbld.visitor_id + "/" + wbld.partner_id + "/" + click_n + "/" + address_id + "/" + layout_id + "/" + style + "/" + shop + "/" + min_budget + "/" + max_budget + "/",
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(response) {
            if ( !response.data.address_id ) {
                $('#output').append(`
                    <div class="widget-container">
                        <div class="text-editor">
                            <p class="p-box">No items for <b>address_id=${address_id}</b> and <b>layout_id=${layout_id}</b>.</p>
                        </div>
                    </div>
                `);
                
                startProgressBar(1);
            
            } else {
                
                let items_n = 0;

                all_possible_products_srcs = [];

                //sort rooms_list by room_position_output ASC
                response.data.rooms_list.sort((a, b) => a.room_position_output - b.room_position_output);
                
                response.data.rooms_list.forEach( function(room) {
                    
                    if (room.room_has_moodboard == "Y" && room.products_list.length > 0) {

                        items_n += room.products_list.length;
                    
                        $('#output').append(`
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
                        $('#output').append(wcDiv);

                        roomMoodboardHeight = parseInt(room.room_moodboard_height) / 10;
                        pmbDiv.style.height = pmbDiv.offsetWidth * roomMoodboardHeight + 'px';

                        // Assuming room.products_list is an array of objects with the parameter item_significance
                        room.products_list.sort((a, b) => b.item_significance - a.item_significance);
                        for (let i = 0; i < room.products_list.length; i++) {
                            const product = room.products_list[i];

                            const productDiv = document.createElement('div');
                            productDiv.className = 'product-div';

                            const img = document.createElement('img');
                            img.src = get_bucket(product.product_image, product.product_shop);
                            
                            img.dataset.product = JSON.stringify(product);
                            img.dataset.product_id = product.product_id;
                            img.dataset.room_id = room.room_id;
                            img.dataset.product_price = product.product_price;
                            img.dataset.product_currency = product.product_currency;

                            // Filter the array based on the condition item_id == product.item_id
                            // const filteredList = room.products_list_total.filter(item => item.item_id === product.item_id);
                            // new version product.item_ids.includes(item.item_id)
                            const filteredList = room.products_list_total.filter(item => product.item_ids.includes(item.item_id));

                            // Convert the filtered array to a string and store it in the 'data-products_list_total' attribute
                            img.dataset.products_list_total = JSON.stringify(filteredList);

                            // Add all room.products_list_total img src to the array of all possible product images
                            room.products_list_total.forEach( function (item) {
                                all_possible_products_srcs.push(get_bucket(item.product_image, item.product_shop));
                            });
                            
                            const grayPoint = document.createElement('div');
                            grayPoint.className = 'gray-point';
                            grayPoint.dataset.product = JSON.stringify(product);
                            grayPoint.dataset.product_id = product.product_id;
                            grayPoint.dataset.room_id = room.room_id;
                            grayPoint.dataset.product_price = product.product_price;
                            grayPoint.dataset.product_currency = product.product_currency;
                            grayPoint.dataset.products_list_total = JSON.stringify(filteredList);

                            productDiv.appendChild(grayPoint);
                            productDiv.appendChild(img);

                            pmbDiv.appendChild(productDiv);
                            setCoordinates(productDiv, JSON.parse(product.item_ax));
                        }

                    }
                    
                });

                $(".total-budget-title").text(`Total: ${Number(response.data.budget_total).toLocaleString()} ${response.data.budget_total_currency}`);
                $(".total-budget-title").data("budget_total", response.data.budget_total);
                
                // next click number
                click_n += 1;
                $(".generate-btn").data("click_n", click_n);
                
                // Attach load event listener to each item image
                const itemImage = $('.product-div img').last();
                // Was problem. On last image click after request this event was triggered
                let requestNode = true;
                itemImage.on('load', function () {
                    // Check if all item images have finished loading
                    if ($('.product-div img').length === items_n & requestNode) {
                        startProgressBar(5);
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", errorThrown);
        }
    });
    
}

$(document).ready(function(){
    
    $(document).on('click', '.generate-btn', function(event) {
        const click_n = parseInt($(this).data("click_n"));
        //console.log("click_n:", click_n);
        $('#bedroomsPopup').scrollTop(0);
        $('#bedroomsPopup').toggleClass("done");
        
        let address_id = $(".address-btn.selected").data( "address_id" );
        //let layout_id = $(".img-selected").data( "layout_id" );
        let layout_id = $("#layout-change").data( "layout_id" );

        if (layout_id == null) {
            clear_input_box();
            address_id = $(".layout_size-btn.selected").data( "address_id" );
            layout_id = $(".layout_size-btn.selected").data( "layout_id" );
        }

        update_output(click_n, address_id, layout_id);
    });
    
    $(document).on('click', '.filter-btn', function(event) {
        $(this).toggleClass("selected");
        
        // change click_n to 0 after each change of filter
        set_zero_click_n();
    });
    
    $(document).on('click', '.address-btn', function(event) {
        $(".address-btn").removeClass("selected");
        $(this).addClass("selected");
        $(".address-btn").hide();
        $(this).show();
        
        const address_id = $(this).data( "address_id" );
        const n_bedrooms = $(".bedroom-btn.selected").data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent($(".bedroom-btn.selected").data( "n_bedrooms_name" ));
        
        layout_change(address_id, n_bedrooms, n_bedrooms_name, null);
        $('#layout-change-container').removeClass("done");

        // Get a reference to the bedroomsPopup and building-scroll elements
        const bedroomsPopup = document.getElementById("bedroomsPopup");
        const buildingScroll = document.getElementById("building-scroll");

        // Scroll the bedroomsPopup element to the building-scroll element
        bedroomsPopup.scrollTop = buildingScroll.offsetTop;
    });
    
    $(document).on('click', '.bedroom-btn', function(event) {
        $(".bedroom-btn").removeClass("selected");
        $(this).addClass("selected");
        
        //const address_id = $(".address-btn.selected").data( "address_id" );
        const n_bedrooms = $(this).data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent($(this).data( "n_bedrooms_name" ));
        
        $("#bedrooms-select").text(n_bedrooms_name);

        let layout_sizes = decodeURIComponent($(this).data( "n_bedrooms_layout_sizes" ));
        layout_sizes = JSON.parse(layout_sizes);
        $("#layoutsize-buttons").html(`
            ${layout_sizes.map(item => `<button class="filter-btn layout_size-btn ${item.selected}" data-layout_id=${item.layout_id} data-address_id=${item.address_id} >${item.layout_size_name}</button>`).join('')}
        `);

        const layout_id = $(".layout_size-btn.selected").data( "layout_id" );
        const address_id = $(".layout_size-btn.selected").data( "address_id" );

        $('#address-search').val('');
        $('.address-btn').hide();
        $('#layout-change-container').addClass("done");

        $(".address-btn").removeClass("selected");
        $(`.address-btn[data-address_id='${address_id}']`).addClass("selected");
        $("#layout-change").data('layout_id', layout_id);
        
        layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);
        
    });
    
    $(document).on('click', '.layout_size-btn', function(event) {
        $(".layout_size-btn").removeClass("selected");
        $(this).addClass("selected");

        $('#address-search').val('');
        $('.address-btn').hide();
        $('#layout-change-container').addClass("done");

        const address_id = $(this).data( "address_id" );
        const layout_id = $(this).data( "layout_id" );
        const n_bedrooms = $(".bedroom-btn.selected").data( "n_bedrooms" );
        const n_bedrooms_name = decodeURIComponent($(".bedroom-btn.selected").data( "n_bedrooms_name" ));

        $(".address-btn").removeClass("selected");
        $(`.address-btn[data-address_id='${address_id}']`).addClass("selected");
        $("#layout-change").data('layout_id', layout_id);

        layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);
    });
    
    $(document).on('click', '.layout-change img', function(event) {
        $(".layout-change img").removeClass("img-selected");
        $(this).addClass("img-selected");
        $('#bedroomsPopup').scrollTop(0);
        $('#bedroomsPopup').toggleClass("done");
        
        //update price range for selected layout
        const layout_id_selected = $(this).data( "layout_id" );
        $("#layout-change").data('layout_id', layout_id_selected);
        update_price_budget_range(layout_id_selected);
        
        // change click_n to 0 after each change of layout
        set_zero_click_n();
    });
    
    $(document).on('click', '.budget-btn', function(event) {
        $(".budget-btn").removeClass("selected");
        $(this).addClass("selected");
        $('#advancedPopup').scrollTop(0);
        $('#advancedPopup').toggleClass("done");
    });
    
    $(document).on('click', '.style-btn', function(event) {
        $(".style-btn").removeClass("selected");
        $(this).addClass("selected");
        $('#advancedPopup').scrollTop(0);
        $('#advancedPopup').toggleClass("done");
        
        //update price range for selected layout
        //const layout_id_selected = $(".img-selected").data( "layout_id" );
        const layout_id_selected = $("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }
    });
    
    $(document).on('click', '.shop-btn', function(event) {
        $(".shop-btn").removeClass("selected");
        $(this).addClass("selected");
        $('#shopsPopup').scrollTop(0);
        $('#shopsPopup').toggleClass("done");
        
        const shop_name = decodeURIComponent($(this).data( "shop_name" ));
        
        $("#shops-select").text(shop_name);
        
        //update price range for selected layout
        //const layout_id_selected = $(".img-selected").data( "layout_id" );
        const layout_id_selected = $("#layout-change").data( "layout_id" );
        if (layout_id_selected) {
            update_price_budget_range(layout_id_selected);
        }
    });
    
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.select-btn, .popup').length) {
            $('.popup').addClass("done");
        }
    });
    
    $(document).on('click', '.select-btn', function(event) { 
        if ($(this).find('#bedrooms-select').length > 0) {
            $('#bedroomsPopup').toggleClass("done");
            $('#shopsPopup').addClass("done");
            $('#advancedPopup').addClass("done");
        }
        
        if ($(this).find('#shops-select').length > 0) {
            $('#bedroomsPopup').addClass("done");
            $('#shopsPopup').toggleClass("done");
            $('#advancedPopup').addClass("done");
        }
        
        if ($(this).find('#advanced-select').length > 0) {
            $('#bedroomsPopup').addClass("done");
            $('#shopsPopup').addClass("done");
            $('#advancedPopup').toggleClass("done");
        }
    });
    
    $(document).on('click', 'a.btn-product-link', function(event) {
        
        const product_url = $(this).attr('href');
        const product_id = $(this).attr('data-product_id');
        const product_sku = $(this).attr('data-product_sku');
        const product_name = $(this).attr('data-product_name');
        const product_price = $(this).attr('data-product_price');
        const product_currency = $(this).attr('data-product_currency');
        const item_name = $(this).attr('data-item_name');
        const item_amount = $(this).attr('data-item_amount');
        
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
    $(document).on('click', '.product-div img, .gray-point', function(event) {
        const product = JSON.parse($(this).attr('data-product'));
        const product_id = product.product_id;
        const productsListTotal = JSON.parse($(this).attr('data-products_list_total'));
        const room_id = $(this).attr('data-room_id');
        
        // Clear the previous content
        $('#product-popup-content').empty();

        $('#product-popup-content').append(`<div id="product-popup-image"><img src="${get_bucket(product.product_image, product.product_shop)}"/></div>`);

        $('#product-popup-content').append(`
        <div id="product-popup-info">
            <div id="product-popup-info-title">${product.product_name}</div>
            <div id="product-popup-info-amount">Quantity: <span style="font-weight: 700;">${product.item_amount}</span></div>
            <div id="product-popup-info-price">Price: <span style="font-weight: 700;">${Number(product.product_price).toLocaleString()} ${product.product_currency}</span></div>
            <div class="product-popup-info-product-comment-btn">${product.product_comment}</div>
            <div class="product-popup-info-product-link-btn">
                <a href="${get_url(product.product_url)}" target="_blank" rel="noopener" class="btn-product-link" data-product_id="${product.product_id}" data-product_sku="${product.product_sku}" data-product_name="${product.product_name}" data-product_price="${product.product_price}" data-product_currency="${product.product_currency}" data-item_name="${product.item_name}" data-item_amount="${product.item_amount}">
                    <button class="link-btn">Product Details</button>
                </a>
            </div>
        </div>
        `);

        $('#product-popup-content').append(`<div id="product-popup-list"><div id="product-popup-list-title">Try these alternatives:</div><div id="product-popup-list-items"></div></div>`);

        // Add each product to the list
        // sort productsListTotal by price
        productsListTotal.sort((a, b) => a.product_price - b.product_price);
        productsListTotal.forEach(function(product) {
            const dataProduct = JSON.stringify(product);
            const encodedDataProduct = encodeURIComponent(dataProduct);
            $('#product-popup-list-items').append(`<div id="product-popup-list-item"><img data-product_id_for_change="${product_id}" data-product=${encodedDataProduct} data-room_id=${room_id} src="${get_bucket(product.product_image, product.product_shop)}"/><p>${Number(product.product_price).toLocaleString()} ${product.product_currency}</p></div>`);
        });

        // Show the popup
        $('#product-popup').fadeIn();

        // Add the 'no-scroll' class to the body to prevent scrolling on the background content
        $('body').addClass('no-scroll');

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
    $(document).on('click', '#product-popup', function(event) {
        if (event.target.id === 'product-popup') {
            $('#product-popup').fadeOut();

            // Remove the 'no-scroll' class from the body to allow scrolling on the background content
            $('body').removeClass('no-scroll');
        }
    });

    //change product on product image click
    $(document).on('click', '#product-popup-list-item img', function(event) {
        const decodedDataProduct = decodeURIComponent($(this).attr('data-product'));
        const product = JSON.parse(decodedDataProduct);
        const product_id_for_change = $(this).attr('data-product_id_for_change');
        const room_id = $(this).attr('data-room_id');

        const mbProduct = $(`.product-div img[data-product_id="${product_id_for_change}"][data-room_id="${room_id}"]`);
        const ProductPriceOld = mbProduct.attr('data-product_price');
        mbProduct.attr('src', get_bucket(product.product_image, product.product_shop));
        mbProduct.attr('data-product', JSON.stringify(product));
        mbProduct.attr('data-product_id', product.product_id);
        mbProduct.attr('data-product_price', product.product_price);
        mbProduct.attr('data-product_currency', product.product_currency);

        const mbGrayPoint = $(`.gray-point[data-product_id="${product_id_for_change}"][data-room_id="${room_id}"]`);
        mbGrayPoint.attr('data-product', JSON.stringify(product));
        mbGrayPoint.attr('data-product_id', product.product_id);
        mbGrayPoint.attr('data-product_price', product.product_price);
        mbGrayPoint.attr('data-product_currency', product.product_currency);

        $(".total-budget-title").each(function(index, element) {
            const mbTotalBudget = $(element);
            const mbTotalBudgetValue = mbTotalBudget.data("budget_total");
            const mbTotalBudgetValueNew = mbTotalBudgetValue + (product.product_price - ProductPriceOld) * product.item_amount;
            mbTotalBudget.text(`Total: ${Number(mbTotalBudgetValueNew).toLocaleString()} ${product.product_currency}`);
            mbTotalBudget.data("budget_total", mbTotalBudgetValueNew);
        });

        const roomBudgetTitle = $(`.room-budget-title[data-room_id="${room_id}"]`);
        const roomBudgetValue = roomBudgetTitle.data('room_budget');
        const roomBudgetRoomName = decodeURIComponent(roomBudgetTitle.data('room_name'));
        const roomBudgetValueNew = roomBudgetValue + (product.product_price - ProductPriceOld) * product.item_amount;
        roomBudgetTitle.text(`${roomBudgetRoomName}: ${Number(roomBudgetValueNew).toLocaleString()} ${product.product_currency}`);
        roomBudgetTitle.data("room_budget", roomBudgetValueNew);

        $('#product-popup').fadeOut();
        // Remove the 'no-scroll' class from the body to allow scrolling on the background content
        $('body').removeClass('no-scroll');

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
    $(document).on('input', '#address-search', function(event) {
        const searchTerm = $('#address-search').val().toLowerCase();
        if (searchTerm === '') {
            clear_input_box();
            return;
        }

        $('#address-buttons .address-btn').each(function () {
            const address = decodeURIComponent($(this).data('address_address')).toLowerCase();
            const address_id = $(this).data('address_id');
            if (address.includes(searchTerm) & address_id != 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Add an event listener to track user input when the input loses focus
    $(document).on('blur', '#address-search', function(event) {
        const userInput = $('#address-search').val();
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
    $(document).on('click', '#clear-button', function(event) {
        clear_input_box();
    });
    
});

function send_POST_to_API(api, method, data) {
    $.ajax({
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

function clear_input_box() {
    $('#address-search').val('');
    $('.address-btn').hide();
    $('#layout-change-container').addClass("done");

    // select address_id and layout_id from layout_sizes
    const address_id = $(".layout_size-btn.selected").data( "address_id" );
    const layout_id = $(".layout_size-btn.selected").data( "layout_id" );
    const n_bedrooms = $(".bedroom-btn.selected").data( "n_bedrooms" );
    const n_bedrooms_name = decodeURIComponent($(".bedroom-btn.selected").data( "n_bedrooms_name" ));

    $(".address-btn").removeClass("selected");
    $(`.address-btn[data-address_id='${address_id}']`).addClass("selected");

    layout_change(address_id, n_bedrooms, n_bedrooms_name, layout_id);
}

function set_zero_click_n() {
    $(".generate-btn").data("click_n", 0);
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

function startLoadingProgressBar(speedProgressBar) {
    let progress = 0;
    $("#loading-bar").css('display', 'block');
    clearInterval(wbld.progressBarIntervalId);
    wbld.progressBarIntervalId = setInterval(() => {
        progress += 1;
        updateProgressBar("#loading-bar", progress);
        if (progress === 100) { 
            clearInterval(wbld.progressBarIntervalId);
            $("#loading-bar").css('display', 'none');
            progress = 0;
            updateProgressBar("#loading-bar", progress);
            speedProgressBar = 200;
        }
    }, speedProgressBar);
}

function startProgressBar(speedProgressBar) {
    let progress = 0;
    $("#progress-bar").css('display', 'block');
    $('#generate-btn-block').css('display', 'none');
    clearInterval(wbld.progressBarIntervalId);
    wbld.progressBarIntervalId = setInterval(() => {
        progress += 1;
        updateProgressBar("#progress-bar", progress);
        if (progress === 100) { 
            clearInterval(wbld.progressBarIntervalId);
            $("#progress-bar").css('display', 'none');
            $('#generate-btn-block').css('display', 'block');
            progress = 0;
            updateProgressBar("#progress-bar", progress);
            speedProgressBar = 200;
        }
    }, speedProgressBar);
}

function updateProgressBar(id, progress) {
    const bar = document.querySelector(id + ' .bar');
    const label = document.querySelector(id + ' .label');
    bar.style.width = `${progress}%`;
    label.innerHTML = `${progress}%`;
    if (progress === 100) {
        bar.classList.add('complete');
        label.innerHTML = 'Complete!';
    }
}

function startWaitBar(wait_bar_id) {
    $('#' + wait_bar_id).css('display', 'block');
    let bar = document.querySelector(".wait-bar-bar");
    let angle = 0;
    clearInterval(wbld.waitBarIntervalId);
    wbld.waitBarIntervalId = setInterval(function() {
      angle += 5;
      bar.style.transform = "rotate(" + angle + "deg)";
      if (angle >= 360) angle = 0;
    }, 10);
}

function finishWaitBar(wait_bar_id) {
    $('#' + wait_bar_id).css('display', 'none');
}

// Initialize the agent at application startup.
// You can also use https://openfpcdn.io/fingerprintjs/v3/esm.min.js
// You can also use https://openfpcdn.io/fingerprintjs/v3
const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js')
  .then(FingerprintJS => FingerprintJS.load());

