/** @odoo-module */

import { registry } from "@web/core/registry";
import { CharField } from "@web/views/fields/char/char_field";
import { useCommand } from "@web/core/commands/command_hook";
const { Component } = owl;

class ImagePreviewField extends Component {
    setup() {
        useCommand(this.env._t("Open image in a new tab"), () => {
            window.open(this.props.value, "_blank");
        });
    }
}

ImagePreviewField.template = "awesome_tshirt.ImagePreviewField";
ImagePreviewField.components = { CharField };
ImagePreviewField.supportedTypes = ["char"];

registry.category("fields").add("image_preview", ImagePreviewField);
