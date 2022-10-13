System.register(['vue', '@Obsidian/Controls/dropDownList', '@Obsidian/Controls/colorPicker', './utils.js', '@Obsidian/Utility/component', '@Obsidian/Core/Reporting/comparisonType', '@Obsidian/Core/Reporting/comparisonTypeOptions', '@Obsidian/Controls/fieldFilterContainer', '@Obsidian/Utility/numberUtils'], (function (exports) {
    'use strict';
    var defineComponent, computed, ref, watch, DropDownList, ColorPicker, getFieldEditorProps, getFieldConfigurationProps, useVModelPassthrough;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            ColorPicker = module["default"];
        }, function (module) {
            getFieldEditorProps = module.getFieldEditorProps;
            getFieldConfigurationProps = module.getFieldConfigurationProps;
        }, function (module) {
            useVModelPassthrough = module.useVModelPassthrough;
        }, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var ConfigurationValueKey;
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["ColorControlType"] = "selectiontype";
                ConfigurationValueKey["ColorPicker"] = "Color Picker";
                ConfigurationValueKey["NamedColor"] = "Named Color";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            const namedColors = [
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
            const EditComponent = exports('EditComponent', defineComponent({
                name: "ColorField.Edit",
                components: {
                    DropDownList,
                    ColorPicker
                },
                props: getFieldEditorProps(),
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = useVModelPassthrough(props, "modelValue", emit);
                    const dropDownListOptions = namedColors.map(v => {
                        return { text: v, value: v };
                    });
                    const isNamedPicker = computed(() => {
                        return props.configurationValues[ConfigurationValueKey.ColorControlType] === ConfigurationValueKey.NamedColor;
                    });
                    return {
                        internalValue,
                        dropDownListOptions,
                        isNamedPicker
                    };
                },
                template: `
<DropDownList v-if="isNamedPicker" v-model="internalValue" :items="dropDownListOptions" />
<ColorPicker v-else v-model="internalValue" />
`
            }));
            const ConfigurationComponent = exports('ConfigurationComponent', defineComponent({
                name: "ColorField.Configuration",
                components: {
                    DropDownList
                },
                props: getFieldConfigurationProps(),
                emits: ["update:modelValue", "updateConfiguration", "updateConfigurationValue"],
                setup(props, { emit }) {
                    const colorControlType = ref("");
                    const typeList = [
                        { text: ConfigurationValueKey.ColorPicker, value: ConfigurationValueKey.ColorPicker },
                        { text: ConfigurationValueKey.NamedColor, value: ConfigurationValueKey.NamedColor }
                    ];
                    const maybeUpdateModelValue = () => {
                        var _a, _b;
                        const newValue = {};
                        newValue[ConfigurationValueKey.ColorControlType] = (_a = colorControlType.value) !== null && _a !== void 0 ? _a : ConfigurationValueKey.ColorPicker;
                        const anyValueChanged = newValue[ConfigurationValueKey.ColorControlType] !== ((_b = props.modelValue[ConfigurationValueKey.ColorControlType]) !== null && _b !== void 0 ? _b : ConfigurationValueKey.ColorPicker);
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
                    watch(() => [props.modelValue, props.configurationProperties], () => {
                        var _a;
                        colorControlType.value = (_a = props.modelValue[ConfigurationValueKey.ColorControlType]) !== null && _a !== void 0 ? _a : ConfigurationValueKey.ColorPicker;
                    }, {
                        immediate: true
                    });
                    watch([], () => {
                        if (maybeUpdateModelValue()) {
                            emit("updateConfiguration");
                        }
                    });
                    watch(colorControlType, () => maybeUpdateConfiguration(ConfigurationValueKey.ColorControlType, colorControlType.value || ConfigurationValueKey.ColorPicker));
                    return {
                        colorControlType,
                        typeList
                    };
                },
                template: `
<div>
    <DropDownList v-model="colorControlType" :items="typeList" :show-blank-item="false" label="Selection Type" help="The type of control to select color" />
</div>
`
            }));

        })
    };
}));
