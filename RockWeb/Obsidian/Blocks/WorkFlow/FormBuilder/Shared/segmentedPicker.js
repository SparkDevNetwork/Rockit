System.register(["vue", "../../../../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "SegmentedPicker",
                props: {
                    modelValue: {
                        type: String,
                        default: ""
                    },
                    options: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const getButtonClass = (item) => {
                        return ["btn", item.value === internalValue.value ? "btn-primary" : "btn-default"];
                    };
                    const onItemClick = (item) => {
                        internalValue.value = item.value;
                    };
                    return {
                        getButtonClass,
                        internalValue,
                        onItemClick
                    };
                },
                template: `
<div class="btn-group btn-group-xs mb-2" role="group">
    <button v-for="item in options" :class="getButtonClass(item)" :key="item.value" type="button" @click="onItemClick(item)">{{ item.text }}</button>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=segmentedPicker.js.map