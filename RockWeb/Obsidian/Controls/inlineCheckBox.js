System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }],
        execute: (function () {

            var InlineCheckBox = exports('default', defineComponent({
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
                    const internalValue = ref(props.modelValue);
                    const toggle = () => {
                        internalValue.value = !internalValue.value;
                    };
                    watch(() => props.modelValue, () => {
                        internalValue.value = props.modelValue;
                    });
                    watch(internalValue, () => {
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

        })
    };
}));
