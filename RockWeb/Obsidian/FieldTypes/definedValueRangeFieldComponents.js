System.register(['vue', './utils.js', '@Obsidian/Controls/rockFormField', '@Obsidian/Utility/booleanUtils', '@Obsidian/Utility/linq', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, inject, getFieldEditorProps, RockFormField, asBoolean, List;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            inject = module.inject;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
        }, function (module) {
            List = module.List;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            function parseModelValue(modelValue) {
                var _a;
                try {
                    const clientValue = JSON.parse(modelValue !== null && modelValue !== void 0 ? modelValue : "");
                    const splitValue = ((_a = clientValue.value) !== null && _a !== void 0 ? _a : "").split(",");
                    if (splitValue.length === 1) {
                        return [splitValue[0], ""];
                    }
                    return splitValue;
                }
                catch (_b) {
                    return ["", ""];
                }
            }
            function getClientValue(lowerValue, upperValue, valueOptions, showDescription) {
                var _a, _b, _c, _d, _e, _f;
                const options = new List(valueOptions);
                const lv = options.firstOrUndefined(v => v.value === lowerValue);
                const uv = options.firstOrUndefined(v => v.value === upperValue);
                if (!lv && !uv) {
                    return {
                        value: "",
                        text: "",
                        description: ""
                    };
                }
                return {
                    value: `${(_a = lv === null || lv === void 0 ? void 0 : lv.value) !== null && _a !== void 0 ? _a : ""},${(_b = uv === null || uv === void 0 ? void 0 : uv.value) !== null && _b !== void 0 ? _b : ""}`,
                    text: `${(_c = lv === null || lv === void 0 ? void 0 : lv.text) !== null && _c !== void 0 ? _c : ""} to ${(_d = uv === null || uv === void 0 ? void 0 : uv.text) !== null && _d !== void 0 ? _d : ""}`,
                    description: showDescription ? `${(_e = lv === null || lv === void 0 ? void 0 : lv.description) !== null && _e !== void 0 ? _e : ""} to ${(_f = uv === null || uv === void 0 ? void 0 : uv.description) !== null && _f !== void 0 ? _f : ""}` : ""
                };
            }
            const EditComponent = exports('EditComponent', defineComponent({
                name: "DefinedValueRangeField.Edit",
                components: {
                    RockFormField
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValues = parseModelValue(props.modelValue);
                    const internalValue = ref(props.modelValue);
                    const lowerValue = ref(internalValues[0]);
                    const upperValue = ref(internalValues[1]);
                    const valueOptions = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const showDescription = computed(() => {
                        return asBoolean(props.configurationValues["displaydescription"]);
                    });
                    const options = computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: showDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    watch(() => props.modelValue, () => {
                        const internalValues = parseModelValue(props.modelValue);
                        lowerValue.value = internalValues[0];
                        upperValue.value = internalValues[1];
                    });
                    watch(() => [lowerValue.value, upperValue.value], () => {
                        const clientValue = getClientValue(lowerValue.value, upperValue.value, valueOptions.value, showDescription.value);
                        emit("update:modelValue", JSON.stringify(clientValue));
                    });
                    return {
                        internalValue,
                        lowerValue,
                        upperValue,
                        isRequired: inject("isRequired"),
                        options,
                        getKeyForOption(option) {
                            var _a;
                            return (_a = option.value) !== null && _a !== void 0 ? _a : "";
                        },
                        getTextForOption(option) {
                            var _a;
                            return (_a = option.text) !== null && _a !== void 0 ? _a : "";
                        }
                    };
                },
                template: `
<RockFormField
    v-model="internalValue"
    formGroupClasses="rock-defined-value-range"
    name="definedvaluerange"
    #default="{uniqueId}"
    :rules="computedRules">
    <div :id="uniqueId" class="form-control-group">
        <select class="input-width-md form-control" v-model="lowerValue">
            <option v-if="!isRequired" value=""></option>
            <option v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
        </select>
        <span class="to"> to </span>
        <select class="input-width-md form-control" v-model="upperValue">
            <option v-if="!isRequired" value=""></option>
            <option v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
        </select>
    </div>
</RockFormField>
`
            }));

        })
    };
}));
