System.register(["vue", "./utils", "../Elements/dropDownList", "../Elements/textBox", "../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, dropDownList_1, textBox_1, component_1, EditComponent, FilterComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "DayOfWeekField.Edit",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: utils_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ""
                    };
                },
                methods: {
                    options() {
                        return [
                            { text: "Sunday", value: 0..toString() },
                            { text: "Monday", value: 1..toString() },
                            { text: "Tuesday", value: 2..toString() },
                            { text: "Wednesday", value: 3..toString() },
                            { text: "Thursday", value: 4..toString() },
                            { text: "Friday", value: 5..toString() },
                            { text: "Saturday", value: 6..toString() }
                        ];
                    },
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
<DropDownList v-model="internalValue" :options="options()" />
`
            }));
            exports_1("FilterComponent", FilterComponent = vue_1.defineComponent({
                name: "DayOfWeekField.Filter",
                components: {
                    TextBox: textBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<TextBox v-model="internalValue" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "DayOfWeekField.Configuration",
                template: ``
            }));
        }
    };
});
//# sourceMappingURL=dayOfWeekFieldComponents.js.map