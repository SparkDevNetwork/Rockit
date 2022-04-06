System.register(["vue", "../Elements/rockButton", "../Elements/rockFormField", "../Elements/treeList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockButton_1, rockFormField_1, treeList_1;
    var __moduleName = context_1 && context_1.id;
    function flatten(source, childrenSource) {
        let stack = [...source];
        const flatArray = [];
        for (let i = 0; i < stack.length; i++) {
            const item = stack[i];
            flatArray.push(item);
            stack = stack.concat(childrenSource(item));
        }
        return flatArray;
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            },
            function (treeList_1_1) {
                treeList_1 = treeList_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "TreeItemPicker",
                components: {
                    RockButton: rockButton_1.default,
                    RockFormField: rockFormField_1.default,
                    TreeList: treeList_1.default
                },
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    allowMultiple: {
                        type: Boolean,
                        default: false
                    },
                    items: {
                        type: Array
                    },
                    provider: {
                        type: Object
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-folder-open"
                    }
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValues = vue_1.ref(props.modelValue.map(v => v.value));
                    const flatItems = vue_1.ref(flatten((_a = props.items) !== null && _a !== void 0 ? _a : [], i => { var _a; return (_a = i.children) !== null && _a !== void 0 ? _a : []; }));
                    const showPopup = vue_1.ref(false);
                    const showClear = vue_1.computed(() => props.modelValue.length > 0);
                    const selectedNames = vue_1.computed(() => {
                        return props.modelValue.map(v => v.text).join(", ");
                    });
                    const pickerIconClass = vue_1.computed(() => `${props.iconCssClass} fa-fw`);
                    const onUpdateItems = (newItems) => {
                        flatItems.value = flatten(newItems !== null && newItems !== void 0 ? newItems : [], i => { var _a; return (_a = i.children) !== null && _a !== void 0 ? _a : []; });
                    };
                    const onClear = () => {
                        emit("update:modelValue", []);
                    };
                    const onPickerClick = () => {
                        showPopup.value = !showPopup.value;
                    };
                    const onCancel = () => {
                        showPopup.value = false;
                    };
                    const onSelect = () => {
                        const newModelValue = props.modelValue
                            .filter(v => internalValues.value.includes(v.value));
                        const knownValues = newModelValue.map(v => v.value);
                        const additionalValues = internalValues.value
                            .filter(v => !knownValues.includes(v));
                        for (const v of additionalValues) {
                            const items = flatItems.value.filter(i => i.value === v);
                            if (items.length > 0 && items[0].value && items[0].text) {
                                newModelValue.push({
                                    value: items[0].value,
                                    text: items[0].text
                                });
                            }
                        }
                        emit("update:modelValue", newModelValue);
                        showPopup.value = false;
                    };
                    vue_1.watch(() => props.modelValue, () => internalValues.value = props.modelValue.map(v => v.value));
                    return {
                        internalValues,
                        onCancel,
                        onClear,
                        onPickerClick,
                        onSelect,
                        onUpdateItems,
                        pickerIconClass,
                        selectedNames,
                        showClear,
                        showPopup
                    };
                },
                template: `
<RockFormField
    :modelValue="modelValue"
    formGroupClasses="category-picker"
    name="itempicker">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <v-style>
                .scrollbar-thin {
                    scrollbar-width: thin;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                    background-color: #bbb;
                }
            </v-style>
    
            <div class="picker picker-select rollover-container">
                <a class="picker-label" href="#" @click.prevent.stop="onPickerClick">
                    <i :class="pickerIconClass"></i>
                    <span class="selected-names" v-text="selectedNames"></span>
                    <i class="fa fa-caret-down pull-right"></i>
                </a>
    
                <a v-if="showClear" class="picker-select-none" @click.prevent.stop="onClear">
                    <i class="fa fa-times"></i>
                </a>
    
                <div v-show="showPopup" class="picker-menu dropdown-menu" style="display: block;">
                    <div class="scrollbar-thin" style="height: 200px; overflow-y: scroll; overflow-x: hidden;">
                        <TreeList v-model="internalValues" :allowMultiple="allowMultiple" :items="items" :provider="provider" @update:items="onUpdateItems" />
                    </div>
    
                    <div class="picker-actions">
                        <a class="btn btn-xs btn-primary picker-btn" @click.prevent.stop="onSelect">Select</a>
                        <a class="btn btn-xs btn-link picker-cancel" @click.prevent.stop="onCancel">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=treeItemPicker.js.map