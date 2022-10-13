System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/textBox', '@Obsidian/Controls/switch', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/radioButtonList', '@Obsidian/Controls/transitionVerticalCollapse', '@Obsidian/Controls/workflowTypePicker', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, Alert, DetailBlock, AttributeValuesContainer, TextBox, Switch, DropDownList, RadioButtonList, TransitionVerticalCollapse, WorkflowTypePicker, watchPropertyChanges, useConfigurationValues, useInvokeBlockAction, getSecurityGrant, refreshDetailAttributes, provideSecurityGrant, propertyRef, updateRefValue, ValueDetailList, ValueDetailListItemBuilder, debounce;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DetailBlock = module["default"];
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            Switch = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function (module) {
            TransitionVerticalCollapse = module["default"];
        }, function (module) {
            WorkflowTypePicker = module["default"];
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
                name: "Cms.MediaFolderDetail.EditPanel",
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
                    TextBox,
                    Switch,
                    TransitionVerticalCollapse,
                    DropDownList,
                    RadioButtonList,
                    WorkflowTypePicker
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                    const attributes = ref((_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                    const attributeValues = ref((_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                    const description = propertyRef((_c = props.modelValue.description) !== null && _c !== void 0 ? _c : "", "Description");
                    const name = propertyRef((_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "", "Name");
                    const isContentChannelSyncEnabled = propertyRef((_e = props.modelValue.isContentChannelSyncEnabled) !== null && _e !== void 0 ? _e : false, "IsContentChannelSyncEnabled");
                    const contentChannelValue = propertyRef((_g = (_f = props.modelValue.contentChannel) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : "", "ContentChannelId");
                    const contentChannelOptions = ref((_h = props.options.contentChannels) !== null && _h !== void 0 ? _h : []);
                    const contentChannelAttributes = ref((_j = props.options.contentChannelAttributes) !== null && _j !== void 0 ? _j : {});
                    const contentChannelAttributeValue = propertyRef((_l = (_k = props.modelValue.contentChannelAttribute) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : "", "ContentChannelAttributeId");
                    const contentChannelItemStatus = propertyRef((_m = props.modelValue.contentChannelItemStatus) !== null && _m !== void 0 ? _m : "", "ContentChannelItemStatus");
                    const workflowType = propertyRef((_o = props.modelValue.workflowType) !== null && _o !== void 0 ? _o : {}, "WorkflowTypeId");
                    const propRefs = [description, name, isContentChannelSyncEnabled, contentChannelValue, contentChannelAttributeValue, contentChannelItemStatus, workflowType];
                    const contentChannelItemAttributes = computed(() => contentChannelAttributes.value[contentChannelValue.value]);
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        updateRefValue(attributes, (_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                        updateRefValue(attributeValues, (_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                        updateRefValue(description, (_c = props.modelValue.description) !== null && _c !== void 0 ? _c : "");
                        updateRefValue(name, (_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "");
                        updateRefValue(isContentChannelSyncEnabled, (_e = props.modelValue.isContentChannelSyncEnabled) !== null && _e !== void 0 ? _e : false);
                        updateRefValue(contentChannelValue, (_g = (_f = props.modelValue.contentChannel) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : "");
                        updateRefValue(contentChannelAttributeValue, (_j = (_h = props.modelValue.contentChannelAttribute) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : "");
                        updateRefValue(contentChannelItemStatus, (_k = props.modelValue.contentChannelItemStatus) !== null && _k !== void 0 ? _k : "");
                        updateRefValue(workflowType, (_l = props.modelValue.workflowType) !== null && _l !== void 0 ? _l : {});
                    });
                    watch([attributeValues, ...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeValues: attributeValues.value, description: description.value, name: name.value, isContentChannelSyncEnabled: isContentChannelSyncEnabled.value, contentChannel: { value: contentChannelValue.value }, contentChannelItemStatus: contentChannelItemStatus.value, contentChannelAttribute: { value: contentChannelAttributeValue.value }, workflowType: workflowType.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        attributes,
                        attributeValues,
                        description,
                        name,
                        isContentChannelSyncEnabled,
                        channelStatuses: [
                            { text: "Pending Approval", value: "Pending Approval" },
                            { text: "Approved", value: "Approved" },
                            { text: "Denied", value: "Denied" }
                        ],
                        contentChannelOptions,
                        contentChannelItemAttributes,
                        contentChannelValue,
                        contentChannelAttributeValue,
                        contentChannelItemStatus,
                        workflowType
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
    </div>
    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />
    <WorkflowTypePicker v-model="workflowType"
        label="WorkFlow" />
    <div class="mt-3">
        <div class="mb-3 galleryContent-reflectionToggle">
            <Switch v-model="isContentChannelSyncEnabled" text="Enable Content Channel Sync" />
        </div>
        <TransitionVerticalCollapse>
            <div v-if="isContentChannelSyncEnabled">
                <div class="row">
                    <div class="col-md-6">
                        <DropDownList v-model="contentChannelValue"
                            label="Content Channel"
                            :items="contentChannelOptions"
                            rules="required" />
                        <DropDownList v-model="contentChannelAttributeValue"
                                      label="Media File Attribute"                                     
                                      :items="contentChannelItemAttributes"
                                      rules="required" />
                    </div>
                    <div class="col-md-6">
                        <RadioButtonList v-model="contentChannelItemStatus"
                                         label="Content Channel Item Status"
                                         :items="channelStatuses"
                                         horizontal
                                         rules="required"/>
                    </div>
                </div>
            </div>
        </TransitionVerticalCollapse>
    </div>

    <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :numberOfColumns="2" />
</fieldset>
`
            });

            var ViewPanel = defineComponent({
                name: "Cms.MediaFolderDetail.ViewPanel",
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
                        var _a, _b, _c, _d, _e, _f, _g;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if ((_a = props.modelValue.mediaAccount) === null || _a === void 0 ? void 0 : _a.value) {
                            valueBuilder.addTextValue("Account", (_b = props.modelValue.mediaAccount.text) !== null && _b !== void 0 ? _b : "");
                        }
                        if ((_c = props.modelValue.contentChannel) === null || _c === void 0 ? void 0 : _c.value) {
                            valueBuilder.addTextValue("Content Channel", (_d = props.modelValue.contentChannel.text) !== null && _d !== void 0 ? _d : "");
                        }
                        if ((_e = props.modelValue.contentChannelAttribute) === null || _e === void 0 ? void 0 : _e.value) {
                            valueBuilder.addTextValue("Content Channel Attribute", (_f = props.modelValue.contentChannelAttribute.text) !== null && _f !== void 0 ? _f : "");
                        }
                        if (props.modelValue.contentChannelItemStatus) {
                            valueBuilder.addTextValue("Content Channel Item Status", (_g = props.modelValue.contentChannelItemStatus) !== null && _g !== void 0 ? _g : "");
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

            var mediaFolderDetail = exports('default', defineComponent({
                name: "Cms.MediaFolderDetail",
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
                    const mediaFolderViewBag = ref(config.entity);
                    const mediaFolderEditBag = ref(null);
                    const panelMode = ref(0);
                    const validProperties = [
                        "attributeValues",
                        "contentChannel",
                        "contentChannelAttribute",
                        "description",
                        "isContentChannelSyncEnabled",
                        "isPublic",
                        "name",
                        "workflowType",
                        "contentChannelItemStatus"
                    ];
                    const refreshAttributesDebounce = debounce(() => refreshDetailAttributes(mediaFolderEditBag, validProperties, invokeBlockAction), undefined, true);
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = mediaFolderViewBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = mediaFolderViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        var _a;
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        if ((_a = mediaFolderViewBag.value) === null || _a === void 0 ? void 0 : _a.isContentChannelSyncEnabled) {
                            labels.push({
                                iconCssClass: "fa fa-exchange",
                                type: "info"
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
                        if (!((_a = mediaFolderEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
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
                            key: (_c = mediaFolderViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete media folder.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = mediaFolderViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            mediaFolderEditBag.value = result.data.entity;
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
                            entity: mediaFolderEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                mediaFolderViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save media folder.";
                        return false;
                    });
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified media folder could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        mediaFolderEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        mediaFolderViewBag,
                        mediaFolderEditBag,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "B28FC79F-9FEE-4BE4-801D-96B9246E6043",
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
    entityTypeName="MediaFolder"
    :isAuditHidden="false"
    :isBadgesVisible="false"
    :isDeleteVisible="isEditable"
    :isEditVisible="isEditable"
    :isFollowVisible="true"
    :isSecurityHidden="false"
    @cancelEdit="onCancelEdit"
    @delete="onDelete"
    @edit="onEdit"
    @save="onSave">
    <template #view>
        <ViewPanel :modelValue="mediaFolderViewBag" :options="options" />
    </template>

    <template #edit>
        <EditPanel v-model="mediaFolderEditBag" :options="options" @propertyChanged="onPropertyChanged" />
    </template>
</DetailBlock>
`
            }));

        })
    };
}));
