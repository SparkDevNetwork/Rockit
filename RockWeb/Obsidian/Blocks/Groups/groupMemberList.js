System.register(['tslib', '@Obsidian/Templates/block', 'vue', '@Obsidian/PageState', '@Obsidian/Controls/grid', '@Obsidian/Controls/gridRow', '@Obsidian/Controls/gridColumn', '@Obsidian/Controls/gridSelectColumn', '@Obsidian/Controls/gridProfileLinkColumn', '@Obsidian/Utility/block', '@Obsidian/Controls/alert'], (function (exports) {
    'use strict';
    var __awaiter, Block, defineComponent, useStore, Grid, SortDirection, GridRow, GridColumn, GridSelectColumn, GridProfileLinkColumn, useInvokeBlockAction, Alert;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            Grid = module["default"];
            SortDirection = module.SortDirection;
        }, function (module) {
            GridRow = module["default"];
        }, function (module) {
            GridColumn = module["default"];
        }, function (module) {
            GridSelectColumn = module["default"];
        }, function (module) {
            GridProfileLinkColumn = module["default"];
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            Alert = module["default"];
        }],
        execute: (function () {

            const store = useStore();
            var groupMemberList = exports('default', defineComponent({
                name: "Groups.GroupMemberList",
                components: {
                    Block,
                    Alert,
                    Grid,
                    GridRow,
                    GridColumn,
                    GridSelectColumn,
                    GridProfileLinkColumn
                },
                setup() {
                    return {
                        invokeBlockAction: useInvokeBlockAction()
                    };
                },
                data() {
                    return {
                        isLoading: false,
                        errorMessage: "",
                        members: [],
                        sortProperty: {
                            direction: SortDirection.Ascending,
                            property: ""
                        }
                    };
                },
                computed: {
                    groupKey() {
                        var _a;
                        return ((_a = store.groupContext) === null || _a === void 0 ? void 0 : _a.idKey) || null;
                    },
                },
                methods: {
                    fetchGroupMembers() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            this.errorMessage = "";
                            try {
                                const result = yield this.invokeBlockAction("GetGroupMemberList", {
                                    groupKey: this.groupKey,
                                    filterOptions: {
                                        take: 50,
                                        skip: 0
                                    },
                                    sortProperty: this.sortProperty
                                });
                                if (result.data && result.data.groupMembers) {
                                    this.members = result.data.groupMembers;
                                }
                                else {
                                    this.members = [];
                                }
                            }
                            catch (e) {
                                this.errorMessage = `An exception occurred: ${e}`;
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    },
                    onRowClick(rowContext) {
                        const groupMemberId = rowContext.rowId;
                        location.href = "/GroupMember/" + groupMemberId;
                    }
                },
                watch: {
                    groupId() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.groupKey) {
                                yield this.fetchGroupMembers();
                            }
                        });
                    },
                    sortProperty: {
                        deep: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield this.fetchGroupMembers();
                            });
                        }
                    }
                },
                mounted() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.groupKey) {
                            yield this.fetchGroupMembers();
                        }
                    });
                },
                template: `
<Block title="Group Members">
    <template #default>
        <Alert v-if="errorMessage" alertType="danger">
            {{errorMessage}}
        </Alert>
        <div class="grid grid-panel">
            <Grid :gridData="members" rowIdKey="groupMemberId" #default="rowContext" v-model:sortProperty="sortProperty" rowItemText="Group Member">
                <GridRow :rowContext="rowContext" @click:body="onRowClick">
                    <GridSelectColumn />
                    <GridColumn title="Name" property="fullName" sortExpression="person.lastName,person.nickName">
                        <div
                            class="photo-icon photo-round photo-round-xs pull-left margin-r-sm"
                            :style="{
                                backgroundImage: 'url(' + rowContext.rowData.photoUrl + ')',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }"></div>
                        {{rowContext.rowData.fullName}}
                    </GridColumn>
                    <GridColumn title="Role" property="roleName" sortExpression="groupRole.name" />
                    <GridColumn title="Member Status" property="statusName" sortExpression="groupMemberStatus" />
                    <GridProfileLinkColumn property="personId" />
                </GridRow>
            </Grid>
        </div>
    </template>
</Block>`
            }));

        })
    };
}));
