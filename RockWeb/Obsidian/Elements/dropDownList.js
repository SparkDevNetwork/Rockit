System.register(["vue", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "DropDownList",
                components: {
                    RockFormField: rockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    options: {
                        type: Array,
                        default: []
                    },
                    showBlankItem: {
                        type: Boolean,
                        default: true
                    },
                    blankValue: {
                        type: String,
                        default: ""
                    },
                    formGroupClasses: {
                        type: String,
                        default: ""
                    },
                    formControlClasses: {
                        type: String,
                        default: ""
                    },
                    enhanceForLongLists: {
                        type: Boolean,
                        default: false
                    },
                    grouped: {
                        type: Boolean,
                        default: false
                    }
                },
                setup(props, { emit }) {
                    let isMounted = false;
                    const internalValue = vue_1.ref(props.modelValue);
                    const theSelect = vue_1.ref(null);
                    const compiledFormControlClasses = vue_1.computed(() => {
                        if (props.enhanceForLongLists) {
                            return props.formControlClasses + " chosen-select";
                        }
                        return props.formControlClasses;
                    });
                    const optionsWithoutGroup = vue_1.computed(() => {
                        return props.options
                            .filter(o => !o.category);
                    });
                    const optionGroups = vue_1.computed(() => {
                        const groups = [];
                        for (const o of props.options) {
                            if (!o.category) {
                                continue;
                            }
                            const matchedGroups = groups.filter(g => g.text == o.category);
                            if (matchedGroups.length >= 1) {
                                matchedGroups[0].options.push(o);
                            }
                            else {
                                groups.push({
                                    text: o.category,
                                    options: [o]
                                });
                            }
                        }
                        return groups;
                    });
                    const getChosenJqueryEl = () => {
                        const jquery = window["$"];
                        const $chosenDropDown = jquery(theSelect.value);
                        if (!$chosenDropDown || !$chosenDropDown.length) {
                            return undefined;
                        }
                        return $chosenDropDown;
                    };
                    const createOrDestroyChosen = () => {
                        if (!isMounted) {
                            return;
                        }
                        const $chosenDropDown = getChosenJqueryEl();
                        if (props.enhanceForLongLists) {
                            $chosenDropDown
                                .chosen({
                                width: "100%",
                                allow_single_deselect: true,
                                placeholder_text_multiple: " ",
                                placeholder_text_single: " "
                            })
                                .change((ev) => {
                                internalValue.value = ev.target.value;
                            });
                        }
                        else {
                            $chosenDropDown.chosen("destroy");
                        }
                    };
                    const syncInternalValue = () => {
                        var _a;
                        internalValue.value = props.modelValue;
                        const selectedOption = props.options.find(o => o.value === internalValue.value) || null;
                        if (!selectedOption) {
                            internalValue.value = props.showBlankItem ?
                                props.blankValue :
                                (((_a = props.options[0]) === null || _a === void 0 ? void 0 : _a.value) || props.blankValue);
                        }
                        if (props.enhanceForLongLists) {
                            vue_1.nextTick(() => {
                                const $chosenDropDown = getChosenJqueryEl();
                                $chosenDropDown.trigger("chosen:updated");
                            });
                        }
                    };
                    vue_1.watch(() => props.modelValue, () => syncInternalValue());
                    vue_1.watch(() => props.options, () => syncInternalValue());
                    vue_1.watch(() => props.enhanceForLongLists, () => createOrDestroyChosen());
                    vue_1.watch(internalValue, () => {
                        if (props.modelValue !== internalValue.value) {
                            emit("update:modelValue", internalValue.value);
                        }
                    });
                    vue_1.onMounted(() => {
                        isMounted = true;
                        createOrDestroyChosen();
                        if (props.modelValue !== internalValue.value) {
                            emit("update:modelValue", internalValue.value);
                        }
                    });
                    syncInternalValue();
                    return {
                        compiledFormControlClasses,
                        internalValue,
                        optionGroups,
                        optionsWithoutGroup,
                        theSelect
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    :formGroupClasses="'rock-drop-down-list ' + formGroupClasses"
    name="dropdownlist">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <select :id="uniqueId" class="form-control" :class="compiledFormControlClasses" v-bind="field" v-model="internalValue" ref="theSelect">
                <option v-if="showBlankItem" :value="blankValue"></option>

                <template v-if="grouped">
                    <option v-for="o in optionsWithoutGroup" :key="o.value" :value="o.value">{{o.text}}</option>
                    <optgroup v-for="g in optionGroups" :key="g.text" :label="g.text">
                        <option v-for="o in g.options" :key="o.value" :value="o.value">{{o.text}}</option>
                    </optgroup>
                </template>

                <option v-else v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
            </select>
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=dropDownList.js.map