System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Controls/componentPicker', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, watch, computed, Alert, DetailBlock, AttributeValuesContainer, CheckBox, TextBox, ComponentPicker, watchPropertyChanges, useConfigurationValues, useInvokeBlockAction, getSecurityGrant, refreshDetailAttributes, provideSecurityGrant, propertyRef, updateRefValue, ValueDetailList, ValueDetailListItemBuilder, debounce;
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
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            ComponentPicker = module["default"];
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
                name: "Cms.MediaAccountDetail.EditPanel",
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
                    ComponentPicker
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e;
                    const attributes = ref((_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                    const attributeValues = ref((_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                    const isActive = propertyRef((_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : false, "IsActive");
                    const name = propertyRef((_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "", "Name");
                    const componentEntityType = propertyRef((_e = props.modelValue.componentEntityType) !== null && _e !== void 0 ? _e : {}, "ComponentEntityType");
                    const propRefs = [isActive, name, componentEntityType];
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e;
                        updateRefValue(attributes, (_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                        updateRefValue(attributeValues, (_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                        updateRefValue(isActive, (_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : false);
                        updateRefValue(name, (_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "");
                        updateRefValue(componentEntityType, (_e = props.modelValue.componentEntityType) !== null && _e !== void 0 ? _e : {});
                    });
                    watch([attributeValues, ...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeValues: attributeValues.value, isActive: isActive.value, name: name.value, componentEntityType: componentEntityType.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        attributes,
                        attributeValues,
                        isActive,
                        name,
                        componentEntityType,
                        containerType: ref("Rock.Media.MediaAccountContainer"),
                    };
                },
                template: `
<fieldset>
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
<div class="well">
    <div class="row">
        <div class="col-md-6">
            <ComponentPicker label="Component Type"
                    v-model="componentEntityType"
                    :containerType="containerType" />
        </div>
    </div>
    <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :numberOfColumns="2" />
</div>
</fieldset>
`
            });

            var ViewPanel = defineComponent({
                name: "Cms.MediaAccountDetail.ViewPanel",
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
                    AttributeValuesContainer,
                    ValueDetailList
                },
                setup(props) {
                    var _a, _b, _c, _d;
                    const attributes = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : {});
                    const attributeValues = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.attributeValues) !== null && _d !== void 0 ? _d : {});
                    const leftSideValues = computed(() => {
                        var _a;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if ((_a = props.modelValue.componentEntityType) === null || _a === void 0 ? void 0 : _a.text) {
                            valueBuilder.addTextValue("Status", props.modelValue.componentEntityType.text);
                        }
                        return valueBuilder.build();
                    });
                    return {
                        attributes,
                        attributeValues,
                        leftSideValues
                    };
                },
                template: `
<fieldset>
    <div class="row">
        <div class="col-md-6">
            <ValueDetailList :modelValue="leftSideValues" />
        </div>
    </div>
</fieldset>
`
            });

            var mediaAccountDetail = exports('default', defineComponent({
                name: "Cms.MediaAccountDetail",
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
                    const mediaAccountViewBag = ref(config.entity);
                    const mediaAccountEditBag = ref(null);
                    const panelMode = ref(0);
                    const validProperties = [
                        "attributeValues",
                        "componentEntityType",
                        "isActive",
                        "name"
                    ];
                    const qualifiedAttributeProperties = [
                        "componentEntityType",
                    ];
                    const refreshAttributesDebounce = debounce(() => refreshDetailAttributes(mediaAccountEditBag, validProperties, invokeBlockAction), undefined, true);
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = mediaAccountViewBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Media Account";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = mediaAccountViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        var _a;
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        if (((_a = mediaAccountViewBag.value) === null || _a === void 0 ? void 0 : _a.isActive) === true) {
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
                        if (!((_a = mediaAccountEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
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
                            key: (_c = mediaAccountViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete media account.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = mediaAccountViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            mediaAccountEditBag.value = result.data.entity;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const onPropertyChanged = (propertyName) => {
                        if (!qualifiedAttributeProperties || !qualifiedAttributeProperties.some(n => n.toLowerCase() === propertyName.toLowerCase())) {
                            return;
                        }
                        refreshAttributesDebounce();
                    };
                    const onSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        errorMessage.value = "";
                        const data = {
                            entity: mediaAccountEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                mediaAccountViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save media account.";
                        return false;
                    });
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified media account could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        mediaAccountEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        mediaAccountViewBag,
                        mediaAccountEditBag,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "CD35F034-AC18-40D5-B703-6BF16D79C51C",
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
<Alert v-if="blockError" alertType="warning">{{ blockError }}</Alert>

<Alert v-if="errorMessage" alertType="danger">{{ errorMessage }}</Alert>

<DetailBlock v-if="!blockError"
    v-model:mode="panelMode"
    :name="panelName"
    :labels="blockLabels"
    :entityKey="entityKey"
    :entityTypeGuid="entityTypeGuid"
    entityTypeName="MediaAccount"
    :isAuditHidden="false"
    :isBadgesVisible="true"
    :isDeleteVisible="isEditable"
    :isEditVisible="isEditable"
    :isFollowVisible="false"
    :isSecurityHidden="true"
    @cancelEdit="onCancelEdit"
    @delete="onDelete"
    @edit="onEdit"
    @save="onSave">
    <template #view>
        <ViewPanel :modelValue="mediaAccountViewBag" :options="options" />
    </template>

    <template #edit>
        <EditPanel v-model="mediaAccountEditBag" :options="options" @propertyChanged="onPropertyChanged" />
    </template>
</DetailBlock>
`
            }));

        })
    };
}));
