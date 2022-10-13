System.register(['@Obsidian/Templates/block', 'vue', '@Obsidian/Controls/gridRow', '@Obsidian/Controls/gridColumn', '@Obsidian/Controls/gridProfileLinkColumn', '@Obsidian/Controls/blockActionSourcedGrid', '@Obsidian/Controls/dialog'], (function (exports) {
    'use strict';
    var Block, defineComponent, GridRow, GridColumn, GridProfileLinkColumn, BlockActionSourcedGrid, Dialog;
    return {
        setters: [function (module) {
            Block = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            GridRow = module["default"];
        }, function (module) {
            GridColumn = module["default"];
        }, function (module) {
            GridProfileLinkColumn = module["default"];
        }, function (module) {
            BlockActionSourcedGrid = module["default"];
        }, function (module) {
            Dialog = module["default"];
        }],
        execute: (function () {

            var largeDatasetGrid = exports('default', defineComponent({
                name: "Example.LargeDatasetGrid",
                components: {
                    Block,
                    BlockActionSourcedGrid,
                    GridColumn,
                    GridRow,
                    GridProfileLinkColumn,
                    Dialog
                },
                data() {
                    return {
                        rowContextClicked: null,
                        isRowClickedDialogOpen: false
                    };
                },
                methods: {
                    onRowClick(rowContext) {
                        this.rowContextClicked = rowContext;
                        this.isRowClickedDialogOpen = true;
                    }
                },
                template: `
<Block title="Large Dataset Grid">
    <template #default>
        <div class="grid grid-panel">
            <BlockActionSourcedGrid blockActionName="GetAttributeValues" #default="rowContext" rowItemText="Attribute Values" rowIdKey="Id">
                <GridRow :rowContext="rowContext" @click:body="onRowClick">
                    <GridColumn title="Id" property="Id" sortExpression="Id" />
                    <GridColumn title="Guid" property="Guid" sortExpression="Guid" />
                    <GridColumn title="Attribute" property="Attribute" sortExpression="Attribute.Id" />
                    <GridColumn title="Value" property="Value" sortExpression="Value" />
                </GridRow>
            </BlockActionSourcedGrid>
        </div>
        <Dialog v-model="isRowClickedDialogOpen">
            <template #header>
                <h3>Row Clicked</h3>
            </template>
            <template #default>
                <pre>{{ JSON.stringify( rowContextClicked, null, 2 ) }}</pre>
            </template>
        </Dialog>
    </template>
</Block>`
            }));

        })
    };
}));
