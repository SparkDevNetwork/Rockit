System.register([], (function (exports) {
    'use strict';
    return {
        execute: (function () {

            exports({
                getComparisonName: getComparisonName,
                isCompareVisibleForComparisonFilter: isCompareVisibleForComparisonFilter,
                isSingleComparisonType: isSingleComparisonType
            });

            const binaryComparisonTypes = exports('binaryComparisonTypes', 1
                | 2);
            const stringComparisonTypes = exports('stringComparisonTypes', 8
                | 16
                | 1
                | 2
                | 32
                | 64
                | 4
                | 2048);
            const containsComparisonTypes = exports('containsComparisonTypes', 8
                | 16
                | 32);
            const numericComparisonTypes = exports('numericComparisonTypes', 1
                | 32
                | 64
                | 2
                | 128
                | 256
                | 512
                | 1024);
            const dateComparisonTypes = exports('dateComparisonTypes', 1
                | 32
                | 64
                | 128
                | 256
                | 512
                | 1024
                | 4096);
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
            function isCompareVisibleForComparisonFilter(comparisonType, filterMode) {
                if (filterMode !== 0) {
                    return true;
                }
                const isHideable = comparisonType === binaryComparisonTypes
                    || comparisonType === stringComparisonTypes
                    || comparisonType === containsComparisonTypes;
                return !isHideable;
            }
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

        })
    };
}));
