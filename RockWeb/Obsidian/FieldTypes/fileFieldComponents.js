System.register(['vue', './utils.js', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fileUploader', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, DropDownList, FileUploader, updateRefValue;
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
            DropDownList = module["default"];
        }, function (module) {
            FileUploader = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "FileField.Edit",
                components: {
                    FileUploader
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
<FileUploader v-model="internalValue" :binaryFileTypeGuid="binaryFileType" uploadAsTemporary />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "FileField.Configuration",
                components: {
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
                        var _a, _b;
                        const newValue = {};
                        newValue["binaryFileType"] = (_a = fileType.value) !== null && _a !== void 0 ? _a : "";
                        const anyValueChanged = newValue["binaryFileType"] !== ((_b = props.modelValue["binaryFileType"]) !== null && _b !== void 0 ? _b : "");
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
                        fileType.value = props.modelValue["binaryFileType"];
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(fileType, () => { var _a; return maybeUpdateConfiguration("binaryFileType", (_a = fileType.value) !== null && _a !== void 0 ? _a : ""); });
                    return {
                        fileType,
                        fileTypeOptions
                    };
                },
                template: `
<div>
    <DropDownList v-model="fileType"
        label="File Type"
        help="File type to use to store and retrieve the file. New file types can be configured under 'Admins Tools &gt; General Settings &gt; File Types'."
        :items="fileTypeOptions" />
</div>
`
            }));

        })
    };
}));
