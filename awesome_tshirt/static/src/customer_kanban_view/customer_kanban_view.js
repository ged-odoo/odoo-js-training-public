/** @odoo-module */
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { kanbanView } from "@web/views/kanban/kanban_view";
import { registry } from "@web/core/registry";
import { CustomerList } from "../customer_list/customer_list";

class CustomerKanbanController extends KanbanController {
    setup() {
        super.setup();
        this.archInfo = { ...this.props.archInfo };
        this.archInfo.className += " flex-grow-1";
    }

    selectCustomer(customer_id) {
        console.log(customer_id);
    }
}

CustomerKanbanController.components = { ...KanbanController.components, CustomerList };
CustomerKanbanController.template = "awesome_tshirt.CustomerKanbanView";
export const customerKanbanView = {
    ...kanbanView,
    Controller: CustomerKanbanController,
};

registry.category("views").add("customer_kanban", customerKanbanView);
