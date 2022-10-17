System.register(['tslib', '@Obsidian/Controls/textBox', '@Obsidian/Controls/inlineCheckBox', '@Obsidian/Controls/rockButton', 'vue', '@Obsidian/Utility/block', '@Obsidian/Controls/alert', '@Obsidian/Utility/rockDateTime', '@Obsidian/Utility/url'], (function (exports) {
    'use strict';
    var __awaiter, TextBox, InlineCheckBox, RockButton, defineComponent, useInvokeBlockAction, Alert, RockDateTime, makeUrlRedirectSafe;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            InlineCheckBox = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            RockDateTime = module.RockDateTime;
        }, function (module) {
            makeUrlRedirectSafe = module.makeUrlRedirectSafe;
        }],
        execute: (function () {

            var login = exports('default', defineComponent({
                name: "Security.Login",
                components: {
                    TextBox,
                    InlineCheckBox,
                    RockButton,
                    Alert
                },
                setup() {
                    return {
                        invokeBlockAction: useInvokeBlockAction()
                    };
                },
                data() {
                    return {
                        username: "",
                        password: "",
                        rememberMe: false,
                        isLoading: false,
                        errorMessage: ""
                    };
                },
                methods: {
                    setCookie(cookie) {
                        let expires = "";
                        if (cookie.expires) {
                            const date = RockDateTime.parseHTTP(cookie.expires);
                            if (date === null || date < RockDateTime.now()) {
                                expires = "";
                            }
                            else {
                                expires = `; expires=${date.toHTTPString()}`;
                            }
                        }
                        else {
                            expires = "";
                        }
                        document.cookie = `${cookie.name}=${cookie.value}${expires}; path=/`;
                    },
                    redirectAfterLogin() {
                        const urlParams = new URLSearchParams(window.location.search);
                        const returnUrl = urlParams.get("returnurl");
                        if (returnUrl) {
                            window.location.href = makeUrlRedirectSafe(decodeURIComponent(returnUrl));
                        }
                    },
                    onHelpClick() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.isLoading = true;
                            this.errorMessage = "";
                            try {
                                const result = yield this.invokeBlockAction("help", undefined);
                                if (result.isError) {
                                    this.errorMessage = result.errorMessage || "An unknown error occurred communicating with the server";
                                }
                                else if (result.data) {
                                    window.location.href = makeUrlRedirectSafe(result.data);
                                }
                            }
                            catch (e) {
                                this.errorMessage = `An exception occurred: ${e}`;
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    },
                    submitLogin() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            try {
                                const result = yield this.invokeBlockAction("DoLogin", {
                                    username: this.username,
                                    password: this.password,
                                    rememberMe: this.rememberMe
                                });
                                if (result && !result.isError && result.data && result.data.authCookie) {
                                    this.setCookie(result.data.authCookie);
                                    this.redirectAfterLogin();
                                    return;
                                }
                                this.isLoading = false;
                                this.errorMessage = result.errorMessage || "An unknown error occurred communicating with the server";
                            }
                            catch (e) {
                                if (typeof e === "string") {
                                    this.errorMessage = e;
                                }
                                else {
                                    this.errorMessage = `An exception occurred: ${e}`;
                                }
                                this.isLoading = false;
                            }
                        });
                    }
                },
                template: `
<div class="login-block">
    <fieldset>
        <legend>Login</legend>

        <Alert v-if="errorMessage" alertType="danger">
            <div v-html="errorMessage"></div>
        </Alert>

        <form @submit.prevent="submitLogin">
            <TextBox label="Username" v-model="username" />
            <TextBox label="Password" v-model="password" type="password" />
            <InlineCheckBox label="Keep me logged in" v-model="rememberMe" />
            <RockButton btnType="primary" :is-loading="isLoading" loading-text="Logging In..." type="submit">
                Log In
            </RockButton>
        </form>

        <RockButton btnType="link" :is-loading="isLoading" @click="onHelpClick">
            Forgot Account
        </RockButton>

    </fieldset>
</div>`
            }));

        })
    };
}));
