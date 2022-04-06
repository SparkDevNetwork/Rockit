System.register(["vue", "../Controls/rockField", "../Elements/alert", "../Elements/dropDownList", "../Elements/staticFormControl", "../Fields/index", "../Util/http", "../Util/guid"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockField_1, alert_1, dropDownList_1, staticFormControl_1, index_1, http_1, guid_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockField_1_1) {
                rockField_1 = rockField_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (staticFormControl_1_1) {
                staticFormControl_1 = staticFormControl_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "FieldTypeEditor",
                components: {
                    Alert: alert_1.default,
                    DropDownList: dropDownList_1.default,
                    RockField: rockField_1.default,
                    StaticFormControl: staticFormControl_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: null
                    },
                    isFieldTypeReadOnly: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const fieldTypeValue = vue_1.ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.fieldTypeGuid) !== null && _b !== void 0 ? _b : "");
                    let resetToDefaultsTimer = null;
                    const defaultValue = vue_1.ref(null);
                    const configurationProperties = vue_1.ref({});
                    const configurationOptions = vue_1.ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.configurationOptions) !== null && _d !== void 0 ? _d : {});
                    const hasDefaultValue = vue_1.computed(() => {
                        var _a;
                        if (!showConfigurationComponent.value || defaultValue.value === null) {
                            return false;
                        }
                        const fieldType = index_1.getFieldType(fieldTypeValue.value);
                        return (_a = fieldType === null || fieldType === void 0 ? void 0 : fieldType.hasDefaultComponent()) !== null && _a !== void 0 ? _a : false;
                    });
                    const isFieldTypesReady = vue_1.ref(false);
                    const isConfigurationReady = vue_1.ref(false);
                    const isReady = vue_1.computed(() => isFieldTypesReady.value && isConfigurationReady.value);
                    const fieldErrorMessage = vue_1.ref("");
                    const fieldTypeOptions = vue_1.ref([]);
                    const configurationComponent = vue_1.computed(() => {
                        const fieldType = index_1.getFieldType(fieldTypeValue.value);
                        if (fieldType) {
                            return fieldType.getConfigurationComponent();
                        }
                        return null;
                    });
                    const showConfigurationComponent = vue_1.computed(() => {
                        return configurationComponent.value !== null && isReady.value;
                    });
                    const fieldTypeName = vue_1.computed(() => {
                        const matches = fieldTypeOptions.value.filter(v => guid_1.areEqual(v.value, fieldTypeValue.value));
                        return matches.length >= 1 ? matches[0].text : "";
                    });
                    let isInternalUpdate = false;
                    const updateModelValue = () => {
                        var _a, _b;
                        if (isInternalUpdate) {
                            return;
                        }
                        const newValue = {
                            fieldTypeGuid: fieldTypeValue.value,
                            configurationOptions: configurationOptions.value,
                            defaultValue: (_b = (_a = defaultValue.value) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ""
                        };
                        emit("update:modelValue", newValue);
                    };
                    const resetToDefaults = () => {
                        if (resetToDefaultsTimer !== null) {
                            clearTimeout(resetToDefaultsTimer);
                            resetToDefaultsTimer = null;
                        }
                        isConfigurationReady.value = false;
                        isInternalUpdate = true;
                        configurationProperties.value = {};
                        configurationOptions.value = {};
                        defaultValue.value = null;
                        isInternalUpdate = false;
                        updateModelValue();
                    };
                    const updateFieldConfiguration = (currentDefaultValue) => {
                        if (fieldTypeValue.value === "") {
                            resetToDefaults();
                            return;
                        }
                        const update = {
                            fieldTypeGuid: fieldTypeValue.value,
                            configurationOptions: configurationOptions.value,
                            defaultValue: currentDefaultValue
                        };
                        http_1.post("/api/v2/Controls/FieldTypeEditor/fieldTypeConfiguration", null, update)
                            .then(result => {
                            var _a;
                            resetToDefaults();
                            console.debug("got configuration", result.data);
                            if (result.isSuccess && result.data && result.data.configurationProperties && result.data.configurationOptions && result.data.defaultValue) {
                                fieldErrorMessage.value = "";
                                isConfigurationReady.value = true;
                                isInternalUpdate = true;
                                configurationProperties.value = result.data.configurationProperties;
                                configurationOptions.value = result.data.configurationOptions;
                                defaultValue.value = result.data.defaultValue;
                                isInternalUpdate = false;
                                updateModelValue();
                            }
                            else {
                                fieldErrorMessage.value = (_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Encountered unknown error communicating with server.";
                            }
                        });
                    };
                    vue_1.watch(fieldTypeValue, () => {
                        if (resetToDefaultsTimer === null) {
                            resetToDefaultsTimer = window.setTimeout(resetToDefaults, 250);
                        }
                        updateFieldConfiguration("");
                    });
                    const onDefaultValueUpdate = () => {
                        console.debug("default value updated");
                        updateModelValue();
                    };
                    const onUpdateConfiguration = () => {
                        var _a, _b;
                        console.debug("onUpdateConfiguration");
                        updateFieldConfiguration((_b = (_a = defaultValue.value) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");
                    };
                    const onUpdateConfigurationValue = (key, value) => {
                        var _a;
                        if ((_a = defaultValue.value) === null || _a === void 0 ? void 0 : _a.configurationValues) {
                            console.debug("update configuration value", key, value);
                            defaultValue.value.configurationValues[key] = value;
                            updateModelValue();
                        }
                    };
                    http_1.get("/api/v2/Controls/FieldTypeEditor/availableFieldTypes")
                        .then(result => {
                        var _a, _b;
                        if (result.isSuccess && result.data) {
                            fieldTypeOptions.value = result.data;
                            isFieldTypesReady.value = true;
                            if (fieldTypeValue.value !== "") {
                                updateFieldConfiguration((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.defaultValue) !== null && _b !== void 0 ? _b : "");
                            }
                        }
                    });
                    return {
                        configurationComponent,
                        configurationOptions,
                        configurationProperties,
                        defaultValue,
                        hasDefaultValue,
                        fieldErrorMessage,
                        fieldTypeName,
                        fieldTypeOptions,
                        fieldTypeValue,
                        isFieldTypesReady,
                        onDefaultValueUpdate,
                        onUpdateConfiguration,
                        onUpdateConfigurationValue,
                        showConfigurationComponent
                    };
                },
                template: `
<div>
    <template v-if="isFieldTypesReady">
        <StaticFormControl v-if="isFieldTypeReadOnly" label="Field Type" v-model="fieldTypeName" />
        <DropDownList v-else label="Field Type" v-model="fieldTypeValue" :options="fieldTypeOptions" rules="required" />
    </template>
    <Alert v-if="fieldErrorMessage" alertType="warning">
        {{ fieldErrorMessage }}
    </Alert>
    <component v-if="showConfigurationComponent" :is="configurationComponent" v-model="configurationOptions" :configurationProperties="configurationProperties" @updateConfiguration="onUpdateConfiguration" @updateConfigurationValue="onUpdateConfigurationValue" />
    <RockField v-if="hasDefaultValue" :attributeValue="defaultValue" @update:attributeValue="onDefaultValueUpdate" isEditMode />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=fieldTypeEditor.js.map