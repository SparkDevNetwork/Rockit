System.register(['vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, RockFormField, updateRefValue, defaultControlCompareValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            defaultControlCompareValue = module.defaultControlCompareValue;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var RadioButtonList = exports('default', defineComponent({
                name: "RadioButtonList",
                components: {
                    RockFormField
                },
                props: {
                    items: {
                        type: Array,
                        default: []
                    },
                    modelValue: {
                        type: String,
                        default: ""
                    },
                    repeatColumns: {
                        type: Number,
                        default: 0
                    },
                    horizontal: {
                        type: Boolean,
                        default: false
                    },
                    showBlankItem: {
                        type: Boolean,
                        default: false
                    },
                    compareValue: {
                        type: Function,
                        default: defaultControlCompareValue
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue);
                    const containerClasses = computed(() => {
                        const classes = [];
                        if (props.repeatColumns > 0) {
                            classes.push(`in-columns in-columns-${props.repeatColumns}`);
                        }
                        if (props.horizontal) {
                            classes.push("rockradiobuttonlist-horizontal");
                        }
                        else {
                            classes.push("rockradiobuttonlist-vertical");
                        }
                        return classes.join(" ");
                    });
                    const actualItems = computed(() => {
                        const items = [...props.items];
                        if (props.showBlankItem) {
                            items.splice(0, 0, {
                                value: "",
                                text: "None"
                            });
                        }
                        return items;
                    });
                    const getItemUniqueId = (uniqueId, item) => {
                        var _a;
                        const key = ((_a = item.value) !== null && _a !== void 0 ? _a : "").replace(" ", "-");
                        return `${uniqueId}-${key}`;
                    };
                    const syncInternalValue = () => {
                        var _a;
                        let value = props.modelValue;
                        if (value) {
                            const selectedOption = props.items.find(o => { var _a; return props.compareValue(value, (_a = o.value) !== null && _a !== void 0 ? _a : ""); }) || null;
                            if (!selectedOption) {
                                value = "";
                            }
                            else {
                                value = (_a = selectedOption.value) !== null && _a !== void 0 ? _a : "";
                            }
                        }
                        updateRefValue(internalValue, value);
                    };
                    watch([() => props.modelValue, () => props.items], () => {
                        syncInternalValue();
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    syncInternalValue();
                    return {
                        actualItems,
                        containerClasses,
                        getItemUniqueId,
                        internalValue
                    };
                },
                template: `
<RockFormField formGroupClasses="rock-radio-button-list" #default="{uniqueId}" name="radiobuttonlist" v-model="internalValue">
    <div class="control-wrapper">
        <div class="controls rockradiobuttonlist" :class="containerClasses">
            <span>
                <template v-if="horizontal">
                    <label v-for="item in actualItems" class="radio-inline" :for="getItemUniqueId(uniqueId, item)" :key="item.value">
                        <input :id="getItemUniqueId(uniqueId, item)" :name="uniqueId" type="radio" :value="item.value" v-model="internalValue" />
                        <span class="label-text">{{item.text}}</span>
                    </label>
                </template>
                <template v-else>
                    <div v-for="item in actualItems" class="radio" :key="item.value">
                        <label :for="getItemUniqueId(uniqueId, item)">
                            <input :id="getItemUniqueId(uniqueId, item)" :name="uniqueId" type="radio" :value="item.value" v-model="internalValue" />
                            <span class="label-text">{{item.text}}</span>
                        </label>
                    </div>
                </template>
            </span>
        </div>
    </div>
</RockFormField>`
            }));

        })
    };
}));
