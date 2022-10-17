System.register(['vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var CheckBox = exports('default', defineComponent({
                name: "CheckBox",
                components: {
                    RockFormField
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

        })
    };
}));
