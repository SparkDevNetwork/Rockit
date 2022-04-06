System.register(["vue", "../../../../Controls/panel", "../../../../Controls/fieldTypeEditor", "../../../../Elements/switch", "../../../../Elements/numberBox", "../../../../Elements/textBox", "../../../../Elements/slider", "../../../../Controls/rockForm", "../../../../Util/linq", "./utils", "../../../../Util/guid"], function (exports_1, context_1) {
    "use strict";
    var vue_1, panel_1, fieldTypeEditor_1, switch_1, numberBox_1, textBox_1, slider_1, rockForm_1, linq_1, utils_1, guid_1;
    var __moduleName = context_1 && context_1.id;
    function shallowStrictEqual(a, b) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys) {
            if (!bKeys.includes(key)) {
                return false;
            }
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (fieldTypeEditor_1_1) {
                fieldTypeEditor_1 = fieldTypeEditor_1_1;
            },
            function (switch_1_1) {
                switch_1 = switch_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (slider_1_1) {
                slider_1 = slider_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (linq_1_1) {
                linq_1 = linq_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.FieldEditAside",
                components: {
                    Panel: panel_1.default,
                    FieldTypeEditor: fieldTypeEditor_1.default,
                    InlineSwitch: switch_1.default,
                    NumberBox: numberBox_1.default,
                    RockForm: rockForm_1.default,
                    Slider: slider_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    existingKeys: {
                        type: Array,
                        required: true
                    }
                },
                emits: [
                    "update:modelValue",
                    "close"
                ],
                methods: {
                    isSafeToClose() {
                        this.formSubmit = true;
                        const result = Object.keys(this.validationErrors).length === 0;
                        if (!result && this.scrollableElement) {
                            this.scrollableElement.scroll({
                                behavior: "smooth",
                                top: 0
                            });
                        }
                        return result;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const fieldTypeValue = vue_1.ref({
                        fieldTypeGuid: props.modelValue.fieldTypeGuid,
                        configurationOptions: (_a = props.modelValue.configurationValues) !== null && _a !== void 0 ? _a : {},
                        defaultValue: (_b = props.modelValue.defaultValue) !== null && _b !== void 0 ? _b : ""
                    });
                    const fieldTypes = (_c = utils_1.useFormSources().fieldTypes) !== null && _c !== void 0 ? _c : [];
                    const fieldTypeEditorKey = vue_1.computed(() => `fieldTypeEditor_${props.modelValue.guid}`);
                    const fieldType = vue_1.computed(() => {
                        var _a;
                        return (_a = new linq_1.List(fieldTypes).firstOrUndefined(f => guid_1.areEqual(f.guid, props.modelValue.fieldTypeGuid))) !== null && _a !== void 0 ? _a : null;
                    });
                    const asideIconClass = vue_1.computed(() => { var _a, _b; return (_b = (_a = fieldType.value) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : ""; });
                    const fieldName = vue_1.ref(props.modelValue.name);
                    const fieldDescription = vue_1.ref((_d = props.modelValue.description) !== null && _d !== void 0 ? _d : "");
                    const fieldKey = vue_1.ref(props.modelValue.key);
                    const fieldSize = vue_1.ref(props.modelValue.size);
                    const isFieldRequired = vue_1.ref((_e = props.modelValue.isRequired) !== null && _e !== void 0 ? _e : false);
                    const isFieldLabelHidden = vue_1.ref((_f = props.modelValue.isHideLabel) !== null && _f !== void 0 ? _f : false);
                    const isShowOnGrid = vue_1.ref((_g = props.modelValue.isShowOnGrid) !== null && _g !== void 0 ? _g : false);
                    const validationErrors = vue_1.ref({});
                    const formSubmit = vue_1.ref(false);
                    const scrollableElement = vue_1.ref(null);
                    const fieldKeyRules = vue_1.computed(() => {
                        const rules = ["required"];
                        const keys = props.existingKeys.filter(k => !guid_1.areEqual(k.value, props.modelValue.guid));
                        rules.push((value) => {
                            const valueString = value;
                            if (keys.filter(k => k.text === valueString).length > 0) {
                                return "must be unique";
                            }
                            return "";
                        });
                        return rules;
                    });
                    const onBackClick = () => emit("close");
                    const onFieldTypeModelValueUpdate = (value) => {
                        emit("update:modelValue", Object.assign(Object.assign({}, props.modelValue), { configurationValues: value.configurationOptions, defaultValue: value.defaultValue }));
                    };
                    const onValidationChanged = (errors) => {
                        validationErrors.value = errors;
                    };
                    vue_1.watch(fieldName, (newValue, oldValue) => {
                        const oldValueAsKey = oldValue.replace(/[^a-zA-Z0-9_\-.]/g, "");
                        if (oldValueAsKey === fieldKey.value) {
                            fieldKey.value = newValue.replace(/[^a-zA-Z0-9_\-.]/g, "");
                        }
                    });
                    vue_1.watch([fieldName, fieldDescription, fieldKey, fieldSize, isFieldRequired, isFieldLabelHidden, isShowOnGrid], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: fieldName.value, description: fieldDescription.value, key: fieldKey.value, size: fieldSize.value, isRequired: isFieldRequired.value, isHideLabel: isFieldLabelHidden.value, isShowOnGrid: isShowOnGrid.value });
                        emit("update:modelValue", newValue);
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        fieldName.value = props.modelValue.name;
                        fieldDescription.value = (_a = props.modelValue.description) !== null && _a !== void 0 ? _a : "";
                        fieldKey.value = props.modelValue.key;
                        fieldSize.value = props.modelValue.size;
                        isFieldRequired.value = (_b = props.modelValue.isRequired) !== null && _b !== void 0 ? _b : false;
                        isFieldLabelHidden.value = (_c = props.modelValue.isHideLabel) !== null && _c !== void 0 ? _c : false;
                        isShowOnGrid.value = (_d = props.modelValue.isShowOnGrid) !== null && _d !== void 0 ? _d : false;
                        const isConfigChanged = fieldTypeValue.value.fieldTypeGuid !== props.modelValue.fieldTypeGuid
                            || !shallowStrictEqual(fieldTypeValue.value.configurationOptions, (_e = props.modelValue.configurationValues) !== null && _e !== void 0 ? _e : {})
                            || fieldTypeValue.value.defaultValue !== props.modelValue.defaultValue;
                        if (isConfigChanged) {
                            fieldTypeValue.value = {
                                fieldTypeGuid: props.modelValue.fieldTypeGuid,
                                configurationOptions: (_f = props.modelValue.configurationValues) !== null && _f !== void 0 ? _f : {},
                                defaultValue: (_g = props.modelValue.defaultValue) !== null && _g !== void 0 ? _g : ""
                            };
                        }
                    });
                    return {
                        asideIconClass,
                        fieldDescription,
                        fieldKey,
                        fieldKeyRules,
                        fieldName,
                        fieldSize,
                        fieldTypeEditorKey,
                        fieldTypeValue,
                        formSubmit,
                        isFieldLabelHidden,
                        isFieldRequired,
                        isShowOnGrid,
                        onBackClick,
                        onFieldTypeModelValueUpdate,
                        onValidationChanged,
                        scrollableElement,
                        validationErrors
                    };
                },
                template: `
<div class="d-flex flex-column" style="overflow-y: hidden; flex-grow: 1;">
    <div class="d-flex">
        <div class="d-flex clickable" style="background-color: #484848; color: #fff; align-items: center; justify-content: center; width: 40px;" @click="onBackClick">
            <i class="fa fa-chevron-left"></i>
        </div>

        <div class="p-2 aside-header" style="flex-grow: 1;">
            <i v-if="asideIconClass" :class="asideIconClass"></i>
            <span class="title">{{ fieldName }}</span>
        </div>
    </div>

    <div ref="scrollableElement" class="aside-body d-flex flex-column" style="flex-grow: 1; overflow-y: auto;">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged" class="d-flex flex-column" style="flex-grow: 1;">
            <Panel :modelValue="true" title="Field Type" :hasCollapse="true">
                <TextBox v-model="fieldName"
                    rules="required"
                    label="Name" />
                <TextBox v-model="fieldDescription"
                    label="Description"
                    textMode="multiline" />
                <FieldTypeEditor :modelValue="fieldTypeValue" :key="fieldTypeEditorKey" @update:modelValue="onFieldTypeModelValueUpdate" isFieldTypeReadOnly />
            </Panel>

            <Panel title="Conditionals" :hasCollapse="true">
                TODO: Need to build this.
            </Panel>

            <Panel title="Format" :hasCollapse="true">
                <Slider v-model="fieldSize" label="Column Span" :min="1" :max="12" isIntegerOnly showValueBar/>
                <InlineSwitch v-model="isFieldRequired" text="Required" />
                <InlineSwitch v-model="isFieldLabelHidden" text="Hide Label" />
            </Panel>

            <Panel title="Advanced" :hasCollapse="true">
                <TextBox v-model="fieldKey"
                    :rules="fieldKeyRules"
                    label="Field Key" />
                <InlineSwitch v-model="isShowOnGrid" text="Show on Results Grid" />
            </Panel>
        </RockForm>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=fieldEditAside.js.map