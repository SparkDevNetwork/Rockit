System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            var gridRow = exports('default', defineComponent({
                name: "GridRow",
                props: {
                    rowContext: {
                        type: Object,
                        required: true
                    }
                },
                provide() {
                    return {
                        rowContext: this.rowContext
                    };
                },
                methods: {
                    onRowClick() {
                        if (!this.rowContext.isHeader) {
                            this.$emit("click:body", this.rowContext);
                        }
                        else {
                            this.$emit("click:header", this.rowContext);
                        }
                    }
                },
                template: `
<tr @click="onRowClick">
    <slot />
</tr>`
            }));

        })
    };
}));
