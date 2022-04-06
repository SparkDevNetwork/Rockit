System.register(["vue", "../../../../Controls/panel", "../../../../Elements/checkBox", "../../../../Elements/dropDownList", "../../../../Elements/textBox", "../../../../Controls/rockForm", "../../../../Services/number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, panel_1, checkBox_1, dropDownList_1, textBox_1, rockForm_1, number_1, formFieldVisibilityOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            formFieldVisibilityOptions = [
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
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormBuilderDetail.PersonEntrySettings",
                components: {
                    CheckBox: checkBox_1.default,
                    DropDownList: dropDownList_1.default,
                    Panel: panel_1.default,
                    RockForm: rockForm_1.default,
                    TextBox: textBox_1.default
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
                    const autofillCurrentPerson = vue_1.ref((_a = props.modelValue.autofillCurrentPerson) !== null && _a !== void 0 ? _a : false);
                    const hideIfCurrentPersonKnown = vue_1.ref((_b = props.modelValue.hideIfCurrentPersonKnown) !== null && _b !== void 0 ? _b : false);
                    const recordStatus = vue_1.ref((_c = props.modelValue.recordStatus) !== null && _c !== void 0 ? _c : "");
                    const connectionStatus = vue_1.ref((_d = props.modelValue.connectionStatus) !== null && _d !== void 0 ? _d : "");
                    const showCampus = vue_1.ref((_e = props.modelValue.showCampus) !== null && _e !== void 0 ? _e : false);
                    const campusType = vue_1.ref((_f = props.modelValue.campusType) !== null && _f !== void 0 ? _f : "");
                    const campusStatus = vue_1.ref((_g = props.modelValue.campusStatus) !== null && _g !== void 0 ? _g : "");
                    const gender = vue_1.ref((_j = (_h = props.modelValue.gender) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : 0..toString());
                    const email = vue_1.ref((_l = (_k = props.modelValue.gender) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : 0..toString());
                    const mobilePhone = vue_1.ref((_o = (_m = props.modelValue.mobilePhone) === null || _m === void 0 ? void 0 : _m.toString()) !== null && _o !== void 0 ? _o : 0..toString());
                    const birthdate = vue_1.ref((_q = (_p = props.modelValue.birthdate) === null || _p === void 0 ? void 0 : _p.toString()) !== null && _q !== void 0 ? _q : 0..toString());
                    const address = vue_1.ref((_s = (_r = props.modelValue.address) === null || _r === void 0 ? void 0 : _r.toString()) !== null && _s !== void 0 ? _s : 0..toString());
                    const addressType = vue_1.ref((_t = props.modelValue.addressType) !== null && _t !== void 0 ? _t : "");
                    const maritalStatus = vue_1.ref((_v = (_u = props.modelValue.maritalStatus) === null || _u === void 0 ? void 0 : _u.toString()) !== null && _v !== void 0 ? _v : 0..toString());
                    const spouseEntry = vue_1.ref((_x = (_w = props.modelValue.spouseEntry) === null || _w === void 0 ? void 0 : _w.toString()) !== null && _x !== void 0 ? _x : 0..toString());
                    const spouseLabel = vue_1.ref((_y = props.modelValue.spouseLabel) !== null && _y !== void 0 ? _y : "Spouse");
                    const columnClass = vue_1.computed(() => props.isVertical ? "col-xs-12" : "col-md-3");
                    vue_1.watch([autofillCurrentPerson, hideIfCurrentPersonKnown, recordStatus, connectionStatus, showCampus, campusType, campusStatus, gender, email, mobilePhone, birthdate, address, addressType, maritalStatus, spouseEntry, spouseLabel], () => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        const newValue = Object.assign(Object.assign({}, props.modelValue), { autofillCurrentPerson: autofillCurrentPerson.value, hideIfCurrentPersonKnown: hideIfCurrentPersonKnown.value, recordStatus: recordStatus.value, connectionStatus: connectionStatus.value, showCampus: showCampus.value, campusType: campusType.value, campusStatus: campusStatus.value, gender: (_a = number_1.toNumberOrNull(gender.value)) !== null && _a !== void 0 ? _a : 0, email: (_b = number_1.toNumberOrNull(email.value)) !== null && _b !== void 0 ? _b : 0, mobilePhone: (_c = number_1.toNumberOrNull(mobilePhone.value)) !== null && _c !== void 0 ? _c : 0, birthdate: (_d = number_1.toNumberOrNull(birthdate.value)) !== null && _d !== void 0 ? _d : 0, address: (_e = number_1.toNumberOrNull(address.value)) !== null && _e !== void 0 ? _e : 0, addressType: addressType.value, maritalStatus: (_f = number_1.toNumberOrNull(maritalStatus.value)) !== null && _f !== void 0 ? _f : 0, spouseEntry: (_g = number_1.toNumberOrNull(spouseEntry.value)) !== null && _g !== void 0 ? _g : 0, spouseLabel: spouseLabel.value });
                        emit("update:modelValue", newValue);
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
                        autofillCurrentPerson.value = (_a = props.modelValue.autofillCurrentPerson) !== null && _a !== void 0 ? _a : false;
                        hideIfCurrentPersonKnown.value = (_b = props.modelValue.hideIfCurrentPersonKnown) !== null && _b !== void 0 ? _b : false;
                        recordStatus.value = (_c = props.modelValue.recordStatus) !== null && _c !== void 0 ? _c : "";
                        connectionStatus.value = (_d = props.modelValue.connectionStatus) !== null && _d !== void 0 ? _d : "";
                        showCampus.value = (_e = props.modelValue.showCampus) !== null && _e !== void 0 ? _e : false;
                        campusType.value = (_f = props.modelValue.campusType) !== null && _f !== void 0 ? _f : "";
                        campusStatus.value = (_g = props.modelValue.campusStatus) !== null && _g !== void 0 ? _g : "";
                        gender.value = (_j = (_h = props.modelValue.gender) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : 0..toString();
                        email.value = (_l = (_k = props.modelValue.gender) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : 0..toString();
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
                :options="recordStatusOptions"
                rules="required" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="connectionStatus"
                label="Connection Status"
                :options="connectionStatusOptions"
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
                :options="campusTypeOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="campusStatus"
                label="Campus Status"
                :options="campusStatusOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="gender"
                label="Gender"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="email"
                label="Email"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="mobilePhone"
                label="Mobile Phone"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="birthdate"
                label="Birthdate"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="address"
                label="Address"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="addressType"
                label="Address Type"
                :options="addressTypeOptions"
                rules="required" />
        </div>

        <div :class="columnClass">
            <DropDownList v-model="maritalStatus"
                label="Marital Status"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>
    </div>

    <div class="row">
        <div :class="columnClass">
            <DropDownList v-model="spouseEntry"
                label="Spouse Entry"
                :showBlankItem="false"
                :options="formFieldVisibilityOptions" />
        </div>

        <div :class="columnClass">
            <TextBox v-model="spouseLabel"
                label="Spouse Label" />
        </div>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=personEntrySettings.js.map