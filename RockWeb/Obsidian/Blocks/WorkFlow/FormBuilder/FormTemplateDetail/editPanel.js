System.register(["vue", "../../../../Controls/panel", "../../../../Controls/rockForm", "../../../../Elements/auditDetail", "../../../../Elements/checkBox", "../../../../Elements/rockButton", "../../../../Elements/textBox", "../../../../Util/util", "../Shared/completionSettings", "../Shared/confirmationEmail", "../Shared/personEntrySettings", "../Shared/settingsWell", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, panel_1, rockForm_1, auditDetail_1, checkBox_1, rockButton_1, textBox_1, util_1, completionSettings_1, confirmationEmail_1, personEntrySettings_1, settingsWell_1, utils_1, recipientOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (auditDetail_1_1) {
                auditDetail_1 = auditDetail_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (completionSettings_1_1) {
                completionSettings_1 = completionSettings_1_1;
            },
            function (confirmationEmail_1_1) {
                confirmationEmail_1 = confirmationEmail_1_1;
            },
            function (personEntrySettings_1_1) {
                personEntrySettings_1 = personEntrySettings_1_1;
            },
            function (settingsWell_1_1) {
                settingsWell_1 = settingsWell_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            recipientOptions = [
                {
                    value: "00000000-0000-0000-0000-000000000001",
                    text: "Person"
                },
                {
                    value: "00000000-0000-0000-0000-000000000002",
                    text: "Spouse"
                }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormTemplateDetail",
                components: {
                    AuditDetail: auditDetail_1.default,
                    CheckBox: checkBox_1.default,
                    CompletionSettings: completionSettings_1.default,
                    ConfirmationEmail: confirmationEmail_1.default,
                    Panel: panel_1.default,
                    PersonEntrySettings: personEntrySettings_1.default,
                    RockButton: rockButton_1.default,
                    RockForm: rockForm_1.default,
                    SettingsWell: settingsWell_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const sources = utils_1.useSources();
                    const name = vue_1.ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = vue_1.ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const isActive = vue_1.ref((_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : true);
                    const isLoginRequired = vue_1.ref((_d = props.modelValue.isLoginRequired) !== null && _d !== void 0 ? _d : false);
                    const formHeader = vue_1.ref((_e = props.modelValue.formHeader) !== null && _e !== void 0 ? _e : "");
                    const formFooter = vue_1.ref((_f = props.modelValue.formFooter) !== null && _f !== void 0 ? _f : "");
                    const allowPersonEntry = vue_1.ref((_g = props.modelValue.allowPersonEntry) !== null && _g !== void 0 ? _g : false);
                    const personEntry = vue_1.ref((_h = props.modelValue.personEntry) !== null && _h !== void 0 ? _h : {});
                    const confirmationEmail = vue_1.ref((_j = props.modelValue.confirmationEmail) !== null && _j !== void 0 ? _j : {});
                    const internalCompletionAction = vue_1.ref(props.modelValue.completionAction);
                    const completionAction = vue_1.computed({
                        get() {
                            var _a;
                            return (_a = internalCompletionAction.value) !== null && _a !== void 0 ? _a : {};
                        },
                        set(value) {
                            if (completionActionEnabled.value) {
                                util_1.updateRefValue(internalCompletionAction, value);
                            }
                        }
                    });
                    const completionActionEnabled = vue_1.computed({
                        get() {
                            return !!internalCompletionAction.value;
                        },
                        set(value) {
                            util_1.updateRefValue(internalCompletionAction, value ? {} : null);
                        }
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        util_1.updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        util_1.updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        util_1.updateRefValue(isActive, (_c = props.modelValue.isActive) !== null && _c !== void 0 ? _c : true);
                        util_1.updateRefValue(isLoginRequired, (_d = props.modelValue.isLoginRequired) !== null && _d !== void 0 ? _d : false);
                        util_1.updateRefValue(formHeader, (_e = props.modelValue.formHeader) !== null && _e !== void 0 ? _e : "");
                        util_1.updateRefValue(formFooter, (_f = props.modelValue.formFooter) !== null && _f !== void 0 ? _f : "");
                        util_1.updateRefValue(allowPersonEntry, (_g = props.modelValue.allowPersonEntry) !== null && _g !== void 0 ? _g : false);
                        util_1.updateRefValue(personEntry, (_h = props.modelValue.personEntry) !== null && _h !== void 0 ? _h : {});
                        util_1.updateRefValue(confirmationEmail, (_j = props.modelValue.confirmationEmail) !== null && _j !== void 0 ? _j : {});
                        util_1.updateRefValue(internalCompletionAction, props.modelValue.completionAction);
                    });
                    vue_1.watch([name, description, isActive, isLoginRequired, formHeader, formFooter, allowPersonEntry, personEntry, confirmationEmail, internalCompletionAction], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: name.value, description: description.value, isActive: isActive.value, isLoginRequired: isLoginRequired.value, formHeader: formHeader.value, formFooter: formFooter.value, allowPersonEntry: allowPersonEntry.value, personEntry: personEntry.value, confirmationEmail: confirmationEmail.value, completionAction: internalCompletionAction.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        addressTypeOptions: sources.addressTypeOptions,
                        allowPersonEntry,
                        campusStatusOptions: sources.campusStatusOptions,
                        campusTypeOptions: sources.campusTypeOptions,
                        completionAction,
                        completionActionEnabled,
                        confirmationEmail,
                        connectionStatusOptions: sources.connectionStatusOptions,
                        description,
                        formFooter,
                        formHeader,
                        isActive,
                        isLoginRequired,
                        name,
                        personEntry,
                        recipientOptions,
                        recordStatusOptions: sources.recordStatusOptions,
                        sourceTemplateOptions: sources.emailTemplateOptions
                    };
                },
                template: `
<div>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="name"
                label="Name"
                rules="required" />
        </div>

        <div class="col-md-6">
            <CheckBox v-model="isActive"
                label="Active" />
        </div>
    </div>

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <CheckBox v-model="isLoginRequired"
        label="Is Login Required"
        help="Determines if a person needs to be logged in to complete this form." />

    <SettingsWell title="Form Headers and Footers"
        description="The headers and footers below will be displayed on all pages of the forms that use this template.">
        <TextBox v-model="formHeader"
            label="Form Header"
            textMode="multiline" />

        <TextBox v-model="formFooter"
            label="Form Footer"
            textMode="multiline" />
    </SettingsWell>

    <SettingsWell v-model="allowPersonEntry"
        hasEnable
        title="Person Entry Settings"
        description="These settings will lock the forms person entry settings.">
        <PersonEntrySettings v-model="personEntry"
            :recordStatusOptions="recordStatusOptions"
            :connectionStatusOptions="connectionStatusOptions"
            :campusTypeOptions="campusTypeOptions"
            :campusStatusOptions="campusStatusOptions"
            :addressTypeOptions="addressTypeOptions" />
    </SettingsWell>

    <ConfirmationEmail v-model="confirmationEmail"
        :recipientOptions="recipientOptions"
        :sourceTemplateOptions="sourceTemplateOptions" />

    <CompletionSettings v-model="completionAction" v-model:enabled="completionActionEnabled" hasEnable />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=editPanel.js.map