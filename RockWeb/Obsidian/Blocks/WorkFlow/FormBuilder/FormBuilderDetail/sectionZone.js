System.register(["vue", "../../../../Controls/rockField", "../../../../Directives/dragDrop", "../../../../Util/guid", "./configurableZone"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockField_1, dragDrop_1, guid_1, configurableZone_1, fieldWrapper;
    var __moduleName = context_1 && context_1.id;
    function getAttributeValueFromField(field) {
        var _a, _b, _c;
        return {
            attributeGuid: guid_1.newGuid(),
            fieldTypeGuid: field.fieldTypeGuid,
            name: !((_a = field.isHideLabel) !== null && _a !== void 0 ? _a : false) ? field.name : "",
            key: field.key,
            configurationValues: field.configurationValues,
            value: field.defaultValue,
            isRequired: (_b = field.isRequired) !== null && _b !== void 0 ? _b : false,
            description: (_c = field.description) !== null && _c !== void 0 ? _c : "",
            order: 0,
            categories: []
        };
    }
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
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (configurableZone_1_1) {
                configurableZone_1 = configurableZone_1_1;
            }
        ],
        execute: function () {
            fieldWrapper = vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.SectionZone.FieldWrapper",
                components: {
                    RockField: rockField_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    }
                },
                setup(props) {
                    const attributeValue = vue_1.ref(getAttributeValueFromField(props.modelValue));
                    vue_1.watch(() => props.modelValue, () => {
                        attributeValue.value = getAttributeValueFromField(props.modelValue);
                    }, {
                        deep: true
                    });
                    return {
                        attributeValue
                    };
                },
                template: `
<RockField :attributeValue="attributeValue" isEditMode />
`
            });
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.SectionZone",
                components: {
                    ConfigurableZone: configurableZone_1.default,
                    RockField: rockField_1.default,
                    FieldWrapper: fieldWrapper
                },
                directives: {
                    DragSource: dragDrop_1.DragSource,
                    DragTarget: dragDrop_1.DragTarget
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    dragTargetId: {
                        type: String,
                        required: true
                    },
                    reorderDragOptions: {
                        type: Object,
                        required: true
                    },
                    activeZone: {
                        type: String,
                        required: false
                    },
                    sectionTypeOptions: {
                        type: Array,
                        default: []
                    }
                },
                emits: [
                    "configureField",
                    "delete",
                    "deleteField"
                ],
                setup(props, { emit }) {
                    const sectionGuid = vue_1.ref(props.modelValue.guid);
                    const title = vue_1.ref(props.modelValue.title);
                    const description = vue_1.ref(props.modelValue.description);
                    const showSeparator = vue_1.ref(props.modelValue.showHeadingSeparator);
                    const sectionType = vue_1.ref(props.modelValue.type);
                    const fields = vue_1.ref(props.modelValue.fields);
                    const sectionTypeClass = vue_1.computed(() => {
                        var _a;
                        if (sectionType.value) {
                            const sectionTypeValue = sectionType.value;
                            const matches = props.sectionTypeOptions.filter(t => guid_1.areEqual(sectionTypeValue, t.value));
                            if (matches.length > 0) {
                                return (_a = matches[0].category) !== null && _a !== void 0 ? _a : "";
                            }
                        }
                        return "";
                    });
                    const isSectionActive = vue_1.computed(() => props.activeZone === sectionGuid.value);
                    const getFieldColumnSize = (field) => `flex-col flex-col-${field.size}`;
                    const isFieldActive = (field) => {
                        return field.guid === props.activeZone;
                    };
                    const onConfigureField = (field) => {
                        emit("configureField", field);
                    };
                    const onDelete = () => {
                        emit("delete", props.modelValue.guid);
                    };
                    const onDeleteField = (field) => {
                        emit("deleteField", field.guid);
                    };
                    vue_1.watch(() => [props.modelValue.guid, props.modelValue.title, props.modelValue.description, props.modelValue.showHeadingSeparator, props.modelValue.type, props.modelValue.fields], () => {
                        console.log("section changed");
                        sectionGuid.value = props.modelValue.guid;
                        title.value = props.modelValue.title;
                        description.value = props.modelValue.description;
                        showSeparator.value = props.modelValue.showHeadingSeparator;
                        sectionType.value = props.modelValue.type;
                        fields.value = props.modelValue.fields;
                    });
                    return {
                        description,
                        fields,
                        getFieldColumnSize,
                        isFieldActive,
                        isSectionActive,
                        onConfigureField,
                        onDelete,
                        onDeleteField,
                        sectionGuid,
                        sectionTypeClass,
                        showSeparator,
                        title
                    };
                },
                template: `
<ConfigurableZone class="zone-section" :modelValue="isSectionActive">
    <div class="zone-body d-flex flex-column" style="min-height: 100%;">
        <div class="d-flex flex-column" :class="sectionTypeClass" style="flex-grow: 1;">
            <div>
                <h1 v-if="title">{{ title }}</h1>
                <div v-if="description" class="mb-2">{{ description }}</div>
                <hr v-if="showSeparator" />
            </div>

            <div class="form-section" v-drag-source="reorderDragOptions" v-drag-target="reorderDragOptions.id" v-drag-target:2="dragTargetId" :data-section-id="sectionGuid">
                <ConfigurableZone v-for="field in fields" :key="field.guid" :modelValue="isFieldActive(field)" :class="getFieldColumnSize(field)" :data-field-id="field.guid" @configure="onConfigureField(field)">
                    <div class="zone-body">
                        <FieldWrapper :modelValue="field" />
                    </div>

                    <template #preActions>
                        <i class="fa fa-bars fa-fw zone-action zone-action-move"></i>
                        <span class="zone-action-pad"></span>
                    </template>
                    <template #postActions>
                        <i class="fa fa-times fa-fw zone-action" @click.stop="onDeleteField(field)"></i>
                    </template>
                </ConfigurableZone>
            </div>
        </div>
    </div>
    <template #preActions>
        <i class="fa fa-bars fa-fw zone-action zone-action-move"></i>
        <span class="zone-action-pad"></span>
    </template>
    <template #postActions>
        <i class="fa fa-times fa-fw zone-action" @click.stop="onDelete"></i>
    </template>
</ConfigurableZone>
`
            }));
        }
    };
});
//# sourceMappingURL=sectionZone.js.map