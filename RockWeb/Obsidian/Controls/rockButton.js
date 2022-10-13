System.register(['tslib', 'vue', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, isPromise;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
        }, function (module) {
            isPromise = module.isPromise;
        }],
        execute: (function () {

            var BtnType; exports('BtnType', BtnType);
            (function (BtnType) {
                BtnType["Default"] = "default";
                BtnType["Primary"] = "primary";
                BtnType["Danger"] = "danger";
                BtnType["Warning"] = "warning";
                BtnType["Success"] = "success";
                BtnType["Info"] = "info";
                BtnType["Link"] = "link";
            })(BtnType || (exports('BtnType', BtnType = {})));
            var BtnSize; exports('BtnSize', BtnSize);
            (function (BtnSize) {
                BtnSize["Default"] = "";
                BtnSize["ExtraSmall"] = "xs";
                BtnSize["Small"] = "sm";
                BtnSize["Large"] = "lg";
            })(BtnSize || (exports('BtnSize', BtnSize = {})));
            var RockButton = exports('default', defineComponent({
                name: "RockButton",
                props: {
                    isLoading: {
                        type: Boolean,
                        default: false
                    },
                    loadingText: {
                        type: String,
                        default: "Loading..."
                    },
                    type: {
                        type: String,
                        default: "button"
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    },
                    btnType: {
                        type: String,
                        default: BtnType.Default
                    },
                    btnSize: {
                        type: String,
                        default: BtnSize.Default
                    },
                    autoLoading: {
                        type: Boolean,
                        default: false
                    },
                    autoDisable: {
                        type: Boolean,
                        default: false
                    },
                    onClick: {
                        type: Function,
                        required: false
                    }
                },
                emits: [],
                setup(props) {
                    const isProcessing = ref(false);
                    const isButtonDisabled = computed(() => {
                        return props.disabled || (props.autoDisable && isProcessing.value) || props.isLoading;
                    });
                    const isButtonLoading = computed(() => {
                        return props.isLoading || (props.autoLoading && isProcessing.value);
                    });
                    const typeClass = computed(() => {
                        return `btn-${props.btnType}`;
                    });
                    const sizeClass = computed(() => {
                        if (!props.btnSize) {
                            return "";
                        }
                        return `btn-${props.btnSize}`;
                    });
                    const cssClass = computed(() => {
                        return `btn ${typeClass.value} ${sizeClass.value}`;
                    });
                    const onButtonClick = (event) => __awaiter(this, void 0, void 0, function* () {
                        if (isButtonDisabled.value || isButtonLoading.value) {
                            return;
                        }
                        isProcessing.value = true;
                        try {
                            const clickHandler = props.onClick;
                            if (clickHandler) {
                                const result = clickHandler(event);
                                if (isPromise(result)) {
                                    yield result;
                                }
                            }
                        }
                        finally {
                            isProcessing.value = false;
                        }
                    });
                    return {
                        cssClass,
                        isButtonDisabled,
                        isButtonLoading,
                        onButtonClick
                    };
                },
                template: `
<button :class="cssClass" :disabled="isButtonDisabled" @click="onButtonClick" :type="type">
    <template v-if="isButtonLoading">
        {{loadingText}}
    </template>
    <slot v-else />
</button>`
            }));

        })
    };
}));
