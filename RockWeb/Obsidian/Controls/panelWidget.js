System.register(['vue', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var defineComponent, RockButton;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            RockButton = module["default"];
        }, function () {}, function () {}],
        execute: (function () {

            var PanelWidget = exports('default', defineComponent({
                name: "PanelWidget",
                components: {
                    RockButton
                },
                props: {
                    isDefaultOpen: {
                        type: Boolean,
                        default: false
                    }
                },
                data() {
                    return {
                        isOpen: this.isDefaultOpen
                    };
                },
                methods: {
                    toggle() {
                        this.isOpen = !this.isOpen;
                    }
                },
                template: `
<section class="panel panel-widget rock-panel-widget">
    <header class="panel-heading clearfix cursor-pointer" @click="toggle">
        <div class="pull-left">
            <slot name="header" />
        </div>
        <div class="pull-right">
            <RockButton btnType="link" btnSize="xs">
                <i v-if="isOpen" class="fa fa-chevron-up"></i>
                <i v-else class="fa fa-chevron-down"></i>
            </RockButton>
        </div>
    </header>
    <div v-if="isOpen" class="panel-body">
        <slot />
    </div>
</section>`
            }));

        })
    };
}));
