System.register(["vue", "../Elements/rockFormField", "../Elements/dropDownList", "../Elements/datePicker", "../Services/number", "../Util/http", "../Services/slidingDateRange"], function (exports_1, context_1) {
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
    var vue_1, rockFormField_1, dropDownList_1, datePicker_1, number_1, http_1, slidingDateRange_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (datePicker_1_1) {
                datePicker_1 = datePicker_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (slidingDateRange_1_1) {
                slidingDateRange_1 = slidingDateRange_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "SlidingDateRangePicker",
                components: {
                    DatePickerBase: datePicker_1.default,
                    DropDownList: dropDownList_1.default,
                    RockFormField: rockFormField_1.default
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
                    const internalValue = vue_1.ref(props.modelValue);
                    const rangeType = vue_1.ref((_c = (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.rangeType) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "");
                    const timeValue = vue_1.ref((_f = (_e = (_d = internalValue.value) === null || _d === void 0 ? void 0 : _d.timeValue) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "");
                    const timeUnit = vue_1.ref((_j = (_h = (_g = internalValue.value) === null || _g === void 0 ? void 0 : _g.timeUnit) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "0");
                    const lowDate = vue_1.ref((_l = (_k = internalValue.value) === null || _k === void 0 ? void 0 : _k.lowerDate) !== null && _l !== void 0 ? _l : "");
                    const highDate = vue_1.ref((_o = (_m = internalValue.value) === null || _m === void 0 ? void 0 : _m.upperDate) !== null && _o !== void 0 ? _o : "");
                    const dateRangeText = vue_1.ref("");
                    const isDateRange = vue_1.computed(() => {
                        return rangeType.value === "2";
                    });
                    const isTimeUnit = vue_1.computed(() => {
                        return rangeType.value === "0" || rangeType.value === "1" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16";
                    });
                    const isNumberVisible = vue_1.computed(() => {
                        return rangeType.value === "0" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16";
                    });
                    const computedTimeUnitOptions = vue_1.computed(() => {
                        if (!isNumberVisible.value || number_1.toNumber(timeValue.value) === 1) {
                            return slidingDateRange_1.timeUnitOptions;
                        }
                        return slidingDateRange_1.timeUnitOptions.map(o => {
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
                        const result = yield http_1.get("/api/Utility/CalculateSlidingDateRange", parameters);
                        if (result.isSuccess && result.data) {
                            dateRangeText.value = result.data;
                        }
                        else {
                            dateRangeText.value = "";
                        }
                    });
                    vue_1.watch([rangeType, timeUnit, timeValue, lowDate, highDate], () => {
                        var _a, _b;
                        updateDateRangeText();
                        const internalRangeType = number_1.toNumberOrNull(rangeType.value);
                        if (internalRangeType === null) {
                            internalValue.value = null;
                            return;
                        }
                        const newValue = {
                            rangeType: internalRangeType
                        };
                        if (rangeType.value === "0" || rangeType.value === "1" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16") {
                            newValue.timeUnit = (_a = number_1.toNumberOrNull(timeUnit.value)) !== null && _a !== void 0 ? _a : undefined;
                        }
                        if (rangeType.value === "0" || rangeType.value === "4" || rangeType.value === "8" || rangeType.value === "16") {
                            newValue.timeValue = (_b = number_1.toNumberOrNull(timeValue.value)) !== null && _b !== void 0 ? _b : 1;
                        }
                        if (rangeType.value == "2") {
                            newValue.lowerDate = lowDate.value;
                            newValue.upperDate = highDate.value;
                        }
                        internalValue.value = newValue;
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                        internalValue.value = props.modelValue;
                        rangeType.value = (_c = (_b = (_a = internalValue.value) === null || _a === void 0 ? void 0 : _a.rangeType) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
                        timeValue.value = (_f = (_e = (_d = internalValue.value) === null || _d === void 0 ? void 0 : _d.timeValue) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "";
                        timeUnit.value = (_j = (_h = (_g = internalValue.value) === null || _g === void 0 ? void 0 : _g.timeUnit) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "";
                        lowDate.value = (_l = (_k = internalValue.value) === null || _k === void 0 ? void 0 : _k.lowerDate) !== null && _l !== void 0 ? _l : "";
                        highDate.value = (_o = (_m = internalValue.value) === null || _m === void 0 ? void 0 : _m.upperDate) !== null && _o !== void 0 ? _o : "";
                    });
                    vue_1.watch(internalValue, () => {
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
                        rangeTypeOptions: slidingDateRange_1.rangeTypeOptions,
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
            <DropDownList v-model="rangeType" :options="rangeTypeOptions" showBlankItem class="input-width-md slidingdaterange-select" />

            <input v-if="isNumberVisible" v-model="timeValue" class="form-control input-width-sm slidingdaterange-number" type="number" pattern="[0-9]*]" />

            <template v-if="isTimeUnit">
                <DropDownList v-model="timeUnit" :options="timeUnitOptions" class="form-control input-width-md slidingdaterange-timeunits-plural" :showBlankItem="false" />

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
        }
    };
});
//# sourceMappingURL=slidingDateRangePicker.js.map