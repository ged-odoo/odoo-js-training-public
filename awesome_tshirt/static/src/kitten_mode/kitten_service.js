/** @odoo-module */

import { registry } from "@web/core/registry";
import { browser } from "@web/core/browser/browser";
import { routeToUrl } from "@web/core/browser/router_service";

export const kitten_service = {
    dependencies: ["router"],
    async start(env, { router }) {
        let { search, route } = router.current;
        let active = search.kitten === 1;
        if (active) {
            document.documentElement.classList.add("o-kitten-mode");
        }

        return {
            active,
            enable() {
                active = true;
                route = router.current;
                search.kitten = "1";
                browser.location.href = browser.location.origin + routeToUrl(route);
            },
            disable() {
                active = false;
                route = router.current;
                search.kitten = "";
                browser.location.href = browser.location.origin + routeToUrl(route);
            },
        };
    },
};

registry.category("services").add("kitten", kitten_service);
