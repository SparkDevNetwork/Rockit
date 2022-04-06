System.register(["vue", "../Services/string", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, string_1, fieldType_1, editComponent, configurationComponent, FileFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./fileFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./fileFieldComponents")).ConfigurationComponent;
            }));
            FileFieldType = class FileFieldType extends fieldType_1.FieldTypeBase {
                getTextValue(value, configurationValues) {
                    try {
                        const realValue = JSON.parse(value);
                        return realValue.text;
                    }
                    catch (_a) {
                        return value;
                    }
                }
                getHtmlValue(value, _configurationValues) {
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        return `<a href="/GetFile.ashx?guid=${realValue.value}" title="${string_1.escapeHtml(realValue.text)}" class="btn btn-xs btn-default">View</a>`;
                    }
                    catch (_a) {
                        return value !== null && value !== void 0 ? value : "";
                    }
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
                getSupportedComparisonTypes() {
                    return 32 | 64;
                }
            };
            exports_1("FileFieldType", FileFieldType);
        }
    };
});
//# sourceMappingURL=fileField.js.map