System.register(['vue', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/numberBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/component', './utils.js', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, inject, CheckBox, CheckBoxList, DropDownList, NumberBox, asBoolean, asTrueFalseOrNull, toNumber, toNumberOrNull, useVModelPassthrough, getFieldEditorProps;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            inject = module.inject;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            toNumber = module.toNumber;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

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
            const EditComponent = exports('EditComponent', defineComponent({
                name: "DefinedValueField.Edit",
                components: {
                    DropDownList,
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref(parseModelValue(props.modelValue));
                    const internalValues = ref(parseModelValue(props.modelValue).split(",").filter(v => v !== ""));
                    const valueOptions = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const displayDescription = computed(() => asBoolean(props.configurationValues["displaydescription"]));
                    const options = computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: displayDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    const optionsMultiple = computed(() => {
                        return valueOptions.value.map(v => {
                            return {
                                text: displayDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                    });
                    const isMultiple = computed(() => asBoolean(props.configurationValues["allowmultiple"]));
                    const configAttributes = computed(() => {
                        const attributes = {};
                        const enhancedConfig = props.configurationValues["enhancedselection"];
                        if (enhancedConfig) {
                            attributes.enhanceForLongLists = asBoolean(enhancedConfig);
                        }
                        return attributes;
                    });
                    const repeatColumns = computed(() => toNumber(props.configurationValues["RepeatColumns"]));
                    watch(() => props.modelValue, () => {
                        internalValue.value = parseModelValue(props.modelValue);
                        internalValues.value = parseModelValue(props.modelValue).split(",").filter(v => v !== "");
                    });
                    watch(() => internalValue.value, () => {
                        if (!isMultiple.value) {
                            const clientValue = getClientValue(internalValue.value, valueOptions.value);
                            emit("update:modelValue", JSON.stringify(clientValue));
                        }
                    });
                    watch(() => internalValues.value, () => {
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
                        isRequired: inject("isRequired"),
                        options,
                        optionsMultiple,
                        repeatColumns
                    };
                },
                template: `
<DropDownList v-if="!isMultiple" v-model="internalValue" v-bind="configAttributes" :items="options" :showBlankItem="!isRequired" />
<CheckBoxList v-else v-model="internalValues" :items="optionsMultiple" horizontal :repeatColumns="repeatColumns" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "DefinedValueField.Filter",
                components: {
                    EditComponent
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const configurationValues = ref(Object.assign({}, props.configurationValues));
                    configurationValues.value["allowmultiple"] = "True";
                    watch(() => props.configurationValues, () => {
                        configurationValues.value = Object.assign({}, props.configurationValues);
                        configurationValues.value["allowmultiple"] = "True";
                    });
                    return {
                        internalValue,
                        configurationValues
                    };
                },
                template: `
<EditComponent v-model="internalValue" :configurationValues="configurationValues" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DefinedValueField.Configuration",
                components: {
                    DropDownList,
                    CheckBoxList,
                    CheckBox,
                    NumberBox
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
                    const definedTypeValue = ref("");
                    const allowMultipleValues = ref(false);
                    const displayDescriptions = ref(false);
                    const enhanceForLongLists = ref(false);
                    const includeInactive = ref(false);
                    const repeatColumns = ref(null);
                    const selectableValues = ref([]);
                    const definedTypeItems = ref([]);
                    const definedValueItems = ref([]);
                    const definedTypeOptions = computed(() => {
                        return definedTypeItems.value;
                    });
                    const definedValueOptions = computed(() => definedValueItems.value);
                    const hasValues = computed(() => {
                        return definedValueItems.value.length > 0;
                    });
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        const newValue = Object.assign({}, props.modelValue);
                        newValue["definedtype"] = definedTypeValue.value;
                        newValue["selectableValues"] = selectableValues.value.join(",");
                        newValue["allowmultiple"] = (_a = asTrueFalseOrNull(allowMultipleValues.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["displaydescription"] = (_b = asTrueFalseOrNull(displayDescriptions.value)) !== null && _b !== void 0 ? _b : "False";
                        newValue["enhancedselection"] = (_c = asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _c !== void 0 ? _c : "False";
                        newValue["includeInactive"] = (_d = asTrueFalseOrNull(includeInactive.value)) !== null && _d !== void 0 ? _d : "False";
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a, _b;
                        const definedTypes = props.configurationProperties["definedTypes"];
                        const definedValues = props.configurationProperties["definedValues"];
                        definedTypeItems.value = definedTypes ? JSON.parse(props.configurationProperties.definedTypes) : [];
                        definedValueItems.value = definedValues ? JSON.parse(props.configurationProperties.definedValues) : [];
                        definedTypeValue.value = props.modelValue.definedtype;
                        allowMultipleValues.value = asBoolean(props.modelValue["allowmultiple"]);
                        displayDescriptions.value = asBoolean(props.modelValue["displaydescription"]);
                        enhanceForLongLists.value = asBoolean(props.modelValue["enhancedselection"]);
                        includeInactive.value = asBoolean(props.modelValue["includeInactive"]);
                        repeatColumns.value = toNumberOrNull(props.modelValue["RepeatColumns"]);
                        selectableValues.value = ((_b = (_a = props.modelValue["selectableValues"]) === null || _a === void 0 ? void 0 : _a.split(",")) !== null && _b !== void 0 ? _b : []).filter(s => s !== "");
                    }, {
                        immediate: true
                    });
                    watch([definedTypeValue, selectableValues, displayDescriptions, includeInactive], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(allowMultipleValues, () => { var _a; return maybeUpdateConfiguration("allowmultiple", (_a = asTrueFalseOrNull(allowMultipleValues.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(enhanceForLongLists, () => { var _a; return maybeUpdateConfiguration("enhancedselection", (_a = asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(repeatColumns, () => { var _a, _b; return maybeUpdateConfiguration("RepeatColumns", (_b = (_a = repeatColumns.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
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
    <DropDownList v-model="definedTypeValue" label="Defined Type" :items="definedTypeOptions" :showBlankItem="false" />
    <CheckBox v-model="allowMultipleValues" label="Allow Multiple Values" text="Yes" help="When set, allows multiple defined type values to be selected." />
    <CheckBox v-model="displayDescriptions" label="Display Descriptions" text="Yes" help="When set, the defined value descriptions will be displayed instead of the values." />
    <CheckBox v-model="enhanceForLongLists" label="Enhance For Long Lists" text="Yes" />
    <CheckBox v-model="includeInactive" label="Include Inactive" text="Yes" />
    <NumberBox v-model="repeatColumns" label="Repeat Columns" />
    <CheckBoxList v-if="hasValues" v-model="selectableValues" label="Selectable Values" :items="definedValueOptions" :horizontal="true" />
</div>
`
            }));

        })
    };
}));
