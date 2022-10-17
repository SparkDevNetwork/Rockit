System.register(['vue', '@Obsidian/Utility/component', './rockFormField.js', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, updateRefValue, RockFormField, defaultControlCompareValue;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            defaultControlCompareValue = module.defaultControlCompareValue;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var CheckBoxList = exports('default', defineComponent({
                name: "CheckBoxList",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    items: {
                        type: Array,
                        required: true
                    },
                    repeatColumns: {
                        type: Number,
                        default: 0
                    },
                    horizontal: {
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
                    const internalValue = ref([...props.modelValue]);
                    const valueForItem = (item) => { var _a; return (_a = item.value) !== null && _a !== void 0 ? _a : ""; };
                    const textForItem = (item) => { var _a; return (_a = item.text) !== null && _a !== void 0 ? _a : ""; };
                    const uniqueIdForItem = (uniqueId, item) => { var _a; return `${uniqueId}-${((_a = item.value) !== null && _a !== void 0 ? _a : "").replace(" ", "-")}`; };
                    const containerClasses = computed(() => {
                        const classes = [];
                        if (props.horizontal) {
                            classes.push("rockcheckboxlist-horizontal");
                            if (props.repeatColumns > 0) {
                                classes.push(`in-columns in-columns-${props.repeatColumns}`);
                            }
                        }
                        else {
                            classes.push("rockcheckboxlist-vertical");
                        }
                        return classes.join(" ");
                    });
                    const syncInternalValue = () => {
                        let value = [...props.modelValue];
                        value = props.items
                            .filter(o => value.some(v => { var _a; return props.compareValue(v, (_a = o.value) !== null && _a !== void 0 ? _a : ""); }))
                            .map(o => { var _a; return (_a = o.value) !== null && _a !== void 0 ? _a : ""; });
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
                        containerClasses,
                        internalValue,
                        textForItem,
                        uniqueIdForItem,
                        valueForItem
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="check-box-list"
    name="check-box-list">
    <template #default="{uniqueId}">
        <div class="control-wrapper">
            <div class="controls rockcheckboxlist" :class="containerClasses">
                <template v-if="horizontal">
                    <label v-for="item in items" class="checkbox-inline" :for="uniqueIdForItem(uniqueId, item)">
                        <input :id="uniqueIdForItem(uniqueId, item)" :name="uniqueId" type="checkbox" :value="valueForItem(item)" v-model="internalValue" />
                        <span class="label-text">{{textForItem(item)}}</span>
                    </label>
                </template>
                <template v-else>
                    <div v-for="item in items" class="checkbox">
                        <label :for="uniqueIdForItem(uniqueId, item)">
                            <input :id="uniqueIdForItem(uniqueId, item)" :name="uniqueId" type="checkbox" :value="valueForItem(item)" v-model="internalValue" />
                            <span class="label-text">{{textForItem(item)}}</span>
                        </label>
                    </div>
                </template>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
