/** @odoo-module */

import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { fuzzyLookup } from "@web/core/utils/search";
import { Pager } from "@web/core/pager/pager";

const { Component, onWillStart, useState } = owl;

export class CustomerList extends Component {
    setup() {
        this.orm = useService("orm");
        this.partners = useState({ data: [] });
        this.pager = useState({ offset: 0, limit: 20 });
        this.keepLast = new KeepLast();
        this.state = useState({
            searchString: "",
            displayActiveCustomers: false,
        });
        onWillStart(async () => {
            const { length, records } = await this.loadCustomers();
            this.partners.data = records;
            this.pager.total = length;
        });
    }

    get displayedPartners() {
        return this.filterCustomers(this.state.searchString);
    }

    async onChangeActiveCustomers(ev) {
        this.state.displayActiveCustomers = ev.target.checked;
        this.pager.offset = 0;
        const { length, records } = await this.keepLast.add(this.loadCustomers());
        this.partners.data = records;
        this.pager.total = length;
    }

    loadCustomers() {
        const { limit, offset } = this.pager;
        const domain = this.state.displayActiveCustomers ? [["has_active_order", "=", true]] : [];
        return this.orm.webSearchRead("res.partner", domain, ["display_name"], {
            limit: limit,
            offset: offset,
        });
    }

    filterCustomers(name) {
        if (name) {
            return fuzzyLookup(name, this.partners.data, (partner) => partner.display_name);
        } else {
            return this.partners.data;
        }
    }

    async onUpdatePager(newState) {
        Object.assign(this.pager, newState);
        const { records } = await this.loadCustomers();
        this.partners.data = records;
        this.filterCustomers(this.filterName);
    }
}

CustomerList.components = { Pager };
CustomerList.template = "awesome_tshirt.CustomerList";

CustomerList.props = {
    selectCustomer: {
        type: Function,
    },
};
