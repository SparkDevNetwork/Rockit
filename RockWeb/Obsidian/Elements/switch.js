System.register(["vue", "../Util/component", "./inlineSwitch", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1, inlineSwitch_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (inlineSwitch_1_1) {
                inlineSwitch_1 = inlineSwitch_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Switch",
                components: {
                    InlineSwitch: inlineSwitch_1.default,
                    RockFormField: rockFormField_1.default
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
            <InlineSwitch v-model="internalValue" :label="text" :uniqueId="uniqueId" v-bind="field" />
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=switch.js.map