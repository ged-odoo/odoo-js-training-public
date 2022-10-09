/** @odoo-module **/

import { registry } from "@web/core/registry";

const { Component, useState } = owl;

class AwesomeDashboard extends Component {
    setup() {
        this.state = useState({value: 1});
    }

    increment() {
        this.state.value = this.state.value + 1;
    }
}
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
