System.register(['tslib', 'vue', './loadingIndicator.js', './textBox.js', '@Obsidian/Utility/guid', './gatewayControl.js', '@Obsidian/Utility/component', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './componentFromUrl.js', './alert.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, LoadingIndicator, TextBox, newGuid, onSubmitPayment;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
        }, function (module) {
            LoadingIndicator = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            onSubmitPayment = module.onSubmitPayment;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var testGatewayControl = exports('default', defineComponent({
                name: "TestGatewayControl",
                components: {
                    LoadingIndicator,
                    TextBox
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
                setup(props, { emit }) {
                    const cardNumber = ref("");
                    const submit = () => __awaiter(this, void 0, void 0, function* () {
                        yield new Promise(resolve => setTimeout(resolve, 500));
                        if (cardNumber.value === "0000") {
                            emit("error", "This is a serious problem with the gateway.");
                            return;
                        }
                        if (cardNumber.value.length <= 10) {
                            emit("validation", {
                                "Card Number": "Card number is invalid."
                            });
                            return;
                        }
                        const token = newGuid().replace(/-/g, "");
                        emit("success", token);
                    });
                    onSubmitPayment(submit);
                    return {
                        cardNumber
                    };
                },
                template: `
<div style="max-width: 600px; margin-left: auto; margin-right: auto;">
    <TextBox label="Credit Card" v-model="cardNumber" />
</div>`
            }));

        })
    };
}));
