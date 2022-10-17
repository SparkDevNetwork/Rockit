System.register(['vue', './utils.js', '@Obsidian/Utility/numberUtils', '@Obsidian/Controls/rating', '@Obsidian/Controls/numberBox', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/fieldFilterContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, getFieldEditorProps, getFieldConfigurationProps, toNumberOrNull, Rating, NumberBox;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            Rating = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const EditComponent = exports('EditComponent', defineComponent({
                name: "RatingField.Edit",
                components: {
                    Rating
                },
                props: getFieldEditorProps(),
                data() {
                    return {
                        internalValue: 0
                    };
                },
                computed: {
                    maxRating() {
                        const maxRatingConfig = this.configurationValues["max"];
                        return toNumberOrNull(maxRatingConfig) || 5;
                    },
                },
                watch: {
                    internalValue() {
                        const ratingValue = {
                            value: this.internalValue,
                            maxValue: this.maxRating
                        };
                        this.$emit("update:modelValue", JSON.stringify(ratingValue));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a, _b;
                            try {
                                const ratingValue = JSON.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                                this.internalValue = (_b = ratingValue.value) !== null && _b !== void 0 ? _b : 0;
                            }
                            catch (_c) {
                                this.internalValue = 0;
                            }
                        }
                    }
                },
                template: `
<Rating v-model="internalValue" :maxRating="maxRating" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "TextField.Configuration",
                components: {
                    NumberBox
                },
                props: getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const maxRating = ref(null);
                    const maybeUpdateModelValue = () => {
                        var _a, _b, _c;
                        const newValue = {};
                        newValue["max"] = (_b = (_a = maxRating.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                        const anyValueChanged = newValue["max"] !== ((_c = props.modelValue["max"]) !== null && _c !== void 0 ? _c : "");
                        if (anyValueChanged) {
                            emit("update:modelValue", newValue);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    const maybeUpdateConfiguration = (key, value) => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfigurationValue", key, value);
                        }
                    };
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        maxRating.value = toNumberOrNull(props.modelValue["max"]);
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(maxRating, () => { var _a, _b; return maybeUpdateConfiguration("max", (_b = (_a = maxRating.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
                    return {
                        maxRating
                    };
                },
                template: `
<div>
    <NumberBox v-model="maxRating" label="Max Rating" help="The number of stars (max rating) that should be displayed" />
</div>
`
            }));

        })
    };
}));
