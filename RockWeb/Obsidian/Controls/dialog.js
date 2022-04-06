System.register(["vue", "../Elements/rockButton", "../Util/page"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockButton_1, page_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Dialog",
                components: {
                    RockButton: rockButton_1.default
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    dismissible: {
                        type: Boolean,
                        default: true
                    }
                },
                setup(props, { emit, slots }) {
                    const doShake = vue_1.ref(false);
                    const modalDiv = vue_1.ref(null);
                    const hasHeader = vue_1.computed(() => !!slots.header);
                    const close = () => {
                        emit("update:modelValue", false);
                    };
                    const shake = () => {
                        if (!doShake.value) {
                            doShake.value = true;
                            setTimeout(() => doShake.value = false, 1000);
                        }
                    };
                    const centerOnScreen = () => {
                        vue_1.nextTick(() => {
                            if (!modalDiv.value) {
                                return;
                            }
                            const height = modalDiv.value.offsetHeight;
                            const margin = height / 2;
                            modalDiv.value.style.marginTop = `-${margin}px`;
                        });
                    };
                    if (props.modelValue) {
                        page_1.trackModalState(true);
                    }
                    vue_1.watch(() => props.modelValue, () => {
                        page_1.trackModalState(props.modelValue);
                    });
                    return {
                        centerOnScreen,
                        close,
                        doShake,
                        hasHeader,
                        modalDiv,
                        shake
                    };
                },
                template: `
<teleport to="body" v-if="modelValue">
    <div>
        <div class="modal-backdrop fade in" style="z-index: 1060;"></div>

        <div @click="shake" class="modal-scrollable" style="z-index: 1060;">
            <div @click.stop ref="modalDiv" class="modal fade in" :class="{'animated shake': doShake}" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div v-if="hasHeader" class="modal-header">
                            <button v-if="dismissible" @click="close" type="button" class="close" style="margin-top: -10px;">×</button>
                            <slot name="header" />
                        </div>
                        <div class="modal-body">
                            <button v-if="!hasHeader && dismissible" @click="close" type="button" class="close" style="margin-top: -10px;">×</button>
                            <slot />
                        </div>
                        <div v-if="$slots.footer" class="modal-footer">
                            <slot name="footer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</teleport>
`
            }));
        }
    };
});
//# sourceMappingURL=dialog.js.map