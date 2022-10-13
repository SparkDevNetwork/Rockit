System.register(['vue', '@Obsidian/Utility/form', '@Obsidian/Utility/component', './rockValidation.js', './alert.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, reactive, watch, provideFormState, updateRefValue, RockValidation;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            reactive = module.reactive;
            watch = module.watch;
        }, function (module) {
            provideFormState = module.provideFormState;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            RockValidation = module["default"];
        }, function () {}],
        execute: (function () {

            var RockForm = exports('default', defineComponent({
                name: "RockForm",
                components: {
                    RockValidation
                },
                props: {
                    submit: {
                        type: Boolean,
                        default: false
                    },
                    hideErrors: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "submit": () => true,
                    "validationChanged": (_errors) => true,
                    "visibleValidationChanged": (_errors) => true,
                    "update:submit": (_value) => true
                },
                setup(props, { emit }) {
                    const visibleErrors = ref([]);
                    const errorValues = ref([]);
                    const errors = ref({});
                    const submit = ref(props.submit);
                    const onInternalSubmit = () => {
                        submit.value = true;
                    };
                    const formState = reactive({
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
                            updateRefValue(errors, newErrors);
                        }
                    });
                    provideFormState(formState);
                    watch(() => props.submit, () => {
                        if (submit.value !== props.submit) {
                            submit.value = props.submit;
                        }
                    });
                    watch(submit, () => {
                        if (submit.value) {
                            formState.submitCount++;
                            visibleErrors.value = errorValues.value;
                            emit("visibleValidationChanged", visibleErrors.value);
                            if (Object.keys(errors.value).length === 0) {
                                emit("submit");
                            }
                            submit.value = false;
                        }
                        emit("update:submit", submit.value);
                    });
                    watch(errors, () => {
                        const values = [];
                        for (const key in errors.value) {
                            values.push(errors.value[key]);
                        }
                        errorValues.value = values;
                        emit("validationChanged", errorValues.value);
                    });
                    return {
                        errors,
                        visibleErrors,
                        onInternalSubmit
                    };
                },
                template: `
<form @submit.prevent.stop="onInternalSubmit()">
    <RockValidation v-if="!hideErrors" :errors="visibleErrors" />
    <slot />
</form>
`
            }));

        })
    };
}));
