System.register(['vue', '@Obsidian/Utility/component', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var defineComponent, computed, useVModelPassthrough, newGuid;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            newGuid = module.newGuid;
        }],
        execute: (function () {

            var InlineSwitch = exports('default', defineComponent({
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
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const internalUniqueId = `inline-switch-${newGuid()}`;
                    const uniqueId = computed(() => props.uniqueId || internalUniqueId);
                    const labelClass = computed(() => {
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

        })
    };
}));
