/** @odoo-module */

const { Component } = owl;

export class GalleryImage extends Component {
    onClick() {
        this.props.onClick(this.props.image.id);
    }
}

GalleryImage.template = "awesome_gallery.GalleryImage";
GalleryImage.props = {
    image: { type: Object },
    className: { type: String },
    imageField: { type: String },
    onClick: { type: Function },
};
