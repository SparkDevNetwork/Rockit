System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/definedValuePicker', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/keyValueList', '@Obsidian/Controls/locationPicker', '@Obsidian/Controls/personPicker', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/phoneNumberBox', '@Obsidian/Controls/textBox', '@Obsidian/Controls/urlLinkBox', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/linq', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, Alert, DetailBlock, AttributeValuesContainer, DefinedValuePicker, DropDownList, KeyValueList, LocationPicker, PersonPicker, CheckBox, PhoneNumberBox, TextBox, UrlLinkBox, watchPropertyChanges, useConfigurationValues, useInvokeBlockAction, getSecurityGrant, refreshDetailAttributes, provideSecurityGrant, propertyRef, updateRefValue, ValueDetailList, ValueDetailListItemBuilder, List, escapeHtml, debounce;
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
            DefinedValuePicker = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            KeyValueList = module["default"];
        }, function (module) {
            LocationPicker = module["default"];
        }, function (module) {
            PersonPicker = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            PhoneNumberBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            UrlLinkBox = module["default"];
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
            List = module.List;
        }, function (module) {
            escapeHtml = module.escapeHtml;
        }, function (module) {
            debounce = module.debounce;
        }],
        execute: (function () {

            var EditPanel = defineComponent({
                name: "Core.CampusDetail.EditPanel",
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
                    DefinedValuePicker,
                    DropDownList,
                    KeyValueList,
                    LocationPicker,
                    PersonPicker,
                    PhoneNumberBox,
                    TextBox,
                    UrlLinkBox
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    const attributes = ref((_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                    const attributeValues = ref((_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                    const campusStatusValue = propertyRef((_c = props.modelValue.campusStatusValue) !== null && _c !== void 0 ? _c : null, "CampusStatusValueId");
                    const campusTypeValue = propertyRef((_d = props.modelValue.campusTypeValue) !== null && _d !== void 0 ? _d : null, "CampusTypeValueId");
                    const description = propertyRef((_e = props.modelValue.description) !== null && _e !== void 0 ? _e : "", "Description");
                    const isActive = propertyRef((_f = props.modelValue.isActive) !== null && _f !== void 0 ? _f : false, "IsActive");
                    const leaderPersonAlias = propertyRef((_g = props.modelValue.leaderPersonAlias) !== null && _g !== void 0 ? _g : null, "LeaderPersonAliasId");
                    const location = propertyRef((_h = props.modelValue.location) !== null && _h !== void 0 ? _h : null, "LocationId");
                    const name = propertyRef((_j = props.modelValue.name) !== null && _j !== void 0 ? _j : "", "Name");
                    const phoneNumber = propertyRef((_k = props.modelValue.phoneNumber) !== null && _k !== void 0 ? _k : "", "PhoneNumber");
                    const serviceTimes = propertyRef(((_l = props.modelValue.serviceTimes) !== null && _l !== void 0 ? _l : []).map((s) => ({ key: s.value, value: s.text })), "ServiceTimes");
                    const shortCode = propertyRef((_m = props.modelValue.shortCode) !== null && _m !== void 0 ? _m : "", "ShortCode");
                    const timeZoneId = propertyRef((_o = props.modelValue.timeZoneId) !== null && _o !== void 0 ? _o : "", "TimeZoneId");
                    const url = propertyRef((_p = props.modelValue.url) !== null && _p !== void 0 ? _p : "", "Url");
                    const propRefs = [campusStatusValue,
                        campusTypeValue,
                        description,
                        isActive,
                        leaderPersonAlias,
                        location,
                        name,
                        phoneNumber,
                        serviceTimes,
                        shortCode,
                        timeZoneId,
                        url];
                    const isTimeZoneVisible = computed(() => {
                        return props.options.isMultiTimeZoneSupported === true;
                    });
                    const timeZoneOptions = computed(() => {
                        var _a;
                        return (_a = props.options.timeZoneOptions) !== null && _a !== void 0 ? _a : [];
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                        updateRefValue(attributes, (_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                        updateRefValue(attributeValues, (_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                        updateRefValue(campusStatusValue, (_c = props.modelValue.campusStatusValue) !== null && _c !== void 0 ? _c : null);
                        updateRefValue(campusTypeValue, (_d = props.modelValue.campusTypeValue) !== null && _d !== void 0 ? _d : null);
                        updateRefValue(description, (_e = props.modelValue.description) !== null && _e !== void 0 ? _e : "");
                        updateRefValue(isActive, (_f = props.modelValue.isActive) !== null && _f !== void 0 ? _f : false);
                        updateRefValue(leaderPersonAlias, (_g = props.modelValue.leaderPersonAlias) !== null && _g !== void 0 ? _g : null);
                        updateRefValue(location, (_h = props.modelValue.location) !== null && _h !== void 0 ? _h : null);
                        updateRefValue(name, (_j = props.modelValue.name) !== null && _j !== void 0 ? _j : "");
                        updateRefValue(phoneNumber, (_k = props.modelValue.phoneNumber) !== null && _k !== void 0 ? _k : "");
                        updateRefValue(serviceTimes, ((_l = props.modelValue.serviceTimes) !== null && _l !== void 0 ? _l : []).map((s) => ({ key: s.value, value: s.text })));
                        updateRefValue(shortCode, (_m = props.modelValue.shortCode) !== null && _m !== void 0 ? _m : "");
                        updateRefValue(timeZoneId, (_o = props.modelValue.timeZoneId) !== null && _o !== void 0 ? _o : "");
                        updateRefValue(url, (_p = props.modelValue.url) !== null && _p !== void 0 ? _p : "");
                    });
                    watch([attributeValues, ...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeValues: attributeValues.value, campusStatusValue: campusStatusValue.value, campusTypeValue: campusTypeValue.value, description: description.value, isActive: isActive.value, leaderPersonAlias: leaderPersonAlias.value, location: location.value, name: name.value, phoneNumber: phoneNumber.value, serviceTimes: serviceTimes.value.map((s) => { var _a, _b; return ({ value: (_a = s.key) !== null && _a !== void 0 ? _a : "", text: (_b = s.value) !== null && _b !== void 0 ? _b : "" }); }), shortCode: shortCode.value, timeZoneId: timeZoneId.value, url: url.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        attributes,
                        attributeValues,
                        campusStatusDefinedTypeGuid: "840CDA6D-6E81-4EB7-B325-BE708990CCE9",
                        campusStatusValue,
                        campusTypeDefinedTypeGuid: "8C2260A8-6130-414A-BD32-22743FEAB256",
                        campusTypeValue,
                        description,
                        isActive,
                        isTimeZoneVisible,
                        leaderPersonAlias,
                        location,
                        name,
                        phoneNumber,
                        serviceTimes,
                        shortCode,
                        timeZoneId,
                        timeZoneOptions,
                        url
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

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <div class="row">
        <div class="col-md-6">
            <DefinedValuePicker v-model="campusStatusValue"
                label="Status"
                :definedTypeGuid="campusStatusDefinedTypeGuid" />

            <TextBox v-model="shortCode"
                label="Code" />

            <DropDownList v-if="isTimeZoneVisible"
                v-model="timeZoneId"
                label="Time Zone"
                help="The time zone you want certain time calculations of the Campus to operate in. Leave this blank to use the default Rock TimeZone."
                :items="timeZoneOptions" />

            <PersonPicker v-model="leaderPersonAlias"
                label="Campus Leader" />

            <KeyValueList v-model="serviceTimes"
                label="Service Times"
                help="A list of days and times that this campus has services." />
        </div>

        <div class="col-md-6">
            <DefinedValuePicker v-model="campusTypeValue"
                label="Type"
                :definedTypeGuid="campusTypeDefinedTypeGuid" />

            <UrlLinkBox v-model="url"
                label="URL"
                requiresTrailingSlash />

            <PhoneNumberBox v-model="phoneNumber"
                label="Phone Number" />

            <LocationPicker v-model="location"
                label="Location"
                help="Select a Campus location."
                rules="required" />
        </div>
    </div>

    <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :numberOfColumns="2" />
</fieldset>
`
            });

            var ViewPanel = defineComponent({
                name: "Core.CampusDetail.ViewPanel",
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
                    const isSystem = computed(() => { var _a, _b; return (_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.isSystem) !== null && _b !== void 0 ? _b : false; });
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
                        var _a, _b, _c, _d;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if ((_a = props.modelValue.campusStatusValue) === null || _a === void 0 ? void 0 : _a.text) {
                            valueBuilder.addTextValue("Status", props.modelValue.campusStatusValue.text);
                        }
                        if (props.modelValue.shortCode) {
                            valueBuilder.addTextValue("Code", props.modelValue.shortCode);
                        }
                        if (props.options.isMultiTimeZoneSupported && props.modelValue.timeZoneId) {
                            const tz = new List((_b = props.options.timeZoneOptions) !== null && _b !== void 0 ? _b : [])
                                .where(tz => { var _a; return tz.value === ((_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.timeZoneId); })
                                .firstOrUndefined();
                            valueBuilder.addTextValue("Time Zone", tz ? (_c = tz.text) !== null && _c !== void 0 ? _c : "" : props.modelValue.timeZoneId);
                        }
                        if ((_d = props.modelValue.leaderPersonAlias) === null || _d === void 0 ? void 0 : _d.text) {
                            valueBuilder.addTextValue("Campus Leader", props.modelValue.leaderPersonAlias.text);
                        }
                        if (props.modelValue.serviceTimes && props.modelValue.serviceTimes.length > 0) {
                            const htmlValue = props.modelValue.serviceTimes
                                .map(s => { var _a, _b; return `${escapeHtml((_a = s.value) !== null && _a !== void 0 ? _a : "")} ${escapeHtml((_b = s.text) !== null && _b !== void 0 ? _b : "")}`; })
                                .join("<br>");
                            valueBuilder.addHtmlValue("Service Times", htmlValue);
                        }
                        if (props.modelValue.campusSchedules && props.modelValue.campusSchedules.length > 0) {
                            valueBuilder.addTextValue("Campus Schedules", props.modelValue.campusSchedules.map(s => { var _a, _b; return (_b = (_a = s.schedule) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : ""; }).join(", "));
                        }
                        return valueBuilder.build();
                    });
                    const rightSideValues = computed(() => {
                        var _a, _b;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if ((_a = props.modelValue.campusTypeValue) === null || _a === void 0 ? void 0 : _a.text) {
                            valueBuilder.addTextValue("Type", props.modelValue.campusTypeValue.text);
                        }
                        if (props.modelValue.url) {
                            valueBuilder.addTextValue("URL", props.modelValue.url);
                        }
                        if (props.modelValue.phoneNumber) {
                            valueBuilder.addTextValue("Phone Number", props.modelValue.phoneNumber);
                        }
                        if ((_b = props.modelValue.location) === null || _b === void 0 ? void 0 : _b.text) {
                            valueBuilder.addTextValue("Location", props.modelValue.location.text);
                        }
                        return valueBuilder.build();
                    });
                    return {
                        attributes,
                        attributeValues,
                        isSystem,
                        leftSideValues,
                        rightSideValues,
                        topValues
                    };
                },
                template: `
<fieldset>
    <Alert v-if="isSystem" alertType="info">
        <strong>Note</strong> Because this campus is used by Rock, editing is not enabled.
    </Alert>

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

            var campusDetail = exports('default', defineComponent({
                name: "Core.CampusDetail",
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
                    const campusViewBag = ref(config.entity);
                    const campusEditBag = ref(null);
                    const panelMode = ref(0);
                    const validProperties = [
                        "attributeValues",
                        "campusSchedules",
                        "campusStatusValue",
                        "campusTypeValue",
                        "description",
                        "isActive",
                        "leaderPersonAlias",
                        "location",
                        "name",
                        "phoneNumber",
                        "serviceTimes",
                        "shortCode",
                        "timeZoneId",
                        "url"
                    ];
                    const refreshAttributesDebounce = debounce(() => refreshDetailAttributes(campusEditBag, validProperties, invokeBlockAction), undefined, true);
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = campusViewBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = campusViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        var _a;
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        if (((_a = campusViewBag.value) === null || _a === void 0 ? void 0 : _a.isActive) === true) {
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
                        var _a;
                        return config.isEditable === true && ((_a = campusViewBag.value) === null || _a === void 0 ? void 0 : _a.isSystem) !== true;
                    });
                    const options = computed(() => {
                        var _a;
                        return (_a = config.options) !== null && _a !== void 0 ? _a : {
                            isMultiTimeZoneSupported: false
                        };
                    });
                    const onCancelEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        if (!((_a = campusEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
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
                            key: (_c = campusViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete campus.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = campusViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            campusEditBag.value = result.data.entity;
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
                            entity: campusEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                campusViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save campus.";
                        return false;
                    });
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified campus could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        campusEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        campusViewBag,
                        campusEditBag,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "00096BED-9587-415E-8AD4-4E076AE8FBF0",
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
    entityTypeName="Campus"
    :isAuditHidden="false"
    :isBadgesVisible="true"
    :isDeleteVisible="isEditable"
    :isEditVisible="isEditable"
    :isFollowVisible="true"
    :isSecurityHidden="false"
    @cancelEdit="onCancelEdit"
    @delete="onDelete"
    @edit="onEdit"
    @save="onSave">
    <template #view>
        <ViewPanel :modelValue="campusViewBag" :options="options" />
    </template>

    <template #edit>
        <EditPanel v-model="campusEditBag" :options="options" @propertyChanged="onPropertyChanged" />
    </template>
</DetailBlock>
`
            }));

        })
    };
}));
