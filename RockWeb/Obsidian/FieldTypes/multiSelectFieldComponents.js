System.register(['vue', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/listBox', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/component', './utils.js', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, inject, ref, computed, watch, CheckBoxList, DropDownList, ListBox, NumberBox, TextBox, asBoolean, asBooleanOrNull, asTrueFalseOrNull, toNumberOrNull, updateRefValue, getFieldEditorProps, getFieldConfigurationProps;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            ListBox = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
            asBooleanOrNull = module.asBooleanOrNull;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "MultiSelectField.Edit",
                components: {
                    ListBox,
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                setup() {
                    return {
                        isRequired: inject("isRequired")
                    };
                },
                data() {
                    return {
                        internalValue: []
                    };
                },
                computed: {
                    options() {
                        var _a;
                        try {
                            const valuesConfig = JSON.parse((_a = this.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                            return valuesConfig.map(v => {
                                return {
                                    text: v.text,
                                    value: v.value
                                };
                            });
                        }
                        catch (_b) {
                            return [];
                        }
                    },
                    listBoxConfigAttributes() {
                        const attributes = {};
                        const enhancedSelection = this.configurationValues["enhancedselection"];
                        if (asBoolean(enhancedSelection)) {
                            attributes.enhanceForLongLists = true;
                        }
                        return attributes;
                    },
                    checkBoxListConfigAttributes() {
                        const attributes = {};
                        const repeatColumnsConfig = this.configurationValues["repeatColumns"];
                        const repeatDirection = this.configurationValues["repeatDirection"];
                        if (repeatColumnsConfig) {
                            attributes["repeatColumns"] = toNumberOrNull(repeatColumnsConfig) || 0;
                        }
                        if (repeatDirection !== "1") {
                            attributes["horizontal"] = true;
                        }
                        return attributes;
                    },
                    isListBox() {
                        const enhancedSelection = this.configurationValues["enhancedselection"];
                        return asBoolean(enhancedSelection);
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue.join(","));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            const value = this.modelValue || "";
                            this.internalValue = value !== "" ? value.split(",") : [];
                        }
                    }
                },
                template: `
<ListBox v-if="isListBox" v-model="internalValue" v-bind="listBoxConfigAttributes" :items="options" />
<CheckBoxList v-else v-model="internalValue" v-bind="checkBoxListConfigAttributes" :items="options" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "MultiSelectField.Filter",
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
            const repeatDirectionOptions = [
                {
                    value: "0",
                    text: "Horizontal"
                },
                {
                    value: "1",
                    text: "Vertical"
                }
            ];
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "MultiSelectField.Configuration",
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
                    const enhanceForLongLists = ref(false);
                    const repeatColumns = ref(null);
                    const repeatDirection = ref("");
                    const onBlur = () => {
                        internalRawValues.value = rawValues.value;
                    };
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        const newValue = Object.assign({}, props.modelValue);
                        newValue["customValues"] = (_a = internalRawValues.value) !== null && _a !== void 0 ? _a : "";
                        newValue["enhancedselection"] = (_b = asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _b !== void 0 ? _b : "False";
                        newValue["repeatColumns"] = (_d = (_c = repeatColumns.value) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "";
                        newValue["repeatDirection"] = (_e = repeatDirection.value) !== null && _e !== void 0 ? _e : "0";
                        const anyValueChanged = newValue["customValues"] !== ((_f = props.modelValue["customValues"]) !== null && _f !== void 0 ? _f : "")
                            || newValue["enhancedselection"] !== ((_g = props.modelValue["enhancedselection"]) !== null && _g !== void 0 ? _g : "False")
                            || newValue["repeatColumns"] !== ((_h = props.modelValue["repeatColumns"]) !== null && _h !== void 0 ? _h : "")
                            || newValue["repeatDirection"] !== ((_j = props.modelValue["repeatDirection"]) !== null && _j !== void 0 ? _j : "0");
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
                        var _a, _b, _c;
                        rawValues.value = (_a = props.modelValue["customValues"]) !== null && _a !== void 0 ? _a : "";
                        internalRawValues.value = rawValues.value;
                        enhanceForLongLists.value = (_b = asBooleanOrNull(props.modelValue["enhancedselection"])) !== null && _b !== void 0 ? _b : false;
                        repeatColumns.value = toNumberOrNull(props.modelValue["repeatColumns"]);
                        repeatDirection.value = (_c = props.modelValue["repeatDirection"]) !== null && _c !== void 0 ? _c : "0";
                    }, {
                        immediate: true
                    });
                    watch([internalRawValues], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(enhanceForLongLists, () => { var _a; return maybeUpdateConfiguration("enhancedselection", (_a = asTrueFalseOrNull(enhanceForLongLists.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(repeatColumns, () => { var _a, _b; return maybeUpdateConfiguration("repeatColumns", (_b = (_a = repeatColumns.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    watch(repeatDirection, () => { var _a; return maybeUpdateConfiguration("repeatDirection", (_a = repeatDirection.value) !== null && _a !== void 0 ? _a : "0"); });
                    return {
                        enhanceForLongLists,
                        onBlur,
                        rawValues,
                        repeatColumns,
                        repeatDirection,
                        repeatDirectionOptions
                    };
                },
                template: `
<div>
    <TextBox v-model="rawValues"
        label="Values"
        help="The source of the values to display in a list. Format is either 'value1,value2,value3,...', 'value1^text1,value2^text2,value3^text3,...', or a SQL Select statement that returns a result set with a 'Value' and 'Text' column <span class='tip tip-lava'></span>."
        textMode="multiline"
        @blur="onBlur" />

    <CheckBox v-model="enhanceForLongLists"
        label="Enhance For Long Lists"
        help="When set, will render a searchable selection of options." />

    <NumberBox
        v-model="repeatColumns"
        label="Columns"
        help="Select how many columns the list should use before going to the next row. If blank or 0 then 4 columns will be displayed. There is no enforced upper limit however the block this control is used in might add contraints due to available space." />

    <DropDownList v-model="repeatDirection"
        label="Repeat Direction"
        help="The direction that the list options will be displayed."
        :items="repeatDirectionOptions"
        :showBlankItem="false" />
</div>
`
            }));

        })
    };
}));
