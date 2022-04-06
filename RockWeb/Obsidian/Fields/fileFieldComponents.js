System.register(["vue", "./utils", "../Elements/dropDownList", "../Elements/fileUploader", "../Util/util"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, dropDownList_1, fileUploader_1, util_1, EditComponent, ConfigurationComponent;
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
            function (fileUploader_1_1) {
                fileUploader_1 = fileUploader_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "FileField.Edit",
                components: {
                    FileUploader: fileUploader_1.default
                },
                props: utils_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(null);
                    const binaryFileType = vue_1.computed(() => {
                        var _a;
                        return (_a = props.configurationValues["binaryFileType"]) !== null && _a !== void 0 ? _a : "";
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a;
                        try {
                            util_1.updateRefValue(internalValue, JSON.parse((_a = props.modelValue) !== null && _a !== void 0 ? _a : ""));
                        }
                        catch (_b) {
                            internalValue.value = null;
                        }
                    }, {
                        immediate: true
                    });
                    vue_1.watch(internalValue, () => {
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
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "FileField.Configuration",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const fileType = vue_1.ref("");
                    const fileTypeOptions = vue_1.computed(() => {
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
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        fileType.value = props.modelValue["binaryFileType"];
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(fileType, () => { var _a; return maybeUpdateConfiguration("binaryFileType", (_a = fileType.value) !== null && _a !== void 0 ? _a : ""); });
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
        :options="fileTypeOptions" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=fileFieldComponents.js.map