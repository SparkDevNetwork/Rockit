System.register(['tslib', '@Obsidian/Utility/component', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/suspense', 'vue', './checkBoxList.js', './dropDownList.js', './radioButtonList.js', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/stringUtils', 'ant-design-vue', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, standardAsyncPickerProps, useStandardRockFormFieldProps, updateRefValue, isPromise, useSuspense, defineComponent, ref, computed, watch, CheckBoxList, DropDownList, RadioButtonList;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            useStandardRockFormFieldProps = module.useStandardRockFormFieldProps;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            isPromise = module.isPromise;
        }, function (module) {
            useSuspense = module.useSuspense;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            function modelValueToInternalValue(value, isMultiple) {
                var _a;
                if (value === undefined || value === null) {
                    return isMultiple ? [] : "";
                }
                else if (Array.isArray(value)) {
                    return value.map(v => { var _a; return (_a = v.value) !== null && _a !== void 0 ? _a : ""; });
                }
                else {
                    return (_a = value.value) !== null && _a !== void 0 ? _a : "";
                }
            }
            var BaseAsyncPicker = exports('default', defineComponent({
                name: "BaseAsyncPicker",
                components: {
                    CheckBoxList,
                    DropDownList,
                    RadioButtonList
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, grouped: {
                        type: Boolean,
                        default: false
                    }, items: {
                        type: Object,
                        required: false
                    } }, standardAsyncPickerProps),
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const internalValue = ref(modelValueToInternalValue(props.modelValue, props.multiple));
                    const loadedItems = ref(null);
                    const isLoading = ref(false);
                    const hasLoadedItems = ref(false);
                    const standardProps = useStandardRockFormFieldProps(props);
                    const initialItems = computed(() => {
                        if (props.multiple) {
                            if (Array.isArray(props.modelValue)) {
                                return props.modelValue;
                            }
                            else if (props.modelValue) {
                                return [props.modelValue];
                            }
                            else {
                                return [];
                            }
                        }
                        else {
                            if (Array.isArray(props.modelValue)) {
                                return [props.modelValue[0]];
                            }
                            else if (props.modelValue) {
                                return [props.modelValue];
                            }
                            else {
                                return [];
                            }
                        }
                    });
                    const actualItems = computed(() => {
                        var _a;
                        return (_a = loadedItems.value) !== null && _a !== void 0 ? _a : initialItems.value;
                    });
                    const isDropDownListStyle = computed(() => {
                        return props.displayStyle === "condensed" || props.displayStyle === "auto";
                    });
                    const isCheckBoxListStyle = computed(() => {
                        return props.displayStyle === "list" && props.multiple;
                    });
                    const isRadioButtonListStyle = computed(() => {
                        return props.displayStyle === "list" && !props.multiple;
                    });
                    const isHorizontal = computed(() => {
                        return props.columnCount != 1;
                    });
                    const loadItems = (eagerLoading) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        let items = (_a = props.items) !== null && _a !== void 0 ? _a : null;
                        if (items === null) {
                            loadedItems.value = null;
                            return;
                        }
                        if (typeof items === "function") {
                            if (!eagerLoading) {
                                return;
                            }
                            items = items();
                        }
                        if (isPromise(items)) {
                            isLoading.value = true;
                            items = yield items;
                            isLoading.value = false;
                        }
                        loadedItems.value = items;
                        hasLoadedItems.value = true;
                    });
                    const onOpen = () => {
                        if (loadedItems.value === null && !isLoading.value) {
                            loadItems(true);
                        }
                    };
                    watch(() => props.items, () => {
                        loadItems(props.lazyMode !== "onDemand" || hasLoadedItems.value);
                    });
                    watch(() => props.displayStyle, () => {
                        if (hasLoadedItems.value) {
                            return;
                        }
                        if (isCheckBoxListStyle.value || isRadioButtonListStyle.value) {
                            loadItems(true);
                        }
                    });
                    watch([() => props.modelValue, () => props.multiple], () => {
                        updateRefValue(internalValue, modelValueToInternalValue(props.modelValue, props.multiple));
                    });
                    watch(internalValue, () => {
                        if (Array.isArray(internalValue.value)) {
                            const selectedValues = internalValue.value;
                            const newValue = actualItems.value.filter(o => selectedValues.some(v => v === o.value));
                            emit("update:modelValue", newValue);
                        }
                        else {
                            const selectedValue = internalValue.value;
                            const newValue = actualItems.value.filter(o => selectedValue === o.value);
                            emit("update:modelValue", newValue.length > 0 ? newValue[0] : null);
                        }
                    });
                    if (Array.isArray(props.items)) {
                        loadItems(true);
                    }
                    else if (props.lazyMode === "eager" || !isDropDownListStyle.value) {
                        const suspense = useSuspense();
                        if (suspense) {
                            suspense.addOperation(loadItems(true));
                        }
                        else {
                            loadItems(true);
                        }
                    }
                    else if (props.lazyMode === "lazy") {
                        loadItems(true);
                    }
                    return {
                        actualItems,
                        internalValue,
                        isCheckBoxListStyle,
                        isDropDownListStyle,
                        isHorizontal,
                        isLoading,
                        isRadioButtonListStyle,
                        onOpen,
                        standardProps
                    };
                },
                template: `
<DropDownList v-if="isDropDownListStyle"
    v-model="internalValue"
    v-bind="standardProps"
    :grouped="grouped"
    :loading="isLoading"
    :items="actualItems"
    :multiple="multiple"
    :showBlankItem="showBlankItem"
    :enhanceForLongLists="enhanceForLongLists"
    :lazyMode="lazyMode"
    displayStyle="auto"
    @open="onOpen" />

<CheckBoxList v-if="isCheckBoxListStyle"
    v-model="internalValue"
    v-bind="standardProps"
    :horizontal="isHorizontal"
    :items="actualItems"
    :repeatColumns="columnCount" />

<RadioButtonList v-if="isRadioButtonListStyle"
    v-model="internalValue"
    v-bind="standardProps"
    :horizontal="isHorizontal"
    :items="actualItems"
    :repeatColumns="columnCount"
    :showBlankItem="showBlankItem" />
`
            }));

        })
    };
}));
