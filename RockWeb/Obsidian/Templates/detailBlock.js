System.register(['tslib', 'vue', '@Obsidian/Controls/panel', '@Obsidian/Controls/modal', '@Obsidian/Utility/promiseUtils', '@Obsidian/Controls/auditDetail', '@Obsidian/Controls/badgeList', '@Obsidian/Controls/entityTagList', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/rockSuspense', '@Obsidian/Utility/component', '@Obsidian/Utility/dialogs', '@Obsidian/Utility/http'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, Panel, Modal, isPromise, PromiseCompletionSource, AuditDetail, BadgeList, EntityTagList, RockButton, RockForm, RockSuspense, useVModelPassthrough, alert, confirmDelete, useHttp;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            Modal = module["default"];
        }, function (module) {
            isPromise = module.isPromise;
            PromiseCompletionSource = module.PromiseCompletionSource;
        }, function (module) {
            AuditDetail = module["default"];
        }, function (module) {
            BadgeList = module["default"];
        }, function (module) {
            EntityTagList = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            RockSuspense = module["default"];
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function (module) {
            alert = module.alert;
            confirmDelete = module.confirmDelete;
        }, function (module) {
            useHttp = module.useHttp;
        }],
        execute: (function () {

            var detailBlock = exports('default', defineComponent({
                name: "DetailBlock",
                components: {
                    AuditDetail,
                    EntityTagList,
                    Modal,
                    Panel,
                    RockButton,
                    RockForm,
                    RockSuspense,
                    BadgeList
                },
                props: {
                    name: {
                        type: String,
                        required: false
                    },
                    title: {
                        type: String,
                        required: false
                    },
                    entityTypeGuid: {
                        type: String,
                        required: true
                    },
                    entityTypeName: {
                        type: String,
                        required: true
                    },
                    entityKey: {
                        type: String,
                        required: false
                    },
                    isTagsVisible: {
                        type: Boolean,
                        default: false
                    },
                    isFollowVisible: {
                        type: Boolean,
                        default: false
                    },
                    isBadgesVisible: {
                        type: Boolean,
                        default: false
                    },
                    isAuditHidden: {
                        type: Boolean,
                        default: false
                    },
                    isSecurityHidden: {
                        type: Boolean,
                        default: false
                    },
                    isEditVisible: {
                        type: Boolean,
                        default: false
                    },
                    isDeleteVisible: {
                        type: Boolean,
                        default: false
                    },
                    mode: {
                        type: Number,
                        default: 0
                    },
                    headerActions: {
                        type: Array,
                        required: false
                    },
                    headerSecondaryActions: {
                        type: Array,
                        required: false
                    },
                    labels: {
                        type: Array,
                        required: false
                    },
                    footerActions: {
                        type: Array,
                        required: false
                    },
                    footerSecondaryActions: {
                        type: Array,
                        required: false
                    },
                    onCancelEdit: {
                        type: Function,
                        required: false
                    },
                    onEdit: {
                        type: Function,
                        required: false
                    },
                    onSave: {
                        type: Function,
                        required: false
                    },
                    onDelete: {
                        type: Function,
                        required: false
                    }
                },
                emits: {
                    "update:mode": (_value) => true
                },
                setup(props, { emit }) {
                    const http = useHttp();
                    const internalMode = useVModelPassthrough(props, "mode", emit);
                    const isFormSubmitting = ref(false);
                    const isEditModeLoading = ref(false);
                    const isEntityFollowed = ref(null);
                    const showAuditDetailsModal = ref(false);
                    let formSubmissionSource = null;
                    let editModeReadyCompletionSource = null;
                    const panelTitle = computed(() => {
                        var _a;
                        if (props.title) {
                            return props.title;
                        }
                        switch (internalMode.value) {
                            case 0:
                                return (_a = props.name) !== null && _a !== void 0 ? _a : props.entityTypeName;
                            case 1:
                            case 2:
                            default:
                                return props.entityTypeName;
                        }
                    });
                    const panelTitleIconCssClass = computed(() => {
                        switch (internalMode.value) {
                            case 1:
                                return "fa fa-pencil";
                            case 2:
                                return "fa fa-plus";
                            case 0:
                            default:
                                return "";
                        }
                    });
                    const internalHeaderSecondaryActions = computed(() => {
                        const actions = [];
                        if (!props.isAuditHidden) {
                            actions.push({
                                type: "default",
                                title: "Audit Details",
                                handler: onAuditClick
                            });
                        }
                        if (props.headerSecondaryActions) {
                            for (const action of props.headerSecondaryActions) {
                                actions.push(action);
                            }
                        }
                        return actions;
                    });
                    const internalFooterSecondaryActions = computed(() => {
                        const actions = [];
                        if (!props.isSecurityHidden && isViewMode.value && props.entityKey) {
                            actions.push({
                                iconCssClass: "fa fa-lock",
                                title: "Edit Security",
                                type: "default",
                                handler: onSecurityClick
                            });
                        }
                        if (props.footerSecondaryActions) {
                            for (const action of props.footerSecondaryActions) {
                                actions.push(action);
                            }
                        }
                        return actions;
                    });
                    const isViewMode = computed(() => {
                        return internalMode.value === 0;
                    });
                    const isEditMode = computed(() => {
                        return internalMode.value === 1 || internalMode.value === 2;
                    });
                    const isEditModeVisible = computed(() => {
                        return isEditMode.value || isEditModeLoading.value;
                    });
                    const hasLabels = computed(() => {
                        return !!props.labels && props.labels.length > 0;
                    });
                    const headerActions = computed(() => {
                        var _a;
                        const actions = [...(_a = props.headerActions) !== null && _a !== void 0 ? _a : []];
                        if (props.isFollowVisible && isViewMode.value) {
                            actions.push({
                                type: isEntityFollowed.value ? "primary" : "default",
                                iconCssClass: isEntityFollowed.value ? "fa fa-star" : "fa fa-star-o",
                                handler: onFollowClick,
                                title: isEntityFollowed.value ? `You are currently following ${props.name}.` : `Click to follow ${props.name}.`
                            });
                        }
                        return actions;
                    });
                    const getClassForIconAction = (action) => {
                        let cssClass = action.handler ? "action clickable" : "action";
                        if (action.type !== "default" && action.type !== "link") {
                            cssClass += ` text-${action.type}`;
                        }
                        return cssClass;
                    };
                    const getClassForLabelAction = (action) => {
                        let cssClass = action.handler ? "label clickable" : "label";
                        if (action.type === "link") {
                            cssClass += " label-default";
                        }
                        else {
                            cssClass += ` label-${action.type}`;
                        }
                        return cssClass;
                    };
                    const getActionIconCssClass = (action) => {
                        return action.iconCssClass || "fa fa-square";
                    };
                    const getEntityFollowedState = () => __awaiter(this, void 0, void 0, function* () {
                        if (!props.entityTypeGuid || !props.entityKey) {
                            isEntityFollowed.value = null;
                            return;
                        }
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey
                        };
                        const response = yield http.post("/api/v2/Controls/FollowingGetFollowing", undefined, data);
                        isEntityFollowed.value = response.isSuccess && response.data && response.data.isFollowing;
                    });
                    const onSecurityClick = (event) => {
                        Rock.controls.modal.show($(event.target), `/Secure/${props.entityTypeGuid}/${props.entityKey}?t=Secure ${props.entityTypeName}&pb=&sb=Done`);
                    };
                    const onEditCancelClick = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.onCancelEdit) {
                            let result = props.onCancelEdit();
                            if (isPromise(result)) {
                                result = yield result;
                            }
                            if (result === false) {
                                return;
                            }
                        }
                        internalMode.value = 0;
                    });
                    const onEditClick = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.onEdit) {
                            let result = props.onEdit();
                            if (isPromise(result)) {
                                result = yield result;
                            }
                            if (result !== true) {
                                return;
                            }
                        }
                        isEditModeLoading.value = true;
                        editModeReadyCompletionSource = new PromiseCompletionSource();
                        yield editModeReadyCompletionSource.promise;
                        internalMode.value = props.entityKey ? 1 : 2;
                        isEditModeLoading.value = false;
                        editModeReadyCompletionSource = null;
                    });
                    const onEditSuspenseReady = () => {
                        editModeReadyCompletionSource === null || editModeReadyCompletionSource === void 0 ? void 0 : editModeReadyCompletionSource.resolve();
                    };
                    const onSaveClick = () => __awaiter(this, void 0, void 0, function* () {
                        formSubmissionSource = new PromiseCompletionSource();
                        isFormSubmitting.value = true;
                        yield formSubmissionSource.promise;
                    });
                    const onSaveSubmit = () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (props.onSave) {
                                let result = props.onSave();
                                if (isPromise(result)) {
                                    result = yield result;
                                }
                                if (result !== true) {
                                    return;
                                }
                            }
                        }
                        finally {
                            if (formSubmissionSource !== null) {
                                formSubmissionSource.resolve();
                            }
                        }
                        internalMode.value = 0;
                    });
                    const onDeleteClick = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.onDelete) {
                            if (!(yield confirmDelete(props.entityTypeName))) {
                                return;
                            }
                            const result = props.onDelete();
                            if (isPromise(result)) {
                                yield result;
                            }
                        }
                    });
                    const onActionClick = (action, event) => {
                        if (action.handler && !action.disabled) {
                            action.handler(event);
                        }
                    };
                    const onFollowClick = () => __awaiter(this, void 0, void 0, function* () {
                        if (isEntityFollowed.value === null || !props.entityTypeGuid || !props.entityKey) {
                            return;
                        }
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            isFollowing: !isEntityFollowed.value
                        };
                        const response = yield http.post("/api/v2/Controls/FollowingSetFollowing", undefined, data);
                        if (response.isSuccess) {
                            isEntityFollowed.value = !isEntityFollowed.value;
                        }
                        else {
                            yield alert("Unable to update followed state.");
                        }
                    });
                    const onAuditClick = () => __awaiter(this, void 0, void 0, function* () {
                        showAuditDetailsModal.value = true;
                    });
                    watch(isFormSubmitting, () => {
                        if (isFormSubmitting.value === false && formSubmissionSource !== null) {
                            formSubmissionSource.resolve();
                        }
                    });
                    watch(() => props.isFollowVisible, () => {
                        if (props.isFollowVisible && isEntityFollowed.value === null) {
                            getEntityFollowedState();
                        }
                    });
                    if (props.isFollowVisible) {
                        getEntityFollowedState();
                    }
                    return {
                        hasLabels,
                        internalFooterSecondaryActions,
                        internalHeaderSecondaryActions,
                        panelTitle,
                        panelTitleIconCssClass,
                        getActionIconCssClass,
                        getClassForIconAction,
                        getClassForLabelAction,
                        headerActions,
                        isEditMode,
                        isEditModeVisible,
                        isFormSubmitting,
                        isViewMode,
                        onActionClick,
                        onDeleteClick,
                        onEditCancelClick,
                        onEditClick,
                        onEditSuspenseReady,
                        onSaveClick,
                        onSaveSubmit,
                        showAuditDetailsModal
                    };
                },
                template: `
<Panel type="block"
    :title="panelTitle"
    :titleIconCssClass="panelTitleIconCssClass"
    :hasFullscreen="true"
    :headerSecondaryActions="internalHeaderSecondaryActions">

    <template #headerActions>
        <span v-for="action in headerActions" :class="getClassForIconAction(action)" :title="action.title" @click="onActionClick(action, $event)">
            <i :class="getActionIconCssClass(action)"></i>
        </span>
    </template>

    <template v-if="!isEditMode && (hasLabels || isTagsVisible)" #subheaderLeft>
        <div class="d-flex">
            <div v-if="hasLabels" class="label-group">
                <span v-for="action in labels" :class="getClassForLabelAction(action)" @click="onActionClick(action, $event)">
                    <template v-if="action.title">{{ action.title }}</template>
                    <i v-else :class="action.iconCssClass"></i>
                </span>
            </div>

            <div v-if="isTagsVisible && hasLabels" style="width: 2px; background-color: #eaedf0; margin: 0px 12px;"></div>

            <div v-if="isTagsVisible" class="flex-grow-1">
                <EntityTagList :entityTypeGuid="entityTypeGuid" :entityKey="entityKey" />
            </div>
        </div>
    </template>

    <template v-if="!isEditMode && isBadgesVisible" #subheaderRight>
        <BadgeList :entityTypeGuid="entityTypeGuid" :entityKey="entityKey" />
    </template>

    <template v-if="$slots.helpContent" #helpContent>
        <slot name="helpContent" />
    </template>

    <template #footerActions>
        <template v-if="isEditMode">
            <RockButton btnType="primary" autoDisable @click="onSaveClick">Save</RockButton>
            <RockButton btnType="link" @click="onEditCancelClick">Cancel</RockButton>
        </template>

        <template v-else>
            <RockButton v-if="isEditVisible" btnType="primary" @click="onEditClick" autoDisable>Edit</RockButton>
            <RockButton v-if="isDeleteVisible" btnType="link" @click="onDeleteClick" autoDisable>Delete</RockButton>
        </template>

        <RockButton v-for="action in footerActions" :btnType="action.type" @click="onActionClick(action, $event)">
            <template v-if="action.title">{{ action.title }}</template>
            <i v-else :class="action.iconCssClass"></i>
        </RockButton>
    </template>

    <template #footerSecondaryActions>
        <RockButton v-for="action in internalFooterSecondaryActions" :btnType="action.type" btnSize="sm" :title="action.title" @click="onActionClick(action, $event)" :disabled="action.disabled">
            <i :class="getActionIconCssClass(action)"></i>
        </RockButton>
    </template>

    <template #default>
        <v-style>
            .panel-flex .label-group > .label + * {
                margin-left: 8px;
            }
        </v-style>

        <RockForm v-if="isEditModeVisible" v-show="isEditMode" @submit="onSaveSubmit" v-model:submit="isFormSubmitting">
            <RockSuspense @ready="onEditSuspenseReady">
                <slot name="edit" />
            </RockSuspense>
        </RockForm>

        <slot v-if="isViewMode" name="view" />
    </template>
</Panel>

<Modal v-model="showAuditDetailsModal" title="Audit Details">
    <AuditDetail :entityTypeGuid="entityTypeGuid" :entityKey="entityKey" />
</Modal>
`
            }));

        })
    };
}));
