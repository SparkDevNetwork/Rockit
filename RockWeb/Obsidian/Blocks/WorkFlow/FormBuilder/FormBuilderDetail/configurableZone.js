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
                name: "Workflow.FormBuilderDetail.ConfigurableZone",
                components: {},
                props: {
                    modelValue: {
                        type: Boolean,
                        default: false
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-gear"
                    }
                },
                emits: [
                    "configure"
                ],
                setup(props, { emit }) {
                    const zoneClasses = vue_1.computed(() => {
                        const classes = ["configurable-zone"];
                        if (props.modelValue) {
                            classes.push("active");
                        }
                        return classes;
                    });
                    const onActionClick = () => {
                        emit("configure");
                    };
                    return {
                        onActionClick,
                        zoneClasses
                    };
                },
                template: `
<div class="configurable-zone" :class="zoneClasses">
    <div class="zone-content-container">
        <div class="zone-content">
            <slot />
        </div>
    </div>

    <div class="zone-actions">
        <slot name="preActions" />
        <i v-if="iconCssClass" :class="iconCssClass + ' fa-fw zone-action'" @click.stop="onActionClick"></i>
        <slot name="postActions" />
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=configurableZone.js.map