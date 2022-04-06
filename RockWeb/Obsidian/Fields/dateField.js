System.register(["vue", "../Services/boolean", "../Services/number", "../Util/rockDateTime", "./fieldType"], function (exports_1, context_1) {
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
    var vue_1, boolean_1, number_1, rockDateTime_1, fieldType_1, editComponent, configurationComponent, DateFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
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
                return (yield context_1.import("./dateFieldComponents")).EditComponent;
            }));
            configurationComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dateFieldComponents")).ConfigurationComponent;
            }));
            DateFieldType = class DateFieldType extends fieldType_1.FieldTypeBase {
                getTextValueFromConfiguration(value, configurationValues) {
                    if (this.isCurrentDateValue(value)) {
                        const parts = (value !== null && value !== void 0 ? value : "").split(":");
                        const diff = parts.length === 2 ? number_1.toNumber(parts[1]) : 0;
                        if (diff === 1) {
                            return "Current Date plus 1 day";
                        }
                        else if (diff > 0) {
                            return `Current Date plus ${diff} days`;
                        }
                        else if (diff === -1) {
                            return "Current Date minus 1 day";
                        }
                        else if (diff < 0) {
                            return `Current Date minus ${Math.abs(diff)} days`;
                        }
                        else {
                            return "Current Date";
                        }
                    }
                    else if (value) {
                        const dateValue = rockDateTime_1.RockDateTime.parseISO(value);
                        const dateFormatTemplate = configurationValues["format"] || "MM/dd/yyy";
                        if (dateValue !== null) {
                            let textValue = dateValue.toASPString(dateFormatTemplate);
                            const displayDiff = boolean_1.asBoolean(configurationValues["displayDiff"]);
                            if (displayDiff === true) {
                                textValue = `${textValue} ${dateValue.toElapsedString()}`;
                            }
                            return textValue;
                        }
                        else {
                            return "";
                        }
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
                isCurrentDateValue(value) {
                    return value.indexOf("CURRENT") === 0;
                }
            };
            exports_1("DateFieldType", DateFieldType);
        }
    };
});
//# sourceMappingURL=dateField.js.map