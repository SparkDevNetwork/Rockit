System.register(['vue', './utils.js', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/imageUploader', '@Obsidian/Utility/component', '@Obsidian/Utility/booleanUtils', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, CheckBox, DropDownList, ImageUploader, updateRefValue, asBooleanOrNull, asTrueFalseOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            ImageUploader = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "ImageField.Edit",
                components: {
                    ImageUploader
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref(null);
                    const binaryFileType = computed(() => {
                        var _a;
                        return (_a = props.configurationValues["binaryFileType"]) !== null && _a !== void 0 ? _a : "";
                    });
                    watch(() => props.modelValue, () => {
                        var _a;
                        try {
                            updateRefValue(internalValue, JSON.parse((_a = props.modelValue) !== null && _a !== void 0 ? _a : ""));
                        }
                        catch (_b) {
                            internalValue.value = null;
                        }
                    }, {
                        immediate: true
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value ? JSON.stringify(internalValue.value) : "");
                    });
                    return {
                        binaryFileType,
                        internalValue
                    };
                },
                template: `
<ImageUploader v-model="internalValue" :binaryFileTypeGuid="binaryFileType" uploadAsTemporary />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "ImageField.Configuration",
                components: {
                    CheckBox,
                    DropDownList
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const fileType = ref("");
                    const formatAsLink = ref(false);
                    const fileTypeOptions = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationProperties["binaryFileTypes"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d;
                        const newValue = {};
                        newValue["binaryFileType"] = (_a = fileType.value) !== null && _a !== void 0 ? _a : "";
                        newValue["formatAsLink"] = (_b = asTrueFalseOrNull(formatAsLink.value)) !== null && _b !== void 0 ? _b : "False";
                        const anyValueChanged = newValue["binaryFileType"] !== ((_c = props.modelValue["binaryFileType"]) !== null && _c !== void 0 ? _c : "")
                            || newValue["formatAsLink"] !== ((_d = props.modelValue["formatAsLink"]) !== null && _d !== void 0 ? _d : "False");
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
                        var _a;
                        fileType.value = props.modelValue["binaryFileType"];
                        formatAsLink.value = (_a = asBooleanOrNull(props.modelValue["formatAsLink"])) !== null && _a !== void 0 ? _a : false;
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(fileType, () => { var _a; return maybeUpdateConfiguration("binaryFileType", (_a = fileType.value) !== null && _a !== void 0 ? _a : ""); });
                    watch(formatAsLink, () => { var _a; return maybeUpdateConfiguration("formatAsLink", (_a = asTrueFalseOrNull(formatAsLink.value)) !== null && _a !== void 0 ? _a : "False"); });
                    return {
                        fileType,
                        fileTypeOptions,
                        formatAsLink
                    };
                },
                template: `
<div>
    <DropDownList v-model="fileType"
        label="File Type"
        help="File type to use to store and retrieve the file. New file types can be configured under 'Admins Tools &gt; General Settings &gt; File Types'."
        :items="fileTypeOptions" />

    <CheckBox v-model="formatAsLink"
        label="Format as Link"
        help="Enable this to navigate to a full size image when the image is clicked." />
</div>
`
            }));

        })
    };
}));
