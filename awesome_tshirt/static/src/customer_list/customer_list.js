/** @odoo-module */

import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { fuzzyLookup } from "@web/core/utils/search";

const { Component, onWillStart, useState } = owl;

export class CustomerList extends Component {
    setup() {
        this.orm = useService("orm");
        this.partners = useState({ data: [] });
        this.displayedPartners = useState({ data: [] });
        this.domain = [];
        this.keepLast = new KeepLast();
        this.filterName = "";
        onWillStart(async () => {
            this.partners.data = await this.loadCustomers();
            this.displayedPartners.data = this.partners.data;
        });
    }

    async onChangeActiveCustomers(ev) {
        const checked = ev.target.checked;
        this.domain = checked ? [["has_active_order", "=", true]] : [];
        this.partners.data = await this.keepLast.add(this.loadCustomers());
        this.filterCustomers(this.filterName);
    }

    loadCustomers() {
        return this.orm.searchRead("res.partner", this.domain, ["display_name"]);
    }

    onCustomerFilter(ev) {
        this.filterName = ev.target.value;
        this.filterCustomers(ev.target.value);
    }

    filterCustomers(name) {
        if (name) {
            this.displayedPartners.data = fuzzyLookup(
                name,
                this.partners.data,
                (partner) => partner.display_name
            );
        } else {
            this.displayedPartners.data = this.partners.data;
        }
    }
}

CustomerList.template = "awesome_tshirt.CustomerList";

CustomerList.props = {
    selectCustomer: {
        type: Function,
    },
};
