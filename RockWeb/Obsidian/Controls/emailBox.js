System.register(['vue', '@Obsidian/ValidationRules', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, rulesPropType, normalizeRules, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var EmailBox = exports('default', defineComponent({
                name: "EmailBox",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    allowLava: {
                        type: Boolean,
                        default: false
                    },
                    allowMultiple: {
                        type: Boolean,
                        default: false
                    },
                    rules: rulesPropType
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: this.modelValue
                    };
                },
                computed: {
                    computedRules() {
                        const rules = normalizeRules(this.rules);
                        if (rules.indexOf("email") === -1 && !this.allowLava && !this.allowMultiple) {
                            rules.push("email");
                        }
                        return rules;
                    },
                    computedType() {
                        return this.allowLava || this.allowMultiple ? "text" : "email";
                    }
                },
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
    formGroupClasses="rock-text-box"
    name="textbox"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fa fa-envelope"></i>
                </span>
                <input v-model="internalValue" :id="uniqueId" class="form-control" v-bind="field" :type="computedType" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
