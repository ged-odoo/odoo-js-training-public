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
        this.pager = { offset: 0, limit: limit };
        if (!(imageField in this.fields)) {
            throw `image_field error: ${imageField} is not a field of ${resModel}`;
        }
        if (!(tooltipField in this.fields)) {
            throw `image_field error: ${tooltipField} is not a field of ${resModel}`;
        }
    }

    async load() {
        const { length, records } = await this.keepLast.add(
            this.orm.webSearchRead(
                this.resModel,
                this.domain,
                [this.imageField, this.tooltipField],
                {
                    limit: this.pager.limit,
                    offset: this.pager.offset,
                }
            )
        );
        this.recordsLength = length;

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
