System.register(['vue', './utils.js', '@Obsidian/Controls/addressControl', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, getFieldEditorProps, AddressControl;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            AddressControl = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "AddressField.Edit",
                components: {
                    AddressControl
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref({});
                    watch(() => props.modelValue, () => {
                        try {
                            internalValue.value = JSON.parse(props.modelValue || "{}");
                        }
                        catch (_a) {
                            internalValue.value = {};
                        }
                    }, { immediate: true });
                    watch(() => internalValue.value, () => {
                        emit("update:modelValue", JSON.stringify(internalValue.value));
                    }, { deep: true });
                    return {
                        internalValue
                    };
                },
                template: `
<AddressControl v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "AddressField.Configuration",
                template: ``
            }));

        })
    };
}));
