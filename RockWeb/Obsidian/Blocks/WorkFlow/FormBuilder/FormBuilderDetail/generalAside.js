System.register(["vue", "../../../../Controls/rockField", "../../../../Directives/dragDrop", "../../../../Elements/alert", "../../../../Elements/dropDownList", "../../../../Elements/switch", "../../../../Services/number", "./configurableZone", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockField_1, dragDrop_1, alert_1, dropDownList_1, switch_1, number_1, configurableZone_1, utils_1, campusSetFromOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockField_1_1) {
                rockField_1 = rockField_1_1;
            },
            function (dragDrop_1_1) {
                dragDrop_1 = dragDrop_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (switch_1_1) {
                switch_1 = switch_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            campusSetFromOptions = [
                {
                    value: 0..toString(),
                    text: "Current Person"
                },
                {
                    value: 1..toString(),
                    text: "Workflow Person"
                },
                {
                    value: 2..toString(),
                    text: "Query String"
                }
            ];
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.GeneralAside",
                components: {
                    Alert: alert_1.default,
                    ConfigurableZone: configurableZone_1.default,
                    DropDownList: dropDownList_1.default,
                    RockField: rockField_1.default,
                    Switch: switch_1.default
                },
                directives: {
                    DragSource: dragDrop_1.DragSource
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    sectionDragOptions: {
                        type: Object,
                        required: true
                    },
                    fieldDragOptions: {
                        type: Object,
                        required: true
                    },
                    isPersonEntryForced: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                methods: {
                    isSafeToClose() {
                        return true;
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d;
                    const campusSetFrom = vue_1.ref((_b = (_a = props.modelValue.campusSetFrom) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
                    const hasPersonEntry = vue_1.ref((_c = props.modelValue.hasPersonEntry) !== null && _c !== void 0 ? _c : false);
                    const fieldTypes = (_d = utils_1.useFormSources().fieldTypes) !== null && _d !== void 0 ? _d : [];
                    const commonFieldTypes = vue_1.computed(() => {
                        return fieldTypes.filter(f => f.isCommon);
                    });
                    const advancedFieldTypes = vue_1.computed(() => {
                        return fieldTypes.filter(f => !f.isCommon);
                    });
                    let autoSyncModelValue = true;
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        autoSyncModelValue = false;
                        campusSetFrom.value = (_b = (_a = props.modelValue.campusSetFrom) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                        hasPersonEntry.value = (_c = props.modelValue.hasPersonEntry) !== null && _c !== void 0 ? _c : false;
                        autoSyncModelValue = true;
                    });
                    vue_1.watch([campusSetFrom, hasPersonEntry], () => {
                        var _a;
                        if (!autoSyncModelValue) {
                            return;
                        }
                        const value = {
                            campusSetFrom: (_a = number_1.toNumberOrNull(campusSetFrom.value)) !== null && _a !== void 0 ? _a : undefined,
                            hasPersonEntry: hasPersonEntry.value
                        };
                        emit("update:modelValue", value);
                    });
                    return {
                        advancedFieldTypes,
                        campusSetFrom,
                        campusSetFromOptions,
                        commonFieldTypes,
                        hasPersonEntry,
                    };
                },
                template: `
<div class="d-flex flex-column" style="overflow-y: hidden; flex-grow: 1;">
    <div class="p-2 aside-header" style="border-right: 1px solid #dfe0e1; border-bottom: 1px solid #dfe0e1;">
        <span class="title">Field List</span>
    </div>

    <div class="aside-body d-flex flex-column" style="flex-grow: 1; overflow-y: auto;">
        <div class="mt-3" v-drag-source="sectionDragOptions">
            <div class="form-template-item form-template-item-section">
                <i class="fa fa-expand fa-fw"></i>
                Section
            </div>
        </div>

        <div class="mt-3" style="flex-grow: 1;">
            <RockLabel>Field Types</RockLabel>

            <div class="d-flex flex-wrap mt-1" style="overflow-x: clip; margin-right: -5px;" v-drag-source="fieldDragOptions">
                <div v-for="field in commonFieldTypes" class="form-template-item form-template-item-field" :data-field-type="field.guid">
                    <i :class="field.icon + ' fa-fw'"></i>
                    <div class="text">{{ field.text }}</div>
                </div>
            </div>

            <div class="text-semibold text-sm mt-2">More Fields</div>

            <div class="d-flex flex-wrap mt-1" style="overflow-x: clip; margin-right: -5px;" v-drag-source="fieldDragOptions">
                <div v-for="field in advancedFieldTypes" class="form-template-item form-template-item-field" :data-field-type="field.guid">
                    <i :class="field.icon + ' fa-fw'"></i>
                    <div class="text">{{ field.text }}</div>
                </div>
            </div>
        </div>

        <div class="mt-3">
            <Switch v-if="!isPersonEntryForced" v-model="hasPersonEntry" text="Enable Person Entry" />

            <Alert v-else alertType="info">
                Person entry is enabled on the template and cannot be changed.
            </Alert>

            <DropDownList v-model="campusSetFrom" label="Campus Set From" :options="campusSetFromOptions" />
        </div>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=generalAside.js.map