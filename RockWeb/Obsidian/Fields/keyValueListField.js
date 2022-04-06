System.register(["vue", "../Util/linq", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, linq_1, fieldType_1, editComponent, KeyValueListFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (linq_1_1) {
                linq_1 = linq_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./keyValueListFieldComponents")).EditComponent;
            }));
            KeyValueListFieldType = class KeyValueListFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, configurationValues) {
                    var _a;
                    try {
                        const clientValues = JSON.parse(value !== null && value !== void 0 ? value : "[]");
                        const configuredValues = new linq_1.List(JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]"));
                        const values = [];
                        for (const clientValue of clientValues) {
                            const configuredValue = configuredValues.firstOrUndefined(v => v.value === clientValue.value);
                            if (configuredValue !== undefined) {
                                values.push(`${clientValue.key}: ${configuredValue.text}`);
                            }
                            else {
                                values.push(`${clientValue.key}: ${clientValue.value}`);
                            }
                        }
                        return values.join(", ");
                    }
                    catch (_b) {
                        return "";
                    }
                }
                getEditComponent() {
                    return editComponent;
                }
            };
            exports_1("KeyValueListFieldType", KeyValueListFieldType);
        }
    };
});
//# sourceMappingURL=keyValueListField.js.map