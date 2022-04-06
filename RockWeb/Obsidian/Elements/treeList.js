System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, treeItem;
    var __moduleName = context_1 && context_1.id;
    function isPromise(obj) {
        return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            treeItem = vue_1.defineComponent({
                name: "TreeList.Item",
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    allowMultiple: {
                        type: Boolean,
                        default: false
                    },
                    item: {
                        type: Object,
                        default: {}
                    }
                },
                emits: [
                    "treeitem-expanded",
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const children = vue_1.computed(() => { var _a; return (_a = props.item.children) !== null && _a !== void 0 ? _a : []; });
                    const hasChildren = vue_1.computed(() => children.value.length > 0);
                    const isFolder = vue_1.computed(() => props.item.isFolder && props.item.hasChildren);
                    const itemName = vue_1.computed(() => { var _a; return (_a = props.item.text) !== null && _a !== void 0 ? _a : ""; });
                    const showChildren = vue_1.ref(false);
                    const listItemClass = vue_1.computed(() => {
                        return isFolder.value ? "rocktree-item rocktree-folder" : "rocktree-item rocktree-leaf";
                    });
                    const folderClass = vue_1.computed(() => {
                        return showChildren.value
                            ? "rocktree-icon icon-fw fa fa-fw fa-chevron-down"
                            : "rocktree-icon icon-fw fa fa-fw fa-chevron-right";
                    });
                    const itemIconClass = vue_1.computed(() => {
                        return `icon-fw ${props.item.iconCssClass}`;
                    });
                    const itemNameClass = vue_1.computed(() => {
                        if (props.item.value && props.modelValue.includes(props.item.value)) {
                            return "rocktree-name selected";
                        }
                        else {
                            return "rocktree-name";
                        }
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
                        if (props.allowMultiple) {
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
        <TreeList.Item :modelValue="modelValue" @update:modelValue="onUpdateSelectedValues" @treeitem-expanded="onChildItemExpanded" :item="child" :allowMultiple="allowMultiple" />
    </ul>
</li>
`
            });
            exports_1("default", vue_1.defineComponent({
                name: "TreeList",
                components: {
                    TreeItem: treeItem
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
                        type: Array,
                        default: []
                    },
                    provider: {
                        type: Object
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:items",
                    "treeitem-expanded"
                ],
                setup(props, { emit }) {
                    var _a;
                    const internalItems = vue_1.ref((_a = props.items) !== null && _a !== void 0 ? _a : []);
                    const getRootItems = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.provider) {
                            const result = props.provider.getRootItems();
                            const rootItems = isPromise(result) ? yield result : result;
                            internalItems.value = JSON.parse(JSON.stringify(rootItems));
                            emit("update:items", internalItems.value);
                        }
                    });
                    const onUpdateSelectedValues = (values) => {
                        if (props.allowMultiple) {
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
                    vue_1.watch(() => props.items, () => {
                        var _a;
                        if (!props.provider) {
                            internalItems.value = (_a = props.items) !== null && _a !== void 0 ? _a : [];
                        }
                    });
                    if (props.provider) {
                        getRootItems();
                    }
                    return {
                        internalItems,
                        onItemExpanded,
                        onUpdateSelectedValues
                    };
                },
                template: `
<div>
    <ul class="rocktree">
        <TreeItem v-for="child in internalItems" :modelValue="modelValue" @update:modelValue="onUpdateSelectedValues" @treeitem-expanded="onItemExpanded" :item="child" :allowMultiple="allowMultiple" />
    </ul>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=treeList.js.map