System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, ref;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
        }],
        execute: (function () {

            var LoadingIndicator = exports('default', defineComponent({
                name: "LoadingIndicator",
                props: {
                    delay: {
                        type: Number,
                        default: 0
                    }
                },
                setup(props) {
                    const isShown = ref(!props.delay);
                    if (props.delay) {
                        setTimeout(() => isShown.value = true, props.delay);
                    }
                    return {
                        isShown
                    };
                },
                template: `
<div v-if="isShown" class="text-center fa-2x">
    <i class="fas fa-spinner fa-pulse"></i>
</div>`
            }));

        })
    };
}));
