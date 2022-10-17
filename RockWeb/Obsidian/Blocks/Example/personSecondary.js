System.register(['@Obsidian/Utility/bus', '@Obsidian/Templates/block', '@Obsidian/Controls/secondaryBlock', '@Obsidian/Controls/rockButton', '@Obsidian/Controls/textBox', 'vue', '@Obsidian/PageState'], (function (exports) {
    'use strict';
    var bus, Block, SecondaryBlock, RockButton, TextBox, defineComponent, useStore;
    return {
        setters: [function (module) {
            bus = module["default"];
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            SecondaryBlock = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            useStore = module.useStore;
        }],
        execute: (function () {

            const store = useStore();
            var personSecondary = exports('default', defineComponent({
                name: "Example.PersonSecondary",
                components: {
                    Block,
                    SecondaryBlock,
                    TextBox,
                    RockButton
                },
                data() {
                    return {
                        messageToPublish: "",
                        receivedMessage: ""
                    };
                },
                methods: {
                    receiveMessage(message) {
                        this.receivedMessage = message;
                    },
                    doPublish() {
                        bus.publish("PersonSecondary:Message", this.messageToPublish);
                        this.messageToPublish = "";
                    },
                    doThrowError() {
                        throw new Error("This is an uncaught error");
                    }
                },
                computed: {
                    currentPerson() {
                        return store.state.currentPerson;
                    },
                    currentPersonName() {
                        var _a;
                        return ((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.fullName) || "anonymous";
                    },
                    imageUrl() {
                        var _a;
                        return ((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.photoUrl) || "/Assets/Images/person-no-photo-unknown.svg";
                    },
                    photoElementStyle() {
                        return `background-image: url("${this.imageUrl}"); background-size: cover; background-repeat: no-repeat;`;
                    }
                },
                created() {
                    bus.subscribe("PersonDetail:Message", this.receiveMessage);
                },
                template: `<SecondaryBlock>
    <Block title="Secondary Block">
        <template #default>
            <div class="row">
                <div class="col-sm-6">
                    <p>
                        Hi, {{currentPersonName}}!
                        <div class="photo-icon photo-round photo-round-sm" :style="photoElementStyle"></div>
                    </p>
                    <p>This is a secondary block. It respects the store's value indicating if secondary blocks are visible.</p>
                    <RockButton btnType="danger" btnSize="sm" @click="doThrowError">Throw Error</RockButton>
                </div>
                <div class="col-sm-6">
                    <div class="well">
                        <TextBox label="Message" v-model="messageToPublish" />
                        <RockButton btnType="primary" btnSize="sm" @click="doPublish">Publish</RockButton>
                    </div>
                    <p>
                        <strong>Detail block says:</strong>
                        {{receivedMessage}}
                    </p>
                </div>
            </div>
        </template>
    </Block>
</SecondaryBlock>`
            }));

        })
    };
}));
