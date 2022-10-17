System.register(['vue', '@Obsidian/Utility/component', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, computed, useVModelPassthrough, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var TextBox = exports('default', defineComponent({
                name: "TextBox",
                components: {
                    RockFormField
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
                setup(props, ctx) {
                    const internalValue = useVModelPassthrough(props, "modelValue", ctx.emit);
                    const isTextarea = computed(() => {
                        var _a;
                        return ((_a = props.textMode) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "multiline";
                    });
                    const charsRemaining = computed(() => {
                        return props.maxLength - internalValue.value.length;
                    });
                    const countdownClass = computed(() => {
                        if (charsRemaining.value >= 10) {
                            return "badge-default";
                        }
                        if (charsRemaining.value >= 0) {
                            return "badge-warning";
                        }
                        return "badge-danger";
                    });
                    const isInputGroup = computed(() => {
                        return !!ctx.slots.prepend || !!ctx.slots.append;
                    });
                    const controlContainerClass = computed(() => {
                        return isInputGroup.value ? "input-group" : "";
                    });
                    return {
                        controlContainerClass,
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
            <div :class="controlContainerClass">
                <slot name="prepend" />
                <textarea v-if="isTextarea" v-model="internalValue" :rows="rows" cols="20" :maxlength="maxLength" :id="uniqueId" class="form-control" v-bind="field"></textarea>
                <input v-else v-model="internalValue" :id="uniqueId" :type="type" class="form-control" :class="inputClasses" v-bind="field" :maxlength="maxLength" :placeholder="placeholder" />
                <slot name="append" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
