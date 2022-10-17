System.register(['vue', './utils.js', '@Obsidian/Controls/emailBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, EmailBox, TextBox, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            EmailBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "EmailField.Edit",
                components: {
                    EmailBox
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ""
                    };
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || "";
                        }
                    }
                },
                template: `
<EmailBox v-model="internalValue" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "EmailField.Filter",
                components: {
                    TextBox
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<TextBox v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "EmailField.Configuration",
                template: ``
            }));

        })
    };
}));
