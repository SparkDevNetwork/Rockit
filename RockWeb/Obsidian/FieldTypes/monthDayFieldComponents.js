System.register(['vue', './utils.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/datePartsPicker', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, toNumber, DatePartsPicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            DatePartsPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "MonthDayField.Edit",
                components: {
                    DatePartsPicker
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: {
                            year: 0,
                            month: 0,
                            day: 0
                        }
                    };
                },
                watch: {
                    internalValue() {
                        const value = this.internalValue.month !== 0 && this.internalValue.day !== 0
                            ? `${this.internalValue.month}/${this.internalValue.day}`
                            : "";
                        this.$emit("update:modelValue", value);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            const components = (this.modelValue || "").split("/");
                            if (components.length == 2) {
                                this.internalValue = {
                                    year: 0,
                                    month: toNumber(components[0]),
                                    day: toNumber(components[1])
                                };
                            }
                            else {
                                this.internalValue = {
                                    year: 0,
                                    month: 0,
                                    day: 0
                                };
                            }
                        }
                    }
                },
                template: `
<DatePartsPicker v-model="internalValue" :showYear="false" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "MonthDayField.Configuration",
                template: ``
            }));

        })
    };
}));
