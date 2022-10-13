System.register(['@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/dateKey', '@Obsidian/Utility/email', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/url', '@Obsidian/Utility/validationRules'], (function (exports) {
    'use strict';
    var asBooleanOrNull, DateKey, isEmail, toNumberOrNull, isNullOrWhiteSpace, isUrl, defineRule;
    return {
        setters: [function (module) {
            asBooleanOrNull = module.asBooleanOrNull;
        }, function (module) {
            DateKey = module["default"];
        }, function (module) {
            isEmail = module.isEmail;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            isNullOrWhiteSpace = module.isNullOrWhiteSpace;
        }, function (module) {
            isUrl = module.isUrl;
        }, function (module) {
            defineRule = module.defineRule;
            exports({ containsRequiredRule: module.containsRequiredRule, defineRule: module.defineRule, normalizeRules: module.normalizeRules, parseRule: module.parseRule, rulesPropType: module.rulesPropType, validateValue: module.validateValue });
        }],
        execute: (function () {

            function convertToNumber(value) {
                if (typeof value === "number") {
                    return value;
                }
                if (typeof value === "string") {
                    return toNumberOrNull(value) || 0;
                }
                return 0;
            }
            function isNumeric(value) {
                if (typeof value === "number") {
                    return true;
                }
                if (typeof value === "string") {
                    return toNumberOrNull(value) !== null;
                }
                return false;
            }
            defineRule("required", (value, params) => {
                const options = params && params.length >= 1 && typeof params[0] === "string" ? JSON.parse(params[0]) : {};
                if (typeof value === "string") {
                    const allowEmptyString = !!(options.allowEmptyString);
                    if (!allowEmptyString && isNullOrWhiteSpace(value)) {
                        return "is required";
                    }
                    return true;
                }
                if (typeof value === "number" && value === 0) {
                    return "is required";
                }
                if (Array.isArray(value) && value.length === 0) {
                    return "is required";
                }
                if (typeof value === "boolean") {
                    return true;
                }
                if (!value) {
                    return "is required";
                }
                return true;
            });
            defineRule("notblank", (value) => {
                if (value === undefined || value === null || value === "") {
                    return "cannot be blank";
                }
                return true;
            });
            defineRule("email", value => {
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (!isEmail(value)) {
                    return "must be a valid email";
                }
                return true;
            });
            defineRule("notequal", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) !== convertToNumber(compare)) {
                        return true;
                    }
                }
                else if (typeof value === "boolean") {
                    if (value !== asBooleanOrNull(compare)) {
                        return true;
                    }
                }
                else if (value !== compare) {
                    return true;
                }
                return `must not equal ${compare}`;
            });
            defineRule("equal", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) === convertToNumber(compare)) {
                        return true;
                    }
                }
                else if (typeof value === "boolean") {
                    if (value === asBooleanOrNull(compare)) {
                        return true;
                    }
                }
                else if (value === compare) {
                    return true;
                }
                return `must equal ${compare}`;
            });
            defineRule("gt", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) > convertToNumber(compare)) {
                        return true;
                    }
                }
                return `must be greater than ${compare}`;
            });
            defineRule("gte", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) >= convertToNumber(compare)) {
                        return true;
                    }
                }
                return `must not be less than ${compare}`;
            });
            defineRule("lt", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) < convertToNumber(compare)) {
                        return true;
                    }
                }
                return `must be less than ${compare}`;
            });
            defineRule("lte", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (isNumeric(value) && isNumeric(compare)) {
                    if (convertToNumber(value) <= convertToNumber(compare)) {
                        return true;
                    }
                }
                return `must not be more than ${compare}`;
            });
            defineRule("datekey", value => {
                const asString = value;
                if (!DateKey.getYear(asString)) {
                    return "must have a year";
                }
                if (!DateKey.getMonth(asString)) {
                    return "must have a month";
                }
                if (!DateKey.getDay(asString)) {
                    return "must have a day";
                }
                return true;
            });
            defineRule("integer", (value) => {
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (/^-?[0-9]+$/.test(String(value))) {
                    return true;
                }
                return "must be an integer value.";
            });
            defineRule("decimal", (value) => {
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (/^-?[0-9]+(\.[0-9]+)?$/.test(String(value))) {
                    return true;
                }
                return "must be a decimal value.";
            });
            defineRule("ssn", (value) => {
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(String(value))) {
                    return true;
                }
                if (/^[0-9]{9}$/.test(String(value))) {
                    return true;
                }
                return "must be a valid social security number";
            });
            defineRule("url", (value) => {
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (isUrl(String(value))) {
                    return true;
                }
                return "must be a valid URL";
            });
            defineRule("endswith", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (!String(compare)) {
                    return true;
                }
                if (String(value).endsWith(String(compare))) {
                    return true;
                }
                return `must end with "${compare}"`;
            });
            defineRule("startswith", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (!String(compare)) {
                    return true;
                }
                if (String(value).startsWith(String(compare))) {
                    return true;
                }
                return `must start with "${compare}"`;
            });

        })
    };
}));
