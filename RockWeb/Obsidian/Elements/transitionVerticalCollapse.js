System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                setup() {
                    const beforeEnter = (element) => {
                        const state = {
                            display: element.style.display,
                            computedPaddingTop: getComputedStyle(element).paddingTop,
                            computedPaddingBottom: getComputedStyle(element).paddingBottom
                        };
                        element.dataset.transitionCollapseState = JSON.stringify(state);
                        if (!element.style.height) {
                            element.style.height = "0px";
                        }
                        if (!element.style.paddingTop) {
                            element.style.paddingTop = "0px";
                        }
                        if (!element.style.paddingBottom) {
                            element.style.paddingBottom = "0px";
                        }
                        element.style.display = "";
                    };
                    const enter = (element) => {
                        requestAnimationFrame(() => {
                            var _a;
                            const state = JSON.parse((_a = element.dataset.transitionCollapseState) !== null && _a !== void 0 ? _a : "");
                            const verticalPadding = (parseInt(state.computedPaddingTop) || 0) + (parseInt(state.computedPaddingBottom) || 0);
                            element.style.height = `${element.scrollHeight + verticalPadding}px`;
                            element.style.paddingTop = state.computedPaddingTop;
                            element.style.paddingBottom = state.computedPaddingBottom;
                        });
                    };
                    const afterEnter = (element) => {
                        var _a;
                        const state = JSON.parse((_a = element.dataset.transitionCollapseState) !== null && _a !== void 0 ? _a : "");
                        element.style.height = "";
                        element.style.paddingTop = "";
                        element.style.paddingBottom = "";
                        element.style.display = state.display !== "none" ? state.display : "";
                        delete element.dataset.transitionCollapseState;
                    };
                    const beforeLeave = (element) => {
                        element.style.height = `${element.offsetHeight}px`;
                    };
                    const leave = (element) => {
                        requestAnimationFrame(() => {
                            element.style.height = "0px";
                            element.style.paddingTop = "0px";
                            element.style.paddingBottom = "0px";
                        });
                    };
                    const afterLeave = (element) => {
                        element.style.height = "";
                        element.style.paddingTop = "";
                        element.style.paddingBottom = "";
                    };
                    return {
                        afterEnter,
                        afterLeave,
                        beforeEnter,
                        beforeLeave,
                        enter,
                        leave,
                    };
                },
                template: `
    <v-style>
        .vertical-collapse-enter-active,
        .vertical-collapse-leave-active {
            overflow: hidden;
            transition-property: height, padding-top, padding-bottom;
            transition-duration: 0.35s;
            transition-timing-function: ease-in-out;
        }
    </v-style>
<transition
    enter-active-class="vertical-collapse-enter-active"
    leave-active-class="vertical-collapse-leave-active"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave">
    <slot />
</transition>
`
            }));
        }
    };
});
//# sourceMappingURL=transitionVerticalCollapse.js.map