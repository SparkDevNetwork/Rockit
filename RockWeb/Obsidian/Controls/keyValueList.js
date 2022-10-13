System.register(['vue', './dropDownList.js', './rockFormField.js', './textBox.js', 'ant-design-vue', '@Obsidian/Utility/util', '@Obsidian/Utility/component', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, DropDownList, RockFormField, TextBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var keyValueList = exports('default', defineComponent({
                name: "KeyValueListField.Edit",
                components: {
                    RockFormField,
                    DropDownList,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Array,
                        required: false
                    },
                    valueOptions: {
                        type: Array,
                        required: false
                    },
                    keyPlaceholder: {
                        type: String,
                        required: false
                    },
                    valuePlaceholder: {
                        type: String,
                        required: false
                    },
                    displayValueFirst: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    var _a;
                    const internalValues = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : []);
                    const options = computed(() => { var _a; return (_a = props.valueOptions) !== null && _a !== void 0 ? _a : []; });
                    const hasValues = computed(() => options.value.length > 0);
                    watch(() => props.modelValue, () => {
                        var _a;
                        internalValues.value = (_a = props.modelValue) !== null && _a !== void 0 ? _a : [];
                    });
                    watch(() => internalValues.value, () => {
                        emit("update:modelValue", internalValues.value);
                    }, {
                        deep: true
                    });
                    const onAddClick = () => {
                        var _a;
                        let defaultValue = "";
                        if (hasValues.value) {
                            defaultValue = (_a = options.value[0].value) !== null && _a !== void 0 ? _a : "";
                        }
                        internalValues.value.push({ key: "", value: defaultValue });
                    };
                    const onRemoveClick = (index) => {
                        internalValues.value.splice(index, 1);
                    };
                    return {
                        internalValues,
                        hasValues,
                        options,
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

        })
    };
}));
