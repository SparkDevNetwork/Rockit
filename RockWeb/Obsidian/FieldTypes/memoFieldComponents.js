System.register(['vue', './utils.js', '@Obsidian/Controls/textBox', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/checkBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, computed, ref, watch, getFieldEditorProps, getFieldConfigurationProps, TextBox, NumberBox, CheckBox, asBooleanOrNull, asBoolean, asTrueFalseOrNull, toNumber, toNumberOrNull, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            toNumber = module.toNumber;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "MemoField.Edit",
                components: {
                    TextBox
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const configAttributes = computed(() => {
                        const attributes = {};
                        const maxCharsConfig = props.configurationValues["maxcharacters"];
                        const maxCharsValue = toNumber(maxCharsConfig);
                        if (maxCharsValue) {
                            attributes.maxLength = maxCharsValue;
                        }
                        const showCountDownConfig = props.configurationValues["showcountdown"];
                        const showCountDownValue = asBooleanOrNull(showCountDownConfig) || false;
                        if (showCountDownValue) {
                            attributes.showCountDown = showCountDownValue;
                        }
                        const rowsConfig = props.configurationValues["numberofrows"];
                        const rows = toNumber(rowsConfig || null) || 3;
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
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "MemoField.Filter",
                components: {
                    TextBox
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<TextBox v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "MemoField.Configuration",
                components: {
                    CheckBox,
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const numberOfRows = ref(null);
                    const allowHtml = ref(false);
                    const maxCharacters = ref(null);
                    const showCountdown = ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                        const newValue = {};
                        newValue["numberofrows"] = (_b = (_a = numberOfRows.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                        newValue["allowhtml"] = (_c = asTrueFalseOrNull(allowHtml.value)) !== null && _c !== void 0 ? _c : "False";
                        newValue["maxcharacters"] = (_e = (_d = maxCharacters.value) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "";
                        newValue["showcountdown"] = (_f = asTrueFalseOrNull(showCountdown.value)) !== null && _f !== void 0 ? _f : "False";
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        numberOfRows.value = toNumberOrNull(props.modelValue["numberofrows"]);
                        allowHtml.value = asBoolean(props.modelValue["allowhtml"]);
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
                    watch(numberOfRows, val => { var _a; return maybeUpdateConfiguration("numberofrows", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : ""); });
                    watch(allowHtml, val => { var _a; return maybeUpdateConfiguration("allowhtml", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(maxCharacters, val => { var _a; return maybeUpdateConfiguration("maxcharacters", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : ""); });
                    watch(showCountdown, val => { var _a; return maybeUpdateConfiguration("showcountdown", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : "False"); });
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

        })
    };
}));
