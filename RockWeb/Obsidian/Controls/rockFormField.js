System.register(['@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', 'vue', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var standardRockFormFieldProps, useFormState, newGuid, normalizeRules, validateValue, defineComponent, ref, computed, watch, onBeforeUnmount, RockLabel;
    return {
        setters: [function (module) {
            standardRockFormFieldProps = module.standardRockFormFieldProps;
        }, function (module) {
            useFormState = module.useFormState;
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            normalizeRules = module.normalizeRules;
            validateValue = module.validateValue;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            onBeforeUnmount = module.onBeforeUnmount;
        }, function (module) {
            RockLabel = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var RockFormField = exports('default', defineComponent({
                name: "RockFormField",
                inheritAttrs: false,
                components: {
                    RockLabel
                },
                compilerOptions: {
                    whitespace: "preserve"
                },
                props: Object.assign({ modelValue: {
                        required: true
                    }, name: {
                        type: String,
                        required: true
                    } }, standardRockFormFieldProps),
                setup(props) {
                    const formState = useFormState();
                    const uniqueId = `rock-${props.name}-${newGuid()}`;
                    const internalValue = ref("");
                    const internalRules = computed(() => normalizeRules(props.rules));
                    const isRequired = computed(() => internalRules.value.includes("required"));
                    const currentError = ref("");
                    const errorClasses = computed(() => {
                        if (!formState || formState.submitCount < 1) {
                            return [];
                        }
                        return currentError.value !== "" ? ["has-error"] : [];
                    });
                    const fieldLabel = computed(() => {
                        return props.validationTitle || props.label;
                    });
                    watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                        const errors = validateValue(internalValue.value, props.rules);
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
                    onBeforeUnmount(() => {
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
<div v-if="label || help" class="form-group" :class="[classAttr, formGroupClasses, isRequired ? 'required' : '', errorClasses]">
    <RockLabel :for="uniqueId" :help="help">
        {{label}}
    </RockLabel>
    <slot v-bind="{field: $attrs, uniqueId, errors, fieldLabel}" />
</div>
<slot v-else v-bind="{field: $attrs, uniqueId, errors, fieldLabel}" />
<slot name="post" />
`
            }));

        })
    };
}));
