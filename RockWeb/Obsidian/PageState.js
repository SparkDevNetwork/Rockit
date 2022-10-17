System.register(['vue', '@Obsidian/Utility/rockDateTime'], (function (exports) {
    'use strict';
    var reactive, shallowReadonly, RockDateTime;
    return {
        setters: [function (module) {
            reactive = module.reactive;
            shallowReadonly = module.shallowReadonly;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }],
        execute: (function () {

            exports('useStore', useStore);

            const state = reactive({
                areSecondaryBlocksShown: true,
                currentPerson: null,
                pageParameters: {},
                contextEntities: {},
                pageId: 0,
                pageGuid: "",
                executionStartTime: RockDateTime.now().toMilliseconds(),
                debugTimings: [],
                loginUrlWithReturnUrl: ""
            });
            class Store {
                constructor() {
                    this.state = shallowReadonly(state);
                }
                setAreSecondaryBlocksShown(areSecondaryBlocksShown) {
                    state.areSecondaryBlocksShown = areSecondaryBlocksShown;
                }
                initialize(pageConfig) {
                    state.currentPerson = pageConfig.currentPerson || null;
                    state.pageParameters = pageConfig.pageParameters || {};
                    state.contextEntities = pageConfig.contextEntities || {};
                    state.pageId = pageConfig.pageId || 0;
                    state.pageGuid = pageConfig.pageGuid || "";
                    state.executionStartTime = pageConfig.executionStartTime;
                    state.loginUrlWithReturnUrl = pageConfig.loginUrlWithReturnUrl;
                }
                addPageDebugTiming(timing) {
                    const pageStartTime = state.executionStartTime;
                    const timestampMs = timing.startTimeMs - pageStartTime;
                    const durationMs = timing.finishTimeMs - timing.startTimeMs;
                    state.debugTimings.push({
                        timestampMs: timestampMs,
                        durationMs: durationMs,
                        indentLevel: 1,
                        isTitleBold: false,
                        subTitle: timing.subtitle,
                        title: timing.title
                    });
                }
                redirectToLogin() {
                    if (state.loginUrlWithReturnUrl) {
                        window.location.href = state.loginUrlWithReturnUrl;
                    }
                }
                get isAuthenticated() {
                    return !!state.currentPerson;
                }
                getContextEntity(type) {
                    return state.contextEntities[type] || null;
                }
                get personContext() {
                    return this.getContextEntity("person");
                }
                get groupContext() {
                    return this.getContextEntity("group");
                }
                getPageParameter(key) {
                    return state.pageParameters[key];
                }
            }
            const store = new Store();
            function useStore() {
                return store;
            }

        })
    };
}));
