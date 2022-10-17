System.register(['vue', './javaScriptAnchor.js', './componentFromUrl.js', 'tslib', './alert.js', './loadingIndicator.js'], (function (exports) {
    'use strict';
    var defineComponent, computed, provide, inject, JavaScriptAnchor, ComponentFromUrl;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            provide = module.provide;
            inject = module.inject;
        }, function (module) {
            JavaScriptAnchor = module["default"];
        }, function (module) {
            ComponentFromUrl = module["default"];
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            const submitPaymentCallbackSymbol = Symbol("gateway-submit-payment-callback");
            const prepareSubmitPayment = exports('prepareSubmitPayment', () => {
                const container = {};
                provide(submitPaymentCallbackSymbol, container);
                return () => {
                    if (container.callback) {
                        container.callback();
                    }
                    else {
                        throw "Submit payment callback has not been defined.";
                    }
                };
            });
            const onSubmitPayment = exports('onSubmitPayment', (callback) => {
                const container = inject(submitPaymentCallbackSymbol);
                if (!container) {
                    throw "Gateway control has not been properly initialized.";
                }
                container.callback = callback;
            });
            var ValidationField; exports('ValidationField', ValidationField);
            (function (ValidationField) {
                ValidationField[ValidationField["CardNumber"] = 0] = "CardNumber";
                ValidationField[ValidationField["Expiry"] = 1] = "Expiry";
                ValidationField[ValidationField["SecurityCode"] = 2] = "SecurityCode";
            })(ValidationField || (exports('ValidationField', ValidationField = {})));
            var gatewayControl = exports('default', defineComponent({
                name: "GatewayControl",
                components: {
                    ComponentFromUrl,
                    JavaScriptAnchor
                },
                props: {
                    gatewayControlModel: {
                        type: Object,
                        required: true
                    },
                    amountToPay: {
                        type: Number,
                        required: true
                    },
                    returnUrl: {
                        type: String,
                        required: false
                    }
                },
                setup(props, { emit }) {
                    const url = computed(() => props.gatewayControlModel.fileUrl);
                    const settings = computed(() => props.gatewayControlModel.settings);
                    const amountToPay = computed(() => props.amountToPay);
                    const onSuccess = (token) => {
                        emit("success", token);
                    };
                    const onValidation = (validationErrors) => {
                        emit("validation", validationErrors);
                    };
                    const onError = (message) => {
                        emit("error", message);
                    };
                    return {
                        url,
                        settings,
                        amountToPay,
                        returnUrl: props.returnUrl,
                        onSuccess,
                        onValidation,
                        onError
                    };
                },
                methods: {},
                template: `
<div>
    <ComponentFromUrl :url="url"
        :settings="settings"
        :amount="amountToPay"
        :returnUrl="returnUrl"
        @validation="onValidation"
        @success="onSuccess"
        @error="onError" />
</div>
`
            }));

        })
    };
}));
