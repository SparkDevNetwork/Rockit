System.register(["vue", "../Util/guid", "./rockLabel", "../Util/form", "../Rules/index"], function (exports_1, context_1) {
    "use strict";
    var vue_1, guid_1, rockLabel_1, form_1, index_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (rockLabel_1_1) {
                rockLabel_1 = rockLabel_1_1;
            },
            function (form_1_1) {
                form_1 = form_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "RockFormField",
                inheritAttrs: false,
                components: {
                    RockLabel: rockLabel_1.default
                },
                compilerOptions: {
                    whitespace: "preserve"
                },
                props: {
                    modelValue: {
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    label: {
                        type: String,
                        default: ""
                    },
                    help: {
                        type: String,
                        default: ""
                    },
                    rules: index_1.rulesPropType,
                    formGroupClasses: {
                        type: String,
                        default: ""
                    },
                    validationTitle: {
                        type: String,
                        default: ""
                    },
                },
                setup(props) {
                    const formState = form_1.useFormState();
                    const uniqueId = `rock-${props.name}-${guid_1.newGuid()}`;
                    const internalValue = vue_1.ref("");
                    const internalRules = vue_1.computed(() => index_1.normalizeRules(props.rules));
                    const isRequired = vue_1.computed(() => internalRules.value.includes("required"));
                    const currentError = vue_1.ref("");
                    const errorClasses = vue_1.computed(() => {
                        if (!formState || formState.submitCount < 1) {
                            return [];
                        }
                        return currentError.value !== "" ? ["has-error"] : [];
                    });
                    const fieldLabel = vue_1.computed(() => {
                        return props.validationTitle || props.label;
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                        const errors = index_1.validateValue(internalValue.value, props.rules);
                        if (errors.length > 0) {
                            currentError.value = errors[0];
                            formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, fieldLabel.value, currentError.value);
                        }
                        else {
                            currentError.value = "";
                            formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, fieldLabel.value, "");
                        }
                    }, {
                        immediate: true
                    });
                    vue_1.onBeforeUnmount(() => {
                        currentError.value = "";
                        formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, fieldLabel.value, "");
                    });
                    return {
                        errorClasses,
                        fieldLabel,
                        formState,
                        isRequired,
                        uniqueId,
                    };
                },
                template: `
<slot name="pre" />
<div class="form-group" :class="[classAttr, formGroupClasses, isRequired ? 'required' : '', errorClasses]">
    <RockLabel v-if="label || help" :for="uniqueId" :help="help">
        {{label}}
    </RockLabel>
    <slot v-bind="{field: $attrs, uniqueId, errors, fieldLabel}" />
</div>
<slot name="post" />
`
            }));
        }
    };
});
//# sourceMappingURL=rockFormField.js.map