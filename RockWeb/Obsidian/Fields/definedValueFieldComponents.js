System.register(["vue", "../Elements/checkBox", "../Elements/checkBoxList", "../Elements/dropDownList", "../Elements/numberBox", "../Services/boolean", "../Services/number", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, checkBox_1, checkBoxList_1, dropDownList_1, numberBox_1, boolean_1, number_1, utils_1, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    function parseModelValue(modelValue) {
        try {
            const clientValue = JSON.parse(modelValue !== null && modelValue !== void 0 ? modelValue : "");
            return clientValue.value;
        }
        catch (_a) {
            return "";
        }
    }
    function getClientValue(value, valueOptions) {
        const values = Array.isArray(value) ? value : [value];
        const selectedValues = valueOptions.filter(v => values.includes(v.value));
        if (selectedValues.length >= 1) {
            return {
                value: selectedValues.map(v => v.value).join(","),
                text: selectedValues.map(v => v.text).join(", "),
                description: selectedValues.map(v => v.description).join(", ")
            };
        }
        else {
            return {
                value: "",
                text: "",
                description: ""
            };
        }
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (checkBoxList_1_1) {
                checkBoxList_1 = checkBoxList_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "DefinedValueField.Edit",
                components: {
                    DropDownList: dropDownList_1.default,
                    CheckBoxList: checkBoxList_1.default
                },
                props: utils_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(parseModelValue(props.modelValue));
                    const internalValues = vue_1.ref(parseModelValue(props.modelValue).split(",").filter(v => v !== ""));
                    const valueOptions = vue_1.computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["selectableValues"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const displayDescription = vue_1.computed(() => boolean_1.asBoolean(props.configurationValues["displaydescription"]));
                    const options = vue_1.computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: displayDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    const optionsMultiple = vue_1.computed(() => {
                        return valueOptions.value.map(v => {
                            return {
                                text: displayDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                    });
                    const isMultiple = vue_1.computed(() => boolean_1.asBoolean(props.configurationValues["allowmultiple"]));
                    const configAttributes = vue_1.computed(() => {
                        const attributes = {};
                        const enhancedConfig = props.configurationValues["enhancedselection"];
                        if (enhancedConfig) {
                            attributes.enhanceForLongLists = boolean_1.asBoolean(enhancedConfig);
                        }
                        return attributes;
                    });
                    const repeatColumns = vue_1.computed(() => number_1.toNumber(props.configurationValues["RepeatColumns"]));
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = parseModelValue(props.modelValue);
                        internalValues.value = parseModelValue(props.modelValue).split(",").filter(v => v !== "");
                    });
                    vue_1.watch(() => internalValue.value, () => {
                        if (!isMultiple.value) {
                            const clientValue = getClientValue(internalValue.value, valueOptions.value);
                            emit("update:modelValue", JSON.stringify(clientValue));
                        }
                    });
                    vue_1.watch(() => internalValues.value, () => {
                        if (isMultiple.value) {
                            const clientValue = getClientValue(internalValues.value, valueOptions.value);
                            emit("update:modelValue", JSON.stringify(clientValue));
                        }
                    });
                    return {
                        configAttributes,
                        internalValue,
                        internalValues,
                        isMultiple,
                        isRequired: vue_1.inject("isRequired"),
                        options,
                        optionsMultiple,
                        repeatColumns
                    };
                },
                template: `
<DropDownList v-if="!isMultiple" v-model="internalValue" v-bind="configAttributes" :options="options" :showBlankItem="!isRequired" />
<CheckBoxList v-else v-model="internalValues" :options="optionsMultiple" horizontal :repeatColumns="repeatColumns" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "DefinedValueField.Configuration",
                components: {
                    DropDownList: dropDownList_1.default,
                    CheckBoxList: checkBoxList_1.default,
                    CheckBox: checkBox_1.default,
                    NumberBox: numberBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    configurationProperties: {
                        type: Object,
                        required: true
                    }
                },
                setup(props, { emit }) {
                    const definedTypeValue = vue_1.ref("");
                    const allowMultipleValues = vue_1.ref(false);
                    const displayDescriptions = vue_1.ref(false);
                    const enhanceForLongLists = vue_1.ref(false);
                    const includeInactive = vue_1.ref(false);
                    const repeatColumns = vue_1.ref(null);
                    const selectableValues = vue_1.ref([]);
                    const definedTypeItems = vue_1.ref([]);
                    const definedValueItems = vue_1.ref([]);
                    const definedTypeOptions = vue_1.computed(() => {
                        return definedTypeItems.value;
                    });
                    const definedValueOptions = vue_1.computed(() => definedValueItems.value);
                    const hasValues = vue_1.computed(() => {
                        return definedValueItems.value.length > 0;
                    });
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        const newValue = {};
                        newValue["definedtype"] = definedTypeValue.value;
                        newValue["selectableValues"] = selectableValues.value.join(",");
                        newValue["allowmultiple"] = (_a = boolean_1.asTrueFalseOrNull(allowMultipleValues.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["displaydescription"] = (_b = boolean_1.asTrueFalseOrNull(displayDescriptions.value)) !== null && _b !== void 0 ? _b : "False";
                        newValue["enhancedselection"] = (_c = boolean_1.asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _c !== void 0 ? _c : "False";
                        newValue["includeInactive"] = (_d = boolean_1.asTrueFalseOrNull(includeInactive.value)) !== null && _d !== void 0 ? _d : "False";
                        newValue["RepeatColumns"] = (_f = (_e = repeatColumns.value) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "";
                        const anyValueChanged = newValue["definedtype"] !== props.modelValue["definedtype"]
                            || newValue["selectableValues"] !== ((_g = props.modelValue["selectableValues"]) !== null && _g !== void 0 ? _g : "")
                            || newValue["allowmultiple"] !== ((_h = props.modelValue["allowmultiple"]) !== null && _h !== void 0 ? _h : "False")
                            || newValue["displaydescription"] !== ((_j = props.modelValue["displaydescription"]) !== null && _j !== void 0 ? _j : "False")
                            || newValue["enhancedselection"] !== ((_k = props.modelValue["enhancedselection"]) !== null && _k !== void 0 ? _k : "False")
                            || newValue["includeInactive"] !== ((_l = props.modelValue["includeInactive"]) !== null && _l !== void 0 ? _l : "False")
                            || newValue["RepeatColumns"] !== ((_m = props.modelValue["RepeatColumns"]) !== null && _m !== void 0 ? _m : "");
                        if (anyValueChanged) {
                            emit("update:modelValue", newValue);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    const maybeUpdateConfiguration = (key, value) => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfigurationValue", key, value);
                        }
                    };
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a, _b;
                        const definedTypes = props.configurationProperties["definedTypes"];
                        const definedValues = props.configurationProperties["definedValues"];
                        definedTypeItems.value = definedTypes ? JSON.parse(props.configurationProperties.definedTypes) : [];
                        definedValueItems.value = definedValues ? JSON.parse(props.configurationProperties.definedValues) : [];
                        definedTypeValue.value = props.modelValue.definedtype;
                        allowMultipleValues.value = boolean_1.asBoolean(props.modelValue["allowmultiple"]);
                        displayDescriptions.value = boolean_1.asBoolean(props.modelValue["displaydescription"]);
                        enhanceForLongLists.value = boolean_1.asBoolean(props.modelValue["enhancedselection"]);
                        includeInactive.value = boolean_1.asBoolean(props.modelValue["includeInactive"]);
                        repeatColumns.value = number_1.toNumberOrNull(props.modelValue["RepeatColumns"]);
                        selectableValues.value = ((_b = (_a = props.modelValue.selectableValues) === null || _a === void 0 ? void 0 : _a.split(",")) !== null && _b !== void 0 ? _b : []).filter(s => s !== "");
                    }, {
                        immediate: true
                    });
                    vue_1.watch([definedTypeValue, selectableValues, displayDescriptions, includeInactive], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(allowMultipleValues, () => { var _a; return maybeUpdateConfiguration("allowmultiple", (_a = boolean_1.asTrueFalseOrNull(allowMultipleValues.value)) !== null && _a !== void 0 ? _a : "False"); });
                    vue_1.watch(enhanceForLongLists, () => { var _a; return maybeUpdateConfiguration("enhancedselection", (_a = boolean_1.asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _a !== void 0 ? _a : "False"); });
                    vue_1.watch(repeatColumns, () => { var _a, _b; return maybeUpdateConfiguration("RepeatColumns", (_b = (_a = repeatColumns.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    return {
                        allowMultipleValues,
                        definedTypeValue,
                        definedTypeOptions,
                        definedValueOptions,
                        displayDescriptions,
                        enhanceForLongLists,
                        hasValues,
                        includeInactive,
                        repeatColumns,
                        selectableValues
                    };
                },
                template: `
<div>
    <DropDownList v-model="definedTypeValue" label="Defined Type" :options="definedTypeOptions" :showBlankItem="false" />
    <CheckBox v-model="allowMultipleValues" label="Allow Multiple Values" text="Yes" help="When set, allows multiple defined type values to be selected." />
    <CheckBox v-model="displayDescriptions" label="Display Descriptions" text="Yes" help="When set, the defined value descriptions will be displayed instead of the values." />
    <CheckBox v-model="enhanceForLongLists" label="Enhance For Long Lists" text="Yes" />
    <CheckBox v-model="includeInactive" label="Include Inactive" text="Yes" />
    <NumberBox v-model="repeatColumns" label="Repeat Columns" />
    <CheckBoxList v-if="hasValues" v-model="selectableValues" label="Selectable Values" :options="definedValueOptions" :horizontal="true" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=definedValueFieldComponents.js.map