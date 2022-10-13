System.register(['tslib', 'vue'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, onMounted, onBeforeUnmount, watch;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            onMounted = module.onMounted;
            onBeforeUnmount = module.onBeforeUnmount;
            watch = module.watch;
        }],
        execute: (function () {

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
            var Fullscreen = exports('default', defineComponent({
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
                    const fullscreenMode = ref(0);
                    const containerElement = ref(null);
                    const teleportDisabled = ref(true);
                    const containerStyle = ref({});
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
                    const onFullscreenChange = (ev) => {
                        var _a, _b;
                        const fullscreenElement = (_b = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.mozFullScreenElement) !== null && _b !== void 0 ? _b : document.webkitFullscreenElement;
                        if (ev.target === containerElement.value && fullscreenMode.value !== 0 && !fullscreenElement) {
                            exitFullscreen();
                        }
                    };
                    onMounted(() => {
                        document.addEventListener("fullscreenchange", onFullscreenChange);
                        document.addEventListener("mozfullscreenchange", onFullscreenChange);
                        document.addEventListener("webkitfullscreenchange", onFullscreenChange);
                        if (props.modelValue) {
                            enterFullscreen();
                        }
                    });
                    onBeforeUnmount(() => {
                        if (fullscreenMode.value !== 0) {
                            try {
                                exitFullscreen();
                            }
                            catch (ex) {
                                console.warn(ex);
                            }
                        }
                        document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
                        document.removeEventListener("mozfullscreenchange", onFullscreenChange);
                        document.removeEventListener("fullscreenchange", onFullscreenChange);
                    });
                    watch(() => props.modelValue, () => {
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
                    watch(fullscreenMode, () => {
                        emit("update:modelValue", fullscreenMode.value !== 0);
                    });
                    return {
                        containerElement,
                        containerStyle,
                        teleportDisabled
                    };
                },
                template: `
<div ref="containerElement" :style="containerStyle">
    <slot />
</div>
`
            }));

        })
    };
}));
