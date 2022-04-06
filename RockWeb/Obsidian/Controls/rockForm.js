System.register(["vue", "../Util/form", "./rockValidation"], function (exports_1, context_1) {
    "use strict";
    var vue_1, form_1, rockValidation_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (form_1_1) {
                form_1 = form_1_1;
            },
            function (rockValidation_1_1) {
                rockValidation_1 = rockValidation_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "RockForm",
                components: {
                    RockValidation: rockValidation_1.default
                },
                props: {
                    submit: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "submit",
                    "validationChanged",
                    "update:submit"
                ],
                setup(props, { emit }) {
                    const errors = vue_1.ref({});
                    const submit = vue_1.ref(props.submit);
                    const onInternalSubmit = () => {
                        submit.value = true;
                    };
                    const formState = vue_1.reactive({
                        submitCount: 0,
                        setError: (id, name, error) => {
                            const newErrors = Object.assign({}, errors.value);
                            if (error) {
                                newErrors[id] = {
                                    name,
                                    text: error
                                };
                            }
                            else {
                                delete newErrors[id];
                            }
                            errors.value = newErrors;
                        }
                    });
                    const submitCount = vue_1.computed(() => formState.submitCount);
                    form_1.provideFormState(formState);
                    vue_1.watch(() => props.submit, () => {
                        if (submit.value !== props.submit) {
                            submit.value = props.submit;
                        }
                    });
                    vue_1.watch(submit, () => {
                        if (submit.value) {
                            formState.submitCount++;
                            if (Object.keys(errors.value).length === 0) {
                                emit("submit");
                            }
                            submit.value = false;
                        }
                        emit("update:submit", submit.value);
                    });
                    vue_1.watch(errors, () => {
                        emit("validationChanged", errors.value);
                    });
                    return {
                        onInternalSubmit,
                        submitCount,
                        errors
                    };
                },
                template: `
<form @submit.prevent.stop="onInternalSubmit()">
    <RockValidation :submitCount="submitCount" :errors="errors" />
    <slot />
</form>
`
            }));
        }
    };
});
//# sourceMappingURL=rockForm.js.map