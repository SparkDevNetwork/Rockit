System.register(['tslib', '@Obsidian/Utility/block', 'vue', './grid.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var __awaiter, useInvokeBlockAction, defineComponent, Grid, SortDirection;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            Grid = module["default"];
            SortDirection = module.SortDirection;
        }, function () {}],
        execute: (function () {

            var blockActionSourcedGrid = exports('default', defineComponent({
                name: "BlockActionSourcedGrid",
                components: {
                    Grid
                },
                props: {
                    blockActionName: {
                        type: String,
                        required: true
                    },
                    rowIdKey: {
                        type: String,
                        required: true
                    }
                },
                setup() {
                    const invokeBlockAction = useInvokeBlockAction();
                    return {
                        invokeBlockAction
                    };
                },
                data() {
                    return {
                        pageSize: 50,
                        totalRowCount: 0,
                        currentPageIndex: 1,
                        isLoading: false,
                        errorMessage: "",
                        sortProperty: {
                            direction: SortDirection.Ascending,
                            property: this.rowIdKey
                        },
                        currentPageData: []
                    };
                },
                computed: {
                    sortString() {
                        return `${this.sortProperty.property} ${this.sortProperty.direction}`;
                    }
                },
                methods: {
                    fetchData() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            this.errorMessage = "";
                            try {
                                const result = yield this.invokeBlockAction(this.blockActionName, {
                                    filterOptions: {
                                        take: this.pageSize,
                                        skip: (this.currentPageIndex - 1) * this.pageSize
                                    },
                                    sortProperty: this.sortProperty
                                });
                                if (result.data && result.data.currentPageData) {
                                    this.currentPageData = result.data.currentPageData;
                                    this.totalRowCount = result.data.totalCount;
                                }
                                else {
                                    this.currentPageData = [];
                                }
                            }
                            catch (e) {
                                this.errorMessage = `An exception occurred: ${e}`;
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    }
                },
                watch: {
                    pageSize() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.currentPageIndex > 1) {
                                this.currentPageIndex = 1;
                            }
                            else {
                                yield this.fetchData();
                            }
                        });
                    },
                    currentPageIndex() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.fetchData();
                        });
                    },
                    "sortString"() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.fetchData();
                        });
                    }
                },
                mounted() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.fetchData();
                    });
                },
                template: `
<Grid
    :gridData="currentPageData"
    #default="rowContext"
    v-model:sortProperty="sortProperty"
    v-model:pageSize="pageSize"
    v-model:currentPageIndex="currentPageIndex"
    rowItemText="Group Member"
    :rowCountOverride="totalRowCount"
    :rowIdKey="rowIdKey">
    <slot v-bind="rowContext" />
</Grid>`
            }));

        })
    };
}));
