System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Templates/detailBlock', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/modal', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/panel', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/sectionHeader', '@Obsidian/Directives/dragDrop', '@Obsidian/Utility/block', '@Obsidian/Utility/dialogs', '@Obsidian/Utility/component', '@Obsidian/Utility/guid', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/textBox', '@Obsidian/Controls/inlineSwitch', '@Obsidian/Controls/radioButtonList', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/valueDetailList', '@Obsidian/Core/Controls/valueDetailListItemBuilder', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/util'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, computed, ref, watch, onBeforeUnmount, Alert, DetailBlock, CheckBoxList, DropDownList, Modal, NumberBox, Panel, RockButton, SectionHeader, DragReorder, useDragReorder, useInvokeBlockAction, watchPropertyChanges, useConfigurationValues, getSecurityGrant, refreshDetailAttributes, provideSecurityGrant, alert, confirmDelete, updateRefValue, propertyRef, areEqual, AttributeValuesContainer, CheckBox, TextBox, InlineSwitch, RadioButtonList, toNumberOrNull, ValueDetailList, ValueDetailListItemBuilder, pluralConditional, debounce;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
            onBeforeUnmount = module.onBeforeUnmount;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DetailBlock = module["default"];
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            Modal = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            SectionHeader = module["default"];
        }, function (module) {
            DragReorder = module.DragReorder;
            useDragReorder = module.useDragReorder;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            watchPropertyChanges = module.watchPropertyChanges;
            useConfigurationValues = module.useConfigurationValues;
            getSecurityGrant = module.getSecurityGrant;
            refreshDetailAttributes = module.refreshDetailAttributes;
            provideSecurityGrant = module.provideSecurityGrant;
        }, function (module) {
            alert = module.alert;
            confirmDelete = module.confirmDelete;
        }, function (module) {
            updateRefValue = module.updateRefValue;
            propertyRef = module.propertyRef;
        }, function (module) {
            areEqual = module.areEqual;
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            InlineSwitch = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            ValueDetailList = module["default"];
        }, function (module) {
            ValueDetailListItemBuilder = module.ValueDetailListItemBuilder;
        }, function (module) {
            pluralConditional = module.pluralConditional;
        }, function (module) {
            debounce = module.debounce;
        }],
        execute: (function () {

            function calculateColorBrightness(color) {
                if (!color) {
                    return undefined;
                }
                const node = document.createElement("div");
                try {
                    node.setAttribute("style", `color: ${color} !important; display: none !important;`);
                    document.body.appendChild(node);
                    const computedColor = window.getComputedStyle(node).color;
                    const rgbaMatch = computedColor.match(/rgba?\((.*)\)/);
                    if (!rgbaMatch) {
                        return undefined;
                    }
                    const rgba = rgbaMatch[1].split(",").map(Number);
                    const brightness = Math.round(((rgba[0] * 299) + (rgba[1] * 587) + (rgba[2] * 114)) / 1000);
                    return Math.min(255, brightness) / 255;
                }
                finally {
                    node.remove();
                }
            }
            var Source = defineComponent({
                name: "Cms.ContentCollectionDetail.Source",
                components: {
                    RockButton
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    "edit": (_value) => true,
                    "delete": (_value) => true
                },
                setup(props, { emit }) {
                    const barStyle = computed(() => {
                        return {
                            backgroundColor: props.modelValue.color || "#eeeeee"
                        };
                    });
                    const iconStyle = computed(() => {
                        var _a;
                        return {
                            backgroundColor: props.modelValue.color || "#eeeeee",
                            color: ((_a = calculateColorBrightness(props.modelValue.color || "#eeeeee")) !== null && _a !== void 0 ? _a : 0) > 0.5 ? "black" : "white"
                        };
                    });
                    const iconCssClass = computed(() => {
                        var _a;
                        return (_a = props.modelValue.iconCssClass) !== null && _a !== void 0 ? _a : "";
                    });
                    const name = computed(() => {
                        var _a;
                        return (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "";
                    });
                    const includes = computed(() => {
                        if (!props.modelValue.attributes || props.modelValue.attributes.length === 0) {
                            return "";
                        }
                        const attributeNames = props.modelValue.attributes.map(a => { var _a; return (_a = a.text) !== null && _a !== void 0 ? _a : ""; });
                        return `Includes: ${attributeNames.join(", ")}`;
                    });
                    const itemCount = computed(() => {
                        return props.modelValue.itemCount;
                    });
                    const onEditClick = () => {
                        emit("edit", props.modelValue);
                    };
                    const onDeleteClick = () => {
                        emit("delete", props.modelValue);
                    };
                    return {
                        barStyle,
                        iconCssClass,
                        iconStyle,
                        includes,
                        itemCount,
                        name,
                        onDeleteClick,
                        onEditClick
                    };
                },
                template: `
<div class="collection-source">
    <div class="bar" :style="barStyle"></div>
    <div class="icon" :style="iconStyle">
        <i v-if="iconCssClass" :class="iconCssClass"></i>
    </div>
    <div class="title">
        <div class="text">{{ name }}</div>
        <div v-if="includes" class="secondary-text">{{ includes }}</div>
    </div>
    <div class="actions">
        <span class="item-count badge badge-default">{{ itemCount }}</span>
        <span class="reorder-handle btn btn-default btn-sm"><i class="fa fa-bars"></i></span>
        <RockButton btnSize="sm" @click="onEditClick"><i class="fa fa-pencil"></i></RockButton>
        <RockButton btnSize="sm" @click="onDeleteClick"><i class="fa fa-times"></i></RockButton>
    </div>
</div>
`
            });

            var ContentSources = defineComponent({
                name: "Cms.ContentCollectionDetail.ContentSources",
                components: {
                    CheckBoxList,
                    DropDownList,
                    Modal,
                    NumberBox,
                    Panel,
                    RockButton,
                    SectionHeader,
                    Source
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                directives: {
                    DragReorder
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const invokeBlockAction = useInvokeBlockAction();
                    const collectionSources = ref((_a = props.modelValue.sources) !== null && _a !== void 0 ? _a : []);
                    const isAddSourceOpen = ref(false);
                    const addSourceMenuRef = ref(null);
                    const sourceEditBag = ref(null);
                    const isSourceModalOpen = ref(false);
                    const sourceSelectedEntity = ref("");
                    const sourceSelectedEntityAttributes = ref([]);
                    const sourceEntityItems = ref([]);
                    const sourceEntityAttributeTable = ref({});
                    const sourceSelectedEntityOccurrences = ref(null);
                    const addSourceDropdownClass = computed(() => {
                        return isAddSourceOpen.value ? "dropdown clearfix open" : "dropdown clearfix";
                    });
                    const sourceModalTitle = computed(() => {
                        return isAddingSource.value ? "Add Content Source" : "Edit Content Source";
                    });
                    const isAddingSource = computed(() => {
                        var _a;
                        return !((_a = sourceEditBag.value) === null || _a === void 0 ? void 0 : _a.guid);
                    });
                    const isSourceModalCalendar = computed(() => {
                        var _a;
                        return areEqual((_a = sourceEditBag.value) === null || _a === void 0 ? void 0 : _a.entityTypeGuid, "E67D8D6D-4FE6-48D5-A940-A39213047314");
                    });
                    const sourceModalEntityTitle = computed(() => {
                        var _a;
                        if (areEqual((_a = sourceEditBag.value) === null || _a === void 0 ? void 0 : _a.entityTypeGuid, "44484685-477E-4668-89A6-84F29739EB68")) {
                            return "Content Channel";
                        }
                        else {
                            return "Event Calendar";
                        }
                    });
                    const sourceModalEntityName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = sourceEditBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                    });
                    const sourceEntityAttributeItems = computed(() => {
                        var _a;
                        return ((_a = sourceEntityAttributeTable.value[sourceSelectedEntity.value]) !== null && _a !== void 0 ? _a : [])
                            .map(li => {
                            return {
                                value: li.value,
                                text: li.category ? `${li.text} (${li.category})` : li.text
                            };
                        });
                    });
                    const onAddSourceWindowClick = (event) => {
                        var _a;
                        if (!(event.target instanceof HTMLElement) || !isAddSourceOpen.value) {
                            return;
                        }
                        const menu = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest(".dropdown-menu");
                        if (menu !== addSourceMenuRef.value) {
                            isAddSourceOpen.value = false;
                        }
                    };
                    const onAddSourceClick = () => {
                        isAddSourceOpen.value = !isAddSourceOpen.value;
                    };
                    const onAddCalendarSource = () => __awaiter(this, void 0, void 0, function* () {
                        isAddSourceOpen.value = false;
                        const result = yield invokeBlockAction("GetAvailableEventCalendars");
                        if (!result || !result.data) {
                            alert(result.errorMessage || "Unable to get list of event calendars.");
                            return;
                        }
                        sourceSelectedEntity.value = "";
                        sourceSelectedEntityAttributes.value = [];
                        sourceSelectedEntityOccurrences.value = null;
                        sourceEntityItems.value = result.data
                            .filter(e => !collectionSources.value.some(s => areEqual(s.entityGuid, e.guid)))
                            .map(e => ({
                            value: e.guid,
                            text: e.name
                        }));
                        sourceEntityAttributeTable.value = result.data.reduce((table, c) => {
                            var _a, _b;
                            table[(_a = c.guid) !== null && _a !== void 0 ? _a : ""] = (_b = c.attributes) !== null && _b !== void 0 ? _b : [];
                            return table;
                        }, {});
                        sourceEditBag.value = {
                            entityTypeGuid: "E67D8D6D-4FE6-48D5-A940-A39213047314",
                            occurrencesToShow: 0,
                            itemCount: 0
                        };
                        isSourceModalOpen.value = true;
                    });
                    const onAddContentChannelSource = () => __awaiter(this, void 0, void 0, function* () {
                        isAddSourceOpen.value = false;
                        const result = yield invokeBlockAction("GetAvailableContentChannels");
                        if (!result || !result.data) {
                            alert(result.errorMessage || "Unable to get list of content channels.");
                            return;
                        }
                        sourceSelectedEntity.value = "";
                        sourceSelectedEntityAttributes.value = [];
                        sourceSelectedEntityOccurrences.value = null;
                        sourceEntityItems.value = result.data.map(c => ({
                            value: c.guid,
                            text: c.name
                        }));
                        sourceEntityItems.value = result.data
                            .filter(e => !collectionSources.value.some(s => areEqual(s.entityGuid, e.guid)))
                            .map(e => ({
                            value: e.guid,
                            text: e.name
                        }));
                        sourceEntityAttributeTable.value = result.data.reduce((table, c) => {
                            var _a, _b;
                            table[(_a = c.guid) !== null && _a !== void 0 ? _a : ""] = (_b = c.attributes) !== null && _b !== void 0 ? _b : [];
                            return table;
                        }, {});
                        sourceEditBag.value = {
                            entityTypeGuid: "44484685-477E-4668-89A6-84F29739EB68",
                            occurrencesToShow: 0,
                            itemCount: 0
                        };
                        isSourceModalOpen.value = true;
                    });
                    const onSourceSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _b, _c, _d, _e;
                        if (!sourceEditBag.value) {
                            return;
                        }
                        const bag = {
                            guid: (_b = sourceEditBag.value) === null || _b === void 0 ? void 0 : _b.guid,
                            entityTypeGuid: sourceEditBag.value.entityTypeGuid,
                            entityGuid: sourceSelectedEntity.value,
                            attributes: sourceSelectedEntityAttributes.value.map(a => ({ value: a })),
                            occurrencesToShow: (_c = sourceSelectedEntityOccurrences.value) !== null && _c !== void 0 ? _c : 0,
                            itemCount: 0
                        };
                        const data = {
                            key: (_d = props.modelValue) === null || _d === void 0 ? void 0 : _d.idKey,
                            bag
                        };
                        const result = yield invokeBlockAction("SaveCollectionSource", data);
                        if (!result || !result.isSuccess || !((_e = result.data) === null || _e === void 0 ? void 0 : _e.entity)) {
                            alert(result.errorMessage || "Unable to save source.");
                            return;
                        }
                        emit("update:modelValue", result.data.entity);
                        isSourceModalOpen.value = false;
                    });
                    const onDeleteSource = (source) => __awaiter(this, void 0, void 0, function* () {
                        var _f, _g;
                        if (!(yield confirmDelete("Collection Source"))) {
                            return;
                        }
                        const data = {
                            key: (_f = props.modelValue) === null || _f === void 0 ? void 0 : _f.idKey,
                            sourceGuid: source.guid
                        };
                        const result = yield invokeBlockAction("DeleteCollectionSource", data);
                        if (!result || !result.isSuccess || !((_g = result.data) === null || _g === void 0 ? void 0 : _g.entity)) {
                            alert(result.errorMessage || "Unable to delete the collection source.");
                            return;
                        }
                        emit("update:modelValue", result.data.entity);
                    });
                    const onEditSource = (source) => __awaiter(this, void 0, void 0, function* () {
                        var _h, _j, _k;
                        let availableContent;
                        if (areEqual(source.entityTypeGuid, "44484685-477E-4668-89A6-84F29739EB68")) {
                            const result = yield invokeBlockAction("GetAvailableContentChannels");
                            if (!result || !result.data) {
                                alert(result.errorMessage || "Unable to get list of content channels.");
                                return;
                            }
                            availableContent = result.data;
                        }
                        else if (areEqual(source.entityTypeGuid, "E67D8D6D-4FE6-48D5-A940-A39213047314")) {
                            const result = yield invokeBlockAction("GetAvailableEventCalendars");
                            if (!result || !result.data) {
                                alert(result.errorMessage || "Unable to get list of event calendars.");
                                return;
                            }
                            availableContent = result.data;
                        }
                        else {
                            return;
                        }
                        sourceSelectedEntity.value = (_h = source.entityGuid) !== null && _h !== void 0 ? _h : "";
                        sourceSelectedEntityAttributes.value = (_k = (_j = source.attributes) === null || _j === void 0 ? void 0 : _j.map(v => { var _a; return (_a = v.value) !== null && _a !== void 0 ? _a : ""; })) !== null && _k !== void 0 ? _k : [];
                        sourceSelectedEntityOccurrences.value = source.occurrencesToShow > 0 ? source.occurrencesToShow : null;
                        sourceEntityAttributeTable.value = availableContent.reduce((table, c) => {
                            var _a, _b;
                            table[(_a = c.guid) !== null && _a !== void 0 ? _a : ""] = (_b = c.attributes) !== null && _b !== void 0 ? _b : [];
                            return table;
                        }, {});
                        sourceEditBag.value = source;
                        isSourceModalOpen.value = true;
                    });
                    const onSourceReorder = (value, beforeValue) => __awaiter(this, void 0, void 0, function* () {
                        var _l;
                        const data = {
                            key: props.modelValue.idKey,
                            guid: value.guid,
                            beforeGuid: (_l = beforeValue === null || beforeValue === void 0 ? void 0 : beforeValue.guid) !== null && _l !== void 0 ? _l : null
                        };
                        const result = yield invokeBlockAction("ReorderSource", data);
                        if (!result.isSuccess) {
                            alert(result.errorMessage || "Unable to re-order sources, you might need to reload the page.");
                            return;
                        }
                    });
                    const reorderDragOptions = useDragReorder(collectionSources, onSourceReorder);
                    watch(() => props.modelValue, () => {
                        var _a, _b;
                        updateRefValue(collectionSources, (_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.sources) !== null && _b !== void 0 ? _b : []);
                    });
                    watch(isAddSourceOpen, () => {
                        if (isAddSourceOpen.value) {
                            window.addEventListener("click", onAddSourceWindowClick);
                        }
                        else {
                            window.removeEventListener("click", onAddSourceWindowClick);
                        }
                    });
                    onBeforeUnmount(() => {
                        window.removeEventListener("click", onAddSourceWindowClick);
                    });
                    return {
                        addSourceDropdownClass,
                        addSourceMenuRef,
                        isAddingSource,
                        isSourceModalCalendar,
                        isSourceModalOpen,
                        collectionSources,
                        onAddCalendarSource,
                        onAddContentChannelSource,
                        onAddSourceClick,
                        onSourceSave,
                        onDeleteSource,
                        onEditSource,
                        reorderDragOptions,
                        sourceEntityAttributeItems,
                        sourceEntityItems,
                        sourceModalEntityName,
                        sourceModalTitle,
                        sourceModalEntityTitle,
                        sourceSelectedEntity,
                        sourceSelectedEntityAttributes,
                        sourceSelectedEntityOccurrences
                    };
                },
                template: `
<Panel title="Sources">
    <SectionHeader title="Content Sources" description="Content for this collection will be pulled from the following sources within Rock.">
        <template #actions>
            <div :class="addSourceDropdownClass">
                <button type="button" class="btn btn-default btn-sm dropdown-toggle" @click.prevent.stop="onAddSourceClick">
                    <i class="fa fa-plus"></i> <span class="caret"></span>
                </button>

                <ul ref="addSourceMenuRef" class="dropdown-menu dropdown-menu-right">
                    <li><a href="#" @click.prevent="onAddContentChannelSource">Add Content Channel</a></li>
                    <li><a href="#" @click.prevent="onAddCalendarSource">Add Calendar</a></li>
                </ul>
            </div>
        </template>
    </SectionHeader>

    <div class="collection-content-sources" v-drag-reorder="reorderDragOptions">
        <Source v-for="source in collectionSources" :key="source.guid" v-model="source" @delete="onDeleteSource" @edit="onEditSource" />
    </div>
</Panel>

<Modal v-model="isSourceModalOpen"
    :title="sourceModalTitle"
    class="content-source-modal"
    saveText="Save"
    @save="onSourceSave">
    <h1 v-if="!isAddingSource">{{ sourceModalEntityName }}</h1>
    <div v-else class="row">
        <div class="col-md-6">
            <DropDownList v-if="isAddingSource"
                v-model="sourceSelectedEntity"
                :label="sourceModalEntityTitle"
                :items="sourceEntityItems"
                rules="required" />
        </div>
    </div>

    <div class="row" v-if="sourceSelectedEntity">
        <div class="col-md-6">
            <CheckBoxList v-model="sourceSelectedEntityAttributes"
                label="Attributes to Include"
                help="Determines which attributes should be added to the collection index for search and retrieval."
                :items="sourceEntityAttributeItems" />
        </div>

        <div class="col-md-6">
            <NumberBox v-if="isSourceModalCalendar"
                v-model="sourceSelectedEntityOccurrences"
                label="Number of Future Occurrences to Show"
                rules="gte:1" />
        </div>
    </div>

    <div style="margin-bottom: 40px;"></div>
</Modal>
`
            });

            const enablePersonalizationItems = [
                {
                    value: "segments",
                    text: "Segments"
                },
                {
                    value: "requestFilters",
                    text: "Request Filters"
                }
            ];
            var EditPanel = defineComponent({
                name: "Cms.ContentCollectionDetail.EditPanel",
                components: {
                    AttributeValuesContainer,
                    CheckBox,
                    CheckBoxList,
                    NumberBox,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "propertyChanged": (_value) => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e;
                    const attributes = ref((_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                    const attributeValues = ref((_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                    const description = propertyRef((_c = props.modelValue.description) !== null && _c !== void 0 ? _c : "", "Description");
                    const name = propertyRef((_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "", "Name");
                    const collectionKey = propertyRef((_e = props.modelValue.collectionKey) !== null && _e !== void 0 ? _e : "", "CollectionKey");
                    const trendingEnabled = propertyRef(props.modelValue.trendingEnabled, "TrendingEnabled");
                    const trendingWindowDay = propertyRef(props.modelValue.trendingWindowDay, "TrendingWindowDay");
                    const trendingMaxItems = propertyRef(props.modelValue.trendingMaxItems, "TrendingMaxItems");
                    const trendingGravity = propertyRef(props.modelValue.trendingGravity, "TrendingGravity");
                    const enableSegments = propertyRef(props.modelValue.enableSegments, "EnableSegments");
                    const enableRequestFilters = propertyRef(props.modelValue.enableRequestFilters, "EnableRequestFilters");
                    if (!props.modelValue.idKey) {
                        trendingWindowDay.value = 30;
                        trendingMaxItems.value = 10;
                        trendingGravity.value = 1.1;
                    }
                    const propRefs = [description, name, collectionKey, trendingEnabled, trendingWindowDay, trendingMaxItems, trendingGravity, enableSegments, enableRequestFilters];
                    const enablePersonalization = computed({
                        get() {
                            const values = [];
                            if (enableSegments.value) {
                                values.push("segments");
                            }
                            if (enableRequestFilters.value) {
                                values.push("requestFilters");
                            }
                            return values;
                        },
                        set(values) {
                            enableSegments.value = values.includes("segments");
                            enableRequestFilters.value = values.includes("requestFilters");
                        }
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e;
                        updateRefValue(attributes, (_a = props.modelValue.attributes) !== null && _a !== void 0 ? _a : {});
                        updateRefValue(attributeValues, (_b = props.modelValue.attributeValues) !== null && _b !== void 0 ? _b : {});
                        updateRefValue(description, (_c = props.modelValue.description) !== null && _c !== void 0 ? _c : "");
                        updateRefValue(name, (_d = props.modelValue.name) !== null && _d !== void 0 ? _d : "");
                        updateRefValue(collectionKey, (_e = props.modelValue.collectionKey) !== null && _e !== void 0 ? _e : "");
                        updateRefValue(trendingEnabled, props.modelValue.trendingEnabled);
                        updateRefValue(trendingWindowDay, props.modelValue.trendingWindowDay);
                        updateRefValue(trendingMaxItems, props.modelValue.trendingMaxItems);
                        updateRefValue(trendingGravity, props.modelValue.trendingGravity);
                        updateRefValue(enableSegments, props.modelValue.enableSegments);
                        updateRefValue(enableRequestFilters, props.modelValue.enableRequestFilters);
                    });
                    watch([attributeValues, ...propRefs], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { attributeValues: attributeValues.value, description: description.value, name: name.value, collectionKey: collectionKey.value, trendingEnabled: trendingEnabled.value, trendingWindowDay: trendingWindowDay.value, trendingMaxItems: trendingMaxItems.value, trendingGravity: trendingGravity.value, enableSegments: enableSegments.value, enableRequestFilters: enableRequestFilters.value });
                        emit("update:modelValue", newValue);
                    });
                    watchPropertyChanges(propRefs, emit);
                    return {
                        attributes,
                        attributeValues,
                        description,
                        enablePersonalization,
                        enablePersonalizationItems,
                        name,
                        collectionKey,
                        trendingEnabled,
                        trendingWindowDay,
                        trendingMaxItems,
                        trendingGravity
                    };
                },
                template: `
<fieldset>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="name"
                label="Name"
                rules="required" />
        </div>

    </div>

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="collectionKey"
                label="Key"
                help="The unique key that will identify this collection."
                rules="required" />
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <CheckBox v-model="trendingEnabled"
                label="Enable Trending"
                help="Determines if trending metrics should be calculated on each run of the collection update job." />

            <div v-if="trendingEnabled">
                <div class="row">
                    <div class="col-md-6">
                        <NumberBox v-model="trendingWindowDay"
                            label="Trending Window"
                            help="Determines how many days of interactions to look at to determine trending items."
                            :decimalCount="0"
                            rules="required|gte:0">
                            <template #append>
                                <span class="input-group-addon">Days</span>
                            </template>
                        </NumberBox>
                    </div>

                    <div class="col-md-6">
                        <NumberBox v-model="trendingMaxItems"
                            label="Trending Item Count"
                            help="The number of items to mark as trending."
                            :decimalCount="0"
                            rules="required|gte:0" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <NumberBox v-model="trendingGravity"
                            label="Trending Gravity"
                            help="Gravity helps apply more weight to items that are newer. Selecting the correct gravity value can be a bit of trial and error, but we recommend that you start with the default value."
                            rules="required|gte:0" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <CheckBoxList v-model="enablePersonalization"
                label="Enable Personalization"
                help="Determines which personalization features are enabled."
                :items="enablePersonalizationItems" />
        </div>
    </div>

    <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :numberOfColumns="2" />
</fieldset>
`
            });

            var SearchFilter = defineComponent({
                name: "Cms.ContentCollectionDetail.SearchFilter",
                components: {
                    RockButton
                },
                props: {
                    isEnabled: {
                        type: Boolean,
                        default: false
                    },
                    isInconsistent: {
                        type: Boolean,
                        default: false
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    subtitle: {
                        type: String,
                        required: false
                    },
                    description: {
                        type: String,
                        required: false
                    },
                    values: {
                        type: Array,
                        required: false
                    },
                },
                emits: {
                    "edit": () => true
                },
                setup(props, { emit }) {
                    const onEditClick = () => {
                        emit("edit");
                    };
                    return {
                        onEditClick
                    };
                },
                template: `
<div class="search-filter-row">
    <div class="search-filter-icon">
        <i v-if="isEnabled" class="fa fa-check-square" style="color: var(--brand-color);"></i>
        <i v-else class="fa fa-check-square-o" style="color: #c3c2c2;"></i>
    </div>

    <div class="search-filter-content">
        <div class="search-filter-title">
            <span class="title">{{ title }}</span>
            <template v-if="subtitle">&nbsp;<span class="subtitle text-sm text-muted">{{ subtitle }}</span></template>
        </div>
        <div v-if="description" class="search-filter-description">{{ description }}</div>

        <fieldset v-if="!isInconsistent">
            <dl v-for="value in values">
                <dt>{{ value.text }}</dt>
                <dd>{{ value.value }}</dd>
            </dl>
        </fieldset>
        <div v-else class="text-danger margin-t-md margin-b-md">
            The field type configuration of the attribute is not consistent for all sources. Please resolve the inconsistency or rename the attribute key to be unique.
        </div>
    </div>

    <div class="search-filter-actions">
        <RockButton v-if="!isInconsistent" btnSize="sm" @click="onEditClick"><i class="fa fa-pencil"></i></RockButton>
    </div>
</div>
`
            });

            var AttributeSearchFilter = defineComponent({
                name: "Cms.ContentCollectionDetail.AttributeSearchFilter",
                components: {
                    SearchFilter
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    edit: (_value) => true
                },
                setup(props, { emit }) {
                    const isEnabled = computed(() => {
                        return props.modelValue.isEnabled;
                    });
                    const isInconsistent = computed(() => {
                        return props.modelValue.isInconsistent;
                    });
                    const title = computed(() => {
                        var _a;
                        return (_a = props.modelValue.filterLabel) !== null && _a !== void 0 ? _a : "";
                    });
                    const subtitle = computed(() => {
                        return `(${props.modelValue.fieldTypeName})`;
                    });
                    const description = computed(() => {
                        var _a;
                        return `Sources Using: ${(_a = props.modelValue.sourceNames) === null || _a === void 0 ? void 0 : _a.join(", ")}`;
                    });
                    const values = computed(() => {
                        const values = [
                            {
                                text: "Filter Label",
                                value: props.modelValue.fieldTypeName
                            }
                        ];
                        if (areEqual(props.modelValue.fieldTypeGuid, "1EDAFDED-DFE6-4334-B019-6EECBA89E05A")) {
                            values.push({ text: "Filter Control", value: "Boolean" });
                        }
                        else {
                            values.push({
                                text: "Filter Control",
                                value: props.modelValue.filterControl === 1 ? "Dropdown" : "Pills"
                            });
                            values.push({
                                text: "Filter Mode",
                                value: props.modelValue.isMultipleSelection ? "Multi-Select" : "Single-Select"
                            });
                        }
                        return values;
                    });
                    const onEdit = () => {
                        emit("edit", props.modelValue);
                    };
                    return {
                        description,
                        isEnabled,
                        isInconsistent,
                        onEdit,
                        subtitle,
                        title,
                        values
                    };
                },
                template: `
<SearchFilter :isEnabled="isEnabled"
    :isInconsistent="isInconsistent"
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :values="values"
    @edit="onEdit" />
`
            });

            const editFilterTypeItems = [
                {
                    "value": "0",
                    "text": "Single-Select"
                },
                {
                    "value": "1",
                    "text": "Multi-Select"
                }
            ];
            const editFilterControlStandardItems = [
                {
                    "value": 0..toString(),
                    "text": "Pills"
                },
                {
                    "value": 1..toString(),
                    "text": "Dropdown"
                }
            ];
            const editFilterControlBooleanItems = [
                {
                    "value": 2..toString(),
                    "text": "Boolean"
                }
            ];
            var SearchFilters = defineComponent({
                name: "Cms.ContentCollectionDetail.SearchFilters",
                components: {
                    AttributeSearchFilter,
                    InlineSwitch,
                    Modal,
                    Panel,
                    RadioButtonList,
                    RockButton,
                    SearchFilter,
                    SectionHeader,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    console.log("setup");
                    const invokeBlockAction = useInvokeBlockAction();
                    const editFilterKey = ref("");
                    const editFilterName = ref("");
                    const editFilterControl = ref("");
                    const editFilterControlItems = ref([]);
                    const editFilterEnabled = ref(false);
                    const editFilterLabel = ref("");
                    const editFilterType = ref("");
                    const editShowFilterType = ref(false);
                    const isEditModalOpen = ref(false);
                    const isEditFullTextSearch = ref(false);
                    const fullTextSearchEnabled = computed(() => {
                        var _a, _b;
                        return (_b = (_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.fullTextSearchEnabled) !== null && _b !== void 0 ? _b : false;
                    });
                    const yearSearchEnabled = computed(() => {
                        var _a, _b;
                        return (_b = (_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.yearSearchEnabled) !== null && _b !== void 0 ? _b : false;
                    });
                    const yearSearchLabel = computed(() => {
                        var _a;
                        return ((_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.yearSearchLabel) || "Year";
                    });
                    const yearSearchFilterControl = computed(() => {
                        var _a, _b;
                        return (_b = (_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.yearSearchFilterControl) !== null && _b !== void 0 ? _b : 0;
                    });
                    const yearSearchFilterIsMultipleSelection = computed(() => {
                        var _a, _b;
                        return (_b = (_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.yearSearchFilterIsMultipleSelection) !== null && _b !== void 0 ? _b : false;
                    });
                    const yearSearchValues = computed(() => {
                        return [
                            {
                                text: "Filter Label",
                                value: yearSearchLabel.value
                            },
                            {
                                text: "Filter Control",
                                value: yearSearchFilterControl.value === 1 ? "Dropdown" : "Pills"
                            },
                            {
                                text: "Filter Mode",
                                value: yearSearchFilterIsMultipleSelection.value ? "Multi-Select" : "Single-Select"
                            }
                        ];
                    });
                    const attributeFilters = computed(() => {
                        var _a, _b;
                        return (_b = (_a = props.modelValue.filterSettings) === null || _a === void 0 ? void 0 : _a.attributeFilters) !== null && _b !== void 0 ? _b : [];
                    });
                    const onEditAttributeFilter = (filter) => {
                        var _a, _b, _c;
                        if (!filter.attributeKey) {
                            return;
                        }
                        editFilterKey.value = filter.attributeKey;
                        editFilterName.value = (_a = filter.attributeName) !== null && _a !== void 0 ? _a : "";
                        editFilterEnabled.value = filter.isEnabled;
                        editFilterLabel.value = (_c = (_b = filter.filterLabel) !== null && _b !== void 0 ? _b : filter.attributeName) !== null && _c !== void 0 ? _c : "";
                        if (areEqual(filter.fieldTypeGuid, "1EDAFDED-DFE6-4334-B019-6EECBA89E05A")) {
                            editFilterControl.value = 2..toString();
                            editFilterControlItems.value = editFilterControlBooleanItems;
                            editFilterType.value = "0";
                            editShowFilterType.value = false;
                        }
                        else {
                            editFilterControl.value = filter.filterControl.toString();
                            editFilterControlItems.value = editFilterControlStandardItems;
                            editFilterType.value = filter.isMultipleSelection ? "1" : "0";
                            editShowFilterType.value = true;
                        }
                        isEditFullTextSearch.value = false;
                        isEditModalOpen.value = true;
                    };
                    const onEditFullTextSearch = () => {
                        editFilterKey.value = "";
                        editFilterName.value = "Full Text Search";
                        editFilterEnabled.value = fullTextSearchEnabled.value;
                        editShowFilterType.value = false;
                        isEditFullTextSearch.value = true;
                        isEditModalOpen.value = true;
                    };
                    const onEditYearFilter = () => {
                        editFilterKey.value = "";
                        editFilterName.value = "Year";
                        editFilterEnabled.value = yearSearchEnabled.value;
                        editFilterLabel.value = yearSearchLabel.value;
                        editFilterControl.value = yearSearchFilterControl.value.toString();
                        editFilterControlItems.value = editFilterControlStandardItems;
                        editFilterType.value = yearSearchFilterIsMultipleSelection.value ? "1" : "0";
                        editShowFilterType.value = true;
                        isEditFullTextSearch.value = false;
                        isEditModalOpen.value = true;
                    };
                    const onModalSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d;
                        if (!props.modelValue.filterSettings) {
                            return;
                        }
                        const bag = Object.assign({}, props.modelValue.filterSettings);
                        let validProperties;
                        if (isEditFullTextSearch.value) {
                            bag.fullTextSearchEnabled = editFilterEnabled.value;
                            validProperties = ["fullTextSearchEnabled"];
                        }
                        else if (!editFilterKey.value) {
                            bag.yearSearchEnabled = editFilterEnabled.value;
                            bag.yearSearchFilterControl = (_a = toNumberOrNull(editFilterControl.value)) !== null && _a !== void 0 ? _a : 0;
                            bag.yearSearchFilterIsMultipleSelection = editFilterType.value === "1";
                            bag.yearSearchLabel = editFilterLabel.value;
                            validProperties = ["yearSearchEnabled", "yearSearchFilterControl", "yearSearchFilterIsMultipleSelection", "yearSearchLabel"];
                        }
                        else {
                            bag.attributeFilters = [...((_b = bag.attributeFilters) !== null && _b !== void 0 ? _b : [])];
                            const filterIndex = bag.attributeFilters.findIndex(f => f.attributeKey === editFilterKey.value);
                            if (filterIndex === -1) {
                                return;
                            }
                            const filter = Object.assign({}, bag.attributeFilters[filterIndex]);
                            filter.isEnabled = editFilterEnabled.value;
                            filter.filterLabel = editFilterLabel.value;
                            if (areEqual(filter.fieldTypeGuid, "1EDAFDED-DFE6-4334-B019-6EECBA89E05A")) {
                                filter.filterControl = 2;
                                filter.isMultipleSelection = false;
                            }
                            else {
                                filter.filterControl = (_c = toNumberOrNull(editFilterControl.value)) !== null && _c !== void 0 ? _c : 0;
                                filter.isMultipleSelection = editFilterType.value === "1";
                            }
                            bag.attributeFilters.splice(filterIndex, 1, filter);
                            validProperties = ["attributeFilters"];
                        }
                        const box = {
                            entity: bag,
                            validProperties,
                            isEditable: true
                        };
                        const data = {
                            key: props.modelValue.idKey,
                            box
                        };
                        const result = yield invokeBlockAction("SaveFilterSettings", data);
                        if (!result.isSuccess || !((_d = result.data) === null || _d === void 0 ? void 0 : _d.entity)) {
                            alert(result.errorMessage || "Unable to save filter settings.");
                            return;
                        }
                        emit("update:modelValue", result.data.entity);
                        isEditModalOpen.value = false;
                    });
                    return {
                        attributeFilters,
                        editFilterControl,
                        editFilterControlItems,
                        editFilterEnabled,
                        editFilterLabel,
                        editFilterName,
                        editFilterType,
                        editFilterTypeItems,
                        editShowFilterType,
                        fullTextSearchEnabled,
                        isEditFullTextSearch,
                        isEditModalOpen,
                        onEditAttributeFilter,
                        onEditFullTextSearch,
                        onEditYearFilter,
                        onModalSave,
                        yearSearchEnabled,
                        yearSearchValues
                    };
                },
                template: `
<Panel title="Search Filters">
    <SectionHeader title="Search Filters"
        description="The configuration below allows you to set various ways your collection can be filtered." />

    <SearchFilter :isEnabled="fullTextSearchEnabled"
        title="Full Text Search"
        description="Uses the content field of the content channel item or description of an Event Item."
        @edit="onEditFullTextSearch" />

    <SearchFilter :isEnabled="yearSearchEnabled"
        title="Year"
        description="Uses the content channel item's start date to determine the year of the content."
        :values="yearSearchValues"
        @edit="onEditYearFilter" />
    
    <SectionHeader title="Attribute Filters"
        description="The settings below allow you to provide filters for attributes that you have configured to add to your content collection."
        class="margin-t-lg" />

    <AttributeSearchFilter v-for="attribute in attributeFilters"
        :modelValue="attribute"
        @edit="onEditAttributeFilter" />
</Panel>

<Modal v-model="isEditModalOpen"
    title="Edit Search Filter"
    class="search-filter-modal"
    saveText="Save"
    @save="onModalSave">
    <h1>{{ editFilterName }}</h1>

    <div class="row">
        <div class="col-md-6">
            <InlineSwitch v-model="editFilterEnabled"
                label="Enable Filter" />

            <TextBox v-if="!isEditFullTextSearch"
                v-model="editFilterLabel"
                label="Filter Label"
                rules="required" />
        </div>
    </div>

    <div v-if="!isEditFullTextSearch" class="row">
        <div class="col-md-6">
            <RadioButtonList v-model="editFilterControl"
                label="Filter Control"
                horizontal
                :items="editFilterControlItems" />
        </div>

        <div class="col-md-6">
            <RadioButtonList v-if="editShowFilterType"
                v-model="editFilterType"
                label="Filter Type"
                horizontal
                :items="editFilterTypeItems" />
        </div>
    </div>
</Modal>
`
            });

            var ViewPanel = defineComponent({
                name: "Cms.ContentCollectionDetail.ViewPanel",
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    options: {
                        type: Object,
                        required: true
                    }
                },
                components: {
                    AttributeValuesContainer,
                    ValueDetailList
                },
                setup(props) {
                    var _a, _b, _c, _d;
                    const attributes = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : {});
                    const attributeValues = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.attributeValues) !== null && _d !== void 0 ? _d : {});
                    const topValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if (props.modelValue.description) {
                            valueBuilder.addTextValue("Description", props.modelValue.description);
                        }
                        return valueBuilder.build();
                    });
                    const leftSideValues = computed(() => {
                        var _a;
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        valueBuilder.addTextValue("Collection Key", (_a = props.modelValue.collectionKey) !== null && _a !== void 0 ? _a : "");
                        const segmentsLabel = `<span class="label label-${props.modelValue.enableSegments ? "success" : "default"}">Segments</span>`;
                        const requestFiltersLabel = `<span class="label label-${props.modelValue.enableRequestFilters ? "success" : "default"}">Request Filters</span>`;
                        valueBuilder.addHtmlValue("Personalization", `<div class="label-container">${segmentsLabel}${requestFiltersLabel}</div>`);
                        return valueBuilder.build();
                    });
                    const rightSideValues = computed(() => {
                        const valueBuilder = new ValueDetailListItemBuilder();
                        if (!props.modelValue) {
                            return valueBuilder.build();
                        }
                        if (props.modelValue.trendingEnabled) {
                            const label = `<span class="label label-success">Enabled</span>`;
                            const days = `<span class="text-xs"><i class="fa fa-calendar-alt"></i> ${props.modelValue.trendingWindowDay} ${pluralConditional(props.modelValue.trendingWindowDay, "day", "days")}</span>`;
                            const items = `<span class="text-xs"><i class="fa fa-file-alt"></i> ${props.modelValue.trendingMaxItems} ${pluralConditional(props.modelValue.trendingMaxItems, "item", "items")}</span>`;
                            valueBuilder.addHtmlValue("Trending", `<div class="content-collection-trending-state text-muted">${label}${days}${items}</div>`);
                        }
                        else {
                            valueBuilder.addHtmlValue("Trending", `<span class="label label-default">Disabled</span>`);
                        }
                        return valueBuilder.build();
                    });
                    return {
                        attributes,
                        attributeValues,
                        leftSideValues,
                        rightSideValues,
                        topValues
                    };
                },
                template: `
<fieldset>
    <ValueDetailList :modelValue="topValues" />

    <div class="row">
        <div class="col-md-6">
            <ValueDetailList :modelValue="leftSideValues" />
        </div>

        <div class="col-md-6">
            <ValueDetailList :modelValue="rightSideValues" />
        </div>
    </div>

    <AttributeValuesContainer :modelValue="attributeValues" :attributes="attributes" :numberOfColumns="2" />
</fieldset>
`
            });

            var contentCollectionDetail = exports('default', defineComponent({
                name: "Cms.ContentCollectionView",
                components: {
                    Alert,
                    ContentSources,
                    SearchFilters,
                    EditPanel,
                    DetailBlock,
                    ViewPanel
                },
                setup() {
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const securityGrant = getSecurityGrant(config.securityGrantToken);
                    const blockError = ref("");
                    const errorMessage = ref("");
                    const contentCollectionViewBag = ref(config.entity);
                    const contentCollectionEditBag = ref(null);
                    const panelMode = ref(0);
                    const isContentSourcesActive = ref(true);
                    const validProperties = [
                        "attributeValues",
                        "description",
                        "enableRequestFilters",
                        "enableSegments",
                        "filterSettings",
                        "lastIndexDateTime",
                        "lastIndexItemCount",
                        "collectionKey",
                        "name",
                        "trendingEnabled",
                        "trendingGravity",
                        "trendingMaxItems",
                        "trendingWindowDay",
                    ];
                    const refreshAttributesDebounce = debounce(() => refreshDetailAttributes(contentCollectionEditBag, validProperties, invokeBlockAction), undefined, true);
                    const isIndexRebuilding = ref(false);
                    const panelName = computed(() => {
                        var _a, _b;
                        return (_b = (_a = contentCollectionViewBag.value) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
                    });
                    const entityKey = computed(() => {
                        var _a, _b;
                        return (_b = (_a = contentCollectionViewBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : "";
                    });
                    const blockLabels = computed(() => {
                        const labels = [];
                        if (panelMode.value !== 0) {
                            return null;
                        }
                        return labels;
                    });
                    const isEditable = computed(() => {
                        return config.isEditable === true;
                    });
                    const options = computed(() => {
                        var _a;
                        return (_a = config.options) !== null && _a !== void 0 ? _a : {};
                    });
                    const isViewing = computed(() => {
                        return panelMode.value === 0;
                    });
                    const contentSourcesNavClass = computed(() => {
                        return isContentSourcesActive.value ? "active" : "";
                    });
                    const searchFiltersNavClass = computed(() => {
                        return isContentSourcesActive.value ? "" : "active";
                    });
                    const footerSecondaryActions = computed(() => {
                        const actions = [];
                        if (config.isEditable) {
                            actions.push({
                                type: "default",
                                title: "Rebuild Index",
                                iconCssClass: !isIndexRebuilding.value ? "fa fa-download" : "fa fa-cog fa-spin",
                                disabled: isIndexRebuilding.value,
                                handler: onRebuildIndex
                            });
                        }
                        return actions;
                    });
                    const onCancelEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        if (!((_a = contentCollectionEditBag.value) === null || _a === void 0 ? void 0 : _a.idKey)) {
                            if ((_b = config.navigationUrls) === null || _b === void 0 ? void 0 : _b["ParentPage"]) {
                                window.location.href = config.navigationUrls["ParentPage"];
                            }
                            return false;
                        }
                        return true;
                    });
                    const onDelete = () => __awaiter(this, void 0, void 0, function* () {
                        var _c, _d;
                        errorMessage.value = "";
                        const result = yield invokeBlockAction("Delete", {
                            key: (_c = contentCollectionViewBag.value) === null || _c === void 0 ? void 0 : _c.idKey
                        });
                        if (result.isSuccess && result.data) {
                            window.location.href = result.data;
                        }
                        else {
                            errorMessage.value = (_d = result.errorMessage) !== null && _d !== void 0 ? _d : "Unknown error while trying to delete content collection.";
                        }
                    });
                    const onEdit = () => __awaiter(this, void 0, void 0, function* () {
                        var _e;
                        const result = yield invokeBlockAction("Edit", {
                            key: (_e = contentCollectionViewBag.value) === null || _e === void 0 ? void 0 : _e.idKey
                        });
                        if (result.isSuccess && result.data && result.data.entity) {
                            contentCollectionEditBag.value = result.data.entity;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const onPropertyChanged = (propertyName) => {
                        if (!config.qualifiedAttributeProperties || !config.qualifiedAttributeProperties.some(n => n.toLowerCase() === propertyName.toLowerCase())) {
                            return;
                        }
                        refreshAttributesDebounce();
                    };
                    const onSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        errorMessage.value = "";
                        const data = {
                            entity: contentCollectionEditBag.value,
                            isEditable: true,
                            validProperties: validProperties
                        };
                        const result = yield invokeBlockAction("Save", {
                            box: data
                        });
                        if (result.isSuccess && result.data) {
                            if (result.statusCode === 200 && typeof result.data === "object") {
                                contentCollectionViewBag.value = result.data;
                                return true;
                            }
                            else if (result.statusCode === 201 && typeof result.data === "string") {
                                window.location.href = result.data;
                                return false;
                            }
                        }
                        errorMessage.value = (_f = result.errorMessage) !== null && _f !== void 0 ? _f : "Unknown error while trying to save content collection.";
                        return false;
                    });
                    const onContentSourcesNav = () => {
                        isContentSourcesActive.value = true;
                    };
                    const onSearchFiltersNav = () => {
                        isContentSourcesActive.value = false;
                    };
                    const onRebuildIndex = () => __awaiter(this, void 0, void 0, function* () {
                        var _g;
                        if (isIndexRebuilding.value) {
                            return;
                        }
                        isIndexRebuilding.value = true;
                        const result = yield invokeBlockAction("RebuildIndex", {
                            key: (_g = contentCollectionViewBag.value) === null || _g === void 0 ? void 0 : _g.idKey
                        });
                        isIndexRebuilding.value = false;
                        if (result.isSuccess && result.data) {
                            yield alert(result.data);
                        }
                        else {
                            yield alert(result.errorMessage || "Unknown error while trying to rebuild the index.");
                        }
                    });
                    provideSecurityGrant(securityGrant);
                    if (config.errorMessage) {
                        blockError.value = config.errorMessage;
                    }
                    else if (!config.entity) {
                        blockError.value = "The specified content collection could not be viewed.";
                    }
                    else if (!config.entity.idKey) {
                        contentCollectionEditBag.value = config.entity;
                        panelMode.value = 2;
                    }
                    return {
                        contentCollectionViewBag,
                        contentCollectionEditBag,
                        contentSourcesNavClass,
                        blockError,
                        blockLabels,
                        entityKey,
                        entityTypeGuid: "AD7B9219-1B47-4164-9DD1-90F0AF588CB8",
                        errorMessage,
                        isContentSourcesActive,
                        isEditable,
                        isViewing,
                        onCancelEdit,
                        onContentSourcesNav,
                        onDelete,
                        onEdit,
                        onPropertyChanged,
                        onSave,
                        onSearchFiltersNav,
                        options,
                        panelMode,
                        panelName,
                        searchFiltersNavClass,
                        footerSecondaryActions
                    };
                },
                template: `
<Alert v-if="blockError" alertType="warning" v-text="blockError" />

<Alert v-if="errorMessage" alertType="danger" v-text="errorMessage" />

<v-style>
    .content-collection-detail .label-container > .label + .label {
        margin-left: 8px;
    }
    .content-collection-detail .content-collection-trending-state > span + span {
        margin-left: 8px;
    }

    .content-collection-detail .collection-source {
        display: flex;
        min-height: 64px;
        border-radius: 8px;
        border: 1px solid #c4c4c4;
        overflow: clip;
        align-items: center;
    }

    .content-collection-detail .collection-source + .collection-source {
        margin-top: 16px;
    }

    .content-collection-detail .collection-source > .bar {
        width: 8px;
        align-self: stretch;
    }

    .content-collection-detail .collection-source > .icon {
        margin: 0px 8px;
        width: 34px;
        height: 34px;
        border-radius: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-collection-detail .collection-source > .title {
        flex: 1 0 0;
    }

    .content-collection-detail .collection-source > .title > .text {
        font-weight: bold;
    }

    .content-collection-detail .collection-source > .title > .secondary-text {
        color: #737475;
        font-size: 0.8em;
    }

    /* Overrides to fix panel-body targets. */
    .content-collection-detail .panel-body .collection-source > .actions {
        margin: initial;
        border: initial;
    }

    .content-collection-detail .collection-source > .actions > .item-count {
        margin-right: 12px;
    }

    .content-collection-detail .search-filter-row {
        display: flex;
    }

    .content-collection-detail .search-filter-row + .search-filter-row {
        border-top: 1px solid #dfe0e1;
        padding-top: 24px;
    }

    .content-collection-detail .search-filter-icon {
        width: 48px;
        text-align: center;
        font-size: 20px;
    }

    .content-collection-detail .search-filter-content {
        flex: 1 0 0;
    }

    .content-collection-detail .search-filter-title > .title {
        font-weight: bold;
    }

    .content-collection-detail .search-filter-description {
    }

    .content-collection-detail .search-filter-content > fieldset {
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
    }

    .content-collection-detail .search-filter-content > fieldset > dl {
        flex: 1 0 33.33%;
    }
</v-style>

<div v-if="!blockError">
    <DetailBlock v-model:mode="panelMode"
        :name="panelName"
        :labels="blockLabels"
        :entityKey="entityKey"
        :entityTypeGuid="entityTypeGuid"
        entityTypeName="ContentCollection"
        :isAuditHidden="false"
        :isBadgesVisible="true"
        :isDeleteVisible="isEditable"
        :isEditVisible="isEditable"
        :isFollowVisible="false"
        :isSecurityHidden="true"
        :footerSecondaryActions="footerSecondaryActions"
        @cancelEdit="onCancelEdit"
        @delete="onDelete"
        @edit="onEdit"
        @save="onSave">
        <template #view>
            <ViewPanel :modelValue="contentCollectionViewBag" :options="options" />
        </template>

        <template #edit>
            <EditPanel v-model="contentCollectionEditBag" :options="options" @propertyChanged="onPropertyChanged" />
        </template>
    </DetailBlock>

    <div v-if="isViewing">
        <ul class="nav nav-pills nav-sm margin-b-md">
            <li :class="contentSourcesNavClass" role="presentation"><a href="#" @click.prevent="onContentSourcesNav">Content Sources</a></li>
            <li :class="searchFiltersNavClass" role="presentation"><a href="#" @click.prevent="onSearchFiltersNav">Search Filters</a></li>
        </ul>

        <ContentSources v-if="isContentSourcesActive" v-model="contentCollectionViewBag" />
        <SearchFilters v-else v-model="contentCollectionViewBag" />
    </div>
</div>
`
            }));

        })
    };
}));
