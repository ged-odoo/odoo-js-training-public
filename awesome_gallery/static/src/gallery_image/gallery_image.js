/** @odoo-module */

const { Component } = owl;
import { useTooltip } from "@web/core/tooltip/tooltip_hook";

export class GalleryImage extends Component {
    setup() {
        useTooltip("tooltip", {
            tooltip: this.props.image[this.props.tooltipField],
        });
    }
    onClick() {
        this.props.onClick(this.props.image.id);
    }
}

GalleryImage.template = "awesome_gallery.GalleryImage";
GalleryImage.props = {
    image: { type: Object },
    className: { type: String },
    imageField: { type: String },
    tooltipField: { type: String },
    onClick: { type: Function },
};
