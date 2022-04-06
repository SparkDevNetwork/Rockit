System.register(["vue", "../../../../Controls/modal", "../../../../Controls/rockForm", "../../../../Elements/rockButton", "../../../../Elements/textBox", "../../../../Util/component", "./configurableZone"], function (exports_1, context_1) {
    "use strict";
    var vue_1, modal_1, rockForm_1, rockButton_1, textBox_1, component_1, configurableZone_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.FormContentModal",
                components: {
                    ConfigurableZone: configurableZone_1.default,
                    Modal: modal_1.default,
                    RockButton: rockButton_1.default,
                    RockForm: rockForm_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    isVisible: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "save",
                    "update:modelValue",
                    "update:isVisible"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const isVisible = component_1.useVModelPassthrough(props, "isVisible", emit);
                    const submitForm = vue_1.ref(false);
                    const contentTextBox = vue_1.ref(null);
                    const onStartSave = () => {
                        submitForm.value = true;
                    };
                    const onSubmitForm = () => {
                        emit("save");
                    };
                    vue_1.watch(isVisible, () => {
                        vue_1.nextTick(() => {
                            if (contentTextBox.value) {
                                const input = contentTextBox.value.querySelector("textarea");
                                input === null || input === void 0 ? void 0 : input.focus();
                            }
                        });
                    });
                    return {
                        contentTextBox,
                        internalValue,
                        isVisible,
                        onSubmitForm,
                        onStartSave,
                        submitForm,
                    };
                },
                template: `
<Modal v-model="isVisible">
    <RockForm v-model:submit="submitForm" @submit="onSubmitForm">
        <div ref="contentTextBox">
            <TextBox v-model="internalValue" label="Content" textMode="multiline" />
        </div>
    </RockForm>

    <template #customButtons>
        <RockButton btnType="primary" @click="onStartSave">Save</RockButton>
    </template>
</Modal>
`
            }));
        }
    };
});
//# sourceMappingURL=formContentModal.js.map