System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, computed;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }],
        execute: (function () {

            var AlertType; exports('AlertType', AlertType);
            (function (AlertType) {
                AlertType["Default"] = "default";
                AlertType["Success"] = "success";
                AlertType["Info"] = "info";
                AlertType["Danger"] = "danger";
                AlertType["Warning"] = "warning";
                AlertType["Primary"] = "primary";
                AlertType["Validation"] = "validation";
            })(AlertType || (exports('AlertType', AlertType = {})));
            var Alert = exports('default', defineComponent({
                name: "Alert",
                props: {
                    dismissible: {
                        type: Boolean,
                        default: false
                    },
                    alertType: {
                        type: String,
                        default: AlertType.Default
                    }
                },
                emits: [
                    "dismiss"
                ],
                setup(props, { emit }) {
                    function onDismiss() {
                        emit("dismiss");
                    }
                    const typeClass = computed(() => `alert-${props.alertType}`);
                    return { onDismiss, typeClass };
                },
                template: `
<div class="alert" :class="typeClass">
    <button v-if="dismissible" type="button" class="close" @click="onDismiss" aria-label="Hide Alert">
        <span aria-hidden>&times;</span>
    </button>
    <slot />
</div>
`
            }));

        })
    };
}));
