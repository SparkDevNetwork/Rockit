System.register(['vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var StaticFormControl = exports('default', defineComponent({
                name: "StaticFormControl",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        required: true
                    }
                },
                template: `
<RockFormField
    :modelValue="modelValue"
    formGroupClasses="static-control"
    name="static-form-control">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="form-control-static">
                {{ modelValue }}
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
