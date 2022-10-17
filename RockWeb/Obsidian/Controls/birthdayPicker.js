System.register(['vue', './datePartsPicker.js', '@Obsidian/ValidationRules', '@Obsidian/Utility/dateKey', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/rockDateTime', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, DatePartsPicker;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            DatePartsPicker = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var birthdayPicker = exports('default', defineComponent({
                name: "BirthdayPicker",
                components: {
                    DatePartsPicker
                },
                template: `
<DatePartsPicker :allowFutureDates="false" :requireYear="false" />`
            }));

        })
    };
}));
