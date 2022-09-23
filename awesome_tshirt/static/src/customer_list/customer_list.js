/** @odoo-module */

import { useService } from "@web/core/utils/hooks";

const { Component, onWillStart } = owl;

export class CustomerList extends Component {
    setup() {
        this.orm = useService("orm");
        onWillStart(async () => {
            this.partners = await this.orm.searchRead("res.partner", [], ["display_name"]);
        });
    }
}

CustomerList.template = "awesome_tshirt.CustomerList";

CustomerList.props = {
    selectCustomer: {
        type: Function,
    },
};
