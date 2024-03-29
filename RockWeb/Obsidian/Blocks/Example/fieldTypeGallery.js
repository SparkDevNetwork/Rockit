System.register(['vue', '@Obsidian/Controls/attributeValuesContainer', '@Obsidian/Controls/panelWidget', '@Obsidian/Controls/textBox', '@Obsidian/Templates/block'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, reactive, AttributeValuesContainer, PanelWidget, TextBox, Block;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            reactive = module.reactive;
        }, function (module) {
            AttributeValuesContainer = module["default"];
        }, function (module) {
            PanelWidget = module["default"];
        }, function (module) {
            TextBox = module["default"];
        }, function (module) {
            Block = module["default"];
        }],
        execute: (function () {

            const getAttributeData = (name, fieldTypeGuid, configValues) => {
                const configurationValues = configValues;
                return {
                    "value1": reactive({
                        fieldTypeGuid: fieldTypeGuid,
                        name: `${name} 1`,
                        key: "value1",
                        description: `This is the description of the ${name} without an initial value`,
                        configurationValues,
                        isRequired: false,
                        attributeGuid: "",
                        order: 0,
                        categories: []
                    }),
                    "value2": reactive({
                        fieldTypeGuid: fieldTypeGuid,
                        name: `${name} 2`,
                        key: "value2",
                        description: `This is the description of the ${name} with an initial value`,
                        configurationValues,
                        isRequired: false,
                        attributeGuid: "",
                        order: 0,
                        categories: []
                    })
                };
            };
            const galleryAndResult = defineComponent({
                name: "GalleryAndResult",
                components: {
                    PanelWidget,
                    AttributeValuesContainer
                },
                props: {
                    values: {
                        type: Object,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    attributes: {
                        type: Object,
                        required: true
                    }
                },
                setup(props) {
                    const values = ref(props.values);
                    const value1Json = computed(() => values.value["value1"]);
                    const value2Json = computed(() => values.value["value2"]);
                    return {
                        value1Json,
                        value2Json,
                        values
                    };
                },
                template: `
<PanelWidget>
    <template #header>{{title}}</template>
    <div class="row">
        <div class="col-md-6">
            <h4>Qualifier Values</h4>
            <slot />
            <hr />
            <h4>Attribute Values Container (edit)</h4>
            <AttributeValuesContainer v-model="values" :attributes="attributes" :isEditMode="true" :showCategoryLabel="false" />
        </div>
        <div class="col-md-6">
            <h4>Attribute Values Container (view)</h4>
            <AttributeValuesContainer v-model="values" :attributes="attributes" :isEditMode="false" :showCategoryLabel="false" />
            <hr />
            <h4>Values</h4>
            <p>
                <strong>Value 1</strong>
                <pre>{{value1Json}}</pre>
            </p>
            <p>
                <strong>Value 2</strong>
                <pre>{{value2Json}}</pre>
            </p>
        </div>
    </div>
</PanelWidget>`
            });
            const getFieldTypeGalleryComponent = (name, initialValue, fieldTypeGuid, initialConfigValues) => {
                return defineComponent({
                    name: `${name}Gallery`,
                    components: {
                        GalleryAndResult: galleryAndResult,
                        TextBox
                    },
                    data() {
                        return {
                            name,
                            values: { "value1": "", "value2": initialValue },
                            configValues: Object.assign({}, initialConfigValues),
                            attributes: getAttributeData(name, fieldTypeGuid, initialConfigValues)
                        };
                    },
                    computed: {
                        configKeys() {
                            const keys = [];
                            for (const attributeKey in this.attributes) {
                                const attribute = this.attributes[attributeKey];
                                for (const key in attribute.configurationValues) {
                                    if (keys.indexOf(key) === -1) {
                                        keys.push(key);
                                    }
                                }
                            }
                            return keys;
                        }
                    },
                    watch: {
                        configValues: {
                            deep: true,
                            handler() {
                                for (const attributeKey in this.attributes) {
                                    const attribute = this.attributes[attributeKey];
                                    for (const key in attribute.configurationValues) {
                                        const value = this.configValues[key] || "";
                                        attribute.configurationValues[key] = value;
                                    }
                                }
                            }
                        }
                    },
                    template: `
<GalleryAndResult :title="name" :values="values" :attributes="attributes">
    <TextBox v-for="configKey in configKeys" :key="configKey" :label="configKey" v-model="configValues[configKey]" />
</GalleryAndResult>`
                });
            };
            const galleryComponents = {
                AddressGallery: getFieldTypeGalleryComponent("Address", '{"street1": "3120 W Cholla St", "city": "Phoenix", "state": "AZ", "postalCode": "85029-4113", "country": "US"}', "0A495222-23B7-41D3-82C8-D484CDB75D17", {}),
                BooleanGallery: getFieldTypeGalleryComponent("Boolean", "t", "1EDAFDED-DFE6-4334-B019-6EECBA89E05A", {
                    truetext: "This is true",
                    falsetext: "This is false",
                    BooleanControlType: "2"
                }),
                CampusGallery: getFieldTypeGalleryComponent("Campus", "", "1B71FEF4-201F-4D53-8C60-2DF21F1985ED", {
                    values: JSON.stringify([
                        { value: "069D4509-398A-4E08-8225-A0658E8A51E8", text: "Main Campus" },
                        { value: "0D8B2F85-5DC2-406E-8A7D-D435F3153C58", text: "Secondary Campus" },
                        { value: "8C99160C-D0FC-49E4-AA9D-87EAE7297AF1", text: "Tertiary Campus" }
                    ])
                }),
                CampusesGallery: getFieldTypeGalleryComponent("Campuses", "", "69254F91-C97F-4C2D-9ACB-1683B088097B", {
                    repeatColumns: "4",
                    values: JSON.stringify([
                        { value: "069D4509-398A-4E08-8225-A0658E8A51E8", text: "Main Campus" },
                        { value: "0D8B2F85-5DC2-406E-8A7D-D435F3153C58", text: "Secondary Campus" },
                        { value: "8C99160C-D0FC-49E4-AA9D-87EAE7297AF1", text: "Tertiary Campus" }
                    ])
                }),
                ColorGallery: getFieldTypeGalleryComponent("Color", "#ee7725", "D747E6AE-C383-4E22-8846-71518E3DD06F", {
                    selectiontype: "Color Picker"
                }),
                CurrencyGallery: getFieldTypeGalleryComponent("Currency", "4.70", "3EE69CBC-35CE-4496-88CC-8327A447603F", {}),
                DateGallery: getFieldTypeGalleryComponent("Date", "2009-02-11", "6B6AA175-4758-453F-8D83-FCD8044B5F36", {
                    format: "MMM yyyy",
                    displayDiff: "true",
                    displayCurrentOption: "true",
                    datePickerControlType: "Date Parts Picker",
                    futureYearCount: "2"
                }),
                DateRangeGallery: getFieldTypeGalleryComponent("DateRange", "2021-07-25T00:00:00.0000000,2021-07-29T00:00:00.0000000", "9C7D431C-875C-4792-9E76-93F3A32BB850", {}),
                DateTimeGallery: getFieldTypeGalleryComponent("DateTime", "2009-02-11T14:23:00", "FE95430C-322D-4B67-9C77-DFD1D4408725", {
                    format: "MMM dd, yyyy h:mm tt",
                    displayDiff: "false",
                    displayCurrentOption: "true",
                }),
                DayOfWeekGallery: getFieldTypeGalleryComponent("DayOfWeek", "2", "7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE", {}),
                DaysOfWeekGallery: getFieldTypeGalleryComponent("DaysOfWeek", "2,5", "08943FF9-F2A8-4DB4-A72A-31938B200C8C", {}),
                DecimalGallery: getFieldTypeGalleryComponent("Decimal", "18.283", "C757A554-3009-4214-B05D-CEA2B2EA6B8F", {}),
                DecimalRangeGallery: getFieldTypeGalleryComponent("DecimalRange", "18.283,100", "758D9648-573E-4800-B5AF-7CC29F4BE170", {}),
                DefinedValueGallery: getFieldTypeGalleryComponent("DefinedValue", '{ "value": "F19FC180-FE8F-4B72-A59C-8013E3B0EB0D", "text": "Single", "description": "Used when the individual is single." }', "59D5A94C-94A0-4630-B80A-BB25697D74C7", {
                    selectableValues: JSON.stringify([
                        { value: "5FE5A540-7D9F-433E-B47E-4229D1472248", text: "Married", description: "Used when an individual is married." },
                        { value: "F19FC180-FE8F-4B72-A59C-8013E3B0EB0D", text: "Single", description: "Used when the individual is single." },
                        { value: "3B689240-24C2-434B-A7B9-A4A6CBA7928C", text: "Divorced", description: "Used when the individual is divorced." },
                        { value: "AE5A0228-9910-4505-B3C6-E6C98BEE2E7F", text: "Unknown", description: "" }
                    ]),
                    allowmultiple: "",
                    displaydescription: "true",
                    enhancedselection: "",
                    includeInactive: "",
                    AllowAddingNewValues: "",
                    RepeatColumns: ""
                }),
                DefinedValueRangeGallery: getFieldTypeGalleryComponent("DefinedValueRange", '{ "value": "F19FC180-FE8F-4B72-A59C-8013E3B0EB0D,3B689240-24C2-434B-A7B9-A4A6CBA7928C", "text": "Single to Divorced", "description": "Used when the individual is single. to Used when the individual is divorced." }', "B5C07B16-844D-4620-82E3-4CCA8F5FC350", {
                    values: JSON.stringify([
                        { value: "5FE5A540-7D9F-433E-B47E-4229D1472248", text: "Married", description: "Used when an individual is married." },
                        { value: "F19FC180-FE8F-4B72-A59C-8013E3B0EB0D", text: "Single", description: "Used when the individual is single." },
                        { value: "3B689240-24C2-434B-A7B9-A4A6CBA7928C", text: "Divorced", description: "Used when the individual is divorced." },
                        { value: "AE5A0228-9910-4505-B3C6-E6C98BEE2E7F", text: "Unknown", description: "" }
                    ]),
                    displaydescription: "false"
                }),
                EmailGallery: getFieldTypeGalleryComponent("Email", "ted@rocksolidchurchdemo.com", "3D045CAE-EA72-4A04-B7BE-7FD1D6214217", {}),
                GenderGallery: getFieldTypeGalleryComponent("Gender", "2", "2E28779B-4C76-4142-AE8D-49EA31DDB503", {}),
                IntegerGallery: getFieldTypeGalleryComponent("Integer", "20", "A75DFC58-7A1B-4799-BF31-451B2BBE38FF", {}),
                IntegerRangeGallery: getFieldTypeGalleryComponent("IntegerRange", "0,100", "9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4", {}),
                KeyValueListGallery: getFieldTypeGalleryComponent("KeyValueList", `[{"key":"One","value":"Two"},{"key":"Three","value":"Four"}]`, "73B02051-0D38-4AD9-BF81-A2D477DE4F70", {
                    keyprompt: "Enter Key",
                    valueprompt: "Enter Value",
                    displayvaluefirst: "false",
                    allowhtml: "false",
                    values: JSON.stringify([])
                }),
                MemoGallery: getFieldTypeGalleryComponent("Memo", "This is a memo", "C28C7BF3-A552-4D77-9408-DEDCF760CED0", {
                    numberofrows: "10",
                    maxcharacters: "100",
                    showcountdown: "true",
                    allowhtml: "true"
                }),
                MonthDayGallery: getFieldTypeGalleryComponent("MonthDay", "7/4", "8BED8DD8-8167-4052-B807-A1E72C133611", {}),
                MultiSelectGallery: getFieldTypeGalleryComponent("MultiSelect", "pizza", "BD0D9B57-2A41-4490-89FF-F01DAB7D4904", {
                    repeatColumns: "4",
                    repeatDirection: "Horizontal",
                    enhancedselection: "false",
                    values: '[{"value": "pizza", "text": "Pizza"}, {"value": "sub", "text": "Sub"}, {"value": "bagel", "text": "Bagel"}]'
                }),
                PhoneNumberGallery: getFieldTypeGalleryComponent("PhoneNumber", "(321) 456-7890", "6B1908EC-12A2-463A-A7BD-970CE0FAF097", {}),
                RatingGallery: getFieldTypeGalleryComponent("Rating", '{"value":3,"maxValue":5}', "24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862", {
                    max: "5"
                }),
                SingleSelectGallery: getFieldTypeGalleryComponent("SingleSelect", "pizza", "7525C4CB-EE6B-41D4-9B64-A08048D5A5C0", {
                    repeatColumns: "4",
                    fieldtype: "rb",
                    values: '[{"value": "pizza", "text": "Pizza"}, {"value": "sub", "text": "Sub"}, {"value": "bagel", "text": "Bagel"}]'
                }),
                SSNGallery: getFieldTypeGalleryComponent("SSN", "123456789", "4722C99A-C078-464A-968F-13AB5E8E318F", {}),
                TextGallery: getFieldTypeGalleryComponent("Text", "Hello", "9C204CD0-1233-41C5-818A-C5DA439445AA", {
                    ispassword: "false",
                    maxcharacters: "10",
                    showcountdown: "true"
                }),
                TimeGallery: getFieldTypeGalleryComponent("Time", "13:15:00", "2F8F5EC4-57FA-4F6C-AB15-9D6616994580", {}),
                UrlLinkGallery: getFieldTypeGalleryComponent("URL Link", "https://rockrms.com", "C0D0D7E2-C3B0-4004-ABEA-4BBFAD10D5D2", {
                    ShouldRequireTrailingForwardSlash: "false",
                    ShouldAlwaysShowCondensed: "false"
                }),
            };
            const galleryTemplate = Object.keys(galleryComponents).sort().map(g => `<${g} />`).join("");
            var fieldTypeGallery = exports('default', defineComponent({
                name: "Example.FieldTypeGallery",
                components: Object.assign({ Block }, galleryComponents),
                setup() {
                    return {};
                },
                template: `
<Block title="Obsidian Field Type Gallery">
    <template #default>
        ${galleryTemplate}
    </template>
</Block>
`
            }));

        })
    };
}));
