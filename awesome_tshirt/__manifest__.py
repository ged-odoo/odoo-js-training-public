# -*- coding: utf-8 -*-
{
    'name': "Awesome Shirt",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        This app helps you to manage a business of printing customized t-shirts
        for online customers. It offers a public page allowing customers to make
        t-shirt orders.

        Note that this is just a toy app intended to learn the javascript
        framework.
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",

    'category': 'Productivity',
    'version': '0.1',
    'application': True,
    'installable': True,


    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'mail', 'awesome_gallery'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_tshirt/static/src/**/*',
            'awesome_tshirt/static/tests/**/*',
            ('remove', 'awesome_tshirt/static/src/dashboard/**/*'),
        ],
        'awesome_tshirt.dashboard': [
            # To include bootstrap scss variables
            ("include", 'web._assets_helpers'), 
            ('include', 'web._assets_backend_helpers'),
            'awesome_tshirt/static/src/dashboard/**/*',
        ],
        'web.order_tests': [
            ("include", 'web.assets_frontend'), 
            'awesome_tshirt/static/tests/**/*',
        ],
    }
}
