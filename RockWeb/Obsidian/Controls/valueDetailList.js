System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }],
        execute: (function () {

            var valueDetailList = exports('default', defineComponent({
                name: "ValueDetailList",
                props: {
                    modelValue: {
                        type: Array,
                        required: false
                    }
                },
                setup(props) {
                    var _a;
                    const values = ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : []);
                    const hasValues = computed(() => {
                        return values.value.length > 0;
                    });
                    watch(() => props.modelValue, () => {
                        var _a;
                        values.value = (_a = props.modelValue) !== null && _a !== void 0 ? _a : [];
                    });
                    return {
                        hasValues,
                        values
                    };
                },
                template: `
<dl v-if="hasValues">
    <template v-for="value in values">
        <dt>{{ value.title }}</dt>
        <dd v-if="value.htmlValue" v-html="value.htmlValue"></dd>
        <dd v-else>{{ value.textValue }}</dd>
    </template>
</dl>
`
            }));

        })
    };
}));
