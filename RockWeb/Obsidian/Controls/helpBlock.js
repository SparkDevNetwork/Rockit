System.register(['vue', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, JavaScriptAnchor;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            JavaScriptAnchor = module["default"];
        }],
        execute: (function () {

            const HelpBlock = exports('default', defineComponent({
                name: "HelpBlock",
                components: {
                    JavaScriptAnchor
                },
                props: {
                    text: {
                        type: String,
                        required: true
                    }
                },
                mounted() {
                    const jquery = window["$"];
                    jquery(this.$el).tooltip();
                },
                template: `
<JavaScriptAnchor class="help" tabindex="-1" data-toggle="tooltip" data-placement="auto" data-container="body" data-html="true" title="" :data-original-title="text">
    <i class="fa fa-info-circle"></i>
</JavaScriptAnchor>`
            }));

        })
    };
}));
