System.register(["vue", "../Reporting/comparisonType", "../Services/number", "../Services/string", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, comparisonType_1, number_1, string_1, fieldType_1, editComponent, configurationComponent, TimeFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (comparisonType_1_1) {
                comparisonType_1 = comparisonType_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
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
                return (yield context_1.import("./timeFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./timeFieldComponents")).ConfigurationComponent;
            }));
            TimeFieldType = class TimeFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, _configurationValues) {
                    const values = /^(\d+):(\d+)/.exec(value !== null && value !== void 0 ? value : "");
                    if (values === null || values.length < 3) {
                        return "";
                    }
                    let hour = number_1.toNumber(values[1]);
                    const minute = number_1.toNumber(values[2]);
                    const meridiem = hour >= 12 ? "PM" : "AM";
                    if (hour > 12) {
                        hour -= 12;
                    }
                    return `${hour}:${string_1.padLeft(minute.toString(), 2, "0")} ${meridiem}`;
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
                getSupportedComparisonTypes() {
                    return comparisonType_1.dateComparisonTypes;
                }
            };
            exports_1("TimeFieldType", TimeFieldType);
        }
    };
});
//# sourceMappingURL=timeField.js.map