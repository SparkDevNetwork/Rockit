System.register(["vue", "./utils", "../Services/boolean", "../Elements/dropDownList", "../Elements/toggle", "../Elements/checkBox", "../Elements/textBox", "../Services/number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, boolean_1, dropDownList_1, toggle_1, checkBox_1, textBox_1, number_1, BooleanControlType, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (toggle_1_1) {
                toggle_1 = toggle_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            (function (BooleanControlType) {
                BooleanControlType[BooleanControlType["DropDown"] = 0] = "DropDown";
                BooleanControlType[BooleanControlType["Checkbox"] = 1] = "Checkbox";
                BooleanControlType[BooleanControlType["Toggle"] = 2] = "Toggle";
            })(BooleanControlType || (BooleanControlType = {}));
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "BooleanField.Edit",
                components: {
                    DropDownList: dropDownList_1.default,
                    Toggle: toggle_1.default,
                    CheckBox: checkBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: ["update:modelValue"],
                setup(props, { emit }) {
                    const internalBooleanValue = vue_1.ref(false);
                    const internalValue = vue_1.ref("");
                    vue_1.watch(internalValue, () => emit("update:modelValue", internalValue.value));
                    vue_1.watch(internalBooleanValue, () => emit("update:modelValue", boolean_1.asTrueFalseOrNull(internalBooleanValue.value) || ""));
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = boolean_1.asTrueFalseOrNull(props.modelValue) || "";
                        internalBooleanValue.value = boolean_1.asBoolean(props.modelValue);
                    }, { immediate: true });
                    const booleanControlType = vue_1.computed(() => {
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
                    const isToggle = vue_1.computed(() => booleanControlType.value === BooleanControlType.Toggle);
                    const isCheckBox = vue_1.computed(() => booleanControlType.value === BooleanControlType.Checkbox);
                    const trueText = vue_1.computed(() => {
                        let trueText = "Yes";
                        const trueConfig = props.configurationValues["truetext"];
                        if (trueConfig) {
                            trueText = trueConfig;
                        }
                        return trueText || "Yes";
                    });
                    const falseText = vue_1.computed(() => {
                        let falseText = "No";
                        const falseConfig = props.configurationValues["falsetext"];
                        if (falseConfig) {
                            falseText = falseConfig;
                        }
                        return falseText || "No";
                    });
                    const toggleOptions = vue_1.computed(() => ({
                        trueText: trueText.value,
                        falseText: falseText.value
                    }));
                    const dropDownListOptions = vue_1.computed(() => {
                        const trueVal = boolean_1.asTrueFalseOrNull(true);
                        const falseVal = boolean_1.asTrueFalseOrNull(false);
                        return [
                            { text: falseText.value, value: falseVal },
                            { text: trueText.value, value: trueVal }
                        ];
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
<DropDownList v-else v-model="internalValue" :options="dropDownListOptions" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "BooleanField.Configuration",
                components: { TextBox: textBox_1.default, DropDownList: dropDownList_1.default },
                props: utils_1.getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const trueText = vue_1.ref("Yes");
                    const falseText = vue_1.ref("No");
                    const controlType = vue_1.ref(BooleanControlType.DropDown);
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
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a, _b, _c;
                        trueText.value = (_a = props.modelValue["truetext"]) !== null && _a !== void 0 ? _a : "Yes";
                        falseText.value = (_b = props.modelValue["falsetext"]) !== null && _b !== void 0 ? _b : "No";
                        controlType.value = (_c = number_1.toNumberOrNull(props.modelValue["BooleanControlType"])) !== null && _c !== void 0 ? _c : 0;
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(trueText, () => { var _a; return maybeUpdateConfiguration("truetext", (_a = trueText.value) !== null && _a !== void 0 ? _a : "Yes"); });
                    vue_1.watch(falseText, () => { var _a; return maybeUpdateConfiguration("falsetext", (_a = falseText.value) !== null && _a !== void 0 ? _a : "No"); });
                    vue_1.watch(controlType, () => { var _a, _b; return maybeUpdateConfiguration("BooleanControlType", (_b = (_a = controlType.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0"); });
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
    <DropDownList v-model="controlType" label="Control Type" help="The type of control to use when editing the value" :options="controlTypeOptions" :show-blank-item="false" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=booleanFieldComponents.js.map