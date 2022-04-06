System.register(["vue", "../Services/number", "./fieldType", "./utils"], function (exports_1, context_1) {
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
    var vue_1, number_1, fieldType_1, utils_1, editComponent, filterComponent, configurationComponent, DayOfWeekFieldType;
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
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dayOfWeekFieldComponents")).EditComponent;
            }));
            filterComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dayOfWeekFieldComponents")).FilterComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dayOfWeekFieldComponents")).ConfigurationComponent;
            }));
            DayOfWeekFieldType = class DayOfWeekFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, _configurationValues) {
                    const dayValue = number_1.toNumberOrNull(value);
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
                }
                getEditComponent() {
                    return editComponent;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
                getFilterComponent() {
                    return utils_1.getStandardFilterComponent("Is", filterComponent);
                }
            };
            exports_1("DayOfWeekFieldType", DayOfWeekFieldType);
        }
    };
});
//# sourceMappingURL=dayOfWeekField.js.map