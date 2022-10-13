System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Controls/codeEditor', '@Obsidian/Controls/entityTypePicker', '@Obsidian/Controls/lavaCommandPicker', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/datePicker', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/rockDateTime'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, watch, computed, Alert, DetailBlock, CheckBox, TextBox, CodeEditor, EntityTypePicker, LavaCommandPicker, NumberBox, DatePicker, watchPropertyChanges, useConfigurationValues, useInvokeBlockAction, getSecurityGrant, provideSecurityGrant, propertyRef, updateRefValue, ValueDetailList, ValueDetailListItemBuilder, RockDateTime;
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
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            CodeEditor = module["default"];
        }, function (module) {
            EntityTypePicker = module["default"];
        }, function (module) {
            LavaCommandPicker = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            DatePicker = module["default"];
        }, function (module) {
            watchPropertyChanges = module.watchPropertyChanges;
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
            getSecurityGrant = module.getSecurityGrant;
            provideSecurityGrant = module.provideSecurityGrant;
        }, function (module) {
            propertyRef = module.propertyRef;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            ValueDetailList = module["default"];
        }, function (module) {
            ValueDetailListItemBuilder = module.ValueDetailListItemBuilder;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }],
        execute: (function () {

            var EditPanel = defineComponent({
                name: "Cms.PersistedDatasetDetail.EditPanel",
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
                    CheckBox,
                    TextBox,
                    CodeEditor,
                    EntityTypePicker,
                    LavaCommandPicker,
                    NumberBox,
                    DatePicker
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const description = propertyRef((_a = props.modelValue.description) !== null && _a !== void 0 ? _a : "", "Description");
                    const isActive = propertyRef((_b = props.modelValue.isActive) !== null && _b !== void 0 ? _b : false, "IsActive");
                    const name = propertyRef((_c = props.modelValue.name) !== null && _c !== void 0 ? _c : "", "Name");
                    const accessKey = propertyRef((_d = props.modelValue.accessKey) !== null && _d !== void 0 ? _d : "", "AccessKey");
                    const buildScript = propertyRef((_e = props.modelValue.buildScript) !== null && _e !== void 0 ? _e : "", "BuildScript");
                    const entityType = propertyRef((_f = props.modelValue.entityType) !== null && _f !== void 0 ? _f : {}, "EntityTypeId");
                    const enabledLavaCommands = ref((_g = props.modelValue.enabledLavaCommands) !== null && _g !== void 0 ? _g : []);
                    const allowManualRefresh = propertyRef((_h = props.modelValue.allowManualRefresh) !== null && _h !== void 0 ? _h : false, "AllowManualRefresh");
                    const refreshInterval = propertyRef(props.modelValue.refreshIntervalHours, "RefreshIntervalMinutes");
                    const memoryCacheDuration = propertyRef(props.modelValue.memoryCacheDurationHours, "MemoryCacheDurationMS");
                    const expiresOn = propertyRef((_j = props.modelValue.expireDateTime) !== null && _j !== void 0 ? _j : "", "ExpireDateTime");
                    const propRefs = [description, isActive, name, accessKey, buildScript, entityType, allowManualRefresh, refreshInterval, memoryCacheDuration, expiresOn];
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        updateRefValue(description, (_a = props.modelValue.description) !== null && _a !== void 0 ? _a : "");
                        updateRefValue(isActive, (_b = props.modelValue.isActive) !== null && _b !== void 0 ? _b : false);
                        updateRefValue(name, (_c = props.modelValue.name) !== null && _c !== void 0 ? _c : "");
                        updateRefValue(accessKey, (_d = props.modelValue.accessKey) !== null && _d !== void 0 ? _d : "");
                        updateRefValue(buildScript, (_e = props.modelValue.buildScript) !== null && _e !== void 0 ? _e : "");
                        updateRefValue(entityType, (_f = props.modelValue.entityType) !== null && _f !== void 0 ? _f : {});
                        updateRefValue(enabledLavaCommands, (_g = props.modelValue.enabledLavaCommands) !== null && _g !== void 0 ? _g : []);
                        updateRefValue(allowManualRefresh, (_h = props.modelValue.allowManualRefresh) !== null && _h !== void 0 ? _h : false);
                        updateRefValue(refreshInterval, props.modelValue.refreshIntervalHours);
                        updateRefValue(memoryCacheDuration, props.modelValue.memoryCacheDurationHours);
                        updateRefValue(expiresOn, (_j = props.modelValue.expireDateTime) !== null && _j !== void 0 ? _j : "");
                    });
                    watch([...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { description: description.value, isActive: isActive.value, name: name.value, accessKey: accessKey.value, buildScript: buildScript.value, entityType: entityType.value, enabledLavaCommands: enabledLavaCommands.value, allowManualRefresh: allowManualRefresh.value, refreshIntervalHours: refreshInterval.value, memoryCacheDurationHours: memoryCacheDuration.value, expireDateTime: expiresOn.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        description,
                        isActive,
                        name,
                        accessKey,
                        buildScript,
                        entityType,
                        enabledLavaCommands,
                        allowManualRefresh,
                        refreshInterval,
                        memoryCacheDuration,
                        expiresOn
                    };
                },
                template: `
<fieldset>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="name"
                label="Name"
                rules="required" />

            <TextBox v-model="accessKey"
                label="Access Key"
                rules="required"
                help="The key to use to uniquely identify this dataset. This will be the key to use when using the PersistedDataset lava filter." />
        </div>

        <div class="col-md-6">
            <CheckBox v-model="isActive"
                help="Set this to false to have the PersistedDataset lava filter return null for this dataset, and to exclude this dataset when rebuilding."
                label="Active" />
        </div>
    </div>

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <CodeEditor v-model="buildScript"
        label="Build Script"
        help="Lava Template to use for building JSON that will be used as the cached dataset object."
        theme="rock"
        mode="text"
        :editorHeight="200" />

    <LavaCommandPicker v-model="enabledLavaCommands"
        :multiple="true"
        label="Enabled Lava Commands" />

    <div class="row">
        <div class="col-md-2">
            <NumberBox v-model="refreshInterval"
                label="Refresh Interval"
                help="How often the dataset should be updated by the Update Persisted Dataset job."
                :decimalCount="0"
                rules="required|gte:0">
                <template #append>
                    <span class="input-group-addon">Hour(s)</span>
                </template>
            </NumberBox>

            <NumberBox v-model="memoryCacheDuration"
                label="Memory Cache Duration"
                help="How long the persisted object should be cached in memory. This is a sliding timeline, so each time the object is read the counter will reset. Leave blank to not cache the object in memory which will mean it will be deserialized into the object on each request (still fast)."
                :decimalCount="0">
                <template #append>
                    <span class="input-group-addon">Hour(s)</span>
                </template>
            </NumberBox>

            <DatePicker v-model="expiresOn"
                label="Expires on"
                help="Set this to consider the dataset inactive after the specified date. This will mean that its value is no longer updated by the refresh job and that it will return empty when requested through Lava."
                :displayCurrentOption="false"
                :isCurrentDateOffset="false" />
        </div>

        <div class="col-md-4 col-md-offset-6">
            <EntityTypePicker v-model="entityType"
                label="Entity Type"
                help="Set this to indicate which EntityType the JSON object should be associated with. This will be used by the PersistedDataset Lava Filter when entity related options such as 'AppendFollowing' are specified.'"
                :multiple="false"
                :includeGlobalOption="false" />

            <CheckBox v-model="allowManualRefresh"
                help="Determines if the persisted dataset can be manually refreshed in the Persisted Dataset list."
                label="Allow Manual Refresh" />
        </div>
    </div>

</fieldset>
`
            });

            var ViewPanel = defineComponent({
                name: "Cms.PersistedDatasetDetail.ViewPanel",
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
                    ValueDetailList
                },
                setup(props) {
                    const topValues = computed(() => {
                        var _a;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if (props.modelValue.name) {
                            valueBuilder.addTextValue("Name", props.modelValue.name);
                        }
                        if (props.modelValue.accessKey) {
                            valueBuilder.addTextValue("Access Key", props.modelValue.accessKey);
                        }
                        if (props.modelValue.description) {
                            valueBuilder.addTextValue("Description", props.modelValue.description);
                        }
                        if (props.modelValue.enabledLavaCommands) {
                            valueBuilder.addTextValue("Enabled Lava Commands", props.modelValue.enabledLavaCommands.map(c => c.text).join(", "));
                        }
                        if (props.modelValue.refreshIntervalHours) {
                            valueBuilder.addTextValue("Refresh Interval", `${props.modelValue.refreshIntervalHours} hour(s)`);
                        }
                        if (props.modelValue.memoryCacheDurationHours) {
                            valueBuilder.addTextValue("Memory Cache", `${props.modelValue.memoryCacheDurationHours} hour(s)`);
                        }
                        if (props.modelValue.expireDateTime) {
                            const date = RockDateTime.parseISO(props.modelValue.expireDateTime);
                            if (date) {
                                valueBuilder.addTextValue("Expires On", date.toString());
                            }
                        }
                        if ((_a = props.modelValue.entityType) === null || _a === void 0 ? void 0 : _a.text) {
                            valueBuilder.addTextValue("Entity Type", props.modelValue.entityType.text);
                        }
                        return valueBuilder.build();
                    });
                    const leftSideValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
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
</fieldset>
`
            });

            var persistedDatasetDetail = exports('default', defineComponent({
                name: "Cms.PersistedDatasetDetail",
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
                    const persistedDatasetViewBag = ref(config.entity);
                    const persistedDatasetEditBag = ref(null);
                    const panelMode = ref(0);
                    const validProperties = [
                        "accessKey",
                        "allowManualRefresh",
                        "buildScript",
                        "description",
                        "enabledLavaCommands",
                        "entityType",
                        "expireDateTime",
                        "isActive",
                        "memoryCacheDurationHours",
                        "name",
                        "refreshIntervalHours"
                    ];
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = persistedDatasetViewBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = persistedDatasetViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        var _a;
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        if (((_a = persistedDatasetViewBag.value) === null || _a === void 0 ? void 0 : _a.isActive) === true) {
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
                        if (!((_a = persistedDatasetEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
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
                            key: (_c = persistedDatasetViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete persisted dataset.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = persistedDatasetViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            persistedDatasetEditBag.value = result.data.entity;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const onSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        errorMessage.value = "";
                        const data = {
                            entity: persistedDatasetEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                persistedDatasetViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save persisted dataset.";
                        return false;
                    });
                    const onPropertyChanged = (propertyName) => {
                        if (!config.qualifiedAttributeProperties || !config.qualifiedAttributeProperties.some(n => n.toLowerCase() === propertyName.toLowerCase())) {
                            return;
                        }
                    };
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified persisted dataset could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        persistedDatasetEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        persistedDatasetViewBag,
                        persistedDatasetEditBag,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "9C3064C0-CF9C-4549-9A80-022514B7FF83",
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
    entityTypeName="PersistedDataset"
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
        <ViewPanel :modelValue="persistedDatasetViewBag" :options="options" />
    </template>

    <template #edit>
        <EditPanel v-model="persistedDatasetEditBag" :options="options" @propertyChanged="onPropertyChanged" />
    </template>
</DetailBlock>
`
            }));

        })
    };
}));
