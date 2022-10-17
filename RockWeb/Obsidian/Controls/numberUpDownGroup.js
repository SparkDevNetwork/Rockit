System.register(['vue', './numberUpDown.js', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, NumberUpDownInternal, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            NumberUpDownInternal = module.NumberUpDownInternal;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var numberUpDownGroup = exports('default', defineComponent({
                name: "NumberUpDownGroup",
                components: {
                    RockFormField,
                    NumberUpDownInternal
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    options: {
                        type: Array,
                        required: true
                    }
                },
                computed: {
                    total() {
                        let total = 0;
                        for (const option of this.options) {
                            total += (this.modelValue[option.key] || 0);
                        }
                        return total;
                    }
                },
                template: `
<RockFormField
    :modelValue="total"
    formGroupClasses="margin-b-md number-up-down-group"
    name="numberupdowngroup">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div v-for="option in options" :key="option.key" class="margin-l-sm margin-b-sm">
                <div v-if="option.label" class="margin-b-sm">
                    {{option.label}}
                </div>
                <NumberUpDownInternal v-model="modelValue[option.key]" :min="option.min" :max="option.max" class="margin-t-sm" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));

        })
    };
}));
