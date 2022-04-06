System.register(["vue", "../../../../Controls/personPicker", "../../../../Elements/dropDownList", "../../../../Elements/emailBox", "../../../../Elements/textBox", "../../../../Services/number", "../Shared/emailSource", "../Shared/segmentedPicker", "../Shared/settingsWell"], function (exports_1, context_1) {
    "use strict";
    var vue_1, personPicker_1, dropDownList_1, emailBox_1, textBox_1, number_1, emailSource_1, segmentedPicker_1, settingsWell_1, notificationDestinationOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (personPicker_1_1) {
                personPicker_1 = personPicker_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (emailBox_1_1) {
                emailBox_1 = emailBox_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (emailSource_1_1) {
                emailSource_1 = emailSource_1_1;
            },
            function (segmentedPicker_1_1) {
                segmentedPicker_1 = segmentedPicker_1_1;
            },
            function (settingsWell_1_1) {
                settingsWell_1 = settingsWell_1_1;
            }
        ],
        execute: function () {
            notificationDestinationOptions = [
                {
                    value: 0..toString(),
                    text: "Specific Individual"
                },
                {
                    value: 1..toString(),
                    text: "Email Address"
                },
                {
                    value: 2..toString(),
                    text: "Campus Topic Address"
                }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.NotificationEmail",
                components: {
                    DropDownList: dropDownList_1.default,
                    EmailBox: emailBox_1.default,
                    EmailSource: emailSource_1.default,
                    PersonPicker: personPicker_1.default,
                    SegmentedPicker: segmentedPicker_1.default,
                    SettingsWell: settingsWell_1.default,
                    TextBox: textBox_1.default,
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sourceTemplateOptions: {
                        type: Array,
                        default: []
                    },
                    campusTopicOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const enabled = vue_1.ref((_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false);
                    const destination = vue_1.ref((_c = (_b = props.modelValue.destination) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 0..toString());
                    const recipient = vue_1.ref((_d = props.modelValue.recipient) !== null && _d !== void 0 ? _d : null);
                    const emailAddress = vue_1.ref((_e = props.modelValue.emailAddress) !== null && _e !== void 0 ? _e : "");
                    const campusTopicGuid = vue_1.ref((_f = props.modelValue.campusTopicGuid) !== null && _f !== void 0 ? _f : "");
                    const source = vue_1.ref((_g = props.modelValue.source) !== null && _g !== void 0 ? _g : {});
                    const isDestinationSpecificIndividual = vue_1.computed(() => destination.value === 0..toString());
                    const isDestinationEmailAddress = vue_1.computed(() => destination.value === 1..toString());
                    const isDestinationCampusTopic = vue_1.computed(() => destination.value === 2..toString());
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        enabled.value = (_a = props.modelValue.enabled) !== null && _a !== void 0 ? _a : false;
                        destination.value = (_c = (_b = props.modelValue.destination) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : 0..toString();
                        recipient.value = (_d = props.modelValue.recipient) !== null && _d !== void 0 ? _d : null;
                        emailAddress.value = (_e = props.modelValue.emailAddress) !== null && _e !== void 0 ? _e : "";
                        campusTopicGuid.value = (_f = props.modelValue.campusTopicGuid) !== null && _f !== void 0 ? _f : "";
                        source.value = (_g = props.modelValue.source) !== null && _g !== void 0 ? _g : {};
                    });
                    vue_1.watch([enabled, destination, recipient, emailAddress, campusTopicGuid, source], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { enabled: enabled.value, destination: (_a = number_1.toNumberOrNull(destination.value)) !== null && _a !== void 0 ? _a : 0, recipient: recipient.value, emailAddress: emailAddress.value, campusTopicGuid: campusTopicGuid.value, source: source.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        campusTopicGuid,
                        destination,
                        destinationOptions: notificationDestinationOptions,
                        emailAddress,
                        enabled,
                        isDestinationSpecificIndividual,
                        isDestinationEmailAddress,
                        isDestinationCampusTopic,
                        recipient,
                        source
                    };
                },
                template: `
<SettingsWell v-model="enabled"
    hasEnable
    title="Notification Email"
    description="Notification emails can be sent to specified individuals when each form is completed.">
    <SegmentedPicker v-model="destination" :options="destinationOptions" />

    <div v-if="isDestinationSpecificIndividual">
        <div class="row">
            <div class="col-md-4">
                <PersonPicker v-model="recipient"
                    label="Recipient"
                    rules="required" />
            </div>
        </div>
    </div>

    <div v-else-if="isDestinationEmailAddress">
        <div class="row">
            <div class="col-md-4">
                <EmailBox v-model="emailAddress"
                    label="Recipients"
                    rules="required"
                    allowMultiple />
            </div>
        </div>
    </div>

    <div v-else-if="isDestinationCampusTopic">
        <div class="row">
            <div class="col-md-4">
                <DropDownList v-model="campusTopicGuid"
                    label="Topic"
                    rules="required"
                    :options="campusTopicOptions" />
            </div>
        </div>
    </div>

    <div class="mt-3">
        <EmailSource v-model="source" :templateOptions="sourceTemplateOptions" />
    </div>
</SettingsWell>
`
            }));
        }
    };
});
//# sourceMappingURL=notificationEmail.js.map