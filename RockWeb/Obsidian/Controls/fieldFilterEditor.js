System.register(['vue', './dropDownList.js', '@Obsidian/Utility/guid', '@Obsidian/Utility/component', './fieldFilterRuleRow.js', 'ant-design-vue', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils', './textBox.js', './rockAttributeFilter.js', '@Obsidian/Utility/fieldTypes'], (function (exports) {
    'use strict';
    var defineComponent, TransitionGroup, ref, watch, DropDownList, newGuid, areEqual, updateRefValue, FieldFilterRuleRow;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            TransitionGroup = module.TransitionGroup;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            newGuid = module.newGuid;
            areEqual = module.areEqual;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            FieldFilterRuleRow = module.FieldFilterRuleRow;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const filterExpressionTypeMap = {
                Show: {
                    All: 1,
                    Any: 2
                },
                Hide: {
                    All: 3,
                    Any: 4
                }
            };
            const filterExpressionToShowHideMap = ["Show", "Show", "Hide", "Hide"];
            const filterExpressionToAllAnyMap = ["All", "Any", "All", "Any"];
            const showHideOptions = [
                { text: "Show", value: "Show" },
                { text: "Hide", value: "Hide" }
            ];
            const allAnyOptions = [
                { text: "All", value: "All" },
                { text: "Any", value: "Any" }
            ];
            var fieldFilterEditor = exports('default', defineComponent({
                name: "FieldVisibilityRulesEditor",
                components: {
                    TransitionGroup,
                    DropDownList,
                    FieldFilterRuleRow
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sources: {
                        type: Array,
                        required: true
                    },
                    title: {
                        type: String,
                        default: ""
                    },
                    allowNestedGroups: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: ["update:modelValue"],
                setup(props, { emit }) {
                    var _a;
                    const showHide = ref(filterExpressionToShowHideMap[props.modelValue.expressionType - 1]);
                    const allAny = ref(filterExpressionToAllAnyMap[props.modelValue.expressionType - 1]);
                    const rules = ref((_a = props.modelValue.rules) !== null && _a !== void 0 ? _a : []);
                    watch(() => props.allowNestedGroups, () => {
                        if (props.allowNestedGroups === true) {
                            console.warn("Nested Filter Groups are not supported yet. Please set `allowNestedGroups` to `false`.");
                        }
                    });
                    function onAddRuleClick() {
                        var _a;
                        rules.value = [
                            ...rules.value,
                            {
                                guid: newGuid(),
                                comparisonType: 0,
                                value: "",
                                sourceType: 0,
                                attributeGuid: (_a = props.sources[0].attribute) === null || _a === void 0 ? void 0 : _a.attributeGuid
                            }
                        ];
                    }
                    const onUpdateRule = (rule) => {
                        const newRules = [...rules.value];
                        const ruleIndex = newRules.findIndex(r => areEqual(r.guid, rule.guid));
                        if (ruleIndex !== -1) {
                            newRules.splice(ruleIndex, 1, rule);
                            rules.value = newRules;
                        }
                    };
                    function onRemoveRule(rule) {
                        rules.value = (rules.value || []).filter((val) => !areEqual(val.guid, rule.guid));
                    }
                    watch(() => props.modelValue, () => {
                        var _a;
                        showHide.value = filterExpressionToShowHideMap[props.modelValue.expressionType - 1];
                        allAny.value = filterExpressionToAllAnyMap[props.modelValue.expressionType - 1];
                        updateRefValue(rules, (_a = props.modelValue.rules) !== null && _a !== void 0 ? _a : []);
                    });
                    watch([showHide, allAny, rules], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { expressionType: filterExpressionTypeMap[showHide.value][allAny.value], rules: rules.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        allAny,
                        allAnyOptions,
                        onAddRuleClick,
                        onRemoveRule,
                        onUpdateRule,
                        rules,
                        showHide,
                        showHideOptions
                    };
                },
                template: `
<div class="filtervisibilityrules-container">
    <div class="filtervisibilityrules-rulesheader">
        <div class="filtervisibilityrules-type form-inline form-inline-all">
            <DropDownList v-model="showHide" :items="showHideOptions" :show-blank-item="false" formControlClasses="input-width-sm margin-r-sm" />
            <div class="form-control-static margin-r-sm">
                <span class="filtervisibilityrules-fieldname">{{ title }}</span><span class="filtervisibilityrules-if"> if</span>
            </div>
            <DropDownList v-model="allAny" :items="allAnyOptions" :show-blank-item="false" formControlClasses="input-width-sm margin-r-sm" />
            <span class="form-control-static">of the following match:</span>
        </div>
    </div>

    <div class="filtervisibilityrules-ruleslist ">
        <FieldFilterRuleRow v-for="rule in rules" :key="rule.guid" :modelValue="rule" :sources="sources" @update:modelValue="onUpdateRule" @removeRule="onRemoveRule" />
    </div>

    <div class="filter-actions">
        <button class="btn btn-xs btn-action add-action" @click.prevent="onAddRuleClick"><i class="fa fa-filter"></i> Add Criteria</button>
    </div>
</div>
`
            }));

        })
    };
}));
