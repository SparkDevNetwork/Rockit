System.register(['tslib', 'vue', '@Obsidian/Controls/attributeEditor', '@Obsidian/Controls/modal', '@Obsidian/Controls/rockField', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/alert', '@Obsidian/Controls/dropDownList', '@Obsidian/Templates/block', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/textBox', '@Obsidian/Utility/block', '@Obsidian/Utility/dialogs', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, computed, ref, watch, AttributeEditor, Modal, RockField, RockForm, Alert, DropDownList, Block, RockButton, TextBox, useConfigurationValues, useInvokeBlockAction, alert, confirmDelete, normalize;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            AttributeEditor = module["default"];
        }, function (module) {
            Modal = module["default"];
        }, function (module) {
            RockField = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            alert = module.alert;
            confirmDelete = module.confirmDelete;
        }, function (module) {
            normalize = module.normalize;
        }],
        execute: (function () {

            var attributes = exports('default', defineComponent({
                name: "Core.Attributes",
                components: {
                    Alert,
                    AttributeEditor,
                    Block,
                    DropDownList,
                    Modal,
                    RockButton,
                    RockField,
                    RockForm,
                    TextBox
                },
                setup() {
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const showEntityTypePicker = computed(() => !config.entityTypeGuid);
                    const entityTypeGuid = ref("");
                    const entityTypeOptions = computed(() => { var _a; return (_a = config.entityTypes) !== null && _a !== void 0 ? _a : []; });
                    const entityTypeSelectionIsValid = computed(() => !!config.entityTypeGuid || entityTypeGuid.value !== "");
                    const showEntityTypeQualifier = computed(() => !config.entityTypeGuid);
                    const entityTypeQualifierColumn = ref("");
                    const entityTypeQualifierValue = ref("");
                    const attributes = ref(config.attributes);
                    const editableAttribute = ref(null);
                    const showEditAttributeModal = ref(false);
                    const submitEditAttribute = ref(false);
                    const editAttributeModalTitle = computed(() => {
                        if (editableAttribute.value) {
                            return `Edit ${editableAttribute.value.name}`;
                        }
                        return "";
                    });
                    const onEditAttribute = (row) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c;
                        const result = yield invokeBlockAction("GetEditAttribute", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess || !result.data) {
                            return alert((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unable to edit attribute.");
                        }
                        entityTypeQualifierColumn.value = (_b = result.data.entityTypeQualifierColumn) !== null && _b !== void 0 ? _b : "";
                        entityTypeQualifierValue.value = (_c = result.data.entityTypeQualifierValue) !== null && _c !== void 0 ? _c : "";
                        editableAttribute.value = result.data.attribute;
                        showEditAttributeModal.value = true;
                    });
                    const startSaveEditAttribute = () => {
                        submitEditAttribute.value = true;
                    };
                    const saveEditAttribute = () => __awaiter(this, void 0, void 0, function* () {
                        var _d;
                        const result = yield invokeBlockAction("SaveEditAttribute", {
                            entityTypeGuid: entityTypeGuid.value,
                            entityTypeQualifierColumn: entityTypeQualifierColumn.value,
                            entityTypeQualifierValue: entityTypeQualifierValue.value,
                            attribute: editableAttribute.value
                        });
                        if (!result.isSuccess || !result.data) {
                            return alert((_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unable to save attribute.");
                        }
                        const index = attributes.value.findIndex(a => { var _a; return a.guid === ((_a = result.data) === null || _a === void 0 ? void 0 : _a.guid); });
                        if (index !== -1) {
                            attributes.value.splice(index, 1, result.data);
                        }
                        else {
                            attributes.value.push(result.data);
                        }
                        editableAttribute.value = null;
                        showEditAttributeModal.value = false;
                    });
                    const onAddAttribute = () => {
                        editableAttribute.value = {
                            isActive: true,
                            fieldTypeGuid: normalize("9C204CD0-1233-41C5-818A-C5DA439445AA"),
                            isPublic: false,
                            isSystem: false,
                            isRequired: false,
                            isShowInGrid: false,
                            isShowOnBulk: false,
                            isAnalytic: false,
                            isAllowSearch: false,
                            isAnalyticHistory: false,
                            isEnableHistory: false,
                            isIndexEnabled: false
                        };
                        showEditAttributeModal.value = true;
                        entityTypeQualifierColumn.value = "";
                        entityTypeQualifierValue.value = "";
                    };
                    const onDeleteAttribute = (row) => __awaiter(this, void 0, void 0, function* () {
                        const status = yield confirmDelete("Attribute");
                        if (!status) {
                            return;
                        }
                        const result = yield invokeBlockAction("DeleteAttribute", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess) {
                            return alert(result.errorMessage || "Unable to delete attribute.");
                        }
                        const index = attributes.value.findIndex(a => a.guid === row.guid);
                        if (index !== -1) {
                            attributes.value.splice(index, 1);
                        }
                    });
                    const editAttributeValue = ref("");
                    const editAttribute = ref(null);
                    const showEditAttributeValueModal = ref(false);
                    const submitEditAttributeValue = ref(false);
                    const editAttributeValueModalTitle = computed(() => {
                        if (editAttribute.value) {
                            return `${editAttribute.value.name} Value`;
                        }
                        return "";
                    });
                    const onEditAttributeValue = (row) => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        if (!config.allowSettingOfValues) {
                            return;
                        }
                        const result = yield invokeBlockAction("GetEditAttributeValue", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess || !result.data) {
                            return alert((_e = result.errorMessage) !== null && _e !== void 0 ? _e : "Unable to edit attribute value.");
                        }
                        editAttribute.value = result.data.attribute;
                        editAttributeValue.value = result.data.value;
                        showEditAttributeValueModal.value = true;
                    });
                    const startSaveEditAttributeValue = () => {
                        submitEditAttributeValue.value = true;
                    };
                    const saveEditAttributeValue = () => __awaiter(this, void 0, void 0, function* () {
                        var _f, _g;
                        const result = yield invokeBlockAction("SaveEditAttributeValue", {
                            attributeGuid: (_f = editAttribute.value) === null || _f === void 0 ? void 0 : _f.attributeGuid,
                            value: editAttributeValue.value
                        });
                        if (!result.isSuccess || !result.data) {
                            return alert((_g = result.errorMessage) !== null && _g !== void 0 ? _g : "Unable to save attribute value.");
                        }
                        const index = attributes.value.findIndex(a => { var _a; return a.guid === ((_a = result.data) === null || _a === void 0 ? void 0 : _a.guid); });
                        if (index !== -1) {
                            attributes.value.splice(index, 1, result.data);
                        }
                        editAttribute.value = null;
                        editAttributeValue.value = "";
                        showEditAttributeValueModal.value = false;
                    });
                    const getDeleteButtonClass = (row) => {
                        const classes = ["btn", "btn-danger", "btn-sm", "grid-delete-button"];
                        if (!row.isDeleteEnabled) {
                            classes.push("disabled");
                        }
                        return classes;
                    };
                    const getDataCellClass = (_row) => {
                        if (config.allowSettingOfValues) {
                            return ["grid-select-cell"];
                        }
                        else {
                            return ["grid-cell"];
                        }
                    };
                    watch(entityTypeGuid, () => __awaiter(this, void 0, void 0, function* () {
                        if (entityTypeGuid.value === "") {
                            attributes.value = [];
                            return;
                        }
                        const result = yield invokeBlockAction("GetAttributes", {
                            entityTypeGuid: entityTypeGuid.value,
                        });
                        if (!result.isSuccess || !result.data) {
                            return;
                        }
                        attributes.value = result.data;
                    }));
                    return {
                        attributes,
                        editableAttribute,
                        editAttribute,
                        editAttributeModalTitle,
                        editAttributeValue,
                        editAttributeValueModalTitle,
                        entityTypeGuid,
                        entityTypeOptions,
                        entityTypeQualifierColumn,
                        entityTypeQualifierValue,
                        getDataCellClass,
                        getDeleteButtonClass,
                        saveEditAttribute,
                        saveEditAttributeValue,
                        entityTypeSelectionIsValid,
                        onAddAttribute,
                        onDeleteAttribute,
                        onEditAttribute,
                        onEditAttributeValue,
                        onIgnore: () => { },
                        showEditAttributeModal,
                        showEditAttributeValueModal,
                        showEntityTypeQualifier,
                        showEntityTypePicker,
                        startSaveEditAttribute,
                        startSaveEditAttributeValue,
                        submitEditAttribute,
                        submitEditAttributeValue
                    };
                },
                template: `
<Alert alertType="warning">
    This is an experimental block and should not be used in production.
</Alert>

<Block title="Attribute List">
    <template #headerActions>
        <div v-if="showEntityTypePicker" class="form-inline panel-labels">
            <DropDownList v-model="entityTypeGuid"
                label="Entity Type"
                grouped
                :enhanceForLongLists="false"
                :items="entityTypeOptions" />
        </div>
    </template>

    <template #default>
        <div v-if="entityTypeSelectionIsValid" class="grid grid-panel">
            <div class="grid-actions border-bottom border-panel">
                <RockButton class="btn-add btn-grid-action" btnType="link" @click="onAddAttribute"><i class="fa fa-plus-circle fa-fw"></i></RockButton>
            </div>

            <div class="table-responsive">
                <table class="grid-table table table-bordered table-striped table-hover">
                    <thead>
                        <tr align="left">
                            <th data-priority="1" scope="col" align="right">Id</th>
                            <th data-priority="1" scope="col">Qualifier</th>
                            <th data-priority="1" scope="col">Name</th>
                            <th data-priority="1" scope="col">Categories</th>
                            <th data-priority="1" scope="col">Value</th>
                            <th class="grid-columncommand" data-priority="1" scope="col">&nbsp;</th>
                            <th class="grid-columncommand" data-priority="1" scope="col">&nbsp;</th>
                            <th class="grid-columncommand" data-priority="1" scope="col">&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="attribute in attributes" :key="attribute.id" align="left" @click.stop="onEditAttributeValue(attribute)">
                            <td :class="getDataCellClass(attribute)" data-priority="1" style="white-space: nowrap;" align="right">{{ attribute.id }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1" style="white-space: nowrap;">{{ attribute.qualifier }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">{{ attribute.name }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">{{ attribute.categories }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">
                                <RockField :modelValue="attribute.value" :attribute="attribute.attribute" :showLabel="false" isCondensed />
                            </td>
                            <td class="grid-columncommand" data-priority="1" align="center" @click.stop="onIgnore">
                                <a title="Edit" class="btn btn-default btn-sm" @click.prevent.stop="onEditAttribute(attribute)"><i class="fa fa-pencil"></i></a>
                            </td>
                            <td class="grid-columncommand" data-priority="1" align="center" @click.stop="onIgnore">
                                <a title="Security" class="btn btn-security btn-sm disabled"><i class="fa fa-lock"></i></a>
                            </td>
                            <td class="grid-columncommand" data-priority="1" align="center" @click.stop="onIgnore">
                                <a title="Delete" :class="getDeleteButtonClass(attribute)" @click.prevent.stop="onDeleteAttribute(attribute)"><i class="fa fa-times"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Alert v-else alertType="warning">
            Please select an entity to display attributes for.
        </Alert>
    </template>
</Block>

<Modal v-model="showEditAttributeValueModal" :title="editAttributeValueModalTitle">
    <RockForm v-model:submit="submitEditAttributeValue" @submit="saveEditAttributeValue">
        <RockField v-model="editAttributeValue" :attribute="editAttribute" isEditMode />
    </RockForm>

    <template #customButtons>
        <RockButton btnType="primary" @click="startSaveEditAttributeValue">Save</RockButton>
    </template>
</Modal>

<Modal v-model="showEditAttributeModal" :title="editAttributeModalTitle">
    <RockForm v-model:submit="submitEditAttribute" @submit="saveEditAttribute">
        <div v-if="showEntityTypeQualifier" class="well">
            <div class="row">
                <div class="col-md-6">
                    <TextBox v-model="entityTypeQualifierColumn" label="Qualifier Field" />
                </div>

                <div class="col-md-6">
                    <TextBox v-model="entityTypeQualifierValue" label="Qualifier Value" />
                </div>
            </div>
        </div>

        <AttributeEditor v-model="editableAttribute" />
    </RockForm>

    <template #customButtons>
        <RockButton btnType="primary" @click="startSaveEditAttribute">Save</RockButton>
    </template>
</Modal>
`
            }));

        })
    };
}));
