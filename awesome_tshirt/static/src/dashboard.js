/** @odoo-module **/

import { Counter } from "./counter/counter";
import { TodoList } from "./todo_list/todo_list";
import { Card } from "./card/card";
import { registry } from "@web/core/registry";

const { Component } = owl;

class AwesomeDashboard extends Component {}

AwesomeDashboard.components = { Counter, TodoList, Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
