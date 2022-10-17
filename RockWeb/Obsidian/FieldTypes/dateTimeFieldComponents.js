System.register(['tslib', 'vue', './utils.js', '@Obsidian/Utility/booleanUtils', '@Obsidian/Controls/slidingDateRangePicker', '@Obsidian/Controls/dateTimePicker', '@Obsidian/Controls/textBox', '@Obsidian/Controls/checkBox', '@Obsidian/Utility/slidingDateRange', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, asBoolean, asTrueFalseOrNull, SlidingDateRangePicker, DateTimePicker, TextBox, CheckBox, parseSlidingDateRangeString, slidingDateRangeToString, updateRefValue;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
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
            SlidingDateRangePicker = module["default"];
        }, function (module) {
            DateTimePicker = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            parseSlidingDateRangeString = module.parseSlidingDateRangeString;
            slidingDateRangeToString = module.slidingDateRangeToString;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DateTimeField.Edit",
                components: {
                    DateTimePicker
                },
                props: getFieldEditorProps(),
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
                        const displayCurrent = asBoolean(displayCurrentConfig);
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
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "DateField.Filter",
                components: {
                    EditComponent,
                    SlidingDateRangePicker
                },
                props: Object.assign(Object.assign({}, getFieldEditorProps()), { comparisonType: {
                        type: Number,
                        required: true
                    } }),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue);
                    const internalValueSegments = internalValue.value.split("\t");
                    const dateValue = ref(internalValueSegments[0]);
                    const rangeValue = ref(parseSlidingDateRangeString(internalValueSegments.length > 1 ? internalValueSegments[1] : ""));
                    const configurationValues = ref(Object.assign({}, props.configurationValues));
                    configurationValues.value["displayCurrentOption"] = "True";
                    const isComparisonTypeBetween = computed(() => props.comparisonType === 4096);
                    watch(() => props.configurationValues, () => {
                        configurationValues.value = Object.assign({}, props.configurationValues);
                        configurationValues.value["displayCurrentOption"] = "True";
                    });
                    watch(dateValue, () => {
                        if (props.comparisonType !== 4096) {
                            internalValue.value = `${dateValue.value}\t`;
                        }
                    });
                    watch(rangeValue, () => {
                        if (props.comparisonType === 4096) {
                            internalValue.value = `\t${rangeValue.value ? slidingDateRangeToString(rangeValue.value) : ""}`;
                        }
                    });
                    watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                        const segments = internalValue.value.split("\t");
                        dateValue.value = segments[0];
                        updateRefValue(rangeValue, parseSlidingDateRangeString(segments.length > 1 ? segments[1] : ""));
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    return {
                        configurationValues,
                        dateValue,
                        isComparisonTypeBetween,
                        rangeValue
                    };
                },
                template: `
<SlidingDateRangePicker v-if="isComparisonTypeBetween" v-model="rangeValue" />
<EditComponent v-else v-model="dateValue" :configurationValues="configurationValues" />
`
            }));
            const defaults = {
                ["format"]: "",
                ["displayDiff"]: "False",
                ["displayCurrentOption"]: "False",
            };
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DateTimeField.Configuration",
                components: {
                    TextBox,
                    CheckBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const format = ref("");
                    const displayAsElapsedTime = ref(false);
                    const displayCurrentOption = ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f;
                        const newValue = {};
                        newValue["format"] = (_a = format.value) !== null && _a !== void 0 ? _a : defaults["format"];
                        newValue["displayDiff"] = (_b = asTrueFalseOrNull(displayAsElapsedTime.value)) !== null && _b !== void 0 ? _b : defaults["displayDiff"];
                        newValue["displayCurrentOption"] = (_c = asTrueFalseOrNull(displayCurrentOption.value)) !== null && _c !== void 0 ? _c : defaults["displayCurrentOption"];
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a;
                        format.value = (_a = props.modelValue["format"]) !== null && _a !== void 0 ? _a : "";
                        displayAsElapsedTime.value = asBoolean(props.modelValue["displayDiff"]);
                        displayCurrentOption.value = asBoolean(props.modelValue["displayCurrentOption"]);
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(format, (val) => maybeUpdateConfiguration("format", val !== null && val !== void 0 ? val : defaults["format"]));
                    watch(displayAsElapsedTime, (val) => { var _a; return maybeUpdateConfiguration("displayDiff", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayDiff"]); });
                    watch(displayCurrentOption, (val) => { var _a; return maybeUpdateConfiguration("displayCurrentOption", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayCurrentOption"]); });
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

        })
    };
}));
