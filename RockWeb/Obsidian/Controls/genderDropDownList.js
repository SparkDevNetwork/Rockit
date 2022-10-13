System.register(['vue', '@Obsidian/ValidationRules', './dropDownList.js', 'ant-design-vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils'], (function (exports) {
    'use strict';
    var defineComponent, computed, rulesPropType, normalizeRules, DropDownList;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            DropDownList = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var genderDropDownList = exports('default', defineComponent({
                name: "GenderDropDownList",
                components: {
                    DropDownList
                },
                props: {
                    rules: rulesPropType
                },
                setup(props) {
                    const options = [
                        { text: " ", value: 0..toString() },
                        { text: "Male", value: 1..toString() },
                        { text: "Female", value: 2..toString() }
                    ];
                    const computedRules = computed(() => {
                        const rules = normalizeRules(props.rules);
                        const notEqualRule = `notequal:${0}`;
                        if (rules.includes("required") && !rules.includes(notEqualRule)) {
                            rules.push(notEqualRule);
                        }
                        return rules;
                    });
                    return {
                        computedRules,
                        options
                    };
                },
                template: `
<DropDownList label="Gender" :items="options" :showBlankItem="false" :rules="computedRules" />
`
            }));

        })
    };
}));
