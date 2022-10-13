System.register(['vue', './utils.js', '@Obsidian/Utility/component', '@Obsidian/Controls/urlLinkBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, computed, getFieldEditorProps, useVModelPassthrough, UrlLinkBox, asBooleanOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            UrlLinkBox = module["default"];
        }, function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "UrlLinkField.Edit",
                components: {
                    UrlLinkBox
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const value = useVModelPassthrough(props, "modelValue", emit);
                    const requiresTrailingSlash = computed(() => { var _a; return (_a = asBooleanOrNull(props.configurationValues.ShouldRequireTrailingForwardSlash)) !== null && _a !== void 0 ? _a : false; });
                    return { value, requiresTrailingSlash };
                },
                template: `
<UrlLinkBox v-model="value" :requires-trailing-slash="requiresTrailingSlash" />
`
            }));

        })
    };
}));
