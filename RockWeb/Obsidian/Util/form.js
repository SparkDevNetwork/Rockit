System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1, formStateSymbol;
    var __moduleName = context_1 && context_1.id;
    function provideFormState(state) {
        vue_1.provide(formStateSymbol, state);
    }
    exports_1("provideFormState", provideFormState);
    function useFormState() {
        return vue_1.inject(formStateSymbol);
    }
    exports_1("useFormState", useFormState);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            formStateSymbol = Symbol();
        }
    };
});
//# sourceMappingURL=form.js.map