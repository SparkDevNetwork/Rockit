System.register(['vue', './gridColumn.js', './javaScriptAnchor.js', './grid.js'], (function (exports) {
    'use strict';
    var defineComponent, inject, ref, GridColumn;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
            ref = module.ref;
        }, function (module) {
            GridColumn = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var gridSelectColumn = exports('default', defineComponent({
                name: "GridSelectColumn",
                components: {
                    GridColumn
                },
                setup() {
                    const gridContext = inject("gridContext");
                    const rowContext = inject("rowContext");
                    const selectAllRows = gridContext.selectAllRows;
                    const isThisRowSelected = gridContext.selectedRowIds[rowContext.rowId];
                    const isSelected = ref(selectAllRows || isThisRowSelected);
                    return {
                        gridContext,
                        rowContext,
                        isSelected
                    };
                },
                computed: {
                    rowId() {
                        return this.rowContext.rowId;
                    },
                    isHeader() {
                        return this.rowContext.isHeader;
                    }
                },
                watch: {
                    "gridContext.selectAllRows"() {
                        if (!this.isHeader) {
                            this.isSelected = this.gridContext.selectAllRows;
                            this.gridContext.selectedRowIds[this.rowId] = this.isSelected;
                        }
                    },
                    "gridContext.selectedRowIds"() {
                        if (!this.isHeader) {
                            this.isSelected = this.gridContext.selectedRowIds[this.rowId];
                        }
                    },
                    isSelected() {
                        if (!this.isHeader) {
                            this.gridContext.selectedRowIds[this.rowId] = this.isSelected;
                        }
                    }
                },
                template: `
<GridColumn class="grid-select-field" align="center">
    <template #header>
        <div @click.stop class="checkbox">
            <label title="">
                <input type="checkbox" class="select-all" v-model="gridContext.selectAllRows" />
                <span class="label-text">&nbsp;</span>
            </label>
        </div>
    </template>
    <template #default>
        <div @click.stop class="checkbox">
            <label title="">
                <input type="checkbox" class="select-all" v-model="isSelected" />
                <span class="label-text">&nbsp;</span>
            </label>
        </div>
    </template>
</GridColumn>`
            }));

        })
    };
}));
