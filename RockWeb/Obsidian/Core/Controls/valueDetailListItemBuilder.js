System.register([], (function (exports) {
    'use strict';
    return {
        execute: (function () {

            class ValueDetailListItemBuilder {
                constructor() {
                    this.values = [];
                }
                addTextValue(title, text) {
                    this.values.push({
                        title: title,
                        textValue: text
                    });
                }
                addHtmlValue(title, html) {
                    this.values.push({
                        title: title,
                        htmlValue: html
                    });
                }
                build() {
                    return [...this.values.map(v => (Object.assign({}, v)))];
                }
            } exports('ValueDetailListItemBuilder', ValueDetailListItemBuilder);

        })
    };
}));
