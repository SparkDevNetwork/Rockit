System.register(["vue", "./configurableZone"], function (exports_1, context_1) {
    "use strict";
    var vue_1, configurableZone_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.FormContentZone",
                components: {
                    ConfigurableZone: configurableZone_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    placeholder: {
                        type: String,
                        required: true
                    },
                    isActive: {
                        type: Boolean,
                        default: false
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-pencil"
                    }
                },
                emits: [
                    "configure"
                ],
                setup(props, { emit }) {
                    const hasContent = vue_1.computed(() => !!props.modelValue);
                    const safeContent = vue_1.computed(() => {
                        if (!props.modelValue) {
                            return "";
                        }
                        const div = document.createElement("div");
                        div.innerHTML = props.modelValue;
                        return div.innerHTML;
                    });
                    const onConfigure = () => emit("configure");
                    return {
                        hasContent,
                        onConfigure,
                        safeContent
                    };
                },
                template: `
<ConfigurableZone :modelValue="isActive" :iconCssClass="iconCssClass" @configure="onConfigure">
    <div class="zone-body">
        <div v-if="hasContent" style="min-height: 24px;" v-html="safeContent"></div>
        <div v-else class="text-center text-muted">{{ placeholder }}</div>
    </div>
</ConfigurableZone>
`
            }));
        }
    };
});
//# sourceMappingURL=formContentZone.js.map