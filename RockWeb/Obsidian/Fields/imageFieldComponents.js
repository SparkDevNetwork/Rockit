System.register(["vue", "./utils", "../Elements/checkBox", "../Elements/dropDownList", "../Elements/imageUploader", "../Util/util", "../Services/boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, checkBox_1, dropDownList_1, imageUploader_1, util_1, boolean_1, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (imageUploader_1_1) {
                imageUploader_1 = imageUploader_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "ImageField.Edit",
                components: {
                    ImageUploader: imageUploader_1.default
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
<ImageUploader v-model="internalValue" :binaryFileTypeGuid="binaryFileType" uploadAsTemporary />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "ImageField.Configuration",
                components: {
                    CheckBox: checkBox_1.default,
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
                    const formatAsLink = vue_1.ref(false);
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
                        var _a, _b, _c, _d;
                        const newValue = {};
                        newValue["binaryFileType"] = (_a = fileType.value) !== null && _a !== void 0 ? _a : "";
                        newValue["formatAsLink"] = (_b = boolean_1.asTrueFalseOrNull(formatAsLink.value)) !== null && _b !== void 0 ? _b : "False";
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
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a;
                        fileType.value = props.modelValue["binaryFileType"];
                        formatAsLink.value = (_a = boolean_1.asBooleanOrNull(props.modelValue["formatAsLink"])) !== null && _a !== void 0 ? _a : false;
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(fileType, () => { var _a; return maybeUpdateConfiguration("binaryFileType", (_a = fileType.value) !== null && _a !== void 0 ? _a : ""); });
                    vue_1.watch(formatAsLink, () => { var _a; return maybeUpdateConfiguration("formatAsLink", (_a = boolean_1.asTrueFalseOrNull(formatAsLink.value)) !== null && _a !== void 0 ? _a : "False"); });
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
        :options="fileTypeOptions" />

    <CheckBox v-model="formatAsLink"
        label="Format as Link"
        help="Enable this to navigate to a full size image when the image is clicked." />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=imageFieldComponents.js.map