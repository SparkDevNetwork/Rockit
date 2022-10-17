System.register(['tslib', 'vue', './rockFormField.js', './panel.js', './textBox.js', '@Obsidian/Utility/http', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './rockButton.js', './fullscreen.js', './transitionVerticalCollapse.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, nextTick, RockFormField, Panel, TextBox, useHttp, sleep;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            nextTick = module.nextTick;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            sleep = module.sleep;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var personPicker = exports('default', defineComponent({
                name: "PersonPicker",
                components: {
                    RockFormField,
                    Panel,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object
                    }
                },
                setup(props, { emit }) {
                    const http = useHttp();
                    const internalValue = ref(props.modelValue);
                    const showClear = computed(() => { var _a; return (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value; });
                    const showPopup = ref(false);
                    const searchText = ref("");
                    const searchTextBox = ref(null);
                    const searchResults = ref([]);
                    const selectedSearchResult = ref("");
                    let searchCancelToken = null;
                    const selectedName = computed(() => { var _a, _b; return (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : ""; });
                    const updateSearchResults = (text, cancellationToken) => __awaiter(this, void 0, void 0, function* () {
                        if (text.length < 3) {
                            return;
                        }
                        yield sleep(200);
                        if (cancellationToken.value) {
                            return;
                        }
                        const options = {
                            name: text,
                            includeDetails: true
                        };
                        const result = yield http.doApiCall("POST", "/api/v2/Controls/PersonPickerSearch", undefined, options);
                        if (cancellationToken.value) {
                            return;
                        }
                        if (result.isSuccess && result.data) {
                            searchResults.value = result.data;
                            selectedSearchResult.value = "";
                        }
                        else {
                            console.warn(result.errorMessage);
                        }
                    });
                    const getNameAdditionalText = (result) => {
                        if (result.spouseNickName && result.formattedAge) {
                            return `Age: ${result.formattedAge}; Spouse: ${result.spouseNickName}`;
                        }
                        else if (result.formattedAge) {
                            return `Age: ${result.formattedAge}`;
                        }
                        else if (result.spouseNickName) {
                            return `Spouse: ${result.spouseNickName}`;
                        }
                        else {
                            return "";
                        }
                    };
                    const getPersonImageStyle = (result) => {
                        if (result.imageUrl) {
                            return {
                                backgroundImage: `url(${result.imageUrl})`,
                                width: "70px",
                                height: "70px",
                                backgroundSize: "cover",
                                marginRight: "8px",
                                border: "1px solid #dfe0e1"
                            };
                        }
                        else {
                            return {};
                        }
                    };
                    const getCardStyle = (result) => {
                        const styles = {
                            margin: "0px 20px 20px 0px"
                        };
                        if (result.primaryAliasGuid === selectedSearchResult.value) {
                            styles["border"] = "2px solid var(--brand-color)";
                        }
                        else {
                            styles["border"] = "2px solid transparent";
                        }
                        return styles;
                    };
                    const onClear = () => {
                        emit("update:modelValue", undefined);
                    };
                    const onPickerClick = () => {
                        showPopup.value = !showPopup.value;
                        if (showPopup.value) {
                            searchText.value = "";
                            selectedSearchResult.value = "";
                            searchResults.value = [];
                            nextTick(() => {
                                if (searchTextBox.value) {
                                    const input = searchTextBox.value.querySelector("input");
                                    input === null || input === void 0 ? void 0 : input.focus();
                                }
                            });
                        }
                    };
                    const onCancel = () => {
                        showPopup.value = false;
                    };
                    const onPopupKeyDown = (ev) => {
                        if (ev.keyCode === 27 && showPopup.value) {
                            ev.stopImmediatePropagation();
                            onCancel();
                        }
                    };
                    const onCardClick = (result) => {
                        if (!result.primaryAliasGuid || !result.name) {
                            return;
                        }
                        internalValue.value = {
                            value: selectedSearchResult.value,
                            text: result.name
                        };
                        emit("update:modelValue", internalValue.value);
                        showPopup.value = false;
                    };
                    const onCardFocus = (result) => {
                        if (!result.primaryAliasGuid || !result.name) {
                            return;
                        }
                        selectedSearchResult.value = result.primaryAliasGuid;
                    };
                    const onCardBlur = (result) => {
                        if (!result.primaryAliasGuid || !result.name) {
                            return;
                        }
                        if (selectedSearchResult.value === result.primaryAliasGuid) {
                            selectedSearchResult.value = "";
                        }
                    };
                    const onCardKeyPress = (result, ev) => {
                        if (!result.primaryAliasGuid || !result.name) {
                            return;
                        }
                        const isEnterKey = ev.keyCode === 10 || ev.keyCode === 13;
                        if (selectedSearchResult.value === result.primaryAliasGuid && isEnterKey) {
                            internalValue.value = {
                                value: selectedSearchResult.value,
                                text: result.name
                            };
                            emit("update:modelValue", internalValue.value);
                            showPopup.value = false;
                        }
                    };
                    watch(searchText, () => {
                        if (searchCancelToken) {
                            searchCancelToken.value = true;
                        }
                        searchCancelToken = ref(false);
                        updateSearchResults(searchText.value, searchCancelToken);
                    });
                    watch(() => props.modelValue, () => internalValue.value = props.modelValue);
                    return {
                        getCardStyle,
                        getNameAdditionalText,
                        getPersonImageStyle,
                        internalValue,
                        onCardBlur,
                        onCardClick,
                        onCardFocus,
                        onCardKeyPress,
                        onClear,
                        onPickerClick,
                        onCancel,
                        onPopupKeyDown,
                        searchResults,
                        searchText,
                        searchTextBox,
                        selectedName,
                        selectedSearchResult,
                        showClear,
                        showPopup
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="person-picker"
    name="personpicker">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="picker picker-select person-picker">
                <a class="picker-label" href="#" @click.prevent.stop="onPickerClick">
                    <i class="fa fa-user fa-fw"></i>
                    <span class="selected-name">{{ selectedName }}</span>
                    <b class="fa fa-caret-down pull-right"></b>
                </a>

                <a v-if="showClear" class="picker-select-none" @click.prevent.stop="onClear">
                    <i class="fa fa-times"></i>
                </a>

                <Panel v-if="showPopup" isFullscreen isFullscreenPageOnly title="Person Search">
                    <template #headerActions>
                        <span class="action" @click.prevent.stop="onCancel">
                            <i class="fa fa-times"></i>
                        </span>
                    </template>

                    <div @keydown="onPopupKeyDown" tabindex="0">
                        <div ref="searchTextBox">
                            <TextBox v-model="searchText" label="Search" />
                        </div>

                        <div style="display: flex;">
                            <div v-for="result in searchResults" :key="result.primaryAliasGuid" class="well cursor-pointer" :style="getCardStyle(result)" tabindex="0" @click="onCardClick(result)" @focus="onCardFocus(result)" @blur="onCardBlur(result)" @keypress="onCardKeyPress(result, $event)">
                                <div style="display: flex; min-width: 250px;">
                                    <div class="person-image" :style="getPersonImageStyle(result)"></div>
                                    <div>
                                        <div>{{ result.name }}</div>
                                        <div v-if="getNameAdditionalText(result)" class="text-muted"><small>{{ getNameAdditionalText(result) }}</small></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
