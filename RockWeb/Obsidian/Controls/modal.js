System.register(['vue', './rockForm.js', './rockButton.js', './rockValidation.js', '@Obsidian/Utility/page', '@Obsidian/Utility/form', '@Obsidian/Utility/component', './alert.js', 'tslib', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, RockForm, RockButton, RockValidation, trackModalState;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            RockValidation = module["default"];
        }, function (module) {
            trackModalState = module.trackModalState;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var modal = exports('default', defineComponent({
                name: "Modal",
                components: {
                    RockButton,
                    RockForm,
                    RockValidation
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    title: {
                        type: String,
                        default: ""
                    },
                    subtitle: {
                        type: String,
                        default: ""
                    },
                    cancelText: {
                        type: String,
                        default: "Cancel"
                    },
                    saveText: {
                        type: String,
                        default: ""
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    save: () => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalModalVisible = ref(props.modelValue);
                    const container = ref((_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.body);
                    const validationErrors = ref([]);
                    const isShaking = ref(false);
                    const onClose = () => {
                        emit("update:modelValue", false);
                    };
                    const onScrollableClick = () => {
                        if (!isShaking.value) {
                            isShaking.value = true;
                            setTimeout(() => isShaking.value = false, 1000);
                        }
                    };
                    const onSubmit = () => {
                        emit("save");
                    };
                    const onVisibleValidationChanged = (errors) => {
                        validationErrors.value = errors;
                    };
                    if (internalModalVisible.value) {
                        trackModalState(true);
                    }
                    watch(() => props.modelValue, () => {
                        if (props.modelValue) {
                            container.value = document.fullscreenElement || document.body;
                            validationErrors.value = [];
                        }
                        internalModalVisible.value = props.modelValue;
                        trackModalState(internalModalVisible.value);
                    });
                    return {
                        container,
                        internalModalVisible,
                        isShaking,
                        onClose,
                        onScrollableClick,
                        onSubmit,
                        onVisibleValidationChanged,
                        validationErrors
                    };
                },
                template: `
<teleport :to="container" v-if="modelValue">
    <div>
        <div @click.stop="onScrollableClick" class="modal-scrollable" style="z-index: 1060;">
            <div @click.stop
                class="modal container modal-content rock-modal rock-modal-frame modal-overflow"
                :class="{'animated shake': isShaking}"
                aria-hidden="false"
                tabindex="-1"
                role="dialog"
                style="display: block; margin-top: 0px;">
                <div class="modal-header">
                    <button @click="onClose" class="close" aria-hidden="true" type="button">&times;</button>
                    <template v-if="title">
                        <h3 class="modal-title">{{ title }}</h3>
                        <small v-if="subtitle">{{ subtitle }}</small>
                    </template>
                    <slot v-else name="header" />
                </div>

                <RockForm @submit="onSubmit" hideErrors @visibleValidationChanged="onVisibleValidationChanged">
                    <div class="modal-body">
                        <RockValidation :errors="validationErrors" />

                        <slot />
                    </div>

                    <div class="modal-footer">
                        <RockButton @click="onClose" btnType="link">{{ cancelText }}</RockButton>
                        <RockButton v-if="saveText" type="submit" btnType="primary">{{ saveText }}</RockButton>
                        <slot name="customButtons" />
                    </div>
                </RockForm>
            </div>
        </div>

        <div class="modal-backdrop" style="z-index: 1050;"></div>
    </div>
</teleport>
`
            }));

        })
    };
}));
