System.register(['vue', './utils.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/numberRangeBox', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, toNumberOrNull, NumberRangeBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            NumberRangeBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "IntegerRangeField.Edit",
                components: {
                    NumberRangeBox
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: {}
                    };
                },
                watch: {
                    internalValue() {
                        var _a, _b;
                        const value = `${(_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : ""},${(_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : ""}`;
                        this.$emit("update:modelValue", value !== "," ? value : "");
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const values = ((_a = this.modelValue) !== null && _a !== void 0 ? _a : "").split(",");
                            const lower = toNumberOrNull(values[0]);
                            const upper = values.length >= 2 ? toNumberOrNull(values[1]) : null;
                            if (lower !== this.internalValue.lower || upper !== this.internalValue.upper) {
                                this.internalValue = {
                                    lower: lower,
                                    upper: upper
                                };
                            }
                        }
                    }
                },
                template: `
<NumberRangeBox v-model="internalValue" :decimal-count="0" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "IntegerRangeField.Configuration",
                template: ``
            }));

        })
    };
}));
