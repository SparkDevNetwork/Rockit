System.register(['@Obsidian/Utility/fieldTypes', 'vue'], (function (exports) {
    'use strict';
    var getFieldType, defineComponent, computed, provide;
    return {
        setters: [function (module) {
            getFieldType = module.getFieldType;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            provide = module.provide;
        }],
        execute: (function () {

            const textField = getFieldType("9C204CD0-1233-41C5-818A-C5DA439445AA");
            var RockField = exports('default', defineComponent({
                name: "RockField",
                props: {
                    modelValue: {
                        type: String,
                        required: false
                    },
                    attribute: {
                        type: Object,
                        required: true
                    },
                    showEmptyValue: {
                        type: Boolean,
                        default: false
                    },
                    isEditMode: {
                        type: Boolean,
                        default: false
                    },
                    showLabel: {
                        type: Boolean,
                        default: true
                    },
                    isCondensed: {
                        type: Boolean,
                        default: false
                    }
                },
                setup(props, { emit }) {
                    const field = computed(() => {
                        var _a;
                        const fieldType = getFieldType((_a = props.attribute.fieldTypeGuid) !== null && _a !== void 0 ? _a : "");
                        return fieldType !== null && fieldType !== void 0 ? fieldType : textField;
                    });
                    const showValue = computed(() => { var _a, _b, _c; return props.showEmptyValue || ((_a = field.value) === null || _a === void 0 ? void 0 : _a.getTextValue((_b = props.modelValue) !== null && _b !== void 0 ? _b : "", (_c = props.attribute.configurationValues) !== null && _c !== void 0 ? _c : {})) !== ""; });
                    const isRequired = computed(() => props.attribute.isRequired);
                    const rules = computed(() => isRequired.value ? "required" : "");
                    const isEditMode = computed(() => props.isEditMode);
                    const label = computed(() => props.attribute.name);
                    const helpText = computed(() => props.attribute.description);
                    const valueComponent = computed(() => {
                        var _a, _b;
                        return props.isCondensed
                            ? (_a = field.value) === null || _a === void 0 ? void 0 : _a.getCondensedFormattedComponent()
                            : (_b = field.value) === null || _b === void 0 ? void 0 : _b.getFormattedComponent();
                    });
                    const editComponent = computed(() => { var _a; return (_a = field.value) === null || _a === void 0 ? void 0 : _a.getEditComponent(); });
                    const value = computed({
                        get: () => props.modelValue || "",
                        set(newValue) {
                            emit("update:modelValue", newValue);
                        }
                    });
                    const configurationValues = computed(() => {
                        var _a;
                        return (_a = props.attribute.configurationValues) !== null && _a !== void 0 ? _a : {};
                    });
                    provide("isRequired", isRequired);
                    return {
                        label,
                        showValue,
                        valueComponent,
                        rules,
                        isEditMode,
                        editComponent,
                        value,
                        helpText,
                        configurationValues
                    };
                },
                template: `
<div v-if="!isEditMode">
    <template v-if="showLabel">
        <div v-if="showValue" class="form-group static-control">
            <label class="control-label">
                {{ label }}
            </label>
            <div class="control-wrapper">
                <div class="form-control-static">
                    <component :is="valueComponent" :modelValue="value" :configurationValues="configurationValues" />
                </div>
            </div>
        </div>
    </template>
    <component v-else :is="valueComponent" :modelValue="value" :configurationValues="configurationValues" />
</div>
<div v-else>
    <component :is="editComponent"
        v-model="value"
        :label="label"
        :help="helpText"
        :configurationValues="configurationValues"
        :rules="rules" />
</div>`
            }));

        })
    };
}));
