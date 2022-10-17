System.register(['vue', '@Obsidian/Utility/component'], (function (exports) {
    'use strict';
    var defineComponent, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }],
        execute: (function () {

            var SegmentedPicker = exports('default', defineComponent({
                name: "SegmentedPicker",
                props: {
                    modelValue: {
                        type: String,
                        default: ""
                    },
                    items: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const getButtonClass = (item) => {
                        return ["btn", item.value === internalValue.value ? "btn-primary" : "btn-default"];
                    };
                    const onItemClick = (item) => {
                        var _a;
                        internalValue.value = (_a = item.value) !== null && _a !== void 0 ? _a : "";
                    };
                    return {
                        getButtonClass,
                        internalValue,
                        onItemClick
                    };
                },
                template: `
<div class="btn-group btn-group-xs mb-2" role="group">
    <button v-for="item in items" :class="getButtonClass(item)" :key="item.value" type="button" @click="onItemClick(item)">{{ item.text }}</button>
</div>
`
            }));

        })
    };
}));
