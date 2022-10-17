System.register(['vue', './utils.js', '@Obsidian/Controls/dropDownList', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, getFieldEditorProps, DropDownList, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "DayOfWeekField.Edit",
                components: {
                    DropDownList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const options = [
                        { text: "Sunday", value: 0..toString() },
                        { text: "Monday", value: 1..toString() },
                        { text: "Tuesday", value: 2..toString() },
                        { text: "Wednesday", value: 3..toString() },
                        { text: "Thursday", value: 4..toString() },
                        { text: "Friday", value: 5..toString() },
                        { text: "Saturday", value: 6..toString() }
                    ];
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<DropDownList v-model="internalValue" :items="options" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "DayOfWeekField.Filter",
                components: {
                    DropDownList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const options = [
                        { text: "Sunday", value: 0..toString() },
                        { text: "Monday", value: 1..toString() },
                        { text: "Tuesday", value: 2..toString() },
                        { text: "Wednesday", value: 3..toString() },
                        { text: "Thursday", value: 4..toString() },
                        { text: "Friday", value: 5..toString() },
                        { text: "Saturday", value: 6..toString() }
                    ];
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<DropDownList v-model="internalValue" :items="options" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "DayOfWeekField.Configuration",
                template: ``
            }));

        })
    };
}));
