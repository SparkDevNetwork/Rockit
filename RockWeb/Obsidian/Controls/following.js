System.register(['tslib', '@Obsidian/Utility/http', 'vue'], (function (exports) {
    'use strict';
    var __awaiter, useHttp, defineComponent, ref, computed, watch;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useHttp = module.useHttp;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }],
        execute: (function () {

            var following = exports('default', defineComponent({
                name: "Following",
                components: {},
                props: {
                    entityTypeGuid: {
                        type: String,
                        required: false
                    },
                    entityKey: {
                        type: String,
                        required: false
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                setup(props) {
                    const http = useHttp();
                    const isEntityFollowed = ref(null);
                    const isVisible = computed(() => {
                        return !!props.entityTypeGuid && !!props.entityKey;
                    });
                    const followingClass = computed(() => {
                        if (props.disabled) {
                            return isEntityFollowed ? "text-primary" : "";
                        }
                        return isEntityFollowed.value ? "clickable text-primary" : "clickable";
                    });
                    const iconClass = computed(() => {
                        return isEntityFollowed.value ? "fa fa-star" : "fa fa-star-o";
                    });
                    const tooltip = computed(() => {
                        if (props.disabled) {
                            return null;
                        }
                        return isEntityFollowed.value ? "Click to stop following." : "Click to follow.";
                    });
                    const getEntityFollowedState = () => __awaiter(this, void 0, void 0, function* () {
                        if (!props.entityTypeGuid || !props.entityKey) {
                            isEntityFollowed.value = null;
                            return;
                        }
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey
                        };
                        const response = yield http.post("/api/v2/Controls/FollowingGetFollowing", undefined, data);
                        isEntityFollowed.value = response.isSuccess && response.data && response.data.isFollowing;
                    });
                    const onFollowClick = () => __awaiter(this, void 0, void 0, function* () {
                        if (props.disabled) {
                            return;
                        }
                        if (isEntityFollowed.value === null || !props.entityTypeGuid || !props.entityKey) {
                            return;
                        }
                        const data = {
                            entityTypeGuid: props.entityTypeGuid,
                            entityKey: props.entityKey,
                            isFollowing: !isEntityFollowed.value
                        };
                        const response = yield http.post("/api/v2/Controls/FollowingSetFollowing", undefined, data);
                        if (response.isSuccess) {
                            isEntityFollowed.value = !isEntityFollowed.value;
                        }
                        else {
                            yield alert("Unable to update followed state.");
                        }
                    });
                    watch([() => props.entityTypeGuid, () => props.entityKey], () => {
                        getEntityFollowedState();
                    });
                    getEntityFollowedState();
                    return {
                        followingClass,
                        iconClass,
                        isVisible,
                        onFollowClick,
                        tooltip
                    };
                },
                template: `
<span v-if="isVisible" :class="followingClass" :title="tooltip" @click="onFollowClick">
    <i :class="iconClass"></i>
</span>
`
            }));

        })
    };
}));
