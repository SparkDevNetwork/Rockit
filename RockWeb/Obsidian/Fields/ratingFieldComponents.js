System.register(["vue", "./utils", "../Services/number", "../Elements/rating", "../Elements/numberBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, utils_1, number_1, rating_1, numberBox_1, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (rating_1_1) {
                rating_1 = rating_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "RatingField.Edit",
                components: {
                    Rating: rating_1.default
                },
                props: utils_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: 0
                    };
                },
                computed: {
                    maxRating() {
                        const maxRatingConfig = this.configurationValues["max"];
                        return number_1.toNumberOrNull(maxRatingConfig) || 5;
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
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "TextField.Configuration",
                components: {
                    NumberBox: numberBox_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: [
                    "update:modelValue",
                    "updateConfiguration",
                    "updateConfigurationValue"
                ],
                setup(props, { emit }) {
                    const maxRating = vue_1.ref(null);
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
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        maxRating.value = number_1.toNumberOrNull(props.modelValue["max"]);
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(maxRating, () => { var _a, _b; return maybeUpdateConfiguration("max", (_b = (_a = maxRating.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""); });
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
        }
    };
});
//# sourceMappingURL=ratingFieldComponents.js.map