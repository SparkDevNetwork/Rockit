System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "InlineCheckBox",
                components: {},
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    label: {
                        type: String,
                        required: true
                    }
                },
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(props.modelValue);
                    const toggle = () => {
                        internalValue.value = !internalValue.value;
                    };
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                    });
                    vue_1.watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    return {
                        internalValue,
                        label: props.label,
                        toggle
                    };
                },
                template: `
<div class="checkbox">
    <label title="">
        <input type="checkbox" v-model="internalValue" />
        <span class="label-text ">{{label}}</span>
    </label>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=inlineCheckBox.js.map