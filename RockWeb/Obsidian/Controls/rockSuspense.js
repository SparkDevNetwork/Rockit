System.register(['vue', '@Obsidian/Utility/suspense'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, onMounted, useSuspense, BasicSuspenseProvider, provideSuspense;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            onMounted = module.onMounted;
        }, function (module) {
            useSuspense = module.useSuspense;
            BasicSuspenseProvider = module.BasicSuspenseProvider;
            provideSuspense = module.provideSuspense;
        }],
        execute: (function () {

            var RockSuspense = exports('default', defineComponent({
                name: "RockSuspense",
                props: {
                    delay: {
                        type: Number,
                        default: 500
                    },
                    timeout: {
                        type: Number,
                        default: 5000
                    }
                },
                emits: {
                    loaded: () => true,
                    ready: () => true,
                    timeout: () => true
                },
                setup(props, { emit }) {
                    const isContentLoaded = ref(false);
                    const hasDelayElapsed = ref(false);
                    const hasTimeoutElapsed = ref(false);
                    const parentSuspense = useSuspense();
                    const suspense = new BasicSuspenseProvider(parentSuspense);
                    provideSuspense(suspense);
                    const isContentVisible = computed(() => isContentLoaded.value || hasTimeoutElapsed.value);
                    const isLoadingVisible = computed(() => !isContentVisible.value && hasDelayElapsed.value);
                    setTimeout(() => hasDelayElapsed.value = true, props.delay);
                    setTimeout(() => {
                        hasTimeoutElapsed.value = true;
                        emit("timeout");
                        emit("ready");
                    }, props.timeout);
                    onMounted(() => {
                        if (!suspense.hasPendingOperations()) {
                            isContentLoaded.value = true;
                            emit("loaded");
                            emit("ready");
                        }
                        else {
                            suspense.addFinishedHandler(() => {
                                isContentLoaded.value = true;
                                emit("loaded");
                                emit("ready");
                            });
                        }
                    });
                    return {
                        isContentVisible,
                        isLoadingVisible
                    };
                },
                template: `
<div v-show="isContentVisible">
    <slot />
</div>

<template v-if="isLoadingVisible">
    <slot name="loading" />
</template>
`
            }));

        })
    };
}));
