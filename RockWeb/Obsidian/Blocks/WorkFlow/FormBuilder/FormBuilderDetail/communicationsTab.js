System.register(["vue", "../../../../Controls/rockForm", "../../../../Elements/alert", "../Shared/confirmationEmail", "./notificationEmail", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, vue_2, rockForm_1, alert_1, confirmationEmail_1, notificationEmail_1, utils_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (confirmationEmail_1_1) {
                confirmationEmail_1 = confirmationEmail_1_1;
            },
            function (notificationEmail_1_1) {
                notificationEmail_1 = notificationEmail_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_2.defineComponent({
                name: "Workflow.FormBuilderDetail.CommunicationsTab",
                components: {
                    Alert: alert_1.default,
                    ConfirmationEmail: confirmationEmail_1.default,
                    NotificationEmail: notificationEmail_1.default,
                    RockForm: rockForm_1.default
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
                    templateOverrides: {
                        type: Object
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const confirmationEmail = vue_2.ref((_a = props.modelValue.confirmationEmail) !== null && _a !== void 0 ? _a : {});
                    const notificationEmail = vue_2.ref((_b = props.modelValue.notificationEmail) !== null && _b !== void 0 ? _b : {});
                    const sources = utils_1.useFormSources();
                    const sourceTemplateOptions = (_c = sources.emailTemplateOptions) !== null && _c !== void 0 ? _c : [];
                    const campusTopicOptions = (_d = sources.campusTopicOptions) !== null && _d !== void 0 ? _d : [];
                    const isConfirmationEmailForced = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isConfirmationEmailConfigured) !== null && _b !== void 0 ? _b : false; });
                    vue_2.watch(() => props.modelValue, () => {
                        var _a, _b;
                        confirmationEmail.value = (_a = props.modelValue.confirmationEmail) !== null && _a !== void 0 ? _a : {};
                        notificationEmail.value = (_b = props.modelValue.notificationEmail) !== null && _b !== void 0 ? _b : {};
                    });
                    vue_2.watch([confirmationEmail, notificationEmail], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { confirmationEmail: confirmationEmail.value, notificationEmail: notificationEmail.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        campusTopicOptions,
                        confirmationEmail,
                        isConfirmationEmailForced,
                        notificationEmail,
                        sourceTemplateOptions,
                    };
                },
                template: `
<div class="d-flex flex-column" style="flex-grow: 1; overflow-y: auto;">
    <div class="panel-body">
        <RockForm>
            <ConfirmationEmail v-if="!isConfirmationEmailForced" v-model="confirmationEmail" :sourceTemplateOptions="sourceTemplateOptions" :recipientOptions="recipientOptions" />
            <Alert v-else alertType="info">
                <h4 class="alert-heading">Confirmation Email</h4>
                <p>
                    The confirmation e-mail is defined on the template and cannot be changed.
                </p>
            </Alert>

            <NotificationEmail v-model="notificationEmail" :sourceTemplateOptions="sourceTemplateOptions" :campusTopicOptions="campusTopicOptions" />
        </RockForm>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=communicationsTab.js.map