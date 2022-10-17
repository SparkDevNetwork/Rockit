System.register(['tslib', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/countdownTimer', '@Obsidian/Controls/javaScriptAnchor', '@Obsidian/Controls/progressTracker', '@Obsidian/Controls/rockButton', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/stringUtils', '@Obsidian/PageState', '@Obsidian/Utility/block', '@Obsidian/Utility/guid', '@Obsidian/Utility/linq', '@Obsidian/Utility/page', '@Obsidian/Utility/rockDateTime', '@Obsidian/Controls/numberUpDown', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/electronicSignature', '@Obsidian/Controls/radioButtonList', '@Obsidian/Controls/addressControl', '@Obsidian/Controls/textBox', '@Obsidian/Controls/emailBox', '@Obsidian/Controls/genderDropDownList', '@Obsidian/Controls/birthdayPicker', '@Obsidian/Controls/phoneNumberBox', '@Obsidian/Controls/componentFromUrl', '@Obsidian/Controls/datePartsPicker', '@Obsidian/Controls/rockField', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/checkBox', '@Obsidian/Controls/numberUpDownGroup', '@Obsidian/Controls/itemsWithPreAndPostHtml', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/dialog', '@Obsidian/Controls/loadingIndicator', '@Obsidian/Controls/saveFinancialAccountForm', '@Obsidian/Controls/gatewayControl', '@Obsidian/Controls/rockValidation', '@Obsidian/Controls/loading', '@Obsidian/Controls/currencyBox', '@Obsidian/Controls/helpBlock', '@Obsidian/Controls/inlineCheckBox', '@Obsidian/Controls/staticFormControl'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, inject, computed, ref, watch, reactive, provide, Alert, CountdownTimer, JavaScriptAnchor, ProgressTracker, RockButton, Number, toWord, asFormattedString, pluralConditional, toTitleCase, StringFilter, isNullOrWhiteSpace, useStore, useInvokeBlockAction, useConfigurationValues, newGuid, areEqual, GuidHelper, toGuidOrNull, List, Page, RockDateTime, NumberUpDown, DropDownList, ElectronicSignature, RadioButtonList, AddressControl, getDefaultAddressControlModel, TextBox, EmailBox, GenderDropDownList, BirthdayPicker, PhoneNumberBox, ComponentFromUrl, getDefaultDatePartsPickerModel, RockField, RockForm, CheckBox, NumberUpDownGroup, ItemsWithPreAndPostHtml, AttributeValuesContainer, Dialog, LoadingIndicator, SaveFinancialAccountForm, GatewayControl, prepareSubmitPayment, RockValidation, Loading, CurrencyBox, HelpBlock, InlineCheckBox, StaticFormControl;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            inject = module.inject;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
            reactive = module.reactive;
            provide = module.provide;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            CountdownTimer = module["default"];
        }, function (module) {
            JavaScriptAnchor = module["default"];
        }, function (module) {
            ProgressTracker = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            Number = module["default"];
            toWord = module.toWord;
            asFormattedString = module.asFormattedString;
        }, function (module) {
            pluralConditional = module.pluralConditional;
            toTitleCase = module.toTitleCase;
            StringFilter = module["default"];
            isNullOrWhiteSpace = module.isNullOrWhiteSpace;
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            useConfigurationValues = module.useConfigurationValues;
        }, function (module) {
            newGuid = module.newGuid;
            areEqual = module.areEqual;
            GuidHelper = module["default"];
            toGuidOrNull = module.toGuidOrNull;
        }, function (module) {
            List = module.List;
        }, function (module) {
            Page = module["default"];
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function (module) {
            NumberUpDown = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            ElectronicSignature = module["default"];
        }, function (module) {
            RadioButtonList = module["default"];
        }, function (module) {
            AddressControl = module["default"];
            getDefaultAddressControlModel = module.getDefaultAddressControlModel;
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            EmailBox = module["default"];
        }, function (module) {
            GenderDropDownList = module["default"];
        }, function (module) {
            BirthdayPicker = module["default"];
        }, function (module) {
            PhoneNumberBox = module["default"];
        }, function (module) {
            ComponentFromUrl = module["default"];
        }, function (module) {
            getDefaultDatePartsPickerModel = module.getDefaultDatePartsPickerModel;
        }, function (module) {
            RockField = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            CheckBox = module["default"];
        }, function (module) {
            NumberUpDownGroup = module["default"];
        }, function (module) {
            ItemsWithPreAndPostHtml = module["default"];
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function (module) {
            Dialog = module["default"];
        }, function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            SaveFinancialAccountForm = module["default"];
        }, function (module) {
            GatewayControl = module["default"];
            prepareSubmitPayment = module.prepareSubmitPayment;
        }, function (module) {
            RockValidation = module["default"];
        }, function (module) {
            Loading = module["default"];
        }, function (module) {
            CurrencyBox = module["default"];
        }, function (module) {
            HelpBlock = module["default"];
        }, function (module) {
            InlineCheckBox = module["default"];
        }, function (module) {
            StaticFormControl = module["default"];
        }],
        execute: (function () {

            const unknownSingleFamilyGuid = newGuid();
            function getForcedFamilyGuid(currentPerson, viewModel) {
                return (currentPerson && viewModel.registrantsSameFamily === 1) ?
                    (currentPerson.primaryFamilyGuid || unknownSingleFamilyGuid) :
                    null;
            }
            function getDefaultRegistrantInfo(currentPerson, viewModel, familyGuid) {
                const forcedFamilyGuid = getForcedFamilyGuid(currentPerson, viewModel);
                if (forcedFamilyGuid) {
                    familyGuid = forcedFamilyGuid;
                }
                if (!familyGuid) {
                    familyGuid = newGuid();
                }
                return {
                    isOnWaitList: false,
                    familyGuid: familyGuid,
                    fieldValues: {},
                    feeItemQuantities: {},
                    guid: newGuid(),
                    personGuid: null
                };
            }
            function getRegistrantBasicInfo(registrant, registrantForms) {
                var _a, _b, _c;
                const fields = (registrantForms === null || registrantForms === void 0 ? void 0 : registrantForms.reduce((acc, f) => acc.concat(f.fields), [])) || [];
                const firstNameGuid = ((_a = fields.find(f => f.personFieldType === 0)) === null || _a === void 0 ? void 0 : _a.guid) || "";
                const lastNameGuid = ((_b = fields.find(f => f.personFieldType === 1)) === null || _b === void 0 ? void 0 : _b.guid) || "";
                const emailGuid = ((_c = fields.find(f => f.personFieldType === 4)) === null || _c === void 0 ? void 0 : _c.guid) || "";
                return {
                    firstName: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[firstNameGuid]) || ""),
                    lastName: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[lastNameGuid]) || ""),
                    email: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[emailGuid]) || ""),
                    guid: registrant === null || registrant === void 0 ? void 0 : registrant.guid
                };
            }

            const store$3 = useStore();
            var RegistrationEntryIntro = defineComponent({
                name: "Event.RegistrationEntry.Intro",
                components: {
                    NumberUpDown,
                    RockButton,
                    Alert
                },
                data() {
                    const registrationEntryState = inject("registrationEntryState");
                    return {
                        numberOfRegistrants: registrationEntryState.registrants.length,
                        registrationEntryState,
                        showRemainingCapacity: false
                    };
                },
                computed: {
                    currentPerson() {
                        return store$3.state.currentPerson;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    numberToAddToWaitlist() {
                        if (this.viewModel.spotsRemaining === null || !this.viewModel.waitListEnabled) {
                            return 0;
                        }
                        if (this.viewModel.spotsRemaining >= this.numberOfRegistrants) {
                            return 0;
                        }
                        return this.numberOfRegistrants - this.viewModel.spotsRemaining;
                    },
                    remainingCapacityPhrase() {
                        const spots = this.viewModel.spotsRemaining;
                        if (spots === null) {
                            return "";
                        }
                        return pluralConditional(spots, `1 more ${this.registrantTerm}`, `${spots} more ${this.registrantTermPlural}`);
                    },
                    isFull() {
                        if (this.viewModel.spotsRemaining === null) {
                            return false;
                        }
                        return this.viewModel.spotsRemaining < 1;
                    },
                    canContinue() {
                        return !(this.isFull && this.numberToAddToWaitlist !== this.numberOfRegistrants);
                    },
                    registrantTerm() {
                        this.viewModel.instanceName;
                        return (this.viewModel.registrantTerm || "registrant").toLowerCase();
                    },
                    registrantTermPlural() {
                        return (this.viewModel.pluralRegistrantTerm || "registrants").toLowerCase();
                    },
                    registrationTerm() {
                        return (this.viewModel.registrationTerm || "registration").toLowerCase();
                    },
                    registrationTermPlural() {
                        return (this.viewModel.pluralRegistrationTerm || "registrations").toLowerCase();
                    },
                    registrationTermTitleCase() {
                        return toTitleCase(this.registrationTerm);
                    }
                },
                methods: {
                    pluralConditional,
                    onNext() {
                        const forcedFamilyGuid = getForcedFamilyGuid(this.currentPerson, this.viewModel);
                        const usedFamilyMemberGuids = this.registrationEntryState.registrants
                            .filter(r => r.personGuid)
                            .map(r => r.personGuid);
                        this.viewModel.familyMembers
                            .filter(fm => areEqual(fm.familyGuid, forcedFamilyGuid) &&
                            !usedFamilyMemberGuids.includes(fm.guid));
                        while (this.numberOfRegistrants > this.registrationEntryState.registrants.length) {
                            const registrant = getDefaultRegistrantInfo(this.currentPerson, this.viewModel, forcedFamilyGuid);
                            this.registrationEntryState.registrants.push(registrant);
                        }
                        this.registrationEntryState.registrants.length = this.numberOfRegistrants;
                        const firstWaitListIndex = this.numberOfRegistrants - this.numberToAddToWaitlist;
                        for (let i = firstWaitListIndex; i < this.numberOfRegistrants; i++) {
                            this.registrationEntryState.registrants[i].isOnWaitList = true;
                        }
                        this.$emit("next");
                    },
                },
                watch: {
                    numberOfRegistrants() {
                        if (!this.viewModel.waitListEnabled && this.viewModel.spotsRemaining !== null && this.viewModel.spotsRemaining < this.numberOfRegistrants) {
                            this.showRemainingCapacity = true;
                            const spotsRemaining = this.viewModel.spotsRemaining;
                            this.$nextTick(() => this.numberOfRegistrants = spotsRemaining);
                        }
                    }
                },
                template: `
<div class="registrationentry-intro">
    <Alert v-if="isFull && numberToAddToWaitlist !== numberOfRegistrants" class="text-left" alertType="warning">
        <strong>{{registrationTermTitleCase}} Full</strong>
        <p>
            There are not any more {{registrationTermPlural}} available for {{viewModel.instanceName}}. 
        </p>
    </Alert>
    <Alert v-if="showRemainingCapacity" class="text-left" alertType="warning">
        <strong>{{registrationTermTitleCase}} Full</strong>
        <p>
            This {{registrationTerm}} only has capacity for {{remainingCapacityPhrase}}.
        </p>
    </Alert>
    <div class="text-left" v-html="viewModel.instructionsHtml">
    </div>
    <div v-if="viewModel.maxRegistrants > 1" class="registrationentry-intro">
        <h1>How many {{viewModel.pluralRegistrantTerm}} will you be registering?</h1>
        <NumberUpDown v-model="numberOfRegistrants" class="margin-t-sm" numberIncrementClasses="input-lg" :max="viewModel.maxRegistrants" />
    </div>
    <Alert v-if="viewModel.timeoutMinutes" alertType="info" class="text-left">
        Due to a high-volume of expected interest, your {{registrationTerm}} session will expire after
        {{pluralConditional(viewModel.timeoutMinutes, 'a minute', viewModel.timeoutMinutes + ' minutes')}}
        of inactivity.
    </Alert>
    <Alert v-if="numberToAddToWaitlist === numberOfRegistrants" class="text-left" alertType="warning">
        This {{registrationTerm}} has reached its capacity. Complete the registration to be added to the waitlist.
    </Alert>
    <Alert v-else-if="numberToAddToWaitlist" class="text-left" alertType="warning">
        This {{registrationTerm}} only has capacity for {{remainingCapacityPhrase}}.
        The first {{pluralConditional(viewModel.spotsRemaining, registrantTerm, viewModel.spotsRemaining + ' ' + registrantTermPlural)}} you add will be registered for {{viewModel.instanceName}}.
        The remaining {{pluralConditional(numberToAddToWaitlist, registrantTerm, numberToAddToWaitlist + ' ' + registrantTermPlural)}} will be added to the waitlist. 
    </Alert>

    <div v-if="canContinue" class="actions text-right">
        <RockButton btnType="primary" @click="onNext">
            Next
        </RockButton>
    </div>
</div>`
            });

            var RegistrantPersonField = defineComponent({
                name: "Event.RegistrationEntry.RegistrantPersonField",
                components: {
                    Alert,
                    ComponentFromUrl
                },
                props: {
                    field: {
                        type: Object,
                        required: true
                    },
                    fieldValues: {
                        type: Object,
                        required: true
                    },
                    isKnownFamilyMember: {
                        type: Boolean,
                        required: true
                    }
                },
                setup(props) {
                    const registrationEntryState = inject("registrationEntryState");
                    const component = computed(() => {
                        switch (props.field.personFieldType) {
                            case 0:
                                return TextBox;
                            case 1:
                                return TextBox;
                            case 13:
                                return TextBox;
                            case 2:
                                return DropDownList;
                            case 4:
                                return EmailBox;
                            case 6:
                                return GenderDropDownList;
                            case 5:
                                return BirthdayPicker;
                            case 14:
                                return BirthdayPicker;
                            case 3:
                                return AddressControl;
                            case 7:
                                return DropDownList;
                            case 12:
                                return DropDownList;
                            case 11:
                                return DropDownList;
                            case 9:
                                return PhoneNumberBox;
                            case 10:
                                return PhoneNumberBox;
                            case 8:
                                return PhoneNumberBox;
                        }
                    });
                    const fieldControlComponentProps = computed(() => {
                        const componentProps = {
                            rules: props.field.isRequired ? "required" : ""
                        };
                        switch (props.field.personFieldType) {
                            case 0:
                                componentProps.label = "First Name";
                                componentProps.disabled = props.isKnownFamilyMember;
                                break;
                            case 1:
                                componentProps.label = "Last Name";
                                componentProps.disabled = props.isKnownFamilyMember;
                                break;
                            case 13:
                                componentProps.label = "Middle Name";
                                break;
                            case 2:
                                componentProps.label = "Campus";
                                componentProps.items = [...registrationEntryState.viewModel.campuses];
                                break;
                            case 4:
                                componentProps.label = "Email";
                                break;
                            case 6:
                                break;
                            case 5:
                                componentProps.label = "Birthday";
                                break;
                            case 14:
                                componentProps.label = "Anniversary Date";
                                break;
                            case 3:
                                break;
                            case 7:
                                componentProps.label = "Marital Status";
                                componentProps.items = [...registrationEntryState.viewModel.maritalStatuses];
                                break;
                            case 12:
                                componentProps.label = "Connection Status";
                                componentProps.items = [...registrationEntryState.viewModel.connectionStatuses];
                                break;
                            case 11:
                                componentProps.label = "Grade";
                                componentProps.items = [...registrationEntryState.viewModel.grades];
                                break;
                            case 9:
                                componentProps.label = "Home Phone";
                                break;
                            case 10:
                                componentProps.label = "Work Phone";
                                break;
                            case 8:
                                componentProps.label = "Mobile Phone";
                                break;
                        }
                        return componentProps;
                    });
                    if (!(props.field.guid in props.fieldValues)) {
                        let defaultValue = "";
                        switch (props.field.personFieldType) {
                            case 5:
                                defaultValue = getDefaultDatePartsPickerModel();
                                break;
                            case 14:
                                defaultValue = getDefaultDatePartsPickerModel();
                                break;
                            case 3:
                                defaultValue = getDefaultAddressControlModel();
                                break;
                        }
                        props.fieldValues[props.field.guid] = defaultValue;
                    }
                    return {
                        component,
                        fieldControlComponentProps,
                        fieldValues: props.fieldValues,
                        fieldType: props.field.personFieldType
                    };
                },
                template: `
<component v-if="component" :is="component" v-bind="fieldControlComponentProps" v-model="fieldValues[field.guid]" />
<Alert v-else alertType="danger">Could not load the control for person field {{ fieldType }}.</Alert>
`
            });

            function isRuleMet(rule, fieldValues) {
                const value = fieldValues[rule.comparedToRegistrationTemplateFormFieldGuid] || "";
                if (typeof value !== "string") {
                    return false;
                }
                const strVal = value.toLowerCase().trim();
                const comparison = rule.comparedToValue.toLowerCase().trim();
                if (!strVal) {
                    return false;
                }
                switch (rule.comparisonType) {
                    case 1:
                        return strVal === comparison;
                    case 2:
                        return strVal !== comparison;
                    case 8:
                        return strVal.includes(comparison);
                    case 16:
                        return !strVal.includes(comparison);
                }
                return false;
            }
            var RegistrantAttributeField = defineComponent({
                name: "Event.RegistrationEntry.RegistrantAttributeField",
                components: {
                    Alert,
                    RockField
                },
                props: {
                    field: {
                        type: Object,
                        required: true
                    },
                    fieldValues: {
                        type: Object,
                        required: true
                    }
                },
                setup(props) {
                    var _a;
                    const isVisible = computed(() => {
                        switch (props.field.visibilityRuleType) {
                            case 1:
                                return props.field.visibilityRules.every(vr => isRuleMet(vr, props.fieldValues));
                            case 3:
                                return props.field.visibilityRules.every(vr => !isRuleMet(vr, props.fieldValues));
                            case 2:
                                return props.field.visibilityRules.some(vr => isRuleMet(vr, props.fieldValues));
                            case 4:
                                return props.field.visibilityRules.some(vr => !isRuleMet(vr, props.fieldValues));
                        }
                        return true;
                    });
                    const attribute = ref(props.field.attribute);
                    const value = ref((_a = props.fieldValues[props.field.guid]) !== null && _a !== void 0 ? _a : "");
                    watch(() => props.fieldValues[props.field.guid], () => {
                        value.value = props.fieldValues[props.field.guid];
                    });
                    watch(value, () => {
                        props.fieldValues[props.field.guid] = value.value;
                    });
                    return {
                        isVisible,
                        attribute,
                        value
                    };
                },
                template: `
<template v-if="isVisible">
    <RockField v-if="attribute" v-model="value" isEditMode :attribute="attribute" />
    <Alert v-else alertType="danger">Could not resolve attribute field</Alert>
</template>`
            });

            var FeeField = defineComponent({
                name: "Event.RegistrationEntry.FeeField",
                components: {
                    NumberUpDown,
                    NumberUpDownGroup,
                    DropDownList,
                    CheckBox,
                    Alert
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    fee: {
                        type: Object,
                        required: true
                    }
                },
                data() {
                    return {
                        dropDownValue: "",
                        checkboxValue: false
                    };
                },
                methods: {
                    getItemLabel(item) {
                        const formattedCost = Number.asFormattedString(item.cost, 2);
                        if (item.countRemaining) {
                            const formattedRemaining = Number.asFormattedString(item.countRemaining, 0);
                            return `${item.name} ($${formattedCost}) (${formattedRemaining} remaining)`;
                        }
                        return `${item.name} ($${formattedCost})`;
                    }
                },
                computed: {
                    label() {
                        if (this.singleItem) {
                            return this.getItemLabel(this.singleItem);
                        }
                        return this.fee.name;
                    },
                    singleItem() {
                        if (this.fee.items.length !== 1) {
                            return null;
                        }
                        return this.fee.items[0];
                    },
                    isHidden() {
                        return !this.fee.items.length;
                    },
                    isCheckbox() {
                        return !!this.singleItem && !this.fee.allowMultiple;
                    },
                    isNumberUpDown() {
                        return !!this.singleItem && this.fee.allowMultiple;
                    },
                    isNumberUpDownGroup() {
                        return this.fee.items.length > 1 && this.fee.allowMultiple;
                    },
                    isDropDown() {
                        return this.fee.items.length > 1 && !this.fee.allowMultiple;
                    },
                    dropDownListOptions() {
                        return this.fee.items.map(i => ({
                            text: this.getItemLabel(i),
                            value: i.guid
                        }));
                    },
                    numberUpDownGroupOptions() {
                        return this.fee.items.map(i => ({
                            key: i.guid,
                            label: this.getItemLabel(i),
                            max: i.countRemaining || 100,
                            min: 0
                        }));
                    },
                    rules() {
                        return this.fee.isRequired ? "required" : "";
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        deep: true,
                        handler() {
                            if (this.isDropDown) {
                                this.dropDownValue = "";
                                for (const item of this.fee.items) {
                                    if (!this.dropDownValue && this.modelValue[item.guid]) {
                                        this.modelValue[item.guid] = 1;
                                        this.dropDownValue = item.guid;
                                    }
                                    else if (this.modelValue[item.guid]) {
                                        this.modelValue[item.guid] = 0;
                                    }
                                }
                            }
                            if (this.isCheckbox && this.singleItem) {
                                this.checkboxValue = !!this.modelValue[this.singleItem.guid];
                                this.modelValue[this.singleItem.guid] = this.checkboxValue ? 1 : 0;
                            }
                        }
                    },
                    fee: {
                        immediate: true,
                        handler() {
                            for (const item of this.fee.items) {
                                this.modelValue[item.guid] = this.modelValue[item.guid] || 0;
                            }
                        }
                    },
                    dropDownValue() {
                        for (const item of this.fee.items) {
                            const isSelected = GuidHelper.areEqual(this.dropDownValue, item.guid);
                            this.modelValue[item.guid] = isSelected ? 1 : 0;
                        }
                    },
                    checkboxValue() {
                        if (this.singleItem) {
                            this.modelValue[this.singleItem.guid] = this.checkboxValue ? 1 : 0;
                        }
                    }
                },
                template: `
<template v-if="!isHidden">
    <CheckBox v-if="isCheckbox" :label="label" v-model="checkboxValue" :rules="rules" />
    <NumberUpDown v-else-if="isNumberUpDown" :label="label" :min="0" :max="singleItem.countRemaining || 100" v-model="modelValue[singleItem.guid]" :rules="rules" />
    <DropDownList v-else-if="isDropDown" :label="label" :items="dropDownListOptions" v-model="dropDownValue" :rules="rules" formControlClasses="input-width-md" />
    <NumberUpDownGroup v-else-if="isNumberUpDownGroup" :label="label" :options="numberUpDownGroupOptions" v-model="modelValue" :rules="rules" />
    <Alert v-else alertType="danger">This fee configuration is not supported</Alert>
</template>`
            });

            const store$2 = useStore();
            var Registrant = defineComponent({
                name: "Event.RegistrationEntry.Registrant",
                components: {
                    ElectronicSignature,
                    RadioButtonList,
                    RockButton,
                    RegistrantPersonField,
                    RegistrantAttributeField,
                    Alert,
                    RockForm,
                    FeeField,
                    DropDownList,
                    ItemsWithPreAndPostHtml
                },
                props: {
                    currentRegistrant: {
                        type: Object,
                        required: true
                    },
                    isWaitList: {
                        type: Boolean,
                        required: true
                    }
                },
                setup() {
                    const invokeBlockAction = useInvokeBlockAction();
                    const registrationEntryState = inject("registrationEntryState");
                    const getRegistrationEntryBlockArgs = inject("getRegistrationEntryBlockArgs");
                    const signatureData = ref(null);
                    const signatureSource = ref("");
                    const signatureToken = ref("");
                    const isNextDisabled = ref(false);
                    const isSignatureDrawn = computed(() => registrationEntryState.viewModel.isSignatureDrawn);
                    return {
                        getRegistrationEntryBlockArgs,
                        invokeBlockAction,
                        isNextDisabled,
                        isSignatureDrawn,
                        registrationEntryState,
                        signatureData,
                        signatureSource,
                        signatureToken
                    };
                },
                data() {
                    return {
                        fieldSources: {
                            personField: 0,
                            personAttribute: 1,
                            groupMemberAttribute: 2,
                            registrantAttribute: 4
                        }
                    };
                },
                computed: {
                    showPrevious() {
                        return this.registrationEntryState.firstStep !== this.registrationEntryState.steps.perRegistrantForms;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    currentFormIndex() {
                        return this.registrationEntryState.currentRegistrantFormIndex;
                    },
                    currentForm() {
                        return this.formsToShow[this.currentFormIndex] || null;
                    },
                    isLastForm() {
                        return (this.currentFormIndex + 1) === this.formsToShow.length;
                    },
                    isDataForm() {
                        return this.currentFormIndex < this.formsToShow.length;
                    },
                    isSignatureForm() {
                        return this.viewModel.isInlineSignatureRequired && this.currentFormIndex === this.formsToShow.length;
                    },
                    isNextVisible() {
                        return !this.isSignatureForm;
                    },
                    formsToShow() {
                        if (!this.isWaitList) {
                            return this.viewModel.registrantForms;
                        }
                        return this.viewModel.registrantForms.filter(form => form.fields.some(field => field.showOnWaitList));
                    },
                    currentFormFields() {
                        var _a;
                        return (((_a = this.currentForm) === null || _a === void 0 ? void 0 : _a.fields) || [])
                            .filter(f => !this.isWaitList || f.showOnWaitList);
                    },
                    prePostHtmlItems() {
                        return this.currentFormFields
                            .map(f => ({
                            preHtml: f.preHtml,
                            postHtml: f.postHtml,
                            slotName: f.guid
                        }));
                    },
                    currentPerson() {
                        return store$2.state.currentPerson;
                    },
                    pluralFeeTerm() {
                        return StringFilter.toTitleCase(this.viewModel.pluralFeeTerm || "fees");
                    },
                    familyOptions() {
                        var _a;
                        const options = [];
                        const usedFamilyGuids = {};
                        if (this.viewModel.registrantsSameFamily !== 2) {
                            return options;
                        }
                        for (let i = 0; i < this.registrationEntryState.currentRegistrantIndex; i++) {
                            const registrant = this.registrationEntryState.registrants[i];
                            const info = getRegistrantBasicInfo(registrant, this.viewModel.registrantForms);
                            if (!usedFamilyGuids[registrant.familyGuid] && (info === null || info === void 0 ? void 0 : info.firstName) && (info === null || info === void 0 ? void 0 : info.lastName)) {
                                options.push({
                                    text: `${info.firstName} ${info.lastName}`,
                                    value: registrant.familyGuid
                                });
                                usedFamilyGuids[registrant.familyGuid] = true;
                            }
                        }
                        if (((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.primaryFamilyGuid) && this.currentPerson.fullName && !usedFamilyGuids[this.currentPerson.primaryFamilyGuid]) {
                            usedFamilyGuids[this.currentPerson.primaryFamilyGuid] = true;
                            options.push({
                                text: this.currentPerson.fullName,
                                value: this.currentPerson.primaryFamilyGuid
                            });
                        }
                        const familyGuid = usedFamilyGuids[this.currentRegistrant.familyGuid] == true
                            ? newGuid()
                            : this.currentRegistrant.familyGuid;
                        options.push({
                            text: "None of the above",
                            value: familyGuid
                        });
                        return options;
                    },
                    familyMemberOptions() {
                        const selectedFamily = this.currentRegistrant.familyGuid;
                        if (!selectedFamily) {
                            return [];
                        }
                        const usedFamilyMemberGuids = this.registrationEntryState.registrants
                            .filter(r => r.personGuid && r.personGuid !== this.currentRegistrant.personGuid)
                            .map(r => r.personGuid);
                        return this.viewModel.familyMembers
                            .filter(fm => areEqual(fm.familyGuid, selectedFamily) &&
                            !usedFamilyMemberGuids.includes(fm.guid))
                            .map(fm => ({
                            text: fm.fullName,
                            value: fm.guid
                        }));
                    },
                    uppercaseRegistrantTerm() {
                        return StringFilter.toTitleCase(this.viewModel.registrantTerm);
                    },
                    firstName() {
                        return getRegistrantBasicInfo(this.currentRegistrant, this.viewModel.registrantForms).firstName;
                    },
                    familyMember() {
                        const personGuid = this.currentRegistrant.personGuid;
                        if (!personGuid) {
                            return null;
                        }
                        return this.viewModel.familyMembers.find(fm => areEqual(fm.guid, personGuid)) || null;
                    },
                    signatureDocumentTerm() {
                        return StringFilter.toTitleCase(this.viewModel.signatureDocumentTerm || "Release");
                    }
                },
                methods: {
                    onPrevious() {
                        if (this.currentFormIndex <= 0) {
                            this.$emit("previous");
                            return;
                        }
                        this.registrationEntryState.currentRegistrantFormIndex--;
                    },
                    onNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            let lastFormIndex = this.formsToShow.length - 1;
                            if (this.viewModel.isInlineSignatureRequired) {
                                this.isNextDisabled = true;
                                try {
                                    const result = yield this.invokeBlockAction("GetSignatureDocumentData", {
                                        args: this.getRegistrationEntryBlockArgs(),
                                        registrantGuid: this.currentRegistrant.guid
                                    });
                                    if (result.isSuccess && result.data) {
                                        this.signatureSource = result.data.documentHtml;
                                        this.signatureToken = result.data.securityToken;
                                        lastFormIndex += 1;
                                    }
                                    else {
                                        console.error(result.data);
                                        return;
                                    }
                                }
                                finally {
                                    this.isNextDisabled = false;
                                }
                            }
                            if (this.currentFormIndex >= lastFormIndex) {
                                this.$emit("next");
                                return;
                            }
                            this.registrationEntryState.currentRegistrantFormIndex++;
                        });
                    },
                    onSigned() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const result = yield this.invokeBlockAction("SignDocument", {
                                args: this.getRegistrationEntryBlockArgs(),
                                registrantGuid: this.currentRegistrant.guid,
                                documentHtml: this.signatureSource,
                                securityToken: this.signatureToken,
                                signature: this.signatureData
                            });
                            if (result.isSuccess && result.data) {
                                this.currentRegistrant.signatureData = result.data;
                                this.$emit("next");
                            }
                            else {
                                console.error(result.data);
                            }
                        });
                    },
                    copyValuesFromFamilyMember() {
                        if (!this.familyMember) {
                            return;
                        }
                        for (const form of this.viewModel.registrantForms) {
                            for (const field of form.fields) {
                                if (field.guid in this.familyMember.fieldValues) {
                                    const familyMemberValue = this.familyMember.fieldValues[field.guid];
                                    if (!familyMemberValue) {
                                        delete this.currentRegistrant.fieldValues[field.guid];
                                    }
                                    else if (typeof familyMemberValue === "object") {
                                        this.currentRegistrant.fieldValues[field.guid] = Object.assign({}, familyMemberValue);
                                    }
                                    else {
                                        this.currentRegistrant.fieldValues[field.guid] = familyMemberValue;
                                    }
                                }
                                else {
                                    delete this.currentRegistrant.fieldValues[field.guid];
                                }
                            }
                        }
                    }
                },
                watch: {
                    "currentRegistrant.familyGuid"() {
                        this.currentRegistrant.personGuid = null;
                    },
                    familyMember: {
                        handler() {
                            if (!this.familyMember) {
                                for (const form of this.viewModel.registrantForms) {
                                    for (const field of form.fields) {
                                        delete this.currentRegistrant.fieldValues[field.guid];
                                    }
                                }
                            }
                            else {
                                this.copyValuesFromFamilyMember();
                            }
                        }
                    }
                },
                created() {
                    this.copyValuesFromFamilyMember();
                },
                template: `
<div>
    <RockForm @submit="onNext">
        <template v-if="isDataForm">
            <template v-if="currentFormIndex === 0">
                <div v-if="familyOptions.length > 1" class="well js-registration-same-family">
                    <RadioButtonList :label="(firstName || uppercaseRegistrantTerm) + ' is in the same immediate family as'" rules='required:{"allowEmptyString": true}' v-model="currentRegistrant.familyGuid" :items="familyOptions" validationTitle="Family" />
                </div>
                <div v-if="familyMemberOptions.length" class="row">
                    <div class="col-md-6">
                        <DropDownList v-model="currentRegistrant.personGuid" :items="familyMemberOptions" label="Family Member to Register" />
                    </div>
                </div>
            </template>

            <ItemsWithPreAndPostHtml :items="prePostHtmlItems">
                <template v-for="field in currentFormFields" :key="field.guid" v-slot:[field.guid]>
                    <RegistrantPersonField v-if="field.fieldSource === fieldSources.personField" :field="field" :fieldValues="currentRegistrant.fieldValues" :isKnownFamilyMember="!!currentRegistrant.personGuid" />
                    <RegistrantAttributeField v-else-if="field.fieldSource === fieldSources.registrantAttribute || field.fieldSource === fieldSources.personAttribute" :field="field" :fieldValues="currentRegistrant.fieldValues" />
                    <Alert alertType="danger" v-else>Could not resolve field source {{field.fieldSource}}</Alert>
                </template>
            </ItemsWithPreAndPostHtml>

            <div v-if="!isWaitList && isLastForm && viewModel.fees.length" class="well registration-additional-options">
                <h4>{{pluralFeeTerm}}</h4>
                <template v-for="fee in viewModel.fees" :key="fee.guid">
                    <FeeField :fee="fee" v-model="currentRegistrant.feeItemQuantities" />
                </template>
            </div>
        </template>

        <div v-if="isSignatureForm" class="registrant-signature-document styled-scroll">
            <h2 class="signature-header">Please Sign the {{ signatureDocumentTerm }} for {{ firstName }}</h2>
            <div class="signaturedocument-container">
                <iframe src="javascript: window.frameElement.getAttribute('srcdoc');" onload="this.style.height = this.contentWindow.document.body.scrollHeight + 'px'" class="signaturedocument-iframe" border="0" frameborder="0" :srcdoc="signatureSource"></iframe>
            </div>

            <div class="well">
                <ElectronicSignature v-model="signatureData" :isDrawn="isSignatureDrawn" @signed="onSigned" :documentTerm="signatureDocumentTerm" />
            </div>
        </div>

        <div class="actions row">
            <div class="col-xs-6">
                <RockButton v-if="showPrevious" btnType="default" @click="onPrevious">
                    Previous
                </RockButton>
            </div>
            <div class="col-xs-6 text-right">
                <RockButton v-if="isNextVisible" btnType="primary" type="submit" :disabled="isNextDisabled">
                    Next
                </RockButton>
            </div>
        </div>
    </RockForm>
</div>`
            });

            var RegistrationEntryRegistrants = defineComponent({
                name: "Event.RegistrationEntry.Registrants",
                components: {
                    Registrant,
                    Alert
                },
                setup() {
                    return {
                        registrationEntryState: inject("registrationEntryState"),
                        persistSession: inject("persistSession")
                    };
                },
                data() {
                    return {
                        hasCopiedCommonValues: false
                    };
                },
                methods: {
                    onPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.registrationEntryState.currentRegistrantIndex <= 0) {
                                this.$emit("previous");
                                return;
                            }
                            const lastFormIndex = this.registrationEntryState.viewModel.registrantForms.length - 1;
                            this.registrationEntryState.currentRegistrantIndex--;
                            this.registrationEntryState.currentRegistrantFormIndex = lastFormIndex;
                            yield this.persistSession();
                        });
                    },
                    onNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const lastIndex = this.registrationEntryState.registrants.length - 1;
                            if (this.registrationEntryState.currentRegistrantIndex >= lastIndex) {
                                this.$emit("next");
                                return;
                            }
                            if (this.registrationEntryState.currentRegistrantIndex === 0) {
                                this.copyCommonValuesFromFirstRegistrant();
                            }
                            this.registrationEntryState.currentRegistrantIndex++;
                            this.registrationEntryState.currentRegistrantFormIndex = 0;
                            yield this.persistSession();
                        });
                    },
                    copyCommonValuesFromFirstRegistrant() {
                        if (this.hasCopiedCommonValues) {
                            return;
                        }
                        this.hasCopiedCommonValues = true;
                        const firstRegistrant = this.registrants[0];
                        for (let i = 1; i < this.registrants.length; i++) {
                            const currentRegistrant = this.registrants[i];
                            for (const form of this.registrationEntryState.viewModel.registrantForms) {
                                for (const field of form.fields) {
                                    if (!field.isSharedValue) {
                                        continue;
                                    }
                                    const valueToShare = firstRegistrant.fieldValues[field.guid];
                                    if (valueToShare && typeof valueToShare === "object") {
                                        currentRegistrant.fieldValues[field.guid] = Object.assign({}, valueToShare);
                                    }
                                    else {
                                        currentRegistrant.fieldValues[field.guid] = valueToShare;
                                    }
                                }
                            }
                        }
                    }
                },
                computed: {
                    hasWaitlist() {
                        return this.registrationEntryState.registrants.some(r => r.isOnWaitList);
                    },
                    isOnWaitlist() {
                        const currentRegistrant = this.registrationEntryState.registrants[this.registrationEntryState.currentRegistrantIndex];
                        return currentRegistrant.isOnWaitList;
                    },
                    registrantTerm() {
                        return (this.registrationEntryState.viewModel.registrantTerm || "registrant").toLowerCase();
                    },
                    registrants() {
                        return this.registrationEntryState.registrants;
                    },
                    currentRegistrantIndex() {
                        return this.registrationEntryState.currentRegistrantIndex;
                    }
                },
                template: `
<div class="registrationentry-registrant">
    <Alert v-if="hasWaitlist && !isOnWaitlist" alertType="success">
        This {{registrantTerm}} will be fully registered.
    </Alert>
    <Alert v-else-if="isOnWaitlist" alertType="warning">
        This {{registrantTerm}} will be on the waiting list.
    </Alert>
    <template v-for="(r, i) in registrants" :key="r.guid">
        <Registrant v-show="currentRegistrantIndex === i" :currentRegistrant="r" :isWaitList="isOnWaitlist" @next="onNext" @previous="onPrevious" />
    </template>
</div>`
            });

            var RegistrationEntryRegistrationEnd = defineComponent({
                name: "Event.RegistrationEntry.RegistrationEnd",
                components: {
                    RockButton,
                    AttributeValuesContainer,
                    RockForm
                },
                setup(props, { emit }) {
                    var _a, _b;
                    const registrationEntryState = inject("registrationEntryState");
                    const attributeValues = ref({});
                    for (const a of registrationEntryState.viewModel.registrationAttributesEnd) {
                        attributeValues.value[(_a = a.key) !== null && _a !== void 0 ? _a : ""] = registrationEntryState.registrationFieldValues[(_b = a.attributeGuid) !== null && _b !== void 0 ? _b : ""] || "";
                    }
                    const showPrevious = computed(() => {
                        return registrationEntryState.firstStep === registrationEntryState.steps.intro;
                    });
                    const attributes = computed(() => {
                        var _a;
                        const attrs = {};
                        for (const a of registrationEntryState.viewModel.registrationAttributesEnd) {
                            attrs[(_a = a.key) !== null && _a !== void 0 ? _a : ""] = a;
                        }
                        return attrs;
                    });
                    const onPrevious = () => {
                        emit("previous");
                    };
                    const onNext = () => {
                        emit("next");
                    };
                    watch(attributeValues, () => {
                        var _a, _b;
                        for (const a of registrationEntryState.viewModel.registrationAttributesEnd) {
                            registrationEntryState.registrationFieldValues[(_a = a.attributeGuid) !== null && _a !== void 0 ? _a : ""] = attributeValues.value[(_b = a.key) !== null && _b !== void 0 ? _b : ""];
                        }
                    });
                    return {
                        attributes,
                        attributeValues,
                        onNext,
                        onPrevious,
                        showPrevious
                    };
                },
                template: `
<div class="registrationentry-registration-attributes">
    <RockForm @submit="onNext">
        <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :showCategoryLabel="false" />

        <div class="actions row">
            <div class="col-xs-6">
                <RockButton v-if="showPrevious" btnType="default" @click="onPrevious">
                    Previous
                </RockButton>
            </div>
            <div class="col-xs-6 text-right">
                <RockButton btnType="primary" type="submit">
                    Next
                </RockButton>
            </div>
        </div>
    </RockForm>
</div>`
            });

            var RegistrationEntryRegistrationStart = defineComponent({
                name: "Event.RegistrationEntry.RegistrationStart",
                components: {
                    RockButton,
                    AttributeValuesContainer,
                    RockForm
                },
                setup(props, { emit }) {
                    var _a, _b;
                    const registrationEntryState = inject("registrationEntryState");
                    const attributeValues = ref({});
                    for (const a of registrationEntryState.viewModel.registrationAttributesStart) {
                        attributeValues.value[(_a = a.key) !== null && _a !== void 0 ? _a : ""] = registrationEntryState.registrationFieldValues[(_b = a.attributeGuid) !== null && _b !== void 0 ? _b : ""] || "";
                    }
                    const showPrevious = computed(() => {
                        return registrationEntryState.firstStep === registrationEntryState.steps.intro;
                    });
                    const attributes = computed(() => {
                        var _a;
                        const attrs = {};
                        for (const a of registrationEntryState.viewModel.registrationAttributesStart) {
                            attrs[(_a = a.key) !== null && _a !== void 0 ? _a : ""] = a;
                        }
                        return attrs;
                    });
                    const onPrevious = () => {
                        emit("previous");
                    };
                    const onNext = () => {
                        emit("next");
                    };
                    watch(attributeValues, () => {
                        var _a, _b;
                        for (const a of registrationEntryState.viewModel.registrationAttributesStart) {
                            registrationEntryState.registrationFieldValues[(_a = a.attributeGuid) !== null && _a !== void 0 ? _a : ""] = attributeValues.value[(_b = a.key) !== null && _b !== void 0 ? _b : ""];
                        }
                    });
                    return {
                        attributes,
                        attributeValues,
                        onNext,
                        onPrevious,
                        showPrevious
                    };
                },
                template: `
<div class="registrationentry-registration-attributes">
    <RockForm @submit="onNext">
        <AttributeValuesContainer v-model="attributeValues" :attributes="attributes" isEditMode :showCategoryLabel="false" />

        <div class="actions row">
            <div class="col-xs-6">
                <RockButton v-if="showPrevious" btnType="default" @click="onPrevious">
                    Previous
                </RockButton>
            </div>
            <div class="col-xs-6 text-right">
                <RockButton btnType="primary" type="submit">
                    Next
                </RockButton>
            </div>
        </div>
    </RockForm>
</div>`
            });

            var SessionRenewal = defineComponent({
                name: "Event.RegistrationEntry.SessionRenewal",
                components: {
                    Dialog,
                    LoadingIndicator,
                    RockButton
                },
                props: {
                    isSessionExpired: {
                        type: Boolean,
                        required: true
                    }
                },
                setup() {
                    return {
                        registrationEntryState: inject("registrationEntryState"),
                        invokeBlockAction: useInvokeBlockAction()
                    };
                },
                data() {
                    return {
                        spotsSecured: null,
                        isLoading: false,
                        isModalVisible: false
                    };
                },
                computed: {
                    hasWaitlist() {
                        return this.registrationEntryState.viewModel.waitListEnabled;
                    },
                    allRegistrantCount() {
                        return this.registrationEntryState.registrants.length;
                    },
                    waitlistRegistrantCount() {
                        return this.registrationEntryState.registrants.filter(r => r.isOnWaitList).length;
                    },
                    waitlistRegistrantCountWord() {
                        return toWord(this.waitlistRegistrantCount);
                    },
                    nonWaitlistRegistrantCount() {
                        return this.registrationEntryState.registrants.filter(r => !r.isOnWaitList).length;
                    },
                    nonWaitlistRegistrantCountWord() {
                        return toWord(this.nonWaitlistRegistrantCount);
                    }
                },
                methods: {
                    pluralConditional,
                    restart() {
                        this.isLoading = true;
                        location.reload();
                    },
                    close() {
                        this.isModalVisible = false;
                        this.$nextTick(() => {
                            this.spotsSecured = null;
                            this.isLoading = false;
                        });
                    },
                    requestRenewal() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            this.spotsSecured = 0;
                            this.isLoading = true;
                            try {
                                const response = yield this.invokeBlockAction("TryToRenewSession", {
                                    registrationSessionGuid: this.registrationEntryState.registrationSessionGuid
                                });
                                if (response.isSuccess && response.data) {
                                    const asDate = RockDateTime.parseISO(response.data.expirationDateTime);
                                    this.registrationEntryState.sessionExpirationDateMs = (_a = asDate === null || asDate === void 0 ? void 0 : asDate.toMilliseconds()) !== null && _a !== void 0 ? _a : null;
                                    this.spotsSecured = response.data.spotsSecured;
                                }
                                else {
                                    this.registrationEntryState.sessionExpirationDateMs = null;
                                    this.spotsSecured = 0;
                                }
                                let deficiency = this.nonWaitlistRegistrantCount - this.spotsSecured;
                                if (!deficiency) {
                                    this.$emit("success");
                                    this.close();
                                    return;
                                }
                                this.registrationEntryState.viewModel.spotsRemaining = this.spotsSecured;
                                if (!this.hasWaitlist) {
                                    this.registrationEntryState.registrants.length = this.spotsSecured;
                                    return;
                                }
                                for (let i = this.allRegistrantCount - 1; i >= 0; i--) {
                                    if (!deficiency) {
                                        break;
                                    }
                                    const registrant = this.registrationEntryState.registrants[i];
                                    if (registrant.isOnWaitList) {
                                        continue;
                                    }
                                    registrant.isOnWaitList = true;
                                    deficiency--;
                                }
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    }
                },
                watch: {
                    isSessionExpired() {
                        if (this.isSessionExpired) {
                            this.spotsSecured = null;
                            this.isModalVisible = true;
                        }
                    }
                },
                template: `
<Dialog :modelValue="isModalVisible" :dismissible="false">
    <template #header>
        <h4 v-if="isLoading || spotsSecured === null">Registration Timed Out</h4>
        <h4 v-else>Request Extension</h4>
    </template>
    <template #default>
        <LoadingIndicator v-if="isLoading" />
        <template v-else-if="hasWaitlist && spotsSecured === 0">
            Due to high demand there is no longer space available.
            You can continue, but your registrants will be placed on the waitlist.
            Do you wish to continue with the registration?
        </template>
        <template v-else-if="spotsSecured === 0">
            Due to high demand there is no longer space available for this registration.
        </template>
        <template v-else-if="hasWaitlist && spotsSecured !== null">
            Due to high demand there is no longer space available for all your registrants.
            Your last {{waitlistRegistrantCountWord}}
            {{pluralConditional(waitlistRegistrantCount, 'registrant', ' registrants')}}
            will be placed on the waitlist.
            Do you wish to continue with the registration?
        </template>
        <template v-else-if="spotsSecured !== null">
            Due to high demand there is no longer space available for all your registrants.
            Only {{nonWaitlistRegistrantCountWord}} {{pluralConditional(nonWaitlistRegistrantCount, 'spot is', 'spots are')}} available.
            Your registration has been updated to only allow
            {{nonWaitlistRegistrantCountWord}} {{pluralConditional(nonWaitlistRegistrantCount, 'registrant', 'registrants')}}. 
            Do you wish to continue with the registration?
        </template>
        <template v-else>
            Your registration has timed out. Do you wish to request an extension in time?
        </template>
    </template>
    <template v-if="!isLoading" #footer>
        <template v-if="!hasWaitlist && spotsSecured === 0">
            <RockButton btnType="link" @click="restart">Close</RockButton>
        </template>
        <template v-else-if="spotsSecured !== null">
            <RockButton btnType="primary" @click="close">Yes</RockButton>
            <RockButton btnType="link" @click="restart">No, cancel registration</RockButton>
        </template>
        <template v-else>
            <RockButton btnType="primary" @click="requestRenewal">Yes</RockButton>
            <RockButton btnType="link" @click="restart">No, cancel registration</RockButton>
        </template>
    </template>
</Dialog>`
            });

            var RegistrationEntrySuccess = defineComponent({
                name: "Event.RegistrationEntry.Success",
                components: {
                    SaveFinancialAccountForm
                },
                setup() {
                    return {
                        registrationEntryState: inject("registrationEntryState")
                    };
                },
                computed: {
                    registrationTerm() {
                        return this.registrationEntryState.viewModel.registrationTerm.toLowerCase();
                    },
                    messageHtml() {
                        var _a;
                        return ((_a = this.registrationEntryState.successViewModel) === null || _a === void 0 ? void 0 : _a.messageHtml) || `You have successfully completed this ${this.registrationTerm}`;
                    },
                    gatewayGuid() {
                        return this.registrationEntryState.viewModel.gatewayGuid;
                    },
                    transactionCode() {
                        var _a;
                        return this.registrationEntryState.viewModel.isRedirectGateway ?
                            "" :
                            ((_a = this.registrationEntryState.successViewModel) === null || _a === void 0 ? void 0 : _a.transactionCode) || "";
                    },
                    gatewayPersonIdentifier() {
                        var _a;
                        return ((_a = this.registrationEntryState.successViewModel) === null || _a === void 0 ? void 0 : _a.gatewayPersonIdentifier) || "";
                    },
                    enableSaveAccount() {
                        return this.registrationEntryState.viewModel.enableSaveAccount && this.registrationEntryState.savedAccountGuid === null;
                    }
                },
                template: `
<div>
    <div v-html="messageHtml"></div>
    <SaveFinancialAccountForm v-if="gatewayGuid && transactionCode && gatewayPersonIdentifier && enableSaveAccount"
        :gatewayGuid="gatewayGuid"
        :transactionCode="transactionCode"
        :gatewayPersonIdentifier="gatewayPersonIdentifier"
        class="well">
        <template #header>
            <h3>Make Payments Even Easier</h3>
        </template>
    </SaveFinancialAccountForm>
</div>`
            });

            var RegistrationEntryPayment = defineComponent({
                name: "Event.RegistrationEntry.Payment",
                components: {
                    RockButton,
                    RockForm,
                    Alert,
                    GatewayControl,
                    RockValidation
                },
                setup() {
                    const submitPayment = prepareSubmitPayment();
                    const getRegistrationEntryBlockArgs = inject("getRegistrationEntryBlockArgs");
                    const invokeBlockAction = useInvokeBlockAction();
                    const registrationEntryState = inject("registrationEntryState");
                    const loading = ref(false);
                    const gatewayErrorMessage = ref("");
                    const gatewayValidationFields = ref({});
                    const submitErrorMessage = ref("");
                    const selectedSavedAccount = ref("");
                    return {
                        uniqueId: newGuid(),
                        loading,
                        gatewayErrorMessage,
                        gatewayValidationFields,
                        submitErrorMessage,
                        selectedSavedAccount,
                        submitPayment,
                        getRegistrationEntryBlockArgs,
                        invokeBlockAction,
                        registrationEntryState: registrationEntryState
                    };
                },
                computed: {
                    gatewayControlModel() {
                        return this.viewModel.gatewayControl;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    finishButtonText() {
                        return "Pay";
                    },
                    hasSavedAccounts() {
                        return this.registrationEntryState.viewModel.savedAccounts !== null
                            && this.registrationEntryState.viewModel.savedAccounts.length > 0;
                    },
                    savedAccountOptions() {
                        if (this.registrationEntryState.viewModel.savedAccounts === null) {
                            return [];
                        }
                        const options = [...this.registrationEntryState.viewModel.savedAccounts];
                        options.push({
                            value: "",
                            text: "New Payment Method"
                        });
                        return options;
                    },
                    showGateway() {
                        return !this.hasSavedAccounts || this.selectedSavedAccount === "";
                    },
                    amountToPay() {
                        return this.registrationEntryState.amountToPayToday;
                    },
                    amountToPayText() {
                        return `$${this.registrationEntryState.amountToPayToday.toFixed(2)}`;
                    },
                    redirectReturnUrl() {
                        if (window.location.href.includes("?")) {
                            return `${window.location.href}&sessionGuid=${this.registrationEntryState.registrationSessionGuid}`;
                        }
                        else {
                            return `${window.location.href}?sessionGuid=${this.registrationEntryState.registrationSessionGuid}`;
                        }
                    }
                },
                methods: {
                    onPrevious() {
                        this.$emit("previous");
                    },
                    onNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            if (this.registrationEntryState.amountToPayToday) {
                                if (this.showGateway) {
                                    this.gatewayErrorMessage = "";
                                    this.gatewayValidationFields = {};
                                    this.submitPayment();
                                }
                                else if (this.selectedSavedAccount !== "") {
                                    this.registrationEntryState.savedAccountGuid = toGuidOrNull(this.selectedSavedAccount);
                                    const success = yield this.submit();
                                    this.loading = false;
                                    if (success) {
                                        this.$emit("next");
                                    }
                                }
                                else {
                                    this.submitErrorMessage = "Please select a valid payment option.";
                                    this.loading = false;
                                    return;
                                }
                            }
                            else {
                                const success = yield this.submit();
                                this.loading = false;
                                if (success) {
                                    this.$emit("next");
                                }
                            }
                        });
                    },
                    onGatewayControlSuccess(token) {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.registrationEntryState.gatewayToken = token;
                            const success = yield this.submit();
                            this.loading = false;
                            if (success) {
                                this.$emit("next");
                            }
                        });
                    },
                    onGatewayControlError(message) {
                        this.loading = false;
                        this.gatewayErrorMessage = message;
                    },
                    onGatewayControlValidation(invalidFields) {
                        this.loading = false;
                        this.gatewayValidationFields = invalidFields;
                    },
                    getOptionUniqueId(option) {
                        var _a, _b;
                        const key = (_b = (_a = option.value) === null || _a === void 0 ? void 0 : _a.replace(" ", "-")) !== null && _b !== void 0 ? _b : "";
                        return `${this.uniqueId}-${key}`;
                    },
                    getAccountImage(option) {
                        var _a;
                        return (_a = option.image) !== null && _a !== void 0 ? _a : "";
                    },
                    getAccountName(option) {
                        var _a;
                        return (_a = option.text) !== null && _a !== void 0 ? _a : "";
                    },
                    getAccountDescription(option) {
                        var _a;
                        return (_a = option.description) !== null && _a !== void 0 ? _a : "";
                    },
                    submit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.submitErrorMessage = "";
                            const result = yield this.invokeBlockAction("SubmitRegistration", {
                                args: this.getRegistrationEntryBlockArgs()
                            });
                            if (result.isError || !result.data) {
                                this.submitErrorMessage = result.errorMessage || "Unknown error";
                            }
                            else {
                                this.registrationEntryState.successViewModel = result.data;
                            }
                            return result.isSuccess;
                        });
                    }
                },
                template: `
<div class="registrationentry-payment">
    <RockForm @submit="onNext">
        <h4>Payment Information</h4>
        <div>
            Payment Amount: {{ amountToPayText }}
        </div>

        <hr/>

        <div v-if="gatewayControlModel" class="payment-method-options">
            <div v-if="hasSavedAccounts" v-for="savedAccount in savedAccountOptions" class="radio payment-method">
                <label :for="getOptionUniqueId(savedAccount)">
                    <input :id="getOptionUniqueId(savedAccount)"
                        :name="uniqueId"
                        type="radio"
                        :value="savedAccount.value"
                        v-model="selectedSavedAccount" />
                    <span class="label-text payment-method-account">
                        <img v-if="getAccountImage(savedAccount)" class="payment-method-image" :src="getAccountImage(savedAccount)">
                        <span class="payment-method-name">{{ getAccountName(savedAccount) }}</span>
                        <span class="payment-method-description text-muted">{{ getAccountDescription(savedAccount) }}</span>
                    </span>
                </label>
            </div>

            <div class="position-relative overflow-hidden">
                <transition name="rockslide">
                    <div v-if="showGateway" class="hosted-gateway-container payment-method-entry">
                        <Alert v-if="gatewayErrorMessage" alertType="danger">{{gatewayErrorMessage}}</Alert>
                        <RockValidation :errors="gatewayValidationFields" />
                        <div class="hosted-payment-control">
                            <GatewayControl
                                :gatewayControlModel="gatewayControlModel"
                                :amountToPay="amountToPay"
                                :returnUrl="redirectReturnUrl"
                                @success="onGatewayControlSuccess"
                                @error="onGatewayControlError"
                                @validation="onGatewayControlValidation" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <Alert v-if="submitErrorMessage" alertType="danger">{{submitErrorMessage}}</Alert>

        <div class="actions text-right">
            <RockButton class="pull-left" btnType="default" @click="onPrevious" :isLoading="loading" autoDisable>
                Previous
            </RockButton>

            <RockButton v-if="gatewayControlModel" btnType="primary" type="submit" :isLoading="loading" autoDisable>
                {{finishButtonText}}
            </RockButton>
        </div>
    </RockForm>
</div>`
            });

            var RegistrationCostSummaryType;
            (function (RegistrationCostSummaryType) {
                RegistrationCostSummaryType[RegistrationCostSummaryType["Cost"] = 0] = "Cost";
                RegistrationCostSummaryType[RegistrationCostSummaryType["Fee"] = 1] = "Fee";
                RegistrationCostSummaryType[RegistrationCostSummaryType["Discount"] = 2] = "Discount";
                RegistrationCostSummaryType[RegistrationCostSummaryType["Total"] = 3] = "Total";
            })(RegistrationCostSummaryType || (RegistrationCostSummaryType = {}));
            var CostSummary = defineComponent({
                name: "Event.RegistrationEntry.CostSummary",
                components: {
                    Loading,
                    CurrencyBox,
                    HelpBlock
                },
                setup() {
                    return {
                        getRegistrationEntryBlockArgs: inject("getRegistrationEntryBlockArgs"),
                        invokeBlockAction: useInvokeBlockAction(),
                        registrationEntryState: inject("registrationEntryState")
                    };
                },
                data() {
                    return {
                        isLoading: false,
                        lineItems: []
                    };
                },
                computed: {
                    augmentedLineItems() {
                        return this.lineItems.map(li => (Object.assign(Object.assign({}, li), { isFee: li.type === RegistrationCostSummaryType.Fee, discountHelp: (this.hasDiscount && li.cost === li.discountedCost) ? "This item is not eligible for the discount." : "", amountFormatted: asFormattedString(li.cost, 2), discountedAmountFormatted: asFormattedString(li.discountedCost, 2) })));
                    },
                    hasDiscount() {
                        return this.lineItems.some(li => li.discountedCost !== li.cost);
                    },
                    total() {
                        let total = 0;
                        this.lineItems.forEach(li => total += li.cost);
                        return total;
                    },
                    totalFormatted() {
                        return `$${asFormattedString(this.total, 2)}`;
                    },
                    defaultPaymentAmount() {
                        let total = 0;
                        let hasDefault = false;
                        this.lineItems.forEach(li => {
                            if (li.defaultPayment) {
                                hasDefault = true;
                                total += li.defaultPayment;
                            }
                        });
                        total = hasDefault ? total : this.maxAmountCanBePaid;
                        if (total > this.maxAmountCanBePaid) {
                            total = this.maxAmountCanBePaid;
                        }
                        if (total < this.amountDueToday) {
                            total = this.amountDueToday;
                        }
                        if (total < 0) {
                            total = 0;
                        }
                        return total;
                    },
                    discountedTotal() {
                        let total = 0;
                        this.lineItems.forEach(li => total += li.discountedCost);
                        return total;
                    },
                    discountedTotalFormatted() {
                        return `$${asFormattedString(this.discountedTotal, 2)}`;
                    },
                    amountDueToday() {
                        if (this.amountPreviouslyPaid) {
                            return 0;
                        }
                        let total = 0;
                        this.lineItems.forEach(li => total += li.minPayment);
                        return total;
                    },
                    amountDueTodayFormatted() {
                        return `$${asFormattedString(this.amountDueToday, 2)}`;
                    },
                    showAmountDueToday() {
                        return this.amountDueToday !== this.discountedTotal;
                    },
                    amountPreviouslyPaid() {
                        var _a;
                        return ((_a = this.registrationEntryState.viewModel.session) === null || _a === void 0 ? void 0 : _a.previouslyPaid) || 0;
                    },
                    amountPreviouslyPaidFormatted() {
                        return `$${asFormattedString(this.amountPreviouslyPaid, 2)}`;
                    },
                    maxAmountCanBePaid() {
                        const balance = this.discountedTotal - this.amountPreviouslyPaid;
                        if (balance > 0) {
                            return balance;
                        }
                        return 0;
                    },
                    maxAmountCanBePaidFormatted() {
                        return `$${asFormattedString(this.maxAmountCanBePaid, 2)}`;
                    },
                    amountRemaining() {
                        const actual = this.maxAmountCanBePaid - this.registrationEntryState.amountToPayToday;
                        const bounded = actual < 0 ? 0 : actual > this.maxAmountCanBePaid ? this.maxAmountCanBePaid : actual;
                        return bounded;
                    },
                    amountRemainingFormatted() {
                        return `$${asFormattedString(this.amountRemaining, 2)}`;
                    },
                    amountToPayTodayRules() {
                        const rules = [];
                        let min = this.amountDueToday;
                        const max = this.maxAmountCanBePaid;
                        if (min > max) {
                            min = max;
                        }
                        if (min > 0) {
                            rules.push("required");
                        }
                        else {
                            rules.push("notblank");
                        }
                        rules.push(`gte:${min}`);
                        rules.push(`lte:${max}`);
                        return rules;
                    },
                },
                methods: {
                    fetchData() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.isLoading = true;
                            this.lineItems = [];
                            try {
                                const response = yield this.invokeBlockAction("CalculateCost", {
                                    args: this.getRegistrationEntryBlockArgs()
                                });
                                if (response.data) {
                                    this.lineItems = response.data;
                                }
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    }
                },
                created() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.fetchData();
                    });
                },
                watch: {
                    defaultPaymentAmount: {
                        immediate: true,
                        handler() {
                            this.registrationEntryState.amountToPayToday = this.defaultPaymentAmount;
                        }
                    },
                    "registrationEntryState.discountCode"() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.fetchData();
                        });
                    }
                },
                template: `
<Loading :isLoading="isLoading">
    <div class="fee-table">
        <div class="row hidden-xs fee-header">
            <div class="col-sm-6">
                <strong>Description</strong>
            </div>
            <div v-if="hasDiscount" class="col-sm-3 fee-value">
                <strong>Discounted Amount</strong>
            </div>
            <div class="col-sm-3 fee-value">
                <strong>Amount</strong>
            </div>
        </div>
        <div v-for="lineItem in augmentedLineItems" class="row" :class="lineItem.isFee ? 'fee-row-fee' : 'fee-row-cost'">
            <div class="col-sm-6 fee-caption">
                {{lineItem.description}}
            </div>
            <div v-if="hasDiscount" class="col-sm-3 fee-value">
                <HelpBlock v-if="lineItem.discountHelp" :text="lineItem.discountHelp" />
                <span class="visible-xs-inline">Discounted Amount:</span>
                $ {{lineItem.discountedAmountFormatted}}
            </div>
            <div class="col-sm-3 fee-value">
                <span class="visible-xs-inline">Amount:</span>
                $ {{lineItem.amountFormatted}}
            </div>
        </div>
        <div class="row fee-row-total">
            <div class="col-sm-6 fee-caption">
                Total
            </div>
            <div v-if="hasDiscount" class="col-sm-3 fee-value">
                <span class="visible-xs-inline">Discounted Amount:</span>
                {{discountedTotalFormatted}}
            </div>
            <div class="col-sm-3 fee-value">
                <span class="visible-xs-inline">Amount:</span>
                {{totalFormatted}}
            </div>
        </div>
    </div>
    <div class="row fee-totals">
        <div class="col-sm-offset-8 col-sm-4 fee-totals-options">
            <div class="form-group static-control">
                <label class="control-label">Total Cost</label>
                <div class="control-wrapper">
                    <div class="form-control-static">
                        {{discountedTotalFormatted}}
                    </div>
                </div>
            </div>
            <div v-if="amountPreviouslyPaid" class="form-group static-control">
                <label class="control-label">Previously Paid</label>
                <div class="control-wrapper">
                    <div class="form-control-static">
                        {{amountPreviouslyPaidFormatted}}
                    </div>
                </div>
            </div>
            <template v-if="showAmountDueToday && maxAmountCanBePaid">
                <div class="form-group static-control">
                    <label class="control-label">Minimum Due Today</label>
                    <div class="control-wrapper">
                        <div class="form-control-static">
                            {{amountDueTodayFormatted}}
                        </div>
                    </div>
                </div>
                <CurrencyBox label="Amount To Pay Today" :rules="amountToPayTodayRules" v-model="registrationEntryState.amountToPayToday" formGroupClasses="form-right" inputGroupClasses="input-width-md amount-to-pay" />
                <div class="form-group static-control">
                    <label class="control-label">Amount Remaining After Payment</label>
                    <div class="control-wrapper">
                        <div class="form-control-static">
                            {{amountRemainingFormatted}}
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="form-group static-control">
                <label class="control-label">Amount Due</label>
                <div class="control-wrapper">
                    <div class="form-control-static">
                        {{maxAmountCanBePaidFormatted}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</Loading>`
            });

            var DiscountCodeForm = defineComponent({
                name: "Event.RegistrationEntry.DiscountCodeForm",
                components: {
                    RockButton,
                    TextBox,
                    Alert
                },
                setup() {
                    return {
                        invokeBlockAction: useInvokeBlockAction(),
                        registrationEntryState: inject("registrationEntryState")
                    };
                },
                data() {
                    return {
                        loading: false,
                        discountCodeInput: "",
                        discountCodeWarningMessage: ""
                    };
                },
                computed: {
                    discountCodeSuccessMessage() {
                        const discountAmount = this.registrationEntryState.discountAmount;
                        const discountPercent = this.registrationEntryState.discountPercentage;
                        if (!discountPercent && !discountAmount) {
                            return "";
                        }
                        const discountText = discountPercent ?
                            `${asFormattedString(discountPercent * 100, 0)}%` :
                            `$${asFormattedString(discountAmount, 2)}`;
                        return `Your ${discountText} discount code for all registrants was successfully applied.`;
                    },
                    isDiscountPanelVisible() {
                        return this.viewModel.hasDiscountsAvailable;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    }
                },
                methods: {
                    tryDiscountCode() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            try {
                                const result = yield this.invokeBlockAction("CheckDiscountCode", {
                                    code: this.discountCodeInput
                                });
                                if (result.isError || !result.data) {
                                    this.discountCodeWarningMessage = `'${this.discountCodeInput}' is not a valid Discount Code.`;
                                }
                                else {
                                    this.discountCodeWarningMessage = "";
                                    this.registrationEntryState.discountAmount = result.data.discountAmount;
                                    this.registrationEntryState.discountPercentage = result.data.discountPercentage;
                                    this.registrationEntryState.discountCode = result.data.discountCode;
                                }
                            }
                            finally {
                                this.loading = false;
                            }
                        });
                    }
                },
                watch: {
                    "registrationEntryState.DiscountCode": {
                        immediate: true,
                        handler() {
                            this.discountCodeInput = this.registrationEntryState.discountCode;
                        }
                    }
                },
                template: `
<div v-if="isDiscountPanelVisible || discountCodeInput" class="clearfix">
    <Alert v-if="discountCodeWarningMessage" alertType="warning">{{discountCodeWarningMessage}}</Alert>
    <Alert v-if="discountCodeSuccessMessage" alertType="success">{{discountCodeSuccessMessage}}</Alert>
    <div class="form-group pull-right">
        <label class="control-label">Discount Code</label>
        <div class="input-group">
            <input type="text" :disabled="loading || !!discountCodeSuccessMessage" class="form-control input-width-md input-sm" v-model="discountCodeInput" />
            <RockButton v-if="!discountCodeSuccessMessage" btnSize="sm" :isLoading="loading" class="margin-l-sm" @click="tryDiscountCode">
                Apply
            </RockButton>
        </div>
    </div>
</div>`
            });

            const store$1 = useStore();
            var Registrar = defineComponent({
                name: "Event.RegistrationEntry.Registrar",
                components: {
                    TextBox,
                    InlineCheckBox,
                    EmailBox,
                    StaticFormControl,
                    RadioButtonList
                },
                setup() {
                    return {
                        getRegistrationEntryBlockArgs: inject("getRegistrationEntryBlockArgs"),
                        registrationEntryState: inject("registrationEntryState")
                    };
                },
                data() {
                    return {
                        isRegistrarPanelShown: true
                    };
                },
                computed: {
                    useLoggedInPersonForRegistrar() {
                        return (!!this.currentPerson) && this.viewModel.registrarOption === 3;
                    },
                    currentPerson() {
                        return store$1.state.currentPerson;
                    },
                    registrar() {
                        return this.registrationEntryState.registrar;
                    },
                    firstRegistrant() {
                        return this.registrationEntryState.registrants[0];
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    doShowUpdateEmailOption() {
                        var _a;
                        return !this.viewModel.forceEmailUpdate && !!((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.email);
                    },
                    registrantInfos() {
                        return this.registrationEntryState.registrants.map(r => getRegistrantBasicInfo(r, this.viewModel.registrantForms));
                    },
                    registrantTerm() {
                        return this.registrantInfos.length === 1 ? this.viewModel.registrantTerm : this.viewModel.pluralRegistrantTerm;
                    },
                    instanceName() {
                        return this.viewModel.instanceName;
                    },
                    familyOptions() {
                        const options = [];
                        const usedFamilyGuids = {};
                        if (this.viewModel.registrantsSameFamily !== 2) {
                            return options;
                        }
                        for (let i = 0; i < this.registrationEntryState.registrants.length; i++) {
                            const registrant = this.registrationEntryState.registrants[i];
                            const info = getRegistrantBasicInfo(registrant, this.viewModel.registrantForms);
                            if (!usedFamilyGuids[registrant.familyGuid] && (info === null || info === void 0 ? void 0 : info.firstName) && (info === null || info === void 0 ? void 0 : info.lastName)) {
                                options.push({
                                    text: `${info.firstName} ${info.lastName}`,
                                    value: registrant.familyGuid
                                });
                                usedFamilyGuids[registrant.familyGuid] = true;
                            }
                        }
                        if (!usedFamilyGuids[this.registrationEntryState.ownFamilyGuid]) {
                            options.push({
                                text: "None",
                                value: this.registrationEntryState.ownFamilyGuid
                            });
                        }
                        return options;
                    },
                },
                methods: {
                    prefillRegistrar() {
                        this.isRegistrarPanelShown = true;
                        if (this.currentPerson &&
                            (this.viewModel.registrarOption === 3 || this.viewModel.registrarOption === 0)) {
                            this.registrar.nickName = this.currentPerson.nickName || this.currentPerson.firstName || "";
                            this.registrar.lastName = this.currentPerson.lastName || "";
                            this.registrar.email = this.currentPerson.email || "";
                            this.registrar.familyGuid = this.currentPerson.primaryFamilyGuid || null;
                            return;
                        }
                        if (this.viewModel.registrarOption === 0) {
                            return;
                        }
                        if (this.viewModel.registrarOption === 1 || this.viewModel.registrarOption === 2) {
                            const firstRegistrantInfo = getRegistrantBasicInfo(this.firstRegistrant, this.viewModel.registrantForms);
                            this.registrar.nickName = firstRegistrantInfo.firstName;
                            this.registrar.lastName = firstRegistrantInfo.lastName;
                            this.registrar.email = firstRegistrantInfo.email;
                            this.registrar.familyGuid = this.firstRegistrant.familyGuid;
                            const hasAllInfo = (!!this.registrar.nickName) && (!!this.registrar.lastName) && (!!this.registrar.email);
                            if (hasAllInfo && this.viewModel.registrarOption === 2) {
                                this.isRegistrarPanelShown = false;
                            }
                            return;
                        }
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            this.prefillRegistrar();
                        }
                    }
                },
                template: `
<div v-if="isRegistrarPanelShown" class="well">
    <h4>This Registration Was Completed By</h4>
    <template v-if="useLoggedInPersonForRegistrar">
        <div class="row">
            <div class="col-md-6">
                <StaticFormControl label="First Name" v-model="registrar.nickName" />
                <StaticFormControl label="Email" v-model="registrar.email" />
            </div>
            <div class="col-md-6">
                <StaticFormControl label="Last Name" v-model="registrar.lastName" />
            </div>
        </div>
    </template>
    <template v-else>
        <div class="row">
            <div class="col-md-6">
                <TextBox label="First Name" rules="required" v-model="registrar.nickName" tabIndex="1" />
                <EmailBox label="Send Confirmation Emails To" rules="required" v-model="registrar.email" tabIndex="3" />
                <InlineCheckBox v-if="doShowUpdateEmailOption" label="Should Your Account Be Updated To Use This Email Address?" v-model="registrar.updateEmail" />
            </div>
            <div class="col-md-6">
                <TextBox label="Last Name" rules="required" v-model="registrar.lastName" tabIndex="2" />
                <RadioButtonList
                    v-if="familyOptions.length"
                    :label="(registrar.nickName || 'Person') + ' is in the same immediate family as'"
                    rules='required:{"allowEmptyString": true}'
                    v-model="registrar.familyGuid"
                    :items="familyOptions"
                    validationTitle="Family" />
            </div>
        </div>
    </template>
</div>`
            });

            var RegistrationEntrySummary = defineComponent({
                name: "Event.RegistrationEntry.Summary",
                components: {
                    RockButton,
                    EmailBox,
                    RockForm,
                    Alert,
                    DropDownList,
                    GatewayControl,
                    RockValidation,
                    CostSummary,
                    Registrar,
                    DiscountCodeForm
                },
                setup() {
                    const getRegistrationEntryBlockArgs = inject("getRegistrationEntryBlockArgs");
                    const invokeBlockAction = useInvokeBlockAction();
                    const registrationEntryState = inject("registrationEntryState");
                    const loading = ref(false);
                    const submitErrorMessage = ref("");
                    const persistSession = inject("persistSession");
                    return {
                        loading,
                        submitErrorMessage,
                        getRegistrationEntryBlockArgs,
                        invokeBlockAction,
                        persistSession,
                        registrationEntryState: registrationEntryState
                    };
                },
                computed: {
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    registrantInfos() {
                        return this.registrationEntryState.registrants.map(r => getRegistrantBasicInfo(r, this.viewModel.registrantForms));
                    },
                    registrantTerm() {
                        return this.registrantInfos.length === 1 ? this.viewModel.registrantTerm : this.viewModel.pluralRegistrantTerm;
                    },
                    instanceName() {
                        return this.viewModel.instanceName;
                    },
                    finishButtonText() {
                        if (this.registrationEntryState.amountToPayToday) {
                            return this.viewModel.isRedirectGateway ? "Pay" : "Next";
                        }
                        else {
                            return "Finish";
                        }
                    },
                },
                methods: {
                    onPrevious() {
                        this.$emit("previous");
                    },
                    onNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            if (this.registrationEntryState.amountToPayToday) {
                                yield this.persistSession(true);
                                if (this.viewModel.isRedirectGateway) {
                                    const redirectUrl = yield this.getPaymentRedirect();
                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                    else {
                                        this.loading = false;
                                    }
                                }
                                else {
                                    this.loading = false;
                                    this.$emit("next");
                                }
                            }
                            else {
                                const success = yield this.submit();
                                this.loading = false;
                                if (success) {
                                    this.$emit("next");
                                }
                            }
                        });
                    },
                    submit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.submitErrorMessage = "";
                            const result = yield this.invokeBlockAction("SubmitRegistration", {
                                args: this.getRegistrationEntryBlockArgs()
                            });
                            if (result.isError || !result.data) {
                                this.submitErrorMessage = result.errorMessage || "Unknown error";
                            }
                            else {
                                this.registrationEntryState.successViewModel = result.data;
                            }
                            return result.isSuccess;
                        });
                    },
                    getPaymentRedirect() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const result = yield this.invokeBlockAction("GetPaymentRedirect", {
                                args: this.getRegistrationEntryBlockArgs(),
                                returnUrl: window.location.href
                            });
                            if (result.isError || !result.data) {
                                this.submitErrorMessage = result.errorMessage || "Unknown error";
                            }
                            return result.data || "";
                        });
                    },
                },
                template: `
<div class="registrationentry-summary">
    <RockForm @submit="onNext">

        <Registrar />

        <div v-if="viewModel.cost">
            <h4>Payment Summary</h4>
            <DiscountCodeForm />
            <CostSummary />
        </div>

        <div v-if="!viewModel.cost" class="margin-b-md">
            <p>The following {{registrantTerm}} will be registered for {{instanceName}}:</p>
            <ul>
                <li v-for="r in registrantInfos" :key="r.guid">
                    <strong>{{r.firstName}} {{r.lastName}}</strong>
                </li>
            </ul>
        </div>

        <Alert v-if="submitErrorMessage" alertType="danger">{{submitErrorMessage}}</Alert>

        <div class="actions text-right">
            <RockButton v-if="viewModel.allowRegistrationUpdates" class="pull-left" btnType="default" @click="onPrevious" :isLoading="loading" autoDisable>
                Previous
            </RockButton>
            <RockButton btnType="primary" type="submit" :isLoading="loading" autoDisable>
                {{finishButtonText}}
            </RockButton>
        </div>
    </RockForm>
</div>`
            });

            const store = useStore();
            var registrationEntry = exports('default', defineComponent({
                name: "Event.RegistrationEntry",
                components: {
                    RockButton,
                    RegistrationEntryIntro,
                    RegistrationEntryRegistrants,
                    RegistrationEntryRegistrationStart,
                    RegistrationEntryRegistrationEnd,
                    RegistrationEntrySummary,
                    RegistrationEntryPayment,
                    RegistrationEntrySuccess,
                    ProgressTracker,
                    Alert,
                    CountdownTimer,
                    JavaScriptAnchor,
                    SessionRenewal
                },
                setup() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    const steps = {
                        ["intro"]: "intro",
                        ["registrationStartForm"]: "registrationStartForm",
                        ["perRegistrantForms"]: "perRegistrantForms",
                        ["registrationEndForm"]: "registrationEndForm",
                        ["review"]: "review",
                        ["payment"]: "payment",
                        ["success"]: "success"
                    };
                    const notFound = ref(false);
                    const viewModel = useConfigurationValues();
                    const invokeBlockAction = useInvokeBlockAction();
                    const notFoundMessage = (viewModel === null || viewModel === void 0 ? void 0 : viewModel.registrationInstanceNotFoundMessage) || "The selected registration could not be found or is no longer active.";
                    if (viewModel === null || viewModel.registrationInstanceNotFoundMessage) {
                        notFound.value = true;
                        return {
                            viewModel,
                            notFound,
                            notFoundMessage
                        };
                    }
                    if (!viewModel.registrationAttributesStart) {
                        notFound.value = true;
                    }
                    const hasPreAttributes = ((_a = viewModel.registrationAttributesStart) === null || _a === void 0 ? void 0 : _a.length) > 0;
                    let currentStep = steps.intro;
                    if (viewModel.successViewModel) {
                        currentStep = steps.success;
                    }
                    else if (viewModel.session && !viewModel.startAtBeginning) {
                        currentStep = steps.review;
                    }
                    else if (viewModel.maxRegistrants === 1 && isNullOrWhiteSpace(viewModel.instructionsHtml)) {
                        currentStep = hasPreAttributes ? steps.registrationStartForm : steps.perRegistrantForms;
                    }
                    const staticRegistrationEntryState = {
                        steps: steps,
                        viewModel: viewModel,
                        firstStep: currentStep,
                        currentStep: currentStep,
                        currentRegistrantFormIndex: 0,
                        currentRegistrantIndex: 0,
                        registrants: ((_b = viewModel.session) === null || _b === void 0 ? void 0 : _b.registrants) || [getDefaultRegistrantInfo(null, viewModel, null)],
                        registrationFieldValues: ((_c = viewModel.session) === null || _c === void 0 ? void 0 : _c.fieldValues) || {},
                        registrar: ((_d = viewModel.session) === null || _d === void 0 ? void 0 : _d.registrar) || {
                            nickName: "",
                            lastName: "",
                            email: "",
                            updateEmail: true,
                            familyGuid: null
                        },
                        gatewayToken: "",
                        savedAccountGuid: null,
                        discountCode: ((_e = viewModel.session) === null || _e === void 0 ? void 0 : _e.discountCode) || "",
                        discountAmount: ((_f = viewModel.session) === null || _f === void 0 ? void 0 : _f.discountAmount) || 0,
                        discountPercentage: ((_g = viewModel.session) === null || _g === void 0 ? void 0 : _g.discountPercentage) || 0,
                        successViewModel: viewModel.successViewModel,
                        amountToPayToday: 0,
                        sessionExpirationDateMs: null,
                        registrationSessionGuid: ((_h = viewModel.session) === null || _h === void 0 ? void 0 : _h.registrationSessionGuid) || newGuid(),
                        ownFamilyGuid: ((_j = store.state.currentPerson) === null || _j === void 0 ? void 0 : _j.primaryFamilyGuid) || newGuid()
                    };
                    const registrationEntryState = reactive(staticRegistrationEntryState);
                    provide("registrationEntryState", registrationEntryState);
                    const getRegistrationEntryBlockArgs = () => {
                        var _a;
                        return {
                            registrationSessionGuid: registrationEntryState.registrationSessionGuid,
                            gatewayToken: registrationEntryState.gatewayToken,
                            savedAccountGuid: registrationEntryState.savedAccountGuid,
                            discountCode: registrationEntryState.discountCode,
                            fieldValues: registrationEntryState.registrationFieldValues,
                            registrar: registrationEntryState.registrar,
                            registrants: registrationEntryState.registrants,
                            amountToPayNow: registrationEntryState.amountToPayToday,
                            registrationGuid: ((_a = viewModel.session) === null || _a === void 0 ? void 0 : _a.registrationGuid) || null
                        };
                    };
                    provide("getRegistrationEntryBlockArgs", getRegistrationEntryBlockArgs);
                    const persistSession = (force = false) => __awaiter(this, void 0, void 0, function* () {
                        var _k;
                        if (!force && !viewModel.timeoutMinutes) {
                            return;
                        }
                        const response = yield invokeBlockAction("PersistSession", {
                            args: getRegistrationEntryBlockArgs()
                        });
                        if (response.data) {
                            const expirationDate = RockDateTime.parseISO(response.data.expirationDateTime);
                            registrationEntryState.sessionExpirationDateMs = (_k = expirationDate === null || expirationDate === void 0 ? void 0 : expirationDate.toMilliseconds()) !== null && _k !== void 0 ? _k : null;
                        }
                    });
                    provide("persistSession", persistSession);
                    return {
                        viewModel,
                        steps,
                        registrationEntryState,
                        notFound,
                        notFoundMessage,
                        persistSession,
                        invokeBlockAction,
                        getRegistrationEntryBlockArgs
                    };
                },
                data() {
                    return {
                        secondsBeforeExpiration: -1,
                        hasSessionRenewalSuccess: false
                    };
                },
                computed: {
                    currentPerson() {
                        return store.state.currentPerson;
                    },
                    isSessionExpired() {
                        return this.secondsBeforeExpiration === 0 && this.currentStep !== "success";
                    },
                    mustLogin() {
                        return !store.state.currentPerson && this.viewModel != null && (this.viewModel.isUnauthorized || this.viewModel.loginRequiredToRegister);
                    },
                    isUnauthorized() {
                        var _a, _b;
                        return (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.isUnauthorized) !== null && _b !== void 0 ? _b : false;
                    },
                    currentStep() {
                        var _a, _b;
                        return (_b = (_a = this.registrationEntryState) === null || _a === void 0 ? void 0 : _a.currentStep) !== null && _b !== void 0 ? _b : "";
                    },
                    registrants() {
                        var _a, _b;
                        return (_b = (_a = this.registrationEntryState) === null || _a === void 0 ? void 0 : _a.registrants) !== null && _b !== void 0 ? _b : [];
                    },
                    hasPreAttributes() {
                        var _a, _b, _c;
                        return ((_c = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.registrationAttributesStart) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0;
                    },
                    hasPostAttributes() {
                        var _a, _b, _c;
                        return ((_c = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.registrationAttributesEnd) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0;
                    },
                    progressTrackerIndex() {
                        var _a;
                        if (this.currentStep === "intro" || this.registrationEntryState == null) {
                            return 0;
                        }
                        const stepsBeforePre = ((_a = this.registrationEntryState) === null || _a === void 0 ? void 0 : _a.firstStep) === "intro" ? 1 : 0;
                        if (this.currentStep === "registrationStartForm") {
                            return stepsBeforePre;
                        }
                        const stepsBeforeRegistrants = stepsBeforePre + (this.hasPreAttributes ? 1 : 0);
                        if (this.currentStep === "perRegistrantForms") {
                            return this.registrationEntryState.currentRegistrantIndex + stepsBeforeRegistrants;
                        }
                        const stepsToCompleteRegistrants = this.registrationEntryState.registrants.length + stepsBeforeRegistrants;
                        if (this.currentStep === "registrationEndForm") {
                            return stepsToCompleteRegistrants;
                        }
                        if (this.currentStep === "review") {
                            return stepsToCompleteRegistrants + (this.hasPostAttributes ? 1 : 0);
                        }
                        if (this.currentStep === "payment") {
                            return stepsToCompleteRegistrants + (this.hasPostAttributes ? 1 : 0);
                        }
                        return 0;
                    },
                    uppercaseRegistrantTerm() {
                        var _a, _b;
                        return StringFilter.toTitleCase((_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.registrantTerm) !== null && _b !== void 0 ? _b : "");
                    },
                    currentRegistrantTitle() {
                        if (this.registrationEntryState == null) {
                            return "";
                        }
                        const ordinal = Number.toOrdinal(this.registrationEntryState.currentRegistrantIndex + 1);
                        let title = StringFilter.toTitleCase(this.registrants.length <= 1 ?
                            this.uppercaseRegistrantTerm :
                            ordinal + " " + this.uppercaseRegistrantTerm);
                        if (this.registrationEntryState.currentRegistrantFormIndex > 0) {
                            title += " (cont)";
                        }
                        return title;
                    },
                    stepTitleHtml() {
                        var _a, _b, _c, _d, _e, _f;
                        if (this.currentStep === "registrationStartForm") {
                            return (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.registrationAttributeTitleStart) !== null && _b !== void 0 ? _b : "";
                        }
                        if (this.currentStep === "perRegistrantForms") {
                            return this.currentRegistrantTitle;
                        }
                        if (this.currentStep === "registrationEndForm") {
                            return (_d = (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.registrationAttributeTitleEnd) !== null && _d !== void 0 ? _d : "";
                        }
                        if (this.currentStep === "review") {
                            return "Review Registration";
                        }
                        if (this.currentStep === "success") {
                            return ((_f = (_e = this.registrationEntryState) === null || _e === void 0 ? void 0 : _e.successViewModel) === null || _f === void 0 ? void 0 : _f.titleHtml) || "Congratulations";
                        }
                        return "";
                    },
                    progressTrackerItems() {
                        const items = [];
                        if (this.registrationEntryState == null) {
                            return items;
                        }
                        if (this.registrationEntryState.firstStep === "intro") {
                            items.push({
                                key: "Start",
                                title: "Start",
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        if (this.hasPreAttributes) {
                            items.push({
                                key: "Pre",
                                title: this.viewModel.registrationAttributeTitleStart,
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        if (!this.registrationEntryState.registrants.length) {
                            items.push({
                                key: "Registrant",
                                title: toTitleCase(this.viewModel.registrantTerm),
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        for (let i = 0; i < this.registrationEntryState.registrants.length; i++) {
                            const registrant = this.registrationEntryState.registrants[i];
                            const info = getRegistrantBasicInfo(registrant, this.viewModel.registrantForms);
                            if ((info === null || info === void 0 ? void 0 : info.firstName) && (info === null || info === void 0 ? void 0 : info.lastName)) {
                                items.push({
                                    key: `Registrant-${registrant.guid}`,
                                    title: info.firstName,
                                    subtitle: info.lastName
                                });
                            }
                            else {
                                items.push({
                                    key: `Registrant-${registrant.guid}`,
                                    title: toTitleCase(this.viewModel.registrantTerm),
                                    subtitle: toTitleCase(toWord(i + 1))
                                });
                            }
                        }
                        if (this.hasPostAttributes) {
                            items.push({
                                key: "Post",
                                title: this.viewModel.registrationAttributeTitleEnd,
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        items.push({
                            key: "Finalize",
                            title: "Finalize",
                            subtitle: this.viewModel.registrationTerm
                        });
                        return items;
                    },
                    isInvalidGateway() {
                        if (!this.viewModel) {
                            return false;
                        }
                        const hasCostFees = new List(this.viewModel.fees)
                            .any(f => new List(f.items).any(i => i.cost > 0));
                        if (this.viewModel.cost <= 0 && !hasCostFees) {
                            return false;
                        }
                        if (this.viewModel.isRedirectGateway || this.viewModel.gatewayControl.fileUrl) {
                            return false;
                        }
                        return true;
                    },
                    isFull() {
                        if (!this.viewModel || this.viewModel.spotsRemaining === null) {
                            return false;
                        }
                        return this.viewModel.spotsRemaining < 1 && !this.viewModel.waitListEnabled;
                    },
                    preventNewRegistration() {
                        if (!this.viewModel) {
                            return this.isFull;
                        }
                        return this.isFull && !this.viewModel.isExistingRegistration;
                    },
                    registrationTerm() {
                        var _a;
                        return (((_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.registrationTerm) || "registration").toLowerCase();
                    },
                    registrationTermPlural() {
                        var _a;
                        return (((_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.pluralRegistrationTerm) || "registrations").toLowerCase();
                    },
                    registrationTermTitleCase() {
                        return toTitleCase(this.registrationTerm);
                    }
                },
                methods: {
                    onSessionRenewalSuccess() {
                        this.hasSessionRenewalSuccess = true;
                        setTimeout(() => this.hasSessionRenewalSuccess = false, 5000);
                    },
                    onIntroNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = this.hasPreAttributes ? "registrationStartForm" : "perRegistrantForms";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrationStartPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = "intro";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrationStartNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = "perRegistrantForms";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrantPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = this.hasPreAttributes ? "registrationStartForm" : "intro";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrantNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = this.hasPostAttributes ? "registrationEndForm" : "review";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrationEndPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = "perRegistrantForms";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onRegistrationEndNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = "review";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onSummaryPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                if (this.hasPostAttributes) {
                                    this.registrationEntryState.currentStep = "registrationEndForm";
                                }
                                else {
                                    const lastFormIndex = this.registrationEntryState.viewModel.registrantForms.length - 1;
                                    this.registrationEntryState.currentRegistrantFormIndex = lastFormIndex;
                                    this.registrationEntryState.currentStep = "perRegistrantForms";
                                }
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onSummaryNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                if (this.registrationEntryState.amountToPayToday) {
                                    this.registrationEntryState.currentStep = "payment";
                                }
                                else {
                                    this.registrationEntryState.currentStep = "success";
                                }
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onPaymentPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                yield this.persistSession(false);
                                this.registrationEntryState.currentStep = "review";
                                Page.smoothScrollToTop();
                            }
                        });
                    },
                    onPaymentNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.persistSession && this.registrationEntryState) {
                                this.registrationEntryState.currentStep = "success";
                                Page.smoothScrollToTop();
                            }
                        });
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            if (this.viewModel != null && this.registrationEntryState != null) {
                                const forcedFamilyGuid = getForcedFamilyGuid(this.currentPerson, this.viewModel);
                                if (forcedFamilyGuid) {
                                    for (const registrant of this.registrationEntryState.registrants) {
                                        registrant.familyGuid = forcedFamilyGuid;
                                    }
                                }
                            }
                        }
                    },
                    "registrationEntryState.sessionExpirationDateMs": {
                        immediate: true,
                        handler() {
                            var _a;
                            if (!((_a = this.registrationEntryState) === null || _a === void 0 ? void 0 : _a.sessionExpirationDateMs)) {
                                this.secondsBeforeExpiration = -1;
                                return;
                            }
                            const nowMs = RockDateTime.now().toMilliseconds();
                            const thenMs = this.registrationEntryState.sessionExpirationDateMs;
                            const diffMs = thenMs - nowMs;
                            this.secondsBeforeExpiration = diffMs / 1000;
                        }
                    }
                },
                mounted() {
                    var _a;
                    if (((_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.loginRequiredToRegister) && !store.state.currentPerson) {
                        store.redirectToLogin();
                    }
                },
                template: `
<div>
    <Alert v-if="notFound" alertType="warning">
        <strong>Sorry</strong>
        <p>{{notFoundMessage}}</p>
    </Alert>
    <Alert v-else-if="mustLogin" alertType="warning">
        <strong>Please log in</strong>
        <p>You must be logged in to access this registration.</p>
    </Alert>
    <Alert v-else-if="isUnauthorized" alertType="warning">
        <strong>Sorry</strong>
        <p>You are not allowed to view or edit the selected registration since you are not the one who created the registration.</p>
    </Alert>
    <Alert v-else-if="isInvalidGateway" alertType="warning">
        <strong>Incorrect Configuration</strong>
        <p>This registration has costs/fees associated with it but the configured payment gateway is not supported.</p>
    </Alert>
    <Alert v-else-if="preventNewRegistration" class="text-left" alertType="warning">
        <strong>{{registrationTermTitleCase}} Full</strong>
        <p>
            There are not any more {{registrationTermPlural}} available for {{viewModel.instanceName}}.
        </p>
    </Alert>
    <template v-else>
        <h1 v-if="currentStep !== steps.intro" v-html="stepTitleHtml"></h1>
        <ProgressTracker v-if="currentStep !== steps.success" :items="progressTrackerItems" :currentIndex="progressTrackerIndex">
            <template #aside>
                <div v-if="secondsBeforeExpiration >= 0" v-show="secondsBeforeExpiration <= (30 * 60)" class="remaining-time flex-grow-1 flex-md-grow-0">
                    <Alert v-if="hasSessionRenewalSuccess" alertType="success" class="m-0 pt-3" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
                        <h4>Success</h4>
                    </Alert>
                    <span class="remaining-time-title">Time left before timeout</span>
                    <p class="remaining-time-countdown">
                        <CountdownTimer v-model="secondsBeforeExpiration" />
                    </p>
                </div>
            </template>
        </ProgressTracker>
        <RegistrationEntryIntro v-if="currentStep === steps.intro" @next="onIntroNext" />
        <RegistrationEntryRegistrationStart v-else-if="currentStep === steps.registrationStartForm" @next="onRegistrationStartNext" @previous="onRegistrationStartPrevious" />
        <RegistrationEntryRegistrants v-else-if="currentStep === steps.perRegistrantForms" @next="onRegistrantNext" @previous="onRegistrantPrevious" />
        <RegistrationEntryRegistrationEnd v-else-if="currentStep === steps.registrationEndForm" @next="onRegistrationEndNext" @previous="onRegistrationEndPrevious" />
        <RegistrationEntrySummary v-else-if="currentStep === steps.review" @next="onSummaryNext" @previous="onSummaryPrevious" />
        <RegistrationEntryPayment v-else-if="currentStep === steps.payment" @next="onPaymentNext" @previous="onPaymentPrevious" />
        <RegistrationEntrySuccess v-else-if="currentStep === steps.success" />
        <Alert v-else alertType="danger">Invalid State: '{{currentStep}}'</Alert>
    </template>
    <SessionRenewal :isSessionExpired="isSessionExpired" @success="onSessionRenewalSuccess" />
</div>`
            }));

        })
    };
}));
