System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, vue_2;
    var __moduleName = context_1 && context_1.id;
    function requestWindowFullscreen(element) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (element.requestFullscreen) {
                    yield element.requestFullscreen();
                }
                else if (element.mozRequestFullscreen) {
                    yield element.mozRequestFullscreen();
                }
                else if (element.webkitRequestFullscreen) {
                    yield element.webkitRequestFullscreen();
                }
                else {
                    return false;
                }
                return true;
            }
            catch (ex) {
                return new Promise((_, reject) => reject(ex));
            }
        });
    }
    function exitWindowFullscreen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (document.exitFullscreen) {
                yield document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                yield document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        });
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_2.defineComponent({
                name: "Fullscreen",
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    isPageOnly: {
                        type: Boolean,
                        default: true
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const fullscreenMode = vue_2.ref(0);
                    const containerElement = vue_2.ref(null);
                    const teleportDisabled = vue_2.ref(true);
                    const containerStyle = vue_2.ref({});
                    const enterFullscreen = () => __awaiter(this, void 0, void 0, function* () {
                        const body = document.getElementsByTagName("body")[0];
                        body.classList.add("is-fullscreen");
                        if (body.style.overflowY === "") {
                            body.style.overflowY = "hidden";
                        }
                        if (props.isPageOnly) {
                            containerStyle.value = {
                                position: "fixed",
                                left: "0",
                                top: "0",
                                width: "100%",
                                height: "100%",
                                "overflow-y": "auto",
                                "z-index": "1060",
                                "background-color": "var(--body-background)"
                            };
                            teleportDisabled.value = false;
                            fullscreenMode.value = 1;
                        }
                        else {
                            if (containerElement.value) {
                                try {
                                    containerStyle.value = {
                                        "background-color": "var(--body-background)"
                                    };
                                    yield requestWindowFullscreen(containerElement.value);
                                    fullscreenMode.value = 2;
                                }
                                catch (ex) {
                                    console.warn(ex);
                                }
                            }
                        }
                    });
                    const exitFullscreen = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        const body = document.getElementsByTagName("body")[0];
                        if (body.style.overflowY === "hidden") {
                            body.style.overflowY = "";
                        }
                        body.classList.remove("is-fullscreen");
                        if (fullscreenMode.value === 1) {
                            containerStyle.value = {};
                            teleportDisabled.value = true;
                            fullscreenMode.value = 0;
                        }
                        else if (fullscreenMode.value === 2) {
                            try {
                                const fullscreenElement = (_b = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.mozFullScreenElement) !== null && _b !== void 0 ? _b : document.webkitFullscreenElement;
                                if (fullscreenElement) {
                                    yield exitWindowFullscreen();
                                }
                                containerStyle.value = {};
                                fullscreenMode.value = 0;
                            }
                            catch (ex) {
                                console.warn(ex);
                            }
                        }
                    });
                    const onFullscreenChange = () => {
                        var _a, _b;
                        const fullscreenElement = (_b = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.mozFullScreenElement) !== null && _b !== void 0 ? _b : document.webkitFullscreenElement;
                        if (fullscreenMode.value !== 0 && !fullscreenElement) {
                            exitFullscreen();
                        }
                    };
                    vue_2.onMounted(() => {
                        document.addEventListener("fullscreenchange", onFullscreenChange);
                        if (props.modelValue) {
                            enterFullscreen();
                        }
                    });
                    vue_1.onBeforeUnmount(() => {
                        if (fullscreenMode.value !== 0) {
                            try {
                                exitFullscreen();
                            }
                            catch (ex) {
                                console.warn(ex);
                            }
                        }
                        document.removeEventListener("fullscreenchange", onFullscreenChange);
                    });
                    vue_2.watch(() => props.modelValue, () => {
                        if (!props.modelValue && fullscreenMode.value === 0) {
                            return;
                        }
                        else if (props.modelValue && fullscreenMode.value !== 0) {
                            return;
                        }
                        if (props.modelValue) {
                            enterFullscreen();
                        }
                        else {
                            exitFullscreen();
                        }
                    });
                    vue_2.watch(fullscreenMode, () => {
                        emit("update:modelValue", fullscreenMode.value !== 0);
                    });
                    return {
                        containerElement,
                        containerStyle,
                        teleportDisabled
                    };
                },
                template: `
<teleport to="body" :disabled="teleportDisabled">
    <div ref="containerElement" :style="containerStyle">
        <slot />
    </div>
</teleport>
`
            }));
        }
    };
});
//# sourceMappingURL=fullscreen.js.map