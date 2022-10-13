System.register(['vue', './rockButton.js', './rockFormField.js', './treeList.js', '@Obsidian/Utility/component', 'tslib', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, RockButton, RockFormField, TreeList, updateRefValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            TreeList = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

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
            function forceToArray(value, multiple) {
                if (value === undefined || value === null) {
                    return [];
                }
                else if (Array.isArray(value)) {
                    if (!multiple && value.length > 1) {
                        return [value[0]];
                    }
                    else {
                        return value;
                    }
                }
                else {
                    return [value];
                }
            }
            var TreeItemPicker = exports('default', defineComponent({
                name: "TreeItemPicker",
                components: {
                    RockButton,
                    RockFormField,
                    TreeList
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
                    items: {
                        type: Array
                    },
                    provider: {
                        type: Object
                    },
                    iconCssClass: {
                        type: String,
                        default: "fa fa-folder-open"
                    },
                    disableFolderSelection: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValues = ref(forceToArray(props.modelValue, props.multiple).map(v => { var _a; return (_a = v.value) !== null && _a !== void 0 ? _a : ""; }));
                    const flatItems = ref(flatten((_a = props.items) !== null && _a !== void 0 ? _a : [], i => { var _a; return (_a = i.children) !== null && _a !== void 0 ? _a : []; }));
                    const showPopup = ref(false);
                    const showClear = computed(() => {
                        return forceToArray(props.modelValue, props.multiple).length > 0;
                    });
                    const selectedNames = computed(() => {
                        return forceToArray(props.modelValue, true).map(v => v.text).join(", ");
                    });
                    const pickerIconClass = computed(() => `${props.iconCssClass} fa-fw`);
                    const updateModelValue = () => {
                        const newModelValue = forceToArray(props.modelValue, true)
                            .filter(v => { var _a; return internalValues.value.includes((_a = v.value) !== null && _a !== void 0 ? _a : ""); });
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
                        if (props.multiple) {
                            emit("update:modelValue", newModelValue);
                        }
                        else {
                            emit("update:modelValue", newModelValue.length > 0 ? newModelValue[0] : null);
                        }
                    };
                    const onUpdateItems = (newItems) => {
                        flatItems.value = flatten(newItems !== null && newItems !== void 0 ? newItems : [], i => { var _a; return (_a = i.children) !== null && _a !== void 0 ? _a : []; });
                    };
                    const onClear = () => {
                        emit("update:modelValue", props.multiple ? [] : null);
                    };
                    const onPickerClick = () => {
                        showPopup.value = !showPopup.value;
                    };
                    const onCancel = () => {
                        showPopup.value = false;
                    };
                    const onSelect = () => {
                        updateModelValue();
                        showPopup.value = false;
                    };
                    watch([() => props.modelValue, () => props.multiple], (oldValues, newValues) => {
                        updateRefValue(internalValues, forceToArray(props.modelValue, props.multiple).map(v => { var _a; return (_a = v.value) !== null && _a !== void 0 ? _a : ""; }));
                        if (newValues[1] !== oldValues[1]) {
                            updateModelValue();
                        }
                    });
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
                    <span class="selected-names">{{ selectedNames }}</span>
                    <b class="fa fa-caret-down pull-right"></b>
                </a>

                <a v-if="showClear" class="picker-select-none" @click.prevent.stop="onClear">
                    <i class="fa fa-times"></i>
                </a>

                <div v-show="showPopup" class="picker-menu dropdown-menu" style="display: block;">
                    <div class="scrollbar-thin" style="height: 200px; overflow-y: scroll; overflow-x: hidden;">
                        <TreeList v-model="internalValues" :multiple="multiple" :items="items" :provider="provider" @update:items="onUpdateItems" :disableFolderSelection="disableFolderSelection" />
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

        })
    };
}));
