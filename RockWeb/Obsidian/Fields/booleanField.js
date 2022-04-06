System.register(["vue", "../Services/boolean", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, boolean_1, fieldType_1, editComponent, configurationComponent, BooleanFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./booleanFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./booleanFieldComponents")).ConfigurationComponent;
            }));
            BooleanFieldType = class BooleanFieldType extends fieldType_1.FieldTypeBase {
                getCondensedTextValue(value) {
                    const boolValue = boolean_1.asBooleanOrNull(value.value);
                    if (boolValue === null) {
                        return "";
                    }
                    else if (boolValue === true) {
                        return "Y";
                    }
                    else {
                        return "N";
                    }
                }
                getTextValueFromConfiguration(value, configurationValues) {
                    const boolValue = boolean_1.asBooleanOrNull(value);
                    if (boolValue === null) {
                        return "";
                    }
                    else if (boolValue === true) {
                        return configurationValues["truetext"] || "Yes";
                    }
                    else {
                        return configurationValues["falsetext"] || "No";
                    }
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
            };
            exports_1("BooleanFieldType", BooleanFieldType);
        }
    };
});
//# sourceMappingURL=booleanField.js.map