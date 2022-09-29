/** @odoo-module */
import { useService } from "@web/core/utils/hooks";
const { Component } = owl;
import { GalleryImage } from "./gallery_image/gallery_image";

export class GalleryRenderer extends Component {
    setup() {
        this.action = useService("action");
    }

    onImageClick(resId) {
        this.action.switchView("form", { resId });
    }
}

GalleryRenderer.components = { GalleryImage };
GalleryRenderer.template = "awesome_gallery.Renderer";
