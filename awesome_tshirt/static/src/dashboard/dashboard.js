/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "../card/card";
import { PieChart } from "../pie_chart/pie_chart";
import { CustomerAutocomplete } from "../customer_autocomplete/customer_autocomplete";
import { sprintf } from "@web/core/utils/strings";

const { Component, useSubEnv, useState } = owl;

class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.action = useService("action");
        const tshirtService = useService("tshirtService");
        this.statistics = useState(tshirtService.statistics);

        this.keyToString = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t(
                "Average time for an order to go from 'new' to 'sent' or 'cancelled'"
            ),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        };
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
    openLast7DaysOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders(this.env._t("Last 7 days orders", domain));
    }

    openLast7DaysCancelledOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
        this.openOrders(this.env._t("Last 7 days cancelled orders"), domain);
    }

    openFilteredBySizeOrders(size) {
        const title = sprintf(this.env._t("Filtered orders by %s size"), size);
        const domain = `[('size','=', '${size}')]`;
        this.openOrders(title, domain);
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart, CustomerAutocomplete };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
