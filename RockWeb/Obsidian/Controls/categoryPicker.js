System.register(['vue', '@Obsidian/Utility/treeItemProviders', '@Obsidian/Utility/component', './treeItemPicker.js', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './treeList.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, CategoryTreeItemProvider, updateRefValue, TreeItemPicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            CategoryTreeItemProvider = module.CategoryTreeItemProvider;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            TreeItemPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var CategoryPicker = exports('default', defineComponent({
                name: "CategoryPicker",
                components: {
                    TreeItemPicker
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    rootCategoryGuid: {
                        type: String
                    },
                    entityTypeGuid: {
                        type: String
                    },
                    entityTypeQualifierColumn: {
                        type: String
                    },
                    entityTypeQualifierValue: {
                        type: String
                    },
                    securityGrantToken: {
                        type: String,
                        required: false
                    },
                    multiple: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValue = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : null);
                    const itemProvider = ref(new CategoryTreeItemProvider());
                    itemProvider.value.rootCategoryGuid = props.rootCategoryGuid;
                    itemProvider.value.entityTypeGuid = props.entityTypeGuid;
                    itemProvider.value.entityTypeQualifierColumn = props.entityTypeQualifierColumn;
                    itemProvider.value.entityTypeQualifierValue = props.entityTypeQualifierValue;
                    itemProvider.value.securityGrantToken = props.securityGrantToken;
                    watch(() => props.securityGrantToken, () => {
                        itemProvider.value.securityGrantToken = props.securityGrantToken;
                    });
                    watch(() => props.entityTypeGuid, () => {
                        const oldProvider = itemProvider.value;
                        const newProvider = new CategoryTreeItemProvider();
                        newProvider.rootCategoryGuid = oldProvider.rootCategoryGuid;
                        newProvider.entityTypeQualifierColumn = oldProvider.entityTypeQualifierColumn;
                        newProvider.entityTypeQualifierValue = oldProvider.entityTypeQualifierValue;
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
    iconCssClass="fa fa-folder-open"
    :provider="itemProvider"
    :multiple="multiple"
/>
`
            }));

        })
    };
}));
