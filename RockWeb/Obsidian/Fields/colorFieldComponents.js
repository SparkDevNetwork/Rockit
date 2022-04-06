System.register(["vue", "../Elements/dropDownList", "../Elements/colorPicker", "./utils", "../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, dropDownList_1, colorPicker_1, utils_1, component_1, ConfigurationValueKey, namedColors, EditComponent, ConfigurationComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (colorPicker_1_1) {
                colorPicker_1 = colorPicker_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["ColorControlType"] = "selectiontype";
                ConfigurationValueKey["ColorPicker"] = "Color Picker";
                ConfigurationValueKey["NamedColor"] = "Named Color";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            namedColors = [
                "Transparent", "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine",
                "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond",
                "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue",
                "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk",
                "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenrod",
                "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen",
                "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen",
                "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink",
                "DeepSkyBlue", "DimGray", "DodgerBlue", "Firebrick", "FloralWhite",
                "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold",
                "Goldenrod", "Gray", "Green", "GreenYellow", "Honeydew",
                "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki",
                "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue",
                "LightCoral", "LightCyan", "LightGoldenrodYellow", "LightGreen", "LightGray",
                "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray",
                "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
                "Magenta", "Maroon", "MediumAquamarine", "MediumBlue", "MediumOrchid",
                "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise",
                "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
                "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab",
                "Orange", "OrangeRed", "Orchid", "PaleGoldenrod", "PaleGreen",
                "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru",
                "Pink", "Plum", "PowderBlue", "Purple", "Red",
                "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
                "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue",
                "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue",
                "Tan", "Teal", "Thistle", "Tomato", "Turquoise",
                "Violet", "Wheat", "White", "WhiteSmoke", "Yellow",
                "YellowGreen"
            ];
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "ColorField.Edit",
                components: {
                    DropDownList: dropDownList_1.default,
                    ColorPicker: colorPicker_1.default
                },
                props: utils_1.getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const dropDownListOptions = namedColors.map(v => {
                        return { text: v, value: v };
                    });
                    const isColorPicker = vue_1.computed(() => {
                        return props.configurationValues[ConfigurationValueKey.ColorControlType] === ConfigurationValueKey.ColorPicker;
                    });
                    const isNamedPicker = vue_1.computed(() => {
                        return props.configurationValues[ConfigurationValueKey.ColorControlType] !== ConfigurationValueKey.ColorPicker;
                    });
                    return {
                        internalValue,
                        dropDownListOptions,
                        isNamedPicker,
                        isColorPicker
                    };
                },
                template: `
<DropDownList v-if="isNamedPicker" v-model="internalValue" :options="dropDownListOptions" />
<ColorPicker v-else v-model="internalValue" />
`
            }));
            exports_1("ConfigurationComponent", ConfigurationComponent = vue_1.defineComponent({
                name: "ColorField.Configuration",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: utils_1.getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const colorControlType = vue_1.ref("");
                    const typeList = [
                        { text: ConfigurationValueKey.NamedColor, value: ConfigurationValueKey.NamedColor },
                        { text: ConfigurationValueKey.ColorPicker, value: ConfigurationValueKey.ColorPicker }
                    ];
                    const maybeUpdateModelValue = () => {
                        var _a, _b;
                        const newValue = {};
                        newValue[ConfigurationValueKey.ColorControlType] = (_a = colorControlType.value) !== null && _a !== void 0 ? _a : ConfigurationValueKey.NamedColor;
                        const anyValueChanged = newValue[ConfigurationValueKey.ColorControlType] !== ((_b = props.modelValue[ConfigurationValueKey.ColorControlType]) !== null && _b !== void 0 ? _b : "False");
                        if (anyValueChanged) {
                            emit("update:modelValue", newValue);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    const maybeUpdateConfiguration = (key, value) => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfigurationValue", key, value);
                        }
                    };
                    vue_1.watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a;
                        colorControlType.value = (_a = props.modelValue[ConfigurationValueKey.ColorControlType]) !== null && _a !== void 0 ? _a : ConfigurationValueKey.NamedColor;
                    }, {
                        immediate: true
                    });
                    vue_1.watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    vue_1.watch(colorControlType, () => maybeUpdateConfiguration(ConfigurationValueKey.ColorControlType, colorControlType.value || ConfigurationValueKey.NamedColor));
                    return { colorControlType, typeList };
                },
                template: `
<div>
    <DropDownList v-model="colorControlType" :options="typeList" :show-blank-item="false" label="Selection Type" help="The type of control to select color" />
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=colorFieldComponents.js.map