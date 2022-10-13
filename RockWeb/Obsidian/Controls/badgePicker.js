System.register(['tslib', '@Obsidian/Utility/component', '@Obsidian/Utility/http', 'vue', './baseAsyncPicker.js', '@Obsidian/Utility/block', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/suspense', './checkBoxList.js', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/stringUtils', './dropDownList.js', 'ant-design-vue', '@Obsidian/Utility/util', './radioButtonList.js'], (function (exports) {
    'use strict';
    var __awaiter, standardAsyncPickerProps, useVModelPassthrough, useStandardAsyncPickerProps, post, defineComponent, ref, computed, watch, BaseAsyncPicker, useSecurityGrantToken;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            useVModelPassthrough = module.useVModelPassthrough;
            useStandardAsyncPickerProps = module.useStandardAsyncPickerProps;
        }, function (module) {
            post = module.post;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            BaseAsyncPicker = module["default"];
        }, function (module) {
            useSecurityGrantToken = module.useSecurityGrantToken;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var badgePicker = exports('default', defineComponent({
                name: "BadgePicker",
                components: {
                    BaseAsyncPicker
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, entityTypeGuid: {
                        type: String,
                        default: null
                    } }, standardAsyncPickerProps),
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const standardProps = useStandardAsyncPickerProps(props);
                    const loadedItems = ref(null);
                    const securityGrantToken = useSecurityGrantToken();
                    const actualItems = computed(() => {
                        return loadedItems.value || loadOptions;
                    });
                    const loadOptions = () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const options = {
                            securityGrantToken: securityGrantToken.value
                        };
                        const result = yield post("/api/v2/Controls/BadgePickerGetBadges", undefined, options);
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
                    watch(() => props.entityTypeGuid, () => {
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
