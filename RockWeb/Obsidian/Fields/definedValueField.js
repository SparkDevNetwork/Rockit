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
    var vue_1, boolean_1, fieldType_1, editComponent, configurationComponent, DefinedValueFieldType;
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
                return (yield context_1.import("./definedValueFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./definedValueFieldComponents")).ConfigurationComponent;
            }));
            DefinedValueFieldType = class DefinedValueFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, configurationValues) {
                    var _a;
                    try {
                        const clientValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        try {
                            const values = JSON.parse((_a = configurationValues["selectableValues"]) !== null && _a !== void 0 ? _a : "[]");
                            const displayDescription = boolean_1.asBoolean(configurationValues["displaydescription"]);
                            const rawValues = clientValue.value.split(",");
                            return values.filter(v => rawValues.includes(v.value))
                                .map(v => displayDescription ? v.description : v.text)
                                .join(", ");
                        }
                        catch (_b) {
                            return clientValue.value;
                        }
                    }
                    catch (_c) {
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
            exports_1("DefinedValueFieldType", DefinedValueFieldType);
        }
    };
});
//# sourceMappingURL=definedValueField.js.map