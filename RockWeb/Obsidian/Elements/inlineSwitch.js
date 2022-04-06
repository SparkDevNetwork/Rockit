System.register(["vue", "../Util/component", "../Util/guid"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1, guid_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "InlineSwitch",
                components: {},
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    label: {
                        type: String,
                        required: true
                    },
                    isBold: {
                        type: Boolean,
                        default: false
                    },
                    uniqueId: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const internalUniqueId = `inline-switch-${guid_1.newGuid()}`;
                    const uniqueId = vue_1.computed(() => props.uniqueId || internalUniqueId);
                    const labelClass = vue_1.computed(() => {
                        const classes = ["custom-control-label"];
                        if (props.isBold) {
                            classes.push("custom-control-label-bold");
                        }
                        return classes;
                    });
                    return {
                        labelClass,
                        internalValue,
                        uniqueId
                    };
                },
                template: `
<div class="custom-control custom-switch">
    <input v-model="internalValue" :id="uniqueId" class="custom-control-input" type="checkbox" />
    <label :class="labelClass" :for="uniqueId">
        <template v-if="label">{{ label }}</template>
        <template v-else>&nbsp;</template>
    </label>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=inlineSwitch.js.map