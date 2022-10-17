System.register(['./javaScriptAnchor.js', 'vue', './grid.js'], (function (exports) {
    'use strict';
    var JavaScriptAnchor, defineComponent, inject, SortDirection;
    return {
        setters: [function (module) {
            JavaScriptAnchor = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
        }, function (module) {
            SortDirection = module.SortDirection;
        }],
        execute: (function () {

            var GridColumn = exports('default', defineComponent({
                name: "GridColumn",
                components: {
                    JavaScriptAnchor
                },
                props: {
                    title: {
                        type: String,
                        default: ""
                    },
                    property: {
                        type: String,
                        default: ""
                    },
                    sortExpression: {
                        type: String,
                        default: ""
                    }
                },
                setup() {
                    return {
                        gridContext: inject("gridContext"),
                        rowContext: inject("rowContext")
                    };
                },
                computed: {
                    mySortExpression() {
                        return this.sortExpression || this.property;
                    },
                    canSort() {
                        return !!this.sortProperty;
                    },
                    sortProperty() {
                        return this.gridContext.sortProperty;
                    },
                    isCurrentlySorted() {
                        var _a;
                        return !!this.mySortExpression && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.property) === this.mySortExpression;
                    },
                    isCurrentlySortedDesc() {
                        var _a;
                        return this.isCurrentlySorted && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.direction) === SortDirection.Descending;
                    },
                    isCurrentlySortedAsc() {
                        var _a;
                        return this.isCurrentlySorted && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.direction) === SortDirection.Ascending;
                    }
                },
                methods: {
                    onHeaderClick() {
                        this.$emit("click:header", this.property);
                        if (this.mySortExpression && this.sortProperty) {
                            if (this.isCurrentlySortedAsc) {
                                this.sortProperty.direction = SortDirection.Descending;
                            }
                            else {
                                this.sortProperty.property = this.mySortExpression;
                                this.sortProperty.direction = SortDirection.Ascending;
                            }
                        }
                    },
                },
                template: `
<th
    v-if="rowContext.isHeader"
    scope="col"
    @click="onHeaderClick"
    :class="isCurrentlySortedAsc ? 'ascending' : isCurrentlySortedDesc ? 'descending' : ''">
    <JavaScriptAnchor v-if="mySortExpression && canSort">
        <slot name="header">
            {{title}}
        </slot>
    </JavaScriptAnchor>
    <template v-else>
        <slot name="header">
            {{title}}
        </slot>
    </template>
</th>
<td v-else class="grid-select-cell">
    <slot>
        {{rowContext.rowData[property]}}
    </slot>
</td>`
            }));

        })
    };
}));
