System.register(['tslib', '@Obsidian/Utility/bus', '@Obsidian/Templates/block', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/textBox', 'vue', '@Obsidian/PageState', '@Obsidian/Controls/emailBox', '@Obsidian/Controls/rockValidation', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/loading', '@Obsidian/Controls/primaryBlock', '@Obsidian/Utility/block', '@Obsidian/Controls/datePicker', '@Obsidian/Controls/addressControl', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/rockDateTime'], (function (exports) {
    'use strict';
    var __awaiter, bus, Block, RockButton, TextBox, defineComponent, useStore, EmailBox, RockValidation, RockForm, Loading, PrimaryBlock, useInvokeBlockAction, DatePicker, AddressControl, getDefaultAddressControlModel, toNumber, RockDateTime, DateTimeFormat;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            bus = module["default"];
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useStore = module.useStore;
        }, function (module) {
            EmailBox = module["default"];
        }, function (module) {
            RockValidation = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            Loading = module["default"];
        }, function (module) {
            PrimaryBlock = module["default"];
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
        }, function (module) {
            DatePicker = module["default"];
        }, function (module) {
            AddressControl = module["default"];
            getDefaultAddressControlModel = module.getDefaultAddressControlModel;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            RockDateTime = module.RockDateTime;
            DateTimeFormat = module.DateTimeFormat;
        }],
        execute: (function () {

            const store = useStore();
            var personDetail = exports('default', defineComponent({
                name: "Example.PersonDetail",
                components: {
                    Block,
                    RockButton,
                    TextBox,
                    EmailBox,
                    RockValidation,
                    RockForm,
                    Loading,
                    PrimaryBlock,
                    DatePicker,
                    AddressControl
                },
                setup() {
                    return {
                        invokeBlockAction: useInvokeBlockAction()
                    };
                },
                data() {
                    return {
                        person: null,
                        personForEditing: null,
                        isEditMode: false,
                        messageToPublish: "",
                        receivedMessage: "",
                        isLoading: false,
                        birthdate: null,
                        address: getDefaultAddressControlModel()
                    };
                },
                methods: {
                    setIsEditMode(isEditMode) {
                        this.isEditMode = isEditMode;
                    },
                    doEdit() {
                        var _a, _b;
                        this.personForEditing = this.person ? Object.assign({}, this.person) : null;
                        this.birthdate = (_b = (_a = this.birthdateOrNull) === null || _a === void 0 ? void 0 : _a.toASPString("yyyy-MM-dd")) !== null && _b !== void 0 ? _b : null;
                        this.setIsEditMode(true);
                    },
                    doCancel() {
                        this.setIsEditMode(false);
                    },
                    doSave() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.personForEditing) {
                                const match = /^(\d+)-(\d+)-(\d+)/.exec((_a = this.birthdate) !== null && _a !== void 0 ? _a : "");
                                let birthDay = null;
                                let birthMonth = null;
                                let birthYear = null;
                                if (match !== null) {
                                    birthYear = toNumber(match[1]);
                                    birthMonth = toNumber(match[2]);
                                    birthDay = toNumber(match[3]);
                                }
                                this.person = Object.assign(Object.assign({}, this.personForEditing), { birthDay: birthDay, birthMonth: birthMonth, birthYear: birthYear });
                                this.isLoading = true;
                                yield this.invokeBlockAction("EditPerson", {
                                    personArgs: this.person
                                });
                                this.isLoading = false;
                            }
                            this.setIsEditMode(false);
                        });
                    },
                    doPublish() {
                        bus.publish("PersonDetail:Message", this.messageToPublish);
                        this.messageToPublish = "";
                    },
                    receiveMessage(message) {
                        this.receivedMessage = message;
                    }
                },
                computed: {
                    birthdateOrNull() {
                        var _a;
                        if (!((_a = this.person) === null || _a === void 0 ? void 0 : _a.birthDay) || !this.person.birthMonth || !this.person.birthYear) {
                            return null;
                        }
                        return RockDateTime.fromParts(this.person.birthYear, this.person.birthMonth, this.person.birthDay);
                    },
                    birthdateFormatted() {
                        if (!this.birthdateOrNull) {
                            return "Not Completed";
                        }
                        return this.birthdateOrNull.toLocaleString(DateTimeFormat.DateTimeShort);
                    },
                    blockTitle() {
                        return this.person ?
                            `Edit Yourself: ${this.person.nickName || this.person.firstName} ${this.person.lastName}` :
                            "Edit Yourself";
                    },
                    currentPerson() {
                        return store.state.currentPerson;
                    },
                    currentPersonKey() {
                        var _a, _b;
                        return (_b = (_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : null;
                    }
                },
                watch: {
                    currentPersonKey: {
                        immediate: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (!this.currentPersonKey) {
                                    this.person = null;
                                    return;
                                }
                                if (this.person && this.person.idKey === this.currentPersonKey) {
                                    return;
                                }
                                this.isLoading = true;
                                this.person = (yield this.invokeBlockAction("GetPersonViewModel")).data;
                                this.isLoading = false;
                            });
                        }
                    }
                },
                created() {
                    bus.subscribe("PersonSecondary:Message", this.receiveMessage);
                },
                template: `
<PrimaryBlock :hideSecondaryBlocks="isEditMode">
    <Block :title="blockTitle">
        <template #default>
            <Loading :isLoading="isLoading">
                <p v-if="!person">
                    There is no person loaded.
                </p>
                <RockForm v-else-if="isEditMode" @submit="doSave">
                    <div class="row">
                        <div class="col-sm-6">
                            <TextBox label="First Name" v-model="personForEditing.firstName" rules="required" />
                            <TextBox label="Nick Name" v-model="personForEditing.nickName" />
                            <TextBox label="Last Name" v-model="personForEditing.lastName" rules="required" />
                        </div>
                        <div class="col-sm-6">
                            <EmailBox label="Email" v-model="personForEditing.email" />
                            <DatePicker label="Birthdate" v-model="birthdate" rules="required" />
                        </div>
                        <div class="col-sm-12">
                            <AddressControl v-model="address" />
                        </div>
                    </div>
                    <div class="actions">
                        <RockButton btnType="primary" type="submit">Save</RockButton>
                        <RockButton btnType="link" @click="doCancel">Cancel</RockButton>
                    </div>
                </RockForm>
                <template v-else>
                    <div class="row">
                        <div class="col-sm-6">
                            <dl>
                                <dt>First Name</dt>
                                <dd>{{person.firstName}}</dd>
                                <dt>Last Name</dt>
                                <dd>{{person.lastName}}</dd>
                                <dt>Email</dt>
                                <dd>{{person.email}}</dd>
                                <dt>Birthdate</dt>
                                <dd>{{birthdateFormatted}}</dd>
                            </dl>
                        </div>
                        <div class="col-sm-6">
                            <div class="well">
                                <TextBox label="Message" v-model="messageToPublish" />
                                <RockButton btnType="primary" btnSize="sm" @click="doPublish">Publish</RockButton>
                            </div>
                            <p>
                                <strong>Secondary block says:</strong>
                                {{receivedMessage}}
                            </p>
                        </div>
                    </div>
                    <div class="actions">
                        <RockButton btnType="primary" @click="doEdit">Edit</RockButton>
                    </div>
                </template>
            </Loading>
        </template>
    </Block>
</PrimaryBlock>`
            }));

        })
    };
}));
