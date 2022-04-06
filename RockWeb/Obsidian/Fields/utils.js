System.register(["vue", "../Reporting/comparisonType", "../Reporting/comparisonTypeOptions", "../Util/guid", "../Elements/dropDownList", "../Elements/fieldFilterContainer", "../Services/number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, comparisonType_1, comparisonTypeOptions_1, guid_1, dropDownList_1, fieldFilterContainer_1, number_1, fieldTypeTable, fieldFilterProps;
    var __moduleName = context_1 && context_1.id;
    function getFieldEditorProps() {
        return {
            modelValue: {
                type: String,
                required: true
            },
            configurationValues: {
                type: Object,
                default: () => ({})
            }
        };
    }
    exports_1("getFieldEditorProps", getFieldEditorProps);
    function getFieldConfigurationProps() {
        return {
            modelValue: {
                type: Object,
                required: true
            },
            configurationProperties: {
                type: Object,
                required: true
            }
        };
    }
    exports_1("getFieldConfigurationProps", getFieldConfigurationProps);
    function registerFieldType(fieldTypeGuid, fieldType) {
        const normalizedGuid = guid_1.normalize(fieldTypeGuid);
        if (!guid_1.isValidGuid(fieldTypeGuid) || normalizedGuid === null) {
            throw "Invalid guid specified when registering field type.";
        }
        if (fieldTypeTable[normalizedGuid] !== undefined) {
            throw "Invalid attempt to replace existing field type.";
        }
        fieldTypeTable[normalizedGuid] = fieldType;
    }
    exports_1("registerFieldType", registerFieldType);
    function getFieldType(fieldTypeGuid) {
        const normalizedGuid = guid_1.normalize(fieldTypeGuid);
        if (normalizedGuid !== null) {
            const field = fieldTypeTable[normalizedGuid];
            if (field) {
                return field;
            }
        }
        console.warn(`Field type "${fieldTypeGuid}" was not found`);
        return null;
    }
    exports_1("getFieldType", getFieldType);
    function getStandardFilterComponent(comparisonLabelOrTypes, valueComponent) {
        const comparisonTypes = typeof comparisonLabelOrTypes === "number" ? comparisonLabelOrTypes : null;
        const compareLabel = typeof comparisonLabelOrTypes === "string" ? comparisonLabelOrTypes : "";
        const comparisonTypeOptions = comparisonTypes !== null ? comparisonTypeOptions_1.getFilteredComparisonTypeOptions(comparisonTypes) : [];
        return vue_1.defineComponent({
            name: "StandardFilterComponent",
            components: {
                DropDownList: dropDownList_1.default,
                FieldFilterContainer: fieldFilterContainer_1.default,
                ValueComponent: valueComponent
            },
            props: fieldFilterProps,
            emits: [
                "update:modelValue"
            ],
            setup(props, { emit }) {
                var _a, _b;
                const internalComparisonType = vue_1.ref((_b = (_a = props.modelValue.comparisonType) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
                const internalComparisonValue = vue_1.ref(props.modelValue.value);
                const hasCompareComponent = vue_1.computed(() => {
                    return comparisonTypes !== null
                        && props.filterMode !== 0
                        && !comparisonType_1.isSingleComparisonType(comparisonTypes)
                        && comparisonType_1.isCompareVisibleForComparisonFilter(comparisonTypes, props.filterMode);
                });
                const hasValueComponent = vue_1.computed(() => {
                    return internalComparisonType.value !== 32..toString()
                        && internalComparisonType.value !== 64..toString();
                });
                const isTypeOptional = vue_1.computed(() => !props.required);
                const emitValueIfChanged = () => {
                    let type;
                    if (compareLabel || comparisonTypes === null) {
                        type = null;
                    }
                    else if (comparisonType_1.isSingleComparisonType(comparisonTypes)) {
                        type = comparisonTypes;
                    }
                    else {
                        if (props.filterMode === 0) {
                            if (comparisonTypes === comparisonType_1.binaryComparisonTypes) {
                                type = 1;
                            }
                            else if (comparisonTypes === comparisonType_1.stringComparisonTypes || comparisonTypes === comparisonType_1.containsComparisonTypes) {
                                type = 8;
                            }
                            else {
                                type = null;
                            }
                        }
                        else {
                            type = number_1.toNumberOrNull(internalComparisonType.value);
                        }
                    }
                    const newValue = {
                        comparisonType: type,
                        value: internalComparisonValue.value
                    };
                    if (newValue.comparisonType !== props.modelValue.comparisonType || newValue.value !== props.modelValue.value) {
                        emit("update:modelValue", newValue);
                    }
                };
                vue_1.watch(() => props.modelValue, () => {
                    var _a, _b;
                    internalComparisonType.value = (_b = (_a = props.modelValue.comparisonType) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                    internalComparisonValue.value = props.modelValue.value;
                });
                vue_1.watch([internalComparisonType, internalComparisonValue], () => {
                    emitValueIfChanged();
                });
                emitValueIfChanged();
                return {
                    compareLabel,
                    comparisonTypeOptions,
                    hasCompareComponent,
                    hasValueComponent,
                    internalComparisonType,
                    internalComparisonValue,
                    isTypeOptional
                };
            },
            template: `
<FieldFilterContainer :compareLabel="compareLabel">
    <template v-if="hasCompareComponent" #compare>
        <DropDownList v-model="internalComparisonType" :options="comparisonTypeOptions" :showBlankItem="isTypeOptional" />
    </template>

    <ValueComponent v-if="hasValueComponent" v-model="internalComparisonValue" :configurationValues="configurationValues" />
</FieldFilterContainer>
`
        });
    }
    exports_1("getStandardFilterComponent", getStandardFilterComponent);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (comparisonType_1_1) {
                comparisonType_1 = comparisonType_1_1;
            },
            function (comparisonTypeOptions_1_1) {
                comparisonTypeOptions_1 = comparisonTypeOptions_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (fieldFilterContainer_1_1) {
                fieldFilterContainer_1 = fieldFilterContainer_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            fieldTypeTable = {};
            exports_1("fieldFilterProps", fieldFilterProps = {
                modelValue: {
                    type: Object,
                    required: true
                },
                configurationValues: {
                    type: Object,
                    required: true
                },
                filterMode: {
                    type: Number,
                    required: true
                },
                required: {
                    type: Boolean,
                    required: true
                }
            });
        }
    };
});
//# sourceMappingURL=utils.js.map