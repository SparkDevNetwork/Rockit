System.register(['vue', './numberBox.js', '@Obsidian/ValidationRules', '@Obsidian/Utility/numberUtils', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, NumberBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            NumberBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var currencyBox = exports('default', defineComponent({
                name: "CurrencyBox",
                components: {
                    NumberBox
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: null
                    },
                    minimumValue: {
                        type: Number
                    },
                    maximumValue: {
                        type: Number
                    },
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: null
                    };
                },
                computed: {
                    placeholder() {
                        return "0.00";
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (this.modelValue !== this.internalValue) {
                                this.internalValue = this.modelValue;
                            }
                        }
                    }
                },
                template: `
<NumberBox v-model="internalValue"
    :placeholder="placeholder"
    :minimum-value="minimumValue"
    :maximum-value="maximumValue"
    :decimal-count="2"
    rules="decimal">
    <template v-slot:prepend>
        <span class="input-group-addon">$</span>
    </template>
</NumberBox>
`
            }));

        })
    };
}));
