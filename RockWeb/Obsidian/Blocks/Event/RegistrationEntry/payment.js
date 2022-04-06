System.register(["vue", "../../../Controls/gatewayControl", "../../../Controls/rockForm", "../../../Controls/rockValidation", "../../../Elements/alert", "../../../Elements/rockButton", "../../../Util/block", "../../../Util/guid"], function (exports_1, context_1) {
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
    var vue_1, gatewayControl_1, rockForm_1, rockValidation_1, alert_1, rockButton_1, block_1, guid_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (gatewayControl_1_1) {
                gatewayControl_1 = gatewayControl_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (rockValidation_1_1) {
                rockValidation_1 = rockValidation_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (guid_1_1) {
                guid_1 = guid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Event.RegistrationEntry.Payment",
                components: {
                    RockButton: rockButton_1.default,
                    RockForm: rockForm_1.default,
                    Alert: alert_1.default,
                    GatewayControl: gatewayControl_1.default,
                    RockValidation: rockValidation_1.default
                },
                setup() {
                    const submitPayment = gatewayControl_1.prepareSubmitPayment();
                    const getRegistrationEntryBlockArgs = vue_1.inject("getRegistrationEntryBlockArgs");
                    const invokeBlockAction = block_1.useInvokeBlockAction();
                    const registrationEntryState = vue_1.inject("registrationEntryState");
                    const loading = vue_1.ref(false);
                    const gatewayErrorMessage = vue_1.ref("");
                    const gatewayValidationFields = vue_1.ref({});
                    const submitErrorMessage = vue_1.ref("");
                    const selectedSavedAccount = vue_1.ref("");
                    return {
                        uniqueId: guid_1.newGuid(),
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
                                    this.registrationEntryState.savedAccountGuid = guid_1.toGuidOrNull(this.selectedSavedAccount);
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
                        const key = option.value.replace(" ", "-");
                        return `${this.uniqueId}-${key}`;
                    },
                    getAccountImage(option) {
                        var _a;
                        return (_a = option.image) !== null && _a !== void 0 ? _a : "";
                    },
                    getAccountName(option) {
                        return option.text;
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
                        <span class="payment-method-name" v-text="getAccountName(savedAccount)"></span>
                        <span class="payment-method-description text-muted" v-text="getAccountDescription(savedAccount)"></span>
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
            <RockButton class="pull-left" btnType="default" @click="onPrevious" :isLoading="loading">
                Previous
            </RockButton>

            <RockButton v-if="gatewayControlModel" btnType="primary" type="submit" :isLoading="loading">
                {{finishButtonText}}
            </RockButton>
        </div>
    </RockForm>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=payment.js.map