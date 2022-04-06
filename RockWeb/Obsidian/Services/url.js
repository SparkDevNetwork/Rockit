System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isUrl(val) {
        if (typeof val === "string") {
            const re = /^(http[s]?:\/\/)?[^\s(["<,>]*\.?[^\s[",><]*$/;
            return re.test(val);
        }
        return false;
    }
    exports_1("isUrl", isUrl);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=url.js.map