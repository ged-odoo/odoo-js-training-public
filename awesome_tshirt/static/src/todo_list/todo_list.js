/** @odoo-module */

import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";

const { Component, useState } = owl;

export class TodoList extends Component {
    setup() {
        this.nextId = 0;
        this.todoList = useState([]);
        useAutofocus("todoListInput");
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != "") {
            this.todoList.push({ id: this.nextId++, description: ev.target.value, done: false });
            ev.target.value = "";
        }
    }

    toggleTodo(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    removeTodo(todoId) {
        const todoIndex = this.todoList.findIndex((todo) => todo.id === todoId);
        if (todoIndex >= 0) {
            this.todoList.splice(todoIndex, 1);
        }
    }
}

TodoList.components = { Todo };
TodoList.template = "awesome_tshirt.TodoList";
