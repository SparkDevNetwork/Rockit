System.register(["vue", "../../../../Elements/dropDownList", "../../../../Elements/inlineCheckBox", "../../../../Elements/textBox", "../../../../Services/number", "./segmentedPicker"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, inlineCheckBox_1, textBox_1, number_1, segmentedPicker_1, emailSourceOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (inlineCheckBox_1_1) {
                inlineCheckBox_1 = inlineCheckBox_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (segmentedPicker_1_1) {
                segmentedPicker_1 = segmentedPicker_1_1;
            }
        ],
        execute: function () {
            emailSourceOptions = [
                {
                    value: 0..toString(),
                    text: "Use Email Template"
                },
                {
                    value: 1..toString(),
                    text: "Provide Custom Email"
                }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.EmailSource",
                components: {
                    DropDownList: dropDownList_1.default,
                    InlineCheckbox: inlineCheckBox_1.default,
                    SegmentedPicker: segmentedPicker_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    },
                    templateOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const type = vue_1.ref((_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString());
                    const template = vue_1.ref((_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                    const subject = vue_1.ref((_d = props.modelValue.subject) !== null && _d !== void 0 ? _d : "");
                    const replyTo = vue_1.ref((_e = props.modelValue.replyTo) !== null && _e !== void 0 ? _e : "");
                    const body = vue_1.ref((_f = props.modelValue.body) !== null && _f !== void 0 ? _f : "");
                    const appendOrgHeaderAndFooter = vue_1.ref((_g = props.modelValue.appendOrgHeaderAndFooter) !== null && _g !== void 0 ? _g : false);
                    const isTemplateType = vue_1.computed(() => type.value === 0..toString());
                    const isCustomType = vue_1.computed(() => type.value === 1..toString());
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        type.value = (_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString();
                        template.value = (_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "";
                        subject.value = (_d = props.modelValue.subject) !== null && _d !== void 0 ? _d : "";
                        replyTo.value = (_e = props.modelValue.replyTo) !== null && _e !== void 0 ? _e : "";
                        body.value = (_f = props.modelValue.body) !== null && _f !== void 0 ? _f : "";
                        appendOrgHeaderAndFooter.value = (_g = props.modelValue.appendOrgHeaderAndFooter) !== null && _g !== void 0 ? _g : false;
                    });
                    vue_1.watch([type, template, subject, replyTo, body, appendOrgHeaderAndFooter], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { type: (_a = number_1.toNumberOrNull(type.value)) !== null && _a !== void 0 ? _a : 0, template: template.value, subject: subject.value, replyTo: replyTo.value, body: body.value, appendOrgHeaderAndFooter: appendOrgHeaderAndFooter.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        appendOrgHeaderAndFooter,
                        type,
                        template,
                        subject,
                        replyTo,
                        body,
                        emailSourceOptions,
                        isCustomType,
                        isTemplateType
                    };
                },
                template: `
<div>
    <SegmentedPicker v-model="type"
        :options="emailSourceOptions" />

    <div v-if="isTemplateType">
        <div class="row">
            <div class="col-md-4">
                <DropDownList v-model="template"
                    label="Email Template"
                    rules="required"
                    :options="templateOptions" />
            </div>
        </div>
    </div>

    <div v-else-if="isCustomType">
        <div class="row">
            <div class="col-md-4">
                <TextBox v-model="subject"
                    label="Subject"
                    rules="required" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <TextBox v-model="replyTo"
                    label="Reply To"
                    rules="email" />
            </div>
        </div>

        <TextBox v-model="body"
            label="Email Body"
            textMode="multiline"
            rules="required" />

        <InlineCheckbox v-model="appendOrgHeaderAndFooter"
            label="Append Organization Header and Footer" />
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=emailSource.js.map