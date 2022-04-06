System.register(["vue", "../Reporting/comparisonType", "../Services/number", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, comparisonType_1, number_1, fieldType_1, editComponent, configurationComponent, DaysOfWeekFieldType;
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
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./daysOfWeekFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./daysOfWeekFieldComponents")).ConfigurationComponent;
            }));
            DaysOfWeekFieldType = class DaysOfWeekFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, _configurationValues) {
                    if (value === null || value === undefined || value === "") {
                        return "";
                    }
                    return value.split(",")
                        .map(v => {
                        const dayValue = number_1.toNumberOrNull(v);
                        if (dayValue === null) {
                            return "";
                        }
                        else {
                            switch (dayValue) {
                                case 0:
                                    return "Sunday";
                                case 1:
                                    return "Monday";
                                case 2:
                                    return "Tuesday";
                                case 3:
                                    return "Wednesday";
                                case 4:
                                    return "Thursday";
                                case 5:
                                    return "Friday";
                                case 6:
                                    return "Saturday";
                                default:
                                    return "";
                            }
                        }
                    })
                        .filter(v => v != "")
                        .join(", ");
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
                getSupportedComparisonTypes() {
                    return comparisonType_1.containsComparisonTypes;
                }
            };
            exports_1("DaysOfWeekFieldType", DaysOfWeekFieldType);
        }
    };
});
//# sourceMappingURL=daysOfWeekField.js.map