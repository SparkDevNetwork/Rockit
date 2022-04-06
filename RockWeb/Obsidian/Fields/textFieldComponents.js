System.register(["vue", "./utils", "../Elements/textBox", "../Elements/checkBox", "../Elements/numberBox", "../Services/boolean", "../Services/number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, textBox_1, checkBox_1, numberBox_1, boolean_1, number_1, EditComponent, ConfigurationComponent;
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
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "TextField.Edit",
                components: {
                    TextBox: textBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = vue_1.ref("");
                    const configAttributes = vue_1.computed(() => {
                        const attributes = {};
                        const maxCharsConfig = props.configurationValues["maxcharacters"];
                        if (maxCharsConfig) {
                            const maxCharsValue = Number(maxCharsConfig);
                            if (maxCharsValue) {
                                attributes.maxLength = maxCharsValue;
                            }
                        }
                        const showCountDownConfig = props.configurationValues["showcountdown"];
                        if (showCountDownConfig && showCountDownConfig) {
                            const showCountDownValue = boolean_1.asBooleanOrNull(showCountDownConfig) || false;
                            if (showCountDownValue) {
                                attributes.showCountDown = showCountDownValue;
                            }
                        }
                        return attributes;
                    });
                    const textType = vue_1.computed(() => {
                        var _a;
                        const isPasswordConfig = props.configurationValues["ispassword"];
                        const isPassword = (_a = boolean_1.asBooleanOrNull(isPasswordConfig)) !== null && _a !== void 0 ? _a : false;
                        return isPassword ? "password" : "";
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                    }, {
                        immediate: true
                    });
                    vue_1.watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    return {
                        configAttributes,
                        internalValue,
                        textType
                    };
                },
                template: `
<TextBox v-model="internalValue" v-bind="configAttributes" :type="textType" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "TextField.Configuration",
                components: {
                    CheckBox: checkBox_1.default,
                    NumberBox: numberBox_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const passwordField = vue_1.ref(false);
                    const maxCharacters = vue_1.ref(null);
                    const showCountdown = vue_1.ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = {};
                        newValue["ispassword"] = (_a = boolean_1.asTrueFalseOrNull(passwordField.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["maxcharacters"] = (_c = (_b = maxCharacters.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
                        newValue["showcountdown"] = (_d = boolean_1.asTrueFalseOrNull(showCountdown.value)) !== null && _d !== void 0 ? _d : "False";
                        const anyValueChanged = newValue["ispassword"] !== ((_e = props.modelValue["ispassword"]) !== null && _e !== void 0 ? _e : "False")
                            || newValue["maxcharacters"] !== ((_f = props.modelValue["maxcharacters"]) !== null && _f !== void 0 ? _f : "")
                            || newValue["showcountdown"] !== ((_g = props.modelValue["showcountdown"]) !== null && _g !== void 0 ? _g : "False");
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
                        passwordField.value = boolean_1.asBoolean(props.modelValue["ispassword"]);
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
                    vue_1.watch(passwordField, () => { var _a; return maybeUpdateConfiguration("ispassword", (_a = boolean_1.asTrueFalseOrNull(passwordField.value)) !== null && _a !== void 0 ? _a : "False"); });
                    vue_1.watch(maxCharacters, () => { var _a, _b; return maybeUpdateConfiguration("maxcharacters", (_b = (_a = maxCharacters.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    vue_1.watch(showCountdown, () => { var _a; return maybeUpdateConfiguration("showcountdown", (_a = boolean_1.asTrueFalseOrNull(showCountdown.value)) !== null && _a !== void 0 ? _a : "False"); });
                    return {
                        maxCharacters,
                        passwordField,
                        showCountdown
                    };
                },
                template: `
<div>
    <CheckBox v-model="passwordField" label="Password Field" text="Yes" help="When set, edit field will be masked." />
    <NumberBox v-model="maxCharacters" label="Max Characters" help="The maximum number of characters to allow. Leave this field empty to allow for an unlimited amount of text." />
    <CheckBox v-model="showCountdown" label="Show Character Limit Countdown" text="Yes" help="When set, displays a countdown showing how many characters remain (for the Max Characters setting)." />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=textFieldComponents.js.map