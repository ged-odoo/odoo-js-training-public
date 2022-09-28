/** @odoo-module */

const { Component } = owl;
import { GalleryImage } from "./gallery_image/gallery_image";

export class GalleryRenderer extends Component {}

GalleryRenderer.components = { GalleryImage };
GalleryRenderer.template = "awesome_gallery.Renderer";
