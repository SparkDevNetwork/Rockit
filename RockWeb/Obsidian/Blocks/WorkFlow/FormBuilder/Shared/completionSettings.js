System.register(['vue', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/component', './segmentedPicker.js', '@Obsidian/Controls/sectionContainer'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, DropDownList, TextBox, toNumberOrNull, useVModelPassthrough, SegmentedPicker, SectionContainer;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            SegmentedPicker = module["default"];
        }, function (module) {
            SectionContainer = module["default"];
        }],
        execute: (function () {

            const typeOptions = [
                {
                    value: 0..toString(),
                    text: "Display Message"
                },
                {
                    value: 1..toString(),
                    text: "Redirect to New Page"
                }
            ];
            var completionSettings = exports('default', defineComponent({
                name: "Workflow.FormBuilderDetail.CompletionSettings",
                components: {
                    DropDownList,
                    SegmentedPicker,
                    SectionContainer,
                    TextBox
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
                    const enabled = useVModelPassthrough(props, "enabled", emit);
                    const type = ref((_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString());
                    const message = ref((_c = props.modelValue.message) !== null && _c !== void 0 ? _c : "");
                    const redirectUrl = ref((_d = props.modelValue.redirectUrl) !== null && _d !== void 0 ? _d : "");
                    const isTypeDisplayMessage = computed(() => type.value === 0..toString());
                    const isTypeRedirect = computed(() => type.value === 1..toString());
                    const sectionToggleText = computed(() => props.hasEnable ? "Enable" : "");
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d;
                        type.value = (_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString();
                        message.value = (_c = props.modelValue.message) !== null && _c !== void 0 ? _c : "";
                        redirectUrl.value = (_d = props.modelValue.redirectUrl) !== null && _d !== void 0 ? _d : "";
                    });
                    watch([type, message, redirectUrl], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { type: (_a = toNumberOrNull(type.value)) !== null && _a !== void 0 ? _a : 0, message: message.value, redirectUrl: redirectUrl.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        enabled,
                        isTypeDisplayMessage,
                        isTypeRedirect,
                        message,
                        redirectUrl,
                        sectionToggleText,
                        type,
                        typeOptions
                    };
                },
                template: `
<SectionContainer v-model="enabled"
    title="Completion Settings"
    description="The settings below determine the actions to take after an individual completes the form."
    :toggleText="sectionToggleText">
    <SegmentedPicker v-model="type"
        :items="typeOptions" />

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
</SectionContainer>
`
            }));

        })
    };
}));
