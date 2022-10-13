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

            var socialSecurityNumberBox = exports('default', defineComponent({
                name: "SocialSecurityNumberBox",
                components: {
                    RockFormField
                },
                props: {
                    rules: rulesPropType,
                    modelValue: {
                        type: String,
                        default: ""
                    }
                },
                data() {
                    return {
                        internalArea: "",
                        internalGroup: "",
                        internalSerial: "",
                        internalValue: ""
                    };
                },
                methods: {
                    getValue() {
                        const value = `${this.internalArea}${this.internalGroup}${this.internalSerial}`;
                        return value;
                    },
                    keyPress(e) {
                        if (/^[0-9]$/.test(e.key) === false) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    },
                    keyUp(e) {
                        const area = this.$refs.area;
                        const group = this.$refs.group;
                        const serial = this.$refs.serial;
                        if (/^[0-9]$/.test(e.key) === false) {
                            return true;
                        }
                        if (area === e.target && area.selectionStart === 3) {
                            this.$nextTick(() => {
                                group.focus();
                                group.setSelectionRange(0, 2);
                            });
                        }
                        else if (group === e.target && group.selectionStart === 2) {
                            this.$nextTick(() => {
                                serial.focus();
                                serial.setSelectionRange(0, 4);
                            });
                        }
                        return true;
                    }
                },
                computed: {
                    computedRules() {
                        const rules = normalizeRules(this.rules);
                        rules.push("ssn");
                        return rules;
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            const strippedValue = this.modelValue.replace(/[^0-9]/g, "");
                            if (strippedValue.length !== 9) {
                                this.internalArea = "";
                                this.internalGroup = "";
                                this.internalSerial = "";
                            }
                            else {
                                this.internalArea = strippedValue.substr(0, 3);
                                this.internalGroup = strippedValue.substr(3, 2);
                                this.internalSerial = strippedValue.substr(5, 4);
                            }
                            this.internalValue = this.getValue();
                        }
                    },
                    internalArea() {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 9) {
                            this.$emit("update:modelValue", this.internalValue);
                        }
                    },
                    internalGroup() {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 9) {
                            this.$emit("update:modelValue", this.internalValue);
                        }
                    },
                    internalSerial() {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 9) {
                            this.$emit("update:modelValue", this.internalValue);
                        }
                    },
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="social-security-number-box"
    name="social-security-number-box"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="form-control-group">
                <input ref="area" class="form-control ssn-part ssn-area" type="password" pattern="[0-9]*" maxlength="3" v-model="internalArea" v-on:keypress="keyPress" v-on:keyup="keyUp" />
                <span class="separator">-</span>
                <input ref="group" class="form-control ssn-part ssn-group" type="password" pattern="[0-9]*" maxlength="2" v-model="internalGroup" v-on:keypress="keyPress" v-on:keyup="keyUp" />
                <span class="separator">-</span>
                <input ref="serial" class="form-control ssn-part ssn-serial" type="text" pattern="[0-9]*" maxlength="4" v-model="internalSerial" v-on:keypress="keyPress" v-on:keyup="keyUp" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
