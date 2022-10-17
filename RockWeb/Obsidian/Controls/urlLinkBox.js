System.register(['@Obsidian/ValidationRules', '@Obsidian/Utility/component', 'vue', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var rulesPropType, normalizeRules, useVModelPassthrough, defineComponent, computed, RockFormField;
    return {
        setters: [function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var urlLinkBox = exports('default', defineComponent({
                name: "UrlLinkBox",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    rules: rulesPropType,
                    requiresTrailingSlash: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const value = useVModelPassthrough(props, "modelValue", emit);
                    const computedRules = computed(() => {
                        const rules = normalizeRules(props.rules);
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

        })
    };
}));
