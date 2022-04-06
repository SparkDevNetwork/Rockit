System.register(["vue", "../Reporting/comparisonType", "../Services/string", "./textFieldComponents", "./utils"], function (exports_1, context_1) {
    "use strict";
    var vue_1, comparisonType_1, string_1, textFieldComponents_1, utils_1, unsupportedFieldTypeConfigurationComponent, FieldTypeBase;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (comparisonType_1_1) {
                comparisonType_1 = comparisonType_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            },
            function (textFieldComponents_1_1) {
                textFieldComponents_1 = textFieldComponents_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            unsupportedFieldTypeConfigurationComponent = vue_1.defineComponent({
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    configurationProperties: {
                        type: Object,
                        required: true
                    }
                },
                setup() {
                    return {};
                },
                template: `
<div class="alert alert-warning">
    Configuration of this field type is not supported.
</div>
`
            });
            FieldTypeBase = class FieldTypeBase {
                getTextValue(value) {
                    var _a;
                    return (_a = value.textValue) !== null && _a !== void 0 ? _a : "";
                }
                getHtmlValue(value) {
                    return `<span>${string_1.escapeHtml(this.getTextValue(value))}</span>`;
                }
                getTextValueFromConfiguration(value, _configurationValues) {
                    return value;
                }
                getCondensedTextValue(value) {
                    var _a;
                    return string_1.truncate((_a = value.textValue) !== null && _a !== void 0 ? _a : "", 100);
                }
                getCondensedHtmlValue(value) {
                    return this.getHtmlValue(value);
                }
                getFormattedComponent(value) {
                    return vue_1.defineComponent(() => {
                        return vue_1.compile(this.getHtmlValue(value));
                    });
                }
                getCondensedFormattedComponent(value) {
                    return vue_1.defineComponent(() => {
                        return vue_1.compile(this.getCondensedHtmlValue(value));
                    });
                }
                getEditComponent() {
                    return textFieldComponents_1.EditComponent;
                }
                getConfigurationComponent() {
                    return unsupportedFieldTypeConfigurationComponent;
                }
                hasDefaultComponent() {
                    return true;
                }
                isFilterable() {
                    return true;
                }
                getSupportedComparisonTypes() {
                    return 1 | 2;
                }
                getFilterComponent() {
                    return utils_1.getStandardFilterComponent(this.getSupportedComparisonTypes(), this.getEditComponent());
                }
                getFilterValueDescription(value, attribute) {
                    const valueText = this.getFilterValueText(value, attribute);
                    if (value.comparisonType === null || value.comparisonType === undefined) {
                        return valueText ? `Is ${valueText}` : "";
                    }
                    if (value.comparisonType === 32 || value.comparisonType === 64) {
                        return comparisonType_1.getComparisonName(value.comparisonType);
                    }
                    if (valueText === "") {
                        if (this.getSupportedComparisonTypes() & 32 && (value.comparisonType === 1 || value.comparisonType === 2)) {
                            return `${comparisonType_1.getComparisonName(value.comparisonType)} ''`;
                        }
                        return "";
                    }
                    return `${comparisonType_1.getComparisonName(value.comparisonType)} ${valueText}`;
                }
                getFilterValueText(value, attribute) {
                    var _a, _b;
                    return (_b = this.getTextValueFromConfiguration(value.value, (_a = attribute.configurationValues) !== null && _a !== void 0 ? _a : {})) !== null && _b !== void 0 ? _b : "";
                }
            };
            exports_1("FieldTypeBase", FieldTypeBase);
        }
    };
});
//# sourceMappingURL=fieldType.js.map