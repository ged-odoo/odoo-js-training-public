/** @odoo-module **/

import tour from "web_tour.tour";

tour.register(
    "order_tour",
    {
        url: '/awesome_tshirt/order',
        test: true,
    },
    [
        {
            content: 'Put an image url',
            trigger: '#url',
            run: 'text test_url'
        },
        {
            content: 'Put a name',
            trigger: '#name',
            run: 'text test_name'
        },
        {
            content: "Add quantity",
            trigger: "#quantity",
            run: "text 123456",
        },
        {
            content: 'Put an address',
            trigger: '#address',
            run: 'text test_address'
        },
        {
            content: 'Put an email',
            trigger: '#email',
            run: 'text test_email'
        },
        {
            content: "Order",
            trigger: "button",           
            run: "click",
        },
        {
            content: "Acces to /web",
            trigger: "button",
            run: () => {
                window.location.href = '/web';
            }
        },
        tour.stepUtils.showAppsMenuItem(),
        {
            content: "Go to awesome_tshirt app",
            trigger: '.o_app[data-menu-xmlid="awesome_tshirt.menu_root"]',
        },
        {
            content: "Go to order",
            trigger: 'a[data-menu-xmlid="awesome_tshirt.order"]',
        },
        {
            content: "Switch to list view",
            trigger: ".o_list",
            run: "click",
        },
        {
            content: "Is the new line there",
            trigger: ".o_list_number:contains('123,456')",
        },
    ]
);
