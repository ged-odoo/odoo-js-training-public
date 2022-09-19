/** @odoo-module **/

import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { AutoComplete } from "@web/core/autocomplete/autocomplete";
import { fuzzyLookup } from "@web/core/utils/search";

const { Component } = owl;

export class CustomerAutocomplete extends Component {
    setup() {
        this.action = useService("action");
        this.orm = useService("orm");
        this.tshirtService = useService("tshirtService");
    }

    get sources() {
        return [
            {
                placeholder: this.env._t("Loading..."),
                options: this.loadOptionsSources.bind(this),
            },
        ];
    }

    async loadOptionsSources(request) {
        if (!this.partners) {
            const partners = await this.tshirtService.loadCustomers();
            this.partners = partners.map((record) => ({
                label: record.display_name,
                res_id: record.id,
            }));
        }

        if (!request) {
            return this.partners.slice(0, 8);
        }
        const fuzzySearch = fuzzyLookup(request, this.partners, (partner) => partner.label).slice(
            0,
            8
        );
        if (!fuzzySearch.length) {
            fuzzySearch.push({
                label: this.env._t("No records"),
                classList: "o_m2o_no_result",
                unselectable: true,
            });
        }
        return fuzzySearch;
    }

    openOrdersFromCustomer(customerId, customerName) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: `Orders from ${customerName}`,
            res_model: "awesome_tshirt.order",
            domain: new Domain(`[('customer_id','=', ${customerId})]`).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }

    onSelect(option) {
        this.openOrdersFromCustomer(option.res_id, option.label);
    }
}
CustomerAutocomplete.template = "awesome_tshirt.CustomerAutocomplete";
CustomerAutocomplete.components = { AutoComplete };
