System.register(['@Obsidian/Utility/fieldTypes', './utils.js', 'tslib', '@Obsidian/Utility/component', './fieldType.js', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/guid', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/slidingDateRange', '@Obsidian/Utility/rockDateTime', '@Obsidian/Utility/linq', '@Obsidian/Utility/stringUtils', 'vue', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', './textFieldComponents.js', '@Obsidian/Controls/textBox', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/numberBox'], (function (exports, module) {
    'use strict';
    var registerFieldType, getStandardFilterComponent, __awaiter, defineAsyncComponent, FieldTypeBase, asBooleanOrNull, asBoolean, areEqual, numericComparisonTypes, dateComparisonTypes, containsComparisonTypes, stringComparisonTypes, toCurrencyOrNull, toNumber, toNumberOrNull, parseSlidingDateRangeString, getRangeTypeText, getTimeUnitText, RockDateTime, DateTimeFormat, List, escapeHtml, formatPhoneNumber, padLeft;
    return {
        setters: [function (module) {
            registerFieldType = module.registerFieldType;
        }, function (module) {
            getStandardFilterComponent = module.getStandardFilterComponent;
            exports('getFieldEditorProps', module.getFieldEditorProps);
        }, function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineAsyncComponent = module.defineAsyncComponent;
        }, function (module) {
            FieldTypeBase = module.FieldTypeBase;
        }, function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
            asBoolean = module.asBoolean;
        }, function (module) {
            areEqual = module.areEqual;
        }, function (module) {
            numericComparisonTypes = module.numericComparisonTypes;
            dateComparisonTypes = module.dateComparisonTypes;
            containsComparisonTypes = module.containsComparisonTypes;
            stringComparisonTypes = module.stringComparisonTypes;
        }, function (module) {
            toCurrencyOrNull = module.toCurrencyOrNull;
            toNumber = module.toNumber;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            parseSlidingDateRangeString = module.parseSlidingDateRangeString;
            getRangeTypeText = module.getRangeTypeText;
            getTimeUnitText = module.getTimeUnitText;
        }, function (module) {
            RockDateTime = module.RockDateTime;
            DateTimeFormat = module.DateTimeFormat;
        }, function (module) {
            List = module.List;
        }, function (module) {
            escapeHtml = module.escapeHtml;
            formatPhoneNumber = module.formatPhoneNumber;
            padLeft = module.padLeft;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const editComponent$u = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./addressFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$t = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./addressFieldComponents.js')).ConfigurationComponent;
            }));
            class AddressFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a, _b, _c, _d, _e;
                    try {
                        const addressValue = JSON.parse(value || "{}");
                        let textValue = `${(_a = addressValue.street1) !== null && _a !== void 0 ? _a : ""} ${(_b = addressValue.street2) !== null && _b !== void 0 ? _b : ""} ${(_c = addressValue.city) !== null && _c !== void 0 ? _c : ""}, ${(_d = addressValue.state) !== null && _d !== void 0 ? _d : ""} ${(_e = addressValue.postalCode) !== null && _e !== void 0 ? _e : ""}`;
                        textValue = textValue.replace(/  +/, " ");
                        textValue = textValue.replace(/^ +/, "");
                        textValue = textValue.replace(/ +$/, "");
                        return textValue === "," ? "" : textValue;
                    }
                    catch (_f) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$u;
                }
                getConfigurationComponent() {
                    return configurationComponent$t;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$t = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./booleanFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$s = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./booleanFieldComponents.js')).ConfigurationComponent;
            }));
            const filterComponent$9 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./booleanFieldComponents.js')).FilterComponent;
            }));
            class BooleanFieldType extends FieldTypeBase {
                getCondensedTextValue(value, _configurationValues) {
                    const boolValue = asBooleanOrNull(value);
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
                getTextValue(value, configurationValues) {
                    const boolValue = asBooleanOrNull(value);
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
                    return editComponent$t;
                }
                getConfigurationComponent() {
                    return configurationComponent$s;
                }
                getSupportedComparisonTypes() {
                    return 1 | 2;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$9);
                }
            }

            const editComponent$s = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./campusFieldComponents.js')).EditComponent;
            }));
            const filterComponent$8 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./campusFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$r = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./campusFieldComponents.js')).ConfigurationComponent;
            }));
            class CampusFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    if (value === undefined || value === null || value === "") {
                        return "";
                    }
                    try {
                        const values = JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const selectedValues = values.filter(o => o.value === value);
                        return selectedValues.map(o => o.text).join(", ");
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$s;
                }
                getConfigurationComponent() {
                    return configurationComponent$r;
                }
                getSupportedComparisonTypes() {
                    return 0;
                }
                getFilterValueText(value, configurationValues) {
                    var _a;
                    if (!value.value) {
                        return "";
                    }
                    try {
                        const rawValues = value.value.split(",");
                        const values = JSON.parse((_a = configurationValues === null || configurationValues === void 0 ? void 0 : configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const selectedValues = values.filter(o => rawValues.filter(v => areEqual(v, o.value)).length > 0);
                        return `'${selectedValues.map(o => o.text).join("' OR '")}'`;
                    }
                    catch (_b) {
                        return `'${value.value}'`;
                    }
                }
                getFilterComponent() {
                    return getStandardFilterComponent("Is", filterComponent$8);
                }
            }

            const editComponent$r = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./campusesFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$q = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./campusesFieldComponents.js')).ConfigurationComponent;
            }));
            class CampusesFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    if (value === undefined || value === null || value === "") {
                        return "";
                    }
                    try {
                        const values = JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const userValues = value.split(",");
                        const selectedValues = values.filter(o => { var _a; return userValues.includes((_a = o.value) !== null && _a !== void 0 ? _a : ""); });
                        return selectedValues.map(o => o.text).join(", ");
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$r;
                }
                getConfigurationComponent() {
                    return configurationComponent$q;
                }
            }

            const editComponent$q = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./colorFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$p = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./colorFieldComponents.js')).ConfigurationComponent;
            }));
            class ColorFieldType extends FieldTypeBase {
                getEditComponent() {
                    return editComponent$q;
                }
                getConfigurationComponent() {
                    return configurationComponent$p;
                }
            }

            const editComponent$p = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./currencyFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$o = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./currencyFieldComponents.js')).ConfigurationComponent;
            }));
            class CurrencyFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a;
                    return (_a = toCurrencyOrNull(value)) !== null && _a !== void 0 ? _a : "";
                }
                getEditComponent() {
                    return editComponent$p;
                }
                getConfigurationComponent() {
                    return configurationComponent$o;
                }
                getSupportedComparisonTypes() {
                    return numericComparisonTypes;
                }
            }

            const editComponent$o = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$n = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateFieldComponents.js')).ConfigurationComponent;
            }));
            const filterComponent$7 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateFieldComponents.js')).FilterComponent;
            }));
            class DateFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    if (this.isCurrentDateValue(value)) {
                        return this.getCurrentDateText(value);
                    }
                    else if (value) {
                        const dateValue = RockDateTime.parseISO(value);
                        const dateFormatTemplate = configurationValues["format"] || "MM/dd/yyy";
                        if (dateValue !== null) {
                            let textValue = dateValue.toASPString(dateFormatTemplate);
                            const displayDiff = asBoolean(configurationValues["displayDiff"]);
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
                    return editComponent$o;
                }
                getConfigurationComponent() {
                    return configurationComponent$n;
                }
                getSupportedComparisonTypes() {
                    return dateComparisonTypes;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$7, {
                        updateComparisonTypeNames: (options) => {
                            options.filter(o => o.value === 4096..toString())
                                .forEach(o => o.text = "Range");
                        }
                    });
                }
                getFilterValueDescription(value, configurationValues) {
                    if (value.comparisonType === 4096) {
                        return `During '${this.getFilterValueText(value, configurationValues)}'`;
                    }
                    return super.getFilterValueDescription(value, configurationValues);
                }
                getFilterValueText(value, _configurationValues) {
                    var _a, _b;
                    const filterValues = value.value.split("\t");
                    if (value.comparisonType === 4096 && filterValues.length > 1) {
                        const range = parseSlidingDateRangeString(filterValues[1]);
                        if (range === null) {
                            return filterValues[1];
                        }
                        const rangeTypeText = getRangeTypeText(range.rangeType);
                        const timeUnitValue = (_a = range.timeValue) !== null && _a !== void 0 ? _a : 1;
                        const timeUnitText = getTimeUnitText((_b = range.timeUnit) !== null && _b !== void 0 ? _b : 0) + (timeUnitValue !== 1 ? "s" : "");
                        if (range.rangeType === 1) {
                            return `${rangeTypeText} ${timeUnitText}`;
                        }
                        else if ([0, 4, 8, 16].includes(range.rangeType)) {
                            return `${rangeTypeText} ${timeUnitValue} ${timeUnitText}`;
                        }
                        else {
                            if (range.lowerDate && range.upperDate) {
                                return `${range.lowerDate} to ${range.upperDate}`;
                            }
                            else if (range.lowerDate) {
                                return `from ${range.lowerDate}`;
                            }
                            else if (range.upperDate) {
                                return `through ${range.upperDate}`;
                            }
                            else {
                                return "";
                            }
                        }
                    }
                    else {
                        if (this.isCurrentDateValue(filterValues[0])) {
                            return `'${this.getCurrentDateText(filterValues[0])}'`;
                        }
                        return filterValues[0] ? `'${filterValues[0]}'` : "";
                    }
                }
                isCurrentDateValue(value) {
                    return value.indexOf("CURRENT") === 0;
                }
                getCurrentDateText(value) {
                    const parts = (value !== null && value !== void 0 ? value : "").split(":");
                    const diff = parts.length === 2 ? toNumber(parts[1]) : 0;
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
            }

            const editComponent$n = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateRangeFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$m = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateRangeFieldComponents.js')).ConfigurationComponent;
            }));
            class DateRangeFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const dateParts = (value !== null && value !== void 0 ? value : "").split(",");
                    if (dateParts.length !== 2) {
                        return "";
                    }
                    const lowerDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[0]);
                    const upperDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[1]);
                    const lowerDate = lowerDateParts !== null ? RockDateTime.fromParts(toNumber(lowerDateParts[1]), toNumber(lowerDateParts[2]), toNumber(lowerDateParts[3])) : null;
                    const upperDate = upperDateParts !== null ? RockDateTime.fromParts(toNumber(upperDateParts[1]), toNumber(upperDateParts[2]), toNumber(upperDateParts[3])) : null;
                    if (lowerDate !== null && upperDate !== null) {
                        return `${lowerDate.toLocaleString(DateTimeFormat.DateShort)} to ${upperDate.toLocaleString(DateTimeFormat.DateShort)}`;
                    }
                    else if (lowerDate !== null) {
                        return `from ${lowerDate.toLocaleString(DateTimeFormat.DateShort)}`;
                    }
                    else if (upperDate !== null) {
                        return `through ${upperDate.toLocaleString(DateTimeFormat.DateShort)}`;
                    }
                    else {
                        return "";
                    }
                }
                getEditComponent() {
                    return editComponent$n;
                }
                getConfigurationComponent() {
                    return configurationComponent$m;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$m = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateTimeFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$l = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateTimeFieldComponents.js')).ConfigurationComponent;
            }));
            const filterComponent$6 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dateTimeFieldComponents.js')).FilterComponent;
            }));
            class DateTimeFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    if (this.isCurrentDateValue(value)) {
                        return this.getCurrentDateText(value);
                    }
                    else if (value) {
                        const dateValue = RockDateTime.parseISO(value);
                        const dateFormatTemplate = configurationValues["format"] || "MM/dd/yyy";
                        if (dateValue !== null) {
                            let textValue = dateValue.toASPString(dateFormatTemplate);
                            const displayDiff = asBoolean(configurationValues["displayDiff"]);
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
                    return editComponent$m;
                }
                getConfigurationComponent() {
                    return configurationComponent$l;
                }
                getSupportedComparisonTypes() {
                    return dateComparisonTypes;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$6, {
                        updateComparisonTypeNames: (options) => {
                            options.filter(o => o.value === 4096..toString())
                                .forEach(o => o.text = "Range");
                        }
                    });
                }
                getFilterValueDescription(value, configurationValues) {
                    if (value.comparisonType === 4096) {
                        return `During '${this.getFilterValueText(value, configurationValues)}'`;
                    }
                    return super.getFilterValueDescription(value, configurationValues);
                }
                getFilterValueText(value, _configurationValues) {
                    var _a, _b;
                    const filterValues = value.value.split("\t");
                    if (value.comparisonType === 4096 && filterValues.length > 1) {
                        const range = parseSlidingDateRangeString(filterValues[1]);
                        if (range === null) {
                            return filterValues[1];
                        }
                        const rangeTypeText = getRangeTypeText(range.rangeType);
                        const timeUnitValue = (_a = range.timeValue) !== null && _a !== void 0 ? _a : 1;
                        const timeUnitText = getTimeUnitText((_b = range.timeUnit) !== null && _b !== void 0 ? _b : 0) + (timeUnitValue !== 1 ? "s" : "");
                        if (range.rangeType === 1) {
                            return `${rangeTypeText} ${timeUnitText}`;
                        }
                        else if ([0, 4, 8, 16].includes(range.rangeType)) {
                            return `${rangeTypeText} ${timeUnitValue} ${timeUnitText}`;
                        }
                        else {
                            if (range.lowerDate && range.upperDate) {
                                return `${range.lowerDate} to ${range.upperDate}`;
                            }
                            else if (range.lowerDate) {
                                return `from ${range.lowerDate}`;
                            }
                            else if (range.upperDate) {
                                return `through ${range.upperDate}`;
                            }
                            else {
                                return "";
                            }
                        }
                    }
                    else {
                        if (this.isCurrentDateValue(filterValues[0])) {
                            return `'${this.getCurrentDateText(filterValues[0])}'`;
                        }
                        return filterValues[0] ? `'${filterValues[0]}'` : "";
                    }
                }
                isCurrentDateValue(value) {
                    return value.indexOf("CURRENT") === 0;
                }
                getCurrentDateText(value) {
                    const parts = value.split(":");
                    const diff = parts.length === 2 ? toNumber(parts[1]) : 0;
                    if (diff === 1) {
                        return "Current Time plus 1 minute";
                    }
                    else if (diff > 0) {
                        return `Current Time plus ${diff} minutes`;
                    }
                    else if (diff === -1) {
                        return "Current Time minus 1 minute";
                    }
                    else if (diff < 0) {
                        return `Current Time minus ${Math.abs(diff)} minutes`;
                    }
                    else {
                        return "Current Time";
                    }
                }
            }

            const editComponent$l = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dayOfWeekFieldComponents.js')).EditComponent;
            }));
            const filterComponent$5 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dayOfWeekFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$k = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./dayOfWeekFieldComponents.js')).ConfigurationComponent;
            }));
            class DayOfWeekFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const dayValue = toNumberOrNull(value);
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
                    return editComponent$l;
                }
                getConfigurationComponent() {
                    return configurationComponent$k;
                }
                getFilterComponent() {
                    return getStandardFilterComponent("Is", filterComponent$5);
                }
            }

            const editComponent$k = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./daysOfWeekFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$j = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./daysOfWeekFieldComponents.js')).ConfigurationComponent;
            }));
            class DaysOfWeekFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    if (value === null || value === undefined || value === "") {
                        return "";
                    }
                    return value.split(",")
                        .map(v => {
                        const dayValue = toNumberOrNull(v);
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
                    return editComponent$k;
                }
                getConfigurationComponent() {
                    return configurationComponent$j;
                }
                getSupportedComparisonTypes() {
                    return containsComparisonTypes;
                }
            }

            const editComponent$j = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./decimalFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$i = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./decimalFieldComponents.js')).ConfigurationComponent;
            }));
            class DecimalFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a, _b;
                    return (_b = (_a = toNumberOrNull(value)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                }
                getEditComponent() {
                    return editComponent$j;
                }
                getConfigurationComponent() {
                    return configurationComponent$i;
                }
                getSupportedComparisonTypes() {
                    return numericComparisonTypes;
                }
            }

            const editComponent$i = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./decimalRangeFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$h = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./decimalRangeFieldComponents.js')).ConfigurationComponent;
            }));
            class DecimalRangeFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    if (value === null || value === undefined || value === "" || value === ",") {
                        return "";
                    }
                    const numbers = value.split(",").map(v => toNumberOrNull(v));
                    if (numbers.length !== 2 || (numbers[0] === null && numbers[1] === null)) {
                        return "";
                    }
                    if (numbers[0] === null) {
                        return `through ${numbers[1]}`;
                    }
                    else if (numbers[1] === null) {
                        return `from ${numbers[0]}`;
                    }
                    else {
                        return `${numbers[0]} to ${numbers[1]}`;
                    }
                }
                getEditComponent() {
                    return editComponent$i;
                }
                getConfigurationComponent() {
                    return configurationComponent$h;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$h = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./definedValueFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$g = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./definedValueFieldComponents.js')).ConfigurationComponent;
            }));
            const filterComponent$4 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./definedValueFieldComponents.js')).FilterComponent;
            }));
            class DefinedValueFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    try {
                        const clientValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        try {
                            const values = JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                            const displayDescription = asBoolean(configurationValues["displaydescription"]);
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
                    return editComponent$h;
                }
                getConfigurationComponent() {
                    return configurationComponent$g;
                }
                getSupportedComparisonTypes() {
                    return containsComparisonTypes;
                }
                getFilterValueText(value, configurationValues) {
                    var _a, _b;
                    try {
                        const clientValue = JSON.parse((_a = value.value) !== null && _a !== void 0 ? _a : "");
                        const values = JSON.parse((_b = configurationValues === null || configurationValues === void 0 ? void 0 : configurationValues["values"]) !== null && _b !== void 0 ? _b : "[]");
                        const useDescription = asBoolean(configurationValues === null || configurationValues === void 0 ? void 0 : configurationValues["displaydescription"]);
                        const rawValues = clientValue.value.split(",");
                        const text = values.filter(v => rawValues.includes(v.value))
                            .map(v => useDescription ? v.description : v.text)
                            .join("' OR '");
                        return text ? `'${text}'` : "";
                    }
                    catch (_c) {
                        return "";
                    }
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$4);
                }
            }

            const editComponent$g = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./definedValueRangeFieldComponents.js')).EditComponent;
            }));
            class DefinedValueRangeFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    try {
                        const clientValue = JSON.parse(value);
                        try {
                            const values = new List(JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]"));
                            const displayDescription = asBoolean(configurationValues["displaydescription"]);
                            const rawValues = ((_b = clientValue.value) !== null && _b !== void 0 ? _b : "").split(",");
                            if (rawValues.length !== 2) {
                                return value;
                            }
                            const lowerValue = values.firstOrUndefined(v => (v === null || v === void 0 ? void 0 : v.value) === rawValues[0]);
                            const upperValue = values.firstOrUndefined(v => (v === null || v === void 0 ? void 0 : v.value) === rawValues[1]);
                            if (lowerValue === undefined && upperValue === undefined) {
                                return "";
                            }
                            if (displayDescription) {
                                return `${(_c = lowerValue === null || lowerValue === void 0 ? void 0 : lowerValue.description) !== null && _c !== void 0 ? _c : ""} to ${(_d = upperValue === null || upperValue === void 0 ? void 0 : upperValue.description) !== null && _d !== void 0 ? _d : ""}`;
                            }
                            else {
                                return `${(_e = lowerValue === null || lowerValue === void 0 ? void 0 : lowerValue.text) !== null && _e !== void 0 ? _e : ""} to ${(_f = upperValue === null || upperValue === void 0 ? void 0 : upperValue.text) !== null && _f !== void 0 ? _f : ""}`;
                            }
                        }
                        catch (_h) {
                            return (_g = clientValue.value) !== null && _g !== void 0 ? _g : "";
                        }
                    }
                    catch (_j) {
                        return value;
                    }
                }
                getCondensedTextValue(value, _configurationValues) {
                    var _a;
                    try {
                        const clientValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        return (_a = clientValue.text) !== null && _a !== void 0 ? _a : "";
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$g;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$f = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./emailFieldComponents.js')).EditComponent;
            }));
            const filterComponent$3 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./emailFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$f = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./emailFieldComponents.js')).ConfigurationComponent;
            }));
            class EmailFieldType extends FieldTypeBase {
                getHtmlValue(value, configurationValues) {
                    const textValue = this.getTextValue(value, configurationValues);
                    return textValue ? `<a href="mailto:${textValue}">${textValue}</a>` : "";
                }
                getEditComponent() {
                    return editComponent$f;
                }
                getConfigurationComponent() {
                    return configurationComponent$f;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$3);
                }
                getSupportedComparisonTypes() {
                    return stringComparisonTypes;
                }
            }

            const editComponent$e = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./fileFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$e = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./fileFieldComponents.js')).ConfigurationComponent;
            }));
            class FileFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    try {
                        const realValue = JSON.parse(value);
                        return (_a = realValue.text) !== null && _a !== void 0 ? _a : "";
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getHtmlValue(value, _configurationValues) {
                    var _a;
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        return `<a href="/GetFile.ashx?guid=${realValue.value}" title="${escapeHtml((_a = realValue.text) !== null && _a !== void 0 ? _a : "")}" class="btn btn-xs btn-default">View</a>`;
                    }
                    catch (_b) {
                        return value !== null && value !== void 0 ? value : "";
                    }
                }
                getEditComponent() {
                    return editComponent$e;
                }
                getConfigurationComponent() {
                    return configurationComponent$e;
                }
                getSupportedComparisonTypes() {
                    return 32 | 64;
                }
            }

            const editComponent$d = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./genderFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$d = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./genderFieldComponents.js')).ConfigurationComponent;
            }));
            class GenderFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const numberValue = toNumberOrNull(value);
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
                    return editComponent$d;
                }
                getConfigurationComponent() {
                    return configurationComponent$d;
                }
            }

            const editComponent$c = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./imageFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$c = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./imageFieldComponents.js')).ConfigurationComponent;
            }));
            class ImageFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a;
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return (_a = realValue.text) !== null && _a !== void 0 ? _a : "";
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getHtmlValue(value, _configurationValues) {
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return `<img src="/GetImage.ashx?guid=${realValue.value}" class="img-responsive" />`;
                    }
                    catch (_a) {
                        return value !== null && value !== void 0 ? value : "";
                    }
                }
                getCondensedHtmlValue(value, _configurationValues) {
                    try {
                        const realValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                        if (!realValue.value) {
                            return "";
                        }
                        return `<img src="/GetImage.ashx?guid=${realValue.value}&width=120" class="img-responsive" />`;
                    }
                    catch (_a) {
                        return value !== null && value !== void 0 ? value : "";
                    }
                }
                getEditComponent() {
                    return editComponent$c;
                }
                getConfigurationComponent() {
                    return configurationComponent$c;
                }
                getSupportedComparisonTypes() {
                    return 32 | 64;
                }
            }

            const editComponent$b = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./integerFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$b = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./integerFieldComponents.js')).ConfigurationComponent;
            }));
            class IntegerFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    var _a, _b;
                    return (_b = (_a = toNumberOrNull(value)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                }
                getEditComponent() {
                    return editComponent$b;
                }
                getConfigurationComponent() {
                    return configurationComponent$b;
                }
                getSupportedComparisonTypes() {
                    return numericComparisonTypes;
                }
            }

            const editComponent$a = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./integerRangeFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$a = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./integerRangeFieldComponents.js')).ConfigurationComponent;
            }));
            class IntegerRangeFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    if (value === "" || value === ",") {
                        return "";
                    }
                    const numbers = value.split(",").map(v => toNumberOrNull(v));
                    if (numbers.length !== 2 || (numbers[0] === null && numbers[1] === null)) {
                        return "";
                    }
                    if (numbers[0] === null) {
                        return `through ${numbers[1]}`;
                    }
                    else if (numbers[1] === null) {
                        return `from ${numbers[0]}`;
                    }
                    else {
                        return `${numbers[0]} to ${numbers[1]}`;
                    }
                }
                getEditComponent() {
                    return editComponent$a;
                }
                getConfigurationComponent() {
                    return configurationComponent$a;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$9 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./keyValueListFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$9 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./keyValueListFieldComponents.js')).ConfigurationComponent;
            }));
            class KeyValueListFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    try {
                        const clientValues = JSON.parse(value !== null && value !== void 0 ? value : "[]");
                        const configuredValues = new List(JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]"));
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
                    return editComponent$9;
                }
                getConfigurationComponent() {
                    return configurationComponent$9;
                }
                isFilterable() {
                    return false;
                }
            }

            const editComponent$8 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./memoFieldComponents.js')).EditComponent;
            }));
            const filterComponent$2 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./memoFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$8 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./memoFieldComponents.js')).ConfigurationComponent;
            }));
            class MemoFieldType extends FieldTypeBase {
                getEditComponent() {
                    return editComponent$8;
                }
                getConfigurationComponent() {
                    return configurationComponent$8;
                }
                getSupportedComparisonTypes() {
                    return stringComparisonTypes;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$2);
                }
            }

            const editComponent$7 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./monthDayFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$7 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./monthDayFieldComponents.js')).ConfigurationComponent;
            }));
            class MonthDayFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const components = (value).split("/");
                    if (components.length !== 2) {
                        return "";
                    }
                    const month = toNumber(components[0]);
                    const day = toNumber(components[1]);
                    if (month >= 1 && day >= 1 && month <= 12 && day <= 31) {
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return `${months[month - 1]} ${day}`;
                    }
                    else {
                        return "";
                    }
                }
                getEditComponent() {
                    return editComponent$7;
                }
                getConfigurationComponent() {
                    return configurationComponent$7;
                }
            }

            const editComponent$6 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./multiSelectFieldComponents.js')).EditComponent;
            }));
            const filterComponent$1 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./multiSelectFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$6 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./multiSelectFieldComponents.js')).ConfigurationComponent;
            }));
            class MultiSelectFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a;
                    if (value === "") {
                        return "";
                    }
                    try {
                        const values = JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const userValues = value.split(",");
                        const selectedValues = values.filter(v => { var _a; return userValues.includes((_a = v.value) !== null && _a !== void 0 ? _a : ""); });
                        return selectedValues.map(v => v.text).join(", ");
                    }
                    catch (_b) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$6;
                }
                getConfigurationComponent() {
                    return configurationComponent$6;
                }
                getSupportedComparisonTypes() {
                    return containsComparisonTypes;
                }
                getFilterComponent() {
                    return getStandardFilterComponent(this.getSupportedComparisonTypes(), filterComponent$1);
                }
                getFilterValueText(value, configurationValues) {
                    var _a;
                    if (value.value === "") {
                        return "";
                    }
                    try {
                        const rawValues = value.value.split(",");
                        const values = JSON.parse((_a = configurationValues === null || configurationValues === void 0 ? void 0 : configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const selectedValues = values.filter(v => { var _a; return rawValues.includes((_a = v.value) !== null && _a !== void 0 ? _a : ""); });
                        if (selectedValues.length >= 1) {
                            return `'${selectedValues.map(v => v.value).join("' OR '")}'`;
                        }
                        else {
                            return "";
                        }
                    }
                    catch (_b) {
                        return value.value;
                    }
                }
            }

            const editComponent$5 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./phoneNumberFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$5 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./phoneNumberFieldComponents.js')).ConfigurationComponent;
            }));
            class PhoneNumberFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    return formatPhoneNumber(value || "");
                }
                getEditComponent() {
                    return editComponent$5;
                }
                getConfigurationComponent() {
                    return configurationComponent$5;
                }
            }

            const editComponent$4 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./ratingFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$4 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./ratingFieldComponents.js')).ConfigurationComponent;
            }));
            class RatingFieldType extends FieldTypeBase {
                getHtmlValue(value, configurationValues) {
                    var _a, _b;
                    let ratingValue;
                    try {
                        ratingValue = JSON.parse(value !== null && value !== void 0 ? value : "");
                    }
                    catch (_c) {
                        ratingValue = null;
                    }
                    const rating = (_a = ratingValue === null || ratingValue === void 0 ? void 0 : ratingValue.value) !== null && _a !== void 0 ? _a : 0;
                    const maxRating = (_b = toNumberOrNull(configurationValues["max"])) !== null && _b !== void 0 ? _b : 5;
                    let html = "";
                    for (let i = 0; i < rating && i < maxRating; i++) {
                        html += `<i class="fa fa-rating-selected"></i>`;
                    }
                    for (let i = rating; i < maxRating; i++) {
                        html += `<i class="fa fa-rating-unselected"></i>`;
                    }
                    return html;
                }
                getEditComponent() {
                    return editComponent$4;
                }
                getConfigurationComponent() {
                    return configurationComponent$4;
                }
                getSupportedComparisonTypes() {
                    return numericComparisonTypes;
                }
            }

            const editComponent$3 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./singleSelectFieldComponents.js')).EditComponent;
            }));
            const filterComponent = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./singleSelectFieldComponents.js')).FilterComponent;
            }));
            const configurationComponent$3 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./singleSelectFieldComponents.js')).ConfigurationComponent;
            }));
            class SingleSelectFieldType extends FieldTypeBase {
                getTextValue(value, configurationValues) {
                    var _a, _b;
                    if (value === "") {
                        return "";
                    }
                    try {
                        const values = JSON.parse((_a = configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const selectedValues = values.filter(v => v.value === value);
                        if (selectedValues.length >= 1) {
                            return (_b = selectedValues[0].text) !== null && _b !== void 0 ? _b : "";
                        }
                        else {
                            return "";
                        }
                    }
                    catch (_c) {
                        return value;
                    }
                }
                getEditComponent() {
                    return editComponent$3;
                }
                getConfigurationComponent() {
                    return configurationComponent$3;
                }
                getFilterComponent() {
                    return getStandardFilterComponent("Is", filterComponent);
                }
                getFilterValueText(value, configurationValues) {
                    var _a;
                    if (value.value === "") {
                        return "";
                    }
                    try {
                        const rawValues = value.value.split(",");
                        const values = JSON.parse((_a = configurationValues === null || configurationValues === void 0 ? void 0 : configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        const selectedValues = values.filter(v => { var _a; return rawValues.includes((_a = v.value) !== null && _a !== void 0 ? _a : ""); });
                        if (selectedValues.length >= 1) {
                            return `'${selectedValues.map(v => v.value).join("' OR '")}'`;
                        }
                        else {
                            return "";
                        }
                    }
                    catch (_b) {
                        return value.value;
                    }
                }
            }

            const editComponent$2 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./ssnFieldComponents.js')).EditComponent;
            }));
            const configurationComponent$2 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./ssnFieldComponents.js')).ConfigurationComponent;
            }));
            class SSNFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const strippedValue = value.replace(/[^0-9]/g, "");
                    if (strippedValue.length !== 9) {
                        return "";
                    }
                    return `xxx-xx-${value.substr(5, 4)}`;
                }
                getEditComponent() {
                    return editComponent$2;
                }
                getConfigurationComponent() {
                    return configurationComponent$2;
                }
                isFilterable() {
                    return false;
                }
            }

            const configurationComponent$1 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./textFieldComponents.js')).ConfigurationComponent;
            }));
            class TextFieldType extends FieldTypeBase {
                getConfigurationComponent() {
                    return configurationComponent$1;
                }
                getSupportedComparisonTypes() {
                    return stringComparisonTypes;
                }
            }

            const editComponent$1 = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./timeFieldComponents.js')).EditComponent;
            }));
            const configurationComponent = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./timeFieldComponents.js')).ConfigurationComponent;
            }));
            class TimeFieldType extends FieldTypeBase {
                getTextValue(value, _configurationValues) {
                    const values = /^(\d+):(\d+)/.exec(value !== null && value !== void 0 ? value : "");
                    if (values === null || values.length < 3) {
                        return "";
                    }
                    let hour = toNumber(values[1]);
                    const minute = toNumber(values[2]);
                    const meridiem = hour >= 12 ? "PM" : "AM";
                    if (hour > 12) {
                        hour -= 12;
                    }
                    return `${hour}:${padLeft(minute.toString(), 2, "0")} ${meridiem}`;
                }
                getEditComponent() {
                    return editComponent$1;
                }
                getConfigurationComponent() {
                    return configurationComponent;
                }
                getSupportedComparisonTypes() {
                    return dateComparisonTypes;
                }
            }

            const editComponent = defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield module.import('./urlLinkFieldComponents.js')).EditComponent;
            }));
            class UrlLinkFieldType extends FieldTypeBase {
                getHtmlValue(value, configurationValues) {
                    const textValue = this.getTextValue(value, configurationValues);
                    return textValue ? `<a href="${textValue}">${textValue}</a>` : "";
                }
                getEditComponent() {
                    return editComponent;
                }
                getSupportedComparisonTypes() {
                    return stringComparisonTypes;
                }
            }

            registerFieldType("0A495222-23B7-41D3-82C8-D484CDB75D17", new AddressFieldType());
            registerFieldType("1EDAFDED-DFE6-4334-B019-6EECBA89E05A", new BooleanFieldType());
            registerFieldType("1B71FEF4-201F-4D53-8C60-2DF21F1985ED", new CampusFieldType());
            registerFieldType("69254F91-C97F-4C2D-9ACB-1683B088097B", new CampusesFieldType());
            registerFieldType("D747E6AE-C383-4E22-8846-71518E3DD06F", new ColorFieldType());
            registerFieldType("3EE69CBC-35CE-4496-88CC-8327A447603F", new CurrencyFieldType());
            registerFieldType("6B6AA175-4758-453F-8D83-FCD8044B5F36", new DateFieldType());
            registerFieldType("9C7D431C-875C-4792-9E76-93F3A32BB850", new DateRangeFieldType());
            registerFieldType("FE95430C-322D-4B67-9C77-DFD1D4408725", new DateTimeFieldType());
            registerFieldType("7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE", new DayOfWeekFieldType());
            registerFieldType("08943FF9-F2A8-4DB4-A72A-31938B200C8C", new DaysOfWeekFieldType());
            registerFieldType("C757A554-3009-4214-B05D-CEA2B2EA6B8F", new DecimalFieldType());
            registerFieldType("758D9648-573E-4800-B5AF-7CC29F4BE170", new DecimalRangeFieldType());
            registerFieldType("59D5A94C-94A0-4630-B80A-BB25697D74C7", new DefinedValueFieldType());
            registerFieldType("B5C07B16-844D-4620-82E3-4CCA8F5FC350", new DefinedValueRangeFieldType());
            registerFieldType("3D045CAE-EA72-4A04-B7BE-7FD1D6214217", new EmailFieldType());
            registerFieldType("6F9E2DD0-E39E-4602-ADF9-EB710A75304A", new FileFieldType());
            registerFieldType("2E28779B-4C76-4142-AE8D-49EA31DDB503", new GenderFieldType());
            registerFieldType("97F8157D-A8C8-4AB3-96A2-9CB2A9049E6D", new ImageFieldType());
            registerFieldType("A75DFC58-7A1B-4799-BF31-451B2BBE38FF", new IntegerFieldType());
            registerFieldType("9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4", new IntegerRangeFieldType());
            registerFieldType("73B02051-0D38-4AD9-BF81-A2D477DE4F70", new KeyValueListFieldType());
            registerFieldType("C28C7BF3-A552-4D77-9408-DEDCF760CED0", new MemoFieldType());
            registerFieldType("8BED8DD8-8167-4052-B807-A1E72C133611", new MonthDayFieldType());
            registerFieldType("BD0D9B57-2A41-4490-89FF-F01DAB7D4904", new MultiSelectFieldType());
            registerFieldType("6B1908EC-12A2-463A-A7BD-970CE0FAF097", new PhoneNumberFieldType());
            registerFieldType("24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862", new RatingFieldType());
            registerFieldType("7525C4CB-EE6B-41D4-9B64-A08048D5A5C0", new SingleSelectFieldType());
            registerFieldType("4722C99A-C078-464A-968F-13AB5E8E318F", new SSNFieldType());
            registerFieldType("9C204CD0-1233-41C5-818A-C5DA439445AA", new TextFieldType());
            registerFieldType("2F8F5EC4-57FA-4F6C-AB15-9D6616994580", new TimeFieldType());
            registerFieldType("C0D0D7E2-C3B0-4004-ABEA-4BBFAD10D5D2", new UrlLinkFieldType());

        })
    };
}));
