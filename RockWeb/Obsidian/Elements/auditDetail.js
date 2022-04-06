System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "AuditDetail",
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                setup(props) {
                    const id = vue_1.computed(() => { var _a, _b; return (_b = (_a = props.modelValue.id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""; });
                    const guid = vue_1.computed(() => { var _a; return (_a = props.modelValue.guid) !== null && _a !== void 0 ? _a : ""; });
                    const createdByPersonId = vue_1.computed(() => props.modelValue.createdByPersonId);
                    const createdByName = vue_1.computed(() => { var _a; return (_a = props.modelValue.createdByName) !== null && _a !== void 0 ? _a : ""; });
                    const createdRelativeTime = vue_1.computed(() => props.modelValue.createdRelativeTime);
                    const modifiedByPersonId = vue_1.computed(() => props.modelValue.modifiedByPersonId);
                    const modifiedByName = vue_1.computed(() => { var _a; return (_a = props.modelValue.modifiedByName) !== null && _a !== void 0 ? _a : ""; });
                    const modifiedRelativeTime = vue_1.computed(() => props.modelValue.modifiedRelativeTime);
                    const showId = vue_1.ref(true);
                    const getPersonLink = (personId) => `/Person/${personId}`;
                    const onIdClick = () => {
                        showId.value = !showId.value;
                    };
                    return {
                        createdByName,
                        createdByPersonId,
                        createdRelativeTime,
                        getPersonLink,
                        guid,
                        id,
                        modifiedByName,
                        modifiedByPersonId,
                        modifiedRelativeTime,
                        onIdClick,
                        showId,
                    };
                },
                template: `
<div class="row">
    <div class="col-md-4">
        <dl>
            <dt>Created By</dt>
            <dd>
                <a v-if="createdByPersonId" :href="getPersonLink(createdByPersonId)">{{ createdByName }}</a>
                <span v-else-if="createdByName">{{ createdByName }}</span>
                <small v-if="createdRelativeTime">&nbsp;({{ createdRelativeTime }})</small>
            </dd>
        </dl>
    </div>

    <div class="col-md-4">
        <dl>
            <dt>Modified By</dt>
            <dd>
                <a v-if="modifiedByPersonId" :href="getPersonLink(modifiedByPersonId)">{{ modifiedByName }}</a>
                <span v-else-if="createdByName">{{ modifiedByName }}</span>
                <small v-if="modifiedRelativeTime">&nbsp;({{ modifiedRelativeTime }})</small>
            </dd>
        </dl>
    </div>

    <div class="col-md-4">
        <dl v-if="showId">
            <dt @click.stop="onIdClick">Id</dt>
            <dd>{{ id }}</dd>
        </dl>
        <dl v-else>
            <dt @click.stop="onIdClick">Guid</dt>
            <dd>{{ guid }}</dd>
        </dl>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=auditDetail.js.map