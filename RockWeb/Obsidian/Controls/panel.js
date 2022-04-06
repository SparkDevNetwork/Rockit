System.register(["vue", "../Util/component", "../Elements/rockButton", "../Elements/fullscreen", "../Elements/transitionVerticalCollapse"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1, rockButton_1, fullscreen_1, transitionVerticalCollapse_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (fullscreen_1_1) {
                fullscreen_1 = fullscreen_1_1;
            },
            function (transitionVerticalCollapse_1_1) {
                transitionVerticalCollapse_1 = transitionVerticalCollapse_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Panel",
                components: {
                    Fullscreen: fullscreen_1.default,
                    RockButton: rockButton_1.default,
                    TransitionVerticalCollapse: transitionVerticalCollapse_1.default
                },
                inheritAttrs: false,
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    isDrawerOpen: {
                        type: Boolean,
                        default: false
                    },
                    isFullscreen: {
                        type: Boolean,
                        default: false
                    },
                    hasCollapse: {
                        type: Boolean,
                        default: false
                    },
                    hasFullscreen: {
                        type: Boolean,
                        default: false
                    },
                    isFullscreenPageOnly: {
                        type: Boolean,
                        default: true
                    },
                    type: {
                        type: String,
                        default: "default"
                    },
                    title: {
                        type: String,
                        default: ""
                    },
                    titleIconClass: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:isDrawerOpen",
                    "update:isFullscreen"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const isDrawerOpen = component_1.useVModelPassthrough(props, "isDrawerOpen", emit);
                    const isFullscreen = component_1.useVModelPassthrough(props, "isFullscreen", emit);
                    const panelElement = vue_1.ref(null);
                    const hasCollapseAction = vue_1.computed(() => props.hasCollapse && !isFullscreen.value);
                    const panelClass = vue_1.computed(() => {
                        const classes = ["panel", "panel-flex"];
                        classes.push(`panel-${props.type}`);
                        if (isFullscreen.value) {
                            classes.push("panel-fullscreen");
                        }
                        return classes;
                    });
                    const panelHeadingClass = vue_1.computed(() => {
                        const classes = ["panel-heading"];
                        if (props.hasCollapse) {
                            classes.push("clickable");
                        }
                        return classes;
                    });
                    const panelTabIndex = vue_1.computed(() => isFullscreen.value ? "0" : undefined);
                    const isPanelOpen = vue_1.computed(() => !props.hasCollapse || internalValue.value !== false || isFullscreen.value);
                    const onDrawerPullClick = () => {
                        isDrawerOpen.value = !isDrawerOpen.value;
                    };
                    const onPanelHeadingClick = () => {
                        if (props.hasCollapse) {
                            internalValue.value = !isPanelOpen.value;
                        }
                    };
                    const onPanelKeyDown = (ev) => {
                        if (isFullscreen.value && ev.keyCode === 27) {
                            ev.stopImmediatePropagation();
                            isFullscreen.value = false;
                        }
                    };
                    const onFullscreenClick = () => {
                        if (props.hasFullscreen) {
                            isFullscreen.value = !isFullscreen.value;
                        }
                    };
                    vue_1.watch(isFullscreen, () => {
                        if (isFullscreen.value) {
                            vue_1.nextTick(() => { var _a; return (_a = panelElement.value) === null || _a === void 0 ? void 0 : _a.focus(); });
                        }
                    });
                    return {
                        hasCollapseAction,
                        isDrawerOpen,
                        isFullscreen,
                        isPanelOpen,
                        onDrawerPullClick,
                        onFullscreenClick,
                        onPanelHeadingClick,
                        onPanelKeyDown,
                        panelClass,
                        panelElement,
                        panelHeadingClass,
                        panelTabIndex
                    };
                },
                template: `
<Fullscreen v-model="isFullscreen" :isPageOnly="isFullscreenPageOnly">
    <div :class="panelClass" ref="panelElement" v-bind="$attrs" :tabIndex="panelTabIndex" @keydown="onPanelKeyDown">
        <v-style>
            .panel.panel-flex {
                display: flex;
                flex-direction: column;
            }

            .panel.panel-flex > .panel-heading {
                display: flex;
                align-items: center;
                padding: 0;
                line-height: 1em;
                min-height: 48px;
            }

            .panel.panel-flex > .panel-heading > .panel-title {
                padding: 0px 24px;
                flex-grow: 1;
            }

            .panel.panel-flex > .panel-heading > .panel-aside {
                padding: 0px 24px 0px 0px;
            }

            .panel.panel-flex > .panel-heading > .panel-action {
                display: flex;
                border-left: 1px solid #ccc;
                align-self: stretch;
                align-items: center;
                width: 48px;
                justify-content: center;
                cursor: pointer;
            }

            .panel.panel-fullscreen {
                margin: 0px;
                position: absolute;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
            }

            .panel.panel-fullscreen,
            .panel.panel-fullscreen > .panel-heading {
                border-radius: 0px;
            }

            .panel.panel-flex .panel-flex-fill-body {
                margin: -24px;
            }

            .panel.panel-flex.panel-fullscreen > .panel-body {
                flex-grow: 1;
                position: relative;
                overflow-y: auto;
            }

            .page-fullscreen-capable .panel.panel-block.panel-flex {
                overflow-y: hidden;
            }

            .page-fullscreen-capable .panel.panel-flex.panel-block > .panel-body {
                position: relative;
            }

            .page-fullscreen-capable .panel.panel-flex.panel-block .panel-flex-fill-body,
            body.is-fullscreen .panel.panel-flex.panel-block .panel-flex-fill-body {
                position: absolute;
                left: 0px;
                top: 0px;
                right: 0px;
                bottom: 0px;
                margin: 0px;
            }
        </v-style>

        <div :class="panelHeadingClass" @click="onPanelHeadingClick">
            <h1 class="panel-title">
                <slot v-if="$slots.title" name="title" />
                <template v-else>
                    <i v-if="titleIconClass" :class="titleIconClass"></i>
                    {{ title }}
                </template>
            </h1>

            <div class="panel-aside">
                <slot name="titleAside" />

                <template v-if="hasCollapseAction">
                    <i v-if="isPanelOpen" class="fa fa-chevron-up fa-xs ml-2"></i>
                    <i v-else class="fa fa-chevron-down fa-xs ml-2"></i>
                </template>
            </div>

            <slot name="actionAside" />

            <span v-if="hasFullscreen" class="panel-action" @click.prevent.stop="onFullscreenClick">
                <i class="fa fa-expand"></i>
            </span>
        </div>

        <div v-if="$slots.drawer" class="panel-drawer rock-panel-drawer" :class="isDrawerOpen ? 'open' : ''">
            <TransitionVerticalCollapse>
                <div v-show="isDrawerOpen" class="drawer-content">
                    <slot name="drawer" />
                </div>
            </TransitionVerticalCollapse>

            <div class="drawer-pull" @click="onDrawerPullClick">
                <i :class="isDrawerOpen ? 'fa fa-chevron-up fa-xs' : 'fa fa-chevron-down fa-xs'"></i>
            </div>
        </div>

        <TransitionVerticalCollapse>
            <div v-show="isPanelOpen" class="panel-body">
                <slot />
            </div>
        </TransitionVerticalCollapse>
    </div>
</Fullscreen>
`
            }));
        }
    };
});
//# sourceMappingURL=panel.js.map