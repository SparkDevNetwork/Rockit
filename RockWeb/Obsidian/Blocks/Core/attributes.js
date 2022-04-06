System.register(["vue", "../../Elements/alert", "../../Controls/attributeEditor", "../../Elements/dropDownList", "../../Controls/modal", "../../Elements/rockButton", "../../Controls/rockForm", "../../Controls/rockField", "../../Templates/paneledBlockTemplate", "../../Elements/textBox", "../../Util/block", "../../Util/guid", "../../Fields/index", "../../Services/string", "../../Util/dialogs"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, alert_1, attributeEditor_1, dropDownList_1, modal_1, rockButton_1, rockForm_1, rockField_1, paneledBlockTemplate_1, textBox_1, block_1, guid_1, index_1, string_1, vue_2, dialogs_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (attributeEditor_1_1) {
                attributeEditor_1 = attributeEditor_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (rockField_1_1) {
                rockField_1 = rockField_1_1;
            },
            function (paneledBlockTemplate_1_1) {
                paneledBlockTemplate_1 = paneledBlockTemplate_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            },
            function (dialogs_1_1) {
                dialogs_1 = dialogs_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Core.Attributes",
                components: {
                    Alert: alert_1.default,
                    AttributeEditor: attributeEditor_1.default,
                    DropDownList: dropDownList_1.default,
                    Modal: modal_1.default,
                    PaneledBlockTemplate: paneledBlockTemplate_1.default,
                    RockButton: rockButton_1.default,
                    RockField: rockField_1.default,
                    RockForm: rockForm_1.default,
                    TextBox: textBox_1.default
                },
                setup() {
                    const config = block_1.useConfigurationValues();
                    const invokeBlockAction = block_1.useInvokeBlockAction();
                    const showEntityTypePicker = vue_2.computed(() => !config.entityTypeGuid);
                    const entityTypeGuid = vue_1.ref("");
                    const entityTypeOptions = vue_2.computed(() => { var _a; return (_a = config.entityTypes) !== null && _a !== void 0 ? _a : []; });
                    const entityTypeSelectionIsValid = vue_2.computed(() => !!config.entityTypeGuid || entityTypeGuid.value !== "");
                    const showEntityTypeQualifier = vue_2.computed(() => !config.entityTypeGuid);
                    const entityTypeQualifierColumn = vue_1.ref("");
                    const entityTypeQualifierValue = vue_1.ref("");
                    const attributes = vue_1.ref(config.attributes);
                    const editableAttribute = vue_1.ref(null);
                    const showEditAttributeModal = vue_1.ref(false);
                    const submitEditAttribute = vue_1.ref(false);
                    const editAttributeModalTitle = vue_2.computed(() => {
                        if (editableAttribute.value) {
                            return `Edit ${editableAttribute.value.name}`;
                        }
                        return "";
                    });
                    const editAttribute = (row) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c;
                        const result = yield invokeBlockAction("GetEditAttribute", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess || !result.data) {
                            return dialogs_1.alert((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unable to edit attribute.");
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
                            return dialogs_1.alert((_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unable to save attribute.");
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
                            fieldTypeGuid: guid_1.normalize("9C204CD0-1233-41C5-818A-C5DA439445AA")
                        };
                        showEditAttributeModal.value = true;
                        entityTypeQualifierColumn.value = "";
                        entityTypeQualifierValue.value = "";
                    };
                    const onDeleteAttribute = (row) => __awaiter(this, void 0, void 0, function* () {
                        const status = yield dialogs_1.confirmDelete("Attribute");
                        if (!status) {
                            return;
                        }
                        const result = yield invokeBlockAction("DeleteAttribute", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess) {
                            return dialogs_1.alert(result.errorMessage || "Unable to delete attribute.");
                        }
                        const index = attributes.value.findIndex(a => a.guid === row.guid);
                        if (index !== -1) {
                            attributes.value.splice(index, 1);
                        }
                    });
                    const editableAttributeValue = vue_1.ref(null);
                    const showEditAttributeValueModal = vue_1.ref(false);
                    const submitEditAttributeValue = vue_1.ref(false);
                    const editAttributeValueModalTitle = vue_2.computed(() => {
                        if (editableAttributeValue.value) {
                            return `${editableAttributeValue.value.name} Value`;
                        }
                        return "";
                    });
                    const editAttributeValue = (row) => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        if (!config.allowSettingOfValues) {
                            return;
                        }
                        const result = yield invokeBlockAction("GetEditAttributeValue", {
                            attributeGuid: row.guid
                        });
                        if (!result.isSuccess || !result.data) {
                            return dialogs_1.alert((_e = result.errorMessage) !== null && _e !== void 0 ? _e : "Unable to edit attribute value.");
                        }
                        editableAttributeValue.value = result.data;
                        showEditAttributeValueModal.value = true;
                    });
                    const startSaveEditAttributeValue = () => {
                        submitEditAttributeValue.value = true;
                    };
                    const saveEditAttributeValue = () => __awaiter(this, void 0, void 0, function* () {
                        var _f, _g, _h;
                        const result = yield invokeBlockAction("SaveEditAttributeValue", {
                            attributeGuid: (_f = editableAttributeValue.value) === null || _f === void 0 ? void 0 : _f.attributeGuid,
                            value: (_g = editableAttributeValue.value) === null || _g === void 0 ? void 0 : _g.value
                        });
                        if (!result.isSuccess || !result.data) {
                            return dialogs_1.alert((_h = result.errorMessage) !== null && _h !== void 0 ? _h : "Unable to save attribute value.");
                        }
                        const index = attributes.value.findIndex(a => { var _a; return a.guid === ((_a = result.data) === null || _a === void 0 ? void 0 : _a.guid); });
                        if (index !== -1) {
                            attributes.value.splice(index, 1, result.data);
                        }
                        editableAttributeValue.value = null;
                        showEditAttributeValueModal.value = false;
                    });
                    const getCondensedValue = (value) => {
                        var _a;
                        const fieldType = index_1.getFieldType(value.fieldTypeGuid);
                        if (!fieldType) {
                            return string_1.truncate((_a = value.textValue) !== null && _a !== void 0 ? _a : "", 100);
                        }
                        else {
                            return fieldType.getCondensedTextValue(value);
                        }
                    };
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
                    vue_1.watch(entityTypeGuid, () => __awaiter(this, void 0, void 0, function* () {
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
                        editableAttributeValue,
                        editAttribute,
                        editAttributeValue,
                        editAttributeModalTitle,
                        editAttributeValueModalTitle,
                        entityTypeGuid,
                        entityTypeOptions,
                        entityTypeQualifierColumn,
                        entityTypeQualifierValue,
                        getCondensedValue,
                        getDataCellClass,
                        getDeleteButtonClass,
                        saveEditAttribute,
                        saveEditAttributeValue,
                        entityTypeSelectionIsValid,
                        onAddAttribute,
                        onDeleteAttribute,
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

<PaneledBlockTemplate>
    <template v-slot:title>Attribute List</template>
    <template v-slot:titleAside>
        <div v-if="showEntityTypePicker" class="form-inline panel-labels">
            <DropDownList v-model="entityTypeGuid"
                label="Entity Type"
                grouped
                :enhanceForLongLists="false"
                :options="entityTypeOptions" />
        </div>
    </template>

    <template v-slot:default>
        <div v-if="entityTypeSelectionIsValid" class="grid grid-panel">
            <div class="grid-actions" style="border-bottom: 1px solid #dfe0e1;">
                <RockButton class="btn-add btn-grid-action" btnType="default" btnSize="sm" @click="onAddAttribute"><i class="fa fa-plus-circle fa-fw"></i></RockButton>
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
                        <tr v-for="attribute in attributes" :key="attribute.id" align="left" @click.stop="editAttributeValue(attribute)">
                            <td :class="getDataCellClass(attribute)" data-priority="1" style="white-space: nowrap;" align="right">{{ attribute.id }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1" style="white-space: nowrap;">{{ attribute.qualifier }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">{{ attribute.name }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">{{ attribute.categories }}</td>
                            <td :class="getDataCellClass(attribute)" data-priority="1">{{ getCondensedValue(attribute.value) }}</td>
                            <td class="grid-columncommand" data-priority="1" align="center" @click.stop="onIgnore">
                                <a title="Edit" class="btn btn-default btn-sm" @click.prevent.stop="editAttribute(attribute)"><i class="fa fa-pencil"></i></a>
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

</PaneledBlockTemplate>

<Modal v-model="showEditAttributeValueModal" :title="editAttributeValueModalTitle">
    <RockForm v-model:submit="submitEditAttributeValue" @submit="saveEditAttributeValue">
        <RockField v-model:attributeValue="editableAttributeValue" isEditMode />
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
        }
    };
});
//# sourceMappingURL=attributes.js.map