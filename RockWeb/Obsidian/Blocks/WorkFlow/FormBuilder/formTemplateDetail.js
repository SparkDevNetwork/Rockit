System.register(['tslib', 'vue', '@Obsidian/Controls/panel', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/alert', '@Obsidian/Controls/auditDetail', '@Obsidian/Controls/rockButton', '@Obsidian/Utility/block', '@Obsidian/Utility/guid', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/component', './Shared/completionSettings', './Shared/confirmationEmail', './Shared/personEntrySettings', '@Obsidian/Controls/sectionContainer'], (function (exports) {
    'use strict';
    var __awaiter, inject, provide, defineComponent, ref, computed, watch, Panel, RockForm, Alert, AuditDetail, RockButton, useConfigurationValues, useInvokeBlockAction, areEqual, emptyGuid, CheckBox, TextBox, updateRefValue, CompletionSettings, ConfirmationEmail, PersonEntrySettings, SectionContainer;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            inject = module.inject;
            provide = module.provide;
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            AuditDetail = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            areEqual = module.areEqual;
            emptyGuid = module.emptyGuid;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            CompletionSettings = module["default"];
        }, function (module) {
            ConfirmationEmail = module["default"];
        }, function (module) {
            PersonEntrySettings = module["default"];
        }, function (module) {
            SectionContainer = module["default"];
        }],
        execute: (function () {

            const sourcesKey = Symbol();
            function provideSources(sources) {
                provide(sourcesKey, sources);
            }
            function useSources() {
                var _a;
                return (_a = inject(sourcesKey)) !== null && _a !== void 0 ? _a : {};
            }

            const recipientOptions = [
                {
                    value: "00000000-0000-0000-0000-000000000001",
                    text: "Person"
                },
                {
                    value: "00000000-0000-0000-0000-000000000002",
                    text: "Spouse"
                }
            ];
            var EditPanel = defineComponent({
                name: "Workflow.FormTemplateDetail",
                components: {
                    AuditDetail,
                    CheckBox,
                    CompletionSettings,
                    ConfirmationEmail,
                    Panel,
                    PersonEntrySettings,
                    RockButton,
                    RockForm,
                    SectionContainer,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const sources = useSources();
                    const name = ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const isActive = ref((_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : true);
                    const isLoginRequired = ref((_d = props.modelValue.isLoginRequired) !== null && _d !== void 0 ? _d : false);
                    const formHeader = ref((_e = props.modelValue.formHeader) !== null && _e !== void 0 ? _e : "");
                    const formFooter = ref((_f = props.modelValue.formFooter) !== null && _f !== void 0 ? _f : "");
                    const allowPersonEntry = ref((_g = props.modelValue.allowPersonEntry) !== null && _g !== void 0 ? _g : false);
                    const personEntry = ref((_h = props.modelValue.personEntry) !== null && _h !== void 0 ? _h : {});
                    const confirmationEmail = ref((_j = props.modelValue.confirmationEmail) !== null && _j !== void 0 ? _j : {});
                    const internalCompletionAction = ref(props.modelValue.completionAction);
                    const completionAction = computed({
                        get() {
                            var _a;
                            return (_a = internalCompletionAction.value) !== null && _a !== void 0 ? _a : {};
                        },
                        set(value) {
                            if (completionActionEnabled.value) {
                                updateRefValue(internalCompletionAction, value);
                            }
                        }
                    });
                    const completionActionEnabled = computed({
                        get() {
                            return !!internalCompletionAction.value;
                        },
                        set(value) {
                            updateRefValue(internalCompletionAction, value ? {} : null);
                        }
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        updateRefValue(isActive, (_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : true);
                        updateRefValue(isLoginRequired, (_d = props.modelValue.isLoginRequired) !== null && _d !== void 0 ? _d : false);
                        updateRefValue(formHeader, (_e = props.modelValue.formHeader) !== null && _e !== void 0 ? _e : "");
                        updateRefValue(formFooter, (_f = props.modelValue.formFooter) !== null && _f !== void 0 ? _f : "");
                        updateRefValue(allowPersonEntry, (_g = props.modelValue.allowPersonEntry) !== null && _g !== void 0 ? _g : false);
                        updateRefValue(personEntry, (_h = props.modelValue.personEntry) !== null && _h !== void 0 ? _h : {});
                        updateRefValue(confirmationEmail, (_j = props.modelValue.confirmationEmail) !== null && _j !== void 0 ? _j : {});
                        updateRefValue(internalCompletionAction, props.modelValue.completionAction);
                    });
                    watch([name, description, isActive, isLoginRequired, formHeader, formFooter, allowPersonEntry, personEntry, confirmationEmail, internalCompletionAction], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: name.value, description: description.value, isActive: isActive.value, isLoginRequired: isLoginRequired.value, formHeader: formHeader.value, formFooter: formFooter.value, allowPersonEntry: allowPersonEntry.value, personEntry: personEntry.value, confirmationEmail: confirmationEmail.value, completionAction: internalCompletionAction.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        addressTypeOptions: sources.addressTypeOptions,
                        allowPersonEntry,
                        campusStatusOptions: sources.campusStatusOptions,
                        campusTypeOptions: sources.campusTypeOptions,
                        completionAction,
                        completionActionEnabled,
                        confirmationEmail,
                        connectionStatusOptions: sources.connectionStatusOptions,
                        description,
                        formFooter,
                        formHeader,
                        isActive,
                        isLoginRequired,
                        name,
                        personEntry,
                        recipientOptions,
                        recordStatusOptions: sources.recordStatusOptions,
                        sourceTemplateOptions: sources.emailTemplateOptions
                    };
                },
                template: `
<div>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="name"
                label="Name"
                rules="required" />
        </div>

        <div class="col-md-6">
            <CheckBox v-model="isActive"
                label="Active" />
        </div>
    </div>

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <CheckBox v-model="isLoginRequired"
        label="Is Login Required"
        help="Determines if a person needs to be logged in to complete this form." />

    <SectionContainer title="Form Headers and Footers"
        description="The headers and footers below will be displayed on all pages of the forms that use this template.">
        <TextBox v-model="formHeader"
            label="Form Header"
            textMode="multiline" />

        <TextBox v-model="formFooter"
            label="Form Footer"
            textMode="multiline" />
    </SectionContainer>

    <SectionContainer v-model="allowPersonEntry"
        toggleText="Enable"
        title="Person Entry Settings"
        description="These settings will lock the forms person entry settings.">
        <PersonEntrySettings v-model="personEntry"
            :recordStatusOptions="recordStatusOptions"
            :connectionStatusOptions="connectionStatusOptions"
            :campusTypeOptions="campusTypeOptions"
            :campusStatusOptions="campusStatusOptions"
            :addressTypeOptions="addressTypeOptions" />
    </SectionContainer>

    <ConfirmationEmail v-model="confirmationEmail"
        :recipientOptions="recipientOptions"
        :sourceTemplateOptions="sourceTemplateOptions" />

    <CompletionSettings v-model="completionAction" v-model:enabled="completionActionEnabled" hasEnable />
</div>
`
            });

            var ViewPanel = defineComponent({
                name: "Workflow.FormTemplateDetail",
                components: {},
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                setup(props) {
                    var _a, _b, _c;
                    const name = ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const usedByWorkflowTypes = ref((_c = props.modelValue.usedBy) !== null && _c !== void 0 ? _c : []);
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        updateRefValue(usedByWorkflowTypes, (_c = props.modelValue.usedBy) !== null && _c !== void 0 ? _c : []);
                    });
                    return {
                        description,
                        name,
                        usedByWorkflowTypes
                    };
                },
                template: `
<fieldset>
    <dl>
        <dt>Name</dt>
        <dd>{{ name }}</dd>

        <template v-if="description">
            <dt>Description</dt>
            <dd>{{ description }}</dd>
        </template>

        <dt>Used By</dt>
        <dd>
            <ul>
                <li v-for="workflowType in usedByWorkflowTypes" :key="workflowType.value">{{ workflowType.text }}</li>
            </ul>
        </dd>
    </dl>
</fieldset>
`
            });

            var formTemplateDetail = exports('default', defineComponent({
                name: "WorkFlow.FormTemplateDetail",
                components: {
                    Alert,
                    AuditDetail,
                    EditPanel,
                    Panel,
                    RockButton,
                    RockForm,
                    ViewPanel
                },
                setup() {
                    var _a, _b, _c;
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const templateDetail = ref(config.template);
                    const templateEditDetail = ref({});
                    const isEditable = ref(config.isEditable);
                    const isEditMode = ref(areEqual((_a = config.templateGuid) !== null && _a !== void 0 ? _a : "", emptyGuid));
                    const isInactive = computed(() => { var _a, _b; return !((_b = (_a = templateDetail.value) === null || _a === void 0 ? void 0 : _a.isActive) !== null && _b !== void 0 ? _b : false); });
                    const isStartupError = !config.template && !config.templateGuid;
                    const blockTitle = computed(() => {
                        var _a, _b;
                        if (!isEditMode.value) {
                            return (_b = (_a = templateDetail.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                        }
                        else {
                            return templateEditDetail.value.name || "Add Template";
                        }
                    });
                    const onEditClick = () => __awaiter(this, void 0, void 0, function* () {
                        var _d;
                        const result = yield invokeBlockAction("StartEdit", {
                            guid: (_d = config.templateGuid) !== null && _d !== void 0 ? _d : ""
                        });
                        if (result.isSuccess && result.data) {
                            templateEditDetail.value = result.data;
                            isEditMode.value = true;
                        }
                    });
                    const onEditCancelClick = () => {
                        var _a;
                        if (config.parentUrl && areEqual((_a = config.templateGuid) !== null && _a !== void 0 ? _a : "", emptyGuid)) {
                            window.location.href = config.parentUrl;
                            return;
                        }
                        templateEditDetail.value = {};
                        isEditMode.value = false;
                    };
                    const onSubmit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("SaveTemplate", {
                            guid: (_e = config.templateGuid) !== null && _e !== void 0 ? _e : "",
                            template: templateEditDetail.value
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                templateDetail.value = result.data;
                                templateEditDetail.value = {};
                                isEditMode.value = false;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                            }
                        }
                    });
                    provideSources((_b = config.sources) !== null && _b !== void 0 ? _b : {});
                    return {
                        blockTitle,
                        entityKey: (_c = config.templateGuid) !== null && _c !== void 0 ? _c : "",
                        entityTypeGuid: "65fa3078-9d42-4857-b78a-f32a05f7a4c1",
                        isEditable,
                        isInactive,
                        isStartupError,
                        isEditMode,
                        onEditCancelClick,
                        onEditClick,
                        onSubmit,
                        templateDetail,
                        templateEditDetail
                    };
                },
                template: `
<Alert v-if="isStartupError" alertType="warning">
    Unable to view details of this template.
</Alert>

<Panel v-else type="block" :title="blockTitle" titleIconCssClass="fa fa-align-left">
    <template v-if="!isEditMode" #headerActions>
        <span v-if="isInactive" class="label label-danger">Inactive</span>
    </template>

    <template v-if="!isEditMode" #drawer>
        <AuditDetail :entityTypeGuid="entityTypeGuid" :entityKey="entityKey" />
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

        })
    };
}));
