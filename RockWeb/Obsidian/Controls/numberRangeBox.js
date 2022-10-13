System.register(['vue', '@Obsidian/ValidationRules', '@Obsidian/Utility/numberUtils', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, rulesPropType, normalizeRules, asFormattedString, toNumberOrNull, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            asFormattedString = module.asFormattedString;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var numberRangeBox = exports('default', defineComponent({
                name: "NumberRangeBox",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: { lower: null, upper: null }
                    },
                    decimalCount: {
                        type: Number,
                        default: null
                    },
                    inputClasses: {
                        type: String,
                        default: ""
                    },
                    rules: rulesPropType
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: {
                            lower: "",
                            upper: ""
                        }
                    };
                },
                methods: {
                    onChange() {
                        var _a, _b;
                        this.internalValue = {
                            lower: asFormattedString(this.modelValue.lower, (_a = this.internalDecimalCount) !== null && _a !== void 0 ? _a : undefined, { useGrouping: false }),
                            upper: asFormattedString(this.modelValue.upper, (_b = this.internalDecimalCount) !== null && _b !== void 0 ? _b : undefined, { useGrouping: false })
                        };
                    }
                },
                computed: {
                    computedValue() {
                        return {
                            lower: toNumberOrNull(this.internalValue.lower),
                            upper: toNumberOrNull(this.internalValue.upper)
                        };
                    },
                    internalDecimalCount() {
                        return this.decimalCount;
                    },
                    internalStep() {
                        return this.internalDecimalCount === null ? "any" : (1 / Math.pow(10, this.internalDecimalCount)).toString();
                    },
                    computedRules() {
                        const rules = normalizeRules(this.rules);
                        return rules;
                    },
                    validationValue() {
                        var _a, _b;
                        return `${(_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : ""},${(_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : ""}`;
                    }
                },
                watch: {
                    computedValue() {
                        this.$emit("update:modelValue", this.computedValue);
                    },
                    internalStep() {
                        return this.decimalCount === null ? "any" : (1 / Math.pow(10, this.decimalCount)).toString();
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (this.modelValue.lower !== toNumberOrNull(this.internalValue.lower) || this.modelValue.upper !== toNumberOrNull(this.internalValue.upper)) {
                                this.internalValue = {
                                    lower: this.modelValue.lower != null ? this.modelValue.lower.toString() : "",
                                    upper: this.modelValue.upper != null ? this.modelValue.upper.toString() : ""
                                };
                            }
                        }
                    }
                },
                template: `
<RockFormField
    v-model="validationValue"
    formGroupClasses="number-range-editor"
    name="number-range-box"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="form-control-group">
                <input
                    :id="uniqueId + '_lower'"
                    @change="onChange"
                    type="number"
                    class="input-width-md form-control"
                    :class="inputClasses"
                    v-model="internalValue.lower"
                    :step="internalStep" />
                <span class="to">to</span>
                <input
                    :id="uniqueId + '_upper'"
                    @change="onChange"
                    type="number"
                    class="input-width-md form-control"
                    :class="inputClasses"
                    v-model="internalValue.upper"
                    :step="internalStep" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
