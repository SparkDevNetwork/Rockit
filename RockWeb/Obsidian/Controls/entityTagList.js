System.register(['tslib', '@Obsidian/Utility/http', '@Obsidian/Utility/suspense', 'ant-design-vue', 'vue', '@Obsidian/Utility/block', '@Obsidian/Utility/dialogs'], (function (exports) {
    'use strict';
    var __awaiter, useHttp, useSuspense, AutoComplete, defineComponent, computed, ref, watch, nextTick, useSecurityGrantToken, alert, confirm;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            useSuspense = module.useSuspense;
        }, function (module) {
            AutoComplete = module.AutoComplete;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
            nextTick = module.nextTick;
        }, function (module) {
            useSecurityGrantToken = module.useSecurityGrantToken;
        }, function (module) {
            alert = module.alert;
            confirm = module.confirm;
        }],
        execute: (function () {

            const tag = defineComponent({
                name: "EntityTagList.Tag",
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "removeTag": (_value) => true
                },
                setup(props, { emit }) {
                    const text = computed(() => {
                        var _a;
                        return (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "";
                    });
                    const iconCssClass = computed(() => {
                        var _a;
                        return (_a = props.modelValue.iconCssClass) !== null && _a !== void 0 ? _a : "";
                    });
                    const tagClass = computed(() => {
                        return props.modelValue.isPersonal ? "tag personal" : "tag";
                    });
                    const tagStyle = computed(() => {
                        const styles = {};
                        if (props.modelValue.backgroundColor) {
                            styles["background-color"] = props.modelValue.backgroundColor;
                        }
                        return styles;
                    });
                    const onRemoveTag = () => {
                        var _a;
                        emit("removeTag", (_a = props.modelValue.idKey) !== null && _a !== void 0 ? _a : "");
                    };
                    return {
                        iconCssClass,
                        onRemoveTag,
                        tagClass,
                        tagStyle,
                        text
                    };
                },
                template: `
<span :class="tagClass" :style="tagStyle">
    <span v-if="iconCssClass" class="tag-icon">
        <i :class="iconCssClass"></i>
    </span>
    <span>{{ text }}</span>
    <a v-if="!disabled" href="#" title="Remove tag" @click.prevent.stop="onRemoveTag">x</a>
</span>
`
            });
            function getEntityTags(http, entityTypeGuid, entityKey, securityToken) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = {
                        entityTypeGuid: entityTypeGuid,
                        entityKey: entityKey,
                        securityGrantToken: securityToken
                    };
                    const result = yield http.post("/api/v2/Controls/EntityTagListGetEntityTags", undefined, data);
                    if (result.isSuccess && result.data) {
                        return result.data;
                    }
                    return [];
                });
            }
            var entityTagList = exports('default', defineComponent({
                name: "EntityTagList",
                components: {
                    AutoComplete,
                    Tag: tag
                },
                props: {
                    entityTypeGuid: {
                        type: String,
                        required: false
                    },
                    entityKey: {
                        type: String,
                        required: false
                    },
                    categoryGuid: {
                        type: String,
                        required: false
                    },
                    lazyMode: {
                        type: String,
                        default: "lazy"
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {},
                setup(props) {
                    var _a;
                    const securityToken = useSecurityGrantToken();
                    const http = useHttp();
                    const currentTags = ref([]);
                    const searchValue = ref("");
                    const searchOptions = ref([]);
                    const isNewTagVisible = ref(false);
                    const tagsInputRef = ref(null);
                    let loadCancelledToken = null;
                    let searchCancelledToken = null;
                    let isAddNewTagCancelled = false;
                    const getTagByName = (name) => __awaiter(this, void 0, void 0, function* () {
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            categoryGuid: props.categoryGuid,
                            name: name,
                            securityGrantToken: securityToken.value
                        };
                        const result = yield http.post("/api/v2/Controls/EntityTagListGetAvailableTags", undefined, data);
                        if (result.isSuccess && result.data) {
                            const tags = result.data.filter(t => { var _a; return ((_a = t.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === name.toLowerCase(); });
                            if (tags.length >= 1) {
                                return tags[0];
                            }
                            else {
                                return null;
                            }
                        }
                        else {
                            return null;
                        }
                    });
                    const createPersonalTag = (name) => __awaiter(this, void 0, void 0, function* () {
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            categoryGuid: props.categoryGuid,
                            name: name,
                            securityGrantToken: securityToken.value
                        };
                        const result = yield http.post("/api/v2/Controls/EntityTagListCreatePersonalTag", undefined, data);
                        if ((result.isSuccess || result.statusCode === 409) && result.data) {
                            return result.data;
                        }
                        else {
                            return null;
                        }
                    });
                    const addTag = (tagKey) => __awaiter(this, void 0, void 0, function* () {
                        var _b;
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            tagKey: tagKey,
                            securityGrantToken: securityToken.value
                        };
                        const result = yield http.post("/api/v2/Controls/EntityTagListAddEntityTag", undefined, data);
                        if (result.isSuccess && result.data) {
                            const newTags = [...currentTags.value];
                            newTags.push(result.data);
                            newTags.sort((a, b) => { var _a, _b; return ((_a = a.name) !== null && _a !== void 0 ? _a : "").localeCompare((_b = b.name) !== null && _b !== void 0 ? _b : ""); });
                            currentTags.value = newTags;
                            searchValue.value = "";
                        }
                        else {
                            alert((_b = result.errorMessage) !== null && _b !== void 0 ? _b : "Unable to add tag.");
                        }
                    });
                    const removeTag = (tagKey) => __awaiter(this, void 0, void 0, function* () {
                        var _c;
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            tagKey: tagKey,
                            securityGrantToken: securityToken.value
                        };
                        const result = yield http.post("/api/v2/Controls/EntityTagListRemoveEntityTag", undefined, data);
                        if (result.isSuccess) {
                            const newTags = currentTags.value.filter(t => t.idKey !== tagKey);
                            currentTags.value = newTags;
                        }
                        else {
                            alert((_c = result.errorMessage) !== null && _c !== void 0 ? _c : "Unable to remove tag.");
                        }
                    });
                    const addNamedTag = (tagName) => __awaiter(this, void 0, void 0, function* () {
                        var _d;
                        let tag = yield getTagByName(tagName);
                        if (tag === null) {
                            if (!(yield confirm(`A tag called "${tagName}" does not exist. Do you want to create a new personal tag?`))) {
                                return;
                            }
                            tag = yield createPersonalTag(tagName);
                            if (tag === null) {
                                yield alert("Unable to create personal tag.");
                                return;
                            }
                        }
                        yield addTag((_d = tag.idKey) !== null && _d !== void 0 ? _d : "");
                    });
                    const loadExistingTags = () => __awaiter(this, void 0, void 0, function* () {
                        if (loadCancelledToken) {
                            loadCancelledToken.value = true;
                        }
                        if (props.entityTypeGuid && props.entityKey) {
                            const cancelled = ref(false);
                            loadCancelledToken = cancelled;
                            const tags = yield getEntityTags(http, props.entityTypeGuid, props.entityKey, securityToken.value);
                            if (!cancelled.value) {
                                currentTags.value = tags;
                            }
                        }
                    });
                    const onSelect = (value) => {
                        var _a;
                        isAddNewTagCancelled = true;
                        const item = searchOptions.value.filter(o => o.value === value);
                        if (item.length === 0) {
                            return;
                        }
                        searchValue.value = item[0].label;
                        addTag((_a = item[0].value) !== null && _a !== void 0 ? _a : "");
                    };
                    const onSearch = (value) => __awaiter(this, void 0, void 0, function* () {
                        if (searchCancelledToken) {
                            searchCancelledToken.value = true;
                        }
                        if (!value) {
                            return;
                        }
                        const cancelled = ref(false);
                        searchCancelledToken = cancelled;
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            name: value
                        };
                        const result = yield http.post("/api/v2/Controls/EntityTagListGetAvailableTags", undefined, data);
                        if (result.isSuccess && result.data) {
                            searchOptions.value = result.data.map(t => {
                                var _a, _b;
                                return {
                                    value: (_a = t.idKey) !== null && _a !== void 0 ? _a : "",
                                    label: (_b = t.name) !== null && _b !== void 0 ? _b : ""
                                };
                            });
                        }
                    });
                    const onInputKeyDown = (ev) => {
                        if (ev.keyCode === 13 && searchValue.value) {
                            const tagName = searchValue.value;
                            isAddNewTagCancelled = false;
                            setTimeout(() => {
                                if (!isAddNewTagCancelled) {
                                    addNamedTag(tagName);
                                }
                            }, 1);
                        }
                    };
                    const onRemoveTag = (tagKey) => __awaiter(this, void 0, void 0, function* () {
                        yield removeTag(tagKey);
                    });
                    const onAddNewTagsClick = () => {
                        isNewTagVisible.value = true;
                        nextTick(() => {
                            var _a;
                            const input = (_a = tagsInputRef.value) === null || _a === void 0 ? void 0 : _a.querySelector("input.ant-select-selection-search-input");
                            input === null || input === void 0 ? void 0 : input.focus();
                        });
                    };
                    watch([() => props.entityTypeGuid, () => props.entityKey, () => props.categoryGuid], () => {
                        loadExistingTags();
                    });
                    if (props.lazyMode === "eager") {
                        (_a = useSuspense()) === null || _a === void 0 ? void 0 : _a.addOperation(loadExistingTags());
                    }
                    else {
                        loadExistingTags();
                    }
                    return {
                        currentTags,
                        isNewTagVisible,
                        onAddNewTagsClick,
                        onInputKeyDown,
                        onRemoveTag,
                        onSearch,
                        onSelect,
                        searchOptions,
                        searchValue,
                        tagsInputRef
                    };
                },
                template: `
<div class="taglist clearfix">
    <v-style>
.taglist .ant-select-auto-complete.ant-select {
    width: 125px;
}

.taglist .ant-select-auto-complete.ant-select > .ant-select-selector {
    border: 0px;
    padding: 0px;
    height: 22px;
    font-size: 12px;
    background: transparent;
}

.taglist .ant-select-auto-complete.ant-select-focused.ant-select > .ant-select-selector,
.taglist .ant-select-auto-complete.ant-select > .ant-select-selector:hover {
    border: 0px;
    box-shadow: initial;
    background: rgba(0,0,0,0.05);
}

.taglist .ant-select-auto-complete.ant-select > .ant-select-selector .ant-select-selection-search {
    left: 6px;
    right: 6px;
}

.taglist .ant-select-auto-complete.ant-select > .ant-select-selector .ant-select-selection-placeholder {
    position: absolute;
    margin-left: 6px;
    line-height: 22px;
}

.taglist .ant-select-auto-complete.ant-select .ant-select-selection-search-input {
    height: 22px;
}

.taglist .add-new-tags {
    float: left;
    height: 22px;
    font-size: 0.7em;
    line-height: 22px;
}
    </v-style>

    <div class="tag-wrap">
        <div class="tagsinput" ref="tagsInputRef">
            <Tag v-for="tag in currentTags"
                :key="tag.value"
                :modelValue="tag"
                :disabled="disabled"
                @removeTag="onRemoveTag" />

            <template v-if="!disabled">
                <AutoComplete v-if="isNewTagVisible"
                    v-model:value="searchValue"
                    :options="searchOptions"
                    placeholder="tag name"
                    @select="onSelect"
                    @search="onSearch"
                    @inputKeyDown="onInputKeyDown" />

                <span v-else class="text-muted add-new-tags clickable" @click="onAddNewTagsClick">
                    <i class="fa fa-plus"></i>
                </span>
            </template>
        </div>
    </div>
</div>
`
            }));

        })
    };
}));
