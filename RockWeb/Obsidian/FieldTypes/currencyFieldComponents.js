System.register(['vue', './utils.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/currencyBox', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, toNumberOrNull, CurrencyBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            CurrencyBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "CurrencyField.Edit",
                components: {
                    CurrencyBox
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: null
                    };
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue !== null ? this.internalValue.toString() : "");
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = toNumberOrNull(this.modelValue || "");
                        }
                    }
                },
                template: `
<CurrencyBox v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "CurrencyField.Configuration",
                template: ``
            }));

        })
    };
}));
