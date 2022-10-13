System.register(['vue', './utils.js', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/numberBox', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/guid', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, CheckBox, CheckBoxList, NumberBox, toNumberOrNull, areEqual, asBoolean, asTrueFalseOrNull, updateRefValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            CheckBoxList = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            areEqual = module.areEqual;
        }, function (module) {
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "CampusesField.Edit",
                components: {
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                setup(props, context) {
                    const internalValue = ref(props.modelValue ? props.modelValue.split(",") : []);
                    const options = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const repeatColumns = computed(() => {
                        var _a;
                        const repeatColumnsConfig = props.configurationValues["repeatColumns"];
                        return (_a = toNumberOrNull(repeatColumnsConfig)) !== null && _a !== void 0 ? _a : 4;
                    });
                    watch(() => props.modelValue, () => {
                        updateRefValue(internalValue, props.modelValue ? props.modelValue.split(",") : []);
                    });
                    watch(internalValue, () => {
                        context.emit("update:modelValue", internalValue.value.join(","));
                    });
                    return {
                        internalValue,
                        options,
                        repeatColumns
                    };
                },
                template: `
<CheckBoxList v-model="internalValue" horizontal :items="options" :repeatColumns="repeatColumns" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "CampusesField.Configuration",
                components: {
                    CheckBox,
                    CheckBoxList,
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                setup(props, { emit }) {
                    const enhancedSelection = ref(false);
                    const numberOfColumns = ref(null);
                    const includeInactive = ref(false);
                    const filterCampusTypes = ref([]);
                    const filterCampusStatus = ref([]);
                    const selectableCampuses = ref([]);
                    const campusTypeOptions = ref([]);
                    const campusStatusOptions = ref([]);
                    const allCampusItems = ref([]);
                    const allCampusOptions = computed(() => {
                        return allCampusItems.value.map((c) => {
                            return {
                                value: c.guid,
                                text: c.name
                            };
                        });
                    });
                    const campusOptions = computed(() => {
                        return allCampusItems.value.filter(c => {
                            if (!includeInactive.value && !c.isActive) {
                                return false;
                            }
                            if (filterCampusTypes.value.length) {
                                if (filterCampusTypes.value.filter(o => areEqual(o, c.type)).length === 0) {
                                    return false;
                                }
                            }
                            if (filterCampusStatus.value.length) {
                                if (filterCampusStatus.value.filter(o => areEqual(o, c.status)).length === 0) {
                                    return false;
                                }
                            }
                            if (selectableCampuses.value.length) {
                                if (selectableCampuses.value.filter(o => areEqual(o, c.guid)).length === 0) {
                                    return false;
                                }
                            }
                            return true;
                        }).map(c => {
                            return {
                                value: c.guid,
                                text: c.name
                            };
                        });
                    });
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        const newValue = {};
                        newValue["enhancedselection"] = (_a = asTrueFalseOrNull(enhancedSelection.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["repeatColumns"] = (_c = (_b = numberOfColumns.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
                        newValue["includeInactive"] = (_d = asTrueFalseOrNull(includeInactive.value)) !== null && _d !== void 0 ? _d : "False";
                        newValue["filterCampusTypes"] = filterCampusTypes.value.join(",");
                        newValue["filterCampusStatus"] = filterCampusStatus.value.join(",");
                        newValue["selectableCampuses"] = selectableCampuses.value.join(",");
                        newValue["values"] = JSON.stringify(campusOptions.value);
                        const anyValueChanged = newValue["enhancedselection"] !== ((_e = props.modelValue["enhancedselection"]) !== null && _e !== void 0 ? _e : "False")
                            || newValue["repeatColumns"] !== ((_f = props.modelValue["repeatColumns"]) !== null && _f !== void 0 ? _f : "")
                            || newValue["includeInactive"] !== ((_g = props.modelValue["includeInactive"]) !== null && _g !== void 0 ? _g : "False")
                            || newValue["filterCampusTypes"] !== ((_h = props.modelValue["filterCampusTypes"]) !== null && _h !== void 0 ? _h : "")
                            || newValue["filterCampusStatus"] !== ((_j = props.modelValue["filterCampusStatus"]) !== null && _j !== void 0 ? _j : "")
                            || newValue["selectableCampuses"] !== ((_k = props.modelValue["selectableCampuses"]) !== null && _k !== void 0 ? _k : "")
                            || newValue["values"] !== ((_l = props.modelValue["values"]) !== null && _l !== void 0 ? _l : "");
                        if (anyValueChanged) {
                            emit("update:modelValue", newValue);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    const maybeUpdateConfiguration = (key, value) => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfigurationValue", key, value);
                        }
                    };
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a, _b, _c, _d, _e, _f;
                        const campuses = props.configurationProperties["campuses"];
                        const campusTypes = props.configurationProperties["campusTypes"];
                        const campusStatuses = props.configurationProperties["campusStatuses"];
                        allCampusItems.value = campuses ? JSON.parse(campuses) : [];
                        campusTypeOptions.value = campusTypes ? JSON.parse(campusTypes) : [];
                        campusStatusOptions.value = campusStatuses ? JSON.parse(campusStatuses) : [];
                        enhancedSelection.value = asBoolean(props.modelValue["enhancedselection"]);
                        numberOfColumns.value = toNumberOrNull(props.modelValue["repeatColumns"]);
                        includeInactive.value = asBoolean(props.modelValue["includeInactive"]);
                        filterCampusTypes.value = ((_b = (_a = props.modelValue["filterCampusTypes"]) === null || _a === void 0 ? void 0 : _a.split(",")) !== null && _b !== void 0 ? _b : []).filter(s => s !== "");
                        filterCampusStatus.value = ((_d = (_c = props.modelValue["filterCampusStatus"]) === null || _c === void 0 ? void 0 : _c.split(",")) !== null && _d !== void 0 ? _d : []).filter(s => s !== "");
                        selectableCampuses.value = ((_f = (_e = props.modelValue["selectableCampuses"]) === null || _e === void 0 ? void 0 : _e.split(",")) !== null && _f !== void 0 ? _f : []).filter(s => s !== "");
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(enhancedSelection, () => { var _a; return maybeUpdateConfiguration("enhancedselection", (_a = asTrueFalseOrNull(enhancedSelection.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(numberOfColumns, () => { var _a, _b; return maybeUpdateConfiguration("repeatColumns", (_b = (_a = numberOfColumns.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    watch(includeInactive, () => { var _a; return maybeUpdateConfiguration("includeInactive", (_a = asTrueFalseOrNull(includeInactive.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(filterCampusTypes, () => maybeUpdateConfiguration("filterCampusTypes", filterCampusTypes.value.join(",")));
                    watch(filterCampusStatus, () => maybeUpdateConfiguration("filterCampusStatus", filterCampusStatus.value.join(",")));
                    watch(selectableCampuses, () => maybeUpdateConfiguration("selectableCampuses", selectableCampuses.value.join(",")));
                    watch(campusOptions, () => maybeUpdateConfiguration("values", JSON.stringify(campusOptions.value)));
                    return {
                        allCampusOptions,
                        campusStatusOptions,
                        campusTypeOptions,
                        enhancedSelection,
                        filterCampusStatus,
                        filterCampusTypes,
                        includeInactive,
                        numberOfColumns,
                        selectableCampuses
                    };
                },
                template: `
<div>
    <CheckBox v-model="enhancedSelection"
        label="Enhanced For Long Lists"
        help="When set, will render a searchable selection of options." />

    <NumberBox v-if="!enhancedSelection"
        v-model="numberOfColumns"
        label="Number of Columns"
        help="Select how many columns the list should use before going to the next row. If blank or 0 then 4 columns will be displayed. There is no upper limit enforced here however the block this is used in might add contraints due to available space." />

    <CheckBox v-model="includeInactive"
        label="Include Inactive"
        help="When set, inactive campuses will be included in the list." />

    <CheckBoxList v-model="filterCampusTypes"
        label="Filter Campus Types"
        help="When set this will filter the campuses displayed in the list to the selected Types. Setting a filter will cause the campus picker to display even if 0 campuses are in the list."
        :items="campusTypeOptions"
        horizontal />

    <CheckBoxList v-model="filterCampusStatus"
        label="Filter Campus Status"
        help="When set this will filter the campuses displayed in the list to the selected Status. Setting a filter will cause the campus picker to display even if 0 campuses are in the list."
        :items="campusStatusOptions"
        horizontal />

    <CheckBoxList v-model="selectableCampuses"
        label="Selectable Campuses"
        :items="allCampusOptions"
        horizontal />
</div>
`
            }));

        })
    };
}));
