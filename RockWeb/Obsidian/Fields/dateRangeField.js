System.register(["vue", "../Services/number", "../Util/rockDateTime", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, number_1, rockDateTime_1, fieldType_1, editComponent, configurationComponent, DateRangeFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (rockDateTime_1_1) {
                rockDateTime_1 = rockDateTime_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dateRangeFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dateRangeFieldComponents")).ConfigurationComponent;
            }));
            DateRangeFieldType = class DateRangeFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, _configurationValues) {
                    const dateParts = (value !== null && value !== void 0 ? value : "").split(",");
                    if (dateParts.length !== 2) {
                        return "";
                    }
                    const lowerDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[0]);
                    const upperDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[1]);
                    const lowerDate = lowerDateParts !== null ? rockDateTime_1.RockDateTime.fromParts(number_1.toNumber(lowerDateParts[1]), number_1.toNumber(lowerDateParts[2]), number_1.toNumber(lowerDateParts[3])) : null;
                    const upperDate = upperDateParts !== null ? rockDateTime_1.RockDateTime.fromParts(number_1.toNumber(upperDateParts[1]), number_1.toNumber(upperDateParts[2]), number_1.toNumber(upperDateParts[3])) : null;
                    if (lowerDate !== null && upperDate !== null) {
                        return `${lowerDate.toLocaleString(rockDateTime_1.DateTimeFormat.DateShort)} to ${upperDate.toLocaleString(rockDateTime_1.DateTimeFormat.DateShort)}`;
                    }
                    else if (lowerDate !== null) {
                        return `from ${lowerDate.toLocaleString(rockDateTime_1.DateTimeFormat.DateShort)}`;
                    }
                    else if (upperDate !== null) {
                        return `through ${upperDate.toLocaleString(rockDateTime_1.DateTimeFormat.DateShort)}`;
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
                isFilterable() {
                    return false;
                }
            };
            exports_1("DateRangeFieldType", DateRangeFieldType);
        }
    };
});
//# sourceMappingURL=dateRangeField.js.map