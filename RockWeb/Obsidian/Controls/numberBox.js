System.register(['vue', '@Obsidian/ValidationRules', '@Obsidian/Utility/numberUtils', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, rulesPropType, normalizeRules, asFormattedString, toNumberOrNull, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            rulesPropType = module.rulesPropType;
            normalizeRules = module.normalizeRules;
        }, function (module) {
            asFormattedString = module.asFormattedString;
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var NumberBox = exports('default', defineComponent({
                name: "NumberBox",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: null
                    },
                    placeholder: {
                        type: String,
                        default: ""
                    },
                    minimumValue: {
                        type: Number
                    },
                    maximumValue: {
                        type: Number
                    },
                    decimalCount: {
                        type: Number,
                        default: null
                    },
                    inputClasses: {
                        type: String,
                        default: ""
                    },
                    inputGroupClasses: {
                        type: String,
                        default: ""
                    },
                    rules: rulesPropType
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, ctx) {
                    var _a;
                    const internalValue = ref(asFormattedString(props.modelValue, (_a = props.decimalCount) !== null && _a !== void 0 ? _a : undefined, { useGrouping: false }));
                    const internalNumberValue = computed(() => {
                        return toNumberOrNull(internalValue.value);
                    });
                    const internalStep = computed(() => {
                        return props.decimalCount === null ? "any" : (1 / Math.pow(10, props.decimalCount)).toString();
                    });
                    const isInputGroup = computed(() => {
                        return !!ctx.slots.prepend || !!ctx.slots.append;
                    });
                    const controlContainerClass = computed(() => {
                        return isInputGroup.value ? "input-group" : "";
                    });
                    const computedRules = computed(() => {
                        const rules = normalizeRules(props.rules);
                        if (props.maximumValue !== null && props.maximumValue !== undefined) {
                            rules.push(`lte:${props.maximumValue}`);
                        }
                        if (props.minimumValue !== null && props.minimumValue !== undefined) {
                            rules.push(`gte:${props.minimumValue}`);
                        }
                        return rules;
                    });
                    watch(() => props.modelValue, () => {
                        var _a;
                        if (props.modelValue !== internalNumberValue.value) {
                            internalValue.value = asFormattedString(props.modelValue, (_a = props.decimalCount) !== null && _a !== void 0 ? _a : undefined, { useGrouping: false });
                        }
                    });
                    watch(internalNumberValue, () => {
                        ctx.emit("update:modelValue", internalNumberValue.value);
                    });
                    return {
                        computedRules,
                        controlContainerClass,
                        internalStep,
                        internalValue
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-number-box"
    name="numberbox"
    :rules="computedRules">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div :class="controlContainerClass">
                <slot name="prepend" />
                <input
                    v-model="internalValue"
                    :id="uniqueId"
                    type="number"
                    class="form-control"
                    :class="inputClasses"
                    v-bind="field"
                    :placeholder="placeholder"
                    :step="internalStep"
                    :min="minimumValue"
                    :max="maximumValue" />
                <slot name="append" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
