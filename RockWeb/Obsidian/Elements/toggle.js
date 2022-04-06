System.register(["vue", "./javaScriptAnchor", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, javaScriptAnchor_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (javaScriptAnchor_1_1) {
                javaScriptAnchor_1 = javaScriptAnchor_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Toggle",
                components: {
                    JavaScriptAnchor: javaScriptAnchor_1.default,
                    RockFormField: rockFormField_1.default
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
                    const getButtonGroupClass = vue_1.computed(() => {
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
        }
    };
});
//# sourceMappingURL=toggle.js.map