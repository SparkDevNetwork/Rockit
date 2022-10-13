System.register(['vue', '@Obsidian/Utility/numberUtils', './rockFormField.js', '@Obsidian/Utility/guid', './textBox.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, toNumber, RockFormField, newGuid, TextBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            TextBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const DatePickerBase = exports('DatePickerBase', defineComponent({
                name: "DatePickerBase",
                props: {
                    modelValue: {
                        type: String,
                        default: null
                    },
                    id: {
                        type: String,
                        default: ""
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: null,
                        defaultId: `datepicker-${newGuid()}`
                    };
                },
                computed: {
                    computedId() {
                        return this.id || this.defaultId;
                    },
                    asRockDateOrNull() {
                        var _a;
                        const match = /^(\d+)\/(\d+)\/(\d+)/.exec((_a = this.internalValue) !== null && _a !== void 0 ? _a : "");
                        if (match !== null) {
                            return `${match[3]}-${match[1]}-${match[2]}`;
                        }
                        else {
                            return null;
                        }
                    }
                },
                watch: {
                    asRockDateOrNull() {
                        this.$emit("update:modelValue", this.asRockDateOrNull);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (!this.modelValue) {
                                this.internalValue = null;
                                return;
                            }
                            const match = /^(\d+)-(\d+)-(\d+)/.exec(this.modelValue);
                            if (match !== null) {
                                this.internalValue = `${match[2]}/${match[3]}/${match[1]}`;
                            }
                            else {
                                this.internalValue = null;
                            }
                        }
                    }
                },
                mounted() {
                    const input = this.$refs["input"];
                    const inputId = input.id;
                    window.Rock.controls.datePicker.initialize({
                        id: inputId,
                        startView: 0,
                        showOnFocus: true,
                        format: "mm/dd/yyyy",
                        todayHighlight: true,
                        forceParse: true,
                        onChangeScript: () => {
                            this.internalValue = input.value;
                        }
                    });
                },
                template: `
<div class="input-group input-width-md js-date-picker date">
    <input ref="input" type="text" :id="computedId" class="form-control" v-model.lazy="internalValue" :disabled="isCurrent" />
    <span class="input-group-addon">
        <i class="fa fa-calendar"></i>
    </span>
</div>
`
            }));
            var DatePickerBase$1 = exports('default', defineComponent({
                name: "DatePicker",
                components: {
                    RockFormField,
                    DatePickerBase,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: String,
                        default: null
                    },
                    displayCurrentOption: {
                        type: Boolean,
                        default: false
                    },
                    isCurrentDateOffset: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalValue: null,
                        isCurrent: false,
                        currentDiff: "0"
                    };
                },
                computed: {
                    asCurrentDateValue() {
                        const plusMinus = `${toNumber(this.currentDiff)}`;
                        return `CURRENT:${plusMinus}`;
                    },
                    valueToEmit() {
                        if (this.isCurrent) {
                            return this.asCurrentDateValue;
                        }
                        return this.internalValue;
                    }
                },
                watch: {
                    isCurrentDateOffset: {
                        immediate: true,
                        handler() {
                            if (!this.isCurrentDateOffset) {
                                this.currentDiff = "0";
                            }
                        }
                    },
                    isCurrent: {
                        immediate: true,
                        handler() {
                            if (this.isCurrent) {
                                this.internalValue = "Current";
                            }
                            else {
                                this.internalValue = null;
                            }
                        }
                    },
                    valueToEmit() {
                        this.$emit("update:modelValue", this.valueToEmit);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (!this.modelValue) {
                                this.internalValue = null;
                                this.isCurrent = false;
                                this.currentDiff = "0";
                                return;
                            }
                            if (this.modelValue.indexOf("CURRENT") === 0) {
                                this.isCurrent = true;
                                const parts = this.modelValue.split(":");
                                if (parts.length === 2) {
                                    this.currentDiff = `${toNumber(parts[1])}`;
                                }
                                return;
                            }
                            this.internalValue = this.modelValue;
                        }
                    },
                    displayCurrentOption() {
                        if (!this.displayCurrentOption && this.isCurrent) {
                            this.internalValue = null;
                            this.isCurrent = false;
                            this.currentDiff = "0";
                        }
                    }
                },
                template: `
<RockFormField formGroupClasses="date-picker" #default="{uniqueId}" name="datepicker" v-model.lazy="internalValue">
    <div class="control-wrapper">
        <div v-if="displayCurrentOption" class="form-control-group">
            <div class="form-row">
                <DatePickerBase v-model.lazy="internalValue" :id="uniqueId" :disabled="isCurrent" />
                <div v-if="displayCurrentOption || isCurrent" class="input-group">
                    <div class="checkbox">
                        <label title="">
                        <input type="checkbox" v-model="isCurrent" />
                        <span class="label-text">Current Date</span></label>
                    </div>
                </div>
            </div>
            <div v-if="isCurrent && isCurrentDateOffset" class="form-row">
                <TextBox label="+- Days" v-model="currentDiff" inputClasses="input-width-md" help="Enter the number of days after the current date to use as the date. Use a negative number to specify days before." />
            </div>
        </div>
        <DatePickerBase v-else v-model.lazy="internalValue" :id="uniqueId" :disabled="isCurrent" />
    </div>
</RockFormField>`
            }));

        })
    };
}));
