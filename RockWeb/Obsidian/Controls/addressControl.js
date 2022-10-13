System.register(['vue', './rockFormField.js', './dropDownList.js', './rockLabel.js', './textBox.js', '@Obsidian/Utility/guid', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/ValidationRules', './helpBlock.js', './javaScriptAnchor.js', 'ant-design-vue', '@Obsidian/Utility/util', '@Obsidian/Utility/stringUtils'], (function (exports) {
    'use strict';
    var defineComponent, RockFormField, DropDownList, RockLabel, TextBox, newGuid;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            RockLabel = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            newGuid = module.newGuid;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            exports('getDefaultAddressControlModel', getDefaultAddressControlModel);

            function getDefaultAddressControlModel() {
                return {
                    state: "AZ",
                    country: "US"
                };
            }
            const stateOptions = [
                "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM",
                "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
                "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
                "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW",
                "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
                "WA", "WV", "WI", "WY"
            ]
                .map(o => ({ value: o, text: o }));
            const AddressControlBase = exports('AddressControlBase', defineComponent({
                name: "AddressControlBase",
                components: {
                    TextBox,
                    RockLabel,
                    DropDownList
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    },
                    id: {
                        type: String,
                        default: ""
                    }
                },
                setup(props) {
                    const uniqueId = props.id || `rock-addresscontrol-${newGuid()}`;
                    return {
                        uniqueId,
                        stateOptions
                    };
                },
                template: `
<div :id="uniqueId">
    <div class="form-group">
        <TextBox placeholder="Address Line 1" :rules="rules" v-model="modelValue.street1" validationTitle="Address Line 1" />
    </div>
    <div class="form-group">
        <TextBox placeholder="Address Line 2" v-model="modelValue.street2" validationTitle="Address Line 2" />
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <TextBox placeholder="City" :rules="rules" v-model="modelValue.city" validationTitle="City" />
        </div>
        <div class="form-group col-sm-3">
            <DropDownList :showBlankItem="false" v-model="modelValue.state" :items="stateOptions" />
        </div>
        <div class="form-group col-sm-3">
            <TextBox placeholder="Zip" :rules="rules" v-model="modelValue.postalCode" validationTitle="Zip" />
        </div>
    </div>
</div>
`
            }));
            var addressControl = exports('default', defineComponent({
                name: "AddressControl",
                components: {
                    RockFormField,
                    AddressControlBase
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                template: `
<RockFormField formGroupClasses="address-control" #default="{uniqueId, field}" name="addresscontrol" v-model.lazy="modelValue">
    <div class="control-wrapper">
        <AddressControlBase v-model.lazy="modelValue" v-bind="field" :disabled="disabled" />
    </div>
</RockFormField>
`
            }));

        })
    };
}));
