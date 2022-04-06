System.register([], function (exports_1, context_1) {
    "use strict";
    var binaryComparisonTypes, stringComparisonTypes, containsComparisonTypes, numericComparisonTypes, dateComparisonTypes;
    var __moduleName = context_1 && context_1.id;
    function getComparisonName(type) {
        switch (type) {
            case 1:
                return "Equal To";
            case 2:
                return "Not Equal To";
            case 4:
                return "Starts With";
            case 8:
                return "Contains";
            case 16:
                return "Does Not Contain";
            case 32:
                return "Is Blank";
            case 64:
                return "Is Not Blank";
            case 128:
                return "Greater Than";
            case 256:
                return "Greater Than Or Equal To";
            case 512:
                return "Less Than";
            case 1024:
                return "Less Than Or Equal To";
            case 2048:
                return "Ends With";
            case 4096:
                return "Between";
            case 8192:
                return "Regular Expression";
            default:
                return "";
        }
    }
    exports_1("getComparisonName", getComparisonName);
    function isCompareVisibleForComparisonFilter(comparisonType, filterMode) {
        if (filterMode !== 0) {
            return true;
        }
        const isHideable = comparisonType === binaryComparisonTypes
            || comparisonType === stringComparisonTypes
            || comparisonType === containsComparisonTypes;
        return !isHideable;
    }
    exports_1("isCompareVisibleForComparisonFilter", isCompareVisibleForComparisonFilter);
    function isSingleComparisonType(comparisionType) {
        return comparisionType === 1
            || comparisionType === 2
            || comparisionType === 4
            || comparisionType === 8
            || comparisionType === 16
            || comparisionType === 32
            || comparisionType === 64
            || comparisionType === 128
            || comparisionType === 256
            || comparisionType === 512
            || comparisionType === 1024
            || comparisionType === 2048
            || comparisionType === 4096
            || comparisionType === 8192;
    }
    exports_1("isSingleComparisonType", isSingleComparisonType);
    return {
        setters: [],
        execute: function () {
            exports_1("binaryComparisonTypes", binaryComparisonTypes = 1
                | 2);
            exports_1("stringComparisonTypes", stringComparisonTypes = 8
                | 16
                | 1
                | 2
                | 32
                | 64
                | 4
                | 2048);
            exports_1("containsComparisonTypes", containsComparisonTypes = 8
                | 16
                | 32);
            exports_1("numericComparisonTypes", numericComparisonTypes = 1
                | 32
                | 64
                | 2
                | 128
                | 256
                | 512
                | 1024);
            exports_1("dateComparisonTypes", dateComparisonTypes = 1
                | 32
                | 64
                | 128
                | 256
                | 512
                | 1024
                | 4096);
        }
    };
});
//# sourceMappingURL=comparisonType.js.map