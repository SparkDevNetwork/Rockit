System.register(['vue', './javaScriptAnchor.js', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js'], (function (exports) {
    'use strict';
    var defineComponent, computed, JavaScriptAnchor, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }, function (module) {
            JavaScriptAnchor = module["default"];
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var toggle = exports('default', defineComponent({
                name: "Toggle",
                components: {
                    JavaScriptAnchor,
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Boolean,
                        required: true
                    },
                    trueText: {
                        type: String,
                        default: "On"
                    },
                    falseText: {
                        type: String,
                        default: "Off"
                    },
                    btnSize: {
                        type: String,
                        default: ""
                    }
                },
                setup(props, { emit }) {
                    const getButtonGroupClass = computed(() => {
                        const classes = ["btn-group", "btn-toggle"];
                        if (props.btnSize) {
                            classes.push(`btn-group-${props.btnSize}`);
                        }
                        return classes;
                    });
                    const onClick = (isOn) => {
                        if (isOn !== props.modelValue) {
                            emit("update:modelValue", isOn);
                        }
                    };
                    return {
                        getButtonGroupClass,
                        onClick,
                        selectedClasses: "active btn btn-primary",
                        unselectedClasses: "btn btn-default"
                    };
                },
                template: `
<RockFormField
    :modelValue="modelValue"
    formGroupClasses="toggle"
    name="toggle">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="toggle-container">
                <div :class="getButtonGroupClass">
                    <JavaScriptAnchor :class="modelValue ? unselectedClasses : selectedClasses" @click="onClick(false)">
                        <slot name="off">{{falseText}}</slot>
                    </JavaScriptAnchor>
                    <JavaScriptAnchor :class="modelValue ? selectedClasses : unselectedClasses" @click="onClick(true)">
                        <slot name="on">{{trueText}}</slot>
                    </JavaScriptAnchor>
                </div>
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
