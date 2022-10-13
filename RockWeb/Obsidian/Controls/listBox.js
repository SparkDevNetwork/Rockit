System.register(['vue', '@Obsidian/Utility/guid', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, newGuid, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var listBox = exports('default', defineComponent({
                name: "ListBox",
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
                        default: []
                    },
                    formControlClasses: {
                        type: String,
                        default: ""
                    },
                    enhanceForLongLists: {
                        type: Boolean,
                        default: false
                    }
                },
                data: function () {
                    return {
                        uniqueId: `rock-listbox-${newGuid()}`,
                        internalValue: [],
                        isMounted: false
                    };
                },
                computed: {
                    compiledFormControlClasses() {
                        if (this.enhanceForLongLists) {
                            return this.formControlClasses + " chosen-select";
                        }
                        return this.formControlClasses;
                    }
                },
                methods: {
                    getChosenJqueryEl() {
                        const jquery = window["$"];
                        let $chosenDropDown = jquery(this.$refs["theSelect"]);
                        if (!$chosenDropDown || !$chosenDropDown.length) {
                            $chosenDropDown = jquery(`#${this.uniqueId}`);
                        }
                        return $chosenDropDown;
                    },
                    createOrDestroyChosen() {
                        if (!this.isMounted) {
                            return;
                        }
                        const $chosenDropDown = this.getChosenJqueryEl();
                        if (this.enhanceForLongLists) {
                            $chosenDropDown
                                .chosen({
                                width: "100%",
                                placeholder_text_multiple: " ",
                                placeholder_text_single: " "
                            })
                                .change(() => {
                                this.internalValue = $chosenDropDown.val();
                            });
                        }
                        else {
                            $chosenDropDown.chosen("destroy");
                        }
                    },
                    syncValue() {
                        if (this.internalValue.length === this.modelValue.length && this.internalValue.every((v, i) => v === this.modelValue[i])) {
                            return;
                        }
                        this.internalValue = this.modelValue;
                        if (this.enhanceForLongLists) {
                            this.$nextTick(() => {
                                const $chosenDropDown = this.getChosenJqueryEl();
                                $chosenDropDown.trigger("chosen:updated");
                            });
                        }
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.syncValue();
                        }
                    },
                    items: {
                        immediate: true,
                        handler() {
                            this.syncValue();
                        }
                    },
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    enhanceForLongLists() {
                        this.createOrDestroyChosen();
                    }
                },
                mounted() {
                    this.isMounted = true;
                    this.createOrDestroyChosen();
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-drop-down-list"
    name="dropdownlist">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <select :id="uniqueId" class="form-control" :class="compiledFormControlClasses" v-bind="field" v-model="internalValue" ref="theSelect" multiple>
                <option v-if="showBlankItem" :value="blankValue"></option>
                <option v-for="item in items" :key="item.value" :value="item.value">{{item.text}}</option>
            </select>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
