System.register(["vue", "./utils", "../Elements/textBox", "../Elements/numberBox", "../Elements/checkBox", "../Services/boolean", "../Services/number", "../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, textBox_1, numberBox_1, checkBox_1, boolean_1, number_1, number_2, component_1, EditComponent, FilterComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
                number_2 = number_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "MemoField.Edit",
                components: {
                    TextBox: textBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const configAttributes = vue_1.computed(() => {
                        const attributes = {};
                        const maxCharsConfig = props.configurationValues["maxcharacters"];
                        const maxCharsValue = number_2.toNumber(maxCharsConfig);
                        if (maxCharsValue) {
                            attributes.maxLength = maxCharsValue;
                        }
                        const showCountDownConfig = props.configurationValues["showcountdown"];
                        const showCountDownValue = boolean_1.asBooleanOrNull(showCountDownConfig) || false;
                        if (showCountDownValue) {
                            attributes.showCountDown = showCountDownValue;
                        }
                        const rowsConfig = props.configurationValues["numberofrows"];
                        const rows = number_2.toNumber(rowsConfig || null) || 3;
                        if (rows > 0) {
                            attributes.rows = rows;
                        }
                        return attributes;
                    });
                    return {
                        internalValue,
                        configAttributes
                    };
                },
                template: `
<TextBox v-model="internalValue" v-bind="configAttributes" textMode="MultiLine" />
`
            }));
            exports_1("FilterComponent", FilterComponent = vue_1.defineComponent({
                name: "MemoField.Filter",
                components: {
                    TextBox: textBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<TextBox v-model="internalValue" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "MemoField.Configuration",
                components: {
                    CheckBox: checkBox_1.default,
                    NumberBox: numberBox_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const numberOfRows = vue_1.ref(null);
                    const allowHtml = vue_1.ref(false);
                    const maxCharacters = vue_1.ref(null);
                    const showCountdown = vue_1.ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                        const newValue = {};
                        newValue["numberofrows"] = (_b = (_a = numberOfRows.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                        newValue["allowhtml"] = (_c = boolean_1.asTrueFalseOrNull(allowHtml.value)) !== null && _c !== void 0 ? _c : "False";
                        newValue["maxcharacters"] = (_e = (_d = maxCharacters.value) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "";
                        newValue["showcountdown"] = (_f = boolean_1.asTrueFalseOrNull(showCountdown.value)) !== null && _f !== void 0 ? _f : "False";
                        const anyValueChanged = newValue["numberofrows"] !== ((_g = props.modelValue["numberofrows"]) !== null && _g !== void 0 ? _g : "")
                            || newValue["allowhtml"] !== ((_h = props.modelValue["allowhtml"]) !== null && _h !== void 0 ? _h : "False")
                            || newValue["maxcharacters"] !== ((_j = props.modelValue["maxcharacters"]) !== null && _j !== void 0 ? _j : "")
                            || newValue["showcountdown"] !== ((_k = props.modelValue["showcountdown"]) !== null && _k !== void 0 ? _k : "False");
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
                        numberOfRows.value = number_1.toNumberOrNull(props.modelValue["numberofrows"]);
                        allowHtml.value = boolean_1.asBoolean(props.modelValue["allowhtml"]);
                        maxCharacters.value = number_1.toNumberOrNull(props.modelValue["maxcharacters"]);
                        showCountdown.value = boolean_1.asBoolean(props.modelValue["showcountdown"]);
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(numberOfRows, val => { var _a; return maybeUpdateConfiguration("numberofrows", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : ""); });
                    vue_1.watch(allowHtml, val => { var _a; return maybeUpdateConfiguration("allowhtml", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : "False"); });
                    vue_1.watch(maxCharacters, val => { var _a; return maybeUpdateConfiguration("maxcharacters", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : ""); });
                    vue_1.watch(showCountdown, val => { var _a; return maybeUpdateConfiguration("showcountdown", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : "False"); });
                    return {
                        numberOfRows,
                        maxCharacters,
                        allowHtml,
                        showCountdown
                    };
                },
                template: `
<div>
    <NumberBox v-model="numberOfRows" label="Rows" help="The number of rows to display (default is 3)" />
    <CheckBox v-model="allowHtml" label="Allow HTML" text="Yes" help="Controls whether server should prevent HTML from being entered in this field or not" />
    <NumberBox v-model="maxCharacters" label="Max Characters" help="The maximum number of characters to allow. Leave this field empty to allow for an unlimited amount of text" />
    <CheckBox v-model="showCountdown" label="Show Character Limit Countdown" text="Yes" help="When set, displays a countdown showing how many characters remain (for the Max Characters setting)" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=memoFieldComponents.js.map