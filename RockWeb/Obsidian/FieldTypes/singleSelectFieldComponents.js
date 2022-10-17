System.register(['vue', './utils.js', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/radioButtonList', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, inject, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, CheckBoxList, DropDownList, NumberBox, RadioButtonList, TextBox, toNumberOrNull, updateRefValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "SingleSelectField.Edit",
                components: {
                    DropDownList,
                    RadioButtonList
                },
                props: getFieldEditorProps(),
                setup() {
                    return {
                        isRequired: inject("isRequired")
                    };
                },
                data() {
                    return {
                        internalValue: ""
                    };
                },
                computed: {
                    options() {
                        var _a;
                        try {
                            const providedOptions = JSON.parse((_a = this.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                            if (this.isRadioButtons && !this.isRequired) {
                                providedOptions.unshift({
                                    text: "None",
                                    value: ""
                                });
                            }
                            return providedOptions;
                        }
                        catch (_b) {
                            return [];
                        }
                    },
                    ddlConfigAttributes() {
                        const attributes = {};
                        const fieldTypeConfig = this.configurationValues["fieldtype"];
                        if (fieldTypeConfig === "ddl_enhanced") {
                            attributes.enhanceForLongLists = true;
                        }
                        return attributes;
                    },
                    rbConfigAttributes() {
                        const attributes = {};
                        const repeatColumnsConfig = this.configurationValues["repeatColumns"];
                        if (repeatColumnsConfig) {
                            attributes["repeatColumns"] = toNumberOrNull(repeatColumnsConfig) || 0;
                        }
                        return attributes;
                    },
                    isRadioButtons() {
                        const fieldTypeConfig = this.configurationValues["fieldtype"];
                        return fieldTypeConfig === "rb";
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || "";
                        }
                    }
                },
                template: `
<RadioButtonList v-if="isRadioButtons" v-model="internalValue" v-bind="rbConfigAttributes" :items="options" horizontal />
<DropDownList v-else v-model="internalValue" v-bind="ddlConfigAttributes" :items="options" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "SingleSelectField.Filter",
                components: {
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue.split(",").filter(v => v !== ""));
                    const options = computed(() => {
                        var _a;
                        try {
                            const providedOptions = JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                            return providedOptions;
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    watch(() => props.modelValue, () => {
                        updateRefValue(internalValue, props.modelValue.split(",").filter(v => v !== ""));
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value.join(","));
                    });
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<CheckBoxList v-model="internalValue" :items="options" horizontal />
`
            }));
            const controlTypeOptions = [
                {
                    value: "ddl",
                    text: "Drop Down List"
                },
                {
                    value: "ddl_enhanced",
                    text: "Drop Down List (Enhanced for Long Lists)"
                },
                {
                    value: "rb",
                    text: "Radio Buttons"
                }
            ];
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "SingleSelectField.Configuration",
                components: {
                    DropDownList,
                    TextBox,
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const rawValues = ref("");
                    const internalRawValues = ref("");
                    const controlType = ref("");
                    const repeatColumns = ref(null);
                    const isRadioList = computed(() => {
                        return controlType.value === "rb";
                    });
                    const onBlur = () => {
                        internalRawValues.value = rawValues.value;
                    };
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = Object.assign({}, props.modelValue);
                        newValue["customValues"] = (_a = internalRawValues.value) !== null && _a !== void 0 ? _a : "";
                        newValue["fieldtype"] = (_b = controlType.value) !== null && _b !== void 0 ? _b : "";
                        newValue["repeatColumns"] = (_d = (_c = repeatColumns.value) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "";
                        const anyValueChanged = newValue["customValues"] !== ((_e = props.modelValue["customValues"]) !== null && _e !== void 0 ? _e : "")
                            || newValue["fieldtype"] !== ((_f = props.modelValue["fieldtype"]) !== null && _f !== void 0 ? _f : "")
                            || newValue["repeatColumns"] !== ((_g = props.modelValue["repeatColumns"]) !== null && _g !== void 0 ? _g : "");
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
                        rawValues.value = (_a = props.modelValue["customValues"]) !== null && _a !== void 0 ? _a : "";
                        internalRawValues.value = rawValues.value;
                        controlType.value = (_b = props.modelValue["fieldtype"]) !== null && _b !== void 0 ? _b : "ddl";
                        repeatColumns.value = toNumberOrNull(props.modelValue["repeatColumns"]);
                    }, {
                        immediate: true
                    });
                    watch([internalRawValues], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(controlType, () => { var _a; return maybeUpdateConfiguration("fieldtype", (_a = controlType.value) !== null && _a !== void 0 ? _a : "ddl"); });
                    watch(repeatColumns, () => { var _a, _b; return maybeUpdateConfiguration("repeatColumns", (_b = (_a = repeatColumns.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    return {
                        controlType,
                        controlTypeOptions,
                        isRadioList,
                        onBlur,
                        rawValues,
                        repeatColumns
                    };
                },
                template: `
<div>
    <TextBox v-model="rawValues"
        label="Values"
        help="The source of the values to display in a list.  Format is either 'value1,value2,value3,...', 'value1^text1,value2^text2,value3^text3,...', or a SQL Select statement that returns a result set with a 'Value' and 'Text' column <span class='tip tip-lava'></span>."
        textMode="multiline"
        @blur="onBlur" />

    <DropDownList v-model="controlType"
        label="Control Type"
        help="The type of control to use for selecting a single value from the list."
        :items="controlTypeOptions"
        :showBlankItem="false" />

    <NumberBox v-if="isRadioList"
        v-model="repeatColumns"
        label="Columns"
        help="Select how many columns the list should use before going to the next row. If blank or 0 then 4 columns will be displayed. There is no enforced upper limit however the block this control is used in might add contraints due to available space." />
</div>
`
            }));

        })
    };
}));
