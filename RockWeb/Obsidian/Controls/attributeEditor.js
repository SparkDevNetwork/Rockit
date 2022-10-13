System.register(['vue', './checkBox.js', './textBox.js', './categoryPicker.js', './fieldTypeEditor.js', './staticFormControl.js', './panelWidget.js', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', '@Obsidian/Utility/treeItemProviders', './treeItemPicker.js', './rockButton.js', 'tslib', '@Obsidian/Utility/promiseUtils', './treeList.js', './rockField.js', '@Obsidian/Utility/fieldTypes', './alert.js', './dropDownList.js', 'ant-design-vue', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils', '@Obsidian/Utility/http'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, CheckBox, TextBox, CategoryPicker, FieldTypeEditor, StaticFormControl, PanelWidget;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            CategoryPicker = module["default"];
        }, function (module) {
            FieldTypeEditor = module["default"];
        }, function (module) {
            StaticFormControl = module["default"];
        }, function (module) {
            PanelWidget = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var attributeEditor = exports('default', defineComponent({
                name: "AttributeEditor",
                components: {
                    CategoryPicker,
                    CheckBox,
                    FieldTypeEditor,
                    PanelWidget,
                    StaticFormControl,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: null
                    },
                    attributeEntityTypeGuid: {
                        type: String,
                        default: ""
                    },
                    isAnalyticsVisible: {
                        type: Boolean,
                        default: false
                    },
                    isShowInGridVisible: {
                        type: Boolean,
                        default: true
                    },
                    isShowOnBulkVisible: {
                        type: Boolean,
                        default: true
                    },
                    isAllowSearchVisible: {
                        type: Boolean,
                        default: false
                    },
                    isIndexingEnabledVisible: {
                        type: Boolean,
                        default: false
                    },
                    reservedKeyNames: {
                        type: Array,
                        default: []
                    }
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
                    const attributeName = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "");
                    const abbreviatedName = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.abbreviatedName) !== null && _d !== void 0 ? _d : "");
                    const attributeKey = ref((_f = (_e = props.modelValue) === null || _e === void 0 ? void 0 : _e.key) !== null && _f !== void 0 ? _f : "");
                    const description = ref((_h = (_g = props.modelValue) === null || _g === void 0 ? void 0 : _g.description) !== null && _h !== void 0 ? _h : "");
                    const isSystem = ref((_k = (_j = props.modelValue) === null || _j === void 0 ? void 0 : _j.isSystem) !== null && _k !== void 0 ? _k : false);
                    const isActive = ref((_m = (_l = props.modelValue) === null || _l === void 0 ? void 0 : _l.isActive) !== null && _m !== void 0 ? _m : true);
                    const isPublic = ref((_p = (_o = props.modelValue) === null || _o === void 0 ? void 0 : _o.isPublic) !== null && _p !== void 0 ? _p : false);
                    const isRequired = ref((_r = (_q = props.modelValue) === null || _q === void 0 ? void 0 : _q.isRequired) !== null && _r !== void 0 ? _r : false);
                    const isShowOnBulk = ref((_t = (_s = props.modelValue) === null || _s === void 0 ? void 0 : _s.isShowOnBulk) !== null && _t !== void 0 ? _t : false);
                    const isShowInGrid = ref((_v = (_u = props.modelValue) === null || _u === void 0 ? void 0 : _u.isShowInGrid) !== null && _v !== void 0 ? _v : false);
                    const isHistoryEnabled = ref((_x = (_w = props.modelValue) === null || _w === void 0 ? void 0 : _w.isEnableHistory) !== null && _x !== void 0 ? _x : false);
                    const isAllowSearch = ref((_z = (_y = props.modelValue) === null || _y === void 0 ? void 0 : _y.isAllowSearch) !== null && _z !== void 0 ? _z : false);
                    const isIndexingEnabled = ref((_1 = (_0 = props.modelValue) === null || _0 === void 0 ? void 0 : _0.isIndexEnabled) !== null && _1 !== void 0 ? _1 : false);
                    const isAnalyticsEnabled = ref((_3 = (_2 = props.modelValue) === null || _2 === void 0 ? void 0 : _2.isAnalytic) !== null && _3 !== void 0 ? _3 : false);
                    const isAnalyticsHistoryEnabled = ref((_5 = (_4 = props.modelValue) === null || _4 === void 0 ? void 0 : _4.isAnalyticHistory) !== null && _5 !== void 0 ? _5 : false);
                    const preHtml = ref((_7 = (_6 = props.modelValue) === null || _6 === void 0 ? void 0 : _6.preHtml) !== null && _7 !== void 0 ? _7 : "");
                    const postHtml = ref((_9 = (_8 = props.modelValue) === null || _8 === void 0 ? void 0 : _8.postHtml) !== null && _9 !== void 0 ? _9 : "");
                    const categories = ref([...((_11 = (_10 = props.modelValue) === null || _10 === void 0 ? void 0 : _10.categories) !== null && _11 !== void 0 ? _11 : [])]);
                    const fieldTypeValue = ref({
                        fieldTypeGuid: (_13 = (_12 = props.modelValue) === null || _12 === void 0 ? void 0 : _12.fieldTypeGuid) !== null && _13 !== void 0 ? _13 : "",
                        configurationValues: Object.assign({}, ((_15 = (_14 = props.modelValue) === null || _14 === void 0 ? void 0 : _14.configurationValues) !== null && _15 !== void 0 ? _15 : {})),
                        defaultValue: (_17 = (_16 = props.modelValue) === null || _16 === void 0 ? void 0 : _16.defaultValue) !== null && _17 !== void 0 ? _17 : ""
                    });
                    const categoryQualifierValue = computed(() => {
                        if (props.attributeEntityTypeGuid) {
                            return `{EL:${"A2277FBA-D09F-4D07-B0AB-1C650C25A7A7"}:${props.attributeEntityTypeGuid}}`;
                        }
                        else {
                            return "";
                        }
                    });
                    const isFieldTypeReadOnly = computed(() => { var _a; return !!((_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.guid); });
                    watch([
                        attributeName,
                        abbreviatedName,
                        attributeKey,
                        description,
                        isActive,
                        isPublic,
                        isRequired,
                        isShowOnBulk,
                        isShowInGrid,
                        isAllowSearch,
                        isAnalyticsHistoryEnabled,
                        isAnalyticsHistoryEnabled,
                        isHistoryEnabled,
                        isIndexingEnabled,
                        preHtml,
                        postHtml,
                        categories,
                        fieldTypeValue
                    ], () => {
                        var _a;
                        const newModelValue = Object.assign(Object.assign({}, ((_a = props.modelValue) !== null && _a !== void 0 ? _a : { isSystem: false })), { name: attributeName.value, abbreviatedName: abbreviatedName.value, key: attributeKey.value, description: description.value, isActive: isActive.value, isPublic: isPublic.value, isRequired: isRequired.value, isShowOnBulk: isShowOnBulk.value, isShowInGrid: isShowInGrid.value, isAllowSearch: isAllowSearch.value, isAnalytic: isAnalyticsEnabled.value, isAnalyticHistory: isAnalyticsHistoryEnabled.value, isEnableHistory: isHistoryEnabled.value, isIndexEnabled: isIndexingEnabled.value, preHtml: preHtml.value, postHtml: postHtml.value, categories: [...categories.value], fieldTypeGuid: fieldTypeValue.value.fieldTypeGuid, configurationValues: Object.assign({}, fieldTypeValue.value.configurationValues), defaultValue: fieldTypeValue.value.defaultValue });
                        emit("update:modelValue", newModelValue);
                    });
                    return {
                        abbreviatedName,
                        attributeEntityTypeGuid: "5997C8D3-8840-4591-99A5-552919F90CBD",
                        attributeName,
                        attributeKey,
                        categoryQualifierValue,
                        description,
                        categories,
                        fieldTypeValue,
                        isActive,
                        isAllowSearch,
                        isAnalyticsEnabled,
                        isAnalyticsHistoryEnabled,
                        isFieldTypeReadOnly,
                        isHistoryEnabled,
                        isIndexingEnabled,
                        isPublic,
                        isRequired,
                        isShowInGrid,
                        isShowOnBulk,
                        isSystem,
                        preHtml,
                        postHtml
                    };
                },
                template: `
<fieldset>
    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="attributeName"
                label="Name"
                rules="required" />
        </div>

        <div class="col-md-6">
            <CheckBox v-model="isActive"
                label="Active"
                help="Set to Inactive to exclude this attribute from Edit and Display UIs."
                text="Yes" />
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <TextBox v-model="abbreviatedName"
                label="Abbreviated Name" />
        </div>

        <div class="col-md-6">
            <CheckBox v-model="isPublic"
                label="Public"
                help="Set to public if you want this attribute to be displayed in public contexts."
                text="Yes" />
        </div>
    </div>

    <TextBox v-model="description"
        label="Description"
        textMode="multiline" />

    <div class="row">
        <div class="col-md-6">
            <CategoryPicker v-model="categories"
                label="Categories"
                :entityTypeGuid="attributeEntityTypeGuid"
                entityTypeQualifierColumn="EntityTypeId"
                :entityTypeQualifierValue="categoryQualifierValue"
                multiple />

            <StaticFormControl v-if="isSystem" v-model="attributeKey" label="Key" />
            <TextBox v-else v-model="attributeKey" label="Key" rules="required" :disabled="keyDisabledAttr" />

            <div class="row">
                <div class="col-sm-6">
                    <CheckBox v-model="isRequired"
                        label="Required"
                        text="Yes" />
                </div>

                <div class="col-sm-6">
                    <CheckBox v-if="isShowOnBulkVisible"
                        v-model="isShowOnBulk"
                        label="Show on Bulk"
                        help="If selected, this attribute will be shown with bulk update attributes."
                        text="Yes" />
                </div>

                <div class="col-sm-6">
                    <CheckBox v-if="isShowInGridVisible"
                        v-model="isShowInGrid"
                        label="Show in Grid"
                        help="If selected, this attribute will be included in a grid."
                        text="Yes" />
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <FieldTypeEditor v-model="fieldTypeValue" :isFieldTypeReadOnly="isFieldTypeReadOnly" />
        </div>
    </div>

    <PanelWidget>
        <template #header>Advanced Settings</template>
        <div class="row">
            <div class="col-md-6">
                <CheckBox label="Enable History"
                    v-model="isHistoryEnabled"
                    help="If selected, changes to the value of this attribute will be stored in attribute value history."
                    text="Yes" />

                <CheckBox v-if="isAllowSearchVisible"
                    label="Allow Search"
                    v-model="isAllowSearch"
                    help="If selected, this attribute can be searched on."
                    text="Yes" />

                <CheckBox v-if="isIndexingEnabledVisible"
                    label="Indexing Enabled"
                    v-model="isIndexingEnabled"
                    help="If selected, this attribute can be used when indexing for universal search."
                    text="Yes" />
            </div>

            <div class="col-md-6">
                <CheckBox v-if="isAnalyticsVisible"
                    label="Analytics Enabled"
                    v-model="isAnalyticHistory"
                    help="If selected, this attribute will be made available as an Analytic."
                    text="Yes" />

                <CheckBox v-if="isAnalyticsVisible"
                    label="Analytics History Enabled"
                    v-model="isAnalyticsHistoryEnabled"
                    help="If selected, changes to the value of this attribute will cause Analytics to create a history record. Note that this requires that 'Analytics Enabled' is also enabled."
                    text="Yes" />
            </div>
        </div>

        <TextBox v-model="preHtml"
            label="Pre-HTML"
            help="HTML that should be rendered before teh attribute's edit control."
            textMode="multiline" />

        <TextBox v-model="postHtml"
            label="Post-HTML"
            help="HTML that should be rendered before teh attribute's edit control."
            textMode="multiline" />
    </PanelWidget>
</fieldset>
`
            }));

        })
    };
}));
