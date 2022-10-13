System.register(['vue', './dropDownList.js', './textBox.js', '@Obsidian/Utility/guid', '@Obsidian/Utility/component', './rockAttributeFilter.js', 'ant-design-vue', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/fieldTypes'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, DropDownList, TextBox, areEqual, updateRefValue, RockAttributeFilter;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            areEqual = module.areEqual;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            RockAttributeFilter = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const FieldFilterRuleRow = exports('FieldFilterRuleRow', defineComponent({
                name: "FieldFilterRuleRow",
                components: {
                    DropDownList,
                    TextBox,
                    RockAttributeFilter
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sources: {
                        type: Array,
                        required: true
                    }
                },
                emits: [
                    "update:modelValue",
                    "removeRule"
                ],
                setup(props, { emit }) {
                    var _a;
                    let internalUpdate = false;
                    const attributeGuid = ref(props.modelValue.attributeGuid);
                    const comparisonValue = ref({
                        comparisonType: props.modelValue.comparisonType,
                        value: (_a = props.modelValue.value) !== null && _a !== void 0 ? _a : ""
                    });
                    const currentAttribute = computed(() => {
                        const source = props.sources.find(source => {
                            var _a, _b, _c;
                            return areEqual((_a = attributeGuid.value) !== null && _a !== void 0 ? _a : "", (_c = (_b = source.attribute) === null || _b === void 0 ? void 0 : _b.attributeGuid) !== null && _c !== void 0 ? _c : "");
                        }) || props.sources[0];
                        return source.attribute;
                    });
                    const attributeList = computed(() => {
                        return props.sources.map(source => {
                            var _a, _b;
                            return {
                                text: (_a = source.attribute) === null || _a === void 0 ? void 0 : _a.name,
                                value: (_b = source.attribute) === null || _b === void 0 ? void 0 : _b.attributeGuid
                            };
                        });
                    });
                    function onRemoveRuleClick() {
                        emit("removeRule", props.modelValue);
                    }
                    watch(() => props.modelValue, () => {
                        var _a;
                        internalUpdate = true;
                        updateRefValue(attributeGuid, props.modelValue.attributeGuid);
                        updateRefValue(comparisonValue, {
                            comparisonType: props.modelValue.comparisonType,
                            value: (_a = props.modelValue.value) !== null && _a !== void 0 ? _a : ""
                        });
                        internalUpdate = false;
                    });
                    watch([attributeGuid, comparisonValue], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeGuid: attributeGuid.value, comparisonType: (_a = comparisonValue.value.comparisonType) !== null && _a !== void 0 ? _a : 0, value: comparisonValue.value.value });
                        emit("update:modelValue", newValue);
                    });
                    watch(currentAttribute, () => {
                        if (!internalUpdate) {
                            comparisonValue.value = {
                                comparisonType: 0,
                                value: ""
                            };
                            attributeGuid.value = currentAttribute.value.attributeGuid;
                        }
                    });
                    return {
                        attributeGuid,
                        attributeList,
                        comparisonValue,
                        currentAttribute,
                        onRemoveRuleClick,
                    };
                },
                template: `
    <div class="filter-rule">
        <div class="filter-rule-fields row form-row">
            <div class="filter-rule-comparefield col-xs-12 col-md-4">
                <DropDownList :items="attributeList" v-model="attributeGuid" :show-blank-item="false"  />
            </div>
            <div class="filter-rule-fieldfilter col-xs-12 col-md-8">
                <RockAttributeFilter :attribute="currentAttribute" v-model="comparisonValue" :filter-mode="1" required />
            </div>
        </div>
        <div class="filter-rule-remove">
            <button class="btn btn-danger btn-square" @click.prevent="onRemoveRuleClick"><i class="fa fa-times"></i></button>
        </div>
    </div>
    `
            }));

        })
    };
}));
