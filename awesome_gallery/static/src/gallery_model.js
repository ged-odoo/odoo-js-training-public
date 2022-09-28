/** @odoo-module */

import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    constructor(orm, resModel, archInfo, domain) {
        this.orm = orm;
        this.resModel = resModel;
        const { imageField, limit } = archInfo;
        this.imageField = imageField;
        this.limit = limit;
        this.domain = domain;
        this.keepLast = new KeepLast();
    }

    async load() {
        const { records } = await this.keepLast.add(
            this.orm.webSearchRead(this.resModel, this.domain, [this.imageField], {
                limit: this.limit,
            })
        );
        this.images = records;
    }
}
