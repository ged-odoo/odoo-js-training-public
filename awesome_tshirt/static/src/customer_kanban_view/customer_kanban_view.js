/** @odoo-module */
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { kanbanView } from "@web/views/kanban/kanban_view";
import { registry } from "@web/core/registry";

class CustomerKanbanController extends KanbanController {}

export const customerKanbanView = {
    ...kanbanView,
    Controller: CustomerKanbanController,
};

registry.category("views").add("customer_kanban", customerKanbanView);
