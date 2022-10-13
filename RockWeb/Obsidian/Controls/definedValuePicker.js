System.register(['tslib', '@Obsidian/Utility/block', '@Obsidian/Utility/component', '@Obsidian/Utility/http', 'vue', './baseAsyncPicker.js', './rockFormField.js', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/suspense', './checkBoxList.js', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './dropDownList.js', 'ant-design-vue', '@Obsidian/Utility/util', './radioButtonList.js'], (function (exports) {
    'use strict';
    var __awaiter, useSecurityGrantToken, standardAsyncPickerProps, useStandardAsyncPickerProps, useVModelPassthrough, useHttp, defineComponent, ref, watch, BaseAsyncPicker, RockFormField;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useSecurityGrantToken = module.useSecurityGrantToken;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            useStandardAsyncPickerProps = module.useStandardAsyncPickerProps;
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            BaseAsyncPicker = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var definedValuePicker = exports('default', defineComponent({
                name: "DefinedValuePicker",
                components: {
                    BaseAsyncPicker,
                    RockFormField
                },
                props: Object.assign(Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    } }, standardAsyncPickerProps), { definedTypeGuid: {
                        type: String,
                        required: false
                    } }),
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const standardProps = useStandardAsyncPickerProps(props);
                    const securityGrantToken = useSecurityGrantToken();
                    const http = useHttp();
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const itemsSource = ref(null);
                    const loadItems = () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const options = {
                            definedTypeGuid: props.definedTypeGuid,
                            securityGrantToken: securityGrantToken.value
                        };
                        const url = "/api/v2/Controls/DefinedValuePickerGetDefinedValues";
                        const result = yield http.post(url, undefined, options);
                        if (result.isSuccess && result.data) {
                            return result.data;
                        }
                        else {
                            console.error((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error while loading data.");
                            return [];
                        }
                    });
                    watch(() => props.definedTypeGuid, () => {
                        itemsSource.value = () => loadItems();
                    });
                    itemsSource.value = () => loadItems();
                    return {
                        internalValue,
                        itemsSource,
                        standardProps
                    };
                },
                template: `
<BaseAsyncPicker v-model="internalValue"
    v-bind="standardProps"
    :items="itemsSource" />
`
            }));

        })
    };
}));
