System.register(['vue', './utils.js', '@Obsidian/Controls/textBox', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/numberBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/numberUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, TextBox, CheckBox, NumberBox, asBooleanOrNull, asBoolean, asTrueFalseOrNull, toNumberOrNull;
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
            TextBox = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "TextField.Edit",
                components: {
                    TextBox
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref("");
                    const configAttributes = computed(() => {
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
                            const showCountDownValue = asBooleanOrNull(showCountDownConfig) || false;
                            if (showCountDownValue) {
                                attributes.showCountDown = showCountDownValue;
                            }
                        }
                        return attributes;
                    });
                    const textType = computed(() => {
                        var _a;
                        const isPasswordConfig = props.configurationValues["ispassword"];
                        const isPassword = (_a = asBooleanOrNull(isPasswordConfig)) !== null && _a !== void 0 ? _a : false;
                        return isPassword ? "password" : "";
                    });
                    watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                    }, {
                        immediate: true
                    });
                    watch(internalValue, () => {
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
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "TextField.Configuration",
                components: {
                    CheckBox,
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const passwordField = ref(false);
                    const maxCharacters = ref(null);
                    const showCountdown = ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = {};
                        newValue["ispassword"] = (_a = asTrueFalseOrNull(passwordField.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["maxcharacters"] = (_c = (_b = maxCharacters.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
                        newValue["showcountdown"] = (_d = asTrueFalseOrNull(showCountdown.value)) !== null && _d !== void 0 ? _d : "False";
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        passwordField.value = asBoolean(props.modelValue["ispassword"]);
                        maxCharacters.value = toNumberOrNull(props.modelValue["maxcharacters"]);
                        showCountdown.value = asBoolean(props.modelValue["showcountdown"]);
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(passwordField, () => { var _a; return maybeUpdateConfiguration("ispassword", (_a = asTrueFalseOrNull(passwordField.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(maxCharacters, () => { var _a, _b; return maybeUpdateConfiguration("maxcharacters", (_b = (_a = maxCharacters.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    watch(showCountdown, () => { var _a; return maybeUpdateConfiguration("showcountdown", (_a = asTrueFalseOrNull(showCountdown.value)) !== null && _a !== void 0 ? _a : "False"); });
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

        })
    };
}));
