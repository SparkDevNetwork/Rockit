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

            var stepTypePicker = exports('default', defineComponent({
                name: "StepTypePicker",
                components: {
                    BaseAsyncPicker
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, stepProgramGuid: {
                        type: String,
                        default: null
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
                            stepProgramGuid: props.stepProgramGuid
                        };
                        const result = yield http.post("/api/v2/Controls/StepTypePickerGetStepTypes", undefined, options);
                        if (result.isSuccess && result.data) {
                            loadedItems.value = result.data;
                            return result.data;
                        }
                        else {
                            console.error((_a = result.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error while loading data.");
                            loadedItems.value = [];
                            return [];
                        }
                    });
                    watch(() => props.stepProgramGuid, () => {
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
