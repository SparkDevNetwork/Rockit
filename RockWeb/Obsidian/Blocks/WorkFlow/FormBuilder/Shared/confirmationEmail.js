System.register(["vue", "../../../../Elements/dropDownList", "../../../../Elements/inlineSwitch", "../../../../Elements/transitionVerticalCollapse", "./emailSource", "./settingsWell"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, inlineSwitch_1, transitionVerticalCollapse_1, emailSource_1, settingsWell_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (inlineSwitch_1_1) {
                inlineSwitch_1 = inlineSwitch_1_1;
            },
            function (transitionVerticalCollapse_1_1) {
                transitionVerticalCollapse_1 = transitionVerticalCollapse_1_1;
            },
            function (emailSource_1_1) {
                emailSource_1 = emailSource_1_1;
            },
            function (settingsWell_1_1) {
                settingsWell_1 = settingsWell_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.ConfirmationEmail",
                components: {
                    DropDownList: dropDownList_1.default,
                    EmailSource: emailSource_1.default,
                    InlineSwitch: inlineSwitch_1.default,
                    SettingsWell: settingsWell_1.default,
                    TransitionVerticalCollapse: transitionVerticalCollapse_1.default
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
                    const enabled = vue_1.ref((_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false);
                    const recipientAttributeGuid = vue_1.ref((_b = props.modelValue.recipientAttributeGuid) !== null && _b !== void 0 ? _b : null);
                    const source = vue_1.ref((_c = props.modelValue.source) !== null && _c !== void 0 ? _c : {});
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        enabled.value = (_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false;
                        recipientAttributeGuid.value = (_b = props.modelValue.recipientAttributeGuid) !== null && _b !== void 0 ? _b : null;
                        source.value = (_c = props.modelValue.source) !== null && _c !== void 0 ? _c : {};
                    });
                    vue_1.watch([enabled, recipientAttributeGuid, source], () => {
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
<SettingsWell v-model="enabled"
    hasEnable
    title="Confirmation Email"
    description="The following settings will be used to send an email to the individual who submitted the form.">
    <div class="row">
        <div class="col-md-4">
            <DropDownList v-model="recipientAttributeGuid"
                label="Recipient"
                rules="required"
                :options="recipientOptions" />
        </div>
    </div>

    <div class="mt-3">
        <EmailSource v-model="source" :templateOptions="sourceTemplateOptions" />
    </div>
</Settingswell>
`
            }));
        }
    };
});
//# sourceMappingURL=confirmationEmail.js.map