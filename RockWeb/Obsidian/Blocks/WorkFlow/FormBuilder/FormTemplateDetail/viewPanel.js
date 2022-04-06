System.register(["vue", "../../../../Util/util"], function (exports_1, context_1) {
    "use strict";
    var vue_1, util_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Workflow.FormTemplateDetail",
                components: {},
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                setup(props) {
                    var _a, _b, _c;
                    const name = vue_1.ref((_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                    const description = vue_1.ref((_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                    const usedByWorkflowTypes = vue_1.ref((_c = props.modelValue.usedBy) !== null && _c !== void 0 ? _c : []);
                    vue_1.watch(() => props.modelValue, () => {
                        var _a, _b, _c;
                        util_1.updateRefValue(name, (_a = props.modelValue.name) !== null && _a !== void 0 ? _a : "");
                        util_1.updateRefValue(description, (_b = props.modelValue.description) !== null && _b !== void 0 ? _b : "");
                        util_1.updateRefValue(usedByWorkflowTypes, (_c = props.modelValue.usedBy) !== null && _c !== void 0 ? _c : []);
                    });
                    return {
                        description,
                        name,
                    };
                },
                template: `
<fieldset>
    <dl>
        <dt>Name</dt>
        <dd>{{ name }}</dd>

        <template v-if="description">
            <dt>Description</dt>
            <dd>{{ description }}</dd>
        </template>

        <dt>Used By</dt>
        <dd>
            <ul>
                <li v-for="workflowType in usedByWorkflowTypes" :key="workflowType.value">{{ workflowType.text }}</li>
            </ul>
        </dd>
    </dl>
</fieldset>
`
            }));
        }
    };
});
//# sourceMappingURL=viewPanel.js.map