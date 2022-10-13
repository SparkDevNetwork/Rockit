System.register(['vue', './inlineSwitch.js', './transitionVerticalCollapse.js', '@Obsidian/Utility/component', './sectionHeader.js', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var defineComponent, computed, InlineSwitch, TransitionVerticalCollapse, useVModelPassthrough, SectionHeader;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            InlineSwitch = module["default"];
        }, function (module) {
            TransitionVerticalCollapse = module["default"];
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            SectionHeader = module["default"];
        }, function () {}],
        execute: (function () {

            var sectionContainer = exports('default', defineComponent({
                name: "SectionContainer",
                components: {
                    SectionHeader,
                    InlineSwitch,
                    TransitionVerticalCollapse
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
                    const enabled = useVModelPassthrough(props, "modelValue", emit);
                    const showContent = computed(() => enabled.value || !props.toggleText);
                    return {
                        enabled,
                        showContent
                    };
                },
                template: `
<div class="section-container well">
    <div class="section-header">
        <div class="section-header-content">
            <SectionHeader :title="title" :description="description" :isSeparatorHidden="true">
                <template #actions><slot name="actions" /></template>
            </SectionHeader>
        </div>

        <div v-if="toggleText" class="section-header-toggle align-self-end">
            <InlineSwitch v-model="enabled" :label="toggleText" />
        </div>
    </div>

    <TransitionVerticalCollapse>
        <div v-if="showContent">
            <hr class="section-header-hr">
            <slot />
        </div>
    </TransitionVerticalCollapse>
</div>
`
            }));

        })
    };
}));
