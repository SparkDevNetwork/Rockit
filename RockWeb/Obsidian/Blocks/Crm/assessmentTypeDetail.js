System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, watch, computed, Alert, DetailBlock, AttributeValuesContainer, NumberBox, CheckBox, TextBox, watchPropertyChanges, useConfigurationValues, useInvokeBlockAction, getSecurityGrant, refreshDetailAttributes, provideSecurityGrant, propertyRef, updateRefValue, ValueDetailList, ValueDetailListItemBuilder, debounce;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
            computed = module.computed;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DetailBlock = module["default"];
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            watchPropertyChanges = module.watchPropertyChanges;
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
            getSecurityGrant = module.getSecurityGrant;
            refreshDetailAttributes = module.refreshDetailAttributes;
            provideSecurityGrant = module.provideSecurityGrant;
        }, function (module) {
            propertyRef = module.propertyRef;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            ValueDetailList = module["default"];
        }, function (module) {
            ValueDetailListItemBuilder = module.ValueDetailListItemBuilder;
        }, function (module) {
            debounce = module.debounce;
        }],
        execute: (function () {

            var EditPanel = defineComponent({
                name: "Crm.AssessmentTypeDetail.EditPanel",
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    options: {
                        type: Object,
                        required: true
                    }
                },
                components: {
                    AttributeValuesContainer,
                    CheckBox,
                    TextBox,
                    NumberBox
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const attributes = ref((_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                    const attributeValues = ref((_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                    const title = propertyRef((_c = props.modelValue.title) !== null && _c !== void 0 ? _c : "", "Title");
                    const description = propertyRef((_d = props.modelValue.description) !== null && _d !== void 0 ? _d : "", "Description");
                    const isActive = propertyRef((_e = props.modelValue.isActive) !== null && _e !== void 0 ? _e : false, "IsActive");
                    const assessmentPath = propertyRef((_f = props.modelValue.assessmentPath) !== null && _f !== void 0 ? _f : "", "AssessmentPath");
                    const assessmentResultsPath = propertyRef((_g = props.modelValue.assessmentResultsPath) !== null && _g !== void 0 ? _g : "", "AssessmentResultsPath");
                    const minimumDaysToRetake = propertyRef((_h = props.modelValue.minimumDaysToRetake) !== null && _h !== void 0 ? _h : "", "MinimumDaysToRetake");
                    const requiresRequest = propertyRef((_j = props.modelValue.requiresRequest) !== null && _j !== void 0 ? _j : false, "RequiresRequest");
                    const propRefs = [title, description, isActive, assessmentPath, assessmentResultsPath, minimumDaysToRetake, requiresRequest];
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        updateRefValue(attributes, (_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                        updateRefValue(attributeValues, (_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                        updateRefValue(title, (_c = props.modelValue.title) !== null && _c !== void 0 ? _c : "");
                        updateRefValue(description, (_d = props.modelValue.description) !== null && _d !== void 0 ? _d : "");
                        updateRefValue(isActive, (_e = props.modelValue.isActive) !== null && _e !== void 0 ? _e : false);
                        updateRefValue(assessmentPath, (_f = props.modelValue.assessmentPath) !== null && _f !== void 0 ? _f : "");
                        updateRefValue(assessmentResultsPath, (_g = props.modelValue.assessmentResultsPath) !== null && _g !== void 0 ? _g : "");
                        updateRefValue(minimumDaysToRetake, (_h = props.modelValue.minimumDaysToRetake) !== null && _h !== void 0 ? _h : "");
                        updateRefValue(requiresRequest, (_j = props.modelValue.requiresRequest) !== null && _j !== void 0 ? _j : false);
                    });
                    watch([...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeValues: attributeValues.value, title: title.value, description: description.value, isActive: isActive.value, assessmentPath: assessmentPath.value, assessmentResultsPath: assessmentResultsPath.value, minimumDaysToRetake: minimumDaysToRetake.value, requiresRequest: requiresRequest.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        attributes,
                        attributeValues,
                        title,
                        description,
                        isActive,
                        assessmentPath,
                        assessmentResultsPath,
                        minimumDaysToRetake,
                        requiresRequest
                    };
                },
                template: `
<fieldset>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="title" label="Title" rules="required" />
        </div>
        <div class="col-md-6">
            <CheckBox v-model="isActive" label="Active" />
        </div>
    </div>

    <TextBox v-model="description" label="Description" textMode="multiline" />

    <TextBox v-model="assessmentPath" label="Assessment Path" rules="required" />

    <TextBox v-model="assessmentResultsPath" label="Assessment Results Path Path" rules="required" />

    <div class="row">
        <div class="col-md-6">
            <NumberBox v-model="minimumDaysToRetake" label="Minimum Days To Retake" help="The minimum number of days after the test has been taken before it can be taken again." />
        </div>
        <div class="col-md-6">
            <CheckBox v-model="requiresRequest" label="Requires Request" help="Is a person required to receive a request before this test can be taken?" />
        </div>
    </div>

    <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :numberOfColumns="2" />
</fieldset>
`
            });

            var ViewPanel = defineComponent({
                name: "Crm.AssessmentTypeDetail.ViewPanel",
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    options: {
                        type: Object,
                        required: true
                    }
                },
                components: {
                    Alert,
                    AttributeValuesContainer,
                    ValueDetailList
                },
                setup(props) {
                    var _a, _b, _c, _d;
                    const attributes = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : {});
                    const attributeValues = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.attributeValues) !== null && _d !== void 0 ? _d : {});
                    const topValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if (props.modelValue.description) {
                            valueBuilder.addTextValue("Description", props.modelValue.description);
                        }
                        return valueBuilder.build();
                    });
                    const leftSideValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if (props.modelValue.requiresRequest) {
                            valueBuilder.addTextValue("Requires Request", props.modelValue.requiresRequest ? "True" : "False");
                        }
                        if (props.modelValue.minimumDaysToRetake) {
                            valueBuilder.addTextValue("Minimum Days To Retake", props.modelValue.minimumDaysToRetake.toString());
                        }
                        if (props.modelValue.validDuration) {
                            valueBuilder.addTextValue("Valid Duration", props.modelValue.validDuration.toString());
                        }
                        return valueBuilder.build();
                    });
                    const rightSideValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        return valueBuilder.build();
                    });
                    return {
                        attributes,
                        attributeValues,
                        leftSideValues,
                        rightSideValues,
                        topValues
                    };
                },
                template: `
<fieldset>
    <ValueDetailList :modelValue="topValues" />

    <div class="row">
        <div class="col-md-6">
            <ValueDetailList :modelValue="leftSideValues" />
        </div>

        <div class="col-md-6">
            <ValueDetailList :modelValue="rightSideValues" />
        </div>
    </div>

    <AttributeValuesContainer :modelValue="attributeValues" :attributes="attributes" :numberOfColumns="2" />
</fieldset>
`
            });

            var assessmentTypeDetail = exports('default', defineComponent({
                name: "Crm.AssessmentTypeDetail",
                components: {
                    Alert,
                    EditPanel,
                    DetailBlock,
                    ViewPanel
                },
                setup() {
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const securityGrant = getSecurityGrant(config.securityGrantToken);
                    const blockError = ref("");
                    const errorMessage = ref("");
                    const assessmentTypeViewBag = ref(config.entity);
                    const assessmentTypeEditBag = ref(null);
                    const panelMode = ref(0);
                    const validProperties = [
                        "assessmentPath",
                        "assessmentResultsPath",
                        "description",
                        "isActive",
                        "minimumDaysToRetake",
                        "requiresRequest",
                        "title"
                    ];
                    const refreshAttributesDebounce = debounce(() => refreshDetailAttributes(assessmentTypeEditBag, validProperties, invokeBlockAction), undefined, true);
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = assessmentTypeViewBag.value) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = assessmentTypeViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        var _a;
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        if (((_a = assessmentTypeViewBag.value) === null || _a === void 0 ? void 0 : _a.isActive) === true) {
                            labels.push({
                                iconCssClass: "fa fa-lightbulb",
                                title: "Active",
                                type: "success"
                            });
                        }
                        else {
                            labels.push({
                                iconCssClass: "far fa-lightbulb",
                                title: "Inactive",
                                type: "danger"
                            });
                        }
                        return labels;
                    });
                    const isEditable = computed(() => {
                        return config.isEditable === true;
                    });
                    const options = computed(() => {
                        var _a;
                        return (_a = config.options) !== null && _a !== void 0 ? _a : {};
                    });
                    const onCancelEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        if (!((_a = assessmentTypeEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
                            if ((_b = config.navigationUrls) === null || _b === void 0 ? void 0 : _b["ParentPage"]) {
                                window.location.href = config.navigationUrls["ParentPage"];
                            }
                            return false;
                        }
                        return true;
                    });
                    const onDelete = () => __awaiter(this, void 0, void 0, function* () {
                        var _c, _d;
                        errorMessage.value = "";
                        const result = yield invokeBlockAction("Delete", {
                            key: (_c = assessmentTypeViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete assessment type.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = assessmentTypeViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            assessmentTypeEditBag.value = result.data.entity;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const onPropertyChanged = (propertyName) => {
                        if (!config.qualifiedAttributeProperties || !config.qualifiedAttributeProperties.some(n => n.toLowerCase() === propertyName.toLowerCase())) {
                            return;
                        }
                        refreshAttributesDebounce();
                    };
                    const onSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        errorMessage.value = "";
                        const data = {
                            entity: assessmentTypeEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                assessmentTypeViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save assessment type.";
                        return false;
                    });
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified assessment type could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        assessmentTypeEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        assessmentTypeViewBag,
                        assessmentTypeEditBag,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "D17A28AC-F529-4AB0-A790-C21F9E74AC89",
                        errorMessage,
                        isEditable,
                        onCancelEdit,
                        onDelete,
                        onEdit,
                        onPropertyChanged,
                        onSave,
                        options,
                        panelMode,
                        panelName
                    };
                },
                template: `
<Alert v-if="blockError" alertType="warning" v-text="blockError" />

<Alert v-if="errorMessage" alertType="danger" v-text="errorMessage" />

<DetailBlock v-if="!blockError"
    v-model:mode="panelMode"
    :name="panelName"
    :labels="blockLabels"
    :entityKey="entityKey"
    :entityTypeGuid="entityTypeGuid"
    entityTypeName="AssessmentType"
    :isAuditHidden="false"
    :isBadgesVisible="true"
    :isDeleteVisible="isEditable"
    :isEditVisible="isEditable"
    :isFollowVisible="false"
    :isSecurityHidden="false"
    @cancelEdit="onCancelEdit"
    @delete="onDelete"
    @edit="onEdit"
    @save="onSave">
    <template #view>
        <ViewPanel :modelValue="assessmentTypeViewBag" :options="options" />
    </template>

    <template #edit>
        <EditPanel v-model="assessmentTypeEditBag" :options="options" @propertyChanged="onPropertyChanged" />
    </template>
</DetailBlock>
`
            }));

        })
    };
}));
