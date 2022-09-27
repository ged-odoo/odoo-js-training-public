/** @odoo-module */

import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
const { Component, onWillStart, onWillUpdateProps, useState } = owl;

export class GalleryController extends Component {
    setup() {
        this.orm = useService("orm");
        this.images = useState({ data: [] });
        this.keeplast = new KeepLast();
        onWillStart(async () => {
            const { records } = await this.loadImages(this.props.domain);
            this.images.data = records;
        });

        onWillUpdateProps(async (nextProps) => {
            if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
                const { records } = await this.loadImages(nextProps.domain);
                this.images.data = records;
            }
        });
    }

    loadImages(domain) {
        return this.keeplast.add(
            this.orm.webSearchRead(this.props.resModel, domain, [this.props.archInfo.imageField], {
                limit: this.props.archInfo.limit,
            })
        );
    }
}

GalleryController.template = "awesome_gallery.View";
GalleryController.components = { Layout };
