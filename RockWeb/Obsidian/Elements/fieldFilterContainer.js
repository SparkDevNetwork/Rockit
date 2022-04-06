System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1, vue_2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_2.defineComponent({
                name: "FieldFilterContainer",
                props: {
                    compareLabel: {
                        type: String
                    },
                },
                setup(props, ctx) {
                    const hasCompareColumn = vue_1.computed(() => !!ctx.slots.compare || !!props.compareLabel);
                    const hasCompareLabel = vue_1.computed(() => !!props.compareLabel);
                    const compareColumnClass = vue_1.computed(() => {
                        if (ctx.slots.compare) {
                            return "col-md-4";
                        }
                        else if (props.compareLabel) {
                            return "col-md-2";
                        }
                        else {
                            return "";
                        }
                    });
                    const valueColumnClass = vue_1.computed(() => {
                        if (ctx.slots.compare) {
                            return "col-md-8";
                        }
                        else if (props.compareLabel) {
                            return "col-md-10";
                        }
                        else {
                            return "col-md-12";
                        }
                    });
                    return {
                        compareColumnClass,
                        hasCompareColumn,
                        hasCompareLabel,
                        valueColumnClass
                    };
                },
                template: `
<div class="row form-row field-criteria">
    <div v-if="hasCompareColumn" :class="compareColumnClass">
        <span v-if="hasCompareLabel" class="data-view-filter-label">{{ compareLabel }}</span>
        <slot v-else name="compare" />
    </div>

    <div :class="valueColumnClass">
        <slot />
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=fieldFilterContainer.js.map