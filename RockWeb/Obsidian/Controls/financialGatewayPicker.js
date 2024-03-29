System.register(['tslib', '@Obsidian/Utility/component', '@Obsidian/Utility/http', 'vue', './baseAsyncPicker.js', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/suspense', './checkBoxList.js', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/stringUtils', './dropDownList.js', 'ant-design-vue', '@Obsidian/Utility/util', './radioButtonList.js'], (function (exports) {
    'use strict';
    var __awaiter, standardAsyncPickerProps, useVModelPassthrough, useStandardAsyncPickerProps, useHttp, defineComponent, ref, computed, watch, BaseAsyncPicker;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            useVModelPassthrough = module.useVModelPassthrough;
            useStandardAsyncPickerProps = module.useStandardAsyncPickerProps;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            BaseAsyncPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var financialGatewayPicker = exports('default', defineComponent({
                name: "FinancialGatewayPicker",
                components: {
                    BaseAsyncPicker
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, includeInactive: {
                        type: Boolean,
                        default: false
                    }, showAllGatewayComponents: {
                        type: Boolean,
                        default: false
                    } }, standardAsyncPickerProps),
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const standardProps = useStandardAsyncPickerProps(props);
                    const http = useHttp();
                    const loadedItems = ref(null);
                    const actualItems = computed(() => {
                        return loadedItems.value || loadOptions;
                    });
                    const loadOptions = () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const options = {
                            includeInactive: props.includeInactive,
                            showAllGatewayComponents: props.showAllGatewayComponents
                        };
                        const result = yield http.post("/api/v2/Controls/FinancialGatewayPickerGetFinancialGateways", undefined, options);
                        if (result.isSuccess && result.data) {
                            let items = result.data;
                            if (internalValue.value && Array.isArray(internalValue.value)) {
                                items = internalValue.value.filter(gateway => !items.some(item => item.value === gateway.value)).concat(items);
                            }
                            else if (internalValue.value && !Array.isArray(internalValue.value) && internalValue.value.value && !items.some(item => item.value === internalValue.value.value)) {
                                items.unshift(internalValue.value);
                            }
                            loadedItems.value = items;
                            return items;
                        }
                        else {
                            console.error((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error while loading data.");
                            loadedItems.value = [];
                            return [];
                        }
                    });
                    watch(() => props.includeInactive, () => {
                        loadedItems.value = null;
                    });
                    watch(() => props.showAllGatewayComponents, () => {
                        loadedItems.value = null;
                    });
                    return {
                        actualItems,
                        internalValue,
                        standardProps
                    };
                },
                template: `
<BaseAsyncPicker v-model="internalValue"
    v-bind="standardProps"
    :items="actualItems" />
`
            }));

        })
    };
}));
