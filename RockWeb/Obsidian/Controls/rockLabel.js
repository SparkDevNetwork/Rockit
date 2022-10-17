System.register(['vue', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, HelpBlock;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            HelpBlock = module["default"];
        }, function () {}],
        execute: (function () {

            var RockLabel = exports('default', defineComponent({
                name: "RockLabel",
                components: {
                    HelpBlock
                },
                props: {
                    help: {
                        type: String,
                        default: ""
                    }
                },
                template: `
<label class="control-label">
    <slot />
    <HelpBlock v-if="help" :text="help" />
</label>`
            }));

        })
    };
}));
