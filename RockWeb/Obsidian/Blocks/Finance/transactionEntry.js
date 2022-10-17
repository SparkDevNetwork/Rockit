System.register(['tslib', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/currencyBox', 'vue', '@Obsidian/Controls/datePicker', '@Obsidian/Controls/rockButton', '@Obsidian/Utility/guid', '@Obsidian/Utility/rockDateTime', '@Obsidian/Controls/alert', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/block', '@Obsidian/Controls/toggle', '@Obsidian/PageState', '@Obsidian/Controls/textBox', '@Obsidian/Utility/stringUtils', '@Obsidian/Controls/gatewayControl', '@Obsidian/Controls/rockValidation'], (function (exports) {
    'use strict';
    var __awaiter, DropDownList, CurrencyBox, defineComponent, DatePicker, RockButton, newGuid, RockDateTime, Alert, asFormattedString, useInvokeBlockAction, useConfigurationValues, Toggle, useStore, TextBox, asCommaAnd, GatewayControl, prepareSubmitPayment, RockValidation;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            CurrencyBox = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            DatePicker = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            asFormattedString = module.asFormattedString;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            useConfigurationValues = module.useConfigurationValues;
        }, function (module) {
            Toggle = module["default"];
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            asCommaAnd = module.asCommaAnd;
        }, function (module) {
            GatewayControl = module["default"];
            prepareSubmitPayment = module.prepareSubmitPayment;
        }, function (module) {
            RockValidation = module["default"];
        }],
        execute: (function () {

            const store = useStore();
            var transactionEntry = exports('default', defineComponent({
                name: "Finance.TransactionEntry",
                components: {
                    CurrencyBox,
                    DropDownList,
                    DatePicker,
                    RockButton,
                    Alert,
                    Toggle,
                    TextBox,
                    GatewayControl,
                    RockValidation
                },
                setup() {
                    const submitPayment = prepareSubmitPayment();
                    return {
                        submitPayment,
                        invokeBlockAction: useInvokeBlockAction(),
                        configurationValues: useConfigurationValues()
                    };
                },
                data() {
                    const configurationValues = useConfigurationValues();
                    const campuses = configurationValues["campuses"] || [];
                    const frequencies = configurationValues["frequencies"] || [];
                    return {
                        loading: false,
                        gatewayErrorMessage: "",
                        gatewayValidationFields: {},
                        transactionGuid: newGuid(),
                        criticalError: "",
                        pageIndex: 1,
                        page1Error: "",
                        args: {
                            isGivingAsPerson: true,
                            email: "",
                            phoneNumber: "",
                            phoneCountryCode: "",
                            accountAmounts: {},
                            street1: "",
                            street2: "",
                            city: "",
                            state: "",
                            postalCode: "",
                            country: "",
                            firstName: "",
                            lastName: "",
                            businessName: "",
                            financialPersonSavedAccountGuid: null,
                            comment: "",
                            transactionEntityId: null,
                            referenceNumber: "",
                            campusGuid: campuses.length > 0 ? campuses[0].value : "",
                            businessGuid: null,
                            frequencyValueGuid: frequencies.length > 0 ? frequencies[0].value : "",
                            giftDate: RockDateTime.now().toASPString("yyyy-MM-dd"),
                            isGiveAnonymously: false
                        }
                    };
                },
                computed: {
                    totalAmount() {
                        let total = 0;
                        for (const accountKey in this.args.accountAmounts) {
                            total += this.args.accountAmounts[accountKey];
                        }
                        return total;
                    },
                    totalAmountFormatted() {
                        return `$${asFormattedString(this.totalAmount, 2)}`;
                    },
                    gatewayControlModel() {
                        return this.configurationValues["gatewayControl"];
                    },
                    currentPerson() {
                        return store.state.currentPerson;
                    },
                    currentPersonFullName() {
                        var _a, _b;
                        const currentPerson = this.currentPerson;
                        if (currentPerson === null) {
                            return null;
                        }
                        return `${(_a = currentPerson.nickName) !== null && _a !== void 0 ? _a : ""} ${(_b = currentPerson.lastName) !== null && _b !== void 0 ? _b : ""}`;
                    },
                    accounts() {
                        return this.configurationValues["financialAccounts"] || [];
                    },
                    campuses() {
                        return this.configurationValues["campuses"] || [];
                    },
                    frequencies() {
                        return this.configurationValues["frequencies"] || [];
                    },
                    campusName() {
                        var _a;
                        if (this.args.campusGuid === null) {
                            return null;
                        }
                        const matchedCampuses = this.campuses.filter(c => c.value === this.args.campusGuid);
                        return matchedCampuses.length >= 1 ? (_a = matchedCampuses[0].text) !== null && _a !== void 0 ? _a : "" : null;
                    },
                    accountAndCampusString() {
                        const accountNames = [];
                        for (const accountKey in this.args.accountAmounts) {
                            const account = this.accounts.find(a => a.idKey === accountKey);
                            if (!account || !account.publicName) {
                                continue;
                            }
                            accountNames.push(account.publicName);
                        }
                        if (this.campusName) {
                            return `${asCommaAnd(accountNames)} - ${this.campusName}`;
                        }
                        return asCommaAnd(accountNames);
                    }
                },
                methods: {
                    goBack() {
                        this.pageIndex--;
                    },
                    onPageOneSubmit() {
                        if (this.totalAmount <= 0) {
                            this.page1Error = "Please specify an amount";
                            return;
                        }
                        this.page1Error = "";
                        this.pageIndex = 2;
                    },
                    onPageTwoSubmit() {
                        this.loading = true;
                        this.gatewayErrorMessage = "";
                        this.gatewayValidationFields = {};
                        this.submitPayment();
                    },
                    onGatewayControlSuccess(token) {
                        this.loading = false;
                        this.args.referenceNumber = token;
                        this.pageIndex = 3;
                    },
                    onGatewayControlError(message) {
                        this.loading = false;
                        this.gatewayErrorMessage = message;
                    },
                    onGatewayControlValidation(invalidFields) {
                        this.loading = false;
                        this.gatewayValidationFields = invalidFields;
                    },
                    onPageThreeSubmit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            try {
                                yield this.invokeBlockAction("ProcessTransaction", {
                                    args: this.args,
                                    transactionGuid: this.transactionGuid
                                });
                                this.pageIndex = 4;
                            }
                            catch (e) {
                                console.log(e);
                            }
                            finally {
                                this.loading = false;
                            }
                        });
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            if (!this.currentPerson) {
                                return;
                            }
                            this.args.firstName = this.args.firstName || this.currentPerson.firstName || "";
                            this.args.lastName = this.args.lastName || this.currentPerson.lastName || "";
                            this.args.email = this.args.email || this.currentPerson.email || "";
                        }
                    }
                },
                template: `
<div class="transaction-entry-v2">
    <Alert v-if="criticalError" danger>
        {{criticalError}}
    </Alert>
    <template v-else-if="!gatewayControlModel || !gatewayControlModel.fileUrl">
        <h4>Welcome to Rock's On-line Giving Experience</h4>
        <p>
            There is currently no gateway configured.
        </p>
    </template>
    <template v-else-if="pageIndex === 1">
        <h2>Your Generosity Changes Lives (Vue)</h2>
        <template v-for="account in accounts">
            <CurrencyBox :label="account.publicName" v-model="args.accountAmounts[account.guid]" />
        </template>
        <DropDownList label="Campus" v-model="args.campusGuid" :showBlankItem="false" :items="campuses" />
        <DropDownList label="Frequency" v-model="args.frequencyValueGuid" :showBlankItem="false" :items="frequencies" />
        <DatePicker label="Process Gift On" v-model="args.giftDate" />
        <Alert alertType="validation" v-if="page1Error">{{page1Error}}</Alert>
        <RockButton btnType="primary" @click="onPageOneSubmit">Give Now</RockButton>
    </template>
    <template v-else-if="pageIndex === 2">
        <div class="amount-summary">
            <div class="amount-summary-text">
                {{accountAndCampusString}}
            </div>
            <div class="amount-display">
                {{totalAmountFormatted}}
            </div>
        </div>
        <div>
            <Alert v-if="gatewayErrorMessage" alertType="danger">{{gatewayErrorMessage}}</Alert>
            <RockValidation :errors="gatewayValidationFields" />
            <div class="hosted-payment-control">
                <GatewayControl
                    :gatewayControlModel="gatewayControlModel"
                    @success="onGatewayControlSuccess"
                    @error="onGatewayControlError"
                    @validation="onGatewayControlValidation" />
            </div>
            <div class="navigation actions">
                <RockButton btnType="default" @click="goBack" :isLoading="loading">Back</RockButton>
                <RockButton btnType="primary" class="pull-right" @click="onPageTwoSubmit" :isLoading="loading">Next</RockButton>
            </div>
        </div>
    </template>
    <template v-else-if="pageIndex === 3">
        <Toggle v-model="args.isGivingAsPerson">
            <template #on>Individual</template>
            <template #off>Business</template>
        </Toggle>
        <template v-if="args.isGivingAsPerson && currentPerson">
            <div class="form-control-static">
                {{currentPersonFullName}}
            </div>
        </template>
        <template v-else-if="args.isGivingAsPerson">
            <TextBox v-model="args.firstName" placeholder="First Name" class="margin-b-sm" />
            <TextBox v-model="args.lastName" placeholder="Last Name" class="margin-b-sm" />
        </template>
        <div class="navigation actions margin-t-md">
            <RockButton :isLoading="loading" @click="goBack">Back</RockButton>
            <RockButton :isLoading="loading" btnType="primary" class="pull-right" @click="onPageThreeSubmit">Finish</RockButton>
        </div>
    </template>
    <template v-else-if="pageIndex === 4">
        Last Page
    </template>
</div>`
            }));

        })
    };
}));
