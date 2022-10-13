System.register(['vue', './utils.js', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/checkBoxList', '@Obsidian/Controls/dropDownList', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/guid', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, getFieldEditorProps, getFieldConfigurationProps, CheckBox, CheckBoxList, DropDownList, asBoolean, asTrueFalseOrNull, areEqual;
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
            DropDownList = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            areEqual = module.areEqual;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "CampusField.Edit",
                components: {
                    DropDownList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    var _a;
                    const internalValue = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : "");
                    const options = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    watch(() => props.modelValue, () => { var _a; return internalValue.value = (_a = props.modelValue) !== null && _a !== void 0 ? _a : ""; });
                    watch(internalValue, () => emit("update:modelValue", internalValue.value));
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<DropDownList v-model="internalValue" :items="options" />
`
            }));
            const FilterComponent = exports('FilterComponent', defineComponent({
                name: "CampusField.Filter",
                components: {
                    CheckBoxList
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue.split(",").filter(s => s !== ""));
                    const options = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    watch(() => props.modelValue, () => internalValue.value = props.modelValue.split(",").filter(s => s !== ""));
                    watch(internalValue, () => emit("update:modelValue", internalValue.value.join(",")));
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<CheckBoxList v-model="internalValue" :items="options" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "CampusField.Configuration",
                components: {
                    CheckBoxList,
                    CheckBox
                },
                props: getFieldConfigurationProps(),
                setup(props, { emit }) {
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
                        var _a, _b, _c, _d, _e, _f;
                        const newValue = Object.assign({}, props.modelValue);
                        newValue["includeInactive"] = (_a = asTrueFalseOrNull(includeInactive.value)) !== null && _a !== void 0 ? _a : "False";
                        newValue["filterCampusTypes"] = filterCampusTypes.value.join(",");
                        newValue["filterCampusStatus"] = filterCampusStatus.value.join(",");
                        newValue["selectableCampuses"] = selectableCampuses.value.join(",");
                        newValue["values"] = JSON.stringify(campusOptions.value);
                        const anyValueChanged = newValue["includeInactive"] !== ((_b = props.modelValue["includeInactive"]) !== null && _b !== void 0 ? _b : "False")
                            || newValue["filterCampusTypes"] !== ((_c = props.modelValue["filterCampusTypes"]) !== null && _c !== void 0 ? _c : "")
                            || newValue["filterCampusStatus"] !== ((_d = props.modelValue["filterCampusStatus"]) !== null && _d !== void 0 ? _d : "")
                            || newValue["selectableCampuses"] !== ((_e = props.modelValue["selectableCampuses"]) !== null && _e !== void 0 ? _e : "")
                            || newValue["values"] !== ((_f = props.modelValue["values"]) !== null && _f !== void 0 ? _f : "[]");
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
                    watch(includeInactive, () => { var _a; return maybeUpdateConfiguration("includeInactive", (_a = asTrueFalseOrNull(includeInactive.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(filterCampusTypes, () => maybeUpdateConfiguration("filterCampusTypes", filterCampusTypes.value.join(",")));
                    watch(filterCampusStatus, () => maybeUpdateConfiguration("filterCampusStatus", filterCampusStatus.value.join(",")));
                    watch(selectableCampuses, () => maybeUpdateConfiguration("selectableCampuses", selectableCampuses.value.join(",")));
                    watch(campusOptions, () => emit("updateConfigurationValue", "values", JSON.stringify(campusOptions.value)));
                    return {
                        allCampusOptions,
                        campusStatusOptions,
                        campusTypeOptions,
                        filterCampusStatus,
                        filterCampusTypes,
                        includeInactive,
                        selectableCampuses
                    };
                },
                template: `
<div>
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
