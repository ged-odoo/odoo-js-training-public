/** @odoo-module */

const { Component } = owl;

export class Todo extends Component {}

Todo.template = "awesome_tshirt.Todo";
Todo.props = {
    id: { type: Number },
    description: { type: String },
    done: { type: Boolean },
};
