/** @odoo-module */

import { registry } from "@web/core/registry";
import { session } from "@web/session";

const { reactive } = owl;

export const tshirtService = {
    dependencies: ["rpc"],
    async start(env, { rpc }) {
        const statistics = reactive({});

        if (session.tshirt_statistics) {
            Object.assign(statistics, session.tshirt_statistics);
        } else {
            Object.assign(statistics, await rpc("/awesome_tshirt/statistics"));
        }

        setInterval(async () => {
            Object.assign(statistics, await rpc("/awesome_tshirt/statistics"));
        }, 60000);

        return {
            statistics,
        };
    },
};

registry.category("services").add("tshirtService", tshirtService);
