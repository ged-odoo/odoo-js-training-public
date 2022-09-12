/** @odoo-module */

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";
import { session } from "@web/session";

export const tshirtService = {
    dependencies: ["rpc"],
    async: ["loadStatistics"],
    start(env, { rpc }) {
        return {
            loadStatistics: memoize(() => {
                if (session.tshirt_statistics) {
                    return session.tshirt_statistics;
                } else {
                    return rpc("/awesome_tshirt/statistics");
                }
            }),
        };
    },
};

registry.category("services").add("tshirtService", tshirtService);
