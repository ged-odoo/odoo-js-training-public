/** @odoo-module */

import { registry } from "@web/core/registry";
import { FormController } from "@web/views/form/form_controller";
import { formView } from "@web/views/form/form_view";
import { useService } from "@web/core/utils/hooks";
import { useDebounced } from "@web/core/utils/timing";

class OrderFormController extends FormController {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.debouncedPrintLabel = useDebounced(this.printLabel, 200);
    }

    printLabel() {
        return this.orm.call(this.model.root.resModel, "print_label", [this.model.root.resId]);
    }

    get isPrintBtnPrimary() {
        return (
            this.model.root.data &&
            this.model.root.data.customer_id &&
            this.model.root.data.state === "printed"
        );
    }
}

OrderFormController.template = "awesome_tshirt.OrderFormView";

export const orderFormView = {
    ...formView,
    Controller: OrderFormController,
};

registry.category("views").add("order_form_view", orderFormView);
