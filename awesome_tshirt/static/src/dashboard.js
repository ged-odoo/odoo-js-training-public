/** @odoo-module **/


import { Counter } from "./counter/counter";
import { Todo } from "./todo/todo";
import { registry } from "@web/core/registry";

const { Component } = owl;

class AwesomeDashboard extends Component {
    setup() {
        this.todo = { id: 3, description: "buy milk", done: false };
    }
}

AwesomeDashboard.components = { Counter, Todo };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
