System.register(['vue', './utils.js', '@Obsidian/Controls/timePicker', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/stringUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, TimePicker, toNumber, padLeft;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            TimePicker = module["default"];
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            padLeft = module.padLeft;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "TimeField.Edit",
                components: {
                    TimePicker
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalTimeValue: {},
                        internalValue: ""
                    };
                },
                computed: {
                    displayValue() {
                        if (this.internalTimeValue.hour === undefined || this.internalTimeValue.minute === undefined) {
                            return "";
                        }
                        let hour = this.internalTimeValue.hour;
                        const minute = this.internalTimeValue.minute;
                        const meridiem = hour >= 12 ? "PM" : "AM";
                        if (hour > 12) {
                            hour -= 12;
                        }
                        return `${hour}:${padLeft(minute.toString(), 2, "0")} ${meridiem}`;
                    },
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    internalTimeValue() {
                        if (this.internalTimeValue.hour === undefined || this.internalTimeValue.minute === undefined) {
                            this.internalValue = "";
                        }
                        else {
                            this.internalValue = `${this.internalTimeValue.hour}:${padLeft(this.internalTimeValue.minute.toString(), 2, "0")}:00`;
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const values = /^(\d+):(\d+)/.exec((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (values !== null) {
                                this.internalTimeValue = {
                                    hour: toNumber(values[1]),
                                    minute: toNumber(values[2])
                                };
                            }
                            else {
                                this.internalTimeValue = {};
                            }
                        }
                    }
                },
                template: `
<TimePicker v-model="internalTimeValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "TimeField.Configuration",
                template: ``
            }));

        })
    };
}));
