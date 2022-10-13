System.register(['vue', '@Obsidian/Controls/panel'], (function (exports) {
    'use strict';
    var defineComponent, Panel;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            Panel = module["default"];
        }],
        execute: (function () {

            var block = exports('default', defineComponent({
                name: "Block",
                components: {
                    Panel
                },
                props: {
                    title: {
                        type: String,
                        required: false
                    }
                },
                setup() {
                    return {};
                },
                template: `
<Panel type="block" :title="title">
    <template v-if="$slots.headerActions" #headerActions>
        <slot name="headerActions" />
    </template>

    <template v-if="$slots.drawer" #drawer>
        <slot name="drawer" />
    </template>

    <slot />
</Panel>`
            }));

        })
    };
}));
