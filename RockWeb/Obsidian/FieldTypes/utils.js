System.register(['vue', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, isSingleComparisonType, isCompareVisibleForComparisonFilter, binaryComparisonTypes, stringComparisonTypes, containsComparisonTypes, getFilteredComparisonTypeOptions, DropDownList, FieldFilterContainer, toNumberOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            isSingleComparisonType = module.isSingleComparisonType;
            isCompareVisibleForComparisonFilter = module.isCompareVisibleForComparisonFilter;
            binaryComparisonTypes = module.binaryComparisonTypes;
            stringComparisonTypes = module.stringComparisonTypes;
            containsComparisonTypes = module.containsComparisonTypes;
        }, function (module) {
            getFilteredComparisonTypeOptions = module.getFilteredComparisonTypeOptions;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            FieldFilterContainer = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }],
        execute: (function () {

            exports({
                getFieldConfigurationProps: getFieldConfigurationProps,
                getFieldEditorProps: getFieldEditorProps,
                getStandardFilterComponent: getStandardFilterComponent
            });

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
            const fieldFilterProps = exports('fieldFilterProps', {
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
            function getStandardFilterComponent(comparisonLabelOrTypes, valueComponent, options) {
                const comparisonTypes = typeof comparisonLabelOrTypes === "number" ? comparisonLabelOrTypes : null;
                const compareLabel = typeof comparisonLabelOrTypes === "string" ? comparisonLabelOrTypes : "";
                let comparisonTypeOptions = comparisonTypes !== null ? getFilteredComparisonTypeOptions(comparisonTypes) : [];
                if (options === null || options === void 0 ? void 0 : options.updateComparisonTypeNames) {
                    comparisonTypeOptions = comparisonTypeOptions.map(o => {
                        return {
                            value: o.value,
                            text: o.text
                        };
                    });
                    options.updateComparisonTypeNames(comparisonTypeOptions);
                }
                return defineComponent({
                    name: "StandardFilterComponent",
                    components: {
                        DropDownList,
                        FieldFilterContainer,
                        ValueComponent: valueComponent
                    },
                    props: fieldFilterProps,
                    emits: [
                        "update:modelValue"
                    ],
                    setup(props, { emit }) {
                        var _a, _b, _c;
                        const internalComparisonType = ref((_b = (_a = props.modelValue.comparisonType) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
                        const comparisonType = ref((_c = props.modelValue.comparisonType) !== null && _c !== void 0 ? _c : null);
                        const internalComparisonValue = ref(props.modelValue.value);
                        const hasCompareComponent = computed(() => {
                            return comparisonTypes !== null
                                && props.filterMode !== 0
                                && !isSingleComparisonType(comparisonTypes)
                                && isCompareVisibleForComparisonFilter(comparisonTypes, props.filterMode);
                        });
                        const hasValueComponent = computed(() => {
                            return internalComparisonType.value !== 32..toString()
                                && internalComparisonType.value !== 64..toString();
                        });
                        const isTypeOptional = computed(() => !props.required);
                        const emitValueIfChanged = () => {
                            let type;
                            if (compareLabel || comparisonTypes === null) {
                                type = null;
                            }
                            else if (isSingleComparisonType(comparisonTypes)) {
                                type = comparisonTypes;
                            }
                            else {
                                if (props.filterMode === 0) {
                                    if (comparisonTypes === binaryComparisonTypes) {
                                        type = 1;
                                    }
                                    else if (comparisonTypes === stringComparisonTypes || comparisonTypes === containsComparisonTypes) {
                                        type = 8;
                                    }
                                    else {
                                        type = null;
                                    }
                                }
                                else {
                                    type = toNumberOrNull(internalComparisonType.value);
                                }
                            }
                            comparisonType.value = type;
                            const newValue = {
                                comparisonType: type,
                                value: internalComparisonValue.value
                            };
                            if (newValue.comparisonType !== props.modelValue.comparisonType || newValue.value !== props.modelValue.value) {
                                emit("update:modelValue", newValue);
                            }
                        };
                        watch(() => props.modelValue, () => {
                            var _a, _b, _c;
                            internalComparisonType.value = (_b = (_a = props.modelValue.comparisonType) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                            comparisonType.value = (_c = props.modelValue.comparisonType) !== null && _c !== void 0 ? _c : null;
                            internalComparisonValue.value = props.modelValue.value;
                        });
                        watch([internalComparisonType, internalComparisonValue], () => {
                            emitValueIfChanged();
                        });
                        emitValueIfChanged();
                        return {
                            compareLabel,
                            comparisonType,
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
        <DropDownList v-model="internalComparisonType" :items="comparisonTypeOptions" :showBlankItem="isTypeOptional" />
    </template>

    <ValueComponent v-if="hasValueComponent" v-model="internalComparisonValue" :configurationValues="configurationValues" :comparisonType="comparisonType" />
</FieldFilterContainer>
`
                });
            }

        })
    };
}));
