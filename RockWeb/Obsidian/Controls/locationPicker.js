System.register(['vue', '@Obsidian/Utility/treeItemProviders', '@Obsidian/Utility/component', './treeItemPicker.js', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './treeList.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, LocationTreeItemProvider, updateRefValue, TreeItemPicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            LocationTreeItemProvider = module.LocationTreeItemProvider;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            TreeItemPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var locationPicker = exports('default', defineComponent({
                name: "LocationPicker",
                components: {
                    TreeItemPicker
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    multiple: {
                        type: Boolean,
                        default: false
                    },
                    securityGrantToken: {
                        type: String,
                        required: false
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValue = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : null);
                    const itemProvider = new LocationTreeItemProvider();
                    itemProvider.securityGrantToken = props.securityGrantToken;
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    watch(() => props.modelValue, () => {
                        var _a;
                        updateRefValue(internalValue, (_a = props.modelValue) !== null && _a !== void 0 ? _a : null);
                    });
                    return {
                        internalValue,
                        itemProvider
                    };
                },
                template: `
<TreeItemPicker v-model="internalValue"
    formGroupClasses="location-item-picker"
    iconCssClass="fa fa-home"
    :provider="itemProvider"
    :multiple="multiple"
/>
`
            }));

        })
    };
}));
