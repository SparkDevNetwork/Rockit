System.register(["vue", "../Elements/rockFormField", "./panel", "../Elements/textBox", "../Util/http"], function (exports_1, context_1) {
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
    var vue_1, rockFormField_1, panel_1, textBox_1, vue_2, http_1, sleep;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            sleep = (ms) => {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                });
            };
            exports_1("default", vue_1.defineComponent({
                name: "PersonPicker",
                components: {
                    RockFormField: rockFormField_1.default,
                    Panel: panel_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object
                    }
                },
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(props.modelValue);
                    const showClear = vue_1.computed(() => { var _a; return (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.value; });
                    const showPopup = vue_1.ref(false);
                    const searchText = vue_1.ref("");
                    const searchTextBox = vue_1.ref(null);
                    const searchResults = vue_1.ref([]);
                    const selectedSearchResult = vue_1.ref("");
                    let searchCancelToken = null;
                    const selectedName = vue_1.computed(() => { var _a, _b; return (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : ""; });
                    const updateSearchResults = (text, cancellationToken) => __awaiter(this, void 0, void 0, function* () {
                        if (text.length < 3) {
                            return;
                        }
                        yield sleep(200);
                        if (cancellationToken.value) {
                            return;
                        }
                        const params = {
                            name: text,
                            includeDetails: true
                        };
                        const result = yield http_1.doApiCall("POST", "/api/v2/Controls/PersonPicker/Search", undefined, params);
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
                        if (result.guid === selectedSearchResult.value) {
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
                            vue_2.nextTick(() => {
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
                        if (!result.guid || !result.name) {
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
                        if (!result.guid || !result.name) {
                            return;
                        }
                        selectedSearchResult.value = result.guid;
                    };
                    const onCardBlur = (result) => {
                        if (!result.guid || !result.name) {
                            return;
                        }
                        if (selectedSearchResult.value === result.guid) {
                            selectedSearchResult.value = "";
                        }
                    };
                    const onCardKeyPress = (result, ev) => {
                        if (!result.guid || !result.name) {
                            return;
                        }
                        const isEnterKey = ev.keyCode === 10 || ev.keyCode === 13;
                        if (selectedSearchResult.value === result.guid && isEnterKey) {
                            internalValue.value = {
                                value: selectedSearchResult.value,
                                text: result.name
                            };
                            emit("update:modelValue", internalValue.value);
                            showPopup.value = false;
                        }
                    };
                    vue_1.watch(searchText, () => {
                        if (searchCancelToken) {
                            searchCancelToken.value = true;
                        }
                        searchCancelToken = vue_1.ref(false);
                        updateSearchResults(searchText.value, searchCancelToken);
                    });
                    vue_1.watch(() => props.modelValue, () => internalValue.value = props.modelValue);
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
                    <span class="selected-name" v-text="selectedName"></span>
                    <i class="fa fa-caret-down pull-right"></i>
                </a>

                <a v-if="showClear" class="picker-select-none" @click.prevent.stop="onClear">
                    <i class="fa fa-times"></i>
                </a>

                <Panel v-if="showPopup" isFullscreen title="Person Search">
                    <template #actionAside>
                        <span class="panel-action" @click.prevent.stop="onCancel">
                            <i class="fa fa-times"></i>
                        </span>
                    </template>

                    <div @keydown="onPopupKeyDown" tabindex="0">
                        <div ref="searchTextBox">
                            <TextBox v-model="searchText" label="Search" />
                        </div>

                        <div style="display: flex;">
                            <div v-for="result in searchResults" :key="result.guid" class="well clickable" :style="getCardStyle(result)" tabindex="0" @click="onCardClick(result)" @focus="onCardFocus(result)" @blur="onCardBlur(result)" @keypress="onCardKeyPress(result, $event)">
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
        }
    };
});
//# sourceMappingURL=personPicker.js.map