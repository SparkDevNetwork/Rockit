System.register(['tslib', 'vue', './alert.js', './loadingIndicator.js'], (function (exports, module) {
    'use strict';
    var __awaiter, defineComponent, markRaw, Alert, LoadingIndicator;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            markRaw = module.markRaw;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            LoadingIndicator = module["default"];
        }],
        execute: (function () {

            var ComponentFromUrl = exports('default', defineComponent({
                name: "ComponentFromUrl",
                components: {
                    LoadingIndicator,
                    Alert
                },
                props: {
                    url: {
                        type: String,
                        required: true
                    }
                },
                data() {
                    return {
                        control: null,
                        loading: true,
                        error: ""
                    };
                },
                created() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!this.url) {
                            this.error = `Could not load the control because no URL was provided`;
                            this.loading = false;
                            return;
                        }
                        try {
                            const controlComponentModule = yield module.import(this.url);
                            const control = controlComponentModule ?
                                (controlComponentModule.default || controlComponentModule) :
                                null;
                            if (control) {
                                this.control = markRaw(control);
                            }
                        }
                        catch (e) {
                            console.error(e);
                            this.error = `Could not load the control for '${this.url}'`;
                        }
                        finally {
                            this.loading = false;
                            if (!this.control) {
                                this.error = `Could not load the control for '${this.url}'`;
                            }
                        }
                    });
                },
                template: `
<Alert v-if="error" alertType="danger">{{error}}</Alert>
<LoadingIndicator v-else-if="loading" />
<component v-else :is="control" />`
            }));

        })
    };
}));
