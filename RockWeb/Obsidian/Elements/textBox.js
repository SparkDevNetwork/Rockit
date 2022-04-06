System.register(["vue", "../Util/component", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, vue_2, component_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_2.defineComponent({
                name: "TextBox",
                components: {
                    RockFormField: rockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    type: {
                        type: String,
                        default: "text"
                    },
                    maxLength: {
                        type: Number,
                        default: 524288
                    },
                    showCountDown: {
                        type: Boolean,
                        default: false
                    },
                    placeholder: {
                        type: String,
                        default: ""
                    },
                    inputClasses: {
                        type: String,
                        default: ""
                    },
                    formGroupClasses: {
                        type: String,
                        default: ""
                    },
                    rows: {
                        type: Number,
                        default: 3
                    },
                    textMode: {
                        type: String,
                        default: ""
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const isTextarea = vue_1.computed(() => {
                        var _a;
                        return ((_a = props.textMode) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "multiline";
                    });
                    const charsRemaining = vue_1.computed(() => {
                        return props.maxLength - internalValue.value.length;
                    });
                    const countdownClass = vue_1.computed(() => {
                        if (charsRemaining.value >= 10) {
                            return "badge-default";
                        }
                        if (charsRemaining.value >= 0) {
                            return "badge-warning";
                        }
                        return "badge-danger";
                    });
                    return {
                        internalValue,
                        isTextarea,
                        charsRemaining,
                        countdownClass
                    };
                },
                template: `
<RockFormField
    v-model="internalValue"
    :formGroupClasses="'rock-text-box ' + formGroupClasses"
    name="textbox">
    <template #pre>
        <em v-if="showCountDown" class="pull-right badge" :class="countdownClass">
            {{charsRemaining}}
        </em>
    </template>
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <textarea v-if="isTextarea" v-model="internalValue" :rows="rows" cols="20" :maxlength="maxLength" :id="uniqueId" class="form-control" v-bind="field"></textarea>
            <input v-else v-model="internalValue" :id="uniqueId" :type="type" class="form-control" :class="inputClasses" v-bind="field" :maxlength="maxLength" :placeholder="placeholder" />
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=textBox.js.map