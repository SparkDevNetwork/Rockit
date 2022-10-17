System.register(['tslib', 'vue', './alert.js', '@Obsidian/Utility/http', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, Alert, uploadBinaryFile, RockFormField;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            uploadBinaryFile = module.uploadBinaryFile;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var imageUploader = exports('default', defineComponent({
                name: "ImageUploader",
                components: {
                    Alert,
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    binaryFileTypeGuid: {
                        type: String,
                        default: "C1142570-8CD6-4A20-83B1-ACB47C1CD377"
                    },
                    uploadAsTemporary: {
                        type: Boolean,
                        default: true
                    },
                    uploadButtonText: {
                        type: String,
                        default: "Upload"
                    },
                    showDeleteButton: {
                        type: Boolean,
                        default: true
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const fileGuid = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");
                    const fileName = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "");
                    const isUploading = ref(false);
                    const uploadProgressText = ref("");
                    const uploadErrorMessage = ref("");
                    const fileInputElement = ref(null);
                    const dropZoneElement = ref(null);
                    const fileUrl = computed(() => {
                        if (fileGuid.value) {
                            return `/GetFile.ashx?guid=${fileGuid.value}`;
                        }
                        return null;
                    });
                    const thumbnailStyle = computed(() => {
                        const imageUrl = fileGuid.value ? `/GetImage.ashx?guid=${fileGuid.value}&width=500` : "/Assets/Images/no-picture.svg";
                        return {
                            backgroundImage: `url('${imageUrl}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "50%"
                        };
                    });
                    const isDeleteVisible = computed(() => {
                        return props.showDeleteButton && !!fileGuid.value;
                    });
                    const uploadFile = (file) => __awaiter(this, void 0, void 0, function* () {
                        var _e, _f;
                        isUploading.value = true;
                        uploadProgressText.value = "0%";
                        uploadErrorMessage.value = "";
                        try {
                            const result = yield uploadBinaryFile(file, props.binaryFileTypeGuid || "C1142570-8CD6-4A20-83B1-ACB47C1CD377", {
                                baseUrl: "/ImageUploader.ashx",
                                isTemporary: props.uploadAsTemporary,
                                progress: (progress, total, percent) => {
                                    uploadProgressText.value = `${percent}%`;
                                }
                            });
                            fileGuid.value = (_e = result.value) !== null && _e !== void 0 ? _e : "";
                            fileName.value = (_f = result.text) !== null && _f !== void 0 ? _f : "";
                        }
                        catch (e) {
                            uploadErrorMessage.value = String(e);
                        }
                        finally {
                            isUploading.value = false;
                        }
                    });
                    const onSelectFileClick = () => {
                        var _a;
                        if (!isUploading.value) {
                            (_a = fileInputElement.value) === null || _a === void 0 ? void 0 : _a.click();
                        }
                    };
                    const onRemoveFileClick = () => {
                        fileGuid.value = "";
                        fileName.value = "";
                    };
                    const onFileChange = () => {
                        if (isUploading.value) {
                            return;
                        }
                        if (fileInputElement.value && fileInputElement.value.files && fileInputElement.value.files.length > 0) {
                            uploadFile(fileInputElement.value.files[0]);
                        }
                    };
                    const onFileRemove = () => {
                        if (isUploading.value) {
                            return;
                        }
                        fileGuid.value = "";
                        fileName.value = "";
                    };
                    watch(dropZoneElement, () => {
                        if (dropZoneElement.value) {
                            dropZoneElement.value.addEventListener("dragover", event => {
                                if (!isUploading.value && event.dataTransfer) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    if (event.dataTransfer.items.length === 1 && event.dataTransfer.items[0].kind === "file") {
                                        event.dataTransfer.dropEffect = "copy";
                                    }
                                    else {
                                        event.dataTransfer.dropEffect = "none";
                                    }
                                }
                            });
                            dropZoneElement.value.addEventListener("drop", event => {
                                if (!isUploading.value && event.dataTransfer && event.dataTransfer.files.length > 0) {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    uploadFile(event.dataTransfer.files[0]);
                                }
                            });
                        }
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d;
                        fileGuid.value = (_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
                        fileName.value = (_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "";
                    });
                    watch([fileGuid, fileName], () => {
                        let newValue = undefined;
                        if (fileGuid.value) {
                            newValue = {
                                value: fileGuid.value,
                                text: fileName.value
                            };
                        }
                        emit("update:modelValue", newValue);
                    });
                    return {
                        dropZoneElement,
                        fileGuid,
                        fileInputElement,
                        fileName,
                        fileUrl,
                        isDeleteVisible,
                        isUploading,
                        onFileChange,
                        onFileRemove,
                        onRemoveFileClick,
                        onSelectFileClick,
                        thumbnailStyle,
                        uploadErrorMessage,
                        uploadProgressText
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="image-uploader"
    name="imageuploader">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <Alert v-if="uploadErrorMessage" alertType="warning">
                <strong><i class="fa fa-exclamation-triangle"></i> Warning </strong>
                <span>{{ uploadErrorMessage }}</span>
            </Alert>

            <div ref="dropZoneElement" :id="uniqueId" class="imageupload-group" @click="onSelectFileClick">
                <div class="imageupload-thumbnail" style="width: 100px; height: 100px;">
                    <a v-if="fileUrl" :class="thumbnailClass" :href="fileUrl" target="_blank" @click.stop>
                        <div class="imageupload-thumbnail-image" :style="thumbnailStyle"></div>
                    </a>
                    <div v-else class="imageupload-thumbnail-image" :style="thumbnailStyle"></div>

                    <div v-if="isDeleteVisible" class="imageupload-remove">
                        <a v-if="fileGuid" href="#" class="remove-file" title="Remove File" @click.prevent.stop="onRemoveFileClick">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>

                <div v-if="isUploading" class="upload-progress">
                    <i class="fa fa-refresh fa-spin fa-3x"></i>
                    <div>{{ uploadProgressText }}</div>
                </div>

                <div class="imageupload-dropzone">
                    <span>{{ uploadButtonText }}</span>
                    <input ref="fileInputElement" type="file" style="display: none;" @change="onFileChange" @remove="OnFileRemove" />
                </div>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
