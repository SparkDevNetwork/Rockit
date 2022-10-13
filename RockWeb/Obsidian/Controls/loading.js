System.register(['./loadingIndicator.js', 'vue'], (function (exports) {
    'use strict';
    var LoadingIndicator, defineComponent;
    return {
        setters: [function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            var loading = exports('default', defineComponent({
                name: "Loading",
                components: {
                    LoadingIndicator
                },
                props: {
                    isLoading: {
                        type: Boolean,
                        required: true
                    }
                },
                template: `
<div>
    <slot v-if="!isLoading" />
    <LoadingIndicator v-else />
</div>`
            }));

        })
    };
}));
