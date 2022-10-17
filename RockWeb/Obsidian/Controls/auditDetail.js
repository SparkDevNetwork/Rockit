System.register(['tslib', 'vue', '@Obsidian/Utility/http', '@Obsidian/Utility/block'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, useHttp, useSecurityGrantToken;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            useSecurityGrantToken = module.useSecurityGrantToken;
        }],
        execute: (function () {

            var auditDetail = exports('default', defineComponent({
                name: "AuditDetail",
                props: {
                    entityTypeGuid: {
                        type: String,
                        required: false
                    },
                    entityKey: {
                        type: String,
                        required: false
                    }
                },
                setup(props) {
                    const securityGrantToken = useSecurityGrantToken();
                    const http = useHttp();
                    const auditBag = ref(null);
                    const id = computed(() => { var _a, _b, _c; return (_c = (_b = (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : ""; });
                    const idKey = computed(() => { var _a, _b; return (_b = (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.idKey) !== null && _b !== void 0 ? _b : ""; });
                    const guid = computed(() => { var _a, _b; return (_b = (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.guid) !== null && _b !== void 0 ? _b : ""; });
                    const createdByPersonId = computed(() => { var _a; return (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.createdByPersonId; });
                    const createdByName = computed(() => { var _a, _b; return (_b = (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.createdByName) !== null && _b !== void 0 ? _b : ""; });
                    const createdRelativeTime = computed(() => { var _a; return (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.createdRelativeTime; });
                    const modifiedByPersonId = computed(() => { var _a; return (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.modifiedByPersonId; });
                    const modifiedByName = computed(() => { var _a, _b; return (_b = (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.modifiedByName) !== null && _b !== void 0 ? _b : ""; });
                    const modifiedRelativeTime = computed(() => { var _a; return (_a = auditBag.value) === null || _a === void 0 ? void 0 : _a.modifiedRelativeTime; });
                    const showId = ref(true);
                    const showGuid = ref(false);
                    const getPersonLink = (personId) => {
                        return `/Person/${personId}`;
                    };
                    const loadAuditBag = () => __awaiter(this, void 0, void 0, function* () {
                        if (!props.entityTypeGuid || !props.entityKey) {
                            auditBag.value = null;
                            return;
                        }
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            securityGrantToken: securityGrantToken.value
                        };
                        const result = yield http.post("/api/v2/Controls/AuditDetailGetAuditDetails", undefined, data);
                        auditBag.value = result.isSuccess && result.data ? result.data : null;
                    });
                    const onIdClick = () => {
                        if (showId.value) {
                            showId.value = false;
                            showGuid.value = true;
                        }
                        else if (showGuid.value) {
                            showId.value = false;
                            showGuid.value = false;
                        }
                        else {
                            showId.value = true;
                            showGuid.value = false;
                        }
                    };
                    watch([() => props.entityTypeGuid, () => props.entityKey], () => {
                        loadAuditBag();
                    });
                    loadAuditBag();
                    return {
                        createdByName,
                        createdByPersonId,
                        createdRelativeTime,
                        getPersonLink,
                        guid,
                        id,
                        idKey,
                        modifiedByName,
                        modifiedByPersonId,
                        modifiedRelativeTime,
                        onIdClick,
                        showGuid,
                        showId
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
            <dt @click.stop="onIdClick" class="clickable">Id</dt>
            <dd>{{ id }}</dd>
        </dl>
        <dl v-else-if="showGuid">
            <dt @click.stop="onIdClick" class="clickable">Guid</dt>
            <dd>{{ guid }}</dd>
        </dl>
        <dl v-else>
            <dt @click.stop="onIdClick" class="clickable">Id Key</dt>
            <dd>{{ idKey }}</dd>
        </dl>
    </div>
</div>
`
            }));

        })
    };
}));
