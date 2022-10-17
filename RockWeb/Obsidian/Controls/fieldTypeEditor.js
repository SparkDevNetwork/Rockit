System.register(['vue', './rockField.js', './alert.js', './dropDownList.js', './staticFormControl.js', '@Obsidian/Utility/fieldTypes', '@Obsidian/Utility/http', '@Obsidian/Utility/guid', '@Obsidian/Utility/component', '@Obsidian/Utility/util', 'ant-design-vue', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/stringUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, RockField, Alert, DropDownList, StaticFormControl, getFieldType, useHttp, areEqual, newGuid, updateRefValue, deepEqual;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockField = module["default"];
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            StaticFormControl = module["default"];
        }, function (module) {
            getFieldType = module.getFieldType;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            areEqual = module.areEqual;
            newGuid = module.newGuid;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            deepEqual = module.deepEqual;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var FieldTypeEditor = exports('default', defineComponent({
                name: "FieldTypeEditor",
                components: {
                    Alert,
                    DropDownList,
                    RockField,
                    StaticFormControl
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
                    const http = useHttp();
                    const internalValue = ref(props.modelValue);
                    const fieldTypeValue = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.fieldTypeGuid) !== null && _b !== void 0 ? _b : "");
                    let resetToDefaultsTimer = null;
                    const defaultValue = ref("");
                    const configurationProperties = ref({});
                    const configurationValues = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.configurationValues) !== null && _d !== void 0 ? _d : {});
                    const hasDefaultValue = computed(() => {
                        var _a;
                        if (!showConfigurationComponent.value || defaultValue.value === null) {
                            return false;
                        }
                        const fieldType = getFieldType(fieldTypeValue.value);
                        return (_a = fieldType === null || fieldType === void 0 ? void 0 : fieldType.hasDefaultComponent()) !== null && _a !== void 0 ? _a : false;
                    });
                    const isFieldTypesReady = ref(false);
                    const isConfigurationReady = ref(false);
                    const isReady = computed(() => isFieldTypesReady.value && isConfigurationReady.value);
                    const fieldErrorMessage = ref("");
                    const fieldTypeOptions = ref([]);
                    const configurationComponent = computed(() => {
                        const fieldType = getFieldType(fieldTypeValue.value);
                        if (fieldType) {
                            return fieldType.getConfigurationComponent();
                        }
                        return null;
                    });
                    const showConfigurationComponent = computed(() => {
                        return configurationComponent.value !== null && isReady.value;
                    });
                    const fieldTypeName = computed(() => {
                        var _a;
                        const matches = fieldTypeOptions.value.filter(v => areEqual(v.value, fieldTypeValue.value));
                        return matches.length >= 1 ? (_a = matches[0].text) !== null && _a !== void 0 ? _a : "" : "";
                    });
                    const defaultValueAttribute = computed(() => {
                        return {
                            fieldTypeGuid: fieldTypeValue.value,
                            attributeGuid: newGuid(),
                            configurationValues: configurationValues.value,
                            name: "Default Value",
                            key: "DefaultValue",
                            description: "",
                            isRequired: false,
                            order: 0,
                            categories: []
                        };
                    });
                    let isInternalUpdate = false;
                    const updateModelValue = () => {
                        var _a;
                        if (isInternalUpdate) {
                            return;
                        }
                        const newValue = {
                            fieldTypeGuid: fieldTypeValue.value,
                            configurationValues: configurationValues.value,
                            defaultValue: (_a = defaultValue.value) !== null && _a !== void 0 ? _a : ""
                        };
                        updateRefValue(internalValue, newValue);
                    };
                    const resetToDefaults = () => {
                        if (resetToDefaultsTimer !== null) {
                            clearTimeout(resetToDefaultsTimer);
                            resetToDefaultsTimer = null;
                        }
                        isConfigurationReady.value = false;
                        isInternalUpdate = true;
                        configurationProperties.value = {};
                        configurationValues.value = {};
                        defaultValue.value = "";
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
                            configurationValues: configurationValues.value,
                            defaultValue: currentDefaultValue
                        };
                        http.post("/api/v2/Controls/FieldTypeEditorUpdateAttributeConfiguration", null, update)
                            .then(result => {
                            var _a, _b;
                            resetToDefaults();
                            console.debug("got configuration", result.data);
                            if (result.isSuccess && result.data && result.data.configurationProperties && result.data.configurationValues) {
                                fieldErrorMessage.value = "";
                                isConfigurationReady.value = true;
                                isInternalUpdate = true;
                                configurationProperties.value = result.data.configurationProperties;
                                configurationValues.value = result.data.configurationValues;
                                defaultValue.value = (_a = result.data.defaultValue) !== null && _a !== void 0 ? _a : "";
                                isInternalUpdate = false;
                                updateModelValue();
                            }
                            else {
                                fieldErrorMessage.value = (_b = result.errorMessage) !== null && _b !== void 0 ? _b : "Encountered unknown error communicating with server.";
                            }
                        });
                    };
                    const onDefaultValueUpdate = (value) => {
                        console.debug("default value updated");
                        defaultValue.value = value;
                        updateModelValue();
                    };
                    const onUpdateConfiguration = () => {
                        var _a;
                        console.debug("onUpdateConfiguration");
                        updateFieldConfiguration((_a = defaultValue.value) !== null && _a !== void 0 ? _a : "");
                    };
                    const onUpdateConfigurationValue = (_key, _value) => {
                        updateModelValue();
                    };
                    watch(fieldTypeValue, () => {
                        if (resetToDefaultsTimer === null) {
                            resetToDefaultsTimer = window.setTimeout(resetToDefaults, 250);
                        }
                        updateFieldConfiguration("");
                    });
                    watch(internalValue, () => {
                        if (!deepEqual(internalValue.value, props.modelValue, true)) {
                            emit("update:modelValue", internalValue.value);
                        }
                    });
                    http.post("/api/v2/Controls/FieldTypeEditorGetAvailableFieldTypes", undefined, {})
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
                        configurationValues,
                        configurationProperties,
                        defaultValue,
                        defaultValueAttribute,
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
        <DropDownList v-else label="Field Type" v-model="fieldTypeValue" :items="fieldTypeOptions" rules="required" />
    </template>
    <Alert v-if="fieldErrorMessage" alertType="warning">
        {{ fieldErrorMessage }}
    </Alert>
    <component v-if="showConfigurationComponent" :is="configurationComponent" v-model="configurationValues" :configurationProperties="configurationProperties" @updateConfiguration="onUpdateConfiguration" @updateConfigurationValue="onUpdateConfigurationValue" />
    <RockField v-if="hasDefaultValue" :modelValue="defaultValue" :attribute="defaultValueAttribute" @update:modelValue="onDefaultValueUpdate" isEditMode />
</div>
`
            }));

        })
    };
}));
