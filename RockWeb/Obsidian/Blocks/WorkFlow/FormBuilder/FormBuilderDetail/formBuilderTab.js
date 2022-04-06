System.register(["vue", "../../../../Elements/dropDownList", "../../../../Controls/modal", "../../../../Controls/panel", "../../../../Elements/rockButton", "../../../../Elements/rockLabel", "../../../../Controls/rockForm", "../../../../Elements/switch", "../../../../Elements/textBox", "./configurableZone", "./fieldEditAside", "./formContentModal", "./formContentZone", "./generalAside", "./personEntryEditAside", "./sectionEditAside", "./sectionZone", "../../../../Directives/dragDrop", "../../../../Util/guid", "../../../../Util/linq", "./utils", "../../../../Util/dialogs"], function (exports_1, context_1) {
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
    var vue_1, dropDownList_1, modal_1, panel_1, rockButton_1, rockLabel_1, rockForm_1, switch_1, textBox_1, configurableZone_1, fieldEditAside_1, formContentModal_1, formContentZone_1, generalAside_1, personEntryEditAside_1, sectionEditAside_1, sectionZone_1, dragDrop_1, guid_1, linq_1, utils_1, dialogs_1, formHeaderZoneGuid, formFooterZoneGuid, personEntryZoneGuid;
    var __moduleName = context_1 && context_1.id;
    function getSectionDragSourceOptions(sections) {
        return {
            id: guid_1.newGuid(),
            copyElement: true,
            dragDrop(operation) {
                operation.element.remove();
                if (operation.targetIndex !== undefined) {
                    sections.splice(operation.targetIndex, 0, {
                        guid: guid_1.newGuid(),
                        title: "",
                        description: "",
                        showHeadingSeparator: false,
                        type: null,
                        fields: []
                    });
                }
            }
        };
    }
    function getFieldDragSourceOptions(sections, availableFieldTypes) {
        return {
            id: guid_1.newGuid(),
            copyElement: true,
            dragOver(operation) {
                var _a;
                if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                    (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.add("highlight");
                }
            },
            dragOut(operation) {
                var _a;
                if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                    (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("highlight");
                }
            },
            dragShadow(operation) {
                if (operation.shadow) {
                    operation.shadow.classList.remove("col-xs-6");
                    operation.shadow.classList.add("flex-col", "flex-col-12");
                }
            },
            dragDrop(operation) {
                var _a, _b;
                operation.element.remove();
                const fieldTypeGuid = (_a = operation.element.dataset.fieldType) !== null && _a !== void 0 ? _a : "";
                const sectionGuid = (_b = operation.targetContainer.dataset.sectionId) !== null && _b !== void 0 ? _b : "";
                const section = new linq_1.List(sections).firstOrUndefined(s => guid_1.areEqual(s.guid, sectionGuid));
                const fieldType = new linq_1.List(availableFieldTypes.value).firstOrUndefined(f => guid_1.areEqual(f.guid, fieldTypeGuid));
                if (section && fieldType && operation.targetIndex !== undefined) {
                    const existingKeys = [];
                    for (const sect of sections) {
                        if (sect.fields) {
                            for (const field of sect.fields) {
                                existingKeys.push(field.key);
                            }
                        }
                    }
                    const baseKey = fieldType.text.replace(/[^a-zA-Z0-9_\-.]/g, "");
                    let key = baseKey;
                    let keyCount = 0;
                    while (existingKeys.includes(key)) {
                        keyCount++;
                        key = `${baseKey}${keyCount}`;
                    }
                    if (!section.fields) {
                        section.fields = [];
                    }
                    section.fields.splice(operation.targetIndex, 0, {
                        guid: guid_1.newGuid(),
                        fieldTypeGuid: fieldType.guid,
                        name: fieldType.text,
                        key: key,
                        size: 12,
                        configurationValues: {},
                        defaultValue: ""
                    });
                }
            }
        };
    }
    function getFieldReorderDragSourceOptions(sections) {
        return {
            id: guid_1.newGuid(),
            copyElement: false,
            handleSelector: ".zone-actions > .zone-action-move",
            dragOver(operation) {
                var _a;
                if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                    (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.add("highlight");
                }
            },
            dragOut(operation) {
                var _a;
                if (operation.targetContainer && operation.targetContainer instanceof HTMLElement) {
                    (_a = operation.targetContainer.closest(".zone-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("highlight");
                }
            },
            dragDrop(operation) {
                var _a, _b;
                const sourceSectionGuid = (_a = operation.sourceContainer.dataset.sectionId) !== null && _a !== void 0 ? _a : "";
                const targetSectionGuid = (_b = operation.targetContainer.dataset.sectionId) !== null && _b !== void 0 ? _b : "";
                const sourceSection = new linq_1.List(sections).firstOrUndefined(s => guid_1.areEqual(s.guid, sourceSectionGuid));
                const targetSection = new linq_1.List(sections).firstOrUndefined(s => guid_1.areEqual(s.guid, targetSectionGuid));
                if ((sourceSection === null || sourceSection === void 0 ? void 0 : sourceSection.fields) && (targetSection === null || targetSection === void 0 ? void 0 : targetSection.fields) && operation.targetIndex !== undefined) {
                    const field = sourceSection.fields[operation.sourceIndex];
                    sourceSection.fields.splice(operation.sourceIndex, 1);
                    targetSection.fields.splice(operation.targetIndex, 0, field);
                }
            }
        };
    }
    function getSectionReorderDragSourceOptions(sections) {
        return {
            id: guid_1.newGuid(),
            copyElement: false,
            handleSelector: ".zone-section > .zone-actions > .zone-action-move",
            dragDrop(operation) {
                if (operation.targetIndex !== undefined) {
                    const section = sections[operation.sourceIndex];
                    sections.splice(operation.sourceIndex, 1);
                    sections.splice(operation.targetIndex, 0, section);
                }
            }
        };
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (rockLabel_1_1) {
                rockLabel_1 = rockLabel_1_1;
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
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            },
            function (fieldEditAside_1_1) {
                fieldEditAside_1 = fieldEditAside_1_1;
            },
            function (formContentModal_1_1) {
                formContentModal_1 = formContentModal_1_1;
            },
            function (formContentZone_1_1) {
                formContentZone_1 = formContentZone_1_1;
            },
            function (generalAside_1_1) {
                generalAside_1 = generalAside_1_1;
            },
            function (personEntryEditAside_1_1) {
                personEntryEditAside_1 = personEntryEditAside_1_1;
            },
            function (sectionEditAside_1_1) {
                sectionEditAside_1 = sectionEditAside_1_1;
            },
            function (sectionZone_1_1) {
                sectionZone_1 = sectionZone_1_1;
            },
            function (dragDrop_1_1) {
                dragDrop_1 = dragDrop_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (linq_1_1) {
                linq_1 = linq_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (dialogs_1_1) {
                dialogs_1 = dialogs_1_1;
            }
        ],
        execute: function () {
            formHeaderZoneGuid = "C7D522D0-A18C-4CB0-B604-B2E9727E9E33";
            formFooterZoneGuid = "317E5892-C156-4614-806F-BE4CAB67AC10";
            personEntryZoneGuid = "5257312E-102C-4026-B558-10184AFEAC4D";
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.FormBuilderTab",
                components: {
                    ConfigurableZone: configurableZone_1.default,
                    DropDownList: dropDownList_1.default,
                    FieldEditAside: fieldEditAside_1.default,
                    FormContentModal: formContentModal_1.default,
                    FormContentZone: formContentZone_1.default,
                    GeneralAside: generalAside_1.default,
                    Modal: modal_1.default,
                    Panel: panel_1.default,
                    RockButton: rockButton_1.default,
                    RockForm: rockForm_1.default,
                    RockLabel: rockLabel_1.default,
                    PersonEntryEditAside: personEntryEditAside_1.default,
                    SectionEditAside: sectionEditAside_1.default,
                    SectionZone: sectionZone_1.default,
                    Switch: switch_1.default,
                    TextBox: textBox_1.default
                },
                directives: {
                    DragSource: dragDrop_1.DragSource,
                    DragTarget: dragDrop_1.DragTarget,
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
                    var _a, _b, _c, _d, _e, _f;
                    const sources = utils_1.useFormSources();
                    const sectionTypeOptions = (_a = sources.sectionTypeOptions) !== null && _a !== void 0 ? _a : [];
                    const sections = vue_1.reactive((_b = props.modelValue.sections) !== null && _b !== void 0 ? _b : []);
                    const formHeaderContent = vue_1.ref((_c = props.modelValue.headerContent) !== null && _c !== void 0 ? _c : "");
                    const formFooterContent = vue_1.ref((_d = props.modelValue.footerContent) !== null && _d !== void 0 ? _d : "");
                    const formHeaderEditContent = vue_1.ref("");
                    const formFooterEditContent = vue_1.ref("");
                    const availableFieldTypes = vue_1.ref((_e = sources.fieldTypes) !== null && _e !== void 0 ? _e : []);
                    const generalAsideSettings = vue_1.ref({
                        campusSetFrom: props.modelValue.campusSetFrom,
                        hasPersonEntry: props.modelValue.allowPersonEntry
                    });
                    const sectionAsideSettings = vue_1.ref(null);
                    const personEntryAsideSettings = vue_1.ref((_f = props.modelValue.personEntry) !== null && _f !== void 0 ? _f : {});
                    const sectionDragSourceOptions = getSectionDragSourceOptions(sections);
                    const sectionReorderDragSourceOptions = getSectionReorderDragSourceOptions(sections);
                    const fieldDragSourceOptions = getFieldDragSourceOptions(sections, availableFieldTypes);
                    const fieldReorderDragSourceOptions = getFieldReorderDragSourceOptions(sections);
                    const bodyElement = vue_1.ref(null);
                    const generalAsideComponentInstance = vue_1.ref(null);
                    const personEntryAsideComponentInstance = vue_1.ref(null);
                    const sectionEditAsideComponentInstance = vue_1.ref(null);
                    const fieldEditAsideComponentInstance = vue_1.ref(null);
                    const personEntryEditAsideComponentInstance = vue_1.ref(null);
                    const activeZone = vue_1.ref("");
                    const editField = vue_1.ref(null);
                    const activeAside = vue_1.computed(() => {
                        if (showGeneralAside.value) {
                            return generalAsideComponentInstance.value;
                        }
                        else if (personEntryAsideComponentInstance.value) {
                            return personEntryAsideComponentInstance.value;
                        }
                        else if (sectionEditAsideComponentInstance.value) {
                            return sectionEditAsideComponentInstance.value;
                        }
                        else if (fieldEditAsideComponentInstance.value) {
                            return fieldEditAsideComponentInstance.value;
                        }
                        else if (personEntryEditAsideComponentInstance.value) {
                            return personEntryEditAsideComponentInstance.value;
                        }
                        else {
                            return null;
                        }
                    });
                    const showGeneralAside = vue_1.computed(() => {
                        return !showFieldAside.value && !showSectionAside.value && !showPersonEntryAside.value;
                    });
                    const showFieldAside = vue_1.computed(() => {
                        return editField.value !== null;
                    });
                    const showSectionAside = vue_1.computed(() => {
                        return sectionAsideSettings.value !== null;
                    });
                    const showPersonEntryAside = vue_1.computed(() => activeZone.value === personEntryZoneGuid);
                    const hasPersonEntry = vue_1.computed(() => {
                        var _a, _b, _c;
                        if ((_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false) {
                            return true;
                        }
                        return (_c = generalAsideSettings.value.hasPersonEntry) !== null && _c !== void 0 ? _c : false;
                    });
                    const isFormHeaderActive = vue_1.computed({
                        get: () => {
                            return activeZone.value === formHeaderZoneGuid;
                        },
                        set(value) {
                            if (!value && activeZone.value === formHeaderZoneGuid) {
                                closeAside();
                            }
                        }
                    });
                    const isFormFooterActive = vue_1.computed({
                        get: () => {
                            return activeZone.value === formFooterZoneGuid;
                        },
                        set(value) {
                            if (!value && activeZone.value === formFooterZoneGuid) {
                                closeAside();
                            }
                        }
                    });
                    const isPersonEntryActive = vue_1.computed(() => activeZone.value === personEntryZoneGuid);
                    const isPersonEntryForced = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false; });
                    const personEntryZoneIconClass = vue_1.computed(() => {
                        if (isPersonEntryForced.value) {
                            return "";
                        }
                        return "fa fa-gear";
                    });
                    const templateFormHeaderContent = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.formHeader) !== null && _b !== void 0 ? _b : ""; });
                    const templateFormFooterContent = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.templateOverrides) === null || _a === void 0 ? void 0 : _a.formFooter) !== null && _b !== void 0 ? _b : ""; });
                    const existingKeys = vue_1.computed(() => {
                        const existingKeys = [];
                        for (const sect of sections) {
                            if (sect.fields) {
                                for (const field of sect.fields) {
                                    existingKeys.push({
                                        value: field.guid,
                                        text: field.key
                                    });
                                }
                            }
                        }
                        return existingKeys;
                    });
                    const canCloseAside = () => {
                        if (activeAside.value) {
                            return activeAside.value.isSafeToClose();
                        }
                        else {
                            return true;
                        }
                    };
                    const closeAside = () => {
                        editField.value = null;
                        activeZone.value = "";
                    };
                    const onConfigureFormHeader = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        formHeaderEditContent.value = formHeaderContent.value;
                        activeZone.value = formHeaderZoneGuid;
                    };
                    const onConfigureFormFooter = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        formFooterEditContent.value = formFooterContent.value;
                        activeZone.value = formFooterZoneGuid;
                    };
                    const onConfigurePersonEntry = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        activeZone.value = personEntryZoneGuid;
                    };
                    const onConfigureSection = (section) => {
                        var _a, _b, _c, _d;
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        activeZone.value = section.guid;
                        sectionAsideSettings.value = {
                            guid: section.guid,
                            title: (_a = section.title) !== null && _a !== void 0 ? _a : "",
                            description: (_b = section.description) !== null && _b !== void 0 ? _b : "",
                            showHeadingSeparator: (_c = section.showHeadingSeparator) !== null && _c !== void 0 ? _c : false,
                            type: (_d = section.type) !== null && _d !== void 0 ? _d : null
                        };
                    };
                    const onConfigureField = (field) => {
                        var _a;
                        if (!canCloseAside()) {
                            return;
                        }
                        closeAside();
                        for (const section of sections) {
                            for (const existingField of ((_a = section.fields) !== null && _a !== void 0 ? _a : [])) {
                                if (guid_1.areEqual(existingField.guid, field.guid)) {
                                    activeZone.value = existingField.guid;
                                    editField.value = existingField;
                                    return;
                                }
                            }
                        }
                    };
                    const onAsideClose = () => {
                        if (!canCloseAside()) {
                            return;
                        }
                        activeZone.value = "";
                        editField.value = null;
                        sectionAsideSettings.value = null;
                    };
                    const onEditFieldUpdate = (value) => {
                        editField.value = value;
                        for (const section of sections) {
                            if (section.fields) {
                                const existingFieldIndex = section.fields.findIndex(f => guid_1.areEqual(f.guid, value.guid));
                                if (existingFieldIndex !== -1) {
                                    section.fields.splice(existingFieldIndex, 1, value);
                                    return;
                                }
                            }
                        }
                    };
                    const onFieldDelete = (guid) => __awaiter(this, void 0, void 0, function* () {
                        var _g, _h;
                        if (!(yield dialogs_1.confirmDelete("field"))) {
                            return;
                        }
                        for (const section of sections) {
                            if (section.fields) {
                                const existingFieldIndex = section.fields.findIndex(f => guid_1.areEqual(f.guid, guid));
                                if (existingFieldIndex !== -1) {
                                    section.fields.splice(existingFieldIndex, 1);
                                    break;
                                }
                            }
                        }
                        if (guid_1.areEqual(guid, (_h = (_g = editField.value) === null || _g === void 0 ? void 0 : _g.guid) !== null && _h !== void 0 ? _h : null)) {
                            closeAside();
                        }
                    });
                    const onEditSectionUpdate = (value) => {
                        sectionAsideSettings.value = value;
                        for (const section of sections) {
                            if (guid_1.areEqual(section.guid, value.guid)) {
                                section.title = value.title;
                                section.description = value.description;
                                section.showHeadingSeparator = value.showHeadingSeparator;
                                section.type = value.type;
                                return;
                            }
                        }
                    };
                    const onSectionDelete = (guid) => __awaiter(this, void 0, void 0, function* () {
                        var _j, _k;
                        if (!(yield dialogs_1.confirmDelete("section"))) {
                            return;
                        }
                        const existingSectionIndex = sections.findIndex(s => guid_1.areEqual(s.guid, guid));
                        if (existingSectionIndex !== -1) {
                            sections.splice(existingSectionIndex, 1);
                        }
                        if (guid_1.areEqual(guid, (_k = (_j = sectionAsideSettings.value) === null || _j === void 0 ? void 0 : _j.guid) !== null && _k !== void 0 ? _k : null)) {
                            closeAside();
                        }
                    });
                    const onEditPersonEntryUpdate = (value) => {
                        personEntryAsideSettings.value = value;
                    };
                    const onFormHeaderSave = () => {
                        formHeaderContent.value = formHeaderEditContent.value;
                        closeAside();
                    };
                    const onFormFooterSave = () => {
                        formFooterContent.value = formFooterEditContent.value;
                        closeAside();
                    };
                    vue_1.watch(bodyElement, () => {
                        var _a, _b, _c, _d;
                        sectionDragSourceOptions.mirrorContainer = (_a = bodyElement.value) !== null && _a !== void 0 ? _a : undefined;
                        sectionReorderDragSourceOptions.mirrorContainer = (_b = bodyElement.value) !== null && _b !== void 0 ? _b : undefined;
                        fieldDragSourceOptions.mirrorContainer = (_c = bodyElement.value) !== null && _c !== void 0 ? _c : undefined;
                        fieldReorderDragSourceOptions.mirrorContainer = (_d = bodyElement.value) !== null && _d !== void 0 ? _d : undefined;
                    });
                    vue_1.watch(() => props.templateOverrides, (newValue, oldValue) => {
                        var _a, _b;
                        if (((_a = newValue === null || newValue === void 0 ? void 0 : newValue.isPersonEntryConfigured) !== null && _a !== void 0 ? _a : false) !== ((_b = oldValue === null || oldValue === void 0 ? void 0 : oldValue.isPersonEntryConfigured) !== null && _b !== void 0 ? _b : false)) {
                            if (isPersonEntryActive.value) {
                                closeAside();
                            }
                        }
                    });
                    vue_1.watch([sections, formHeaderContent, formFooterContent, generalAsideSettings, personEntryAsideSettings], () => {
                        const newValue = {
                            allowPersonEntry: generalAsideSettings.value.hasPersonEntry,
                            campusSetFrom: generalAsideSettings.value.campusSetFrom,
                            footerContent: formFooterContent.value,
                            headerContent: formHeaderContent.value,
                            personEntry: personEntryAsideSettings.value,
                            sections: sections
                        };
                        emit("update:modelValue", newValue);
                    });
                    return {
                        activeZone,
                        availableFieldTypes,
                        bodyElement,
                        editField,
                        existingKeys,
                        fieldDragSourceOptions,
                        fieldDragTargetId: fieldDragSourceOptions.id,
                        fieldEditAsideComponentInstance,
                        fieldReorderDragSourceOptions,
                        formFooterContent,
                        formFooterEditContent,
                        formHeaderContent,
                        formHeaderEditContent,
                        generalAsideComponentInstance,
                        generalAsideSettings,
                        hasPersonEntry,
                        isFormFooterActive,
                        isFormHeaderActive,
                        isPersonEntryActive,
                        isPersonEntryForced,
                        onAsideClose,
                        onConfigureField,
                        onConfigureFormHeader,
                        onConfigureFormFooter,
                        onConfigurePersonEntry,
                        onConfigureSection,
                        onEditFieldUpdate,
                        onEditPersonEntryUpdate,
                        onEditSectionUpdate,
                        onFieldDelete,
                        onFormFooterSave,
                        onFormHeaderSave,
                        onSectionDelete,
                        personEntryAsideSettings,
                        personEntryEditAsideComponentInstance,
                        personEntryZoneIconClass,
                        sectionAsideSettings,
                        sectionDragSourceOptions,
                        sectionDragTargetId: sectionDragSourceOptions.id,
                        sectionReorderDragSourceOptions,
                        sectionTypeOptions,
                        sections,
                        showFieldAside,
                        showGeneralAside,
                        showPersonEntryAside,
                        showSectionAside,
                        templateFormFooterContent,
                        templateFormHeaderContent
                    };
                },
                template: `
<div ref="bodyElement" class="d-flex" style="flex-grow: 1; overflow-y: hidden;">
    <div class="d-flex flex-column" style="background-color: #f8f9fa; min-width: 320px; max-width: 480px; flex: 1 0; overflow-y: hidden;">
        <GeneralAside v-if="showGeneralAside"
            v-model="generalAsideSettings"
            ref="generalAsideComponentInstance"
            :isPersonEntryForced="isPersonEntryForced"
            :fieldTypes="availableFieldTypes"
            :sectionDragOptions="sectionDragSourceOptions"
            :fieldDragOptions="fieldDragSourceOptions" />

        <FieldEditAside v-else-if="showFieldAside"
            :modelValue="editField"
            ref="fieldEditAsideComponentInstance"
            :fieldTypes="availableFieldTypes"
            :existingKeys="existingKeys"
            @update:modelValue="onEditFieldUpdate"
            @close="onAsideClose" />

        <SectionEditAside v-else-if="showSectionAside"
            :modelValue="sectionAsideSettings"
            ref="sectionEditAsideComponentInstance"
            @update:modelValue="onEditSectionUpdate"
            @close="onAsideClose" />

        <PersonEntryEditAside v-else-if="showPersonEntryAside"
            :modelValue="personEntryAsideSettings"
            ref="personEntryEditAsideComponentInstance"
            @update:modelValue="onEditPersonEntryUpdate"
            @close="onAsideClose" />
    </div>

    <div class="p-3 d-flex flex-column" style="flex: 3 1; overflow-y: auto;">
        <FormContentZone v-if="templateFormHeaderContent" :modelValue="templateFormHeaderContent" placeholder="" iconCssClass="" />

        <FormContentZone :modelValue="formHeaderContent" :isActive="isFormHeaderActive" @configure="onConfigureFormHeader" placeholder="Form Header" />

        <ConfigurableZone v-if="hasPersonEntry" :modelValue="isPersonEntryActive" :iconCssClass="personEntryZoneIconClass" @configure="onConfigurePersonEntry">
            <div class="zone-body">
                <div class="text-center text-muted">Person Entry Form</div>
            </div>
        </ConfigurableZone>

        <div style="flex-grow: 1; display: flex; flex-direction: column;" v-drag-target="sectionDragTargetId" v-drag-source="sectionReorderDragSourceOptions" v-drag-target:2="sectionReorderDragSourceOptions.id">
            <SectionZone v-for="section in sections"
                :key="section.guid"
                v-model="section"
                :activeZone="activeZone"
                :dragTargetId="fieldDragTargetId"
                :reorderDragOptions="fieldReorderDragSourceOptions"
                :sectionTypeOptions="sectionTypeOptions"
                @configure="onConfigureSection(section)"
                @configureField="onConfigureField"
                @delete="onSectionDelete"
                @deleteField="onFieldDelete">
            </SectionZone>
        </div>

        <FormContentZone :modelValue="formFooterContent" :isActive="isFormFooterActive" @configure="onConfigureFormFooter" placeholder="Form Footer" />

        <FormContentZone v-if="templateFormFooterContent" :modelValue="templateFormFooterContent" placeholder="" iconCssClass="" />
    </div>
</div>

<FormContentModal v-model="formHeaderEditContent" v-model:isVisible="isFormHeaderActive" title="Form Header" @save="onFormHeaderSave" />

<FormContentModal v-model="formFooterEditContent" v-model:isVisible="isFormFooterActive" title="Form Footer" @save="onFormFooterSave" />
`
            }));
        }
    };
});
//# sourceMappingURL=formBuilderTab.js.map