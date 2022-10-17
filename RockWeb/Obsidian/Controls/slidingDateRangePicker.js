System.register(['tslib', 'vue', './rockFormField.js', './dropDownList.js', './datePicker.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/http', '@Obsidian/Utility/slidingDateRange', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', 'ant-design-vue', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils', './textBox.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, RockFormField, DropDownList, DatePickerBase, toNumber, toNumberOrNull, useHttp, timeUnitOptions, rangeTypeOptions;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            DatePickerBase = module["default"];
        }, function (module) {
            toNumber = module.toNumber;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            timeUnitOptions = module.timeUnitOptions;
            rangeTypeOptions = module.rangeTypeOptions;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var slidingDateRangePicker = exports('default', defineComponent({
                name: "SlidingDateRangePicker",
                components: {
                    DatePickerBase,
                    DropDownList,
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                    const internalValue = ref(props.modelValue);
                    const http = useHttp();
                    const rangeType = ref((_c = (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.rangeType) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "");
                    const timeValue = ref((_f = (_e = (_d = internalValue.value) === null || _d === void 0 ? void 0 : _d.timeValue) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "");
                    const timeUnit = ref((_j = (_h = (_g = internalValue.value) === null || _g === void 0 ? void 0 : _g.timeUnit) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "0");
                    const lowDate = ref((_l = (_k = internalValue.value) === null || _k === void 0 ? void 0 : _k.lowerDate) !== null && _l !== void 0 ? _l : "");
                    const highDate = ref((_o = (_m = internalValue.value) === null || _m === void 0 ? void 0 : _m.upperDate) !== null && _o !== void 0 ? _o : "");
                    const dateRangeText = ref("");
                    const isDateRange = computed(() => {
                        return rangeType.value === "2";
                    });
                    const isTimeUnit = computed(() => {
                        return rangeType.value === "0" || rangeType.value === "1" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16";
                    });
                    const isNumberVisible = computed(() => {
                        return rangeType.value === "0" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16";
                    });
                    const computedTimeUnitOptions = computed(() => {
                        if (!isNumberVisible.value || toNumber(timeValue.value) === 1) {
                            return timeUnitOptions;
                        }
                        return timeUnitOptions.map(o => {
                            return {
                                value: o.value,
                                text: `${o.text}s`
                            };
                        });
                    });
                    const updateDateRangeText = () => __awaiter(this, void 0, void 0, function* () {
                        const parameters = {
                            slidingDateRangeType: rangeType.value || "0",
                            timeUnitType: timeUnit.value || "0",
                            number: timeValue.value || "1"
                        };
                        if (lowDate.value && highDate.value) {
                            parameters["startDate"] = lowDate.value;
                            parameters["endDate"] = highDate.value;
                        }
                        const result = yield http.get("/api/Utility/CalculateSlidingDateRange", parameters);
                        if (result.isSuccess && result.data) {
                            dateRangeText.value = result.data;
                        }
                        else {
                            dateRangeText.value = "";
                        }
                    });
                    watch([rangeType, timeUnit, timeValue, lowDate, highDate], () => {
                        var _a, _b;
                        updateDateRangeText();
                        const internalRangeType = toNumberOrNull(rangeType.value);
                        if (internalRangeType === null) {
                            internalValue.value = null;
                            return;
                        }
                        const newValue = {
                            rangeType: internalRangeType
                        };
                        if (rangeType.value === "0" || rangeType.value === "1" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16") {
                            newValue.timeUnit = (_a = toNumberOrNull(timeUnit.value)) !== null && _a !== void 0 ? _a : undefined;
                        }
                        if (rangeType.value === "0" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16") {
                            newValue.timeValue = (_b = toNumberOrNull(timeValue.value)) !== null && _b !== void 0 ? _b : 1;
                        }
                        if (rangeType.value == "2") {
                            newValue.lowerDate = lowDate.value;
                            newValue.upperDate = highDate.value;
                        }
                        internalValue.value = newValue;
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                        internalValue.value = props.modelValue;
                        rangeType.value = (_c = (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.rangeType) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
                        timeValue.value = (_f = (_e = (_d = internalValue.value) === null || _d === void 0 ? void 0 : _d.timeValue) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "";
                        timeUnit.value = (_j = (_h = (_g = internalValue.value) === null || _g === void 0 ? void 0 : _g.timeUnit) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "";
                        lowDate.value = (_l = (_k = internalValue.value) === null || _k === void 0 ? void 0 : _k.lowerDate) !== null && _l !== void 0 ? _l : "";
                        highDate.value = (_o = (_m = internalValue.value) === null || _m === void 0 ? void 0 : _m.upperDate) !== null && _o !== void 0 ? _o : "";
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    updateDateRangeText();
                    return {
                        dateRangeText,
                        highDate,
                        internalValue,
                        isDateRange,
                        isNumberVisible,
                        isTimeUnit,
                        lowDate,
                        rangeType,
                        rangeTypeOptions,
                        timeUnit,
                        timeUnitOptions: computedTimeUnitOptions,
                        timeValue
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="slidingdaterange"
    name="slidingdaterange">
    <template #default="{uniqueId}">
        <div :id="uniqueId" class="form-control-group">
            <DropDownList v-model="rangeType" :items="rangeTypeOptions" showBlankItem class="input-width-md slidingdaterange-select" />

            <input v-if="isNumberVisible" v-model="timeValue" class="form-control input-width-sm slidingdaterange-number" type="number" pattern="[0-9]*]" />

            <template v-if="isTimeUnit">
                <DropDownList v-model="timeUnit" :items="timeUnitOptions" class="form-control input-width-md slidingdaterange-timeunits-plural" :showBlankItem="false" />

                <div class="label label-info slidingdaterange-info">{{ dateRangeText }}</div>
            </template>

            <div v-if="isDateRange" class="picker-daterange slidingdaterange-daterange pull-left">
                <div class="input-group input-group-lower input-width-md date">
                    <DatePickerBase v-model="lowDate" />
                </div>

                <div class="input-group form-control-static">to</div>

                <div class="input-group input-group-lower input-width-md date">
                    <DatePickerBase v-model="highDate" />
                </div>
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
