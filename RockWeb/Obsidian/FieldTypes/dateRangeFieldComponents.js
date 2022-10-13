System.register(['vue', './utils.js', '@Obsidian/Controls/dateRangePicker', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, DateRangePicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            DateRangePicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DateRangeField.Edit",
                components: {
                    DateRangePicker
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: {}
                    };
                },
                setup() {
                    return {};
                },
                watch: {
                    internalValue() {
                        var _a, _b;
                        if (!this.internalValue.lowerValue && !this.internalValue.upperValue) {
                            this.$emit("update:modelValue", "");
                        }
                        else {
                            this.$emit("update:modelValue", `${(_a = this.internalValue.lowerValue) !== null && _a !== void 0 ? _a : ""},${(_b = this.internalValue.upperValue) !== null && _b !== void 0 ? _b : ""}`);
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const components = ((_a = this.modelValue) !== null && _a !== void 0 ? _a : "").split(",");
                            if (components.length === 2) {
                                this.internalValue = {
                                    lowerValue: components[0],
                                    upperValue: components[1]
                                };
                            }
                            else {
                                this.internalValue = {};
                            }
                        }
                    }
                },
                template: `
<DateRangePicker v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DateRangeField.Configuration",
                template: ``
            }));

        })
    };
}));
