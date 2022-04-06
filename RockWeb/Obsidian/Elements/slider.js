System.register(["vue", "../Util/component", "./inlineSlider", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1, inlineSlider_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (inlineSlider_1_1) {
                inlineSlider_1 = inlineSlider_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Slider",
                components: {
                    InlineSlider: inlineSlider_1.default,
                    RockFormField: rockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: Number,
                        required: true
                    },
                    isIntegerOnly: {
                        type: Boolean,
                        default: false
                    },
                    min: {
                        type: Number,
                        default: 0
                    },
                    max: {
                        type: Number,
                        default: 100
                    },
                    showValueBar: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-switch"
    name="switch">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <InlineSlider v-model="internalValue" :uniqueId="uniqueId" v-bind="field" :isIntegerOnly="isIntegerOnly" :min="min" :max="max" :showValueBar="showValueBar" />
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=slider.js.map