System.register(['vue', '@Obsidian/Controls/panel', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/textBox', '@Obsidian/Controls/rockForm', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, Panel, CheckBox, DropDownList, TextBox, RockForm, toNumberOrNull;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            Panel = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            toNumberOrNull = module.toNumberOrNull;
        }],
        execute: (function () {

            const formFieldVisibilityOptions = [
                {
                    value: 0..toString(),
                    text: "Hidden"
                },
                {
                    value: 1..toString(),
                    text: "Optional"
                },
                {
                    value: 2..toString(),
                    text: "Required"
                }
            ];
            var personEntrySettings = exports('default', defineComponent({
                name: "Workflow.FormBuilderDetail.PersonEntrySettings",
                components: {
                    CheckBox,
                    DropDownList,
                    Panel,
                    RockForm,
                    TextBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    },
                    recordStatusOptions: {
                        type: Array,
                        default: []
                    },
                    connectionStatusOptions: {
                        type: Array,
                        default: []
                    },
                    campusTypeOptions: {
                        type: Array,
                        default: []
                    },
                    campusStatusOptions: {
                        type: Array,
                        default: []
                    },
                    addressTypeOptions: {
                        type: Array,
                        default: []
                    },
                    isVertical: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue",
                    "close"
                ],
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
                    const autofillCurrentPerson = ref((_a = props.modelValue.autofillCurrentPerson) !== null && _a !== void 0 ? _a : false);
                    const hideIfCurrentPersonKnown = ref((_b = props.modelValue.hideIfCurrentPersonKnown) !== null && _b !== void 0 ? _b : false);
                    const recordStatus = ref((_c = props.modelValue.recordStatus) !== null && _c !== void 0 ? _c : "");
                    const connectionStatus = ref((_d = props.modelValue.connectionStatus) !== null && _d !== void 0 ? _d : "");
                    const showCampus = ref((_e = props.modelValue.showCampus) !== null && _e !== void 0 ? _e : false);
                    const campusType = ref((_f = props.modelValue.campusType) !== null && _f !== void 0 ? _f : "");
                    const campusStatus = ref((_g = props.modelValue.campusStatus) !== null && _g !== void 0 ? _g : "");
                    const gender = ref((_j = (_h = props.modelValue.gender) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : 0..toString());
                    const email = ref((_l = (_k = props.modelValue.email) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : 0..toString());
                    const mobilePhone = ref((_o = (_m = props.modelValue.mobilePhone) === null || _m === void 0 ? void 0 : _m.toString()) !== null && _o !== void 0 ? _o : 0..toString());
                    const birthdate = ref((_q = (_p = props.modelValue.birthdate) === null || _p === void 0 ? void 0 : _p.toString()) !== null && _q !== void 0 ? _q : 0..toString());
                    const address = ref((_s = (_r = props.modelValue.address) === null || _r === void 0 ? void 0 : _r.toString()) !== null && _s !== void 0 ? _s : 0..toString());
                    const addressType = ref((_t = props.modelValue.addressType) !== null && _t !== void 0 ? _t : "");
                    const maritalStatus = ref((_v = (_u = props.modelValue.maritalStatus) === null || _u === void 0 ? void 0 : _u.toString()) !== null && _v !== void 0 ? _v : 0..toString());
                    const spouseEntry = ref((_x = (_w = props.modelValue.spouseEntry) === null || _w === void 0 ? void 0 : _w.toString()) !== null && _x !== void 0 ? _x : 0..toString());
                    const spouseLabel = ref((_y = props.modelValue.spouseLabel) !== null && _y !== void 0 ? _y : "Spouse");
                    const columnClass = computed(() => props.isVertical ? "col-xs-12" : "col-md-3");
                    watch([autofillCurrentPerson, hideIfCurrentPersonKnown, recordStatus, connectionStatus, showCampus, campusType, campusStatus, gender, email, mobilePhone, birthdate, address, addressType, maritalStatus, spouseEntry, spouseLabel], () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { autofillCurrentPerson: autofillCurrentPerson.value, hideIfCurrentPersonKnown: hideIfCurrentPersonKnown.value, recordStatus: recordStatus.value, connectionStatus: connectionStatus.value, showCampus: showCampus.value, campusType: campusType.value, campusStatus: campusStatus.value, gender: (_a = toNumberOrNull(gender.value)) !== null && _a !== void 0 ? _a : 0, email: (_b = toNumberOrNull(email.value)) !== null && _b !== void 0 ? _b : 0, mobilePhone: (_c = toNumberOrNull(mobilePhone.value)) !== null && _c !== void 0 ? _c : 0, birthdate: (_d = toNumberOrNull(birthdate.value)) !== null && _d !== void 0 ? _d : 0, address: (_e = toNumberOrNull(address.value)) !== null && _e !== void 0 ? _e : 0, addressType: addressType.value, maritalStatus: (_f = toNumberOrNull(maritalStatus.value)) !== null && _f !== void 0 ? _f : 0, spouseEntry: (_g = toNumberOrNull(spouseEntry.value)) !== null && _g !== void 0 ? _g : 0, spouseLabel: spouseLabel.value });
                        emit("update:modelValue", newValue);
                    });
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
                        autofillCurrentPerson.value = (_a = props.modelValue.autofillCurrentPerson) !== null && _a !== void 0 ? _a : false;
                        hideIfCurrentPersonKnown.value = (_b = props.modelValue.hideIfCurrentPersonKnown) !== null && _b !== void 0 ? _b : false;
                        recordStatus.value = (_c = props.modelValue.recordStatus) !== null && _c !== void 0 ? _c : "";
                        connectionStatus.value = (_d = props.modelValue.connectionStatus) !== null && _d !== void 0 ? _d : "";
                        showCampus.value = (_e = props.modelValue.showCampus) !== null && _e !== void 0 ? _e : false;
                        campusType.value = (_f = props.modelValue.campusType) !== null && _f !== void 0 ? _f : "";
                        campusStatus.value = (_g = props.modelValue.campusStatus) !== null && _g !== void 0 ? _g : "";
                        gender.value = (_j = (_h = props.modelValue.gender) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : 0..toString();
                        email.value = (_l = (_k = props.modelValue.email) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : 0..toString();
                        mobilePhone.value = (_o = (_m = props.modelValue.mobilePhone) === null || _m === void 0 ? void 0 : _m.toString()) !== null && _o !== void 0 ? _o : 0..toString();
                        birthdate.value = (_q = (_p = props.modelValue.birthdate) === null || _p === void 0 ? void 0 : _p.toString()) !== null && _q !== void 0 ? _q : 0..toString();
                        address.value = (_s = (_r = props.modelValue.address) === null || _r === void 0 ? void 0 : _r.toString()) !== null && _s !== void 0 ? _s : 0..toString();
                        addressType.value = (_t = props.modelValue.addressType) !== null && _t !== void 0 ? _t : "";
                        maritalStatus.value = (_v = (_u = props.modelValue.maritalStatus) === null || _u === void 0 ? void 0 : _u.toString()) !== null && _v !== void 0 ? _v : 0..toString();
                        spouseEntry.value = (_x = (_w = props.modelValue.spouseEntry) === null || _w === void 0 ? void 0 : _w.toString()) !== null && _x !== void 0 ? _x : 0..toString();
                        spouseLabel.value = (_y = props.modelValue.spouseLabel) !== null && _y !== void 0 ? _y : "";
                    });
                    return {
                        address,
                        addressType,
                        autofillCurrentPerson,
                        birthdate,
                        campusStatus,
                        campusType,
                        columnClass,
                        connectionStatus,
                        email,
                        gender,
                        hideIfCurrentPersonKnown,
                        maritalStatus,
                        mobilePhone,
                        recordStatus,
                        showCampus,
                        spouseEntry,
                        spouseLabel,
                        formFieldVisibilityOptions
                    };
                },
                template: `
<div>
    <div class="row">
        <div :class="columnClass">
            <CheckBox v-model="autofillCurrentPerson"
                label="Autofill Current Person" />
        </div>

        <div :class="columnClass">
            <CheckBox v-model="hideIfCurrentPersonKnown"
                label="Hide if Current Person Known" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="recordStatus"
                label="Record Status"
                :items="recordStatusOptions"
                rules="required" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="connectionStatus"
                label="Connection Status"
                :items="connectionStatusOptions"
                rules="required" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <CheckBox v-model="showCampus"
                label="Show Campus" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="campusType"
                label="Campus Type"
                :items="campusTypeOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="campusStatus"
                label="Campus Status"
                :items="campusStatusOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="gender"
                label="Gender"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="email"
                label="Email"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="mobilePhone"
                label="Mobile Phone"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="birthdate"
                label="Birthdate"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="address"
                label="Address"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="addressType"
                label="Address Type"
                :items="addressTypeOptions"
                rules="required" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="maritalStatus"
                label="Marital Status"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="spouseEntry"
                label="Spouse Entry"
                :showBlankItem="false"
                :items="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <TextBox v-model="spouseLabel"
                label="Spouse Label" />
        </div>
    </div>
</div>
`
            }));

        })
    };
}));
