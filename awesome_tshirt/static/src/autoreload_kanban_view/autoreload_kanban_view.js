/** @odoo-module */

import { KanbanController } from "@web/views/kanban/kanban_controller";
import { registry } from "@web/core/registry";
import { kanbanView } from "@web/views/kanban/kanban_view";
import { useInterval } from "../utils";

class AutoreloadKanbanController extends KanbanController {
    setup() {
        super.setup();
        useInterval(() => {
            this.model.load();
        }, 30_000);
    }
}

const AutoreloadKanbanView = {
    ...kanbanView,
    Controller: AutoreloadKanbanController,
};

registry.category("views").add("autoreloadkanban", AutoreloadKanbanView);
