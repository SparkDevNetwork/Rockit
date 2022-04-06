System.register(["vue", "../../../Controls/panel", "../../../Elements/rockButton", "../../../Util/block", "../../../Util/guid", "./FormBuilderDetail/communicationsTab", "./FormBuilderDetail/formBuilderTab", "./FormBuilderDetail/settingsTab", "./FormBuilderDetail/utils"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, panel_1, rockButton_1, block_1, guid_1, communicationsTab_1, formBuilderTab_1, settingsTab_1, utils_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (communicationsTab_1_1) {
                communicationsTab_1 = communicationsTab_1_1;
            },
            function (formBuilderTab_1_1) {
                formBuilderTab_1 = formBuilderTab_1_1;
            },
            function (settingsTab_1_1) {
                settingsTab_1 = settingsTab_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail",
                components: {
                    CommunicationsTab: communicationsTab_1.default,
                    FormBuilderTab: formBuilderTab_1.default,
                    Panel: panel_1.default,
                    RockButton: rockButton_1.default,
                    SettingsTab: settingsTab_1.default
                },
                setup() {
                    var _a, _b, _c, _d, _e, _f;
                    const config = block_1.useConfigurationValues();
                    const invokeBlockAction = block_1.useInvokeBlockAction();
                    const form = (_a = config.form) !== null && _a !== void 0 ? _a : {};
                    const isFormDirty = vue_1.ref(false);
                    const selectedTab = vue_1.ref(0);
                    const recipientOptions = vue_1.ref([]);
                    const communicationsViewModel = vue_1.ref({
                        confirmationEmail: (_b = form.confirmationEmail) !== null && _b !== void 0 ? _b : {},
                        notificationEmail: (_c = form.notificationEmail) !== null && _c !== void 0 ? _c : {}
                    });
                    const generalViewModel = vue_1.ref((_d = form.general) !== null && _d !== void 0 ? _d : {});
                    const completionViewModel = vue_1.ref((_e = form.completion) !== null && _e !== void 0 ? _e : {});
                    const builderViewModel = vue_1.ref({
                        allowPersonEntry: form.allowPersonEntry,
                        campusSetFrom: form.campusSetFrom,
                        footerContent: form.footerContent,
                        headerContent: form.headerContent,
                        personEntry: form.personEntry,
                        sections: form.sections
                    });
                    const isFormBuilderTabSelected = vue_1.computed(() => selectedTab.value === 0);
                    const isCommunicationsTabSelected = vue_1.computed(() => selectedTab.value === 1);
                    const isSettingsTabSelected = vue_1.computed(() => selectedTab.value === 2);
                    const formBuilderContainerStyle = vue_1.computed(() => {
                        return {
                            display: isFormBuilderTabSelected.value ? "flex" : "none"
                        };
                    });
                    const communicationsContainerStyle = vue_1.computed(() => {
                        return {
                            display: isCommunicationsTabSelected.value ? "flex" : "none"
                        };
                    });
                    const settingsContainerStyle = vue_1.computed(() => {
                        return {
                            display: isSettingsTabSelected.value ? "flex" : "none"
                        };
                    });
                    const selectedTemplate = vue_1.computed(() => {
                        var _a, _b;
                        const matches = (_b = (_a = config.sources) === null || _a === void 0 ? void 0 : _a.formTemplateOptions) === null || _b === void 0 ? void 0 : _b.filter(t => { var _a; return guid_1.areEqual(t.value, (_a = form.general) === null || _a === void 0 ? void 0 : _a.template); });
                        return matches && matches.length > 0 ? matches[0] : null;
                    });
                    const onFormBuilderTabClick = () => {
                        selectedTab.value = 0;
                    };
                    const onCommunicationsTabClick = () => {
                        selectedTab.value = 1;
                    };
                    const onSettingsTabClick = () => {
                        selectedTab.value = 2;
                    };
                    const onSaveClick = () => __awaiter(this, void 0, void 0, function* () {
                        var _g;
                        const result = yield invokeBlockAction("SaveForm", {
                            formGuid: config.formGuid,
                            formSettings: form
                        });
                        if (!result.isSuccess) {
                            alert((_g = result.errorMessage) !== null && _g !== void 0 ? _g : "Failed to save.");
                        }
                        else {
                            isFormDirty.value = false;
                        }
                    });
                    const updateRecipientOptions = () => {
                        const options = [];
                        if (config.otherAttributes) {
                            for (const attribute of config.otherAttributes) {
                                if (!attribute.guid || !attribute.fieldTypeGuid || !attribute.name) {
                                    continue;
                                }
                                if (guid_1.areEqual(attribute.fieldTypeGuid, "E4EAB7B2-0B76-429B-AFE4-AD86D7428C70") || guid_1.areEqual(attribute.fieldTypeGuid, "3D045CAE-EA72-4A04-B7BE-7FD1D6214217")) {
                                    options.push({
                                        value: attribute.guid,
                                        text: attribute.name
                                    });
                                }
                            }
                        }
                        if (!form.sections) {
                            recipientOptions.value = [];
                            return;
                        }
                        for (const section of form.sections) {
                            if (!section.fields) {
                                continue;
                            }
                            for (const field of section.fields) {
                                if (guid_1.areEqual(field.fieldTypeGuid, "E4EAB7B2-0B76-429B-AFE4-AD86D7428C70") || guid_1.areEqual(field.fieldTypeGuid, "3D045CAE-EA72-4A04-B7BE-7FD1D6214217")) {
                                    options.push({
                                        value: field.guid,
                                        text: field.name
                                    });
                                }
                            }
                        }
                        options.sort((a, b) => {
                            if (a.text < b.text) {
                                return -1;
                            }
                            else if (a.text > b.text) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        });
                        recipientOptions.value = options;
                    };
                    const onBeforeUnload = (event) => {
                        event.preventDefault();
                        event.returnValue = "";
                    };
                    vue_1.watch([builderViewModel, communicationsViewModel, generalViewModel, completionViewModel], () => {
                        form.allowPersonEntry = builderViewModel.value.allowPersonEntry;
                        form.campusSetFrom = builderViewModel.value.campusSetFrom;
                        form.footerContent = builderViewModel.value.footerContent;
                        form.headerContent = builderViewModel.value.headerContent;
                        form.personEntry = builderViewModel.value.personEntry;
                        form.sections = builderViewModel.value.sections;
                        form.general = generalViewModel.value;
                        form.completion = completionViewModel.value;
                        form.confirmationEmail = communicationsViewModel.value.confirmationEmail;
                        form.notificationEmail = communicationsViewModel.value.notificationEmail;
                        updateRecipientOptions();
                        isFormDirty.value = true;
                    });
                    vue_1.watch(isFormDirty, () => {
                        window.removeEventListener("beforeunload", onBeforeUnload);
                        if (isFormDirty.value) {
                            window.addEventListener("beforeunload", onBeforeUnload);
                        }
                    });
                    utils_1.provideFormSources((_f = config.sources) !== null && _f !== void 0 ? _f : {});
                    updateRecipientOptions();
                    return {
                        analyticsPageUrl: config.analyticsPageUrl,
                        builderViewModel,
                        communicationsContainerStyle,
                        communicationsViewModel,
                        completionViewModel,
                        formBuilderContainerStyle,
                        isCommunicationsTabSelected,
                        isFormBuilderTabSelected,
                        isFormDirty,
                        isSettingsTabSelected,
                        settingsContainerStyle,
                        generalViewModel,
                        submissionsPageUrl: config.submissionsPageUrl,
                        onCommunicationsTabClick,
                        onFormBuilderTabClick,
                        onSaveClick,
                        onSettingsTabClick,
                        recipientOptions,
                        selectedTemplate
                    };
                },
                template: `
<Panel type="block" hasFullscreen :isFullscreenPageOnly="true" title="Workflow Form Builder" titleIconClass="fa fa-hammer">
    <template #default>
        <v-style>
            /*** Overrides for theme CSS ***/
            .form-builder-detail .form-section {
                margin-bottom: 0px;
            }

            .custom-switch {
                position: relative;
            }

            /*** Style Variables ***/
            .form-builder-detail {
                --zone-color: #ebebeb;
                --zone-action-text-color: #a7a7a7;
                --zone-active-color: #c9eaf9;
                --zone-active-action-text-color: #83bad3;
                --zone-highlight-color: #ee7725;
                --zone-highlight-action-text-color: #e4bda2;
                --flex-col-gutter: 30px;
            }

            /*** Form Template Items ***/
            .form-builder-detail .form-template-item {
                display: flex;
                align-items: center;
                background-color: #ffffff;
                border: 1px solid #e1e1e1;
                border-left: 3px solid #e1e1e1;
                border-radius: 3px;
                padding: 6px;
                font-size: 13px;
                font-weight: 600;
                cursor: grab;
            }

            .form-builder-detail .form-template-item > .fa {
                margin-right: 6px;
            }

            .form-builder-detail .form-template-item > .text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .form-builder-detail .form-template-item.form-template-item-section {
                border-left-color: #009ce3;
            }

            .form-builder-detail .form-template-item.form-template-item-field {
                border-left-color: #ee7725;
                margin-right: 5px;
                margin-bottom: 5px;
                flex-basis: calc(50% - 5px);
            }

            /*** Configuration Asides ***/
            .form-builder-detail .aside-header {
                border-bottom: 1px solid #dfe0e1;
            }

            .form-builder-detail .aside-header:last-child {
                border-right: 1px solid #dfe0e1;
            }

            .form-builder-detail .aside-header .fa + .title {
                margin-left: 4px;
            }

            .form-builder-detail .aside-header .title {
                font-size: 85%;
                font-weight: 600;
            }

            .form-builder-detail .aside-body {
                padding: 15px;
            }

            /*** Configurable Zones ***/
            .form-builder-detail .configurable-zone {
                display: flex;
                margin-bottom: 12px;
            }

            .form-builder-detail .configurable-zone.zone-section {
                flex-grow: 1;
            }

            .form-builder-detail .configurable-zone > .zone-content-container {
                display: flex;
                flex-grow: 1;
                border: 2px solid var(--zone-color);
            }

            .form-builder-detail .configurable-zone.zone-section > .zone-content-container {
                border-style: dashed;
                border-right-style: solid;
            }

            .form-builder-detail .configurable-zone > .zone-content-container > .zone-content {
                flex-grow: 1;
            }

            .form-builder-detail .configurable-zone > .zone-content-container > .zone-content > .zone-body {
                padding: 20px;
            }

            .form-builder-detail .configurable-zone > .zone-actions {
                background-color: var(--zone-color);
                border: 2px solid var(--zone-color);
                border-left: 0px;
                width: 40px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--zone-action-text-color);
            }

            .form-builder-detail .configurable-zone > .zone-actions > .zone-action-pad {
                flex-grow: 1;
            }

            .form-builder-detail .configurable-zone > .zone-actions > .zone-action {
                display: none;
                margin: 5px 0px;
                cursor: pointer;
            }

            .form-builder-detail .configurable-zone > .zone-actions > .zone-action-move {
                cursor: grab;
            }

            .form-builder-detail .configurable-zone.active > .zone-content-container {
                border-color: var(--zone-active-color);
            }

            .form-builder-detail .configurable-zone.active > .zone-actions {
                background-color: var(--zone-active-color);
                border-color: var(--zone-active-color);
                color: var(--zone-active-action-text-color);
            }

            .form-builder-detail .configurable-zone.highlight > .zone-content-container {
                border-color: var(--zone-highlight-color);
                border-right-style: dashed;
            }

            .form-builder-detail .configurable-zone.active > .zone-actions > .zone-action,
            .form-builder-detail .configurable-zone:hover > .zone-actions > .zone-action {
                display: initial;
            }

            /*** Form Sections ***/
            .form-builder-detail .form-section {
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;
                margin-right: calc(0px - var(--flex-col-gutter));
                min-height: 50px;
                flex-grow: 1;
            }

            .form-builder-detail .form-section .form-template-item.form-template-item-field {
                margin: 0px 0px 12px 0px;
                flex-basis: calc(100% - var(--flex-col-gutter));
            }

            /*** Flex Column Sizes ***/
            .form-builder-detail .flex-col {
                margin-right: var(--flex-col-gutter);
            }

            .form-builder-detail .flex-col-1 {
                flex-basis: calc(8.3333% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-2 {
                flex-basis: calc(16.6666% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-3 {
                flex-basis: calc(25% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-4 {
                flex-basis: calc(33.3333% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-5 {
                flex-basis: calc(41.6666% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-6 {
                flex-basis: calc(50% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-7 {
                flex-basis: calc(58.3333% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-8 {
                flex-basis: calc(66.6666% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-9 {
                flex-basis: calc(75% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-10 {
                flex-basis: calc(83.3333% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-11 {
                flex-basis: calc(91.6666% - var(--flex-col-gutter));
            }

            .form-builder-detail .flex-col-12 {
                flex-basis: calc(100% - var(--flex-col-gutter));
            }
        </v-style>

        <div ref="bodyElement" class="form-builder-detail d-flex flex-column panel-flex-fill-body" style="overflow-y: hidden;">
            <div class="p-2 d-flex" style="border-bottom: 1px solid #dfe0e1; box-shadow: rgba(0,0,0,0.15) 0 0 4px; z-index: 1;">
                <ul class="nav nav-pills" style="flex-grow: 1;">
                    <li role="presentation"><a :href="submissionsPageUrl">Submissions</a></li>
                    <li :class="{ active: isFormBuilderTabSelected }" role="presentation"><a href="#" @click.prevent="onFormBuilderTabClick">Form Builder</a></li>
                    <li :class="{ active: isCommunicationsTabSelected }" role="presentation"><a href="#" @click.prevent="onCommunicationsTabClick">Communications</a></li>
                    <li :class="{ active: isSettingsTabSelected }" role="presentation"><a href="#" @click.prevent="onSettingsTabClick">Settings</a></li>
                    <li role="presentation"><a :href="analyticsPageUrl">Analytics</a></li>
                </ul>

                <div>
                    <RockButton v-if="isFormDirty" btnType="primary" @click="onSaveClick">Save</RockButton>
                </div>
            </div>

            <div style="flex-grow: 1; overflow-y: hidden;" :style="formBuilderContainerStyle">
                <FormBuilderTab v-model="builderViewModel" :templateOverrides="selectedTemplate" />
            </div>

            <div style="flex-grow: 1; overflow-y: hidden;" :style="communicationsContainerStyle">
                <CommunicationsTab v-model="communicationsViewModel" :recipientOptions="recipientOptions" :templateOverrides="selectedTemplate" />
            </div>

            <div style="flex-grow: 1; overflow-y: hidden;" :style="settingsContainerStyle">
                <SettingsTab v-model="generalViewModel" v-model:completion="completionViewModel" :templateOverrides="selectedTemplate" />
            </div>
        </div>
    </template>
</Panel>
`
            }));
        }
    };
});
//# sourceMappingURL=formBuilderDetail.js.map