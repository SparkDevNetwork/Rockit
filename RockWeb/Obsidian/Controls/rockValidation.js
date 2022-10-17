System.register(['./alert.js', 'vue'], (function (exports) {
    'use strict';
    var Alert, defineComponent, computed;
    return {
        setters: [function (module) {
            Alert = module["default"];
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
        }],
        execute: (function () {

            var RockValidation = exports('default', defineComponent({
                name: "RockValidation",
                components: {
                    Alert
                },
                props: {
                    errors: {
                        type: Array,
                        required: true
                    }
                },
                setup(props) {
                    const hasErrors = computed(() => props.errors.length > 0);
                    return {
                        hasErrors
                    };
                },
                template: `
<Alert v-show="hasErrors" alertType="validation">
    Please correct the following:
    <ul>
        <li v-for="error of errors">
            <strong>{{error.name}}</strong>
            {{error.text}}
        </li>
    </ul>
</Alert>
`
            }));

        })
    };
}));
