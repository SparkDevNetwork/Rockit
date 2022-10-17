System.register(['vue', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, onMounted, RockButton;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            onMounted = module.onMounted;
        }, function (module) {
            RockButton = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var copyButton = exports('default', defineComponent({
                name: "CopyButton",
                components: {
                    RockButton
                },
                props: {
                    value: {
                        type: String,
                        required: true
                    },
                    tooltip: {
                        type: String,
                        default: "Copy"
                    },
                    tooltipPlacement: {
                        type: String,
                        default: "auto"
                    }
                },
                setup(props) {
                    const el = ref(null);
                    let jEl;
                    function copy(e) {
                        e.preventDefault();
                        navigator.clipboard.writeText(props.value);
                        jEl.attr("data-original-title", "Copied")
                            .tooltip("show")
                            .attr("data-original-title", props.tooltip);
                    }
                    onMounted(() => {
                        var _a;
                        if (!el.value) {
                            return;
                        }
                        const jquery = window["$"];
                        jEl = jquery((_a = el.value) === null || _a === void 0 ? void 0 : _a.$el).tooltip();
                    });
                    return {
                        el,
                        copy
                    };
                },
                template: `
<RockButton
    class="btn-copy-to-clipboard"
    :onClick="copy"
    data-toggle="tooltip"
    :data-placement="tooltipPlacement"
    data-container="body"
    :data-original-title="tooltip"
    ref="el"
><i class="fa fa-clipboard"></i></RockButton>
`
            }));

        })
    };
}));
