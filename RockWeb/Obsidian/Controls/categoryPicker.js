System.register(["vue", "../Util/treeItemProviders", "../Util/util", "./treeItemPicker"], function (exports_1, context_1) {
    "use strict";
    var vue_1, treeItemProviders_1, util_1, treeItemPicker_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (treeItemProviders_1_1) {
                treeItemProviders_1 = treeItemProviders_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (treeItemPicker_1_1) {
                treeItemPicker_1 = treeItemPicker_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "CategoryPicker",
                components: {
                    TreeItemPicker: treeItemPicker_1.default
                },
                props: {
                    modelValue: {
                        type: Object
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
                    }
                },
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(props.modelValue ? [props.modelValue] : []);
                    const itemProvider = new treeItemProviders_1.CategoryTreeItemProvider();
                    itemProvider.rootCategoryGuid = props.rootCategoryGuid;
                    itemProvider.entityTypeGuid = props.entityTypeGuid;
                    itemProvider.entityTypeQualifierColumn = props.entityTypeQualifierColumn;
                    itemProvider.entityTypeQualifierValue = props.entityTypeQualifierValue;
                    vue_1.watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value.length > 0 ? internalValue.value[0] : undefined);
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        util_1.updateRefValue(internalValue, props.modelValue ? [props.modelValue] : []);
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
/>
`
            }));
        }
    };
});
//# sourceMappingURL=categoryPicker.js.map