System.register(['tslib', '@Obsidian/Utility/block', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/rockButton', '@Obsidian/Templates/block'], (function (exports) {
    'use strict';
    var __awaiter, useInvokeBlockAction, useConfigurationValues, defineComponent, ref, Alert, RockButton, Block;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            useConfigurationValues = module.useConfigurationValues;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            Block = module["default"];
        }],
        execute: (function () {

            var starkDetail = exports('default', defineComponent({
                name: "Utility.StarkDetailOptions",
                components: {
                    Block,
                    Alert,
                    RockButton
                },
                setup() {
                    var _a;
                    const invokeBlockAction = useInvokeBlockAction();
                    const configurationValues = useConfigurationValues();
                    const configMessage = ref((_a = configurationValues.message) !== null && _a !== void 0 ? _a : "");
                    const blockActionMessage = ref("");
                    const invokeBlockActionClick = () => __awaiter(this, void 0, void 0, function* () {
                        const response = yield invokeBlockAction("GetMessage", {
                            paramFromClient: "This is a value sent to the server from the client."
                        });
                        if (response.data) {
                            blockActionMessage.value = response.data.message;
                        }
                        else {
                            blockActionMessage.value = response.errorMessage || "An error occurred";
                        }
                    });
                    return {
                        blockActionMessage,
                        configMessage,
                        invokeBlockActionClick
                    };
                },
                template: `
<Block title="Blank Detail Block">
    <template #headerActions>
        <span class="action label label-info">Vue</span>
    </template>

    <template #drawer>
        An example block that uses Vue
    </template>

    <template #default>
        <Alert alertType="info">
            <h4>Stark Template Block</h4>
            <p>This block serves as a starting point for creating new blocks. After copy/pasting it and renaming the resulting file be sure to make the following changes:</p>

            <strong>Changes to the Codebehind (.cs) File</strong>
            <ul>
                <li>Update the namespace to match your directory</li>
                <li>Update the class name</li>
                <li>Fill in the DisplayName, Category and Description attributes</li>
            </ul>

            <strong>Changes to the Vue component (.ts/.js) File</strong>
            <ul>
                <li>Remove this text... unless you really like it...</li>
            </ul>
        </Alert>

        <div>
            <h4>Value from Configuration</h4>
            <p>
                This value came from the C# file and was provided to the JavaScript before the Vue component was even mounted:
            </p>

            <pre>{{ configMessage }}</pre>

            <h4>Value from Block Action</h4>
            <p>
                This value will come from the C# file using a "Block Action". Block Actions allow the Vue Component to communicate with the
                C# code behind (much like a Web Forms Postback):
            </p>

            <pre>{{ blockActionMessage }}</pre>

            <div class="actions">
                <RockButton btnType="primary" btnSize="sm" @click="invokeBlockActionClick">Invoke Block Action</RockButton>
            </div>
        </div>
    </template>
</Block>`
            }));

        })
    };
}));
