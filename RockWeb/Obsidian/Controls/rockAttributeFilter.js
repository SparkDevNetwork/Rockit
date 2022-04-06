System.register(["vue", "../Fields/index", "../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, index_1, component_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "RockAttributeFilter",
                props: {
                    modelValue: {
                        type: Object,
                        default: { value: "" }
                    },
                    attribute: {
                        type: Object,
                        required: true
                    },
                    required: {
                        type: Boolean,
                        default: false
                    },
                    filterMode: {
                        type: Number,
                        default: 0
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const field = vue_1.computed(() => {
                        return index_1.getFieldType(props.attribute.fieldTypeGuid);
                    });
                    const filterComponent = vue_1.computed(() => { var _a; return (_a = field.value) === null || _a === void 0 ? void 0 : _a.getFilterComponent(); });
                    const configurationValues = vue_1.computed(() => { var _a; return (_a = props.attribute.configurationValues) !== null && _a !== void 0 ? _a : {}; });
                    return {
                        configurationValues,
                        filterComponent,
                        internalValue
                    };
                },
                template: `
<component :is="filterComponent"
    v-model="internalValue"
    :configurationValues="configurationValues"
    :required="required"
    :filterMode="filterMode" />
`
            }));
        }
    };
});
//# sourceMappingURL=rockAttributeFilter.js.map