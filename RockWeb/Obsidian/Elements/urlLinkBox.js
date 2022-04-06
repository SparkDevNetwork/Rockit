System.register(["../Rules/index", "../Util/component", "vue", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var index_1, component_1, vue_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "UrlLinkBox",
                components: {
                    RockFormField: rockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    rules: index_1.rulesPropType,
                    requiresTrailingSlash: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const value = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const computedRules = vue_1.computed(() => {
                        const rules = index_1.normalizeRules(props.rules);
                        if (rules.indexOf("url") === -1) {
                            rules.push("url");
                        }
                        if (props.requiresTrailingSlash) {
                            rules.push({
                                name: "endswith",
                                params: ["/"]
                            });
                        }
                        return rules;
                    });
                    return {
                        computedRules,
                        value
                    };
                },
                template: `
<RockFormField
    :modelValue="value"
    formGroupClasses="url-link-box"
    name="urlbox"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fa fa-link"></i>
                </span>
                <input v-model="value" :id="uniqueId" class="form-control" v-bind="field" type="url" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=urlLinkBox.js.map