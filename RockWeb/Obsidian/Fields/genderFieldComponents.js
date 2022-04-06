System.register(["vue", "./utils", "../Elements/dropDownList", "../Elements/checkBox", "../Services/boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, dropDownList_1, checkBox_1, boolean_1, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "GenderField.Edit",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: utils_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ""
                    };
                },
                computed: {
                    dropDownListOptions() {
                        const hideUnknownGenderConfig = this.configurationValues["hideUnknownGender"];
                        const hideUnknownGender = (hideUnknownGenderConfig === null || hideUnknownGenderConfig === void 0 ? void 0 : hideUnknownGenderConfig.toLowerCase()) === "true";
                        if (hideUnknownGender === false) {
                            return [
                                { text: "Unknown", value: "0" },
                                { text: "Male", value: "1" },
                                { text: "Female", value: "2" }
                            ];
                        }
                        else {
                            return [
                                { text: "Male", value: "1" },
                                { text: "Female", value: "2" }
                            ];
                        }
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || "";
                        }
                    }
                },
                template: `
<DropDownList v-model="internalValue" :options="dropDownListOptions" formControlClasses="input-width-md" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "GenderField.Configuration",
                components: { CheckBox: checkBox_1.default },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const hideUnknownGender = vue_1.ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b;
                        const newValue = {};
                        newValue["hideUnknownGender"] = (_a = boolean_1.asTrueFalseOrNull(hideUnknownGender.value)) !== null && _a !== void 0 ? _a : "False";
                        const anyValueChanged = newValue["hideUnknownGender"] !== ((_b = props.modelValue["hideUnknownGender"]) !== null && _b !== void 0 ? _b : "False");
                        if (anyValueChanged) {
                            emit("update:modelValue", newValue);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    const maybeUpdateConfiguration = (key, value) => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfigurationValue", key, value);
                        }
                    };
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        hideUnknownGender.value = boolean_1.asBoolean(props.modelValue["hideUnknownGender"]);
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(hideUnknownGender, () => { var _a; return maybeUpdateConfiguration("hideUnknownGender", (_a = boolean_1.asTrueFalseOrNull(hideUnknownGender.value)) !== null && _a !== void 0 ? _a : "False"); });
                    return { hideUnknownGender };
                },
                template: `
<div>
    <CheckBox v-model="hideUnknownGender" label="Hide Unknown Gender" help="When set, the 'Unknown' Option will not appear in the list of genders." text="Yes" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=genderFieldComponents.js.map