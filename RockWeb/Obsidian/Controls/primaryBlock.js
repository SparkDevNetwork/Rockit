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
            var primaryBlock = exports('default', defineComponent({
                name: "PrimaryBlock",
                props: {
                    hideSecondaryBlocks: {
                        type: Boolean,
                        default: false
                    }
                },
                methods: {
                    setAreSecondaryBlocksShown(isVisible) {
                        store.setAreSecondaryBlocksShown(isVisible);
                    }
                },
                watch: {
                    hideSecondaryBlocks() {
                        this.setAreSecondaryBlocksShown(!this.hideSecondaryBlocks);
                    }
                },
                template: `<slot />`
            }));

        })
    };
}));
