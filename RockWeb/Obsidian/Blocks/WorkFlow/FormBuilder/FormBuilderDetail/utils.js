System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1, sourcesKey;
    var __moduleName = context_1 && context_1.id;
    function provideFormSources(options) {
        vue_1.provide(sourcesKey, options);
    }
    exports_1("provideFormSources", provideFormSources);
    function useFormSources() {
        var _a;
        return (_a = vue_1.inject(sourcesKey)) !== null && _a !== void 0 ? _a : {};
    }
    exports_1("useFormSources", useFormSources);
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