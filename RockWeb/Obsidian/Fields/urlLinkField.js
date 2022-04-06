System.register(["vue", "../Reporting/comparisonType", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, comparisonType_1, fieldType_1, editComponent, UrlLinkFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (comparisonType_1_1) {
                comparisonType_1 = comparisonType_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./urlLinkFieldComponents")).EditComponent;
            }));
            UrlLinkFieldType = class UrlLinkFieldType extends fieldType_1.FieldTypeBase {
                getHtmlValue(value) {
                    const textValue = this.getTextValue(value);
                    return textValue ? `<a href="${textValue}">${textValue}</a>` : "";
                }
                getEditComponent() {
                    return editComponent;
                }
                getSupportedComparisonTypes() {
                    return comparisonType_1.stringComparisonTypes;
                }
            };
            exports_1("UrlLinkFieldType", UrlLinkFieldType);
        }
    };
});
//# sourceMappingURL=urlLinkField.js.map