System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1, sourcesKey;
    var __moduleName = context_1 && context_1.id;
    function provideSources(sources) {
        vue_1.provide(sourcesKey, sources);
    }
    exports_1("provideSources", provideSources);
    function useSources() {
        var _a;
        return (_a = vue_1.inject(sourcesKey)) !== null && _a !== void 0 ? _a : {};
    }
    exports_1("useSources", useSources);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            sourcesKey = Symbol();
        }
    };
});
//# sourceMappingURL=utils.js.map