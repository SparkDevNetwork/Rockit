System.register(['@Obsidian/Utility/numberUtils', './comparisonType.js'], (function (exports) {
    'use strict';
    var toNumber, getComparisonName;
    return {
        setters: [function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            getComparisonName = module.getComparisonName;
        }],
        execute: (function () {

            exports('getFilteredComparisonTypeOptions', getFilteredComparisonTypeOptions);

            const comparisonTypeOptions = exports('comparisonTypeOptions', [
                {
                    value: 1..toString(),
                    text: getComparisonName(1)
                },
                {
                    value: 2..toString(),
                    text: getComparisonName(2)
                },
                {
                    value: 8..toString(),
                    text: getComparisonName(8)
                },
                {
                    value: 16..toString(),
                    text: getComparisonName(16)
                },
                {
                    value: 32..toString(),
                    text: getComparisonName(32)
                },
                {
                    value: 64..toString(),
                    text: getComparisonName(64)
                },
                {
                    value: 128..toString(),
                    text: getComparisonName(128)
                },
                {
                    value: 256..toString(),
                    text: getComparisonName(256)
                },
                {
                    value: 512..toString(),
                    text: getComparisonName(512)
                },
                {
                    value: 1024..toString(),
                    text: getComparisonName(1024)
                },
                {
                    value: 4..toString(),
                    text: getComparisonName(4)
                },
                {
                    value: 2048..toString(),
                    text: getComparisonName(2048)
                },
                {
                    value: 4096..toString(),
                    text: getComparisonName(4096)
                },
                {
                    value: 8192..toString(),
                    text: getComparisonName(8192)
                }
            ]);
            function getFilteredComparisonTypeOptions(...comparisonTypes) {
                let realComparisonTypes = 0;
                for (const comparisonType of comparisonTypes) {
                    realComparisonTypes |= comparisonType;
                }
                return comparisonTypeOptions.filter(c => {
                    return (realComparisonTypes & toNumber(c.value)) !== 0;
                });
            }

        })
    };
}));
