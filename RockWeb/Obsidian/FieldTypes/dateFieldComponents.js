System.register(['tslib', 'vue', './utils.js', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/rockDateTime', '@Obsidian/Controls/slidingDateRangePicker', '@Obsidian/Controls/datePicker', '@Obsidian/Controls/datePartsPicker', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/textBox', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/checkBox', '@Obsidian/Utility/slidingDateRange', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, asBoolean, asTrueFalseOrNull, toNumber, toNumberOrNull, RockDateTime, SlidingDateRangePicker, DatePicker, DatePartsPicker, getDefaultDatePartsPickerModel, DropDownList, TextBox, NumberBox, CheckBox, parseSlidingDateRangeString, slidingDateRangeToString, updateRefValue;
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
            toNumber = module.toNumber;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function (module) {
            SlidingDateRangePicker = module["default"];
        }, function (module) {
            DatePicker = module["default"];
        }, function (module) {
            DatePartsPicker = module["default"];
            getDefaultDatePartsPickerModel = module.getDefaultDatePartsPickerModel;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            parseSlidingDateRangeString = module.parseSlidingDateRangeString;
            slidingDateRangeToString = module.slidingDateRangeToString;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DateField.Edit",
                components: {
                    DatePicker,
                    DatePartsPicker
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: "",
                        internalDateParts: getDefaultDatePartsPickerModel(),
                        formattedString: ""
                    };
                },
                setup() {
                    return {};
                },
                computed: {
                    datePartsAsDate() {
                        var _a;
                        if (!((_a = this.internalDateParts) === null || _a === void 0 ? void 0 : _a.day) || !this.internalDateParts.month || !this.internalDateParts.year) {
                            return null;
                        }
                        return RockDateTime.fromParts(this.internalDateParts.year, this.internalDateParts.month, this.internalDateParts.day) || null;
                    },
                    isDatePartsPicker() {
                        const config = this.configurationValues["datePickerControlType"];
                        return (config === null || config === void 0 ? void 0 : config.toLowerCase()) === "date parts picker";
                    },
                    configAttributes() {
                        const attributes = {};
                        const displayCurrentConfig = this.configurationValues["displayCurrentOption"];
                        const displayCurrent = asBoolean(displayCurrentConfig);
                        attributes.displayCurrentOption = displayCurrent;
                        attributes.isCurrentDateOffset = displayCurrent;
                        const futureYearConfig = this.configurationValues["futureYearCount"];
                        const futureYears = toNumber(futureYearConfig);
                        if (futureYears > 0) {
                            attributes.futureYearCount = futureYears;
                        }
                        return attributes;
                    }
                },
                methods: {
                    syncModelValue() {
                        var _a, _b;
                        this.internalValue = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                        const dateParts = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec((_b = this.modelValue) !== null && _b !== void 0 ? _b : "");
                        if (dateParts != null) {
                            this.internalDateParts.year = toNumber(dateParts[1]);
                            this.internalDateParts.month = toNumber(dateParts[2]);
                            this.internalDateParts.day = toNumber(dateParts[3]);
                        }
                        else {
                            this.internalDateParts.year = 0;
                            this.internalDateParts.month = 0;
                            this.internalDateParts.day = 0;
                        }
                    }
                },
                watch: {
                    datePartsAsDate() {
                        var _a;
                        if (this.isDatePartsPicker) {
                            const d1 = this.datePartsAsDate;
                            const d2 = RockDateTime.parseISO((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (d1 === null || d2 === null || !d1.isEqualTo(d2)) {
                                this.$emit("update:modelValue", d1 !== null ? d1.toISOString().split("T")[0] : "");
                            }
                        }
                    },
                    internalValue() {
                        var _a;
                        if (!this.isDatePartsPicker) {
                            const d1 = RockDateTime.parseISO(this.internalValue);
                            const d2 = RockDateTime.parseISO((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (d1 === null || d2 === null || !d1.isEqualTo(d2)) {
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
<DatePartsPicker v-if="isDatePartsPicker" v-model="internalDateParts" v-bind="configAttributes" />
<DatePicker v-else v-model="internalValue" v-bind="configAttributes" />
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
                ["datePickerControlType"]: "Date Picker",
                ["futureYearCount"]: ""
            };
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DateField.Configuration",
                components: {
                    TextBox,
                    CheckBox,
                    DropDownList,
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const format = ref("");
                    const displayDiff = ref(false);
                    const displayCurrentOption = ref(false);
                    const pickerControlType = ref("Date Picker");
                    const futureYears = ref(null);
                    const pickerControlTypeOptions = [
                        { text: "Date Picker", value: "Date Picker" },
                        { text: "Date Parts Picker", value: "Date Parts Picker" }
                    ];
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        const newValue = {};
                        newValue["format"] = (_a = format.value) !== null && _a !== void 0 ? _a : defaults["format"];
                        newValue["displayDiff"] = (_b = asTrueFalseOrNull(displayDiff.value)) !== null && _b !== void 0 ? _b : defaults["displayDiff"];
                        newValue["displayCurrentOption"] = (_c = asTrueFalseOrNull(displayCurrentOption.value)) !== null && _c !== void 0 ? _c : defaults["displayCurrentOption"];
                        newValue["datePickerControlType"] = (_d = pickerControlType.value) !== null && _d !== void 0 ? _d : defaults["datePickerControlType"];
                        newValue["futureYearCount"] = (_f = (_e = futureYears.value) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : defaults["futureYearCount"];
                        const anyValueChanged = newValue["format"] !== ((_g = props.modelValue["format"]) !== null && _g !== void 0 ? _g : defaults["format"])
                            || newValue["displayDiff"] !== ((_h = props.modelValue["displayDiff"]) !== null && _h !== void 0 ? _h : defaults["displayDiff"])
                            || newValue["displayCurrentOption"] !== ((_j = props.modelValue["displayCurrentOption"]) !== null && _j !== void 0 ? _j : defaults["displayCurrentOption"])
                            || newValue["datePickerControlType"] !== ((_k = props.modelValue["datePickerControlType"]) !== null && _k !== void 0 ? _k : defaults["datePickerControlType"])
                            || newValue["futureYearCount"] !== ((_l = props.modelValue["futureYearCount"]) !== null && _l !== void 0 ? _l : defaults["futureYearCount"]);
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
                        format.value = (_a = props.modelValue["format"]) !== null && _a !== void 0 ? _a : "";
                        displayDiff.value = asBoolean(props.modelValue["displayDiff"]);
                        displayCurrentOption.value = asBoolean(props.modelValue["displayCurrentOption"]);
                        pickerControlType.value = (_b = props.modelValue["datePickerControlType"]) !== null && _b !== void 0 ? _b : "Date Picker";
                        futureYears.value = toNumberOrNull(props.modelValue["futureYearCount"]);
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(format, (val) => maybeUpdateConfiguration("format", val !== null && val !== void 0 ? val : defaults["format"]));
                    watch(displayDiff, (val) => { var _a; return maybeUpdateConfiguration("displayDiff", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayDiff"]); });
                    watch(displayCurrentOption, (val) => { var _a; return maybeUpdateConfiguration("displayCurrentOption", (_a = asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayCurrentOption"]); });
                    watch(pickerControlType, (val) => maybeUpdateConfiguration("datePickerControlType", val || defaults["datePickerControlType"]));
                    watch(futureYears, (val) => { var _a; return maybeUpdateConfiguration("futureYearCount", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : defaults["futureYearCount"]); });
                    return {
                        format,
                        displayDiff,
                        displayCurrentOption,
                        pickerControlType,
                        futureYears,
                        pickerControlTypeOptions
                    };
                },
                template: `
<div>
    <TextBox v-model="format" label="Date Format" help="The format string to use for date (default is system short date)" />
    <CheckBox v-model="displayDiff" label="Display as Elapsed Time" text="Yes" help="Display value as an elapsed time" />
    <DropDownList v-model="pickerControlType" :items="pickerControlTypeOptions" :show-blank-item="false" label="Control Type" help="Select 'Date Picker' to use a Date Picker, or 'Date Parts Picker' to select Month, Day, and Year individually" />
    <CheckBox v-if="pickerControlType == 'Date Picker'" v-model="displayCurrentOption" label="Display Current Option" text="Yes" help="Include option to specify value as the current date" />
    <NumberBox v-else v-model="futureYears"  label="Future Years" help="The number of years  in the future to include in the year picker. Set to 0 to limit to current year. Leaving it blank will default to 50." />
</div>
`
            }));

        })
    };
}));
