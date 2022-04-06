System.register(["vue", "../Elements/dropDownList", "../Util/guid", "../Util/util", "./fieldFilterRuleRow"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, guid_1, util_1, fieldFilterRuleRow_1, filterExpressionTypeMap, filterExpressionToShowHideMap, filterExpressionToAllAnyMap, showHideOptions, allAnyOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (fieldFilterRuleRow_1_1) {
                fieldFilterRuleRow_1 = fieldFilterRuleRow_1_1;
            }
        ],
        execute: function () {
            filterExpressionTypeMap = {
                Show: {
                    All: 1,
                    Any: 2
                },
                Hide: {
                    All: 3,
                    Any: 4
                }
            };
            filterExpressionToShowHideMap = ["Show", "Show", "Hide", "Hide"];
            filterExpressionToAllAnyMap = ["All", "Any", "All", "Any"];
            showHideOptions = [
                { text: "Show", value: "Show" },
                { text: "Hide", value: "Hide" }
            ];
            allAnyOptions = [
                { text: "All", value: "All" },
                { text: "Any", value: "Any" }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "FieldVisibilityRulesEditor",
                components: {
                    TransitionGroup: vue_1.TransitionGroup,
                    DropDownList: dropDownList_1.default,
                    FieldFilterRuleRow: fieldFilterRuleRow_1.FieldFilterRuleRow
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
                    const showHide = vue_1.ref(filterExpressionToShowHideMap[props.modelValue.expressionType - 1]);
                    const allAny = vue_1.ref(filterExpressionToAllAnyMap[props.modelValue.expressionType - 1]);
                    const rules = vue_1.ref((_a = props.modelValue.rules) !== null && _a !== void 0 ? _a : []);
                    vue_1.watch(() => props.allowNestedGroups, () => {
                        if (props.allowNestedGroups === true) {
                            console.warn("Nested Filter Groups are not supported yet. Please set `allowNestedGroups` to `false`.");
                        }
                    });
                    function onAddRuleClick() {
                        var _a;
                        rules.value = [
                            ...rules.value,
                            {
                                guid: guid_1.newGuid(),
                                comparisonType: 0,
                                value: "",
                                sourceType: 0,
                                attributeGuid: (_a = props.sources[0].attribute) === null || _a === void 0 ? void 0 : _a.attributeGuid
                            }
                        ];
                    }
                    const onUpdateRule = (rule) => {
                        const newRules = [...rules.value];
                        const ruleIndex = newRules.findIndex(r => guid_1.areEqual(r.guid, rule.guid));
                        if (ruleIndex !== -1) {
                            newRules.splice(ruleIndex, 1, rule);
                            rules.value = newRules;
                        }
                    };
                    function onRemoveRule(rule) {
                        rules.value = (rules.value || []).filter((val) => !guid_1.areEqual(val.guid, rule.guid));
                    }
                    vue_1.watch(() => props.modelValue, () => {
                        var _a;
                        showHide.value = filterExpressionToShowHideMap[props.modelValue.expressionType - 1];
                        allAny.value = filterExpressionToAllAnyMap[props.modelValue.expressionType - 1];
                        util_1.updateRefValue(rules, (_a = props.modelValue.rules) !== null && _a !== void 0 ? _a : []);
                    });
                    vue_1.watch([showHide, allAny, rules], () => {
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
            <DropDownList v-model="showHide" :options="showHideOptions" :show-blank-item="false" formControlClasses="input-width-sm margin-r-sm" />
            <div class="form-control-static margin-r-sm">
                <span class="filtervisibilityrules-fieldname">{{ title }}</span><span class="filtervisibilityrules-if"> if</span>
            </div>
            <DropDownList v-model="allAny" :options="allAnyOptions" :show-blank-item="false" formControlClasses="input-width-sm margin-r-sm" />
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
        }
    };
});
//# sourceMappingURL=fieldFilterEditor.js.map