System.register(["vue", "./utils", "../Services/boolean", "../Services/number", "../Util/rockDateTime", "../Elements/datePicker", "../Elements/datePartsPicker", "../Elements/dropDownList", "../Elements/textBox", "../Elements/numberBox", "../Elements/checkBox"], function (exports_1, context_1) {
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
    var vue_1, utils_1, boolean_1, number_1, number_2, rockDateTime_1, datePicker_1, datePartsPicker_1, dropDownList_1, textBox_1, numberBox_1, checkBox_1, EditComponent, defaults, ConfigurationComponent;
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
            function (number_1_1) {
                number_1 = number_1_1;
                number_2 = number_1_1;
            },
            function (rockDateTime_1_1) {
                rockDateTime_1 = rockDateTime_1_1;
            },
            function (datePicker_1_1) {
                datePicker_1 = datePicker_1_1;
            },
            function (datePartsPicker_1_1) {
                datePartsPicker_1 = datePartsPicker_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "DateField.Edit",
                components: {
                    DatePicker: datePicker_1.default,
                    DatePartsPicker: datePartsPicker_1.default
                },
                props: utils_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: "",
                        internalDateParts: datePartsPicker_1.getDefaultDatePartsPickerModel(),
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
                        return rockDateTime_1.RockDateTime.fromParts(this.internalDateParts.year, this.internalDateParts.month, this.internalDateParts.day) || null;
                    },
                    isDatePartsPicker() {
                        const config = this.configurationValues["datePickerControlType"];
                        return (config === null || config === void 0 ? void 0 : config.toLowerCase()) === "date parts picker";
                    },
                    configAttributes() {
                        const attributes = {};
                        const displayCurrentConfig = this.configurationValues["displayCurrentOption"];
                        const displayCurrent = boolean_1.asBoolean(displayCurrentConfig);
                        attributes.displayCurrentOption = displayCurrent;
                        attributes.isCurrentDateOffset = displayCurrent;
                        const futureYearConfig = this.configurationValues["futureYearCount"];
                        const futureYears = number_2.toNumber(futureYearConfig);
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
                            this.internalDateParts.year = number_2.toNumber(dateParts[1]);
                            this.internalDateParts.month = number_2.toNumber(dateParts[2]);
                            this.internalDateParts.day = number_2.toNumber(dateParts[3]);
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
                            const d2 = rockDateTime_1.RockDateTime.parseISO((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (d1 === null || d2 === null || !d1.isEqualTo(d2)) {
                                this.$emit("update:modelValue", d1 !== null ? d1.toISOString().split("T")[0] : "");
                            }
                        }
                    },
                    internalValue() {
                        var _a;
                        if (!this.isDatePartsPicker) {
                            const d1 = rockDateTime_1.RockDateTime.parseISO(this.internalValue);
                            const d2 = rockDateTime_1.RockDateTime.parseISO((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
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
            defaults = {
                ["format"]: "",
                ["displayDiff"]: "False",
                ["displayCurrentOption"]: "False",
                ["datePickerControlType"]: "Date Picker",
                ["futureYearCount"]: ""
            };
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "DateField.Configuration",
                components: {
                    TextBox: textBox_1.default,
                    CheckBox: checkBox_1.default,
                    DropDownList: dropDownList_1.default,
                    NumberBox: numberBox_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const format = vue_1.ref("");
                    const displayDiff = vue_1.ref(false);
                    const displayCurrentOption = vue_1.ref(false);
                    const pickerControlType = vue_1.ref("Date Picker");
                    const futureYears = vue_1.ref(null);
                    const pickerControlTypeOptions = [
                        { text: "Date Picker", value: "Date Picker" },
                        { text: "Date Parts Picker", value: "Date Parts Picker" }
                    ];
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        const newValue = {};
                        newValue["format"] = (_a = format.value) !== null && _a !== void 0 ? _a : defaults["format"];
                        newValue["displayDiff"] = (_b = boolean_1.asTrueFalseOrNull(displayDiff.value)) !== null && _b !== void 0 ? _b : defaults["displayDiff"];
                        newValue["displayCurrentOption"] = (_c = boolean_1.asTrueFalseOrNull(displayCurrentOption.value)) !== null && _c !== void 0 ? _c : defaults["displayCurrentOption"];
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
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a, _b;
                        format.value = (_a = props.modelValue["format"]) !== null && _a !== void 0 ? _a : "";
                        displayDiff.value = boolean_1.asBoolean(props.modelValue["displayDiff"]);
                        displayCurrentOption.value = boolean_1.asBoolean(props.modelValue["displayCurrentOption"]);
                        pickerControlType.value = (_b = props.modelValue["datePickerControlType"]) !== null && _b !== void 0 ? _b : "Date Picker";
                        futureYears.value = number_1.toNumberOrNull(props.modelValue["futureYearCount"]);
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(format, (val) => maybeUpdateConfiguration("format", val !== null && val !== void 0 ? val : defaults["format"]));
                    vue_1.watch(displayDiff, (val) => { var _a; return maybeUpdateConfiguration("displayDiff", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayDiff"]); });
                    vue_1.watch(displayCurrentOption, (val) => { var _a; return maybeUpdateConfiguration("displayCurrentOption", (_a = boolean_1.asTrueFalseOrNull(val)) !== null && _a !== void 0 ? _a : defaults["displayCurrentOption"]); });
                    vue_1.watch(pickerControlType, (val) => maybeUpdateConfiguration("datePickerControlType", val || defaults["datePickerControlType"]));
                    vue_1.watch(futureYears, (val) => { var _a; return maybeUpdateConfiguration("futureYearCount", (_a = val === null || val === void 0 ? void 0 : val.toString()) !== null && _a !== void 0 ? _a : defaults["futureYearCount"]); });
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
    <DropDownList v-model="pickerControlType" :options="pickerControlTypeOptions" :show-blank-item="false" label="Control Type" help="Select 'Date Picker' to use a Date Picker, or 'Date Parts Picker' to select Month, Day, and Year individually" />
    <CheckBox v-if="pickerControlType == 'Date Picker'" v-model="displayCurrentOption" label="Display Current Option" text="Yes" help="Include option to specify value as the current date" />
    <NumberBox v-else v-model="futureYears"  label="Future Years" help="The number of years  in the future to include in the year picker. Set to 0 to limit to current year. Leaving it blank will default to 50." />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=dateFieldComponents.js.map