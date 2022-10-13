System.register(['vue', './utils.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/numberBox', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, toNumberOrNull, NumberBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            NumberBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DecimalField.Edit",
                components: {
                    NumberBox
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
<NumberBox v-model="internalValue" rules="decimal" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DecimalField.Configuration",
                template: ``
            }));

        })
    };
}));
