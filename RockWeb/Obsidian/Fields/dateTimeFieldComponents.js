System.register(["vue", "./utils", "../Services/boolean", "../Elements/dateTimePicker", "../Elements/textBox", "../Elements/checkBox"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, utils_1, boolean_1, dateTimePicker_1, textBox_1, checkBox_1, EditComponent, defaults, ConfigurationComponent;
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
            function (dateTimePicker_1_1) {
                dateTimePicker_1 = dateTimePicker_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "DateTimeField.Edit",
                components: {
                    DateTimePicker: dateTimePicker_1.default
                },
                props: utils_1.getFieldEditorProps(),
                setup() {
                    return {};
                },
                data() {
                    return {
                        internalValue: "",
                        formattedString: ""
                    };
                },
                methods: {
                    syncModelValue() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            this.internalValue = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                        });
                    },
                },
                computed: {
                    dateFormatTemplate() {
                        const formatConfig = this.configurationValues["format"];
                        return formatConfig || "MM/dd/yyyy";
                    },
                    configAttributes() {
                        const attributes = {};
                        const displayCurrentConfig = this.configurationValues["displayCurrentOption"];
                        const displayCurrent = boolean_1.asBoolean(displayCurrentConfig);
                        attributes.displayCurrentOption = displayCurrent;
                        attributes.isCurrentDateOffset = displayCurrent;
                        return attributes;
                    }
                },
                watch: {
                    internalValue() {
                        var _a;
                        if (this.internalValue !== this.modelValue) {
                            const d1 = Date.parse(this.internalValue);
                            const d2 = Date.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (isNaN(d1) || isNaN(d2) || d1 !== d2) {
                                this.$emit("update:modelValue", this.internalValue);
                            }
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield this.syncModelValue();
                            });
                        }
                    }
                },
                template: `
<DateTimePicker v-model="internalValue" v-bind="configAttributes" />
`
            }));
            defaults = {
                ["format"]: "",
                ["displayDiff"]: "False",
                ["displayCurrentOption"]: "False",
            };
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "DateTimeField.Configuration",
                components: {
                    TextBox: textBox_1.default,
                    CheckBox: checkBox_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const format = vue_1.ref("");
                    const displayAsElapsedTime = vue_1.ref(false);
                    const displayCurrentOption = vue_1.ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f;
                        const newValue = {};
                        newValue["format"] = (_a = format.value) !== null && _a !== void 0 ? _a : defaults["format"];
                        newValue["displayDiff"] = (_b = boolean_1.asTrueFalseOrNull(displayAsElapsedTime.value)) !== null && _b !== void 0 ? _b : defaults["displayDiff"];
                        newValue["displayCurrentOption"] = (_c = boolean_1.asTrueFalseOrNull(displayCurrentOption.value)) !== null && _c !== void 0 ? _c : defaults["displayCurrentOption"];
                        const anyValueChanged = newValue["format"] !== ((_d = props.modelValue["format"]) !== null && _d !== void 0 ? _d : defaults["format"])
                            || newValue["displayDiff"] !== ((_e = props.modelValue["displayDiff"]) !== null && _e !== void 0 ? _e : defaults["displayDiff"])
                            || newValue["displayCurrentOption"] !== ((_f = props.modelValue["displayCurrentOption"]) !== null && _f !== void 0 ? _f : defaults["displayCurrentOption"]);
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
                        var _a;
                        format.value = (_a = props.modelValue["format"]) !== null && _a !== void 0 ? _a : "";
                        displayAsElapsedTime.value = boolean_1.asBoolean(props.modelValue["displayDiff"]);
                        displayCurrentOption.value = boolean_1.asBoolean(props.modelValue["displayCurrentOption"]);
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(format, (val) => maybeUpdateConfiguration("format", val !== null && val !== void 0 ? val : defaults["format"]));
                    vue_1.watch(displayAsElapsedTime, (val) => { var _a; return maybeUpdateConfiguration("displayDiff", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayDiff"]); });
                    vue_1.watch(displayCurrentOption, (val) => { var _a; return maybeUpdateConfiguration("displayCurrentOption", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayCurrentOption"]); });
                    return {
                        format,
                        displayAsElapsedTime,
                        displayCurrentOption,
                    };
                },
                template: `
<div>
    <TextBox v-model="format" label="Date Time Format" help="The format string to use for date (default is system short date and time)" />
    <CheckBox v-model="displayAsElapsedTime" label="Display as Elapsed Time" text="Yes" help="Display value as an elapsed time" />
    <CheckBox v-model="displayCurrentOption" label="Display Current Option" text="Yes" help="Include option to specify value as the current time" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=dateTimeFieldComponents.js.map