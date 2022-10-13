System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/codeEditor', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/inlineCheckBox', '@Obsidian/Controls/loadingIndicator', '@Obsidian/Controls/modal', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/rockFormFieldError', '@Obsidian/Controls/sectionHeader', '@Obsidian/Controls/textBox', '@Obsidian/Utility/block', '@Obsidian/Directives/dragDrop', '@Obsidian/Utility/component', '@Obsidian/Utility/dialogs', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, Alert, CheckBox, CheckBoxList, CodeEditor, DropDownList, InlineCheckBox, LoadingIndicator, Modal, NumberBox, RockButton, RockFormFieldError, SectionHeader, TextBox, useInvokeBlockAction, getSecurityGrant, useReloadBlock, provideSecurityGrant, setCustomSettingsBoxValue, DragReorder, useDragReorder, useVModelPassthrough, alert, areEqual;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            CodeEditor = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            InlineCheckBox = module["default"];
        }, function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            Modal = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            RockFormFieldError = module["default"];
        }, function (module) {
            SectionHeader = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            getSecurityGrant = module.getSecurityGrant;
            useReloadBlock = module.useReloadBlock;
            provideSecurityGrant = module.provideSecurityGrant;
            setCustomSettingsBoxValue = module.setCustomSettingsBoxValue;
        }, function (module) {
            DragReorder = module.DragReorder;
            useDragReorder = module.useDragReorder;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            alert = module.alert;
        }, function (module) {
            areEqual = module.areEqual;
        }],
        execute: (function () {

            var FilterGrid = defineComponent({
                name: "Cms.ContentCollectionView.CustomSettings.FilterGrid",
                components: {
                    InlineCheckBox
                },
                directives: {
                    DragReorder
                },
                props: {
                    modelValue: {
                        type: Array,
                        required: true
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true,
                    "edit": (_value) => true
                },
                setup(props, { emit }) {
                    const filters = useVModelPassthrough(props, "modelValue", emit);
                    const reorderDragOptions = useDragReorder(filters);
                    const onEditClick = (rowName) => {
                        emit("edit", rowName);
                    };
                    return {
                        filters,
                        onEditClick,
                        reorderDragOptions
                    };
                },
                template: `
<div class="grid">
    <div class="table-no-border">
        <table class="grid-table table table-condensed table-light">
            <thead>
                <tr align="left">
                    <th class="grid-columncommand"></th>
                    <th>Show</th>
                    <th>Filter</th>
                    <th>Filter Header Markup</th>
                    <th class="grid-columncommand"></th>
                </tr>
            </thead>

            <tbody v-drag-reorder="reorderDragOptions">
                <tr v-for="row in filters" :key="row.name" align="left">
                    <td class="grid-columnreorder" align="center">
                        <a class="minimal reorder-handle" href="#">
                            <i class="fa fa-bars"></i>
                        </a>
                    </td>
                    
                    <td class="grid-select-field" align="center">
                        <InlineCheckBox v-model="row.show" />
                    </td>
                    <td>{{ row.name }}</td>
                    
                    <td class="grid-bool-field" align="center">
                        <i v-if="row.headerMarkup" class="fa fa-check"></i>
                    </td>
                    
                    <td class="grid-columncommand" align="center">
                        <a class="btn btn-default btn-sm" href="#" @click.prevent="onEditClick(row.name)">
                            <i class="fa fa-pencil"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`
            });

            const enabledSortOrdersItems = [
                {
                    value: "relevance",
                    text: "Relevance"
                },
                {
                    value: "newest",
                    text: "Newest"
                },
                {
                    value: "oldest",
                    text: "Oldest"
                },
                {
                    value: "trending",
                    text: "Trending"
                },
                {
                    value: "alphabetical",
                    text: "Alphabetical"
                }
            ];
            var contentCollectionViewCustomSettings = exports('default', defineComponent({
                name: "Cms.ContentCollectionView.CustomSettings",
                components: {
                    Alert,
                    CheckBox,
                    CheckBoxList,
                    CodeEditor,
                    DropDownList,
                    FilterGrid,
                    InlineCheckBox,
                    LoadingIndicator,
                    Modal,
                    NumberBox,
                    RockButton,
                    RockFormFieldError,
                    SectionHeader,
                    TextBox
                },
                emits: {
                    "close": () => true
                },
                setup(props, { emit }) {
                    const invokeBlockAction = useInvokeBlockAction();
                    const securityGrant = getSecurityGrant(null);
                    const reloadBlock = useReloadBlock();
                    const errorMessage = ref("");
                    const isLoading = ref(true);
                    const isModalOpen = ref(true);
                    const contentCollection = ref("");
                    const contentCollectionItems = ref([]);
                    const groupResultsBySource = ref(false);
                    const searchOnLoad = ref(false);
                    const numberOfResults = ref(null);
                    const showFiltersPanel = ref(false);
                    const showFullTextSearch = ref(false);
                    const showSort = ref(false);
                    const enabledSortOrders = ref([]);
                    const trendingTerm = ref("");
                    const filters = ref([]);
                    const resultsTemplate = ref("");
                    const itemTemplate = ref("");
                    const preSearchTemplate = ref("");
                    const boostMatchingSegments = ref(false);
                    const boostMatchingRequestFilters = ref(false);
                    const segmentBoostAmount = ref(null);
                    const requestFilterBoostAmount = ref(null);
                    const editingFilter = ref(null);
                    const editingFilterHeaderMarkup = ref("");
                    const saveButtonText = computed(() => {
                        return errorMessage.value || !isLoading.value ? "Save" : "";
                    });
                    const isTrendingSortEnabled = computed(() => {
                        return enabledSortOrders.value.includes("trending");
                    });
                    const startLoading = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        const result = yield invokeBlockAction("GetCustomSettings");
                        if (result.isSuccess && result.data && result.data.settings && result.data.options) {
                            contentCollection.value = (_a = result.data.settings.contentCollection) !== null && _a !== void 0 ? _a : "";
                            showFiltersPanel.value = result.data.settings.showFiltersPanel;
                            showFullTextSearch.value = result.data.settings.showFullTextSearch;
                            showSort.value = result.data.settings.showSort;
                            numberOfResults.value = (_b = result.data.settings.numberOfResults) !== null && _b !== void 0 ? _b : null;
                            searchOnLoad.value = result.data.settings.searchOnLoad;
                            groupResultsBySource.value = result.data.settings.groupResultsBySource;
                            enabledSortOrders.value = (_c = result.data.settings.enabledSortOrders) !== null && _c !== void 0 ? _c : [];
                            trendingTerm.value = (_d = result.data.settings.trendingTerm) !== null && _d !== void 0 ? _d : "";
                            filters.value = (_e = result.data.settings.filters) !== null && _e !== void 0 ? _e : [];
                            resultsTemplate.value = (_f = result.data.settings.resultsTemplate) !== null && _f !== void 0 ? _f : "";
                            itemTemplate.value = (_g = result.data.settings.itemTemplate) !== null && _g !== void 0 ? _g : "";
                            preSearchTemplate.value = (_h = result.data.settings.preSearchTemplate) !== null && _h !== void 0 ? _h : "";
                            boostMatchingSegments.value = result.data.settings.boostMatchingSegments;
                            boostMatchingRequestFilters.value = result.data.settings.boostMatchingRequestFilters;
                            segmentBoostAmount.value = (_j = result.data.settings.segmentBoostAmount) !== null && _j !== void 0 ? _j : null;
                            requestFilterBoostAmount.value = (_k = result.data.settings.requestFilterBoostAmount) !== null && _k !== void 0 ? _k : null;
                            securityGrant.updateToken(result.data.securityGrantToken);
                            contentCollectionItems.value = (_l = result.data.options.contentCollectionItems) !== null && _l !== void 0 ? _l : [];
                        }
                        else {
                            errorMessage.value = result.errorMessage || "Unknown error while loading custom settings.";
                        }
                        isLoading.value = false;
                    });
                    const onEditFilter = (filterName) => {
                        var _a, _b, _c;
                        editingFilter.value = (_a = filters.value.find(f => f.name === filterName)) !== null && _a !== void 0 ? _a : null;
                        editingFilterHeaderMarkup.value = (_c = (_b = editingFilter.value) === null || _b === void 0 ? void 0 : _b.headerMarkup) !== null && _c !== void 0 ? _c : "";
                    };
                    const onEditFilterCancel = () => {
                        editingFilter.value = null;
                        editingFilterHeaderMarkup.value = "";
                    };
                    const onEditFilterSave = () => {
                        if (editingFilter.value) {
                            editingFilter.value.headerMarkup = editingFilterHeaderMarkup.value;
                            editingFilter.value = null;
                        }
                    };
                    const onSave = () => __awaiter(this, void 0, void 0, function* () {
                        const box = {};
                        setCustomSettingsBoxValue(box, "contentCollection", contentCollection.value);
                        setCustomSettingsBoxValue(box, "showFiltersPanel", showFiltersPanel.value);
                        setCustomSettingsBoxValue(box, "showFullTextSearch", showFullTextSearch.value);
                        setCustomSettingsBoxValue(box, "showSort", showSort.value);
                        setCustomSettingsBoxValue(box, "numberOfResults", numberOfResults.value);
                        setCustomSettingsBoxValue(box, "searchOnLoad", searchOnLoad.value);
                        setCustomSettingsBoxValue(box, "groupResultsBySource", groupResultsBySource.value);
                        setCustomSettingsBoxValue(box, "enabledSortOrders", enabledSortOrders.value);
                        setCustomSettingsBoxValue(box, "trendingTerm", trendingTerm.value);
                        setCustomSettingsBoxValue(box, "filters", filters.value);
                        setCustomSettingsBoxValue(box, "resultsTemplate", resultsTemplate.value);
                        setCustomSettingsBoxValue(box, "itemTemplate", itemTemplate.value);
                        setCustomSettingsBoxValue(box, "preSearchTemplate", preSearchTemplate.value);
                        setCustomSettingsBoxValue(box, "boostMatchingSegments", boostMatchingSegments.value);
                        setCustomSettingsBoxValue(box, "boostMatchingRequestFilters", boostMatchingRequestFilters.value);
                        setCustomSettingsBoxValue(box, "segmentBoostAmount", segmentBoostAmount.value);
                        setCustomSettingsBoxValue(box, "requestFilterBoostAmount", requestFilterBoostAmount.value);
                        const data = {
                            box
                        };
                        const result = yield invokeBlockAction("SaveCustomSettings", data);
                        if (result.isSuccess) {
                            isModalOpen.value = false;
                            reloadBlock();
                        }
                        else {
                            alert(result.errorMessage || "Unable to save block settings.");
                        }
                    });
                    provideSecurityGrant(securityGrant);
                    watch(isModalOpen, () => {
                        if (!isModalOpen.value) {
                            emit("close");
                        }
                    });
                    watch(contentCollection, () => {
                        var _a;
                        const collection = contentCollectionItems.value.find(l => areEqual(l.value, contentCollection.value));
                        const newFilters = [...filters.value];
                        if (!collection) {
                            console.log("no selection");
                            return;
                        }
                        const collectionFilters = (_a = collection.filters) !== null && _a !== void 0 ? _a : [];
                        for (const f of collectionFilters) {
                            if (!newFilters.some(a => a.sourceKey === f.value)) {
                                console.log("filters missing", f, newFilters);
                                newFilters.push({
                                    show: false,
                                    sourceKey: f.value,
                                    name: f.text,
                                    headerMarkup: ""
                                });
                            }
                        }
                        for (let filterIndex = 0; filterIndex < newFilters.length;) {
                            if (!collectionFilters.some(f => f.value === newFilters[filterIndex].sourceKey)) {
                                newFilters.splice(filterIndex, 1);
                            }
                            else {
                                filterIndex++;
                            }
                        }
                        filters.value = newFilters;
                    });
                    startLoading();
                    return {
                        boostMatchingRequestFilters,
                        boostMatchingSegments,
                        contentCollection,
                        contentCollectionItems,
                        editingFilter,
                        editingFilterHeaderMarkup,
                        enabledSortOrders,
                        enabledSortOrdersItems,
                        errorMessage,
                        filters,
                        groupResultsBySource,
                        isLoading,
                        isModalOpen,
                        isTrendingSortEnabled,
                        itemTemplate,
                        numberOfResults,
                        onEditFilter,
                        onEditFilterCancel,
                        onEditFilterSave,
                        onSave,
                        preSearchTemplate,
                        requestFilterBoostAmount,
                        saveButtonText,
                        searchOnLoad,
                        segmentBoostAmount,
                        showFiltersPanel,
                        showFullTextSearch,
                        showSort,
                        resultsTemplate,
                        trendingTerm
                    };
                },
                template: `
<Modal v-model="isModalOpen"
    title="Content Collection View Settings"
    :saveText="saveButtonText"
    @save="onSave">

    <Alert v-if="errorMessage"
        v-text="errorMessage"
        alertType="warning" />

    <LoadingIndicator v-else-if="isLoading" :delay="500" />

    <div v-else>

        <div class="row">
            <div class="col-md-6">
                <DropDownList v-model="contentCollection"
                    label="Content Collection"
                    :items="contentCollectionItems"
                    rules="required" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <CheckBox v-model="showFiltersPanel"
                    label="Show Filters Panel" />
            </div>

            <div class="col-md-4">
                <CheckBox v-model="showFullTextSearch"
                    label="Show Full-Text Search" />
            </div>

            <div class="col-md-4">
                <CheckBox v-model="showSort"
                    label="Show Sort" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <NumberBox v-model="numberOfResults"
                    rules="gte:0"
                    label="Number of Results" />
            </div>

            <div class="col-md-4">
                <CheckBox v-model="searchOnLoad"
                    label="Search On Load"
                    help="Determines if initial content should be shown when the block is loaded." />
            </div>

            <div class="col-md-4">
                <CheckBox v-model="groupResultsBySource"
                    label="Group Results By Source"
                    help="This will group the results by the source. When enabled the number of results will be used for each source type." />
            </div>
        </div>

        <CheckBoxList v-if="showSort"
            v-model="enabledSortOrders"
            label="Enabled Sort Orders"
            help="Determines the sort options that should be made available."
            horizontal
            :repeatColumns="5"
            :items="enabledSortOrdersItems" />

        <div class="row">
            <div class="col-md-6">
                <TextBox v-if="isTrendingSortEnabled"
                    v-model="trendingTerm"
                    label="Trending Term"
                    rules="required"
                    help="The term that should be used in the sort dropdown to describe popular/trending items." />
            </div>
        </div>

        <CodeEditor v-model="resultsTemplate"
            label="Results Template"
            mode="lava"
            rules="required" />

        <CodeEditor v-model="itemTemplate"
            label="Item Template"
            mode="lava"
            rules="required" />

        <CodeEditor v-model="preSearchTemplate"
            label="Pre-Search Template"
            mode="lava" />

        <div v-if="showFiltersPanel">
            <SectionHeader title="Filters"
                description="Determine which filters you would like to show in what order." />

            <div v-if="editingFilter" class="margin-b-md">
                <h3 class="title">{{ editingFilter.name }} Filter</h3>

                <CodeEditor v-model="editingFilterHeaderMarkup"
                    label="Filter Header Markup"
                    mode="lava" />

                <RockFormFieldError label="Filter" error="You must finish editing the filter before proceeding." />

                <div class="actions">
                    <RockButton btnType="primary" btnSize="xs" @click="onEditFilterSave">Save</RockButton>
                    <RockButton btnType="link" btnSize="xs" @click="onEditFilterCancel">Cancel</RockButton>
                </div>
            </div>

            <FilterGrid v-else v-model="filters" @edit="onEditFilter" />
        </div>

        <SectionHeader title="Personalization"
            description="The settings below allow you to boost items based on personalization settings in Rock." />
        
        <div class="row">
            <div class="col-md-4">
                <CheckBox v-model="boostMatchingSegments"
                    label="Boost Matching Segments"
                    help="Determines if the search should boost shared segments between the individual and the content results." />

                <NumberBox v-if="boostMatchingSegments"
                    v-model="segmentBoostAmount"
                    label="Segment Boost Amount"
                    help="The amount of boost to apply to each shared segment. A value of 1 = no boost, a value of > 1 will increase the match score while a value of < 1 will reduce the match score." />
            </div>

            <div class="col-md-4">
                <CheckBox v-model="boostMatchingRequestFilters"
                    label="Boost Matching Request Filters"
                    help="Determines if the search should boost shared segments current request and the content results." />

                <NumberBox v-if="boostMatchingRequestFilters"
                    v-model="requestFilterBoostAmount"
                    label="Request Filter Boost Amount"
                    help="The amount of boost to apply to each shared request filter. A value of 1 = no boost, a value of > 1 will increase the match score while a value of < 1 will reduce the match score." />
            </div>
        </div>

    </div>

</Modal>
`
            }));

        })
    };
}));
