System.register(['vue', './gridColumn.js', './javaScriptAnchor.js', './grid.js'], (function (exports) {
    'use strict';
    var defineComponent, inject, GridColumn;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
        }, function (module) {
            GridColumn = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var gridProfileLinkColumn = exports('default', defineComponent({
                name: "GridProfileLinkColumn",
                components: {
                    GridColumn
                },
                setup() {
                    return {
                        rowContext: inject("rowContext")
                    };
                },
                props: {
                    property: {
                        type: String,
                        default: "PersonId"
                    },
                    urlTemplate: {
                        type: String,
                        default: "/person/{id}"
                    }
                },
                computed: {
                    personId() {
                        return this.rowContext.rowData[this.property] || null;
                    },
                    url() {
                        if (this.personId) {
                            return this.urlTemplate.replace("{id}", this.personId.toString());
                        }
                        return "";
                    }
                },
                template: `
<GridColumn :rowContext="rowContext" class="grid-columncommand" align="center">
    <a v-if="url" @click.stop class="btn btn-default btn-sm" :href="url">
        <i class="fa fa-user"></i>
    </a>
</GridColumn>`
            }));

        })
    };
}));
