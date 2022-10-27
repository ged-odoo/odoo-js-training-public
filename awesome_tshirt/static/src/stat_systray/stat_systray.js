/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
const { Component, useState } = owl;

export class StatSystray extends Component {
    setup() {
        const tshirtService = useService("tshirtService");
        this.statistics = useState(tshirtService.statistics);
        this.action = useService("action");
    }

    openNewOrders() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "New orders",
            res_model: "awesome_tshirt.order",
            domain: new Domain("[('state','=', 'new')]").toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
}
StatSystray.template = "awesome_tshirt.StatSystray";

export const systrayItem = {
    Component: StatSystray,
};
registry.category("systray").add("awesome_tshirt.Statistics", systrayItem, { sequence: 1000 });
