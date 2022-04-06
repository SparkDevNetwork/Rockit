System.register(["vue", "../../../Controls/panel", "../../../Controls/rockForm", "../../../Elements/alert", "../../../Elements/auditDetail", "../../../Elements/rockButton", "../../../Util/block", "../../../Util/guid", "./FormTemplateDetail/editPanel", "./FormTemplateDetail/utils", "./FormTemplateDetail/viewPanel"], function (exports_1, context_1) {
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
    var vue_1, panel_1, rockForm_1, alert_1, auditDetail_1, rockButton_1, block_1, guid_1, editPanel_1, utils_1, viewPanel_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (auditDetail_1_1) {
                auditDetail_1 = auditDetail_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (editPanel_1_1) {
                editPanel_1 = editPanel_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (viewPanel_1_1) {
                viewPanel_1 = viewPanel_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormTemplateDetail",
                components: {
                    Alert: alert_1.default,
                    AuditDetail: auditDetail_1.default,
                    EditPanel: editPanel_1.default,
                    Panel: panel_1.default,
                    RockButton: rockButton_1.default,
                    RockForm: rockForm_1.default,
                    ViewPanel: viewPanel_1.default
                },
                setup() {
                    var _a, _b;
                    const config = block_1.useConfigurationValues();
                    const invokeBlockAction = block_1.useInvokeBlockAction();
                    const templateDetail = vue_1.ref(config.template);
                    const templateEditDetail = vue_1.ref({});
                    const isEditable = vue_1.ref(config.isEditable);
                    const isEditMode = vue_1.ref(guid_1.areEqual((_a = config.templateGuid) !== null && _a !== void 0 ? _a : "", guid_1.emptyGuid));
                    const templateAuditDetail = vue_1.computed(() => { var _a; return (_a = templateDetail.value) === null || _a === void 0 ? void 0 : _a.auditDetails; });
                    const isInactive = vue_1.computed(() => { var _a, _b; return !((_b = (_a = templateDetail.value) === null || _a === void 0 ? void 0 : _a.isActive) !== null && _b !== void 0 ? _b : false); });
                    const isStartupError = !config.template && !config.templateGuid;
                    const blockTitle = vue_1.computed(() => {
                        var _a, _b;
                        if (!isEditMode.value) {
                            return (_b = (_a = templateDetail.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                        }
                        else {
                            return templateEditDetail.value.name || "Add Template";
                        }
                    });
                    const onEditClick = () => __awaiter(this, void 0, void 0, function* () {
                        var _c;
                        const result = yield invokeBlockAction("StartEdit", {
                            guid: (_c = config.templateGuid) !== null && _c !== void 0 ? _c : ""
                        });
                        if (result.isSuccess && result.data) {
                            templateEditDetail.value = result.data;
                            isEditMode.value = true;
                        }
                    });
                    const onEditCancelClick = () => {
                        var _a;
                        if (config.parentUrl && guid_1.areEqual((_a = config.templateGuid) !== null && _a !== void 0 ? _a : "", guid_1.emptyGuid)) {
                            window.location.href = config.parentUrl;
                            return;
                        }
                        templateEditDetail.value = {};
                        isEditMode.value = false;
                    };
                    const onSubmit = () => __awaiter(this, void 0, void 0, function* () {
                        var _d;
                        const result = yield invokeBlockAction("SaveTemplate", {
                            guid: (_d = config.templateGuid) !== null && _d !== void 0 ? _d : "",
                            template: templateEditDetail.value
                        });
                        if (result.isSuccess && result.data) {
                            templateDetail.value = result.data;
                            templateEditDetail.value = {};
                            isEditMode.value = false;
                        }
                    });
                    utils_1.provideSources((_b = config.sources) !== null && _b !== void 0 ? _b : {});
                    return {
                        blockTitle,
                        isEditable,
                        isInactive,
                        isStartupError,
                        isEditMode,
                        onEditCancelClick,
                        onEditClick,
                        onSubmit,
                        templateAuditDetail,
                        templateDetail,
                        templateEditDetail,
                    };
                },
                template: `
<Alert v-if="isStartupError" alertType="warning">
    Unable to view details of this template.
</Alert>

<Panel v-else type="block" :title="blockTitle" titleIconClass="fa fa-align-left">
    <template v-if="isViewMode" #titleAside>
        <span v-if="isInactive" class="label label-danger">Inactive</span>
    </template>

    <template v-if="isViewMode" #drawer>
        <AuditDetail v-model="templateAuditDetail" />
    </template>

    <div v-if="!isEditMode">
        <ViewPanel :modelValue="templateDetail" />

        <div class="actions">
            <RockButton v-if="isEditable" btnType="primary" accesskey="e" @click="onEditClick">Edit</RockButton>
        </div>
    </div>

    <div v-else>
        <RockForm @submit="onSubmit">
            <EditPanel v-model="templateEditDetail" />

            <div class="actions">
                <RockButton type="submit" btnType="primary">Save</RockButton>
                <RockButton btnType="link" @click="onEditCancelClick">Cancel</RockButton>
            </div>
        </RockForm>
    </div>
</Panel>
`
            }));
        }
    };
});
//# sourceMappingURL=formTemplateDetail.js.map