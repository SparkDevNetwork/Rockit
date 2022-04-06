System.register(["vue", "./configurableZone", "../../../../Controls/rockField", "../../../../Elements/dropDownList", "../../../../Controls/panel", "../../../../Controls/rockForm", "../../../../Elements/switch", "../../../../Elements/textBox", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, configurableZone_1, rockField_1, dropDownList_1, panel_1, rockForm_1, switch_1, textBox_1, utils_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            },
            function (rockField_1_1) {
                rockField_1 = rockField_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (switch_1_1) {
                switch_1 = switch_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.SectionEditAside",
                components: {
                    ConfigurableZone: configurableZone_1.default,
                    DropDownList: dropDownList_1.default,
                    Panel: panel_1.default,
                    RockField: rockField_1.default,
                    RockForm: rockForm_1.default,
                    Switch: switch_1.default,
                    TextBox: textBox_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                emits: [
                    "close",
                    "update:modelValue"
                ],
                methods: {
                    isSafeToClose() {
                        this.formSubmit = true;
                        return Object.keys(this.validationErrors).length === 0;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b;
                    const title = vue_1.ref(props.modelValue.title);
                    const description = vue_1.ref(props.modelValue.description);
                    const showHeadingSeparator = vue_1.ref(props.modelValue.showHeadingSeparator);
                    const sectionType = vue_1.ref((_a = props.modelValue.type) !== null && _a !== void 0 ? _a : "");
                    const validationErrors = vue_1.ref({});
                    const formSubmit = vue_1.ref(false);
                    let autoSyncModelValue = true;
                    const sectionTypeOptions = (_b = utils_1.useFormSources().sectionTypeOptions) !== null && _b !== void 0 ? _b : [];
                    const onBackClick = () => emit("close");
                    vue_1.watch(() => props.modelValue, () => {
                        var _a;
                        autoSyncModelValue = false;
                        title.value = props.modelValue.title;
                        description.value = props.modelValue.description;
                        showHeadingSeparator.value = props.modelValue.showHeadingSeparator;
                        sectionType.value = (_a = props.modelValue.type) !== null && _a !== void 0 ? _a : "";
                        autoSyncModelValue = true;
                    });
                    vue_1.watch([title, description, showHeadingSeparator, sectionType], () => {
                        if (!autoSyncModelValue) {
                            return;
                        }
                        const value = Object.assign(Object.assign({}, props.modelValue), { title: title.value, description: description.value, showHeadingSeparator: showHeadingSeparator.value, type: sectionType.value === "" ? null : sectionType.value });
                        emit("update:modelValue", value);
                    });
                    return {
                        description,
                        formSubmit,
                        onBackClick,
                        title,
                        sectionType,
                        sectionTypeOptions,
                        showHeadingSeparator,
                        validationErrors
                    };
                },
                template: `
<div class="d-flex flex-column" style="overflow-y: hidden; flex-grow: 1;">
    <div class="d-flex">
        <div class="d-flex clickable" style="background-color: #484848; color: #fff; align-items: center; justify-content: center; width: 40px;" @click="onBackClick">
            <i class="fa fa-chevron-left"></i>
        </div>

        <div class="p-2 aside-header" style="flex-grow: 1;">
            <span class="title">Section</span>
        </div>
    </div>

    <div class="aside-body d-flex flex-column" style="flex-grow: 1; overflow-y: auto;">
        <RockForm v-model:submit="formSubmit" @validationChanged="onValidationChanged" class="d-flex flex-column" style="flex-grow: 1;">
            <Panel :modelValue="true" title="Section Configuration" hasCollapse>
                <TextBox v-model="title"
                    label="Title" />

                <TextBox v-model="description"
                    label="Description"
                    textMode="multiline" />

                <Switch v-model="showHeadingSeparator"
                    label="Show Heading Separator" />

                <DropDownList v-model="sectionType"
                    label="Type"
                    :options="sectionTypeOptions" />
            </Panel>

            <Panel title="Conditionals" hasCollapse>
                TODO: Need to build this.
            </Panel>
        </RockForm>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=sectionEditAside.js.map