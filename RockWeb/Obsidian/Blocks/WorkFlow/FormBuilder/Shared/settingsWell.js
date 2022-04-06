System.register(["vue", "../../../../Elements/inlineSwitch", "../../../../Elements/transitionVerticalCollapse"], function (exports_1, context_1) {
    "use strict";
    var vue_1, inlineSwitch_1, transitionVerticalCollapse_1;
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
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.SettingsWell",
                components: {
                    InlineSwitch: inlineSwitch_1.default,
                    TransitionVerticalCollapse: transitionVerticalCollapse_1.default
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    hasEnable: {
                        type: Boolean,
                        default: false
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
                    const enabled = vue_1.ref(props.modelValue);
                    const showContent = vue_1.computed(() => enabled.value || !props.hasEnable);
                    vue_1.watch(() => props.modelValue, () => {
                        enabled.value = props.modelValue;
                    });
                    vue_1.watch([enabled], () => {
                        emit("update:modelValue", enabled.value);
                    });
                    return {
                        enabled,
                        showContent
                    };
                },
                template: `
<div class="well">
    <div class="d-flex">
        <div style="flex-grow: 1;">
            <h3 v-if="title">{{ title }}</h3>
            <p v-if="description">{{ description }}</p>
        </div>

        <div v-if="hasEnable" style="align-self: end;">
            <InlineSwitch v-model="enabled" label="Enable" />
        </div>
    </div>

    <TransitionVerticalCollapse>
        <div v-if="showContent">
            <hr />

            <slot />
        </div>
    </TransitionVerticalCollapse>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=settingsWell.js.map