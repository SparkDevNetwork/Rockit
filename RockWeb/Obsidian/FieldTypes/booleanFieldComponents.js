System.register(['vue', './utils.js', '@Obsidian/Utility/booleanUtils', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/toggle', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, asBoolean, asTrueFalseOrNull, DropDownList, Toggle, CheckBox, TextBox, toNumberOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            Toggle = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            var BooleanControlType;
            (function (BooleanControlType) {
                BooleanControlType[BooleanControlType["DropDown"] = 0] = "DropDown";
                BooleanControlType[BooleanControlType["Checkbox"] = 1] = "Checkbox";
                BooleanControlType[BooleanControlType["Toggle"] = 2] = "Toggle";
            })(BooleanControlType || (BooleanControlType = {}));
            const EditComponent = exports('EditComponent', defineComponent({
                name: "BooleanField.Edit",
                components: {
                    DropDownList,
                    Toggle,
                    CheckBox
                },
                props: getFieldEditorProps(),
                emits: ["update:modelValue"],
                setup(props, { emit }) {
                    const internalBooleanValue = ref(asBoolean(props.modelValue));
                    const internalValue = ref(asTrueFalseOrNull(props.modelValue) || "");
                    const booleanControlType = computed(() => {
                        const controlType = props.configurationValues["BooleanControlType"];
                        switch (controlType) {
                            case "1":
                                return BooleanControlType.Checkbox;
                            case "2":
                                return BooleanControlType.Toggle;
                            default:
                                return BooleanControlType.DropDown;
                        }
                    });
                    const isToggle = computed(() => booleanControlType.value === BooleanControlType.Toggle);
                    const isCheckBox = computed(() => booleanControlType.value === BooleanControlType.Checkbox);
                    const trueText = computed(() => {
                        let trueText = "Yes";
                        const trueConfig = props.configurationValues["truetext"];
                        if (trueConfig) {
                            trueText = trueConfig;
                        }
                        return trueText || "Yes";
                    });
                    const falseText = computed(() => {
                        let falseText = "No";
                        const falseConfig = props.configurationValues["falsetext"];
                        if (falseConfig) {
                            falseText = falseConfig;
                        }
                        return falseText || "No";
                    });
                    const toggleOptions = computed(() => ({
                        trueText: trueText.value,
                        falseText: falseText.value
                    }));
                    const dropDownListOptions = computed(() => {
                        const trueVal = asTrueFalseOrNull(true);
                        const falseVal = asTrueFalseOrNull(false);
                        return [
                            { text: falseText.value, value: falseVal },
                            { text: trueText.value, value: trueVal }
                        ];
                    });
                    watch(internalValue, () => {
                        if (booleanControlType.value === BooleanControlType.DropDown) {
                            emit("update:modelValue", internalValue.value);
                        }
                    });
                    watch(internalBooleanValue, () => {
                        if (booleanControlType.value !== BooleanControlType.DropDown) {
                            emit("update:modelValue", asTrueFalseOrNull(internalBooleanValue.value) || "");
                        }
                    });
                    watch(() => props.modelValue, () => {
                        internalValue.value = asTrueFalseOrNull(props.modelValue) || "";
                        internalBooleanValue.value = asBoolean(props.modelValue);
                    });
                    return {
                        internalBooleanValue,
                        internalValue,
                        booleanControlType,
                        isToggle,
                        isCheckBox,
                        toggleOptions,
                        dropDownListOptions
                    };
                },
                template: `
<Toggle v-if="isToggle" v-model="internalBooleanValue" v-bind="toggleOptions" />
<CheckBox v-else-if="isCheckBox" v-model="internalBooleanValue" />
<DropDownList v-else v-model="internalValue" :items="dropDownListOptions" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "BooleanField.Filter",
                components: {
                    DropDownList
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = ref(asTrueFalseOrNull(props.modelValue) || "");
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    watch(() => props.modelValue, () => {
                        internalValue.value = asTrueFalseOrNull(props.modelValue) || "";
                    });
                    const trueText = computed(() => {
                        const trueConfig = props.configurationValues["truetext"];
                        return trueConfig || "Yes";
                    });
                    const falseText = computed(() => {
                        const falseConfig = props.configurationValues["falsetext"];
                        return falseConfig || "No";
                    });
                    const dropDownListOptions = computed(() => {
                        const trueVal = asTrueFalseOrNull(true);
                        const falseVal = asTrueFalseOrNull(false);
                        return [
                            { text: falseText.value, value: falseVal },
                            { text: trueText.value, value: trueVal }
                        ];
                    });
                    return {
                        internalValue,
                        dropDownListOptions
                    };
                },
                template: `
<DropDownList v-model="internalValue" :items="dropDownListOptions" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "BooleanField.Configuration",
                components: { TextBox, DropDownList },
                props: getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const trueText = ref("Yes");
                    const falseText = ref("No");
                    const controlType = ref(BooleanControlType.DropDown);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = {};
                        newValue["truetext"] = (_a = trueText.value) !== null && _a !== void 0 ? _a : "Yes";
                        newValue["falsetext"] = (_b = falseText.value) !== null && _b !== void 0 ? _b : "No";
                        newValue["BooleanControlType"] = (_d = (_c = controlType.value) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : BooleanControlType.DropDown.toString();
                        const anyValueChanged = newValue["truetext"] !== ((_e = props.modelValue["truetext"]) !== null && _e !== void 0 ? _e : "Yes")
                            || newValue["falsetext"] !== ((_f = props.modelValue["falsetext"]) !== null && _f !== void 0 ? _f : "No")
                            || newValue["BooleanControlType"] !== ((_g = props.modelValue["BooleanControlType"]) !== null && _g !== void 0 ? _g : BooleanControlType.DropDown);
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
                        trueText.value = (_a = props.modelValue["truetext"]) !== null && _a !== void 0 ? _a : "Yes";
                        falseText.value = (_b = props.modelValue["falsetext"]) !== null && _b !== void 0 ? _b : "No";
                        controlType.value = (_c = toNumberOrNull(props.modelValue["BooleanControlType"])) !== null && _c !== void 0 ? _c : 0;
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(trueText, () => { var _a; return maybeUpdateConfiguration("truetext", (_a = trueText.value) !== null && _a !== void 0 ? _a : "Yes"); });
                    watch(falseText, () => { var _a; return maybeUpdateConfiguration("falsetext", (_a = falseText.value) !== null && _a !== void 0 ? _a : "No"); });
                    watch(controlType, () => { var _a, _b; return maybeUpdateConfiguration("BooleanControlType", (_b = (_a = controlType.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0"); });
                    const controlTypeOptions = [
                        { text: "Drop Down", value: BooleanControlType.DropDown },
                        { text: "Checkbox", value: BooleanControlType.Checkbox },
                        { text: "Toggle", value: BooleanControlType.Toggle }
                    ];
                    return { controlTypeOptions, trueText, falseText, controlType };
                },
                template: `
<div>
    <TextBox v-model="trueText" label="True Text" help="The text to display when value is true" />
    <TextBox v-model="falseText" label="False Text" help="The text to display when value is false" />
    <DropDownList v-model="controlType" label="Control Type" help="The type of control to use when editing the value" :items="controlTypeOptions" :show-blank-item="false" />
</div>
`
            }));

        })
    };
}));
