System.register(['tslib', '@Obsidian/Utility/component', '@Obsidian/Utility/guid', '@Obsidian/Utility/http', 'vue', './baseAsyncPicker.js', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/suspense', './checkBoxList.js', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/stringUtils', './dropDownList.js', 'ant-design-vue', '@Obsidian/Utility/util', './radioButtonList.js'], (function (exports) {
    'use strict';
    var __awaiter, standardAsyncPickerProps, useVModelPassthrough, useStandardAsyncPickerProps, emptyGuid, useHttp, defineComponent, ref, computed, BaseAsyncPicker;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            useVModelPassthrough = module.useVModelPassthrough;
            useStandardAsyncPickerProps = module.useStandardAsyncPickerProps;
        }, function (module) {
            emptyGuid = module.emptyGuid;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
        }, function (module) {
            BaseAsyncPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var entityTypePicker = exports('default', defineComponent({
                name: "EntityTypePicker",
                components: {
                    BaseAsyncPicker
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, includeGlobalOption: {
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
                        return loadedItems.value ? postProcessItems(loadedItems.value) : loadOptions;
                    });
                    const postProcessItems = (items) => {
                        const processedItems = [...items];
                        if (props.includeGlobalOption) {
                            processedItems.splice(0, 0, {
                                value: emptyGuid,
                                text: "None (Global Attributes)"
                            });
                        }
                        return processedItems;
                    };
                    const loadOptions = () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const options = {};
                        const result = yield http.post("/api/v2/Controls/EntityTypePickerGetEntityTypes", undefined, options);
                        if (result.isSuccess && result.data) {
                            loadedItems.value = result.data;
                            return postProcessItems(result.data);
                        }
                        else {
                            console.error((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error while loading data.");
                            loadedItems.value = [];
                            return [];
                        }
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
    grouped
    :items="actualItems" />
`
            }));

        })
    };
}));
