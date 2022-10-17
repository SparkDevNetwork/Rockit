System.register(['tslib', '@Obsidian/Utility/http', '@Obsidian/Utility/popover', '@Obsidian/Utility/tooltip', 'vue'], (function (exports) {
    'use strict';
    var __awaiter, useHttp, popover, tooltip, defineComponent, ref, watch, nextTick;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            popover = module.popover;
        }, function (module) {
            tooltip = module.tooltip;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
            nextTick = module.nextTick;
        }],
        execute: (function () {

            var badgeList = exports('default', defineComponent({
                name: "BadgeList",
                props: {
                    entityTypeGuid: {
                        type: String,
                        required: false
                    },
                    entityKey: {
                        type: String,
                        required: false
                    },
                    badgeTypeGuids: {
                        type: Array,
                        required: false
                    }
                },
                setup(props) {
                    const http = useHttp();
                    const badges = ref([]);
                    const containerRef = ref(null);
                    const loadBadges = () => __awaiter(this, void 0, void 0, function* () {
                        const data = {
                            badgeTypeGuids: props.badgeTypeGuids,
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey
                        };
                        const result = yield http.post("/api/v2/Controls/BadgeListGetBadges", undefined, data);
                        if (result.isSuccess && result.data) {
                            badges.value = result.data.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; });
                            let script = "";
                            for (const badge of result.data) {
                                if (badge.javaScript) {
                                    script += badge.javaScript;
                                }
                            }
                            if (script !== "") {
                                nextTick(() => {
                                    const scriptNode = document.createElement("script");
                                    scriptNode.type = "text/javascript";
                                    scriptNode.innerText = script;
                                    document.body.appendChild(scriptNode);
                                });
                            }
                            nextTick(() => {
                                if (!containerRef.value) {
                                    return;
                                }
                                tooltip(Array.from(containerRef.value.querySelectorAll(".rockbadge[data-toggle=\"tooltip\"]")));
                                popover(Array.from(containerRef.value.querySelectorAll(".rockbadge[data-toggle=\"popover\"]")));
                            });
                        }
                        else {
                            console.error(`Error loading badges: ${result.errorMessage || "Unknown error"}`);
                            badges.value = [];
                        }
                    });
                    watch([() => props.badgeTypeGuids, () => props.entityKey, () => props.entityTypeGuid], () => {
                        loadBadges();
                    });
                    loadBadges();
                    return {
                        badges,
                        containerRef
                    };
                },
                template: `
<div ref="containerRef" style="display: flex;">
    <div v-for="badge in badges" v-html="badge" />
</div>
`
            }));

        })
    };
}));
