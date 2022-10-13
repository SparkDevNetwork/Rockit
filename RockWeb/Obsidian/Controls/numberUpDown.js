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

            const NumberUpDownInternal = exports('NumberUpDownInternal', defineComponent({
                name: "NumberUpDownInternal",
                props: {
                    modelValue: {
                        type: Number,
                        required: true
                    },
                    min: {
                        type: Number,
                        default: 1
                    },
                    max: {
                        type: Number,
                        default: 10
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                data() {
                    return {
                        internalValue: 0
                    };
                },
                methods: {
                    goUp() {
                        if (!this.isUpDisabled) {
                            this.internalValue++;
                        }
                    },
                    goDown() {
                        if (!this.isDownDisabled) {
                            this.internalValue--;
                        }
                    }
                },
                computed: {
                    isUpDisabled() {
                        return this.internalValue >= this.max;
                    },
                    isDownDisabled() {
                        return this.internalValue <= this.min;
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue;
                        }
                    },
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    }
                },
                template: `
<div class="numberincrement">
    <a @click="goDown" class="numberincrement-down" :class="{disabled: disabled || isDownDisabled}" :disabled="disabled || isDownDisabled">
        <i class="fa fa-minus "></i>
    </a>
    <span class="numberincrement-value">{{modelValue}}</span>
    <a @click="goUp" class="numberincrement-up" :class="{disabled: disabled || isUpDisabled}" :disabled="disabled || isUpDisabled">
        <i class="fa fa-plus "></i>
    </a>
</div>`
            }));
            var numberUpDown = exports('default', defineComponent({
                name: "NumberUpDown",
                components: {
                    RockFormField,
                    NumberUpDownInternal
                },
                props: {
                    modelValue: {
                        type: Number,
                        required: true
                    },
                    min: {
                        type: Number,
                        default: 1
                    },
                    max: {
                        type: Number,
                        default: 10
                    },
                    numberIncrementClasses: {
                        type: String,
                        default: ""
                    }
                },
                data() {
                    return {
                        internalValue: 0
                    };
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue;
                        }
                    },
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    }
                },
                methods: {
                    additionalClasses(fieldLabel) {
                        if (fieldLabel !== "") {
                            return `margin-t-sm ${this.numberIncrementClasses}`;
                        }
                        else {
                            return this.numberIncrementClasses;
                        }
                    }
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="number-up-down"
    name="numberupdown">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <NumberUpDownInternal v-model="internalValue" :min="min" :max="max" :class="additionalClasses(fieldLabel)" />
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
