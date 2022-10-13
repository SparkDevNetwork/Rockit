System.register(['vue', '@Obsidian/Utility/component', './rockButton.js', './fullscreen.js', './transitionVerticalCollapse.js', 'tslib', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, nextTick, useVModelPassthrough, RockButton, Fullscreen, TransitionVerticalCollapse;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            nextTick = module.nextTick;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            Fullscreen = module["default"];
        }, function (module) {
            TransitionVerticalCollapse = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var Panel = exports('default', defineComponent({
                name: "Panel",
                components: {
                    Fullscreen,
                    RockButton,
                    TransitionVerticalCollapse
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
                        default: false
                    },
                    type: {
                        type: String,
                        default: "default"
                    },
                    title: {
                        type: String,
                        default: ""
                    },
                    titleIconCssClass: {
                        type: String,
                        default: ""
                    },
                    headerSecondaryActions: {
                        type: Array,
                        required: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:isDrawerOpen",
                    "update:isFullscreen"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const isDrawerOpen = useVModelPassthrough(props, "isDrawerOpen", emit);
                    const isFullscreen = useVModelPassthrough(props, "isFullscreen", emit);
                    const panelElement = ref(null);
                    const hasCollapseAction = computed(() => props.hasCollapse && !isFullscreen.value);
                    const hasHeaderSecondaryActions = computed(() => !!props.headerSecondaryActions && props.headerSecondaryActions.length > 0);
                    const isHelpOpen = ref(false);
                    const headerSecondaryActionMenu = ref(null);
                    const panelClass = computed(() => {
                        const classes = ["panel", "panel-flex"];
                        classes.push(`panel-${props.type}`);
                        if (isFullscreen.value) {
                            classes.push("panel-fullscreen");
                        }
                        return classes;
                    });
                    const panelHeadingClass = computed(() => {
                        const classes = ["panel-heading"];
                        if (props.hasCollapse) {
                            classes.push("cursor-pointer");
                        }
                        return classes;
                    });
                    const panelTabIndex = computed(() => isFullscreen.value ? "0" : undefined);
                    const isPanelOpen = computed(() => !props.hasCollapse || internalValue.value !== false || isFullscreen.value);
                    const getHeaderSecondaryActionIconClass = (action) => {
                        if (action.iconCssClass) {
                            let iconClass = action.iconCssClass;
                            if (action.type !== "default" && action.type !== "link") {
                                iconClass += ` text-${action.type}`;
                            }
                            return iconClass;
                        }
                        else {
                            return "";
                        }
                    };
                    const getHeaderSecondaryActionItemClass = (action) => {
                        return action.disabled ? "disabled" : "";
                    };
                    const onIgnoreClick = () => { };
                    const onDrawerPullClick = () => {
                        isDrawerOpen.value = !isDrawerOpen.value;
                    };
                    const onHelpClick = () => {
                        isHelpOpen.value = !isHelpOpen.value;
                    };
                    const onPanelHeadingClick = () => {
                        if (props.hasCollapse) {
                            internalValue.value = !isPanelOpen.value;
                        }
                    };
                    const onPanelExpandClick = () => {
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
                    const onActionClick = (action, event) => {
                        if (action.disabled) {
                            return;
                        }
                        if (headerSecondaryActionMenu.value) {
                            $(headerSecondaryActionMenu.value).dropdown("toggle");
                        }
                        if (action.handler) {
                            action.handler(event);
                        }
                    };
                    watch(isFullscreen, () => {
                        if (isFullscreen.value) {
                            nextTick(() => { var _a; return (_a = panelElement.value) === null || _a === void 0 ? void 0 : _a.focus(); });
                        }
                    });
                    watch(headerSecondaryActionMenu, () => {
                        if (headerSecondaryActionMenu.value) {
                            $(headerSecondaryActionMenu.value).dropdown();
                        }
                    });
                    return {
                        getHeaderSecondaryActionIconClass,
                        getHeaderSecondaryActionItemClass,
                        hasCollapseAction,
                        hasHeaderSecondaryActions,
                        headerSecondaryActionMenu,
                        isDrawerOpen,
                        isFullscreen,
                        isHelpOpen,
                        isPanelOpen,
                        onActionClick,
                        onDrawerPullClick,
                        onFullscreenClick,
                        onHelpClick,
                        onIgnoreClick,
                        onPanelExpandClick,
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

        <div :class="panelHeadingClass" @click="onPanelHeadingClick">
            <h1 class="panel-title">
                <slot v-if="$slots.title" name="title" />
                <template v-else>
                    <i v-if="titleIconCssClass" :class="titleIconCssClass"></i>
                    {{ title }}
                </template>
            </h1>

            <div class="panel-header-actions" @click.prevent.stop="onIgnoreClick">
                <slot name="headerActions" />

                <span v-if="$slots.helpContent" class="action clickable" @click="onHelpClick">
                    <i class="fa fa-question"></i>
                </span>

                <span v-if="hasFullscreen" class="action clickable" @click="onFullscreenClick">
                    <i class="fa fa-expand"></i>
                </span>

                <template v-if="hasHeaderSecondaryActions">
                    <span class="action clickable" style="position: relative;">
                        <i class="fa fa-ellipsis-v" data-toggle="dropdown" ref="headerSecondaryActionMenu"></i>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li v-for="action in headerSecondaryActions" :class="getHeaderSecondaryActionItemClass(action)">
                                <a href="#" @click.prevent.stop="onActionClick(action, $event)">
                                    <i :class="getHeaderSecondaryActionIconClass(action)"></i>
                                    {{ action.title }}
                                </a>
                            </li>
                        </ul>
                    </span>
                </template>

                <span v-if="hasCollapseAction" class="action clickable" @click="onPanelExpandClick">
                    <i v-if="isPanelOpen" class="fa fa-chevron-up"></i>
                    <i v-else class="fa fa-chevron-down"></i>
                </span>
            </div>
        </div>

        <div v-if="$slots.subheaderLeft || $slots.subheaderRight" class="panel-sub-header">
            <div class="panel-sub-header-left">
                <slot name="subheaderLeft" />
            </div>

            <div class="panel-sub-header-right">
                <slot name="subheaderRight" />
            </div>
        </div>

        <div v-if="$slots.helpContent" class="panel-help">
            <TransitionVerticalCollapse>
                <div v-show="isHelpOpen" class="help-content">
                    <slot name="helpContent" />
                </div>
            </TransitionVerticalCollapse>
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

                <div v-if="$slots.footerActions || $slots.footerSecondaryActions" class="actions">
                    <div class="footer-actions">
                        <slot name="footerActions" />
                    </div>

                    <div class="footer-secondary-actions">
                        <slot name="footerSecondaryActions" />
                    </div>
                </div>
            </div>
        </TransitionVerticalCollapse>
    </div>
</Fullscreen>
`
            }));

        })
    };
}));
