System.register(["vue", "../Elements/inlineSwitch", "../Elements/transitionVerticalCollapse", "../Util/component", "./header"], function (exports_1, context_1) {
    "use strict";
    var vue_1, inlineSwitch_1, transitionVerticalCollapse_1, component_1, header_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (inlineSwitch_1_1) {
                inlineSwitch_1 = inlineSwitch_1_1;
            },
            function (transitionVerticalCollapse_1_1) {
                transitionVerticalCollapse_1 = transitionVerticalCollapse_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "SectionContainer",
                components: {
                    Header: header_1.default,
                    InlineSwitch: inlineSwitch_1.default,
                    TransitionVerticalCollapse: transitionVerticalCollapse_1.default
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    toggleText: {
                        type: String,
                        default: ""
                    },
                    title: {
                        type: String,
                        default: ""
                    },
                    description: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const enabled = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const showContent = vue_1.computed(() => enabled.value || !props.toggleText);
                    return {
                        enabled,
                        showContent
                    };
                },
                template: `
<div class="section-container well">
    <div class="section-header">
        <div class="section-header-content">
            <Header :title="title" :description="description" />
        </div>

        <div v-if="toggleText" class="section-header-toggle align-self-end">
            <InlineSwitch v-model="enabled" :label="toggleText" />
        </div>
    </div>

    <TransitionVerticalCollapse>
        <div v-if="showContent">
            <hr class="section-header-hr" />

            <slot />
        </div>
    </TransitionVerticalCollapse>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=sectionContainer.js.map