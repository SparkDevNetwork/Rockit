System.register(['tslib', 'vue', '@Obsidian/Templates/block', '@Obsidian/Controls/loading', '@Obsidian/Controls/alert', '@Obsidian/PageState', '@Obsidian/Utility/block', '@Obsidian/Controls/javaScriptAnchor', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/textBox', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Utility/linq'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, Block, Loading, Alert, useStore, useConfigurationValues, useInvokeBlockAction, JavaScriptAnchor, RockForm, TextBox, RockButton, AttributeValuesContainer;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            Loading = module["default"];
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            useConfigurationValues = module.useConfigurationValues;
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            JavaScriptAnchor = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function () {}],
        execute: (function () {

            const store = useStore();
            var attributeValues = exports('default', defineComponent({
                name: "Crm.AttributeValues",
                components: {
                    Alert,
                    Block,
                    Loading,
                    JavaScriptAnchor,
                    RockForm,
                    TextBox,
                    RockButton,
                    AttributeValuesContainer
                },
                setup() {
                    const configurationValues = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const attributes = ref(configurationValues.attributes);
                    const attributeValues = ref(configurationValues.values);
                    computed(() => { var _a; return ((_a = store.personContext) === null || _a === void 0 ? void 0 : _a.idKey) || null; });
                    const isLoading = ref(false);
                    const isEditMode = ref(false);
                    const errorMessage = ref("");
                    const goToViewMode = () => {
                        isEditMode.value = false;
                    };
                    const goToEditMode = () => __awaiter(this, void 0, void 0, function* () {
                        const result = yield invokeBlockAction("GetAttributeValuesForEdit");
                        if (result.isSuccess) {
                            isEditMode.value = true;
                        }
                    });
                    const doSave = () => __awaiter(this, void 0, void 0, function* () {
                        isLoading.value = true;
                        isLoading.value = false;
                    });
                    return {
                        blockTitle: computed(() => configurationValues.blockTitle),
                        blockIconCssClass: computed(() => configurationValues.blockIconCssClass),
                        isLoading,
                        isEditMode,
                        errorMessage,
                        goToViewMode,
                        goToEditMode,
                        doSave,
                        useAbbreviatedNames: configurationValues.useAbbreviatedNames,
                        attributes,
                        attributeValues
                    };
                },
                template: `
<Block :title="blockTitle">
    <template #headerActions>
        <JavaScriptAnchor title="Order Attributes" class="action btn-link edit">
            <i class="fa fa-bars"></i>
        </JavaScriptAnchor>
        <JavaScriptAnchor title="Edit Attributes" class="action btn-link edit" @click="goToEditMode">
            <i class="fa fa-pencil"></i>
        </JavaScriptAnchor>
    </template>

    <template #default>
        <Loading :isLoading="isLoading">
            <Alert v-if="errorMessage" alertType="warning">{{ errorMessage }}</Alert>
            <AttributeValuesContainer v-if="!isEditMode" :attributeValues="attributeValues" :showEmptyValues="false" :showCategoryLabel="false" />
            <RockForm v-else @submit="doSave">
                <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :showAbbreviatedName="useAbbreviatedNames" :showCategoryLabel="false" />
                <div class="actions">
                    <RockButton btnType="primary" btnSize="xs" type="submit">Save</RockButton>
                    <RockButton btnType="link" btnSize="xs" @click="goToViewMode">Cancel</RockButton>
                </div>
            </RockForm>
        </Loading>
    </template>
</Block>`
            }));

        })
    };
}));
