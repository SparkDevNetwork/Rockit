System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, computed;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }],
        execute: (function () {

            var fieldFilterContainer = exports('default', defineComponent({
                name: "FieldFilterContainer",
                props: {
                    compareLabel: {
                        type: String
                    },
                },
                setup(props, ctx) {
                    const hasCompareColumn = computed(() => !!ctx.slots.compare || !!props.compareLabel);
                    const hasCompareLabel = computed(() => !!props.compareLabel);
                    const compareColumnClass = computed(() => {
                        if (ctx.slots.compare) {
                            return "col-xs-12 col-md-4";
                        }
                        else if (props.compareLabel) {
                            return "col-xs-12 col-md-2";
                        }
                        else {
                            return "";
                        }
                    });
                    const valueColumnClass = computed(() => {
                        if (ctx.slots.compare) {
                            return "col-xs-12 col-md-8";
                        }
                        else if (props.compareLabel) {
                            return "col-xs-12 col-md-10";
                        }
                        else {
                            return "col-xs-12 col-md-12";
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

        })
    };
}));
