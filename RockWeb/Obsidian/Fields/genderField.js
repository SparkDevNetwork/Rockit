System.register(["vue", "../Services/number", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, number_1, fieldType_1, editComponent, configurationComponent, GenderFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./genderFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./genderFieldComponents")).ConfigurationComponent;
            }));
            GenderFieldType = class GenderFieldType extends fieldType_1.FieldTypeBase {
                getTextValue(value) {
                    return value.textValue || "Unknown";
                }
                getTextValueFromConfiguration(value, _configurationValues) {
                    const numberValue = number_1.toNumberOrNull(value);
                    if (numberValue === 0) {
                        return "Unknown";
                    }
                    else if (numberValue === 1) {
                        return "Male";
                    }
                    else if (numberValue === 2) {
                        return "Female";
                    }
                    else {
                        return "";
                    }
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
            };
            exports_1("GenderFieldType", GenderFieldType);
        }
    };
});
//# sourceMappingURL=genderField.js.map