System.register(['vue', './utils.js', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/checkBox', '@Obsidian/Utility/booleanUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, getFieldEditorProps, getFieldConfigurationProps, DropDownList, CheckBox, asBoolean, asTrueFalseOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "GenderField.Edit",
                components: {
                    DropDownList
                },
                props: getFieldEditorProps(),
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
<DropDownList v-model="internalValue" :items="dropDownListOptions" formControlClasses="input-width-md" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "GenderField.Configuration",
                components: { CheckBox },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const hideUnknownGender = ref(false);
                    const maybeUpdateModelValue = () => {
                        var _a, _b;
                        const newValue = {};
                        newValue["hideUnknownGender"] = (_a = asTrueFalseOrNull(hideUnknownGender.value)) !== null && _a !== void 0 ? _a : "False";
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        hideUnknownGender.value = asBoolean(props.modelValue["hideUnknownGender"]);
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(hideUnknownGender, () => { var _a; return maybeUpdateConfiguration("hideUnknownGender", (_a = asTrueFalseOrNull(hideUnknownGender.value)) !== null && _a !== void 0 ? _a : "False"); });
                    return { hideUnknownGender };
                },
                template: `
<div>
    <CheckBox v-model="hideUnknownGender" label="Hide Unknown Gender" help="When set, the 'Unknown' Option will not appear in the list of genders." text="Yes" />
</div>
`
            }));

        })
    };
}));
