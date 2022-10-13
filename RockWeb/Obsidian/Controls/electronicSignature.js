System.register(['tslib', 'vue', './rockButton.js', './textBox.js', './emailBox.js', '@Obsidian/Utility/page', '@Obsidian/Utility/component', './rockForm.js', '@Obsidian/PageState', '@Obsidian/Utility/promiseUtils', './rockFormField.js', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js', './rockValidation.js', './alert.js'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, RockButton, TextBox, EmailBox, loadJavaScriptAsync, updateRefValue, RockForm, useStore;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            EmailBox = module["default"];
        }, function (module) {
            loadJavaScriptAsync = module.loadJavaScriptAsync;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            useStore = module.useStore;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            const signaturePadPromise = loadJavaScriptAsync("/Scripts/signature_pad/signature_pad.umd.min.js", () => !!window.SignaturePad);
            var electronicSignature = exports('default', defineComponent({
                name: "ElectronicSignature",
                components: {
                    RockButton,
                    RockForm,
                    TextBox,
                    EmailBox
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: false
                    },
                    isDrawn: {
                        type: Boolean,
                        default: false
                    },
                    documentTerm: {
                        type: String,
                        default: "document"
                    }
                },
                emits: {
                    "update:modelValue": (_data) => true,
                    "signed": () => true
                },
                setup(props, { emit }) {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const store = useStore();
                    const signatureData = ref((_b = (_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.signatureData) !== null && _b !== void 0 ? _b : "");
                    const signedByName = ref((_d = (_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.signedByName) !== null && _d !== void 0 ? _d : "");
                    const signedByEmail = ref((_h = (_f = (_e = props.modelValue) === null || _e === void 0 ? void 0 : _e.signedByEmail) !== null && _f !== void 0 ? _f : (_g = store.state.currentPerson) === null || _g === void 0 ? void 0 : _g.email) !== null && _h !== void 0 ? _h : "");
                    const signatureCanvas = ref(null);
                    const signatureCanvasContainer = ref(null);
                    const isSigning = ref(true);
                    let signaturePad = null;
                    const signedByEmailLabel = computed(() => {
                        return `Please enter an email address below where we can send a copy of the ${props.documentTerm.toLowerCase()} to.`;
                    });
                    const resizeSignatureCanvas = () => {
                        var _a;
                        if (signaturePad === null || signatureCanvas.value === null || signatureCanvasContainer.value === null) {
                            return;
                        }
                        let containerWidth = signatureCanvasContainer.value.clientWidth;
                        if (containerWidth === 0) {
                            containerWidth = 400;
                        }
                        const ratio = 1;
                        signatureCanvas.value.width = containerWidth * ratio;
                        signatureCanvas.value.height = 100 * ratio;
                        (_a = signatureCanvas.value.getContext("2d")) === null || _a === void 0 ? void 0 : _a.scale(ratio, ratio);
                        signaturePad.clear();
                    };
                    const onClearClick = () => {
                        signatureData.value = "";
                        signaturePad === null || signaturePad === void 0 ? void 0 : signaturePad.clear();
                    };
                    const onSubmit = () => {
                        var _a;
                        if (isSigning.value) {
                            isSigning.value = false;
                            if (!signedByName.value && store.state.currentPerson) {
                                signedByName.value = (_a = store.state.currentPerson.fullName) !== null && _a !== void 0 ? _a : "";
                            }
                        }
                        else {
                            const newValue = {
                                signatureData: signatureData.value,
                                signedByName: signedByName.value,
                                signedByEmail: signedByEmail.value
                            };
                            emit("update:modelValue", newValue);
                            emit("signed");
                        }
                    };
                    watch(() => props.modelValue, () => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                        let isChanged = false;
                        if (((_a = props.modelValue) === null || _a === void 0 ? void 0 : _a.signatureData) === signatureData.value && ((_b = props.modelValue) === null || _b === void 0 ? void 0 : _b.signedByName) === signedByName.value && ((_c = props.modelValue) === null || _c === void 0 ? void 0 : _c.signedByEmail) === signedByName.value) {
                            return;
                        }
                        isChanged || (isChanged = updateRefValue(signatureData, (_e = (_d = props.modelValue) === null || _d === void 0 ? void 0 : _d.signatureData) !== null && _e !== void 0 ? _e : ""));
                        isChanged || (isChanged = updateRefValue(signedByName, (_g = (_f = props.modelValue) === null || _f === void 0 ? void 0 : _f.signedByName) !== null && _g !== void 0 ? _g : ""));
                        isChanged || (isChanged = updateRefValue(signedByEmail, (_j = (_h = props.modelValue) === null || _h === void 0 ? void 0 : _h.signedByEmail) !== null && _j !== void 0 ? _j : ""));
                        if (isChanged) {
                            isSigning.value = true;
                            if (signaturePad !== null) {
                                signaturePad.clear();
                            }
                        }
                    });
                    watch(signatureCanvas, () => __awaiter(this, void 0, void 0, function* () {
                        if (signatureCanvas.value !== null) {
                            yield signaturePadPromise;
                            signaturePad = new SignaturePad(signatureCanvas.value, {
                                backgroundColor: "white",
                                penColor: "black"
                            });
                            signaturePad.addEventListener("endStroke", () => {
                                var _a;
                                signatureData.value = (_a = signaturePad === null || signaturePad === void 0 ? void 0 : signaturePad.toDataURL("image/png")) !== null && _a !== void 0 ? _a : "";
                            });
                            resizeSignatureCanvas();
                        }
                        else {
                            signaturePad === null || signaturePad === void 0 ? void 0 : signaturePad.off();
                            signaturePad = null;
                        }
                    }));
                    window.addEventListener("resize", () => resizeSignatureCanvas());
                    return {
                        isSigning,
                        onClearClick,
                        onSubmit,
                        signatureCanvas,
                        signatureCanvasContainer,
                        signedByEmail,
                        signedByEmailLabel,
                        signedByName,
                        signatureData,
                    };
                },
                template: `
<div>
    <div v-if="isSigning" class="signature-entry">
        <RockForm @submit="onSubmit">
            <div v-if="isDrawn" class="signature-entry-drawn">
                <div v-show="false">
                    <TextBox :modelValue="signatureData" label="Signature" rules="required" />
                </div>

                <span class="signature-entry-instructions text-muted small">Use mouse or finger to sign below.</span>

                <div ref="signatureCanvasContainer" class="signature-entry-drawn-container position-relative d-flex align-items-end">
                    <div class="signature-entry-canvas-col">
                        <canvas ref="signatureCanvas" class="e-signature-pad" style="border-bottom: 1px solid #c4c4c4;"></canvas>
                    </div>

                    <div class="signature-entry-clear-col">
                        <a class="btn btn-link p-1 p-md-2 text-color" title="Clear Signature" @click.prevent="onClearClick"><i class="fa fa-2x fa-undo"></i></a>
                    </div>
                </div>
            </div>

            <div v-else class="signature-entry-typed">
                <TextBox v-model="signedByName"
                    label="Type Name"
                    rules="required" />
            </div>

            <div class="signature-entry-agreement">
                By clicking the sign button below, I agree to the above document and understand this is a legal representation of my signature.
            </div>

            <div class="text-right">
                <RockButton type="submit" btnType="primary" btnSize="xs">Sign</RockButton>
            </div>
        </RockForm>
    </div>

    <div v-else class="signature-entry-complete">
        <RockForm @submit="onSubmit">
            <TextBox v-if="isDrawn"
                v-model="signedByName"
                label="Please enter your legal name"
                rules="required" />

            <EmailBox v-model="signedByEmail"
                :label="signedByEmailLabel"
                rules="required" />

            <div class="text-right">
                <RockButton type="submit" btnType="primary" btnSize="xs">Complete</RockButton>
            </div>
        </RockForm>
    </div>
</div>
`
            }));

        })
    };
}));
