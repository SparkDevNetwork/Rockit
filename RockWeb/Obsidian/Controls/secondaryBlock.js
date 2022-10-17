System.register(['vue', '@Obsidian/PageState'], (function (exports) {
    'use strict';
    var defineComponent, useStore;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useStore = module.useStore;
        }],
        execute: (function () {

            const store = useStore();
            var secondaryBlock = exports('default', defineComponent({
                name: "SecondaryBlock",
                computed: {
                    isVisible() {
                        return store.state.areSecondaryBlocksShown;
                    }
                },
                template: `
<div class="secondary-block">
    <slot v-if="isVisible" />
</div>`
            }));

        })
    };
}));
