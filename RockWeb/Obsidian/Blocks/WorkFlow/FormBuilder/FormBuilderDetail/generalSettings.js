System.register(["vue", "../../../../Controls/categoryPicker", "../../../../Elements/alert", "../../../../Elements/checkBox", "../../../../Elements/dateTimePicker", "../../../../Elements/dropDownList", "../../../../Elements/inlineSwitch", "../../../../Elements/textBox", "../../../../Elements/transitionVerticalCollapse", "../../../../Util/util", "../Shared/emailSource", "../Shared/settingsWell", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, categoryPicker_1, alert_1, checkBox_1, dateTimePicker_1, dropDownList_1, inlineSwitch_1, textBox_1, transitionVerticalCollapse_1, util_1, emailSource_1, settingsWell_1, utils_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (categoryPicker_1_1) {
                categoryPicker_1 = categoryPicker_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (dateTimePicker_1_1) {
                dateTimePicker_1 = dateTimePicker_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (inlineSwitch_1_1) {
                inlineSwitch_1 = inlineSwitch_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (transitionVerticalCollapse_1_1) {
                transitionVerticalCollapse_1 = transitionVerticalCollapse_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (emailSource_1_1) {
                emailSource_1 = emailSource_1_1;
            },
            function (settingsWell_1_1) {
                settingsWell_1 = settingsWell_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.GeneralSettings",
                components: {
                    Alert: alert_1.default,
                    CategoryPicker: categoryPicker_1.default,
                    CheckBox: checkBox_1.default,
                    DateTimePicker: dateTimePicker_1.default,
                    DropDownList: dropDownList_1.default,
                    EmailSource: emailSource_1.default,
                    InlineSwitch: inlineSwitch_1.default,
                    SettingsWell: settingsWell_1.default,
                    TextBox: textBox_1.default,
                    TransitionVerticalCollapse: transitionVerticalCollapse_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    templateOverrides: {
                        type: Object
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const sources = utils_1.useFormSources();
                    const name = vue_1.ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = vue_1.ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const template = vue_1.ref((_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                    const category = vue_1.ref((_d = props.modelValue.category) !== null && _d !== void 0 ? _d : null);
                    const entryStarts = vue_1.ref((_e = props.modelValue.entryStarts) !== null && _e !== void 0 ? _e : "");
                    const entryEnds = vue_1.ref((_f = props.modelValue.entryEnds) !== null && _f !== void 0 ? _f : "");
                    const isLoginRequired = vue_1.ref((_g = props.modelValue.isLoginRequired) !== null && _g !== void 0 ? _g : false);
                    const isLoginRequiredForced = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isLoginRequiredConfigured) !== null && _b !== void 0 ? _b : false; });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f;
                        util_1.updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        util_1.updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        util_1.updateRefValue(template, (_c = props.modelValue.template) !== null && _c !== void 0 ? _c : "");
                        util_1.updateRefValue(category, (_d = props.modelValue.category) !== null && _d !== void 0 ? _d : null);
                        util_1.updateRefValue(entryStarts, (_e = props.modelValue.entryStarts) !== null && _e !== void 0 ? _e : "");
                        util_1.updateRefValue(entryEnds, (_f = props.modelValue.entryEnds) !== null && _f !== void 0 ? _f : "");
                    });
                    vue_1.watch([name, description, template, category, isLoginRequired, entryStarts, entryEnds], () => {
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { name: name.value, description: description.value, template: template.value, category: category.value, isLoginRequired: isLoginRequired.value, entryStarts: entryStarts.value, entryEnds: entryEnds.value });
                        emit("update:modelValue", newValue);
                    });
                    return {
                        category,
                        description,
                        entryStarts,
                        entryEnds,
                        isLoginRequired,
                        isLoginRequiredForced,
                        name,
                        template,
                        templateOptions: sources.formTemplateOptions,
                        workflowTypeEntityTypeGuid: "C9F3C4A5-1526-474D-803F-D6C7A45CBBAE"
                    };
                },
                template: `
<SettingsWell title="General Settings"
    description="Update the general settings for the form below.">
    <div class="row">
        <div class="col-md-6">
            <div>
                <TextBox v-model="name"
                    label="Form Name"
                    rules="required" />

                <TextBox v-model="description"
                    label="Description"
                    textMode="multiline" />

                <DropDownList v-model="template"
                    label="Template"
                    :options="templateOptions"
                    />

                <CategoryPicker v-model="category"
                    label="Category"
                    rules="required"
                    :entityTypeGuid="workflowTypeEntityTypeGuid" />
            </div>
        </div>
    </div>

    <CheckBox v-if="!isLoginRequiredForced" v-model="isLoginRequired"
        label="Is Login Required"
        help="Determines if a person needs to be logged in to complete the form." />

    <Alert v-else alertType="info">
        The template has enforced the login required setting.
    </Alert>

    <div class="row">
        <div class="col-md-6">
            <DateTimePicker v-model="entryStarts"
                label="Form Entry Starts" />
        </div>

        <div class="col-md-6">
            <DateTimePicker v-model="entryEnds"
                label="Form Entry Ends" />
        </div>
    </div>
</Settingswell>
`
            }));
        }
    };
});
//# sourceMappingURL=generalSettings.js.map