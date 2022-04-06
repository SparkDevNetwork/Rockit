System.register(["vue", "../../../../Elements/dropDownList", "../../../../Elements/textBox", "../../../../Services/number", "../../../../Util/component", "./segmentedPicker", "./settingsWell"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, textBox_1, number_1, component_1, segmentedPicker_1, settingsWell_1, typeOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (segmentedPicker_1_1) {
                segmentedPicker_1 = segmentedPicker_1_1;
            },
            function (settingsWell_1_1) {
                settingsWell_1 = settingsWell_1_1;
            }
        ],
        execute: function () {
            typeOptions = [
                {
                    value: 0..toString(),
                    text: "Display Message"
                },
                {
                    value: 1..toString(),
                    text: "Redirect to New Page"
                }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.CompletionSettings",
                components: {
                    DropDownList: dropDownList_1.default,
                    SegmentedPicker: segmentedPicker_1.default,
                    SettingsWell: settingsWell_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    enabled: {
                        type: Boolean,
                        default: true
                    },
                    hasEnable: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:enabled"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const enabled = component_1.useVModelPassthrough(props, "enabled", emit);
                    const type = vue_1.ref((_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString());
                    const message = vue_1.ref((_c = props.modelValue.message) !== null && _c !== void 0 ? _c : "");
                    const redirectUrl = vue_1.ref((_d = props.modelValue.redirectUrl) !== null && _d !== void 0 ? _d : "");
                    const isTypeDisplayMessage = vue_1.computed(() => type.value === 0..toString());
                    const isTypeRedirect = vue_1.computed(() => type.value === 1..toString());
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d;
                        type.value = (_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString();
                        message.value = (_c = props.modelValue.message) !== null && _c !== void 0 ? _c : "";
                        redirectUrl.value = (_d = props.modelValue.redirectUrl) !== null && _d !== void 0 ? _d : "";
                    });
                    vue_1.watch([type, message, redirectUrl], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { type: (_a = number_1.toNumberOrNull(type.value)) !== null && _a !== void 0 ? _a : 0, message: message.value, redirectUrl: redirectUrl.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        enabled,
                        isTypeDisplayMessage,
                        isTypeRedirect,
                        message,
                        redirectUrl,
                        type,
                        typeOptions
                    };
                },
                template: `
<SettingsWell v-model="enabled"
    title="Completion Settings"
    description="The settings below determine the actions to take after an individual completes the form."
    :hasEnable="hasEnable">
    <SegmentedPicker v-model="type"
        :options="typeOptions" />

    <div v-if="isTypeDisplayMessage">
        <TextBox v-model="message"
            label="Completion Message"
            textMode="multiline"
            rules="required" />
    </div>

    <div v-else-if="isTypeRedirect">
        <TextBox v-model="redirectUrl"
            label="Redirect URL"
            rules="required" />
    </div>
</Settingswell>
`
            }));
        }
    };
});
//# sourceMappingURL=completionSettings.js.map