System.register(['@Obsidian/Utility/form', '@Obsidian/Utility/guid', 'vue'], (function (exports) {
    'use strict';
    var useFormState, newGuid, defineComponent, ref, watch, onBeforeUnmount;
    return {
        setters: [function (module) {
            useFormState = module.useFormState;
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
            onBeforeUnmount = module.onBeforeUnmount;
        }],
        execute: (function () {

            var rockFormFieldError = exports('default', defineComponent({
                name: "RockFormFieldError",
                props: {
                    label: {
                        type: String,
                        required: true
                    },
                    error: {
                        type: String,
                        required: false
                    }
                },
                setup(props) {
                    const formState = useFormState();
                    const uniqueId = `rock-error-${newGuid()}`;
                    const currentError = ref(props.error);
                    watch(() => props.error, () => {
                        currentError.value = props.error;
                        if (currentError.value) {
                            formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, props.label, currentError.value);
                        }
                        else {
                            formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, props.label, "");
                        }
                    }, {
                        immediate: true
                    });
                    onBeforeUnmount(() => {
                        currentError.value = "";
                        formState === null || formState === void 0 ? void 0 : formState.setError(uniqueId, props.label, "");
                    });
                    return {};
                },
                template: `
`
            }));

        })
    };
}));
