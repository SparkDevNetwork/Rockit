System.register(["vue", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "CheckBox",
                components: {
                    RockFormField: rockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    label: {
                        type: String,
                        required: true
                    },
                    rules: {
                        type: String,
                        default: ""
                    },
                    text: {
                        type: String,
                        default: ""
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
                        toggle
                    };
                },
                template: `
<RockFormField
    :modelValue="modelValue"
    :label="label"
    formGroupClasses="rock-check-box"
    name="checkbox">
    <template #default="{uniqueId, field}">
    <div class="control-wrapper">
        <div class="checkbox">
            <label class="rock-checkbox-icon">
                <input type="checkbox" v-bind="field" v-model="internalValue" :id="uniqueId" />
                <span class="label-text">&nbsp;{{ text }}</span>
            </label>
        </div>
    </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=checkBox.js.map