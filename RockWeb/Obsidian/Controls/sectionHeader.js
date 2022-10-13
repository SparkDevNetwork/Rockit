System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            var SectionHeader = exports('default', defineComponent({
                name: "Header",
                props: {
                    title: {
                        type: String,
                        default: ""
                    },
                    description: {
                        type: String,
                        default: ""
                    },
                    isSeparatorHidden: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup() {
                    return {};
                },
                template: `
<div class="rock-header">
    <div class="d-flex flex-wrap justify-content-between">
        <div>
            <h3 v-if="title" class="title">{{ title }}</h3>
            <p v-if="description" class="description">{{ description }}</p>
        </div>
        <div v-if="$slots.actions" class="section-header-actions align-self-end">
            <slot name="actions" />
        </div>
    </div>

    <hr v-if="!isSeparatorHidden" class="section-header-hr">
</div>
`
            }));

        })
    };
}));
