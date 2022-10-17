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
                name: "IntegerField.Edit",
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
<NumberBox v-model="internalValue" rules="integer" :decimal-count="0" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "IntegerField.Configuration",
                template: ``
            }));

        })
    };
}));
