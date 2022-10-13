System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            var JavaScriptAnchor = exports('default', defineComponent({
                name: "JavaScriptAnchor",
                template: `
<a href="javascript:void(0);"><slot /></a>`
            }));

        })
    };
}));
