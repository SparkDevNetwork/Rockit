System.register(['vue', './utils.js', '@Obsidian/Controls/checkBoxList', '@Obsidian/Utility/numberUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, CheckBoxList, toNumber;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            toNumber = module.toNumber;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DaysOfWeekField.Edit",
                components: {
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: [],
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
                        this.$emit("update:modelValue", this.internalValue.sort((a, b) => toNumber(a) - toNumber(b)).join(","));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const value = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                            this.internalValue = value !== "" ? value.split(",") : [];
                        }
                    }
                },
                template: `
<CheckBoxList v-model="internalValue" :items="options()" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DaysOfWeekField.Configuration",
                template: ``
            }));

        })
    };
}));
