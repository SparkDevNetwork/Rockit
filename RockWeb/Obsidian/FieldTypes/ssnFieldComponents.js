System.register(['vue', './utils.js', '@Obsidian/Controls/socialSecurityNumberBox', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, getFieldEditorProps, SocialSecurityNumberBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            SocialSecurityNumberBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "SSNField.Edit",
                components: {
                    SocialSecurityNumberBox
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue);
                    watch(() => props.modelValue, () => { var _a; return internalValue.value = (_a = props.modelValue) !== null && _a !== void 0 ? _a : ""; });
                    watch(internalValue, () => emit("update:modelValue", internalValue.value));
                    return {
                        internalValue
                    };
                },
                template: `
<SocialSecurityNumberBox v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "SSNField.Configuration",
                template: ``
            }));

        })
    };
}));
