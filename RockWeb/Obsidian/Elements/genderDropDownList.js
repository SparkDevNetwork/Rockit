System.register(["vue", "../Rules/index", "./dropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, index_1, dropDownList_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "GenderDropDownList",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: {
                    rules: index_1.rulesPropType
                },
                setup(props) {
                    const options = [
                        { text: "Male", value: 1..toString() },
                        { text: "Female", value: 2..toString() }
                    ];
                    const computedRules = vue_1.computed(() => {
                        const rules = index_1.normalizeRules(props.rules);
                        const notEqualRule = `notequal:${0}`;
                        if (rules.includes("required") && !rules.includes(notEqualRule)) {
                            rules.push(notEqualRule);
                        }
                        return rules;
                    });
                    return {
                        blankValue: `${0}`,
                        computedRules,
                        options
                    };
                },
                template: `
<DropDownList label="Gender" :options="options" :showBlankItem="true" :blankValue="blankValue" :rules="computedRules" />
`
            }));
        }
    };
});
//# sourceMappingURL=genderDropDownList.js.map