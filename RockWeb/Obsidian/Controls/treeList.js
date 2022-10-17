System.register(['tslib', 'vue', '@Obsidian/Utility/promiseUtils'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, computed, ref, watch, isPromise;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            isPromise = module.isPromise;
        }],
        execute: (function () {

            const treeItem = defineComponent({
                name: "TreeList.Item",
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    multiple: {
                        type: Boolean,
                        default: false
                    },
                    item: {
                        type: Object,
                        default: {}
                    },
                    disableFolderSelection: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "treeitem-expanded",
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const children = computed(() => { var _a; return (_a = props.item.children) !== null && _a !== void 0 ? _a : []; });
                    const hasChildren = computed(() => children.value.length > 0);
                    const isFolder = computed(() => props.item.isFolder && props.item.hasChildren);
                    const itemName = computed(() => { var _a; return (_a = props.item.text) !== null && _a !== void 0 ? _a : ""; });
                    const showChildren = ref(false);
                    const listItemClass = computed(() => {
                        return isFolder.value ? "rocktree-item rocktree-folder" : "rocktree-item rocktree-leaf";
                    });
                    const folderClass = computed(() => {
                        return showChildren.value
                            ? "rocktree-icon icon-fw fa fa-fw fa-chevron-down"
                            : "rocktree-icon icon-fw fa fa-fw fa-chevron-right";
                    });
                    const itemIconClass = computed(() => {
                        return `icon-fw ${props.item.iconCssClass}`;
                    });
                    const itemNameClass = computed(() => {
                        const classes = ["rocktree-name"];
                        if (props.item.value && props.modelValue.includes(props.item.value)) {
                            classes.push("selected");
                        }
                        if (!props.item.isActive) {
                            classes.push("is-inactive");
                        }
                        return classes.join(" ");
                    });
                    const onExpand = () => {
                        showChildren.value = !showChildren.value;
                        if (showChildren.value) {
                            emit("treeitem-expanded", props.item);
                        }
                    };
                    const onChildItemExpanded = (item) => {
                        emit("treeitem-expanded", item);
                    };
                    const onSelect = () => {
                        if (isFolder.value && props.disableFolderSelection) {
                            return;
                        }
                        if (props.multiple) {
                            if (props.item.value && !props.modelValue.includes(props.item.value)) {
                                emit("update:modelValue", [...props.modelValue, props.item.value]);
                            }
                            else if (props.item.value && props.modelValue.includes(props.item.value)) {
                                emit("update:modelValue", [...props.modelValue.filter(v => v !== props.item.value)]);
                            }
                        }
                        else {
                            if (props.item.value && !props.modelValue.includes(props.item.value)) {
                                emit("update:modelValue", [props.item.value]);
                            }
                            else if (props.item.value && props.modelValue.includes(props.item.value)) {
                                emit("update:modelValue", []);
                            }
                        }
                    };
                    const onUpdateSelectedValues = (values) => {
                        emit("update:modelValue", values);
                    };
                    return {
                        children,
                        hasChildren,
                        folderClass,
                        isFolder,
                        itemIconClass,
                        itemName,
                        itemNameClass,
                        listItemClass,
                        onChildItemExpanded,
                        onExpand,
                        onSelect,
                        onUpdateSelectedValues,
                        showChildren
                    };
                },
                template: `
<li :class="listItemClass">
    <i v-if="isFolder" :class="folderClass" @click.prevent.stop="onExpand"></i>
    <span :class="itemNameClass" :title="itemName" @click.prevent.stop="onSelect">
        <i :class="itemIconClass"></i>
        {{ itemName }}
    </span>
    <ul v-if="hasChildren" v-show="showChildren" class="rocktree-children" v-for="child in children">
        <TreeList.Item :modelValue="modelValue" @update:modelValue="onUpdateSelectedValues" @treeitem-expanded="onChildItemExpanded" :item="child" :multiple="multiple" :disableFolderSelection="disableFolderSelection" />
    </ul>
</li>
`
            });
            var TreeList = exports('default', defineComponent({
                name: "TreeList",
                components: {
                    TreeItem: treeItem
                },
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    multiple: {
                        type: Boolean,
                        default: false
                    },
                    items: {
                        type: Array,
                        default: []
                    },
                    provider: {
                        type: Object
                    },
                    disableFolderSelection: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:items",
                    "treeitem-expanded"
                ],
                setup(props, { emit }) {
                    var _a;
                    const internalItems = ref((_a = props.items) !== null && _a !== void 0 ? _a : []);
                    const getRootItems = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.provider) {
                            const result = props.provider.getRootItems();
                            const rootItems = isPromise(result) ? yield result : result;
                            internalItems.value = JSON.parse(JSON.stringify(rootItems));
                            emit("update:items", internalItems.value);
                        }
                    });
                    const onUpdateSelectedValues = (values) => {
                        if (props.multiple) {
                            emit("update:modelValue", values);
                        }
                        else {
                            emit("update:modelValue", values.length > 0 ? [values[0]] : []);
                        }
                    };
                    const onItemExpanded = (item) => __awaiter(this, void 0, void 0, function* () {
                        if (props.provider) {
                            if (item.hasChildren && item.children === null) {
                                const result = props.provider.getChildItems(item);
                                const children = isPromise(result) ? yield result : result;
                                item.children = JSON.parse(JSON.stringify(children));
                                emit("update:items", internalItems.value);
                            }
                        }
                        else {
                            emit("treeitem-expanded", item);
                        }
                    });
                    watch(() => props.items, () => {
                        var _a;
                        if (!props.provider) {
                            internalItems.value = (_a = props.items) !== null && _a !== void 0 ? _a : [];
                        }
                    });
                    if (props.provider) {
                        getRootItems();
                    }
                    watch(() => props.provider, () => {
                        if (props.provider) {
                            getRootItems();
                        }
                    });
                    return {
                        internalItems,
                        onItemExpanded,
                        onUpdateSelectedValues
                    };
                },
                template: `
<div>
    <ul class="rocktree">
        <TreeItem v-for="child in internalItems" :modelValue="modelValue" @update:modelValue="onUpdateSelectedValues" @treeitem-expanded="onItemExpanded" :item="child" :multiple="multiple" :disableFolderSelection="disableFolderSelection" />
    </ul>
</div>
`
            }));

        })
    };
}));
