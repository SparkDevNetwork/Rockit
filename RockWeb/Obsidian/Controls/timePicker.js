System.register(['vue', '@Obsidian/ValidationRules', './basicTimePicker.js', './rockFormField.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, rulesPropType, normalizeRules, BasicTimePicker, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            BasicTimePicker = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var timePicker = exports('default', defineComponent({
                name: "TimePicker",
                components: {
                    RockFormField,
                    BasicTimePicker
                },
                props: {
                    rules: rulesPropType,
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                data() {
                    return {
                        internalValue: {}
                    };
                },
                methods: {},
                computed: {
                    computedRules() {
                        const rules = normalizeRules(this.rules);
                        return rules;
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
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="timepicker-input"
    name="time-picker"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="timepicker-input">
                <BasicTimePicker v-model="internalValue" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
