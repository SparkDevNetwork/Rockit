System.register(["vue", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, fieldType_1, editComponent, configurationComponent, ImageFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./imageFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./imageFieldComponents")).ConfigurationComponent;
            }));
            ImageFieldType = class ImageFieldType extends fieldType_1.FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a;
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return (_a = realValue.text) !== null && _a !== void 0 ? _a : "";
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getHtmlValue(value, _configurationValues) {
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return `<img src="/GetImage.ashx?guid=${realValue.value}" class="img-responsive" />`;
                    }
                    catch (_a) {
                        return value !== null && value !== void 0 ? value : "";
                    }
                }
                getCondensedHtmlValue(value, _configurationValues) {
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return `<img src="/GetImage.ashx?guid=${realValue.value}&width=120" class="img-responsive" />`;
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
            exports_1("ImageFieldType", ImageFieldType);
        }
    };
});
//# sourceMappingURL=imageField.js.map