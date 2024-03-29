System.register(['tslib', 'vue', './loadingIndicator.js', './gatewayControl.js', '@Obsidian/Utility/promiseUtils', './javaScriptAnchor.js', './componentFromUrl.js', './alert.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, LoadingIndicator, ValidationField, sleep;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            ValidationField = module.ValidationField;
        }, function (module) {
            sleep = module.sleep;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            var myWellGatewayControl = exports('default', defineComponent({
                name: "MyWellGatewayControl",
                components: {
                    LoadingIndicator
                },
                props: {
                    settings: {
                        type: Object,
                        required: true
                    },
                    submit: {
                        type: Boolean,
                        required: true
                    }
                },
                data() {
                    return {
                        tokenizer: null,
                        loading: true
                    };
                },
                methods: {
                    mountControl() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const globalVarName = "Tokenizer";
                            if (!window[globalVarName]) {
                                const script = document.createElement("script");
                                script.type = "text/javascript";
                                script.src = "https://sandbox.gotnpgateway.com/tokenizer/tokenizer.js";
                                document.getElementsByTagName("head")[0].appendChild(script);
                                while (!window[globalVarName]) {
                                    yield sleep(20);
                                }
                            }
                            const settings = this.getTokenizerSettings();
                            this.tokenizer = new window[globalVarName](settings);
                            this.tokenizer.create();
                        });
                    },
                    handleResponse(response) {
                        var _a;
                        this.loading = false;
                        if (!(response === null || response === void 0 ? void 0 : response.status) || response.status === "error") {
                            const errorResponse = response || null;
                            this.$emit("error", (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.message) || "There was an unexpected problem communicating with the gateway.");
                            console.error("MyWell response was errored:", JSON.stringify(response));
                            return;
                        }
                        if (response.status === "validation") {
                            const validationResponse = response || null;
                            if (!((_a = validationResponse === null || validationResponse === void 0 ? void 0 : validationResponse.invalid) === null || _a === void 0 ? void 0 : _a.length)) {
                                this.$emit("error", "There was a validation issue, but the invalid field was not specified.");
                                console.error("MyWell response was errored:", JSON.stringify(response));
                                return;
                            }
                            const validationFields = [];
                            for (const myWellField of validationResponse.invalid) {
                                switch (myWellField) {
                                    case "cc":
                                        validationFields.push(ValidationField.CardNumber);
                                        break;
                                    case "exp":
                                        validationFields.push(ValidationField.Expiry);
                                        break;
                                    default:
                                        console.error("Unknown MyWell validation field", myWellField);
                                        break;
                                }
                            }
                            if (!validationFields.length) {
                                this.$emit("error", "There was a validation issue, but the invalid field could not be inferred.");
                                console.error("MyWell response contained unexpected values:", JSON.stringify(response));
                                return;
                            }
                            this.$emit("validationRaw", validationFields);
                            return;
                        }
                        if (response.status === "success") {
                            const successResponse = response || null;
                            if (!(successResponse === null || successResponse === void 0 ? void 0 : successResponse.token)) {
                                this.$emit("error", "There was an unexpected problem communicating with the gateway.");
                                console.error("MyWell response does not have the expected token:", JSON.stringify(response));
                                return;
                            }
                            this.$emit("successRaw", successResponse.token);
                            return;
                        }
                        this.$emit("error", "There was an unexpected problem communicating with the gateway.");
                        console.error("MyWell response has invalid status:", JSON.stringify(response));
                    },
                    getTokenizerSettings() {
                        return {
                            onLoad: () => {
                                this.loading = false;
                            },
                            apikey: this.publicApiKey,
                            url: this.gatewayUrl,
                            container: this.$refs["container"],
                            submission: (resp) => {
                                this.handleResponse(resp);
                            },
                            settings: {
                                payment: {
                                    types: ["card"],
                                    ach: {
                                        "sec_code": "web"
                                    }
                                },
                                styles: {
                                    body: {
                                        color: "rgb(51, 51, 51)"
                                    },
                                    "#app": {
                                        padding: "5px 15px"
                                    },
                                    "input,select": {
                                        "color": "rgb(85, 85, 85)",
                                        "border-radius": "4px",
                                        "background-color": "rgb(255, 255, 255)",
                                        "border": "1px solid rgb(204, 204, 204)",
                                        "box-shadow": "rgba(0, 0, 0, 0.075) 0px 1px 1px 0px inset",
                                        "padding": "6px 12px",
                                        "font-size": "14px",
                                        "height": "34px",
                                        "font-family": "OpenSans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
                                    },
                                    "input:focus,select:focus": {
                                        "border": "1px solid #66afe9",
                                        "box-shadow": "0 0 0 3px rgba(102,175,233,0.6)"
                                    },
                                    "select": {
                                        "padding": "6px 4px"
                                    },
                                    ".fieldsetrow": {
                                        "margin-left": "-2.5px",
                                        "margin-right": "-2.5px"
                                    },
                                    ".card > .fieldset": {
                                        "padding": "0 !important",
                                        "margin": "0 2.5px 5px !important"
                                    },
                                    "input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button": {
                                        "-webkit-appearance": "none",
                                        "margin": "0"
                                    }
                                }
                            }
                        };
                    }
                },
                computed: {
                    publicApiKey() {
                        return this.settings.publicApiKey;
                    },
                    gatewayUrl() {
                        return this.settings.gatewayUrl;
                    }
                },
                watch: {
                    submit() {
                        if (this.submit && this.tokenizer) {
                            this.loading = true;
                            this.tokenizer.submit();
                        }
                    }
                },
                mounted() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.mountControl();
                    });
                },
                template: `
<div>
    <div ref="container" style="min-height: 49px;"></div>
    <div v-if="loading" class="text-center">
        <LoadingIndicator />
    </div>
</div>`
            }));

        })
    };
}));
