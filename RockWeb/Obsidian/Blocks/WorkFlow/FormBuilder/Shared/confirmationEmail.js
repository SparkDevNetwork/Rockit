System.register(['vue', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/inlineSwitch', '@Obsidian/Controls/transitionVerticalCollapse', './emailSource.js', '@Obsidian/Controls/sectionContainer', '@Obsidian/Controls/inlineCheckBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', './segmentedPicker.js', '@Obsidian/Utility/component'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, DropDownList, InlineSwitch, TransitionVerticalCollapse, EmailSource, SectionContainer;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            InlineSwitch = module["default"];
        }, function (module) {
            TransitionVerticalCollapse = module["default"];
        }, function (module) {
            EmailSource = module["default"];
        }, function (module) {
            SectionContainer = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var confirmationEmail = exports('default', defineComponent({
                name: "Workflow.FormBuilderDetail.ConfirmationEmail",
                components: {
                    DropDownList,
                    EmailSource,
                    InlineSwitch,
                    SectionContainer,
                    TransitionVerticalCollapse
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    recipientOptions: {
                        type: Array,
                        default: []
                    },
                    sourceTemplateOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c;
                    const enabled = ref((_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false);
                    const recipientAttributeGuid = ref((_b = props.modelValue.recipientAttributeGuid) !== null && _b !== void 0 ? _b : null);
                    const source = ref((_c = props.modelValue.source) !== null && _c !== void 0 ? _c : {});
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        enabled.value = (_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false;
                        recipientAttributeGuid.value = (_b = props.modelValue.recipientAttributeGuid) !== null && _b !== void 0 ? _b : null;
                        source.value = (_c = props.modelValue.source) !== null && _c !== void 0 ? _c : {};
                    });
                    watch([enabled, recipientAttributeGuid, source], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { enabled: enabled.value, recipientAttributeGuid: recipientAttributeGuid.value, source: source.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        enabled,
                        recipientAttributeGuid,
                        source
                    };
                },
                template: `
<SectionContainer v-model="enabled"
    toggleText="Enable"
    title="Confirmation Email"
    description="The following settings will be used to send an email to the individual who submitted the form.">
    <div class="row">
        <div class="col-md-4">
            <DropDownList v-model="recipientAttributeGuid"
                label="Recipient"
                rules="required"
                :items="recipientOptions" />
        </div>
    </div>

    <div class="mt-3">
        <EmailSource v-model="source" :templateOptions="sourceTemplateOptions" />
    </div>
</SectionContainer>
`
            }));

        })
    };
}));
