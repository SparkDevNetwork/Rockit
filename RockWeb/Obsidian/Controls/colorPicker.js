System.register(['vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var colorPicker = exports('default', defineComponent({
                name: "ColorPicker",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    placeholder: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: this.modelValue
                    };
                },
                mounted() {
                    const $colorPicker = window["$"](this.$refs.colorPicker);
                    $colorPicker.colorpicker();
                    $colorPicker.find("> input").on("change", () => {
                        this.internalValue = $colorPicker.find("> input").val();
                    });
                },
                computed: {},
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue() {
                        this.internalValue = this.modelValue;
                    }
                },
                template: `
<RockFormField
    v-model="internalValue"
    formGroupClasses="rock-color-picker"
    name="colorpicker">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div ref="colorPicker" class="input-group input-width-lg">
                <input v-model="internalValue" :id="uniqueId" type="text" class="form-control" v-bind="field" :placeholder="placeholder" />
                <span class="input-group-addon">
                    <i></i>
                </span>
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
