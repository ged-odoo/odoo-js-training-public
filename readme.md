![Odoo Logo](https://odoocdn.com/openerp_website/static/src/img/assets/png/odoo_logo_small.png)

# Introduction to JS framework

## Introduction

For this training, we will put ourselves in the shoes of the IT staff for the fictional Awesome T-Shirt company, which is in the business of printing customised tshirts for online customers.
The Awesome T-Shirt company uses Odoo for managing its orders, and built a dedicated odoo module to manage their workflow. The project is currently a simple kanban view, with a few columns.

The usual process is the following: a customer looking for a nice t-shirt can simply order it on the Awesome T-Shirt website, and give the url for any image that he wants. He also has to fill some basic informations, such as the desired size, and amount of t-shirts. Once he confirms his order, and once the payment is validated, the system will create a task in our project application.

The Awesome T-shirt big boss, Bafien Ckinpaers, is not happy with our implementation. He believe that by micromanaging more, he will be able to extract more revenue from his employees.
As the IT staff for Awesome T-shirt, we are tasked with improving the system. Various independant tasks need to be done.

Let us now practice our odoo skills!

## Setup

Clone this repository, add it to your addons path, make sure you have
a recent version of odoo (master), prepare a new database, install the `awesome_tshirt`
addon, and ... let's get started!

## Notes

Here are some short notes on various topics, in no particular order:

- [The Odoo Javascript Ecosystem](notes_odoo_js_ecosystem.md)
- [Architecture](notes_architecture.md)
- [Views](notes_views.md)
- [Fields](notes_fields.md)
- [Concurrency](notes_concurrency.md)
- [Network requests](notes_network_requests.md)
- [Testing Odoo Code](notes_testing.md)

## Exercises

- Part 1: [🦉 Owl framework 🦉](exercises_1_owl.md)
- Part 2: [Odoo web framework](exercises_2_web_framework.md)
- Part 3: [Fields and Views](exercises_3_fields_views.md)
- Part 4: [Miscellaneous](exercises_4_misc.md)
- Part 5: [Custom kanban view](exercises_5_custom_kanban_view.md)
- Part 6: [Creating a view from scratch](exercises_6_creating_views.md)
- Part 7: [Testing](exercises_7_testing.md)
