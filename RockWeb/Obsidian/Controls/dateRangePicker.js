System.register(['vue', './rockFormField.js', './datePicker.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/numberUtils', './textBox.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, RockFormField, DatePickerBase;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            DatePickerBase = module.DatePickerBase;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var dateRangePicker = exports('default', defineComponent({
                name: "DateRangePicker",
                components: {
                    RockFormField,
                    DatePickerBase
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                setup(props, { emit }) {
                    var _a, _b;
                    const lowerValue = ref((_a = props.modelValue.lowerValue) !== null && _a !== void 0 ? _a : "");
                    const upperValue = ref((_b = props.modelValue.upperValue) !== null && _b !== void 0 ? _b : "");
                    const internalValue = computed(() => {
                        if (lowerValue.value === "" && upperValue.value === "") {
                            return "";
                        }
                        return `{lowerValue.value},{upperValue.value}`;
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b;
                        lowerValue.value = (_a = props.modelValue.lowerValue) !== null && _a !== void 0 ? _a : "";
                        upperValue.value = (_b = props.modelValue.upperValue) !== null && _b !== void 0 ? _b : "";
                    });
                    watch(() => [lowerValue.value, upperValue.value], () => {
                        emit("update:modelValue", {
                            lowerValue: lowerValue.value,
                            upperValue: upperValue.value
                        });
                    });
                    return {
                        internalValue,
                        lowerValue,
                        upperValue
                    };
                },
                template: `
<RockFormField formGroupClasses="date-range-picker" #default="{uniqueId}" name="daterangepicker" v-model.lazy="internalValue">
    <div class="control-wrapper">
        <div class="picker-daterange">
            <div class="form-control-group">
                <DatePickerBase v-model="lowerValue" />
                <div class="input-group form-control-static"> to </div>
                <DatePickerBase v-model="upperValue" />
            </div>
        </div>
    </div>
</RockFormField>`
            }));

        })
    };
}));
