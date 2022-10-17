System.register(['tslib', 'vue', './alert.js', './inlineCheckBox.js', './rockButton.js', './textBox.js', './rockForm.js', '@Obsidian/PageState', '@Obsidian/Utility/http', '@Obsidian/Utility/promiseUtils', '@Obsidian/Utility/component', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './rockValidation.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, Alert, InlineCheckBox, RockButton, TextBox, RockForm, useStore, useHttp;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            InlineCheckBox = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            useHttp = module.useHttp;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const store = useStore();
            const SaveFinancialAccountForm = exports('default', defineComponent({
                name: "SaveFinancialAccountForm",
                components: {
                    InlineCheckBox,
                    TextBox,
                    Alert,
                    RockButton,
                    RockForm
                },
                props: {
                    gatewayGuid: {
                        type: String,
                        required: true
                    },
                    transactionCode: {
                        type: String,
                        required: true
                    },
                    gatewayPersonIdentifier: {
                        type: String,
                        required: true
                    }
                },
                setup() {
                    const http = useHttp();
                    return {
                        http
                    };
                },
                data() {
                    return {
                        doSave: false,
                        username: "",
                        password: "",
                        confirmPassword: "",
                        savedAccountName: "",
                        isLoading: false,
                        successTitle: "",
                        successMessage: "",
                        errorTitle: "",
                        errorMessage: ""
                    };
                },
                computed: {
                    currentPerson() {
                        return store.state.currentPerson;
                    },
                    isLoginCreationNeeded() {
                        return !this.currentPerson;
                    },
                },
                methods: {
                    onSubmit() {
                        var _a, _b, _c;
                        return __awaiter(this, void 0, void 0, function* () {
                            this.errorTitle = "";
                            this.errorMessage = "";
                            if (this.password !== this.confirmPassword) {
                                this.errorTitle = "Password";
                                this.errorMessage = "The password fields do not match.";
                                return;
                            }
                            this.isLoading = true;
                            const options = {
                                gatewayGuid: this.gatewayGuid,
                                password: this.password,
                                savedAccountName: this.savedAccountName,
                                transactionCode: this.transactionCode,
                                username: this.username,
                                gatewayPersonIdentifier: this.gatewayPersonIdentifier
                            };
                            const result = yield this.http.post("/api/v2/Controls/SaveFinancialAccountFormSaveAccount", null, options);
                            if (result.isSuccess && ((_a = result.data) === null || _a === void 0 ? void 0 : _a.isSuccess)) {
                                this.successTitle = result.data.title || "";
                                this.successMessage = result.data.detail || "Success";
                            }
                            else {
                                this.errorTitle = ((_b = result.data) === null || _b === void 0 ? void 0 : _b.title) || "";
                                this.errorMessage = ((_c = result.data) === null || _c === void 0 ? void 0 : _c.detail) || "Error";
                            }
                            this.isLoading = false;
                        });
                    }
                },
                template: `
<div>
    <Alert v-if="successMessage" alertType="success" class="m-0">
        <strong v-if="successTitle">{{successTitle}}:</strong>
        {{successMessage}}
    </Alert>
    <template v-else>
        <slot name="header">
            <h3>Make Giving Even Easier</h3>
        </slot>
        <Alert v-if="errorMessage" alertType="danger">
            <strong v-if="errorTitle">{{errorTitle}}:</strong>
            {{errorMessage}}
        </Alert>
        <InlineCheckBox label="Save account information for future gifts" v-model="doSave" />
        <RockForm v-if="doSave" @submit="onSubmit">
            <TextBox label="Name for the account" rules="required" v-model="savedAccountName" />
            <template v-if="isLoginCreationNeeded">
                <Alert alertType="info">
                    <strong>Note:</strong>
                    For security purposes you will need to login to use your saved account information. To create
                    a login account please provide a user name and password below. You will be sent an email with
                    the account information above as a reminder.
                </Alert>
                <TextBox label="Username" v-model="username" rules="required" />
                <TextBox label="Password" v-model="password" type="password" rules="required" />
                <TextBox label="Confirm Password" v-model="confirmPassword" type="password" rules="required" />
            </template>
            <RockButton :isLoading="isLoading" btnType="primary" type="submit">Save Account</RockButton>
        </RockForm>
    </template>
</div>`
            }));

        })
    };
}));
