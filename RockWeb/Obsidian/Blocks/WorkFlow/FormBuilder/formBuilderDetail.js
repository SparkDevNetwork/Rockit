System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/panel', '@Obsidian/Controls/rockButton', '@Obsidian/Utility/block', '@Obsidian/Utility/guid', '@Obsidian/Controls/rockForm', './Shared/confirmationEmail', '@Obsidian/Controls/personPicker', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/emailBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', './Shared/emailSource', './Shared/segmentedPicker', '@Obsidian/Controls/sectionContainer', '@Obsidian/Utility/fieldTypes', '@Obsidian/Controls/modal', '@Obsidian/Controls/rockLabel', '@Obsidian/Controls/switch', '@Obsidian/Controls/fieldFilterEditor', '@Obsidian/Controls/fieldTypeEditor', '@Obsidian/Controls/loadingIndicator', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/slider', '@Obsidian/Utility/linq', '@Obsidian/Utility/component', '@Obsidian/Controls/rockField', '@Obsidian/Directives/dragDrop', '@Obsidian/Controls/transitionVerticalCollapse', './Shared/personEntrySettings', '@Obsidian/Utility/dialogs', './Shared/completionSettings', '@Obsidian/Controls/categoryPicker', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/dateTimePicker', '@Obsidian/Controls/inlineSwitch'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, inject, provide, nextTick, reactive, Alert, Panel, RockButton, useInvokeBlockAction, useConfigurationValues, areEqual, newGuid, RockForm, ConfirmationEmail, PersonPicker, DropDownList, EmailBox, TextBox, toNumberOrNull, EmailSource, SegmentedPicker, SectionContainer, getFieldType, Modal, RockLabel, Switch, FieldFilterEditor, FieldTypeEditor, LoadingIndicator, NumberBox, Slider, List, useVModelPassthrough, updateRefValue, RockField, DragSource, DragTarget, TransitionVerticalCollapse, PersonEntrySettings, confirmDelete, CompletionSettings, CategoryPicker, CheckBox, DateTimePicker, InlineSwitch;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            inject = module.inject;
            provide = module.provide;
            nextTick = module.nextTick;
            reactive = module.reactive;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            useConfigurationValues = module.useConfigurationValues;
        }, function (module) {
            areEqual = module.areEqual;
            newGuid = module.newGuid;
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            ConfirmationEmail = module["default"];
        }, function (module) {
            PersonPicker = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            EmailBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            EmailSource = module["default"];
        }, function (module) {
            SegmentedPicker = module["default"];
        }, function (module) {
            SectionContainer = module["default"];
        }, function (module) {
            getFieldType = module.getFieldType;
        }, function (module) {
            Modal = module["default"];
        }, function (module) {
            RockLabel = module["default"];
        }, function (module) {
            Switch = module["default"];
        }, function (module) {
            FieldFilterEditor = module["default"];
        }, function (module) {
            FieldTypeEditor = module["default"];
        }, function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            Slider = module["default"];
        }, function (module) {
            List = module.List;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            RockField = module["default"];
        }, function (module) {
            DragSource = module.DragSource;
            DragTarget = module.DragTarget;
        }, function (module) {
            TransitionVerticalCollapse = module["default"];
        }, function (module) {
            PersonEntrySettings = module["default"];
        }, function (module) {
            confirmDelete = module.confirmDelete;
        }, function (module) {
            CompletionSettings = module["default"];
        }, function (module) {
            CategoryPicker = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            DateTimePicker = module["default"];
        }, function (module) {
            InlineSwitch = module["default"];
        }],
        execute: (function () {

            const notificationDestinationOptions = [
                {
                    value: 0..toString(),
                    text: "Specific Individual"
                },
                {
                    value: 1..toString(),
                    text: "Email Address"
                },
                {
                    value: 2..toString(),
                    text: "Campus Topic Address"
                }
            ];
            var NotificationEmail = defineComponent({
                name: "Workflow.FormBuilderDetail.NotificationEmail",
                components: {
                    DropDownList,
                    EmailBox,
                    EmailSource,
                    PersonPicker,
                    SegmentedPicker,
                    SectionContainer,
                    TextBox,
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sourceTemplateOptions: {
                        type: Array,
                        default: []
                    },
                    campusTopicOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const enabled = ref((_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false);
                    const destination = ref((_c = (_b = props.modelValue.destination) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 0..toString());
                    const recipient = ref((_d = props.modelValue.recipient) !== null && _d !== void 0 ? _d : null);
                    const emailAddress = ref((_e = props.modelValue.emailAddress) !== null && _e !== void 0 ? _e : "");
                    const campusTopicGuid = ref((_f = props.modelValue.campusTopicGuid) !== null && _f !== void 0 ? _f : "");
                    const source = ref((_g = props.modelValue.source) !== null && _g !== void 0 ? _g : {});
                    const isDestinationSpecificIndividual = computed(() => destination.value === 0..toString());
                    const isDestinationEmailAddress = computed(() => destination.value === 1..toString());
                    const isDestinationCampusTopic = computed(() => destination.value === 2..toString());
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        enabled.value = (_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false;
                        destination.value = (_c = (_b = props.modelValue.destination) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 0..toString();
                        recipient.value = (_d = props.modelValue.recipient) !== null && _d !== void 0 ? _d : null;
                        emailAddress.value = (_e = props.modelValue.emailAddress) !== null && _e !== void 0 ? _e : "";
                        campusTopicGuid.value = (_f = props.modelValue.campusTopicGuid) !== null && _f !== void 0 ? _f : "";
                        source.value = (_g = props.modelValue.source) !== null && _g !== void 0 ? _g : {};
                    });
                    watch([enabled, destination, recipient, emailAddress, campusTopicGuid, source], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { enabled: enabled.value, destination: (_a = toNumberOrNull(destination.value)) !== null && _a !== void 0 ? _a : 0, recipient: recipient.value, emailAddress: emailAddress.value, campusTopicGuid: campusTopicGuid.value, source: source.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        campusTopicGuid,
                        destination,
                        destinationOptions: notificationDestinationOptions,
                        emailAddress,
                        enabled,
                        isDestinationSpecificIndividual,
                        isDestinationEmailAddress,
                        isDestinationCampusTopic,
                        recipient,
                        source
                    };
                },
                template: `
<SectionContainer v-model="enabled"
    toggleText="Enable"
    title="Notification Email"
    description="Notification emails can be sent to specified individuals when each form is completed.">
    <SegmentedPicker v-model="destination" :items="destinationOptions" />

    <div v-if="isDestinationSpecificIndividual">
        <div class="row">
            <div class="col-md-4">
                <PersonPicker v-model="recipient"
                    label="Recipient"
                    rules="required" />
            </div>
        </div>
    </div>

    <div v-else-if="isDestinationEmailAddress">
        <div class="row">
            <div class="col-md-4">
                <EmailBox v-model="emailAddress"
                    label="Recipients"
                    rules="required"
                    allowMultiple />
            </div>
        </div>
    </div>

    <div v-else-if="isDestinationCampusTopic">
        <div class="row">
            <div class="col-md-4">
                <DropDownList v-model="campusTopicGuid"
                    label="Topic"
                    rules="required"
                    :items="campusTopicOptions" />
            </div>
        </div>
    </div>

    <div class="mt-3">
        <EmailSource v-model="source" :templateOptions="sourceTemplateOptions" />
    </div>
</SectionContainer>
`
            });

            const sourcesKey = Symbol();
            function provideFormSources(options) {
                provide(sourcesKey, options);
            }
            function useFormSources() {
                var _a;
                return (_a = inject(sourcesKey)) !== null && _a !== void 0 ? _a : {};
            }
            function getFilterGroupTitle(group) {
                switch (group.expressionType) {
                    case 1:
                        return "<strong>Show</strong> when <strong>all</strong> of the following match:";
                    case 2:
                        return "<strong>Show</strong> when <strong>any</strong> of the following match:";
                    case 3:
                        return "<strong>Hide</strong> when <strong>all</strong> of the following match:";
                    case 4:
                        return "<strong>Hide</strong> when <strong>any</strong> of the following match:";
                    default:
                        return "";
                }
            }
            function getFilterRuleDescription(rule, sources, fields) {
                var _a, _b;
                const ruleField = fields.filter(f => areEqual(f.guid, rule.attributeGuid));
                const ruleSource = sources.filter(s => areEqual(s.guid, rule.attributeGuid));
                if (ruleField.length === 1 && ruleSource.length === 1 && ruleSource[0].attribute) {
                    const fieldType = getFieldType(ruleField[0].fieldTypeGuid);
                    if (fieldType) {
                        const descr = fieldType.getFilterValueDescription({
                            comparisonType: rule.comparisonType,
                            value: (_a = rule.value) !== null && _a !== void 0 ? _a : ""
                        }, (_b = ruleSource[0].attribute.configurationValues) !== null && _b !== void 0 ? _b : {});
                        return `${ruleSource[0].attribute.name} ${descr}`;
                    }
                }
                return "";
            }
            function timeoutAsync(ms) {
                return new Promise((_resolve, reject) => {
                    setTimeout(reject, ms);
                });
            }

            var CommunicationsTab = defineComponent({
                name: "Workflow.FormBuilderDetail.CommunicationsTab",
                components: {
                    Alert,
                    ConfirmationEmail,
                    NotificationEmail,
                    RockForm
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    recipientOptions: {
                        type: Array,
                        default: []
                    },
                    templateOverrides: {
                        type: Object
                    },
                    submit: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "validationChanged"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const confirmationEmail = ref((_a = props.modelValue.confirmationEmail) !== null && _a !== void 0 ? _a : {});
                    const notificationEmail = ref((_b = props.modelValue.notificationEmail) !== null && _b !== void 0 ? _b : {});
                    const formSubmit = ref(false);
                    const sources = useFormSources();
                    const sourceTemplateOptions = (_c = sources.emailTemplateOptions) !== null && _c !== void 0 ? _c : [];
                    const campusTopicOptions = (_d = sources.campusTopicOptions) !== null && _d !== void 0 ? _d : [];
                    const isConfirmationEmailForced = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isConfirmationEmailConfigured) !== null && _b !== void 0 ? _b : false; });
                    const onValidationChanged = (errors) => {
                        emit("validationChanged", errors);
                    };
                    watch(() => props.modelValue, () => {
                        var _a, _b;
                        confirmationEmail.value = (_a = props.modelValue.confirmationEmail) !== null && _a !== void 0 ? _a : {};
                        notificationEmail.value = (_b = props.modelValue.notificationEmail) !== null && _b !== void 0 ? _b : {};
                    });
                    watch([confirmationEmail, notificationEmail], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { confirmationEmail: confirmationEmail.value, notificationEmail: notificationEmail.value });
                        emit("update:modelValue", newValue);
                    });
                    watch(() => props.submit, () => {
                        if (props.submit) {
                            formSubmit.value = true;
                        }
                    });
                    return {
                        campusTopicOptions,
                        confirmationEmail,
                        formSubmit,
                        isConfirmationEmailForced,
                        notificationEmail,
                        onValidationChanged,
                        sourceTemplateOptions,
                    };
                },
                template: `
<div class="form-builder-scroll">
    <div class="panel-body">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged">
            <ConfirmationEmail v-if="!isConfirmationEmailForced" v-model="confirmationEmail" :sourceTemplateOptions="sourceTemplateOptions" :recipientOptions="recipientOptions" />
            <Alert v-else alertType="info">
                <h4 class="alert-heading">Confirmation Email</h4>
                <p>
                    The confirmation e-mail is defined on the template and cannot be changed.
                </p>
            </Alert>

            <NotificationEmail v-model="notificationEmail" :sourceTemplateOptions="sourceTemplateOptions" :campusTopicOptions="campusTopicOptions" />
        </RockForm>
    </div>
</div>
`
            });

            var ConfigurableZone = defineComponent({
                name: "Workflow.FormBuilderDetail.ConfigurableZone",
                components: {},
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-gear"
                    },
                    clickBodyToConfigure: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "configure"
                ],
                setup(props, { emit }) {
                    const zoneClasses = computed(() => {
                        const classes = ["configurable-zone"];
                        if (props.modelValue) {
                            classes.push("active");
                        }
                        return classes;
                    });
                    const onActionClick = () => {
                        emit("configure");
                    };
                    const onBodyActionClick = () => {
                        if (props.clickBodyToConfigure) {
                            emit("configure");
                        }
                    };
                    return {
                        onActionClick,
                        onBodyActionClick,
                        zoneClasses
                    };
                },
                template: `
<div :class="zoneClasses">
    <div class="zone-content-container" @click.stop="onBodyActionClick">
        <div class="zone-content">
            <slot />
        </div>
    </div>

    <div class="zone-actions">
        <slot name="preActions" />
        <div v-if="iconCssClass" class="zone-action" @click.stop="onActionClick"><i :class="iconCssClass + ' fa-fw'"></i></div>
        <slot name="postActions" />
    </div>
</div>
`
            });

            function shallowStrictEqual(a, b) {
                const aKeys = Object.keys(a);
                const bKeys = Object.keys(b);
                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                for (const key of aKeys) {
                    if (!bKeys.includes(key)) {
                        return false;
                    }
                    if (a[key] !== b[key]) {
                        return false;
                    }
                }
                return true;
            }
            var FieldEditAside = defineComponent({
                name: "Workflow.FormBuilderDetail.FieldEditAside",
                components: {
                    Panel,
                    FieldFilterEditor,
                    FieldTypeEditor,
                    InlineSwitch: Switch,
                    LoadingIndicator,
                    Modal,
                    NumberBox,
                    RockButton,
                    RockForm,
                    Slider,
                    TextBox,
                    Alert
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    formFields: {
                        type: Array,
                        required: true
                    }
                },
                emits: [
                    "update:modelValue",
                    "close",
                    "validationChanged"
                ],
                methods: {
                    isSafeToClose() {
                        this.formSubmit = true;
                        const result = this.validationErrors.length === 0;
                        if (!result && this.scrollableElement) {
                            this.scrollableElement.scroll({
                                behavior: "smooth",
                                top: 0
                            });
                        }
                        return result;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const invokeBlockAction = useInvokeBlockAction();
                    const fieldTypes = (_a = useFormSources().fieldTypes) !== null && _a !== void 0 ? _a : [];
                    let conditionalSourcesLoadAttempted = false;
                    const fieldName = ref(props.modelValue.name);
                    const fieldDescription = ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const fieldKey = ref(props.modelValue.key);
                    const fieldSize = ref(props.modelValue.size);
                    const isFieldRequired = ref((_c = props.modelValue.isRequired) !== null && _c !== void 0 ? _c : false);
                    const isFieldLabelHidden = ref((_d = props.modelValue.isHideLabel) !== null && _d !== void 0 ? _d : false);
                    const isShowOnGrid = ref((_e = props.modelValue.isShowOnGrid) !== null && _e !== void 0 ? _e : false);
                    const visibilityRule = ref((_f = props.modelValue.visibilityRule) !== null && _f !== void 0 ? _f : null);
                    const fieldTypeValue = ref({
                        fieldTypeGuid: props.modelValue.fieldTypeGuid,
                        configurationValues: (_g = props.modelValue.configurationValues) !== null && _g !== void 0 ? _g : {},
                        defaultValue: (_h = props.modelValue.defaultValue) !== null && _h !== void 0 ? _h : ""
                    });
                    const validationErrors = ref([]);
                    const formSubmit = ref(false);
                    const scrollableElement = ref(null);
                    const conditionalModel = ref(null);
                    const conditionalSources = ref(null);
                    const conditionalPanelOpen = ref(false);
                    const conditionalModalOpen = ref(false);
                    const fieldTypeEditorKey = computed(() => `fieldTypeEditor_${props.modelValue.guid}`);
                    const fieldType = computed(() => {
                        var _a;
                        return (_a = new List(fieldTypes).firstOrUndefined(f => areEqual(f.guid, props.modelValue.fieldTypeGuid))) !== null && _a !== void 0 ? _a : null;
                    });
                    const asideIconSvg = computed(() => { var _a, _b; return (_b = (_a = fieldType.value) === null || _a === void 0 ? void 0 : _a.svg) !== null && _b !== void 0 ? _b : ""; });
                    const fieldKeyRules = computed(() => {
                        const rules = ["required"];
                        const keys = props.formFields
                            .filter(f => !areEqual(f.guid, props.modelValue.guid))
                            .map(f => f.key);
                        rules.push((value) => {
                            const valueString = value;
                            if (keys.includes(valueString)) {
                                return "must be unique";
                            }
                            return "";
                        });
                        return rules;
                    });
                    const hasConditions = computed(() => {
                        var _a;
                        return !!((_a = visibilityRule.value) === null || _a === void 0 ? void 0 : _a.rules) && visibilityRule.value.rules.length > 0;
                    });
                    const conditionalTitle = computed(() => {
                        return visibilityRule.value
                            ? getFilterGroupTitle(visibilityRule.value)
                            : "";
                    });
                    const conditionalRules = computed(() => {
                        var _a, _b;
                        return (_b = (_a = visibilityRule.value) === null || _a === void 0 ? void 0 : _a.rules) !== null && _b !== void 0 ? _b : [];
                    });
                    const isConditionalsLoading = computed(() => !conditionalSources.value);
                    const getRuleDescription = (rule) => {
                        var _a;
                        return getFilterRuleDescription(rule, (_a = conditionalSources.value) !== null && _a !== void 0 ? _a : [], props.formFields);
                    };
                    const loadConditionalSources = () => __awaiter(this, void 0, void 0, function* () {
                        const fields = props.formFields.filter(f => !areEqual(f.guid, props.modelValue.guid));
                        const getFilterSources = invokeBlockAction("GetFilterSources", {
                            formFields: fields
                        });
                        const result = yield Promise.race([getFilterSources, timeoutAsync(2000)]);
                        if (!result || !result.isSuccess || !result.data) {
                            return;
                        }
                        conditionalSources.value = result.data;
                    });
                    const onBackClick = () => emit("close");
                    const onFieldTypeModelValueUpdate = (value) => {
                        emit("update:modelValue", Object.assign(Object.assign({}, props.modelValue), { configurationValues: value.configurationValues, defaultValue: value.defaultValue }));
                    };
                    const onValidationChanged = (errors) => {
                        validationErrors.value = errors;
                        emit("validationChanged", errors);
                    };
                    const onConditionalEditClick = () => __awaiter(this, void 0, void 0, function* () {
                        conditionalModel.value = visibilityRule.value;
                        conditionalModalOpen.value = true;
                    });
                    const onConditionalSave = () => {
                        visibilityRule.value = conditionalModel.value;
                        conditionalModalOpen.value = false;
                    };
                    watch(fieldName, (newValue, oldValue) => {
                        const oldValueAsKey = oldValue.replace(/[^a-zA-Z0-9_\-.]/g, "");
                        if (oldValueAsKey === fieldKey.value) {
                            fieldKey.value = newValue.replace(/[^a-zA-Z0-9_\-.]/g, "");
                        }
                    });
                    watch(conditionalPanelOpen, () => {
                        if (!conditionalPanelOpen.value || conditionalSources.value !== null || conditionalSourcesLoadAttempted) {
                            return;
                        }
                        conditionalSourcesLoadAttempted = true;
                        loadConditionalSources();
                    });
                    watch([fieldName, fieldDescription, fieldKey, fieldSize, isFieldRequired, isFieldLabelHidden, isShowOnGrid, visibilityRule], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: fieldName.value, description: fieldDescription.value, key: fieldKey.value, size: fieldSize.value, isRequired: isFieldRequired.value, isHideLabel: isFieldLabelHidden.value, isShowOnGrid: isShowOnGrid.value, visibilityRule: visibilityRule.value });
                        emit("update:modelValue", newValue);
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        fieldName.value = props.modelValue.name;
                        fieldDescription.value = (_a = props.modelValue.description) !== null && _a !== void 0 ? _a : "";
                        fieldKey.value = props.modelValue.key;
                        fieldSize.value = props.modelValue.size;
                        isFieldRequired.value = (_b = props.modelValue.isRequired) !== null && _b !== void 0 ? _b : false;
                        isFieldLabelHidden.value = (_c = props.modelValue.isHideLabel) !== null && _c !== void 0 ? _c : false;
                        isShowOnGrid.value = (_d = props.modelValue.isShowOnGrid) !== null && _d !== void 0 ? _d : false;
                        visibilityRule.value = (_e = props.modelValue.visibilityRule) !== null && _e !== void 0 ? _e : null;
                        const isConfigChanged = fieldTypeValue.value.fieldTypeGuid !== props.modelValue.fieldTypeGuid
                            || !shallowStrictEqual((_f = fieldTypeValue.value.configurationValues) !== null && _f !== void 0 ? _f : {}, (_g = props.modelValue.configurationValues) !== null && _g !== void 0 ? _g : {})
                            || fieldTypeValue.value.defaultValue !== props.modelValue.defaultValue;
                        if (isConfigChanged) {
                            fieldTypeValue.value = {
                                fieldTypeGuid: props.modelValue.fieldTypeGuid,
                                configurationValues: (_h = props.modelValue.configurationValues) !== null && _h !== void 0 ? _h : {},
                                defaultValue: (_j = props.modelValue.defaultValue) !== null && _j !== void 0 ? _j : ""
                            };
                        }
                    });
                    return {
                        asideIconSvg,
                        conditionalTitle,
                        conditionalModalOpen,
                        conditionalModel,
                        conditionalPanelOpen,
                        conditionalRules,
                        conditionalSources,
                        fieldDescription,
                        fieldKey,
                        fieldKeyRules,
                        fieldName,
                        fieldSize,
                        fieldTypeEditorKey,
                        fieldTypeValue,
                        formSubmit,
                        getRuleDescription,
                        hasConditions,
                        isConditionalsLoading,
                        isFieldLabelHidden,
                        isFieldRequired,
                        isShowOnGrid,
                        onBackClick,
                        onConditionalEditClick,
                        onConditionalSave,
                        onFieldTypeModelValueUpdate,
                        onValidationChanged,
                        scrollableElement,
                        validationErrors,
                    };
                },
                template: `
    <div class="form-sidebar">
    <div class="sidebar-header">
        <div class="sidebar-back" @click="onBackClick">
            <i class="fa fa-chevron-left"></i>
        </div>

        <div class="title">
            <span v-if="asideIconSvg" class="inline-svg icon" v-html="asideIconSvg"></span>
            {{ fieldName }}
        </div>
    </div>

    <div ref="scrollableElement" class="sidebar-body">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged" class="sidebar-panels sidebar-field-edit field-edit-aside">
            <Panel :modelValue="true" title="Field Type" :hasCollapse="true">
                <TextBox v-model="fieldName"
                    rules="required"
                    label="Name" />
                <TextBox v-model="fieldDescription"
                    label="Description"
                    textMode="multiline" />
                <FieldTypeEditor :modelValue="fieldTypeValue" :key="fieldTypeEditorKey" @update:modelValue="onFieldTypeModelValueUpdate" isFieldTypeReadOnly />
            </Panel>

            <Panel title="Conditionals" v-model="conditionalPanelOpen" :hasCollapse="true">
                <LoadingIndicator v-if="isConditionalsLoading" />

                <div v-else-if="conditionalSources.length < 1">
                    <Alert alertType="warning">No source fields available.</Alert>

                    <div class="d-flex justify-content-end">
                        <RockButton btnType="default" btnSize="sm" disabled><i class="fa fa-pencil"></i></RockButton>
                    </div>
                </div>

                <div v-else>
                    <div v-if="hasConditions">
                        <div v-html="conditionalTitle"></div>
                        <ul>
                            <li v-for="rule in conditionalRules" :key="rule.guid">{{ getRuleDescription(rule) }}</li>
                        </ul>
                    </div>

                    <div class="d-flex justify-content-end">
                        <RockButton btnType="default" btnSize="sm" @click="onConditionalEditClick"><i class="fa fa-pencil"></i></RockButton>
                    </div>
                </div>
            </Panel>

            <Panel title="Format" :hasCollapse="true">
                <Slider v-model="fieldSize" label="Column Span" :min="1" :max="12" isIntegerOnly showValueBar/>
                <InlineSwitch v-model="isFieldRequired" text="Required" />
                <InlineSwitch v-model="isFieldLabelHidden" text="Hide Label" />
            </Panel>

            <Panel title="Advanced" :hasCollapse="true">
                <TextBox v-model="fieldKey"
                    :rules="fieldKeyRules"
                    label="Field Key" />
                <InlineSwitch v-model="isShowOnGrid" text="Show on Results Grid" />
            </Panel>
        </RockForm>
    </div>

    <Modal v-model="conditionalModalOpen" title="Conditional Settings" saveText="Save" @save="onConditionalSave">
        <FieldFilterEditor v-model="conditionalModel" :title="fieldName" :sources="conditionalSources" />
    </Modal>
    </div>
`
            });

            var FormContentModal = defineComponent({
                name: "Workflow.FormBuilderDetail.FormContentModal",
                components: {
                    ConfigurableZone,
                    Modal,
                    RockButton,
                    RockForm,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    isVisible: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "save",
                    "update:modelValue",
                    "update:isVisible"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const isVisible = useVModelPassthrough(props, "isVisible", emit);
                    const submitForm = ref(false);
                    const contentTextBox = ref(null);
                    const onStartSave = () => {
                        submitForm.value = true;
                    };
                    const onSubmitForm = () => {
                        emit("save");
                    };
                    watch(isVisible, () => {
                        nextTick(() => {
                            if (contentTextBox.value) {
                                const input = contentTextBox.value.querySelector("textarea");
                                input === null || input === void 0 ? void 0 : input.focus();
                            }
                        });
                    });
                    return {
                        contentTextBox,
                        internalValue,
                        isVisible,
                        onSubmitForm,
                        onStartSave,
                        submitForm,
                    };
                },
                template: `
<Modal v-model="isVisible">
    <RockForm v-model:submit="submitForm" @submit="onSubmitForm">
        <div ref="contentTextBox">
            <TextBox v-model="internalValue" label="Content" textMode="multiline" />
        </div>
    </RockForm>

    <template #customButtons>
        <RockButton btnType="primary" @click="onStartSave">Save</RockButton>
    </template>
</Modal>
`
            });

            var FormContentZone = defineComponent({
                name: "Workflow.FormBuilderDetail.FormContentZone",
                components: {
                    ConfigurableZone
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    placeholder: {
                        type: String,
                        required: true
                    },
                    isActive: {
                        type: Boolean,
                        default: false
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-pencil"
                    }
                },
                emits: [
                    "configure"
                ],
                setup(props, { emit }) {
                    const hasContent = computed(() => !!props.modelValue);
                    const safeContent = computed(() => {
                        if (!props.modelValue) {
                            return "";
                        }
                        const div = document.createElement("div");
                        div.innerHTML = props.modelValue;
                        return div.innerHTML;
                    });
                    const onConfigure = () => emit("configure");
                    return {
                        hasContent,
                        onConfigure,
                        safeContent
                    };
                },
                template: `
<ConfigurableZone :modelValue="isActive" :iconCssClass="iconCssClass" @configure="onConfigure">
    <div class="zone-body">
        <div v-if="hasContent" style="min-height: 24px;" v-html="safeContent"></div>
        <div v-else class="text-center text-muted">{{ placeholder }}</div>
    </div>
</ConfigurableZone>
`
            });

            const campusSetFromOptions = [
                {
                    value: 0..toString(),
                    text: "Current Person"
                },
                {
                    value: 1..toString(),
                    text: "Workflow Person"
                },
                {
                    value: 2..toString(),
                    text: "Query String"
                }
            ];
            var GeneralAside = defineComponent({
                name: "Workflow.FormBuilderDetail.GeneralAside",
                components: {
                    Alert,
                    ConfigurableZone,
                    DropDownList,
                    RockField,
                    RockLabel,
                    Switch,
                    TransitionVerticalCollapse
                },
                directives: {
                    DragSource
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sectionDragOptions: {
                        type: Object,
                        required: true
                    },
                    fieldDragOptions: {
                        type: Object,
                        required: true
                    },
                    isPersonEntryForced: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                methods: {
                    isSafeToClose() {
                        return true;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const campusSetFrom = ref((_b = (_a = props.modelValue.campusSetFrom) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
                    const hasPersonEntry = ref((_c = props.modelValue.hasPersonEntry) !== null && _c !== void 0 ? _c : false);
                    const fieldTypes = (_d = useFormSources().fieldTypes) !== null && _d !== void 0 ? _d : [];
                    const isAdditionalFieldsVisible = ref(false);
                    const commonFieldTypes = computed(() => {
                        return fieldTypes.filter(f => f.isCommon);
                    });
                    const advancedFieldTypes = computed(() => {
                        return fieldTypes.filter(f => !f.isCommon);
                    });
                    const additionalFieldsClass = computed(() => {
                        return isAdditionalFieldsVisible.value ? "fa fa-chevron-up" : "fa fa-chevron-down";
                    });
                    let autoSyncModelValue = true;
                    const onAdditionalFieldsClick = () => {
                        isAdditionalFieldsVisible.value = !isAdditionalFieldsVisible.value;
                    };
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        autoSyncModelValue = false;
                        campusSetFrom.value = (_b = (_a = props.modelValue.campusSetFrom) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                        hasPersonEntry.value = (_c = props.modelValue.hasPersonEntry) !== null && _c !== void 0 ? _c : false;
                        autoSyncModelValue = true;
                    });
                    watch([campusSetFrom, hasPersonEntry], () => {
                        var _a;
                        if (!autoSyncModelValue) {
                            return;
                        }
                        const value = {
                            campusSetFrom: (_a = toNumberOrNull(campusSetFrom.value)) !== null && _a !== void 0 ? _a : undefined,
                            hasPersonEntry: hasPersonEntry.value
                        };
                        emit("update:modelValue", value);
                    });
                    return {
                        additionalFieldsClass,
                        advancedFieldTypes,
                        campusSetFrom,
                        campusSetFromOptions,
                        commonFieldTypes,
                        hasPersonEntry,
                        isAdditionalFieldsVisible,
                        onAdditionalFieldsClick
                    };
                },
                template: `
<div class="form-sidebar">
    <div class="sidebar-header">
        <span class="title">Field List</span>
    </div>

    <div class="sidebar-body">
        <div class="panel-body">
            <div v-drag-source="sectionDragOptions">
                <div class="form-template-item form-template-item-section">
                    <i class="fa fa-expand fa-fw"></i>
                    Section
                </div>
            </div>

            <div class="mt-3">
                <RockLabel>Common Fields</RockLabel>

                <div class="form-template-item-list" v-drag-source="fieldDragOptions">
                    <div v-for="field in commonFieldTypes" class="form-template-item form-template-item-field" :data-field-type="field.guid">
                        <span class="inline-svg icon" v-html="field.svg"></span>
                        <div class="text">{{ field.text }}</div>
                    </div>
                </div>

                <div @click="onAdditionalFieldsClick" class="mt-2">
                    <RockLabel>Additional Fields <i :class="additionalFieldsClass"></i></RockLabel>
                </div>

                <TransitionVerticalCollapse>
                    <div v-if="isAdditionalFieldsVisible" class="form-template-item-list" v-drag-source="fieldDragOptions">
                        <div v-for="field in advancedFieldTypes" class="form-template-item form-template-item-field" :data-field-type="field.guid">
                            <span class="inline-svg icon" v-html="field.svg"></span>
                            <div class="text">{{ field.text }}</div>
                        </div>
                    </div>
                </TransitionVerticalCollapse>
            </div>

            <div class="mt-3">
                <Switch v-if="!isPersonEntryForced" v-model="hasPersonEntry" text="Enable Person Entry" />

                <Alert v-else alertType="info">
                    Person entry is enabled on the template and cannot be changed.
                </Alert>

                <DropDownList v-model="campusSetFrom" label="Campus Set From" :items="campusSetFromOptions" />
            </div>
        </div>
    </div>
</div>
`
            });

            var PersonEntryEditAside = defineComponent({
                name: "Workflow.FormBuilderDetail.PersonEntryEditAside",
                components: {
                    Panel,
                    PersonEntrySettings,
                    RockForm
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                emits: [
                    "update:modelValue",
                    "close",
                    "validationChanged"
                ],
                methods: {
                    isSafeToClose() {
                        this.formSubmit = true;
                        const result = this.validationErrors.length === 0;
                        if (!result && this.scrollableElement) {
                            this.scrollableElement.scroll({
                                behavior: "smooth",
                                top: 0
                            });
                        }
                        return result;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e;
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const validationErrors = ref([]);
                    const scrollableElement = ref(null);
                    const formSubmit = ref(false);
                    const onBackClick = () => emit("close");
                    const onValidationChanged = (errors) => {
                        validationErrors.value = errors;
                        emit("validationChanged", errors);
                    };
                    const options = useFormSources();
                    return {
                        addressTypeOptions: (_a = options.addressTypeOptions) !== null && _a !== void 0 ? _a : [],
                        campusStatusOptions: (_b = options.campusStatusOptions) !== null && _b !== void 0 ? _b : [],
                        campusTypeOptions: (_c = options.campusTypeOptions) !== null && _c !== void 0 ? _c : [],
                        connectionStatusOptions: (_d = options.connectionStatusOptions) !== null && _d !== void 0 ? _d : [],
                        recordStatusOptions: (_e = options.recordStatusOptions) !== null && _e !== void 0 ? _e : [],
                        formSubmit,
                        internalValue,
                        onBackClick,
                        onValidationChanged,
                        scrollableElement,
                        validationErrors
                    };
                },
                template: `
<div class="form-sidebar">
    <div class="sidebar-header">
        <div class="sidebar-back" @click="onBackClick">
            <i class="fa fa-chevron-left"></i>
        </div>

        <span class="title">
            <i class="fa fa-fw fa-user icon"></i>
            Person Entry
        </span>
    </div>

    <div ref="scrollableElement" class="sidebar-body">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged" class="sidebar-panels">
            <div class="panel-body">
                <PersonEntrySettings v-model="internalValue"
                    isVertical
                    :recordStatusOptions="recordStatusOptions"
                    :connectionStatusOptions="connectionStatusOptions"
                    :campusTypeOptions="campusTypeOptions"
                    :campusStatusOptions="campusStatusOptions"
                    :addressTypeOptions="addressTypeOptions" />
            </div>
        </RockForm>
    </div>
</div>
`
            });

            var SectionEditAside = defineComponent({
                name: "Workflow.FormBuilderDetail.SectionEditAside",
                components: {
                    ConfigurableZone,
                    DropDownList,
                    FieldFilterEditor,
                    LoadingIndicator,
                    Modal,
                    Panel,
                    RockButton,
                    RockField,
                    RockForm,
                    Switch,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    formFields: {
                        type: Array,
                        required: true
                    }
                },
                emits: [
                    "close",
                    "update:modelValue",
                    "validationChanged"
                ],
                methods: {
                    isSafeToClose() {
                        this.formSubmit = true;
                        return this.validationErrors.length === 0;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c;
                    const invokeBlockAction = useInvokeBlockAction();
                    let conditionalSourcesLoadAttempted = false;
                    const title = ref(props.modelValue.title);
                    const description = ref(props.modelValue.description);
                    const showHeadingSeparator = ref(props.modelValue.showHeadingSeparator);
                    const sectionType = ref((_a = props.modelValue.type) !== null && _a !== void 0 ? _a : "");
                    const visibilityRule = ref((_b = props.modelValue.visibilityRule) !== null && _b !== void 0 ? _b : null);
                    const validationErrors = ref([]);
                    const formSubmit = ref(false);
                    let autoSyncModelValue = true;
                    const sectionTypeOptions = (_c = useFormSources().sectionTypeOptions) !== null && _c !== void 0 ? _c : [];
                    const conditionalModel = ref(null);
                    const conditionalSources = ref(null);
                    const conditionalPanelOpen = ref(false);
                    const conditionalModalOpen = ref(false);
                    const hasConditions = computed(() => {
                        var _a;
                        return !!((_a = visibilityRule.value) === null || _a === void 0 ? void 0 : _a.rules) && visibilityRule.value.rules.length > 0;
                    });
                    const conditionalTitle = computed(() => {
                        return visibilityRule.value
                            ? getFilterGroupTitle(visibilityRule.value)
                            : "";
                    });
                    const conditionalRules = computed(() => {
                        var _a, _b;
                        return (_b = (_a = visibilityRule.value) === null || _a === void 0 ? void 0 : _a.rules) !== null && _b !== void 0 ? _b : [];
                    });
                    const isConditionalsLoading = computed(() => !conditionalSources.value);
                    const getRuleDescription = (rule) => {
                        var _a;
                        return getFilterRuleDescription(rule, (_a = conditionalSources.value) !== null && _a !== void 0 ? _a : [], props.formFields);
                    };
                    const loadConditionalSources = () => __awaiter(this, void 0, void 0, function* () {
                        const getFilterSources = invokeBlockAction("GetFilterSources", {
                            formFields: props.formFields
                        });
                        const result = yield Promise.race([getFilterSources, timeoutAsync(2000)]);
                        if (!result || !result.isSuccess || !result.data) {
                            return;
                        }
                        conditionalSources.value = result.data;
                    });
                    const onValidationChanged = (errors) => {
                        validationErrors.value = errors;
                        emit("validationChanged", errors);
                    };
                    const onBackClick = () => emit("close");
                    const onConditionalEditClick = () => __awaiter(this, void 0, void 0, function* () {
                        conditionalModel.value = visibilityRule.value;
                        conditionalModalOpen.value = true;
                    });
                    const onConditionalSave = () => {
                        visibilityRule.value = conditionalModel.value;
                        conditionalModalOpen.value = false;
                    };
                    watch(conditionalPanelOpen, () => {
                        if (!conditionalPanelOpen.value || conditionalSources.value !== null || conditionalSourcesLoadAttempted) {
                            return;
                        }
                        conditionalSourcesLoadAttempted = true;
                        loadConditionalSources();
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b;
                        autoSyncModelValue = false;
                        title.value = props.modelValue.title;
                        description.value = props.modelValue.description;
                        showHeadingSeparator.value = props.modelValue.showHeadingSeparator;
                        sectionType.value = (_a = props.modelValue.type) !== null && _a !== void 0 ? _a : "";
                        visibilityRule.value = (_b = props.modelValue.visibilityRule) !== null && _b !== void 0 ? _b : null;
                        autoSyncModelValue = true;
                    });
                    watch([title, description, showHeadingSeparator, sectionType, visibilityRule], () => {
                        if (!autoSyncModelValue) {
                            return;
                        }
                        const value = Object.assign(Object.assign({}, props.modelValue), { title: title.value, description: description.value, showHeadingSeparator: showHeadingSeparator.value, type: sectionType.value === "" ? null : sectionType.value, visibilityRule: visibilityRule.value });
                        emit("update:modelValue", value);
                    });
                    return {
                        conditionalTitle,
                        conditionalModalOpen,
                        conditionalModel,
                        conditionalPanelOpen,
                        conditionalRules,
                        conditionalSources,
                        description,
                        formSubmit,
                        getRuleDescription,
                        hasConditions,
                        isConditionalsLoading,
                        onBackClick,
                        title,
                        onConditionalEditClick,
                        onConditionalSave,
                        onValidationChanged,
                        sectionType,
                        sectionTypeOptions,
                        showHeadingSeparator,
                        validationErrors
                    };
                },
                template: `
<div class="form-sidebar">
    <div class="sidebar-header">
        <div class="sidebar-back" @click="onBackClick">
            <i class="fa fa-chevron-left"></i>
        </div>

        <div class="title">
            Section
        </div>
    </div>

    <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged" class="sidebar-body">
        <div class="sidebar-panels">
            <div></div>
            <Panel :modelValue="true" title="Section Configuration" hasCollapse>
                <TextBox v-model="title"
                    label="Title" />
                <TextBox v-model="description"
                    label="Description"
                    textMode="multiline" />
                <Switch v-model="showHeadingSeparator"
                    label="Show Heading Separator" />
                <DropDownList v-model="sectionType"
                    label="Type"
                    :items="sectionTypeOptions"
                    :showBlankItem="false" />
            </Panel>
            <Panel title="Conditionals" v-model="conditionalPanelOpen" :hasCollapse="true">
                <LoadingIndicator v-if="isConditionalsLoading" />

                <div v-else-if="conditionalSources.length < 1">
                    <Alert alertType="warning">No source fields available.</Alert>

                    <div class="d-flex justify-content-end">
                        <RockButton btnType="default" btnSize="sm" disabled><i class="fa fa-pencil"></i></RockButton>
                    </div>
                </div>

                <div v-else>
                    <div v-if="hasConditions">
                        <div v-html="conditionalTitle"></div>
                        <ul>
                            <li v-for="rule in conditionalRules" :key="rule.guid">{{ getRuleDescription(rule) }}</li>
                        </ul>
                    </div>
                    <div class="d-flex justify-content-end">
                        <RockButton btnType="default" btnSize="sm" @click="onConditionalEditClick"><i class="fa fa-pencil"></i></RockButton>
                    </div>
                </div>
            </Panel>
        </div>
    </RockForm>

    <Modal v-model="conditionalModalOpen" title="Conditional Settings" saveText="Save" @save="onConditionalSave">
        <FieldFilterEditor v-model="conditionalModel" :title="fieldName" :sources="conditionalSources" />
    </Modal>
</div>
`
            });

            function getAttributeFromField(field) {
                var _a, _b, _c;
                return {
                    attributeGuid: newGuid(),
                    fieldTypeGuid: field.fieldTypeGuid,
                    name: !((_a = field.isHideLabel) !== null && _a !== void 0 ? _a : false) ? field.name : "",
                    key: field.key,
                    configurationValues: field.configurationValues,
                    isRequired: (_b = field.isRequired) !== null && _b !== void 0 ? _b : false,
                    description: (_c = field.description) !== null && _c !== void 0 ? _c : "",
                    order: 0,
                    categories: []
                };
            }
            const fieldWrapper = defineComponent({
                name: "Workflow.FormBuilderDetail.SectionZone.FieldWrapper",
                components: {
                    RockField
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                setup(props) {
                    var _a;
                    const attribute = ref(getAttributeFromField(props.modelValue));
                    const defaultValue = ref((_a = props.modelValue.defaultValue) !== null && _a !== void 0 ? _a : "");
                    watch(() => props.modelValue, () => {
                        var _a;
                        attribute.value = getAttributeFromField(props.modelValue);
                        defaultValue.value = (_a = props.modelValue.defaultValue) !== null && _a !== void 0 ? _a : "";
                    }, {
                        deep: true
                    });
                    return {
                        attribute,
                        defaultValue
                    };
                },
                template: `
<RockField :modelValue="defaultValue" :attribute="attribute" isEditMode />
`
            });
            var SectionZone = defineComponent({
                name: "Workflow.FormBuilderDetail.SectionZone",
                components: {
                    ConfigurableZone,
                    RockField,
                    FieldWrapper: fieldWrapper
                },
                directives: {
                    DragSource,
                    DragTarget
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    dragTargetId: {
                        type: String,
                        required: true
                    },
                    reorderDragOptions: {
                        type: Object,
                        required: true
                    },
                    activeZone: {
                        type: String,
                        required: false
                    },
                    sectionTypeOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "configureField",
                    "delete",
                    "deleteField"
                ],
                setup(props, { emit }) {
                    const sectionGuid = ref(props.modelValue.guid);
                    const title = ref(props.modelValue.title);
                    const description = ref(props.modelValue.description);
                    const showSeparator = ref(props.modelValue.showHeadingSeparator);
                    const sectionType = ref(props.modelValue.type);
                    const fields = ref(props.modelValue.fields);
                    const sectionTypeClass = computed(() => {
                        var _a;
                        if (sectionType.value) {
                            const sectionTypeValue = sectionType.value;
                            const matches = props.sectionTypeOptions.filter(t => areEqual(sectionTypeValue, t.value));
                            if (matches.length > 0) {
                                return (_a = matches[0].category) !== null && _a !== void 0 ? _a : "";
                            }
                        }
                        return "";
                    });
                    const isSectionActive = computed(() => props.activeZone === sectionGuid.value);
                    const getFieldColumnSize = (field) => `flex-col flex-col-${field.size}`;
                    const isFieldActive = (field) => {
                        return field.guid === props.activeZone;
                    };
                    const onConfigureField = (field) => {
                        emit("configureField", field);
                    };
                    const onDelete = () => {
                        emit("delete", props.modelValue.guid);
                    };
                    const onDeleteField = (field) => {
                        emit("deleteField", field.guid);
                    };
                    watch(() => [props.modelValue.guid, props.modelValue.title, props.modelValue.description, props.modelValue.showHeadingSeparator, props.modelValue.type, props.modelValue.fields], () => {
                        console.log("section changed");
                        sectionGuid.value = props.modelValue.guid;
                        title.value = props.modelValue.title;
                        description.value = props.modelValue.description;
                        showSeparator.value = props.modelValue.showHeadingSeparator;
                        sectionType.value = props.modelValue.type;
                        fields.value = props.modelValue.fields;
                    });
                    return {
                        description,
                        fields,
                        getFieldColumnSize,
                        isFieldActive,
                        isSectionActive,
                        onConfigureField,
                        onDelete,
                        onDeleteField,
                        sectionGuid,
                        sectionTypeClass,
                        showSeparator,
                        title
                    };
                },
                template: `
<ConfigurableZone class="zone-section" :modelValue="isSectionActive">
    <div class="zone-body">
        <div class="d-flex flex-column" :class="sectionTypeClass" style="flex-grow: 1;">
            <div>
                <h1 v-if="title">{{ title }}</h1>
                <div v-if="description" class="mb-2">{{ description }}</div>
                <hr v-if="showSeparator" />
            </div>

            <div class="form-section" v-drag-source="reorderDragOptions" v-drag-target="reorderDragOptions.id" v-drag-target:2="dragTargetId" :data-section-id="sectionGuid">
                <ConfigurableZone v-for="field in fields"
                    :key="field.guid"
                    :modelValue="isFieldActive(field)"
                    :class="getFieldColumnSize(field)"
                    :data-field-id="field.guid"
                    clickBodyToConfigure
                    @configure="onConfigureField(field)">
                    <div class="zone-body">
                        <FieldWrapper :modelValue="field" />
                    </div>

                    <template #preActions>
                        <div class="zone-action zone-action-move"><i class="fa fa-bars fa-fw"></i></div>
                    </template>
                    <template #postActions>
                        <i class="fa fa-times fa-fw zone-action zone-action-delete" @click.stop="onDeleteField(field)"></i>
                    </template>
                </ConfigurableZone>
            </div>
        </div>
    </div>
    <template #preActions>
        <div class="zone-action zone-action-move"><i class="fa fa-bars fa-fw "></i></div>
    </template>
    <template #postActions>
        <div class="zone-action zone-action-delete" @click.stop="onDelete"><i class="fa fa-times fa-fw"></i></div>
    </template>
</ConfigurableZone>
`
            });

            function getSectionDragSourceOptions(sections, defaultSectionType) {
                return {
                    id: newGuid(),
                    copyElement: true,
                    dragDrop(operation) {
                        operation.element.remove();
                        if (operation.targetIndex !== undefined) {
                            sections.splice(operation.targetIndex, 0, {
                                guid: newGuid(),
                                title: "",
                                description: "",
                                showHeadingSeparator: false,
                                type: defaultSectionType,
                                fields: [],
                                visibilityRule: {
                                    guid: newGuid(),
                                    expressionType: 1,
                                    rules: []
                                }
                            });
                        }
                    }
                };
            }
            function getFieldDragSourceOptions(sections, availableFieldTypes) {
                return {
                    id: newGuid(),
                    copyElement: true,
                    dragOver(operation) {
                        var _a;
                        if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                            (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.add("highlight");
                        }
                    },
                    dragOut(operation) {
                        var _a;
                        if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                            (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("highlight");
                        }
                    },
                    dragShadow(operation) {
                        if (operation.shadow) {
                            operation.shadow.classList.remove("col-xs-6");
                            operation.shadow.classList.add("flex-col", "flex-col-12");
                        }
                    },
                    dragDrop(operation) {
                        var _a, _b;
                        operation.element.remove();
                        const fieldTypeGuid = (_a = operation.element.dataset.fieldType) !== null && _a !== void 0 ? _a : "";
                        const sectionGuid = (_b = operation.targetContainer.dataset.sectionId) !== null && _b !== void 0 ? _b : "";
                        const section = new List(sections).firstOrUndefined(s => areEqual(s.guid, sectionGuid));
                        const fieldType = new List(availableFieldTypes.value).firstOrUndefined(f => areEqual(f.guid, fieldTypeGuid));
                        if (section && fieldType && operation.targetIndex !== undefined) {
                            const existingKeys = [];
                            for (const sect of sections) {
                                if (sect.fields) {
                                    for (const field of sect.fields) {
                                        existingKeys.push(field.key);
                                    }
                                }
                            }
                            const baseKey = fieldType.text.replace(/[^a-zA-Z0-9_\-.]/g, "");
                            let key = baseKey;
                            let keyCount = 0;
                            while (existingKeys.includes(key)) {
                                keyCount++;
                                key = `${baseKey}${keyCount}`;
                            }
                            if (!section.fields) {
                                section.fields = [];
                            }
                            section.fields.splice(operation.targetIndex, 0, {
                                guid: newGuid(),
                                fieldTypeGuid: fieldType.guid,
                                name: fieldType.text,
                                key: key,
                                size: 12,
                                configurationValues: {},
                                defaultValue: "",
                                visibilityRule: {
                                    guid: newGuid(),
                                    expressionType: 1,
                                    rules: []
                                }
                            });
                        }
                    }
                };
            }
            function getFieldReorderDragSourceOptions(sections) {
                return {
                    id: newGuid(),
                    copyElement: false,
                    handleSelector: ".zone-actions > .zone-action-move",
                    dragOver(operation) {
                        var _a;
                        if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                            (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.add("highlight");
                        }
                    },
                    dragOut(operation) {
                        var _a;
                        if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                            (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("highlight");
                        }
                    },
                    dragDrop(operation) {
                        var _a, _b;
                        const sourceSectionGuid = (_a = operation.sourceContainer.dataset.sectionId) !== null && _a !== void 0 ? _a : "";
                        const targetSectionGuid = (_b = operation.targetContainer.dataset.sectionId) !== null && _b !== void 0 ? _b : "";
                        const sourceSection = new List(sections).firstOrUndefined(s => areEqual(s.guid, sourceSectionGuid));
                        const targetSection = new List(sections).firstOrUndefined(s => areEqual(s.guid, targetSectionGuid));
                        if ((sourceSection === null || sourceSection === void 0 ? void 0 : sourceSection.fields) && (targetSection === null || targetSection === void 0 ? void 0 : targetSection.fields) && operation.targetIndex !== undefined) {
                            const field = sourceSection.fields[operation.sourceIndex];
                            sourceSection.fields.splice(operation.sourceIndex, 1);
                            targetSection.fields.splice(operation.targetIndex, 0, field);
                        }
                    }
                };
            }
            function getSectionReorderDragSourceOptions(sections) {
                return {
                    id: newGuid(),
                    copyElement: false,
                    handleSelector: ".zone-section > .zone-actions > .zone-action-move > .fa",
                    dragDrop(operation) {
                        if (operation.targetIndex !== undefined) {
                            const section = sections[operation.sourceIndex];
                            sections.splice(operation.sourceIndex, 1);
                            sections.splice(operation.targetIndex, 0, section);
                        }
                    }
                };
            }
            const formHeaderZoneGuid = "C7D522D0-A18C-4CB0-B604-B2E9727E9E33";
            const formFooterZoneGuid = "317E5892-C156-4614-806F-BE4CAB67AC10";
            const personEntryZoneGuid = "5257312E-102C-4026-B558-10184AFEAC4D";
            var FormBuilderTab = defineComponent({
                name: "Workflow.FormBuilderDetail.FormBuilderTab",
                components: {
                    ConfigurableZone,
                    DropDownList,
                    FieldEditAside,
                    FormContentModal,
                    FormContentZone,
                    GeneralAside,
                    Modal,
                    Panel,
                    RockButton,
                    RockForm,
                    RockLabel,
                    PersonEntryEditAside,
                    SectionEditAside,
                    SectionZone,
                    Switch,
                    TextBox
                },
                directives: {
                    DragSource,
                    DragTarget,
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    templateOverrides: {
                        type: Object
                    },
                    submit: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "validationChanged"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const sources = useFormSources();
                    const sectionTypeOptions = (_a = sources.sectionTypeOptions) !== null && _a !== void 0 ? _a : [];
                    const sections = reactive((_b = props.modelValue.sections) !== null && _b !== void 0 ? _b : []);
                    const formHeaderContent = ref((_c = props.modelValue.headerContent) !== null && _c !== void 0 ? _c : "");
                    const formFooterContent = ref((_d = props.modelValue.footerContent) !== null && _d !== void 0 ? _d : "");
                    const formHeaderEditContent = ref("");
                    const formFooterEditContent = ref("");
                    const availableFieldTypes = ref((_e = sources.fieldTypes) !== null && _e !== void 0 ? _e : []);
                    const generalAsideSettings = ref({
                        campusSetFrom: props.modelValue.campusSetFrom,
                        hasPersonEntry: props.modelValue.allowPersonEntry
                    });
                    const sectionAsideSettings = ref(null);
                    const personEntryAsideSettings = ref((_f = props.modelValue.personEntry) !== null && _f !== void 0 ? _f : {});
                    const sectionDragSourceOptions = getSectionDragSourceOptions(sections, (_g = sources.defaultSectionType) !== null && _g !== void 0 ? _g : null);
                    const sectionReorderDragSourceOptions = getSectionReorderDragSourceOptions(sections);
                    const fieldDragSourceOptions = getFieldDragSourceOptions(sections, availableFieldTypes);
                    const fieldReorderDragSourceOptions = getFieldReorderDragSourceOptions(sections);
                    const bodyElement = ref(null);
                    const generalAsideComponentInstance = ref(null);
                    const personEntryAsideComponentInstance = ref(null);
                    const sectionEditAsideComponentInstance = ref(null);
                    const fieldEditAsideComponentInstance = ref(null);
                    const personEntryEditAsideComponentInstance = ref(null);
                    const activeZone = ref("");
                    const editField = ref(null);
                    const activeAside = computed(() => {
                        if (showGeneralAside.value) {
                            return generalAsideComponentInstance.value;
                        }
                        else if (personEntryAsideComponentInstance.value) {
                            return personEntryAsideComponentInstance.value;
                        }
                        else if (sectionEditAsideComponentInstance.value) {
                            return sectionEditAsideComponentInstance.value;
                        }
                        else if (fieldEditAsideComponentInstance.value) {
                            return fieldEditAsideComponentInstance.value;
                        }
                        else if (personEntryEditAsideComponentInstance.value) {
                            return personEntryEditAsideComponentInstance.value;
                        }
                        else {
                            return null;
                        }
                    });
                    const showGeneralAside = computed(() => {
                        return !showFieldAside.value && !showSectionAside.value && !showPersonEntryAside.value;
                    });
                    const showFieldAside = computed(() => {
                        return editField.value !== null;
                    });
                    const showSectionAside = computed(() => {
                        return sectionAsideSettings.value !== null;
                    });
                    const showPersonEntryAside = computed(() => activeZone.value === personEntryZoneGuid);
                    const hasPersonEntry = computed(() => {
                        var _a, _b, _c;
                        if ((_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false) {
                            return true;
                        }
                        return (_c = generalAsideSettings.value.hasPersonEntry) !== null && _c !== void 0 ? _c : false;
                    });
                    const isFormHeaderActive = computed({
                        get: () => {
                            return activeZone.value === formHeaderZoneGuid;
                        },
                        set(value) {
                            if (!value && activeZone.value === formHeaderZoneGuid) {
                                closeAside();
                            }
                        }
                    });
                    const isFormFooterActive = computed({
                        get: () => {
                            return activeZone.value === formFooterZoneGuid;
                        },
                        set(value) {
                            if (!value && activeZone.value === formFooterZoneGuid) {
                                closeAside();
                            }
                        }
                    });
                    const isPersonEntryActive = computed(() => activeZone.value === personEntryZoneGuid);
                    const isPersonEntryForced = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false; });
                    const personEntryZoneIconClass = computed(() => {
                        if (isPersonEntryForced.value) {
                            return "";
                        }
                        return "fa fa-gear";
                    });
                    const templateFormHeaderContent = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.formHeader) !== null && _b !== void 0 ? _b : ""; });
                    const templateFormFooterContent = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.formFooter) !== null && _b !== void 0 ? _b : ""; });
                    const existingFields = computed(() => {
                        const fields = [];
                        for (const sect of sections) {
                            if (sect.fields) {
                                for (const field of sect.fields) {
                                    fields.push(field);
                                }
                            }
                        }
                        return fields;
                    });
                    const canCloseAside = () => {
                        if (activeAside.value) {
                            return activeAside.value.isSafeToClose();
                        }
                        else {
                            return true;
                        }
                    };
                    const closeAside = () => {
                        editField.value = null;
                        activeZone.value = "";
                        sectionAsideSettings.value = null;
                        emit("validationChanged", []);
                    };
                    const onConfigureFormHeader = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        formHeaderEditContent.value = formHeaderContent.value;
                        activeZone.value = formHeaderZoneGuid;
                    };
                    const onConfigureFormFooter = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        formFooterEditContent.value = formFooterContent.value;
                        activeZone.value = formFooterZoneGuid;
                    };
                    const onConfigurePersonEntry = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        activeZone.value = personEntryZoneGuid;
                    };
                    const onConfigureSection = (section) => {
                        var _a, _b, _c, _d;
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        activeZone.value = section.guid;
                        sectionAsideSettings.value = {
                            guid: section.guid,
                            title: (_a = section.title) !== null && _a !== void 0 ? _a : "",
                            description: (_b = section.description) !== null && _b !== void 0 ? _b : "",
                            showHeadingSeparator: (_c = section.showHeadingSeparator) !== null && _c !== void 0 ? _c : false,
                            type: (_d = section.type) !== null && _d !== void 0 ? _d : null,
                            visibilityRule: section.visibilityRule
                        };
                    };
                    const onConfigureField = (field) => {
                        var _a;
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        for (const section of sections) {
                            for (const existingField of ((_a = section.fields) !== null && _a !== void 0 ? _a : [])) {
                                if (areEqual(existingField.guid, field.guid)) {
                                    activeZone.value = existingField.guid;
                                    editField.value = existingField;
                                    return;
                                }
                            }
                        }
                    };
                    const onAsideClose = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        activeZone.value = "";
                        editField.value = null;
                        sectionAsideSettings.value = null;
                    };
                    const onFieldEditUpdate = (value) => {
                        editField.value = value;
                        for (const section of sections) {
                            if (section.fields) {
                                const existingFieldIndex = section.fields.findIndex(f => areEqual(f.guid, value.guid));
                                if (existingFieldIndex !== -1) {
                                    section.fields.splice(existingFieldIndex, 1, value);
                                    return;
                                }
                            }
                        }
                    };
                    const onFieldDelete = (guid) => __awaiter(this, void 0, void 0, function* () {
                        if (!(yield confirmDelete("field"))) {
                            return;
                        }
                        deleteField(guid);
                    });
                    const deleteField = (guid) => {
                        var _a, _b, _c, _d, _e, _f;
                        for (const section of sections) {
                            if (section.fields) {
                                const existingFieldIndex = section.fields.findIndex(f => areEqual(f.guid, guid));
                                if (existingFieldIndex !== -1) {
                                    section.fields.splice(existingFieldIndex, 1);
                                }
                                for (const field of section.fields) {
                                    if ((_b = (_a = field.visibilityRule) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.length) {
                                        field.visibilityRule.rules = field.visibilityRule.rules.filter(rule => rule.attributeGuid !== guid);
                                    }
                                }
                            }
                            if ((_d = (_c = section.visibilityRule) === null || _c === void 0 ? void 0 : _c.rules) === null || _d === void 0 ? void 0 : _d.length) {
                                section.visibilityRule.rules = section.visibilityRule.rules.filter(rule => rule.attributeGuid !== guid);
                            }
                        }
                        if (areEqual(guid, (_f = (_e = editField.value) === null || _e === void 0 ? void 0 : _e.guid) !== null && _f !== void 0 ? _f : null)) {
                            closeAside();
                        }
                    };
                    const onSectionEditUpdate = (value) => {
                        sectionAsideSettings.value = value;
                        for (const section of sections) {
                            if (areEqual(section.guid, value.guid)) {
                                section.title = value.title;
                                section.description = value.description;
                                section.showHeadingSeparator = value.showHeadingSeparator;
                                section.type = value.type;
                                section.visibilityRule = value.visibilityRule;
                                return;
                            }
                        }
                    };
                    const onSectionDelete = (guid) => __awaiter(this, void 0, void 0, function* () {
                        var _h, _j;
                        if (!(yield confirmDelete("section"))) {
                            return;
                        }
                        const existingSectionIndex = sections.findIndex(s => areEqual(s.guid, guid));
                        if (existingSectionIndex !== -1) {
                            const section = sections[existingSectionIndex];
                            if (section.fields) {
                                const guids = section.fields.map(field => field.guid);
                                for (const guid of guids) {
                                    deleteField(guid);
                                }
                            }
                            sections.splice(existingSectionIndex, 1);
                        }
                        if (areEqual(guid, (_j = (_h = sectionAsideSettings.value) === null || _h === void 0 ? void 0 : _h.guid) !== null && _j !== void 0 ? _j : null)) {
                            closeAside();
                        }
                    });
                    const onEditPersonEntryUpdate = (value) => {
                        personEntryAsideSettings.value = value;
                    };
                    const onFormHeaderSave = () => {
                        formHeaderContent.value = formHeaderEditContent.value;
                        closeAside();
                    };
                    const onFormFooterSave = () => {
                        formFooterContent.value = formFooterEditContent.value;
                        closeAside();
                    };
                    const onFieldEditValidationChanged = (errors) => {
                        if (showFieldAside.value) {
                            emit("validationChanged", errors);
                        }
                    };
                    const onSectionValidationChanged = (errors) => {
                        if (showSectionAside.value) {
                            emit("validationChanged", errors);
                        }
                    };
                    const onPersonEntryValidationChanged = (errors) => {
                        if (showPersonEntryAside.value) {
                            emit("validationChanged", errors);
                        }
                    };
                    watch(bodyElement, () => {
                        var _a, _b, _c, _d;
                        sectionDragSourceOptions.mirrorContainer = (_a = bodyElement.value) !== null && _a !== void 0 ? _a : undefined;
                        sectionReorderDragSourceOptions.mirrorContainer = (_b = bodyElement.value) !== null && _b !== void 0 ? _b : undefined;
                        fieldDragSourceOptions.mirrorContainer = (_c = bodyElement.value) !== null && _c !== void 0 ? _c : undefined;
                        fieldReorderDragSourceOptions.mirrorContainer = (_d = bodyElement.value) !== null && _d !== void 0 ? _d : undefined;
                    });
                    watch(() => props.templateOverrides, (newValue, oldValue) => {
                        var _a, _b;
                        if (((_a = newValue === null || newValue === void 0 ? void 0 : newValue.isPersonEntryConfigured) !== null && _a !== void 0 ? _a : false) !== ((_b = oldValue === null || oldValue === void 0 ? void 0 : oldValue.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false)) {
                            if (isPersonEntryActive.value) {
                                closeAside();
                            }
                        }
                    });
                    watch([sections, formHeaderContent, formFooterContent, generalAsideSettings, personEntryAsideSettings], () => {
                        const newValue = {
                            allowPersonEntry: generalAsideSettings.value.hasPersonEntry,
                            campusSetFrom: generalAsideSettings.value.campusSetFrom,
                            footerContent: formFooterContent.value,
                            headerContent: formHeaderContent.value,
                            personEntry: personEntryAsideSettings.value,
                            sections: sections
                        };
                        emit("update:modelValue", newValue);
                    });
                    watch(() => props.submit, () => {
                        if (props.submit) {
                            canCloseAside();
                        }
                    });
                    return {
                        activeZone,
                        availableFieldTypes,
                        bodyElement,
                        editField,
                        existingFields,
                        fieldDragSourceOptions,
                        fieldDragTargetId: fieldDragSourceOptions.id,
                        fieldEditAsideComponentInstance,
                        fieldReorderDragSourceOptions,
                        formFooterContent,
                        formFooterEditContent,
                        formHeaderContent,
                        formHeaderEditContent,
                        generalAsideComponentInstance,
                        generalAsideSettings,
                        hasPersonEntry,
                        isFormFooterActive,
                        isFormHeaderActive,
                        isPersonEntryActive,
                        isPersonEntryForced,
                        onAsideClose,
                        onConfigureField,
                        onConfigureFormHeader,
                        onConfigureFormFooter,
                        onConfigurePersonEntry,
                        onConfigureSection,
                        onFieldEditUpdate,
                        onEditPersonEntryUpdate,
                        onSectionEditUpdate,
                        onFieldDelete,
                        onFieldEditValidationChanged,
                        onFormFooterSave,
                        onFormHeaderSave,
                        onPersonEntryValidationChanged,
                        onSectionDelete,
                        onSectionValidationChanged,
                        personEntryAsideSettings,
                        personEntryEditAsideComponentInstance,
                        personEntryZoneIconClass,
                        sectionAsideSettings,
                        sectionDragSourceOptions,
                        sectionDragTargetId: sectionDragSourceOptions.id,
                        sectionReorderDragSourceOptions,
                        sectionTypeOptions,
                        sections,
                        showFieldAside,
                        showGeneralAside,
                        showPersonEntryAside,
                        showSectionAside,
                        templateFormFooterContent,
                        templateFormHeaderContent
                    };
                },
                template: `
<div ref="bodyElement" class="form-builder-grow">

    <GeneralAside v-if="showGeneralAside"
        v-model="generalAsideSettings"
        ref="generalAsideComponentInstance"
        :isPersonEntryForced="isPersonEntryForced"
        :fieldTypes="availableFieldTypes"
        :sectionDragOptions="sectionDragSourceOptions"
        :fieldDragOptions="fieldDragSourceOptions" />

    <FieldEditAside v-else-if="showFieldAside"
        :modelValue="editField"
        ref="fieldEditAsideComponentInstance"
        :fieldTypes="availableFieldTypes"
        :formFields="existingFields"
        @update:modelValue="onFieldEditUpdate"
        @close="onAsideClose"
        @validationChanged="onFieldEditValidationChanged" />

    <SectionEditAside v-else-if="showSectionAside"
        :modelValue="sectionAsideSettings"
        ref="sectionEditAsideComponentInstance"
        :formFields="existingFields"
        @update:modelValue="onSectionEditUpdate"
        @close="onAsideClose"
        @validationChanged="onSectionValidationChanged" />

    <PersonEntryEditAside v-else-if="showPersonEntryAside"
        :modelValue="personEntryAsideSettings"
        ref="personEntryEditAsideComponentInstance"
        @update:modelValue="onEditPersonEntryUpdate"
        @close="onAsideClose"
        @validationChanged="onPersonEntryValidationChanged" />


    <div class="form-layout">
        <FormContentZone v-if="templateFormHeaderContent" :modelValue="templateFormHeaderContent" placeholder="" iconCssClass="" />

        <FormContentZone :modelValue="formHeaderContent" :isActive="isFormHeaderActive" @configure="onConfigureFormHeader" placeholder="Form Header" />

        <ConfigurableZone v-if="hasPersonEntry" :modelValue="isPersonEntryActive" :iconCssClass="personEntryZoneIconClass" @configure="onConfigurePersonEntry">
            <div class="zone-body">
                <div class="text-center text-muted">Person Entry Form</div>
            </div>
        </ConfigurableZone>

        <div class="form-layout-body" v-drag-target="sectionDragTargetId" v-drag-source="sectionReorderDragSourceOptions" v-drag-target:2="sectionReorderDragSourceOptions.id">
            <SectionZone v-for="section in sections"
                :key="section.guid"
                v-model="section"
                :activeZone="activeZone"
                :dragTargetId="fieldDragTargetId"
                :reorderDragOptions="fieldReorderDragSourceOptions"
                :sectionTypeOptions="sectionTypeOptions"
                @configure="onConfigureSection(section)"
                @configureField="onConfigureField"
                @delete="onSectionDelete"
                @deleteField="onFieldDelete">
            </SectionZone>
        </div>

        <FormContentZone :modelValue="formFooterContent" :isActive="isFormFooterActive" @configure="onConfigureFormFooter" placeholder="Form Footer" />

        <FormContentZone v-if="templateFormFooterContent" :modelValue="templateFormFooterContent" placeholder="" iconCssClass="" />
    </div>
</div>

<FormContentModal v-model="formHeaderEditContent" v-model:isVisible="isFormHeaderActive" title="Form Header" @save="onFormHeaderSave" />

<FormContentModal v-model="formFooterEditContent" v-model:isVisible="isFormFooterActive" title="Form Footer" @save="onFormFooterSave" />
`
            });

            var GeneralSettings = defineComponent({
                name: "Workflow.FormBuilderDetail.GeneralSettings",
                components: {
                    Alert,
                    CategoryPicker,
                    CheckBox,
                    DateTimePicker,
                    DropDownList,
                    EmailSource,
                    InlineSwitch,
                    SectionContainer,
                    TextBox,
                    TransitionVerticalCollapse
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    templateOverrides: {
                        type: Object
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const sources = useFormSources();
                    const name = ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const template = ref((_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                    const category = ref((_d = props.modelValue.category) !== null && _d !== void 0 ? _d : null);
                    const entryStarts = ref((_e = props.modelValue.entryStarts) !== null && _e !== void 0 ? _e : "");
                    const entryEnds = ref((_f = props.modelValue.entryEnds) !== null && _f !== void 0 ? _f : "");
                    const isLoginRequired = ref((_g = props.modelValue.isLoginRequired) !== null && _g !== void 0 ? _g : false);
                    const isLoginRequiredForced = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isLoginRequiredConfigured) !== null && _b !== void 0 ? _b : false; });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f;
                        updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        updateRefValue(template, (_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                        updateRefValue(category, (_d = props.modelValue.category) !== null && _d !== void 0 ? _d : null);
                        updateRefValue(entryStarts, (_e = props.modelValue.entryStarts) !== null && _e !== void 0 ? _e : "");
                        updateRefValue(entryEnds, (_f = props.modelValue.entryEnds) !== null && _f !== void 0 ? _f : "");
                    });
                    watch([name, description, template, category, isLoginRequired, entryStarts, entryEnds], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: name.value, description: description.value, template: template.value, category: category.value, isLoginRequired: isLoginRequired.value, entryStarts: entryStarts.value, entryEnds: entryEnds.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        category,
                        description,
                        entryStarts,
                        entryEnds,
                        isLoginRequired,
                        isLoginRequiredForced,
                        name,
                        template,
                        templateOptions: sources.formTemplateOptions,
                        workflowTypeEntityTypeGuid: "C9F3C4A5-1526-474D-803F-D6C7A45CBBAE"
                    };
                },
                template: `
<SectionContainer title="General Settings"
    description="Update the general settings for the form below.">
    <div class="row">
        <div class="col-md-6">
            <div>
                <TextBox v-model="name"
                    label="Form Name"
                    rules="required" />

                <TextBox v-model="description"
                    label="Description"
                    textMode="multiline" />

                <DropDownList v-model="template"
                    label="Template"
                    :items="templateOptions" />

                <CategoryPicker v-model="category"
                    label="Category"
                    rules="required"
                    :entityTypeGuid="workflowTypeEntityTypeGuid" />
            </div>
        </div>
    </div>

    <CheckBox v-if="!isLoginRequiredForced" v-model="isLoginRequired"
        label="Is Login Required"
        help="Determines if a person needs to be logged in to complete the form." />

    <Alert v-else alertType="info">
        The template has enforced the login required setting.
    </Alert>

    <div class="row">
        <div class="col-md-6">
            <DateTimePicker v-model="entryStarts"
                label="Form Entry Starts" />
        </div>

        <div class="col-md-6">
            <DateTimePicker v-model="entryEnds"
                label="Form Entry Ends" />
        </div>
    </div>
</SectionContainer>
`
            });

            var SettingsTab = defineComponent({
                name: "Workflow.FormBuilderDetail.SettingsTab",
                components: {
                    Alert,
                    GeneralSettings,
                    CompletionSettings,
                    RockForm
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    completion: {
                        type: Object,
                        required: true
                    },
                    templateOverrides: {
                        type: Object
                    },
                    submit: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:completion",
                    "validationChanged"
                ],
                setup(props, { emit }) {
                    const generalSettings = useVModelPassthrough(props, "modelValue", emit);
                    const completionSettings = useVModelPassthrough(props, "completion", emit);
                    const formSubmit = ref(false);
                    const isConfirmationForced = computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isConfirmationEmailConfigured) !== null && _b !== void 0 ? _b : false; });
                    const onValidationChanged = (errors) => {
                        emit("validationChanged", errors);
                    };
                    watch(() => props.submit, () => {
                        if (props.submit) {
                            formSubmit.value = true;
                        }
                    });
                    return {
                        completionSettings,
                        formSubmit,
                        generalSettings,
                        isConfirmationForced,
                        onValidationChanged
                    };
                },
                template: `
<div class="form-builder-scroll">
    <div class="panel-body">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged">
            <GeneralSettings v-model="generalSettings" :templateOverrides="templateOverrides" />

            <CompletionSettings v-if="!isConfirmationForced" v-model="completionSettings" />
            <Alert v-else alertType="info">
                <h4 class="alert-heading">Confirmation Email</h4>
                <p>
                    The completion action is defined on the template and cannot be changed.
                </p>
            </Alert>
        </RockForm>
    </div>
</div>
`
            });

            var formBuilderDetail = exports('default', defineComponent({
                name: "WorkFlow.FormBuilderDetail",
                components: {
                    Alert,
                    CommunicationsTab,
                    FormBuilderTab,
                    Panel,
                    RockButton,
                    SettingsTab
                },
                setup() {
                    var _a, _b, _c, _d, _e, _f;
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const form = (_a = config.form) !== null && _a !== void 0 ? _a : {};
                    const isFormDirty = ref(false);
                    const selectedTab = ref(0);
                    const recipientOptions = ref([]);
                    const communicationsViewModel = ref({
                        confirmationEmail: (_b = form.confirmationEmail) !== null && _b !== void 0 ? _b : {},
                        notificationEmail: (_c = form.notificationEmail) !== null && _c !== void 0 ? _c : {}
                    });
                    const generalViewModel = ref((_d = form.general) !== null && _d !== void 0 ? _d : {});
                    const blockTitle = computed(() => {
                        var _a, _b;
                        return (_b = ((_a = generalViewModel.value) === null || _a === void 0 ? void 0 : _a.name) + " Form") !== null && _b !== void 0 ? _b : "Workflow Form Builder";
                    });
                    const completionViewModel = ref((_e = form.completion) !== null && _e !== void 0 ? _e : {});
                    const builderViewModel = ref({
                        allowPersonEntry: form.allowPersonEntry,
                        campusSetFrom: form.campusSetFrom,
                        footerContent: form.footerContent,
                        headerContent: form.headerContent,
                        personEntry: form.personEntry,
                        sections: form.sections
                    });
                    const blockError = ref("");
                    const formSubmit = ref(false);
                    const communicationsValidationErrors = ref([]);
                    const formBuilderValidationErrors = ref([]);
                    const settingsValidationErrors = ref([]);
                    const isFormBuilderTabSelected = computed(() => selectedTab.value === 0);
                    const isCommunicationsTabSelected = computed(() => selectedTab.value === 1);
                    const isSettingsTabSelected = computed(() => selectedTab.value === 2);
                    const formBuilderContainerStyle = computed(() => {
                        return {
                            display: isFormBuilderTabSelected.value ? "flex" : "none"
                        };
                    });
                    const communicationsContainerStyle = computed(() => {
                        return {
                            display: isCommunicationsTabSelected.value ? "flex" : "none"
                        };
                    });
                    const settingsContainerStyle = computed(() => {
                        return {
                            display: isSettingsTabSelected.value ? "flex" : "none"
                        };
                    });
                    const selectedTemplate = computed(() => {
                        var _a, _b;
                        const matches = (_b = (_a = config.sources) === null || _a === void 0 ? void 0 : _a.formTemplateOptions) === null || _b === void 0 ? void 0 : _b.filter(t => { var _a; return areEqual(t.value, (_a = form.general) === null || _a === void 0 ? void 0 : _a.template); });
                        return matches && matches.length > 0 ? matches[0] : null;
                    });
                    const onFormBuilderTabClick = () => {
                        selectedTab.value = 0;
                    };
                    const onCommunicationsTabClick = () => {
                        selectedTab.value = 1;
                    };
                    const onSettingsTabClick = () => {
                        selectedTab.value = 2;
                    };
                    const onSaveClick = () => __awaiter(this, void 0, void 0, function* () {
                        var _g;
                        formSubmit.value = true;
                        nextTick(() => formSubmit.value = false);
                        if (formBuilderValidationErrors.value.length > 0) {
                            onFormBuilderTabClick();
                            return;
                        }
                        if (communicationsValidationErrors.value.length > 0) {
                            onCommunicationsTabClick();
                            return;
                        }
                        if (settingsValidationErrors.value.length > 0) {
                            onSettingsTabClick();
                            return;
                        }
                        const result = yield invokeBlockAction("SaveForm", {
                            formGuid: config.formGuid,
                            formSettings: form
                        });
                        if (!result.isSuccess) {
                            alert((_g = result.errorMessage) !== null && _g !== void 0 ? _g : "Failed to save.");
                        }
                        else {
                            isFormDirty.value = false;
                        }
                    });
                    const updateRecipientOptions = () => {
                        const options = [];
                        if (config.otherAttributes) {
                            for (const attribute of config.otherAttributes) {
                                if (!attribute.guid || !attribute.fieldTypeGuid || !attribute.name) {
                                    continue;
                                }
                                if (areEqual(attribute.fieldTypeGuid, "E4EAB7B2-0B76-429B-AFE4-AD86D7428C70") || areEqual(attribute.fieldTypeGuid, "3D045CAE-EA72-4A04-B7BE-7FD1D6214217")) {
                                    options.push({
                                        value: attribute.guid,
                                        text: attribute.name
                                    });
                                }
                            }
                        }
                        if (form.sections) {
                            for (const section of form.sections) {
                                if (!section.fields) {
                                    continue;
                                }
                                for (const field of section.fields) {
                                    if (areEqual(field.fieldTypeGuid, "E4EAB7B2-0B76-429B-AFE4-AD86D7428C70") || areEqual(field.fieldTypeGuid, "3D045CAE-EA72-4A04-B7BE-7FD1D6214217")) {
                                        options.push({
                                            value: field.guid,
                                            text: field.name
                                        });
                                    }
                                }
                            }
                        }
                        options.sort((a, b) => {
                            var _a, _b, _c, _d;
                            if (((_a = a.text) !== null && _a !== void 0 ? _a : "") < ((_b = b.text) !== null && _b !== void 0 ? _b : "")) {
                                return -1;
                            }
                            else if (((_c = a.text) !== null && _c !== void 0 ? _c : "") > ((_d = b.text) !== null && _d !== void 0 ? _d : "")) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        });
                        recipientOptions.value = options;
                    };
                    const onBeforeUnload = (event) => {
                        event.preventDefault();
                        event.returnValue = "";
                    };
                    const onCommunicationsValidationChanged = (errors) => {
                        communicationsValidationErrors.value = errors;
                    };
                    const onFormBuilderValidationChanged = (errors) => {
                        formBuilderValidationErrors.value = errors;
                    };
                    const onSettingsValidationChanged = (errors) => {
                        settingsValidationErrors.value = errors;
                    };
                    watch([builderViewModel, communicationsViewModel, generalViewModel, completionViewModel], () => {
                        form.allowPersonEntry = builderViewModel.value.allowPersonEntry;
                        form.campusSetFrom = builderViewModel.value.campusSetFrom;
                        form.footerContent = builderViewModel.value.footerContent;
                        form.headerContent = builderViewModel.value.headerContent;
                        form.personEntry = builderViewModel.value.personEntry;
                        form.sections = builderViewModel.value.sections;
                        form.general = generalViewModel.value;
                        form.completion = completionViewModel.value;
                        form.confirmationEmail = communicationsViewModel.value.confirmationEmail;
                        form.notificationEmail = communicationsViewModel.value.notificationEmail;
                        updateRecipientOptions();
                        isFormDirty.value = true;
                    });
                    watch(isFormDirty, () => {
                        window.removeEventListener("beforeunload", onBeforeUnload);
                        if (isFormDirty.value) {
                            window.addEventListener("beforeunload", onBeforeUnload);
                        }
                    });
                    provideFormSources((_f = config.sources) !== null && _f !== void 0 ? _f : {});
                    updateRecipientOptions();
                    if (!config.formGuid || !config.form) {
                        blockError.value = "That form does not exist or it can't be edited.";
                    }
                    const queryString = new URLSearchParams(window.location.search.toLowerCase());
                    if (queryString.has("tab")) {
                        const tab = queryString.get("tab");
                        if (tab === "communications") {
                            selectedTab.value = 1;
                        }
                        else if (tab === "settings") {
                            selectedTab.value = 2;
                        }
                    }
                    return {
                        analyticsPageUrl: config.analyticsPageUrl,
                        blockError,
                        builderViewModel,
                        communicationsContainerStyle,
                        communicationsValidationErrors,
                        communicationsViewModel,
                        completionViewModel,
                        formBuilderContainerStyle,
                        formSubmit,
                        isCommunicationsTabSelected,
                        isFormBuilderTabSelected,
                        isFormDirty,
                        isSettingsTabSelected,
                        settingsContainerStyle,
                        generalViewModel,
                        blockTitle,
                        submissionsPageUrl: config.submissionsPageUrl,
                        onCommunicationsTabClick,
                        onCommunicationsValidationChanged,
                        onFormBuilderTabClick,
                        onFormBuilderValidationChanged,
                        onSaveClick,
                        onSettingsTabClick,
                        onSettingsValidationChanged,
                        recipientOptions,
                        selectedTemplate
                    };
                },
                template: `
<Alert v-if="blockError" alertType="warning">
    {{ blockError }}
</Alert>

<Panel v-else type="block" hasFullscreen :title="blockTitle" titleIconCssClass="fa fa-poll-h">
    <template #default>

        <div ref="bodyElement" class="panel-flex-fill-body styled-scroll">
            <div class="panel-toolbar panel-toolbar-shadow">
                <ul class="nav nav-pills nav-sm">
                    <li role="presentation"><a :href="submissionsPageUrl">Submissions</a></li>
                    <li :class="{ active: isFormBuilderTabSelected }" role="presentation"><a href="#" @click.prevent="onFormBuilderTabClick">Form Builder</a></li>
                    <li :class="{ active: isCommunicationsTabSelected }" role="presentation"><a href="#" @click.prevent="onCommunicationsTabClick">Communications</a></li>
                    <li :class="{ active: isSettingsTabSelected }" role="presentation"><a href="#" @click.prevent="onSettingsTabClick">Settings</a></li>
                    <li role="presentation"><a :href="analyticsPageUrl">Analytics</a></li>
                </ul>

                <RockButton btnType="primary" btnSize="sm" :disabled="!isFormDirty" @click="onSaveClick">Save</RockButton>
            </div>

            <div class="form-builder-container form-builder-grow" :style="formBuilderContainerStyle">
                <FormBuilderTab v-model="builderViewModel"
                    :templateOverrides="selectedTemplate"
                    :submit="formSubmit"
                    @validationChanged="onFormBuilderValidationChanged" />
            </div>

            <div class="communications-container form-builder-grow" :style="communicationsContainerStyle">
                <CommunicationsTab v-model="communicationsViewModel"
                    :recipientOptions="recipientOptions"
                    :templateOverrides="selectedTemplate"
                    :submit="formSubmit"
                    @validationChanged="onCommunicationsValidationChanged" />
            </div>

            <div class="settings-container form-builder-grow" :style="settingsContainerStyle">
                <SettingsTab v-model="generalViewModel"
                    v-model:completion="completionViewModel"
                    :templateOverrides="selectedTemplate"
                    :submit="formSubmit"
                    @validationChanged="onSettingsValidationChanged" />
            </div>
        </div>
    </template>
</Panel>
`
            }));

        })
    };
}));
