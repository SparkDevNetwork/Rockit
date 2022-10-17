System.register(['vue', '@Obsidian/Utility/component', './inlineSwitch.js', './rockFormField.js', '@Obsidian/Utility/guid', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, useVModelPassthrough, InlineSwitch, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            InlineSwitch = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var _switch = exports('default', defineComponent({
                name: "Switch",
                components: {
                    InlineSwitch,
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    text: {
                        type: String,
                        default: ""
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
    formGroupClasses="rock-switch"
    name="switch">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <InlineSwitch v-model="internalValue" :label="text" :uniqueId="uniqueId" v-bind="field" />
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
