System.register(["vue", "./utils", "../Util/component", "../Elements/urlLinkBox", "../Services/boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, component_1, urlLinkBox_1, boolean_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (urlLinkBox_1_1) {
                urlLinkBox_1 = urlLinkBox_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "UrlLinkField.Edit",
                components: {
                    UrlLinkBox: urlLinkBox_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const value = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const requiresTrailingSlash = vue_1.computed(() => { var _a; return (_a = boolean_1.asBooleanOrNull(props.configurationValues.ShouldRequireTrailingForwardSlash)) !== null && _a !== void 0 ? _a : false; });
                    return { value, requiresTrailingSlash };
                },
                template: `
<UrlLinkBox v-model="value" :requires-trailing-slash="requiresTrailingSlash" />
`
            }));
        }
    };
});
//# sourceMappingURL=urlLinkFieldComponents.js.map