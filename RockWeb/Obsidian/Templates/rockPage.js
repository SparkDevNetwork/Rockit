System.register(['tslib', 'vue', '@Obsidian/Utility/http', '@Obsidian/PageState', '@Obsidian/Utility/rockDateTime', '@Obsidian/Utility/block', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', '@Obsidian/FieldTypes/index', '@Obsidian/Utility/suspense'], (function (exports, module) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, onErrorCaptured, onMounted, provide, nextTick, h, createApp, markRaw, provideHttp, doApiCall, useStore, RockDateTime, provideReloadBlock, provideConfigurationValuesChanged, provideBlockGuid, emptyGuid, areEqual, BasicSuspenseProvider, provideSuspense;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            onErrorCaptured = module.onErrorCaptured;
            onMounted = module.onMounted;
            provide = module.provide;
            nextTick = module.nextTick;
            h = module.h;
            createApp = module.createApp;
            markRaw = module.markRaw;
        }, function (module) {
            provideHttp = module.provideHttp;
            doApiCall = module.doApiCall;
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function (module) {
            provideReloadBlock = module.provideReloadBlock;
            provideConfigurationValuesChanged = module.provideConfigurationValuesChanged;
            provideBlockGuid = module.provideBlockGuid;
        }, function (module) {
            emptyGuid = module.emptyGuid;
            areEqual = module.areEqual;
        }, function () {}, function () {}, function (module) {
            BasicSuspenseProvider = module.BasicSuspenseProvider;
            provideSuspense = module.provideSuspense;
        }],
        execute: (function () {

            exports({
                initializeBlock: initializeBlock,
                initializePage: initializePage,
                initializePageTimings: initializePageTimings
            });

            const store$1 = useStore();
            function addBlockChangedEventListener(blockId, callback) {
                var _a;
                function onTriggerClick() {
                    const dataElement = document.querySelector("#rock-config-trigger-data");
                    if (dataElement.value.toLowerCase().startsWith("block_updated:")) {
                        const dataSegments = dataElement.value.toLowerCase().split(":");
                        if (dataSegments.length >= 3 && areEqual(dataSegments[2], blockId)) {
                            callback();
                        }
                    }
                }
                (_a = document.querySelector("#rock-config-trigger")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", onTriggerClick, true);
                if (Sys) {
                    Sys.Application.add_load(() => {
                        var _a;
                        (_a = document.querySelector("#rock-config-trigger")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", onTriggerClick, true);
                    });
                }
            }
            function updateConfigurationBarActions(blockContainerElement, actions) {
                var _a;
                const blockContent = blockContainerElement.closest(".block-content");
                const blockConfiguration = Array.from((_a = blockContent === null || blockContent === void 0 ? void 0 : blockContent.children) !== null && _a !== void 0 ? _a : [])
                    .find(el => el.classList.contains("block-configuration"));
                const configurationBar = blockConfiguration === null || blockConfiguration === void 0 ? void 0 : blockConfiguration.querySelector(".block-configuration-bar");
                if (!configurationBar) {
                    return;
                }
                const nameElement = Array.from(configurationBar.children).find(el => el.tagName == "SPAN");
                if (!nameElement) {
                    return;
                }
                Array.from(configurationBar.querySelectorAll("a"))
                    .filter(el => el.dataset["customAction"] === "true")
                    .forEach(el => el.remove());
                actions.forEach(action => {
                    var _a, _b;
                    const hyperlinkElement = document.createElement("a");
                    hyperlinkElement.href = "#";
                    hyperlinkElement.title = (_a = action.title) !== null && _a !== void 0 ? _a : "";
                    hyperlinkElement.dataset["customAction"] = "true";
                    hyperlinkElement.addEventListener("click", e => {
                        e.preventDefault();
                        if (action.handler) {
                            action.handler(e);
                        }
                    });
                    const iconElement = document.createElement("i");
                    iconElement.className = (_b = action.iconCssClass) !== null && _b !== void 0 ? _b : "fa fa-question";
                    hyperlinkElement.appendChild(iconElement);
                    nameElement.after(hyperlinkElement);
                });
            }
            var RockBlock = defineComponent({
                name: "RockBlock",
                props: {
                    config: {
                        type: Object,
                        required: true
                    },
                    blockComponent: {
                        type: Object,
                        default: null
                    },
                    startTimeMs: {
                        type: Number,
                        required: true
                    }
                },
                setup(props) {
                    var _a;
                    const error = ref("");
                    const finishTimeMs = ref(null);
                    const blockContainerElement = ref(null);
                    const configurationValues = ref(props.config.configurationValues);
                    const configCustomActions = ref(props.config.customConfigurationActions);
                    const customActionComponent = ref(null);
                    const currentBlockComponent = ref(props.blockComponent);
                    const configBarActions = computed(() => {
                        const customActions = [];
                        if (configCustomActions.value) {
                            for (const cca of configCustomActions.value) {
                                if (cca.iconCssClass && cca.tooltip && cca.componentFileUrl) {
                                    customActions.push({
                                        type: "default",
                                        title: cca.tooltip,
                                        iconCssClass: cca.iconCssClass,
                                        handler: () => __awaiter(this, void 0, void 0, function* () {
                                            var _a, _b, _c;
                                            try {
                                                const module$1 = yield module.import((_a = cca.componentFileUrl) !== null && _a !== void 0 ? _a : "");
                                                customActionComponent.value = (_c = (_b = module$1 === null || module$1 === void 0 ? void 0 : module$1.default) !== null && _b !== void 0 ? _b : module$1) !== null && _c !== void 0 ? _c : null;
                                            }
                                            catch (e) {
                                                console.error(e);
                                            }
                                        })
                                    });
                                }
                            }
                        }
                        return customActions;
                    });
                    const httpCall = (method, url, params = undefined, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield doApiCall(method, url, params, data);
                    });
                    const get = (url, params = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield httpCall("GET", url, params);
                    });
                    const post = (url, params = undefined, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield httpCall("POST", url, params, data);
                    });
                    const invokeBlockAction = (actionName, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield post(`/api/v2/BlockActions/${store$1.state.pageGuid}/${props.config.blockGuid}/${actionName}`, undefined, Object.assign({ __context: {
                                pageParameters: store$1.state.pageParameters
                            } }, data));
                    });
                    const reloadBlock = () => __awaiter(this, void 0, void 0, function* () {
                        const result = yield invokeBlockAction("RefreshObsidianBlockInitialization");
                        if (result.isSuccess && result.data) {
                            currentBlockComponent.value = null;
                            nextTick(() => {
                                var _a, _b;
                                configurationValuesChanged.reset();
                                configurationValues.value = (_a = result.data) === null || _a === void 0 ? void 0 : _a.configurationValues;
                                configCustomActions.value = (_b = result.data) === null || _b === void 0 ? void 0 : _b.customConfigurationActions;
                                currentBlockComponent.value = props.blockComponent;
                            });
                        }
                        else {
                            console.error("Failed to reload block:", result.errorMessage || "Unknown error");
                        }
                    });
                    const onCustomActionClose = () => {
                        customActionComponent.value = null;
                    };
                    watch(configBarActions, () => {
                        if (blockContainerElement.value) {
                            updateConfigurationBarActions(blockContainerElement.value, configBarActions.value);
                        }
                    });
                    onErrorCaptured(err => {
                        const defaultMessage = "An unknown error was caught from the block.";
                        if (err instanceof Error) {
                            error.value = err.message || defaultMessage;
                        }
                        else if (err) {
                            error.value = JSON.stringify(err) || defaultMessage;
                        }
                        else {
                            error.value = defaultMessage;
                        }
                    });
                    onMounted(() => {
                        var _a;
                        finishTimeMs.value = RockDateTime.now().toMilliseconds();
                        const componentName = ((_a = props.blockComponent) === null || _a === void 0 ? void 0 : _a.name) || "";
                        const nameParts = componentName.split(".");
                        let subtitle = nameParts[0] || "";
                        if (subtitle && subtitle.indexOf("(") !== 0) {
                            subtitle = `(${subtitle})`;
                        }
                        if (nameParts.length) {
                            store$1.addPageDebugTiming({
                                title: nameParts[1] || "<Unnamed>",
                                subtitle: subtitle,
                                startTimeMs: props.startTimeMs,
                                finishTimeMs: finishTimeMs.value
                            });
                        }
                        if (blockContainerElement.value) {
                            updateConfigurationBarActions(blockContainerElement.value, configBarActions.value);
                        }
                    });
                    provideHttp({
                        doApiCall,
                        get,
                        post
                    });
                    provide("invokeBlockAction", invokeBlockAction);
                    provide("configurationValues", configurationValues);
                    provideReloadBlock(reloadBlock);
                    const configurationValuesChanged = provideConfigurationValuesChanged();
                    if (props.config.blockGuid) {
                        provideBlockGuid(props.config.blockGuid);
                    }
                    if (props.config.blockGuid) {
                        addBlockChangedEventListener(props.config.blockGuid, () => {
                            configurationValuesChanged.invoke();
                        });
                    }
                    return {
                        blockContainerElement,
                        blockFileUrl: props.config.blockFileUrl,
                        blockGuid: (_a = props.config.blockGuid) !== null && _a !== void 0 ? _a : emptyGuid,
                        currentBlockComponent,
                        customActionComponent,
                        onCustomActionClose,
                        error
                    };
                },
                template: `
<div ref="blockContainerElement" class="obsidian-block">
    <div v-if="!blockComponent" class="alert alert-danger">
        <strong>Not Found</strong>
        Could not find block component: "{{blockFileUrl}}"
    </div>

    <div v-if="error" class="alert alert-danger">
        <strong>Uncaught Error</strong>
        {{error}}
    </div>

    <component :is="currentBlockComponent" :blockGuid="blockGuid" />

    <div style="display: none;">
        <component :is="customActionComponent" @close="onCustomActionClose" />
    </div>
</div>`
            });

            const store = useStore();
            const developerStyle = defineComponent({
                render() {
                    return h("style", {}, this.$slots.default ? this.$slots.default() : undefined);
                }
            });
            function initializeBlock(config) {
                return __awaiter(this, void 0, void 0, function* () {
                    const blockPath = `${config.blockFileUrl}.js`;
                    let blockComponent = null;
                    let errorMessage = "";
                    if (!config || !config.blockFileUrl || !config.blockGuid || !config.rootElementId) {
                        console.error("Invalid block configuration:", config);
                        throw "Could not initialize Obsidian block because the configuration is invalid.";
                    }
                    const rootElement = document.getElementById(config.rootElementId);
                    if (!rootElement) {
                        throw "Could not initialize Obsidian block because the root element was not found.";
                    }
                    try {
                        const blockComponentModule = yield module.import(blockPath);
                        blockComponent = blockComponentModule ?
                            (blockComponentModule.default || blockComponentModule) :
                            null;
                    }
                    catch (e) {
                        console.error(e);
                        errorMessage = `${e}`;
                    }
                    const name = `Root${config.blockFileUrl.replace(/\//g, ".")}`;
                    const startTimeMs = RockDateTime.now().toMilliseconds();
                    const app = createApp({
                        name,
                        components: {
                            RockBlock
                        },
                        setup() {
                            let isLoaded = false;
                            const suspense = new BasicSuspenseProvider(undefined);
                            provideSuspense(suspense);
                            const startLoading = () => {
                                var _a;
                                let pendingCount = parseInt((_a = document.body.getAttribute("data-obsidian-pending-blocks")) !== null && _a !== void 0 ? _a : "0");
                                pendingCount++;
                                document.body.setAttribute("data-obsidian-pending-blocks", pendingCount.toString());
                            };
                            const finishedLoading = () => {
                                var _a;
                                if (isLoaded) {
                                    return;
                                }
                                isLoaded = true;
                                let pendingCount = parseInt((_a = document.body.getAttribute("data-obsidian-pending-blocks")) !== null && _a !== void 0 ? _a : "0");
                                if (pendingCount > 0) {
                                    pendingCount--;
                                    document.body.setAttribute("data-obsidian-pending-blocks", pendingCount.toString());
                                    if (pendingCount === 0) {
                                        document.body.classList.remove("obsidian-loading");
                                    }
                                }
                            };
                            startLoading();
                            setTimeout(finishedLoading, 5000);
                            onMounted(() => {
                                if (!suspense.hasPendingOperations()) {
                                    finishedLoading();
                                }
                                else {
                                    suspense.addFinishedHandler(() => {
                                        finishedLoading();
                                    });
                                }
                            });
                            return {
                                config: config,
                                blockComponent: blockComponent ? markRaw(blockComponent) : null,
                                startTimeMs,
                                errorMessage
                            };
                        },
                        template: `
<div v-if="errorMessage" class="alert alert-danger">
    <strong>Error Initializing Block</strong>
    <br />
    {{errorMessage}}
</div>
<RockBlock v-else :config="config" :blockComponent="blockComponent" :startTimeMs="startTimeMs" />`
                    });
                    app.component("v-style", developerStyle);
                    app.mount(rootElement);
                    return app;
                });
            }
            function initializePage(pageConfig) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield store.initialize(pageConfig);
                });
            }
            function initializePageTimings(config) {
                return __awaiter(this, void 0, void 0, function* () {
                    const rootElement = document.getElementById(config.elementId);
                    if (!rootElement) {
                        console.error("Could not show Obsidian debug timings because the HTML element did not resolve.");
                        return;
                    }
                    const pageDebugTimings = (yield module.import('@Obsidian/Controls/pageDebugTimings')).default;
                    const app = createApp({
                        name: "PageDebugTimingsRoot",
                        components: {
                            PageDebugTimings: pageDebugTimings
                        },
                        data() {
                            return {
                                viewModels: config.debugTimingViewModels
                            };
                        },
                        template: `<PageDebugTimings :serverViewModels="viewModels" />`
                    });
                    app.mount(rootElement);
                });
            }

        })
    };
}));
