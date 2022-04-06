System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function deepEqual(a, b, strict) {
        if (strict && a === b) {
            return true;
        }
        else if (!strict && a == b) {
            return true;
        }
        if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) {
            return true;
        }
        if (a && b && typeof a === "object" && typeof b === "object") {
            if (Array.isArray(a) !== Array.isArray(b)) {
                return false;
            }
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                for (let i = 0; i < a.length; i++) {
                    if (!deepEqual(a[i], b[i], strict)) {
                        return false;
                    }
                }
                return true;
            }
            else {
                if (a.constructor !== b.constructor) {
                    return false;
                }
                const aEntries = Object.entries(a).sort((a, b) => a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
                const bEntries = Object.entries(b).sort((a, b) => a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
                if (aEntries.length !== bEntries.length) {
                    return false;
                }
                for (let i = 0; i < aEntries.length; i++) {
                    const aEntry = aEntries[i];
                    const bEntry = bEntries[i];
                    if (!deepEqual(aEntry[0], bEntry[0], true)) {
                        return false;
                    }
                    if (!deepEqual(aEntry[1], bEntry[1], strict)) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    exports_1("deepEqual", deepEqual);
    function updateRefValue(target, value) {
        if (deepEqual(target.value, value, true)) {
            return false;
        }
        target.value = value;
        return true;
    }
    exports_1("updateRefValue", updateRefValue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=util.js.map