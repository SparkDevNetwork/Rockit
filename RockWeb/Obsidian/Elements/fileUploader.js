System.register(["vue", "../Elements/alert", "../Util/http", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, alert_1, http_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "FileUploader",
                components: {
                    Alert: alert_1.default,
                    RockFormField: rockFormField_1.default
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
                    const fileGuid = vue_1.ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");
                    const fileName = vue_1.ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "");
                    const isUploading = vue_1.ref(false);
                    const uploadProgressText = vue_1.ref("");
                    const uploadErrorMessage = vue_1.ref("");
                    const fileInputElement = vue_1.ref(null);
                    const dropZoneElement = vue_1.ref(null);
                    const fileUrl = vue_1.computed(() => {
                        if (fileGuid.value) {
                            return `/GetFile.ashx?guid=${fileGuid.value}`;
                        }
                        return null;
                    });
                    const thumbnailClass = vue_1.computed(() => {
                        return fileUrl.value ? "file-link file-exists" : "file-link";
                    });
                    const isDeleteVisible = vue_1.computed(() => {
                        return props.showDeleteButton && !!fileGuid.value;
                    });
                    const uploadFile = (file) => __awaiter(this, void 0, void 0, function* () {
                        isUploading.value = true;
                        uploadProgressText.value = "0%";
                        uploadErrorMessage.value = "";
                        try {
                            const result = yield http_1.uploadBinaryFile(file, props.binaryFileTypeGuid || "C1142570-8CD6-4A20-83B1-ACB47C1CD377", {
                                isTemporary: props.uploadAsTemporary,
                                progress: (progress, total, percent) => {
                                    uploadProgressText.value = `${percent}%`;
                                }
                            });
                            fileGuid.value = result.value;
                            fileName.value = result.text;
                        }
                        catch (e) {
                            uploadErrorMessage.value = e.toString();
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
                    vue_1.watch(dropZoneElement, () => {
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
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d;
                        fileGuid.value = (_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
                        fileName.value = (_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "";
                    });
                    vue_1.watch([fileGuid, fileName], () => {
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
                        thumbnailClass,
                        uploadErrorMessage,
                        uploadProgressText
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="file-uploader"
    name="fileuploader">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <Alert v-if="uploadErrorMessage" alertType="warning">
                <strong><i class="fa fa-exclamation-triangle"></i> Warning </strong>
                <span>{{ uploadErrorMessage }}</span>
            </Alert>

            <div ref="dropZoneElement" :id="uniqueId" class="fileupload-group" @click="onSelectFileClick">
                <div class="fileupload-thumbnail">
                    <a v-if="fileUrl" :class="thumbnailClass" :href="fileUrl" target="_blank" @click.stop>{{ fileName }}</a>
                    <span v-else :class="thumbnailClass"></span>

                    <div v-if="isDeleteVisible" class="fileupload-remove">
                        <a v-if="fileGuid" href="#" class="remove-file" title="Remove File" @click.prevent.stop="onRemoveFileClick">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>

                <div v-if="isUploading" class="upload-progress">
                    <i class="fa fa-refresh fa-spin fa-3x"></i>
                    <div>{{ uploadProgressText }}</div>
                </div>

                <div class="fileupload-dropzone">
                    <span>{{ uploadButtonText }}</span>
                    <input ref="fileInputElement" type="file" style="display: none;" @change="onFileChange" @remove="OnFileRemove" />
                </div>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=fileUploader.js.map