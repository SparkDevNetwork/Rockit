System.register(["vue", "../Elements/dropDownList", "../Elements/textBox", "../Util/guid", "../Util/util", "./rockAttributeFilter"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, textBox_1, guid_1, util_1, rockAttributeFilter_1, FieldFilterRuleRow;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (rockAttributeFilter_1_1) {
                rockAttributeFilter_1 = rockAttributeFilter_1_1;
            }
        ],
        execute: function () {
            exports_1("FieldFilterRuleRow", FieldFilterRuleRow = vue_1.defineComponent({
                name: "FieldFilterRuleRow",
                components: {
                    DropDownList: dropDownList_1.default,
                    TextBox: textBox_1.default,
                    RockAttributeFilter: rockAttributeFilter_1.default
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
                    let internalUpdate = false;
                    const attributeGuid = vue_1.ref(props.modelValue.attributeGuid);
                    const comparisonValue = vue_1.ref({
                        comparisonType: props.modelValue.comparisonType,
                        value: props.modelValue.value
                    });
                    const currentAttribute = vue_1.computed(() => {
                        const source = props.sources.find(source => {
                            var _a, _b, _c;
                            return guid_1.areEqual((_a = attributeGuid.value) !== null && _a !== void 0 ? _a : "", (_c = (_b = source.attribute) === null || _b === void 0 ? void 0 : _b.attributeGuid) !== null && _c !== void 0 ? _c : "");
                        }) || props.sources[0];
                        return source.attribute;
                    });
                    const attributeList = vue_1.computed(() => {
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
                    vue_1.watch(() => props.modelValue, () => {
                        internalUpdate = true;
                        util_1.updateRefValue(attributeGuid, props.modelValue.attributeGuid);
                        util_1.updateRefValue(comparisonValue, {
                            comparisonType: props.modelValue.comparisonType,
                            value: props.modelValue.value
                        });
                        internalUpdate = false;
                    });
                    vue_1.watch([attributeGuid, comparisonValue], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeGuid: attributeGuid.value, comparisonType: (_a = comparisonValue.value.comparisonType) !== null && _a !== void 0 ? _a : 0, value: comparisonValue.value.value });
                        emit("update:modelValue", newValue);
                    });
                    vue_1.watch(currentAttribute, () => {
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
    <div class="d-flex form-group">
        <div class="flex-fill">
            <div class="row form-row">
                <div class="filter-rule-comparefield col-md-4">
                    <DropDownList :options="attributeList" v-model="attributeGuid" :show-blank-item="false"  />
                </div>
                <div class="filter-rule-fieldfilter col-md-8">
                    <RockAttributeFilter :attribute="currentAttribute" v-model="comparisonValue" :filter-mode="1" required />
                </div>
            </div>
        </div>
        <div class="flex-shrink-0 ml-2">
            <button class="btn btn-danger btn-square" @click.prevent="onRemoveRuleClick"><i class="fa fa-times"></i></button>
        </div>
    </div>
    `
            }));
        }
    };
});
//# sourceMappingURL=fieldFilterRuleRow.js.map