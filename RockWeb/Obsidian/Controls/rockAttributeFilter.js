System.register(['vue', '@Obsidian/Utility/fieldTypes', '@Obsidian/Utility/component'], (function (exports) {
    'use strict';
    var defineComponent, computed, getFieldType, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            getFieldType = module.getFieldType;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }],
        execute: (function () {

            var RockAttributeFilter = exports('default', defineComponent({
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
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const field = computed(() => {
                        var _a;
                        return getFieldType((_a = props.attribute.fieldTypeGuid) !== null && _a !== void 0 ? _a : "");
                    });
                    const filterComponent = computed(() => { var _a; return (_a = field.value) === null || _a === void 0 ? void 0 : _a.getFilterComponent(); });
                    const configurationValues = computed(() => { var _a; return (_a = props.attribute.configurationValues) !== null && _a !== void 0 ? _a : {}; });
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

        })
    };
}));
