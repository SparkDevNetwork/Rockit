System.register(['vue', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/rockFormField', '@Obsidian/Controls/textBox', '@Obsidian/Utility/booleanUtils', './utils.js', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, CheckBox, DropDownList, RockFormField, TextBox, asBoolean, asBooleanOrNull, asTrueFalseOrNull, getFieldEditorProps, getFieldConfigurationProps;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            asBoolean = module.asBoolean;
            asBooleanOrNull = module.asBooleanOrNull;
            asTrueFalseOrNull = module.asTrueFalseOrNull;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            function parseModelValue(modelValue) {
                try {
                    return JSON.parse(modelValue !== null && modelValue !== void 0 ? modelValue : "[]");
                }
                catch (_a) {
                    return [];
                }
            }
            const EditComponent = exports('EditComponent', defineComponent({
                name: "KeyValueListField.Edit",
                components: {
                    RockFormField,
                    DropDownList,
                    TextBox
                },
                props: getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValues = ref(parseModelValue(props.modelValue));
                    const valueOptions = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const options = computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    const hasValues = computed(() => valueOptions.value.length > 0);
                    const keyPlaceholder = computed(() => {
                        var _a;
                        return (_a = props.configurationValues["keyprompt"]) !== null && _a !== void 0 ? _a : "";
                    });
                    const valuePlaceholder = computed(() => {
                        var _a;
                        return (_a = props.configurationValues["valueprompt"]) !== null && _a !== void 0 ? _a : "";
                    });
                    const displayValueFirst = computed(() => {
                        var _a;
                        return asBoolean((_a = props.configurationValues["displayvaluefirst"]) !== null && _a !== void 0 ? _a : "");
                    });
                    watch(() => props.modelValue, () => {
                        internalValues.value = parseModelValue(props.modelValue);
                    });
                    watch(() => internalValues.value, () => {
                        emit("update:modelValue", JSON.stringify(internalValues.value));
                    }, {
                        deep: true
                    });
                    const onAddClick = () => {
                        let defaultValue = "";
                        if (hasValues.value) {
                            defaultValue = valueOptions.value[0].value;
                        }
                        internalValues.value.push({ key: "", value: defaultValue });
                    };
                    const onRemoveClick = (index) => {
                        internalValues.value.splice(index, 1);
                    };
                    return {
                        internalValues,
                        hasValues,
                        displayValueFirst,
                        options,
                        keyPlaceholder,
                        valuePlaceholder,
                        onAddClick,
                        onRemoveClick
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValues"
    formGroupClasses="key-value-list"
    name="key-value-list">
    <template #default="{uniqueId}">
        <div class="control-wrapper">
<span :id="uniqueId" class="key-value-list">
    <span class="key-value-rows">
        <div v-for="(value, valueIndex) in internalValues" class="controls controls-row form-control-group">
            <template v-if="!displayValueFirst">
                <input v-model="value.key" class="key-value-key form-control input-width-md" type="text" :placeholder="keyPlaceholder">

                <select v-if="hasValues" v-model="value.value" class="form-control input-width-lg">
                    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
                </select>
                <input v-else v-model="value.value" class="key-value-value form-control input-width-md" type="text" :placeholder="valuePlaceholder">
            </template>
            <template v-else>
                <select v-if="hasValues" v-model="value.value" class="form-control input-width-lg">
                    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
                </select>
                <input v-else v-model="value.value" class="key-value-value form-control input-width-md" type="text" :placeholder="valuePlaceholder">

                <input v-model="value.key" class="key-value-key form-control input-width-md" type="text" :placeholder="keyPlaceholder">
            </template>

            <a href="#" @click.prevent="onRemoveClick(valueIndex)" class="btn btn-sm btn-danger"><i class="fa fa-times"></i></a>
        </div>
    </span>
    <div class="control-actions">
        <a class="btn btn-action btn-square btn-xs" href="#" @click.prevent="onAddClick"><i class="fa fa-plus-circle"></i></a>
    </div>
</span>
        </div>
    </template>
</RockFormField>
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "KeyValueListField.Configuration",
                components: {
                    CheckBox,
                    DropDownList,
                    TextBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const customValues = ref("");
                    const internalCustomValues = ref("");
                    const keyPrompt = ref("");
                    const labelPrompt = ref("");
                    const definedType = ref("");
                    const allowHtml = ref(false);
                    const displayValueFirst = ref(false);
                    const definedTypeOptions = computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationProperties["definedTypes"]) !== null && _a !== void 0 ? _a : "[]");
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const onBlur = () => {
                        internalCustomValues.value = customValues.value;
                    };
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        const newValue = {};
                        newValue["keyprompt"] = (_a = keyPrompt.value) !== null && _a !== void 0 ? _a : "";
                        newValue["valueprompt"] = (_b = labelPrompt.value) !== null && _b !== void 0 ? _b : "";
                        newValue["definedtype"] = (_c = definedType.value) !== null && _c !== void 0 ? _c : "";
                        newValue["customvalues"] = (_d = internalCustomValues.value) !== null && _d !== void 0 ? _d : "";
                        newValue["allowhtml"] = (_e = asTrueFalseOrNull(allowHtml.value)) !== null && _e !== void 0 ? _e : "False";
                        newValue["displayvaluefirst"] = (_f = asTrueFalseOrNull(displayValueFirst.value)) !== null && _f !== void 0 ? _f : "False";
                        const anyValueChanged = newValue["keyprompt"] !== ((_g = props.modelValue["keyprompt"]) !== null && _g !== void 0 ? _g : "")
                            || newValue["valueprompt"] !== ((_h = props.modelValue["valueprompt"]) !== null && _h !== void 0 ? _h : "")
                            || newValue["definedtype"] !== ((_j = props.modelValue["definedtype"]) !== null && _j !== void 0 ? _j : "")
                            || newValue["customvalues"] !== ((_k = props.modelValue["customvalues"]) !== null && _k !== void 0 ? _k : "")
                            || newValue["allowhtml"] !== ((_l = props.modelValue["allowhtml"]) !== null && _l !== void 0 ? _l : "False")
                            || newValue["displayvaluefirst"] !== ((_m = props.modelValue["displayvaluefirst"]) !== null && _m !== void 0 ? _m : "False");
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
                        keyPrompt.value = (_a = props.modelValue["keyprompt"]) !== null && _a !== void 0 ? _a : "";
                        labelPrompt.value = (_b = props.modelValue["valueprompt"]) !== null && _b !== void 0 ? _b : "";
                        definedType.value = (_c = props.modelValue["definedtype"]) !== null && _c !== void 0 ? _c : "";
                        customValues.value = (_d = props.modelValue["customvalues"]) !== null && _d !== void 0 ? _d : "";
                        internalCustomValues.value = customValues.value;
                        allowHtml.value = (_e = asBooleanOrNull(props.modelValue["allowhtml"])) !== null && _e !== void 0 ? _e : false;
                        displayValueFirst.value = (_f = asBooleanOrNull(props.modelValue["displayvaluefirst"])) !== null && _f !== void 0 ? _f : false;
                    }, {
                        immediate: true
                    });
                    watch([definedType, internalCustomValues], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(keyPrompt, () => { var _a; return maybeUpdateConfiguration("keyprompt", (_a = keyPrompt.value) !== null && _a !== void 0 ? _a : ""); });
                    watch(labelPrompt, () => { var _a; return maybeUpdateConfiguration("valueprompt", (_a = labelPrompt.value) !== null && _a !== void 0 ? _a : ""); });
                    watch(allowHtml, () => { var _a; return maybeUpdateConfiguration("allowhtml", (_a = asTrueFalseOrNull(allowHtml.value)) !== null && _a !== void 0 ? _a : "False"); });
                    watch(displayValueFirst, () => { var _a; return maybeUpdateConfiguration("displayvaluefirst", (_a = asTrueFalseOrNull(displayValueFirst.value)) !== null && _a !== void 0 ? _a : "False"); });
                    return {
                        allowHtml,
                        definedType,
                        definedTypeOptions,
                        displayValueFirst,
                        keyPrompt,
                        labelPrompt,
                        onBlur,
                        customValues
                    };
                },
                template: `
<div>
    <TextBox v-model="keyPrompt"
        label="Key Prompt"
        help="The text to display as a prompt in the key textbox." />

    <TextBox v-model="labelPrompt"
        label="Label Prompt"
        help="The text to display as a prompt in the label textbox." />

    <DropDownList v-model="definedType"
        label="Defined Type"
        help="Optional Defined Type to select values from, otherwise values will be free-form text fields."
        :items="definedTypeOptions" />

    <TextBox v-model="customValues"
        label="Custom Values"
        help="Optional list of options to use for the values.  Format is either 'value1,value2,value3,...', or 'value1^text1,value2^text2,value3^text3,...'."
        textMode="multiline"
        @blur="onBlur" />

    <CheckBox v-model="allowHtml"
        label="Allow HTML"
        help="Allow HTML content in values." />

    <CheckBox v-model="displayValueFirst"
        label="Display Value First"
        help="Reverses the display order of the key and the value." />
</div>
`
            }));

        })
    };
}));
