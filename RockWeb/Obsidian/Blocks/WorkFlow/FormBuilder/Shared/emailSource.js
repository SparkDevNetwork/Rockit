System.register(['vue', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/inlineCheckBox', '@Obsidian/Controls/textBox', '@Obsidian/Utility/numberUtils', './segmentedPicker.js', '@Obsidian/Utility/component'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, DropDownList, InlineCheckBox, TextBox, toNumberOrNull, SegmentedPicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            InlineCheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }, function (module) {
            SegmentedPicker = module["default"];
        }, function () {}],
        execute: (function () {

            const emailSourceOptions = [
                {
                    value: 0..toString(),
                    text: "Use Email Template"
                },
                {
                    value: 1..toString(),
                    text: "Provide Custom Email"
                }
            ];
            var EmailSource = exports('default', defineComponent({
                name: "Workflow.FormBuilderDetail.EmailSource",
                components: {
                    DropDownList,
                    InlineCheckbox: InlineCheckBox,
                    SegmentedPicker,
                    TextBox
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
                    const type = ref((_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString());
                    const template = ref((_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                    const subject = ref((_d = props.modelValue.subject) !== null && _d !== void 0 ? _d : "");
                    const replyTo = ref((_e = props.modelValue.replyTo) !== null && _e !== void 0 ? _e : "");
                    const body = ref((_f = props.modelValue.body) !== null && _f !== void 0 ? _f : "");
                    const appendOrgHeaderAndFooter = ref((_g = props.modelValue.appendOrgHeaderAndFooter) !== null && _g !== void 0 ? _g : false);
                    const isTemplateType = computed(() => type.value === 0..toString());
                    const isCustomType = computed(() => type.value === 1..toString());
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        type.value = (_b = (_a = props.modelValue.type) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 0..toString();
                        template.value = (_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "";
                        subject.value = (_d = props.modelValue.subject) !== null && _d !== void 0 ? _d : "";
                        replyTo.value = (_e = props.modelValue.replyTo) !== null && _e !== void 0 ? _e : "";
                        body.value = (_f = props.modelValue.body) !== null && _f !== void 0 ? _f : "";
                        appendOrgHeaderAndFooter.value = (_g = props.modelValue.appendOrgHeaderAndFooter) !== null && _g !== void 0 ? _g : false;
                    });
                    watch([type, template, subject, replyTo, body, appendOrgHeaderAndFooter], () => {
                        var _a;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { type: (_a = toNumberOrNull(type.value)) !== null && _a !== void 0 ? _a : 0, template: template.value, subject: subject.value, replyTo: replyTo.value, body: body.value, appendOrgHeaderAndFooter: appendOrgHeaderAndFooter.value });
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
        :items="emailSourceOptions" />

    <div v-if="isTemplateType">
        <div class="row">
            <div class="col-md-4">
                <DropDownList v-model="template"
                    label="Email Template"
                    rules="required"
                    :items="templateOptions" />
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

        })
    };
}));
