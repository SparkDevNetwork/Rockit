System.register(['vue', './rockButton.js', '@Obsidian/Utility/page', 'tslib', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, nextTick, RockButton, trackModalState;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            nextTick = module.nextTick;
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            trackModalState = module.trackModalState;
        }, function () {}, function () {}],
        execute: (function () {

            var dialog = exports('default', defineComponent({
                name: "Dialog",
                components: {
                    RockButton
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
                    const doShake = ref(false);
                    const modalDiv = ref(null);
                    const hasHeader = computed(() => !!slots.header);
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
                        nextTick(() => {
                            if (!modalDiv.value) {
                                return;
                            }
                            const height = modalDiv.value.offsetHeight;
                            const margin = height / 2;
                            modalDiv.value.style.marginTop = `-${margin}px`;
                        });
                    };
                    if (props.modelValue) {
                        trackModalState(true);
                    }
                    watch(() => props.modelValue, () => {
                        trackModalState(props.modelValue);
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

        })
    };
}));
