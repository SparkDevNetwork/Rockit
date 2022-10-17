System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/textBox', '@Obsidian/Utility/block', '@Obsidian/Utility/util', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/radioButtonList', '@Obsidian/Controls/sectionContainer', '@Obsidian/Utility/component', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, onMounted, Alert, DropDownList, TextBox, useConfigurationValues, useInvokeBlockAction, useBlockGuid, getSecurityGrant, provideSecurityGrant, dispatchBlockEvent, debounce, CheckBoxList, RadioButtonList, SectionContainer, updateRefValue, toNumber, emptyGuid;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            onMounted = module.onMounted;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
            useBlockGuid = module.useBlockGuid;
            getSecurityGrant = module.getSecurityGrant;
            provideSecurityGrant = module.provideSecurityGrant;
            dispatchBlockEvent = module.dispatchBlockEvent;
        }, function (module) {
            debounce = module.debounce;
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function (module) {
            SectionContainer = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            emptyGuid = module.emptyGuid;
        }],
        execute: (function () {

            const Filter = defineComponent({
                name: "Cms.ContentCollectionView.Filter",
                components: {
                    CheckBoxList,
                    DropDownList,
                    RadioButtonList,
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    filter: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const singleValue = ref(props.modelValue);
                    const multipleValue = ref(props.modelValue.split(","));
                    const filterClass = computed(() => {
                        var _a, _b;
                        const filterSlugName = (_b = (_a = props.filter.label) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-").toLowerCase()) !== null && _b !== void 0 ? _b : "";
                        return `filter filter-${filterSlugName}`;
                    });
                    const headerMarkup = computed(() => {
                        var _a;
                        return (_a = props.filter.headerMarkup) !== null && _a !== void 0 ? _a : "";
                    });
                    const items = computed(() => {
                        var _a, _b;
                        if (isPills.value && !isMultiSelect.value) {
                            const radioItems = [...((_a = props.filter.items) !== null && _a !== void 0 ? _a : [])];
                            radioItems.splice(0, 0, {
                                value: "",
                                text: "All"
                            });
                            return radioItems;
                        }
                        return (_b = props.filter.items) !== null && _b !== void 0 ? _b : [];
                    });
                    const isMultiSelect = computed(() => {
                        return props.filter.isMultipleSelection;
                    });
                    const isDropDownList = computed(() => {
                        return props.filter.control === 1;
                    });
                    const isPills = computed(() => {
                        return props.filter.control === 0;
                    });
                    const isBoolean = computed(() => {
                        return props.filter.control === 2;
                    });
                    const label = computed(() => {
                        var _a;
                        return (_a = props.filter.label) !== null && _a !== void 0 ? _a : "";
                    });
                    watch(() => props.modelValue, () => {
                        singleValue.value = props.modelValue;
                        multipleValue.value = props.modelValue.split(",");
                    });
                    watch(singleValue, () => {
                        if (props.modelValue !== singleValue.value) {
                            emit("update:modelValue", singleValue.value);
                        }
                    });
                    watch(multipleValue, () => {
                        if (props.modelValue !== multipleValue.value.join(",")) {
                            emit("update:modelValue", multipleValue.value.join(","));
                        }
                    });
                    return {
                        filterClass,
                        headerMarkup,
                        isBoolean,
                        isDropDownList,
                        isPills,
                        isMultiSelect,
                        items,
                        label,
                        multipleValue,
                        singleValue
                    };
                },
                template: `
<div :class="filterClass">
    <div v-if="headerMarkup" class="filter-header" v-html="headerMarkup"></div>

    <CheckBoxList v-if="isPills && isMultiSelect"
        :label="label"
        v-model="multipleValue"
        :items="items"
        horizontal />

    <RadioButtonList v-if="isPills && !isMultiSelect"
        :label="label"
        v-model="singleValue"
        :items="items"
        horizontal />

    <DropDownList v-if="isDropDownList && isMultiSelect"
        :label="label"
        v-model="multipleValue"
        :items="items"
        multiple />

    <DropDownList v-if="isDropDownList && !isMultiSelect"
        :label="label"
        v-model="singleValue"
        :items="items" />
</div>
    `
            });
            var FiltersContainer = defineComponent({
                name: "CMS.ContentCollectionView.FilterContainer",
                components: {
                    Filter,
                    SectionContainer
                },
                props: {
                    filters: {
                        type: Array,
                        required: true
                    },
                    filterValues: {
                        type: Object,
                        required: true
                    }
                },
                emits: {
                    "update:filterValues": (_value) => true
                },
                setup(props, { emit }) {
                    const filterValues = ref(props.filterValues);
                    const getFilterValue = (filter) => {
                        var _a, _b;
                        return (_b = filterValues.value[((_a = filter.label) !== null && _a !== void 0 ? _a : "").toLowerCase()]) !== null && _b !== void 0 ? _b : "";
                    };
                    const setFilterValue = (filter, value) => {
                        var _a;
                        const newValues = Object.assign({}, filterValues.value);
                        newValues[((_a = filter.label) !== null && _a !== void 0 ? _a : "").toLowerCase()] = value;
                        filterValues.value = newValues;
                        emit("update:filterValues", newValues);
                    };
                    watch(() => props.filterValues, () => {
                        updateRefValue(filterValues, props.filterValues);
                    });
                    return {
                        getFilterValue,
                        setFilterValue
                    };
                },
                template: `
<div class="collectionsearch-filters">
    <h3 class="title">Filters</h3>

    <Filter v-for="item in filters"
        :key="item.sourceKey"
        :modelValue="getFilterValue(item)"
        @update:modelValue="setFilterValue(item, $event)"
        :filter="item" />
</div>
`
            });

            function getQueryStringFilterValues(filterNames) {
                const params = {};
                for (const entry of new URLSearchParams(window.location.search).entries()) {
                    if (filterNames.some(n => n.toLowerCase() === entry[0].toLowerCase()) && entry[1] !== "") {
                        params[entry[0].toLowerCase()] = entry[1];
                    }
                }
                return params;
            }
            function updateUrl(query, sortOrder, filterValues, filterNames) {
                const qs = [];
                if (query) {
                    qs.push(["q", query]);
                }
                if (sortOrder != 0..toString()) {
                    qs.push(["s", sortOrder.toString()]);
                }
                for (const key in filterValues) {
                    if (filterValues[key]) {
                        qs.push([key, filterValues[key]]);
                    }
                }
                for (const entry of new URLSearchParams(window.location.search).entries()) {
                    const entryName = entry[0].toLowerCase();
                    if (entryName === "q" || entryName === "s") {
                        continue;
                    }
                    if (!filterNames.some(n => n.toLowerCase() === entryName)) {
                        qs.push([entry[0].toLowerCase(), entry[1]]);
                    }
                }
                if (qs.length > 0) {
                    const querystring = qs.map(q => `${q[0]}=${q[1]}`).join("&");
                    window.history.replaceState(null, "", `${window.location.pathname}?${querystring}`);
                }
                else {
                    window.history.replaceState(null, "", window.location.pathname);
                }
            }
            function updateResults(resultsContainerElement, results, seeMore) {
                var _a, _b, _c;
                for (const resultSource of (_a = results.resultSources) !== null && _a !== void 0 ? _a : []) {
                    const sourceGuid = resultSource.sourceGuid;
                    if (!sourceGuid) {
                        continue;
                    }
                    let sourceContainerElement = resultsContainerElement.querySelector(`.result-source-${sourceGuid.toLowerCase()}`);
                    if (!sourceContainerElement) {
                        sourceContainerElement = document.createElement("div");
                        sourceContainerElement.classList.add("results", `result-source-${sourceGuid.toLowerCase()}`);
                        sourceContainerElement.innerHTML = (_b = resultSource.template) !== null && _b !== void 0 ? _b : "";
                        const newSeeMoreElement = sourceContainerElement.querySelector(".js-more");
                        if (newSeeMoreElement) {
                            newSeeMoreElement.addEventListener("click", (e) => {
                                e.preventDefault();
                                seeMore(sourceGuid);
                            });
                        }
                        resultsContainerElement.append(sourceContainerElement);
                    }
                    const resultItemsElement = sourceContainerElement.querySelector(".result-items");
                    if (!resultItemsElement) {
                        continue;
                    }
                    for (const item of (_c = resultSource.results) !== null && _c !== void 0 ? _c : []) {
                        const itemElement = document.createElement("div");
                        itemElement.innerHTML = item;
                        for (const innerElement of Array.from(itemElement.children)) {
                            innerElement.remove();
                            resultItemsElement.append(innerElement);
                        }
                        const resultItemCount = toNumber(sourceContainerElement.dataset["resultItemCount"]) + 1;
                        sourceContainerElement.dataset["resultItemCount"] = resultItemCount.toString();
                    }
                    const seeMoreElement = sourceContainerElement.querySelector(".js-more");
                    if (seeMoreElement && !resultSource.hasMore) {
                        seeMoreElement.classList.add("hidden");
                    }
                    if (!toNumber(sourceContainerElement.dataset["resultItemCount"])) {
                        sourceContainerElement.classList.add("no-results");
                    }
                }
            }
            function getSortOrderItems(allowed, trendingTerm) {
                const sortOrderItems = [];
                if (allowed.includes("relevance")) {
                    sortOrderItems.push({
                        value: 0..toString(),
                        text: "Relevance"
                    });
                }
                if (allowed.includes("newest")) {
                    sortOrderItems.push({
                        value: 1..toString(),
                        text: "Newest"
                    });
                }
                if (allowed.includes("oldest")) {
                    sortOrderItems.push({
                        value: 2..toString(),
                        text: "Oldest"
                    });
                }
                if (allowed.includes("trending")) {
                    sortOrderItems.push({
                        value: 3..toString(),
                        text: trendingTerm
                    });
                }
                if (allowed.includes("alphabetical")) {
                    sortOrderItems.push({
                        value: 4..toString(),
                        text: "Alphabetical"
                    });
                }
                return sortOrderItems;
            }
            var contentCollectionView = exports('default', defineComponent({
                name: "Cms.ContentCollectionView",
                components: {
                    Alert,
                    DropDownList,
                    FiltersContainer,
                    TextBox
                },
                setup() {
                    var _a, _b, _c, _d;
                    const config = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const blockGuid = (_a = useBlockGuid()) !== null && _a !== void 0 ? _a : emptyGuid;
                    const securityGrant = getSecurityGrant(config.securityGrantToken);
                    const urlSearchParams = new URLSearchParams(window.location.search);
                    const blockError = ref(config.errorMessage);
                    const filters = (_b = config.filters) !== null && _b !== void 0 ? _b : [];
                    const searchContainerElement = ref(null);
                    const searchResultContainerElement = ref(null);
                    const query = ref(urlSearchParams.get("q") || urlSearchParams.get("Q") || "");
                    const filterValues = ref(getQueryStringFilterValues(filters.map(f => { var _a; return (_a = f.label) !== null && _a !== void 0 ? _a : ""; })));
                    const sortOrder = ref(urlSearchParams.get("s") || urlSearchParams.get("S") || 0..toString());
                    const sortOrderItems = getSortOrderItems((_c = config.enabledSortOrders) !== null && _c !== void 0 ? _c : [], (_d = config.trendingTerm) !== null && _d !== void 0 ? _d : "Trending");
                    const performSearch = (sourceGuid, offset) => __awaiter(this, void 0, void 0, function* () {
                        updateUrl(query.value, sortOrder.value, filterValues.value, filters.map(f => { var _a; return (_a = f.label) !== null && _a !== void 0 ? _a : ""; }));
                        const queryBag = {
                            text: query.value,
                            filters: filterValues.value,
                            sourceGuid: sourceGuid,
                            offset: offset,
                            order: toNumber(sortOrder.value)
                        };
                        const data = {
                            query: queryBag
                        };
                        const result = yield invokeBlockAction("Search", data);
                        if (result.isSuccess && result.data != null) {
                            processResults(result.data, !offset, sourceGuid);
                        }
                        else {
                            console.error(result.errorMessage || "Unable to complete the search request.");
                        }
                    });
                    const processResults = (data, initialResults, sourceGuid) => {
                        if (!searchResultContainerElement.value) {
                            return;
                        }
                        if (initialResults) {
                            searchResultContainerElement.value.innerHTML = "";
                        }
                        updateResults(searchResultContainerElement.value, data, onLoadMore);
                        if (initialResults) {
                            dispatchBlockEvent("content-collection-view-full-search", blockGuid);
                        }
                        else if (sourceGuid) {
                            dispatchBlockEvent("content-collection-view-results-updated", blockGuid, {
                                sourceGuid
                            });
                        }
                    };
                    const onLoadMore = (sourceGuid) => __awaiter(this, void 0, void 0, function* () {
                        if (!searchResultContainerElement.value) {
                            return;
                        }
                        const sourceContainerElement = searchResultContainerElement.value.querySelector(`.result-source-${sourceGuid.toLowerCase()}`);
                        if (!sourceContainerElement) {
                            return;
                        }
                        const itemCount = toNumber(sourceContainerElement.dataset["resultItemCount"]);
                        yield performSearch(sourceGuid, itemCount);
                    });
                    provideSecurityGrant(securityGrant);
                    const debounceSearch = debounce(performSearch, 450);
                    watch(query, () => {
                        debounceSearch();
                    });
                    watch([filterValues, sortOrder], () => {
                        performSearch();
                    });
                    onMounted(() => {
                        var _a;
                        const inputElement = (_a = searchContainerElement.value) === null || _a === void 0 ? void 0 : _a.querySelector("input");
                        if (inputElement) {
                            inputElement.focus();
                        }
                        if (searchResultContainerElement.value) {
                            if (config.initialResults) {
                                processResults(config.initialResults, true);
                            }
                            else if (config.preSearchContent) {
                                searchResultContainerElement.value.innerHTML = config.preSearchContent;
                            }
                        }
                    });
                    return {
                        blockError,
                        filters,
                        filterValues,
                        query,
                        searchContainerElement,
                        searchResultContainerElement,
                        showSort: config.showSort,
                        showFiltersPanel: config.showFiltersPanel,
                        showFullTextSearch: config.showFullTextSearch,
                        sortOrder,
                        sortOrderItems
                    };
                },
                template: `
<Alert v-if="blockError" alertType="warning" v-text="blockError" />

<div v-if="!blockError" class="collectionsearch">
    <div v-if="showFullTextSearch" class="collectionsearch-fulltext">
        <h3 class="title">Search</h3>

        <div ref="searchContainerElement" class="content">
            <div class="search-fulltext">
                <TextBox v-model="query">
                    <template #prepend>
                        <div class="input-group-addon">
                            <i class="fa fa-search"></i>
                        </div>
                    </template>
                </TextBox>
            </div>
        </div>
    </div>

    <FiltersContainer v-if="showFiltersPanel" :filters="filters" v-model:filterValues="filterValues" />

    <div class="collectionsearch-results">
        <div class="results-order">
            <DropDownList v-if="showSort" v-model="sortOrder" :items="sortOrderItems" :showBlankItem="false" />
        </div>

        <div ref="searchResultContainerElement">
        </div>
    </div>
</div>
`
            }));

        })
    };
}));
