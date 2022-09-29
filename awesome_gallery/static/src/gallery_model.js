/** @odoo-module */

import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    constructor(orm, resModel, fields, archInfo, domain) {
        this.orm = orm;
        this.resModel = resModel;
        const { imageField, limit, tooltipField } = archInfo;
        this.imageField = imageField;
        this.fields = fields;
        this.limit = limit;
        this.domain = domain;
        this.tooltipField = tooltipField;
        this.keepLast = new KeepLast();
    }

    async load() {
        const { records } = await this.keepLast.add(
            this.orm.webSearchRead(
                this.resModel,
                this.domain,
                [this.imageField, this.tooltipField],
                {
                    limit: this.limit,
                }
            )
        );

        switch (this.fields[this.tooltipField].type) {
            case "many2one":
                this.images = records.map((record) => ({
                    ...record,
                    [this.tooltipField]: record[this.tooltipField][1],
                }));
                break;
            case "integer":
                this.images = records.map((record) => ({
                    ...record,
                    [this.tooltipField]: String(record[this.tooltipField]),
                }));
                break;
            default:
                this.images = records;
        }
    }
}
