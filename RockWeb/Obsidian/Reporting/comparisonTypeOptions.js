System.register(["../Services/number", "./comparisonType"], function (exports_1, context_1) {
    "use strict";
    var number_1, comparisonType_1, comparisonTypeOptions;
    var __moduleName = context_1 && context_1.id;
    function getFilteredComparisonTypeOptions(...comparisonTypes) {
        let realComparisonTypes = 0;
        for (const comparisonType of comparisonTypes) {
            realComparisonTypes |= comparisonType;
        }
        return comparisonTypeOptions.filter(c => {
            return (realComparisonTypes & number_1.toNumber(c.value)) !== 0;
        });
    }
    exports_1("getFilteredComparisonTypeOptions", getFilteredComparisonTypeOptions);
    return {
        setters: [
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (comparisonType_1_1) {
                comparisonType_1 = comparisonType_1_1;
            }
        ],
        execute: function () {
            exports_1("comparisonTypeOptions", comparisonTypeOptions = [
                {
                    value: 1..toString(),
                    text: comparisonType_1.getComparisonName(1)
                },
                {
                    value: 2..toString(),
                    text: comparisonType_1.getComparisonName(2)
                },
                {
                    value: 8..toString(),
                    text: comparisonType_1.getComparisonName(8)
                },
                {
                    value: 16..toString(),
                    text: comparisonType_1.getComparisonName(16)
                },
                {
                    value: 32..toString(),
                    text: comparisonType_1.getComparisonName(32)
                },
                {
                    value: 64..toString(),
                    text: comparisonType_1.getComparisonName(64)
                },
                {
                    value: 128..toString(),
                    text: comparisonType_1.getComparisonName(128)
                },
                {
                    value: 256..toString(),
                    text: comparisonType_1.getComparisonName(256)
                },
                {
                    value: 512..toString(),
                    text: comparisonType_1.getComparisonName(512)
                },
                {
                    value: 1024..toString(),
                    text: comparisonType_1.getComparisonName(1024)
                },
                {
                    value: 4..toString(),
                    text: comparisonType_1.getComparisonName(4)
                },
                {
                    value: 2048..toString(),
                    text: comparisonType_1.getComparisonName(2048)
                },
                {
                    value: 4096..toString(),
                    text: comparisonType_1.getComparisonName(4096)
                },
                {
                    value: 8192..toString(),
                    text: comparisonType_1.getComparisonName(8192)
                }
            ]);
        }
    };
});
//# sourceMappingURL=comparisonTypeOptions.js.map