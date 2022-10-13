System.register(['vue', './rockFormField.js', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, RockFormField, stripPhoneNumber, formatPhoneNumber;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            stripPhoneNumber = module.stripPhoneNumber;
            formatPhoneNumber = module.formatPhoneNumber;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var phoneNumberBox = exports('default', defineComponent({
                name: "PhoneNumberBox",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: String,
                        default: ""
                    },
                    inputGroupClasses: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: ""
                    };
                },
                methods: {
                    onChange() {
                        this.internalValue = this.formattedValue;
                    }
                },
                computed: {
                    strippedValue() {
                        return stripPhoneNumber(this.internalValue);
                    },
                    formattedValue() {
                        return formatPhoneNumber(this.internalValue);
                    }
                },
                watch: {
                    formattedValue() {
                        this.$emit("update:modelValue", this.formattedValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            const stripped = stripPhoneNumber(this.modelValue);
                            if (stripped !== this.strippedValue) {
                                this.internalValue = formatPhoneNumber(stripped);
                            }
                        }
                    }
                },
                template: `
<RockFormField
    v-model="internalValue"
    @change="onChange"
    formGroupClasses="rock-phonenumber-box"
    name="phonenumberbox">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="input-group phone-number-box" :class="inputGroupClasses">
                <span class="input-group-addon">
                    <i class="fa fa-phone-square"></i>
                </span>
                <input v-model="internalValue" :id="uniqueId" type="text" class="form-control" v-bind="field" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
