System.register(["../Services/dateKey", "../Services/email", "../Services/url", "../Services/string", "../Services/number", "../Services/boolean"], function (exports_1, context_1) {
    "use strict";
    var dateKey_1, email_1, url_1, string_1, number_1, boolean_1, definedRules, rulesPropType;
    var __moduleName = context_1 && context_1.id;
    function parseRule(rule) {
        let name = "";
        let params = [];
        const colonIndex = rule.indexOf(":");
        if (colonIndex === -1) {
            name = rule;
        }
        else {
            name = rule.substring(0, colonIndex);
            params = rule.substring(colonIndex + 1).split(",");
        }
        return {
            name,
            params
        };
    }
    exports_1("parseRule", parseRule);
    function normalizeRules(rules) {
        if (typeof rules === "string") {
            if (rules.indexOf("|") !== -1) {
                return rules.split("|").filter(r => r !== "");
            }
            else if (rules !== "") {
                return [rules];
            }
        }
        else if (Array.isArray(rules)) {
            const normalizedRules = [];
            for (const r of rules) {
                normalizedRules.push(...normalizeRules(r));
            }
            return normalizedRules;
        }
        else if (typeof rules === "function") {
            return [rules];
        }
        else if (typeof rules === "object") {
            return [rules];
        }
        return [];
    }
    exports_1("normalizeRules", normalizeRules);
    function normalizeRulesToFunctions(rules) {
        const ruleFunctions = [];
        for (const rule of rules) {
            if (typeof rule === "string") {
                const ruleRef = parseRule(rule);
                const fn = definedRules[ruleRef.name];
                if (fn) {
                    ruleFunctions.push((value) => fn(value, ruleRef.params));
                }
                else {
                    console.warn(`Attempt to validate with unknown rule ${rule}.`);
                }
            }
            else if (typeof rule === "function") {
                ruleFunctions.push(rule);
            }
            else if (typeof rule === "object") {
                const fn = definedRules[rule.name];
                if (fn) {
                    ruleFunctions.push((value) => fn(value, rule.params));
                }
                else {
                    console.warn(`Attempt to validate with unknown rule ${rule.name}.`);
                }
            }
        }
        return ruleFunctions;
    }
    function normalizeRuleResult(result) {
        if (typeof result === "string") {
            return result;
        }
        else if (result === true) {
            return "";
        }
        else {
            return "failed validation";
        }
    }
    function validateValue(value, rule) {
        const fns = normalizeRulesToFunctions(normalizeRules(rule));
        const results = [];
        for (const fn of fns) {
            const result = normalizeRuleResult(fn(value));
            if (result !== "") {
                results.push(result);
            }
        }
        return results;
    }
    exports_1("validateValue", validateValue);
    function defineRule(ruleName, validator) {
        if (definedRules[ruleName] !== undefined) {
            console.warn(`Attempt to redefine validation rule ${ruleName}.`);
        }
        else {
            definedRules[ruleName] = validator;
        }
    }
    exports_1("defineRule", defineRule);
    function convertToNumber(value) {
        if (typeof value === "number") {
            return value;
        }
        if (typeof value === "string") {
            return number_1.toNumberOrNull(value) || 0;
        }
        return 0;
    }
    function isNumeric(value) {
        if (typeof value === "number") {
            return true;
        }
        if (typeof value === "string") {
            return number_1.toNumberOrNull(value) !== null;
        }
        return false;
    }
    return {
        setters: [
            function (dateKey_1_1) {
                dateKey_1 = dateKey_1_1;
            },
            function (email_1_1) {
                email_1 = email_1_1;
            },
            function (url_1_1) {
                url_1 = url_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (boolean_1_1) {
                boolean_1 = boolean_1_1;
            }
        ],
        execute: function () {
            definedRules = {};
            exports_1("rulesPropType", rulesPropType = {
                type: [Array, Object, String],
                default: ""
            });
            defineRule("required", (value, params) => {
                const options = params && params.length >= 1 && typeof params[0] === "string" ? JSON.parse(params[0]) : {};
                if (typeof value === "string") {
                    const allowEmptyString = !!(options.allowEmptyString);
                    if (!allowEmptyString && string_1.isNullOrWhiteSpace(value)) {
                        return "is required";
                    }
                    return true;
                }
                if (typeof value === "number" && value === 0) {
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
            defineRule("email", value => {
                if (string_1.isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (!email_1.isEmail(value)) {
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
                    if (value !== boolean_1.asBooleanOrNull(compare)) {
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
                    if (value === boolean_1.asBooleanOrNull(compare)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (!dateKey_1.default.getYear(asString)) {
                    return "must have a year";
                }
                if (!dateKey_1.default.getMonth(asString)) {
                    return "must have a month";
                }
                if (!dateKey_1.default.getDay(asString)) {
                    return "must have a day";
                }
                return true;
            });
            defineRule("integer", (value) => {
                if (string_1.isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (/^-?[0-9]+$/.test(String(value))) {
                    return true;
                }
                return "must be an integer value.";
            });
            defineRule("decimal", (value) => {
                if (string_1.isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (/^-?[0-9]+(\.[0-9]+)?$/.test(String(value))) {
                    return true;
                }
                return "must be a decimal value.";
            });
            defineRule("ssn", (value) => {
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
                    return true;
                }
                if (url_1.isUrl(String(value))) {
                    return true;
                }
                return "must be a valid URL";
            });
            defineRule("endswith", (value, params) => {
                const compare = params && params.length >= 1 ? params[0] : undefined;
                if (string_1.isNullOrWhiteSpace(value)) {
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
                if (string_1.isNullOrWhiteSpace(value)) {
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
        }
    };
});
//# sourceMappingURL=index.js.map