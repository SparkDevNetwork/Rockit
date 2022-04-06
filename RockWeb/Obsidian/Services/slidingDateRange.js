System.register(["./number"], function (exports_1, context_1) {
    "use strict";
    var number_1, rangeTypeOptions, timeUnitOptions;
    var __moduleName = context_1 && context_1.id;
    function getTextForValue(value, options) {
        const matches = options.filter(v => v.value === value);
        return matches.length > 0 ? matches[0].text : "";
    }
    function getRangeTypeText(rangeType) {
        const rangeTypes = rangeTypeOptions.filter(o => o.value === rangeType.toString());
        return rangeTypes.length > 0 ? rangeTypes[0].text : "";
    }
    exports_1("getRangeTypeText", getRangeTypeText);
    function getTimeUnitText(timeUnit) {
        const timeUnits = timeUnitOptions.filter(o => o.value === timeUnit.toString());
        return timeUnits.length > 0 ? timeUnits[0].text : "";
    }
    exports_1("getTimeUnitText", getTimeUnitText);
    function parseSlidingDateRangeString(value) {
        var _a;
        const segments = value.split("|");
        if (segments.length < 3) {
            return null;
        }
        const rangeTypes = rangeTypeOptions.filter(o => o.text.replace(" ", "").toLowerCase() === segments[0].toLowerCase());
        const timeUnits = timeUnitOptions.filter(o => o.text.toLowerCase() === segments[2].toLowerCase());
        if (rangeTypes.length === 0) {
            return null;
        }
        const range = {
            rangeType: number_1.toNumber(rangeTypes[0].value)
        };
        if ([1, 0, 8, 4, 16].includes(range.rangeType)) {
            range.timeUnit = timeUnits.length > 0 ? number_1.toNumber(timeUnits[0].value) : 0;
            if ([0, 8, 4, 16].includes(range.rangeType)) {
                range.timeValue = (_a = number_1.toNumberOrNull(segments[1])) !== null && _a !== void 0 ? _a : 1;
            }
        }
        if (range.rangeType === 2) {
            if (segments.length > 3) {
                range.lowerDate = segments[3];
            }
            if (segments.length > 4) {
                range.upperDate = segments[4];
            }
        }
        return range;
    }
    exports_1("parseSlidingDateRangeString", parseSlidingDateRangeString);
    function slidingDateRangeToString(value) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (value.rangeType) {
            case 1:
                return `Current||${getTextForValue((_b = (_a = value.timeUnit) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "", timeUnitOptions)}||`;
            case 2:
                return `DateRange|||${(_c = value.lowerDate) !== null && _c !== void 0 ? _c : ""}|${(_d = value.upperDate) !== null && _d !== void 0 ? _d : ""}`;
            default:
                return `${getTextForValue(value.rangeType.toString(), rangeTypeOptions)}|${(_e = value.timeValue) !== null && _e !== void 0 ? _e : ""}|${getTextForValue((_g = (_f = value.timeUnit) === null || _f === void 0 ? void 0 : _f.toString()) !== null && _g !== void 0 ? _g : "", timeUnitOptions)}||`;
        }
    }
    exports_1("slidingDateRangeToString", slidingDateRangeToString);
    return {
        setters: [
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            exports_1("rangeTypeOptions", rangeTypeOptions = [
                {
                    value: 1..toString(),
                    text: "Current"
                },
                {
                    value: 4..toString(),
                    text: "Previous"
                },
                {
                    value: 0..toString(),
                    text: "Last"
                },
                {
                    value: 8..toString(),
                    text: "Next"
                },
                {
                    value: 16..toString(),
                    text: "Upcoming"
                },
                {
                    value: 2..toString(),
                    text: "Date Range"
                }
            ]);
            exports_1("timeUnitOptions", timeUnitOptions = [
                {
                    value: 0..toString(),
                    text: "Hour"
                },
                {
                    value: 1..toString(),
                    text: "Day"
                },
                {
                    value: 2..toString(),
                    text: "Week"
                },
                {
                    value: 3..toString(),
                    text: "Month"
                },
                {
                    value: 4..toString(),
                    text: "Year"
                },
            ]);
        }
    };
});
//# sourceMappingURL=slidingDateRange.js.map