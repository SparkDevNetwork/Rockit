System.register(["vue", "../../../../Controls/rockForm", "../../../../Elements/alert", "../../../../Util/component", "../Shared/completionSettings", "./generalSettings"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockForm_1, alert_1, component_1, completionSettings_1, generalSettings_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (completionSettings_1_1) {
                completionSettings_1 = completionSettings_1_1;
            },
            function (generalSettings_1_1) {
                generalSettings_1 = generalSettings_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.SettingsTab",
                components: {
                    Alert: alert_1.default,
                    GeneralSettings: generalSettings_1.default,
                    CompletionSettings: completionSettings_1.default,
                    RockForm: rockForm_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    completion: {
                        type: Object,
                        required: true
                    },
                    templateOverrides: {
                        type: Object
                    }
                },
                emits: [
                    "update:modelValue",
                    "update:completion",
                ],
                setup(props, { emit }) {
                    const generalSettings = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const completionSettings = component_1.useVModelPassthrough(props, "completion", emit);
                    const isConfirmationForced = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isConfirmationEmailConfigured) !== null && _b !== void 0 ? _b : false; });
                    return {
                        completionSettings,
                        generalSettings,
                        isConfirmationForced
                    };
                },
                template: `
<div class="d-flex flex-column" style="flex-grow: 1; overflow-y: auto;">
    <div class="panel-body">
        <RockForm>
            <GeneralSettings v-model="generalSettings" :templateOverrides="templateOverrides" />

            <CompletionSettings v-if="!isConfirmationForced" v-model="completionSettings" />
            <Alert v-else alertType="info">
                <h4 class="alert-heading">Confirmation Email</h4>
                <p>
                    The completion action is defined on the template and cannot be changed.
                </p>
            </Alert>
        </RockForm>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=settingsTab.js.map