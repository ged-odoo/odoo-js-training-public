/** @odoo-module */

import { Todo } from "../todo/todo";

const { Component } = owl;

export class TodoList extends Component {
    setup() {
        this.todoList = [
            { id: 3, description: "buy milk", done: false },
            { id: 4, description: "buy eggs", done: true },
            { id: 5, description: "buy avocado", done: true },
        ];
    }
}

TodoList.components = { Todo };
TodoList.template = "awesome_tshirt.TodoList";
