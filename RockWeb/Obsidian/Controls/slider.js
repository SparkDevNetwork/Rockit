System.register(['vue', '@Obsidian/Utility/component', './inlineSlider.js', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, useVModelPassthrough, InlineSlider, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            InlineSlider = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var slider = exports('default', defineComponent({
                name: "Slider",
                components: {
                    InlineSlider,
                    RockFormField
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
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    return {
                        internalValue
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-range-slider"
    name="range-slider">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <InlineSlider v-model="internalValue" :uniqueId="uniqueId" v-bind="field" :isIntegerOnly="isIntegerOnly" :min="min" :max="max" :showValueBar="showValueBar" />
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
