System.register(['vue', '@Obsidian/Utility/numberUtils', './rockFormField.js', './textBox.js', './basicTimePicker.js', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/rockDateTime', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, toNumber, RockFormField, TextBox, BasicTimePicker, padLeft, RockDateTime;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            BasicTimePicker = module["default"];
        }, function (module) {
            padLeft = module.padLeft;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var dateTimePicker = exports('default', defineComponent({
                name: "DateTimePicker",
                components: {
                    RockFormField,
                    BasicTimePicker,
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
                        internalDateValue: null,
                        internalTimeValue: {},
                        isCurrent: false,
                        currentDiff: "0",
                        validationValue: "",
                        skipEmit: false
                    };
                },
                computed: {
                    asRockDateTimeOrNull() {
                        var _a;
                        if (this.internalDateValue) {
                            const dateMatch = /^(\d+)\/(\d+)\/(\d+)/.exec((_a = this.internalDateValue) !== null && _a !== void 0 ? _a : "");
                            if (dateMatch === null) {
                                return null;
                            }
                            let date = RockDateTime.fromParts(toNumber(dateMatch[3]), toNumber(dateMatch[1]), toNumber(dateMatch[2]));
                            if (date === null) {
                                return null;
                            }
                            if (this.internalTimeValue.hour !== undefined && this.internalTimeValue.minute !== undefined) {
                                date = date === null || date === void 0 ? void 0 : date.addHours(this.internalTimeValue.hour).addMinutes(this.internalTimeValue.minute);
                            }
                            const year = date.year.toString();
                            const month = padLeft(date.month.toString(), 2, "0");
                            const day = padLeft(date.day.toString(), 2, "0");
                            const hour = padLeft(date.hour.toString(), 2, "0");
                            const minute = padLeft(date.minute.toString(), 2, "0");
                            const second = padLeft(date.second.toString(), 2, "0");
                            const millisecond = padLeft(date.millisecond.toString(), 3, "0");
                            return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`;
                        }
                        else {
                            return null;
                        }
                    },
                    asCurrentDateValue() {
                        const plusMinus = `${toNumber(this.currentDiff)}`;
                        return `CURRENT:${plusMinus}`;
                    },
                    valueToEmit() {
                        var _a;
                        if (this.isCurrent) {
                            return this.asCurrentDateValue;
                        }
                        return (_a = this.asRockDateTimeOrNull) !== null && _a !== void 0 ? _a : "";
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
                    valueToEmit() {
                        if (!this.skipEmit) {
                            this.$emit("update:modelValue", this.valueToEmit);
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (!this.modelValue) {
                                this.internalDateValue = null;
                                this.internalTimeValue = {};
                                this.isCurrent = false;
                                this.currentDiff = "0";
                                return;
                            }
                            if (this.modelValue.indexOf("CURRENT") === 0) {
                                const parts = this.modelValue.split(":");
                                if (parts.length === 2) {
                                    this.currentDiff = `${toNumber(parts[1])}`;
                                }
                                this.isCurrent = true;
                                return;
                            }
                            const date = RockDateTime.parseISO(this.modelValue);
                            this.skipEmit = true;
                            if (date === null) {
                                this.internalDateValue = null;
                                this.internalTimeValue = {};
                            }
                            else {
                                this.internalDateValue = `${date.month}/${date.day}/${date.year}`;
                                this.internalTimeValue = {
                                    hour: date.hour,
                                    minute: date.minute
                                };
                            }
                            this.skipEmit = false;
                        }
                    },
                    displayCurrentOption() {
                        if (!this.displayCurrentOption && this.isCurrent) {
                            this.internalDateValue = null;
                            this.internalTimeValue = {};
                            this.isCurrent = false;
                            this.currentDiff = "0";
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
                            if (!this.isCurrent) {
                                this.internalDateValue = input.value;
                            }
                        }
                    });
                },
                template: `
<RockFormField formGroupClasses="date-picker" #default="{uniqueId}" name="datepicker" v-model.lazy="internalDateValue">
    <div class="control-wrapper">
        <div class="form-control-group">
            <div class="form-row">
                <div class="input-group input-width-md js-date-picker date">
                    <input ref="input" type="text" :id="uniqueId" class="form-control" v-model.lazy="internalDateValue" :disabled="isCurrent" />
                    <span class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </span>
                </div>
                <BasicTimePicker v-model="internalTimeValue" :disabled="isCurrent" />
                <div v-if="displayCurrentOption" class="input-group">
                    <div class="checkbox">
                        <label title="">
                        <input type="checkbox" v-model="isCurrent" />
                        <span class="label-text">Current Time</span></label>
                    </div>
                </div>
            </div>
            <div v-if="isCurrent && isCurrentDateOffset" class="form-row">
                <TextBox label="+- Minutes" v-model="currentDiff" inputClasses="input-width-md" help="Enter the number of minutes after the current time to use as the date. Use a negative number to specify minutes before." />
            </div>
        </div>
    </div>
</RockFormField>`
            }));

        })
    };
}));
