System.register(['@Obsidian/Utility/block', '@Obsidian/Utility/component', 'vue', '@Obsidian/Utility/treeItemProviders', './rockFormField.js', './treeItemPicker.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils', './treeList.js'], (function (exports) {
    'use strict';
    var useSecurityGrantToken, standardAsyncPickerProps, updateRefValue, defineComponent, ref, watch, DataViewTreeItemProvider, RockFormField, TreeItemPicker;
    return {
        setters: [function (module) {
            useSecurityGrantToken = module.useSecurityGrantToken;
        }, function (module) {
            standardAsyncPickerProps = module.standardAsyncPickerProps;
            updateRefValue = module.updateRefValue;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            DataViewTreeItemProvider = module.DataViewTreeItemProvider;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            TreeItemPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var dataViewPicker = exports('default', defineComponent({
                name: "DataViewPicker",
                components: {
                    TreeItemPicker,
                    RockFormField
                },
                props: Object.assign({ modelValue: {
                        type: Object,
                        required: false
                    }, entityTypeGuid: {
                        type: String,
                        required: false
                    } }, standardAsyncPickerProps),
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValue = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : null);
                    const securityGrantToken = useSecurityGrantToken();
                    const itemProvider = ref(new DataViewTreeItemProvider());
                    itemProvider.value.entityTypeGuid = props.entityTypeGuid;
                    itemProvider.value.securityGrantToken = securityGrantToken.value;
                    watch(securityGrantToken, () => {
                        itemProvider.value.securityGrantToken = securityGrantToken.value;
                    });
                    watch(() => props.entityTypeGuid, () => {
                        const oldProvider = itemProvider.value;
                        const newProvider = new DataViewTreeItemProvider();
                        newProvider.securityGrantToken = oldProvider.securityGrantToken;
                        newProvider.entityTypeGuid = props.entityTypeGuid;
                        itemProvider.value = newProvider;
                    });
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
    formGroupClasses="category-picker"
    iconCssClass="fa fa-filter"
    :provider="itemProvider"
    :multiple="multiple"
    disableFolderSelection
/>
`
            }));

        })
    };
}));
