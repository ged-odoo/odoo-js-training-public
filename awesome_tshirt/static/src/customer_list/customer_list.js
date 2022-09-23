/** @odoo-module */

import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";

const { Component, onWillStart, useState } = owl;

export class CustomerList extends Component {
    setup() {
        this.orm = useService("orm");
        this.partners = useState({ data: [] });
        this.domain = [];
        this.keepLast = new KeepLast();
        onWillStart(async () => {
            this.partners.data = await this.loadCustomers();
        });
    }

    async onChangeActiveCustomers(ev) {
        const checked = ev.target.checked;
        this.domain = checked ? [["has_active_order", "=", true]] : [];
        this.partners.data = await this.keepLast.add(this.loadCustomers());
    }

    loadCustomers() {
        return this.orm.searchRead("res.partner", this.domain, ["display_name"]);
    }
}

CustomerList.template = "awesome_tshirt.CustomerList";

CustomerList.props = {
    selectCustomer: {
        type: Function,
    },
};
