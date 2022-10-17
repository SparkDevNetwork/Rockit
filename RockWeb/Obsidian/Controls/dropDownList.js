System.register(['vue', 'ant-design-vue', './rockFormField.js', '@Obsidian/Utility/util', '@Obsidian/Utility/component', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, Select, RockFormField, deepEqual, standardRockFormFieldProps, useStandardRockFormFieldProps, updateRefValue, defaultControlCompareValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Select = module.Select;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            deepEqual = module.deepEqual;
        }, function (module) {
            standardRockFormFieldProps = module.standardRockFormFieldProps;
            useStandardRockFormFieldProps = module.useStandardRockFormFieldProps;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            defaultControlCompareValue = module.defaultControlCompareValue;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var DropDownList = exports('default', defineComponent({
                name: "DropDownList",
                components: {
                    AntSelect: Select,
                    RockFormField,
                    VNodes: (_, { attrs }) => {
                        return attrs.vnodes;
                    }
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: true
                    }, items: {
                        type: Array,
                        default: []
                    }, showBlankItem: {
                        type: Boolean,
                        default: true
                    }, blankValue: {
                        type: String,
                        default: ""
                    }, multiple: {
                        type: Boolean,
                        default: false
                    }, formControlClasses: {
                        type: String,
                        default: ""
                    }, enhanceForLongLists: {
                        type: Boolean,
                        default: false
                    }, grouped: {
                        type: Boolean,
                        default: false
                    }, disabled: {
                        type: Boolean,
                        default: false
                    }, loading: {
                        type: Boolean,
                        default: false
                    }, compareValue: {
                        type: Function,
                        default: defaultControlCompareValue
                    } }, standardRockFormFieldProps),
                emits: {
                    open: () => true,
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue ? props.modelValue : null);
                    const controlWrapper = ref(null);
                    const standardFieldProps = useStandardRockFormFieldProps(props);
                    const computedShowBlankItem = computed(() => {
                        return !props.multiple && props.showBlankItem;
                    });
                    const computedOptions = computed(() => {
                        var _a, _b, _c, _d, _e, _f;
                        if (!props.grouped) {
                            return props.items.map((o) => {
                                var _a, _b;
                                return {
                                    value: (_a = o.value) !== null && _a !== void 0 ? _a : "",
                                    label: (_b = o.text) !== null && _b !== void 0 ? _b : ""
                                };
                            });
                        }
                        const groupedOptions = [];
                        for (const o of props.items) {
                            if (!o.category) {
                                groupedOptions.push({
                                    value: (_a = o.value) !== null && _a !== void 0 ? _a : "",
                                    label: (_b = o.text) !== null && _b !== void 0 ? _b : ""
                                });
                                continue;
                            }
                            const matchedGroups = groupedOptions.filter(g => g.label === o.category && !!g.options);
                            if (matchedGroups.length >= 1 && !!matchedGroups[0].options) {
                                matchedGroups[0].options.push({
                                    value: (_c = o.value) !== null && _c !== void 0 ? _c : "",
                                    label: (_d = o.text) !== null && _d !== void 0 ? _d : ""
                                });
                            }
                            else {
                                groupedOptions.push({
                                    label: o.category,
                                    options: [{
                                            value: (_e = o.value) !== null && _e !== void 0 ? _e : "",
                                            label: (_f = o.text) !== null && _f !== void 0 ? _f : ""
                                        }]
                                });
                            }
                        }
                        return groupedOptions;
                    });
                    const computedLoading = computed(() => {
                        return props.loading;
                    });
                    const mode = computed(() => {
                        return props.multiple ? "multiple" : undefined;
                    });
                    const hasValue = computed(() => {
                        if (Array.isArray(internalValue.value)) {
                            return internalValue.value.length > 0;
                        }
                        else {
                            return internalValue.value !== "";
                        }
                    });
                    const isClearable = computed(() => {
                        return computedShowBlankItem.value && !computedLoading.value && hasValue.value;
                    });
                    const isDisabled = computed(() => {
                        return props.disabled;
                    });
                    const syncInternalValue = () => {
                        var _a, _b, _c;
                        let value = props.modelValue;
                        if (props.multiple) {
                            if (!Array.isArray(value)) {
                                value = value === "" ? [] : [value];
                            }
                            value = props.items
                                .filter(o => value.some(v => { var _a; return props.compareValue(v, (_a = o.value) !== null && _a !== void 0 ? _a : ""); }))
                                .map(o => { var _a; return (_a = o.value) !== null && _a !== void 0 ? _a : ""; });
                        }
                        else {
                            if (Array.isArray(value)) {
                                value = value.length === 0 ? null : value[0];
                            }
                            if (value === null) {
                                value = computedShowBlankItem.value
                                    ? props.blankValue
                                    : (((_a = props.items[0]) === null || _a === void 0 ? void 0 : _a.value) || props.blankValue);
                            }
                            const selectedOption = props.items.find(o => { var _a; return props.compareValue(value, (_a = o.value) !== null && _a !== void 0 ? _a : ""); }) || null;
                            if (!selectedOption) {
                                value = computedShowBlankItem.value
                                    ? props.blankValue
                                    : (((_b = props.items[0]) === null || _b === void 0 ? void 0 : _b.value) || props.blankValue);
                            }
                            else {
                                value = (_c = selectedOption.value) !== null && _c !== void 0 ? _c : "";
                            }
                        }
                        updateRefValue(internalValue, value);
                    };
                    const filterItem = (input, option) => {
                        return (option.label || "").toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >= 0;
                    };
                    const getPopupContainer = () => {
                        var _a;
                        return (_a = controlWrapper.value) !== null && _a !== void 0 ? _a : document.body;
                    };
                    const onDropdownVisibleChange = (open) => {
                        if (open) {
                            emit("open");
                        }
                    };
                    watch([() => props.modelValue, computedShowBlankItem, () => props.multiple, () => props.items], () => {
                        syncInternalValue();
                    });
                    watch(internalValue, () => {
                        var _a;
                        let newValue = internalValue.value;
                        if (props.multiple) {
                            if (!Array.isArray(newValue)) {
                                newValue = newValue === null ? [] : [newValue];
                            }
                        }
                        else {
                            if (Array.isArray(newValue)) {
                                newValue = newValue.length === 0 ? null : newValue[0];
                            }
                            if (newValue === null) {
                                newValue = computedShowBlankItem.value
                                    ? props.blankValue
                                    : (((_a = props.items[0]) === null || _a === void 0 ? void 0 : _a.value) || props.blankValue);
                            }
                        }
                        if (!deepEqual(props.modelValue, newValue, true)) {
                            emit("update:modelValue", newValue);
                        }
                    });
                    syncInternalValue();
                    return {
                        computedLoading,
                        computedOptions,
                        controlWrapper,
                        filterItem,
                        internalValue,
                        isClearable,
                        isDisabled,
                        getPopupContainer,
                        mode,
                        onDropdownVisibleChange,
                        standardFieldProps
                    };
                },
                template: `
<RockFormField
    v-bind="standardFieldProps"
    :modelValue="internalValue"
    :formGroupClasses="'rock-drop-down-list ' + formGroupClasses"
    name="dropdownlist">
    <template #default="{uniqueId, field}">
        <div ref="controlWrapper" class="control-wrapper">
            <AntSelect
                v-model:value="internalValue"
                v-bind="field"
                class="form-control"
                :allowClear="isClearable"
                :loading="computedLoading"
                :disabled="isDisabled"
                :options="computedOptions"
                :showSearch="enhanceForLongLists"
                :filterOption="filterItem"
                :mode="mode"
                :getPopupContainer="getPopupContainer"
                @dropdownVisibleChange="onDropdownVisibleChange">
                <template #clearIcon>
                    <i class="fa fa-times"></i>
                </template>

                <template #suffixIcon>
                    <i v-if="!computedLoading" class="fa fa-caret-down"></i>
                    <i v-else class="fa fa-spinner fa-spin"></i>
                </template>

                <template #dropdownRender="{ menuNode: menu }">
                    <div v-if="computedLoading" class="text-center"><i class="fa fa-spinner fa-spin"></i> Data is loading...</div>
                    <v-nodes v-else :vnodes="menu" />
                </template>
            </AntSelect>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
