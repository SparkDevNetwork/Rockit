System.register(["vue", "../../Elements/textBox", "../../Elements/emailBox", "../../Elements/currencyBox", "../../Elements/datePicker", "../../Elements/dateRangePicker", "../../Elements/dateTimePicker", "../../Elements/listBox", "../../Elements/birthdayPicker", "../../Elements/numberUpDown", "../../Controls/addressControl", "../../Elements/inlineSwitch", "../../Elements/switch", "../../Elements/toggle", "../../Elements/itemsWithPreAndPostHtml", "../../Elements/staticFormControl", "../../Elements/progressTracker", "../../Controls/rockForm", "../../Elements/rockButton", "../../Elements/radioButtonList", "../../Elements/dropDownList", "../../Controls/dialog", "../../Elements/inlineCheckBox", "../../Elements/checkBox", "../../Elements/phoneNumberBox", "../../Elements/helpBlock", "../../Elements/datePartsPicker", "../../Elements/colorPicker", "../../Elements/numberBox", "../../Elements/numberRangeBox", "../../Elements/genderDropDownList", "../../Elements/socialSecurityNumberBox", "../../Elements/timePicker", "../../Elements/checkBoxList", "../../Elements/rating", "../../Elements/fullscreen", "../../Controls/panel", "../../Controls/personPicker", "../../Services/number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, textBox_1, emailBox_1, currencyBox_1, datePicker_1, dateRangePicker_1, dateTimePicker_1, listBox_1, birthdayPicker_1, numberUpDown_1, addressControl_1, inlineSwitch_1, switch_1, toggle_1, itemsWithPreAndPostHtml_1, staticFormControl_1, progressTracker_1, rockForm_1, rockButton_1, radioButtonList_1, dropDownList_1, dialog_1, inlineCheckBox_1, checkBox_1, phoneNumberBox_1, helpBlock_1, datePartsPicker_1, colorPicker_1, numberBox_1, numberRangeBox_1, genderDropDownList_1, socialSecurityNumberBox_1, timePicker_1, checkBoxList_1, rating_1, fullscreen_1, panel_1, personPicker_1, number_1, GalleryAndResult, phoneNumberBoxGallery, helpBlockGallery, dropDownListGallery, radioButtonListGallery, checkBoxGallery, inlineCheckBoxGallery, dialogGallery, formRulesGallery, checkBoxListGallery, listBoxGallery, datePickerGallery, dateRangePickerGallery, dateTimePickerGallery, datePartsPickerGallery, textBoxGallery, colorPickerGallery, numberBoxGallery, numberRangeBoxGallery, genderDropDownListGallery, socialSecurityNumberBoxGallery, timePickerGallery, ratingGallery, switchGallery, inlineSwitchGallery, currencyBoxGallery, emailBoxGallery, numberUpDownGallery, staticFormControlGallery, addressControlGallery, toggleGallery, progressTrackerGallery, itemsWithPreAndPostHtmlGallery, fullscreenGallery, panelGallery, personPickerGallery, galleryComponents, galleryTemplate;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (emailBox_1_1) {
                emailBox_1 = emailBox_1_1;
            },
            function (currencyBox_1_1) {
                currencyBox_1 = currencyBox_1_1;
            },
            function (datePicker_1_1) {
                datePicker_1 = datePicker_1_1;
            },
            function (dateRangePicker_1_1) {
                dateRangePicker_1 = dateRangePicker_1_1;
            },
            function (dateTimePicker_1_1) {
                dateTimePicker_1 = dateTimePicker_1_1;
            },
            function (listBox_1_1) {
                listBox_1 = listBox_1_1;
            },
            function (birthdayPicker_1_1) {
                birthdayPicker_1 = birthdayPicker_1_1;
            },
            function (numberUpDown_1_1) {
                numberUpDown_1 = numberUpDown_1_1;
            },
            function (addressControl_1_1) {
                addressControl_1 = addressControl_1_1;
            },
            function (inlineSwitch_1_1) {
                inlineSwitch_1 = inlineSwitch_1_1;
            },
            function (switch_1_1) {
                switch_1 = switch_1_1;
            },
            function (toggle_1_1) {
                toggle_1 = toggle_1_1;
            },
            function (itemsWithPreAndPostHtml_1_1) {
                itemsWithPreAndPostHtml_1 = itemsWithPreAndPostHtml_1_1;
            },
            function (staticFormControl_1_1) {
                staticFormControl_1 = staticFormControl_1_1;
            },
            function (progressTracker_1_1) {
                progressTracker_1 = progressTracker_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (radioButtonList_1_1) {
                radioButtonList_1 = radioButtonList_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            },
            function (dialog_1_1) {
                dialog_1 = dialog_1_1;
            },
            function (inlineCheckBox_1_1) {
                inlineCheckBox_1 = inlineCheckBox_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (phoneNumberBox_1_1) {
                phoneNumberBox_1 = phoneNumberBox_1_1;
            },
            function (helpBlock_1_1) {
                helpBlock_1 = helpBlock_1_1;
            },
            function (datePartsPicker_1_1) {
                datePartsPicker_1 = datePartsPicker_1_1;
            },
            function (colorPicker_1_1) {
                colorPicker_1 = colorPicker_1_1;
            },
            function (numberBox_1_1) {
                numberBox_1 = numberBox_1_1;
            },
            function (numberRangeBox_1_1) {
                numberRangeBox_1 = numberRangeBox_1_1;
            },
            function (genderDropDownList_1_1) {
                genderDropDownList_1 = genderDropDownList_1_1;
            },
            function (socialSecurityNumberBox_1_1) {
                socialSecurityNumberBox_1 = socialSecurityNumberBox_1_1;
            },
            function (timePicker_1_1) {
                timePicker_1 = timePicker_1_1;
            },
            function (checkBoxList_1_1) {
                checkBoxList_1 = checkBoxList_1_1;
            },
            function (rating_1_1) {
                rating_1 = rating_1_1;
            },
            function (fullscreen_1_1) {
                fullscreen_1 = fullscreen_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (personPicker_1_1) {
                personPicker_1 = personPicker_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            GalleryAndResult = vue_1.defineComponent({
                name: "GalleryAndResult",
                components: {
                    Panel: panel_1.default
                },
                props: {
                    splitWidth: {
                        type: Boolean,
                        default: true
                    }
                },
                template: `
<Panel :hasCollapse="true">
    <template #title><slot name="header" /></template>
    <div v-if="splitWidth" class="row">
        <div class="col-md-6">
            <slot name="gallery" />
        </div>
        <div class="col-md-6">
            <slot name="result" />
        </div>
    </div>
    <template v-else>
        <div>
            <slot name="gallery" />
        </div>
        <div>
            <slot name="result" />
        </div>
    </template>
</Panel>`
            });
            phoneNumberBoxGallery = vue_1.defineComponent({
                name: "PhoneNumberBoxGallery",
                components: {
                    GalleryAndResult,
                    PhoneNumberBox: phoneNumberBox_1.default
                },
                data() {
                    return {
                        phoneNumber: "8005551234"
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        PhoneNumberBox
    </template>
    <template #gallery>
        <PhoneNumberBox label="Phone 1" v-model="phoneNumber" />
        <PhoneNumberBox label="Phone 2" v-model="phoneNumber" />
    </template>
    <template #result>
        {{phoneNumber}}
    </template>
</GalleryAndResult>`
            });
            helpBlockGallery = vue_1.defineComponent({
                name: "HelpBlockGallery",
                components: {
                    GalleryAndResult,
                    HelpBlock: helpBlock_1.default
                },
                template: `
<GalleryAndResult>
    <template #header>
        HelpBlock
    </template>
    <template #gallery>
        <HelpBlock text="This is some helpful text that explains something." />
    </template>
</GalleryAndResult>`
            });
            dropDownListGallery = vue_1.defineComponent({
                name: "DropDownListGallery",
                components: {
                    GalleryAndResult,
                    DropDownList: dropDownList_1.default
                },
                data() {
                    return {
                        value: "a",
                        options: [
                            { text: "A Text", value: "a" },
                            { text: "B Text", value: "b" },
                            { text: "C Text", value: "c" },
                            { text: "D Text", value: "d" }
                        ]
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DropDownList
    </template>
    <template #gallery>
        <DropDownList label="Select 1" v-model="value" :options="options" />
        <DropDownList label="Select 2" v-model="value" :options="options" />
        <DropDownList label="Enhanced Select 1" v-model="value" :options="options" enhanceForLongLists />
        <DropDownList label="Enhanced Select 2" v-model="value" :options="options" enhanceForLongLists />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            radioButtonListGallery = vue_1.defineComponent({
                name: "RadioButtonListGallery",
                components: {
                    GalleryAndResult,
                    RadioButtonList: radioButtonList_1.default,
                    Toggle: toggle_1.default,
                    NumberUpDown: numberUpDown_1.default
                },
                data() {
                    return {
                        value: "a",
                        isHorizontal: true,
                        repeatColumns: 0,
                        options: [
                            { text: "A Text", value: "a" },
                            { text: "B Text", value: "b" },
                            { text: "C Text", value: "c" },
                            { text: "D Text", value: "d" },
                            { text: "E Text", value: "e" },
                            { text: "F Text", value: "f" },
                            { text: "G Text", value: "g" }
                        ]
                    };
                },
                template: `
<GalleryAndResult :splitWidth="false">
    <template #header>
        RadioButtonList
    </template>
    <template #gallery>
        <NumberUpDown label="Horizontal Columns" v-model="repeatColumns" :min="0" />
        <Toggle label="Horizontal" v-model="isHorizontal" />
        <RadioButtonList label="Radio List 1" v-model="value" :options="options" :horizontal="isHorizontal" :repeatColumns="repeatColumns" />
        <RadioButtonList label="Radio List 2" v-model="value" :options="options" />
    </template>
    <template #result>
        Value: {{value}}
    </template>
</GalleryAndResult>`
            });
            checkBoxGallery = vue_1.defineComponent({
                name: "CheckBoxGallery",
                components: {
                    GalleryAndResult,
                    CheckBox: checkBox_1.default,
                    Toggle: toggle_1.default
                },
                data() {
                    return {
                        isChecked: false,
                        inline: true
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        CheckBox
    </template>
    <template #gallery>
        <CheckBox label="Check 1" v-model="isChecked" />
        <CheckBox label="Check 2" v-model="isChecked" />
    </template>
    <template #result>
        {{isChecked}}
    </template>
</GalleryAndResult>`
            });
            inlineCheckBoxGallery = vue_1.defineComponent({
                name: "InlineCheckBoxGallery",
                components: {
                    GalleryAndResult,
                    InlineCheckBox: inlineCheckBox_1.default
                },
                data() {
                    return {
                        isChecked: false,
                        inline: true
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        InlineCheckBox
    </template>
    <template #gallery>
        <InlineCheckBox label="Check 1" v-model="isChecked" />
        <InlineCheckBox label="Check 2" v-model="isChecked" />
    </template>
    <template #result>
        {{isChecked}}
    </template>
</GalleryAndResult>`
            });
            dialogGallery = vue_1.defineComponent({
                name: "DialogGallery",
                components: {
                    GalleryAndResult,
                    RockButton: rockButton_1.default,
                    Dialog: dialog_1.default,
                    CheckBox: checkBox_1.default
                },
                data() {
                    return {
                        isDialogVisible: false,
                        isDismissible: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Dialog
    </template>
    <template #gallery>
        <RockButton @click="isDialogVisible = true">Show</RockButton>
        <CheckBox label="Dismissible" v-model="isDismissible" />
    </template>
    <template #result>
        <Dialog v-model="isDialogVisible" :dismissible="isDismissible">
            <template #header>
                <h4>Romans 11:33-36</h4>
            </template>
            <template #default>
                <p>
                    Oh, the depth of the riches<br />
                    and the wisdom and the knowledge of God!<br />
                    How unsearchable his judgments<br />
                    and untraceable his ways!<br />
                    For who has known the mind of the Lord?<br />
                    Or who has been his counselor?<br />
                    And who has ever given to God,<br />
                    that he should be repaid?<br />
                    For from him and through him<br />
                    and to him are all things.<br />
                    To him be the glory forever. Amen.
                </p>
            </template>
            <template #footer>
                <RockButton @click="isDialogVisible = false" btnType="primary">OK</RockButton>
                <RockButton @click="isDialogVisible = false" btnType="default">Cancel</RockButton>
            </template>
        </Dialog>
    </template>
</GalleryAndResult>`
            });
            formRulesGallery = vue_1.defineComponent({
                name: "FormRulesGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    TextBox: textBox_1.default,
                    CurrencyBox: currencyBox_1.default,
                    RockButton: rockButton_1.default
                },
                data() {
                    return {
                        ruleTestCurrency: 1,
                        ruleTestText: "",
                        rules: "required"
                    };
                },
                template: `
<GalleryAndResult :splitWidth="false">
    <template #header>
        Form Rules
    </template>
    <template #gallery>
        <TextBox label="Rules" v-model="rules" help="Try 'required', 'gte:1', 'lt:2', and others. Combine rules like this: 'required|lt:7|gt:6'" />
        <hr />
        <RockForm>
            <TextBox label="Text" v-model="ruleTestText" :rules="rules" />
            <CurrencyBox label="Currency" v-model="ruleTestCurrency" :rules="rules" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
</GalleryAndResult>`
            });
            checkBoxListGallery = vue_1.defineComponent({
                name: "CheckBoxListGallery",
                components: {
                    GalleryAndResult,
                    CheckBoxList: checkBoxList_1.default
                },
                data() {
                    return {
                        options: [
                            { value: "red", text: "Red" },
                            { value: "green", text: "Green" },
                            { value: "blue", text: "Blue" }
                        ],
                        items: ["green"]
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        CheckBoxList
    </template>
    <template #gallery>
        <CheckBoxList label="CheckBoxList 1" v-model="items" :options="options" />
        <CheckBoxList label="CheckBoxList 2" v-model="items" :options="options" />
    </template>
    <template #result>
        Items: {{JSON.stringify(items, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            listBoxGallery = vue_1.defineComponent({
                name: "ListBoxGallery",
                components: {
                    GalleryAndResult,
                    ListBox: listBox_1.default
                },
                data() {
                    return {
                        value: ["a"],
                        options: [
                            { text: "A Text", value: "a" },
                            { text: "B Text", value: "b" },
                            { text: "C Text", value: "c" },
                            { text: "D Text", value: "d" }
                        ]
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        ListBox
    </template>
    <template #gallery>
        <ListBox label="Select 1" v-model="value" :options="options" />
        <ListBox label="Select 2" v-model="value" :options="options" />
        <ListBox label="Enhanced Select 1" v-model="value" :options="options" enhanceForLongLists />
        <ListBox label="Enhanced Select 2" v-model="value" :options="options" enhanceForLongLists />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            datePickerGallery = vue_1.defineComponent({
                name: "DatePickerGallery",
                components: {
                    GalleryAndResult,
                    DatePicker: datePicker_1.default
                },
                data() {
                    return {
                        date: null,
                        currentDate: "CURRENT:1"
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DatePicker
    </template>
    <template #gallery>
        <DatePicker label="Date 1" v-model="date" />
        <DatePicker label="Date 2" v-model="date" />
        <DatePicker label="Current Date 1" v-model="currentDate" displayCurrentOption isCurrentDateOffset />
        <DatePicker label="Current Date 2" v-model="currentDate" displayCurrentOption isCurrentDateOffset />
    </template>
    <template #result>
        Date: {{JSON.stringify(date, null, 2)}}
        <br />
        Current Date: {{JSON.stringify(currentDate, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            dateRangePickerGallery = vue_1.defineComponent({
                name: "DateRangePickerGallery",
                components: {
                    GalleryAndResult,
                    DateRangePicker: dateRangePicker_1.default
                },
                data() {
                    return {
                        date: {}
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DateRangePicker
    </template>
    <template #gallery>
        <DateRangePicker label="Date Range 1" v-model="date" />
        <DateRangePicker label="Date Range 2" v-model="date" />
    </template>
    <template #result>
        Date: {{JSON.stringify(date, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            dateTimePickerGallery = vue_1.defineComponent({
                name: "DatePickerGallery",
                components: {
                    GalleryAndResult,
                    DateTimePicker: dateTimePicker_1.default
                },
                data() {
                    return {
                        date: null
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DateTimePicker
    </template>
    <template #gallery>
        <DateTimePicker label="Date 1" v-model="date" />
        <DateTimePicker label="Date 2" v-model="date" />
    </template>
    <template #result>
        Date: {{JSON.stringify(date, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            datePartsPickerGallery = vue_1.defineComponent({
                name: "DatePartsPickerGallery",
                components: {
                    GalleryAndResult,
                    Toggle: toggle_1.default,
                    BirthdayPicker: birthdayPicker_1.default,
                    DatePartsPicker: datePartsPicker_1.default
                },
                data() {
                    return {
                        showYear: true,
                        datePartsModel: {
                            month: 1,
                            day: 1,
                            year: 2020
                        }
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DatePartsPicker
    </template>
    <template #gallery>
        <Toggle label="Show Year" v-model="showYear" />
        <DatePartsPicker label="DatePartsPicker 1" v-model="datePartsModel" :showYear="showYear" />
        <DatePartsPicker label="DatePartsPicker 2" v-model="datePartsModel" :showYear="showYear" />
    </template>
    <template #result>
        <span>{{datePartsModel.month}} / {{datePartsModel.day}}</span><span v-if="showYear"> / {{datePartsModel.year}}</span>
    </template>
</GalleryAndResult>`
            });
            textBoxGallery = vue_1.defineComponent({
                name: "TextBoxGallery",
                components: {
                    GalleryAndResult,
                    TextBox: textBox_1.default
                },
                data() {
                    return {
                        text: "Some two-way bound text",
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        TextBox
    </template>
    <template #gallery>
        <TextBox label="Text 1" v-model="text" :maxLength="10" showCountDown />
        <TextBox label="Text 2" v-model="text" />
        <TextBox label="Memo" v-model="text" textMode="MultiLine" :rows="10" :maxLength="100" showCountDown />
    </template>
    <template #result>
        {{text}}
    </template>
</GalleryAndResult>`
            });
            colorPickerGallery = vue_1.defineComponent({
                name: "ColorPickerGallery",
                components: {
                    GalleryAndResult,
                    ColorPicker: colorPicker_1.default
                },
                data() {
                    return {
                        value: "#ee7725",
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        ColorPicker
    </template>
    <template #gallery>
        <ColorPicker label="Color" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            numberBoxGallery = vue_1.defineComponent({
                name: "NumberBoxGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    RockButton: rockButton_1.default,
                    TextBox: textBox_1.default,
                    NumberBox: numberBox_1.default
                },
                data() {
                    return {
                        minimumValue: "0",
                        maximumValue: "100",
                        value: 42,
                    };
                },
                computed: {
                    numericMinimumValue() {
                        return number_1.toNumber(this.minimumValue);
                    },
                    numericMaximumValue() {
                        return number_1.toNumber(this.maximumValue);
                    }
                },
                template: `
<GalleryAndResult>
    <template #header>
        NumberBox
    </template>
    <template #gallery>
        <TextBox label="Minimum Value" v-model="minimumValue" />
        <TextBox label="Maximum Value" v-model="maximumValue" />
        <RockForm>
            <NumberBox label="Number" v-model="value" :minimumValue="numericMinimumValue" :maximumValue="numericMaximumValue" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            numberRangeBoxGallery = vue_1.defineComponent({
                name: "NumberRangeBoxGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    RockButton: rockButton_1.default,
                    TextBox: textBox_1.default,
                    NumberRangeBox: numberRangeBox_1.default
                },
                data() {
                    return {
                        value: { lower: 0, upper: 100 },
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        NumberRangeBox
    </template>
    <template #gallery>
        <RockForm>
            <NumberRangeBox label="Number Range" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value.lower}} to {{value.upper}}
    </template>
</GalleryAndResult>`
            });
            genderDropDownListGallery = vue_1.defineComponent({
                name: "GenderDropDownListGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    RockButton: rockButton_1.default,
                    TextBox: textBox_1.default,
                    GenderDropDownList: genderDropDownList_1.default
                },
                data() {
                    return {
                        value: "1",
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        GenderDropDownList
    </template>
    <template #gallery>
        <RockForm>
            <GenderDropDownList label="Your Gender" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            socialSecurityNumberBoxGallery = vue_1.defineComponent({
                name: "SocialSecurityNumberBoxGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    RockButton: rockButton_1.default,
                    TextBox: textBox_1.default,
                    SocialSecurityNumberBox: socialSecurityNumberBox_1.default
                },
                data() {
                    return {
                        value: "123-45-6789",
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        SocialSecurityNumberBox
    </template>
    <template #gallery>
        <RockForm>
            <SocialSecurityNumberBox label="SSN" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            timePickerGallery = vue_1.defineComponent({
                name: "TimePickerGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    RockButton: rockButton_1.default,
                    TextBox: textBox_1.default,
                    TimePicker: timePicker_1.default
                },
                data() {
                    return {
                        value: { hour: 14, minute: 15 },
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        TimePicker
    </template>
    <template #gallery>
        <RockForm>
            <TimePicker label="Time" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value.hour}}:{{value.minute}}
    </template>
</GalleryAndResult>`
            });
            ratingGallery = vue_1.defineComponent({
                name: "RatingGallery",
                components: {
                    GalleryAndResult,
                    RockForm: rockForm_1.default,
                    NumberBox: numberBox_1.default,
                    Rating: rating_1.default
                },
                data() {
                    return {
                        value: 3,
                        maximumValue: 5
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Rating
    </template>
    <template #gallery>
        <NumberBox label="Maximum Rating" v-model="maximumValue" />
        <RockForm>
            <Rating label="Time" v-model="value" :maxRating="maximumValue || 5" />
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            switchGallery = vue_1.defineComponent({
                name: "SwitchGallery",
                components: {
                    GalleryAndResult,
                    TextBox: textBox_1.default,
                    Switch: switch_1.default
                },
                data() {
                    return {
                        text: "",
                        isChecked: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Switch
    </template>
    <template #gallery>
        <TextBox label="Text" v-model="text" />

        <Switch label="Switch 1" v-model="isChecked" :text="text" />
        <Switch label="Switch 2" v-model="isChecked" :text="text" />
    </template>
    <template #result>
        {{isChecked}}
    </template>
</GalleryAndResult>`
            });
            inlineSwitchGallery = vue_1.defineComponent({
                name: "InlineSwitchGallery",
                components: {
                    GalleryAndResult,
                    CheckBox: checkBox_1.default,
                    InlineSwitch: inlineSwitch_1.default
                },
                data() {
                    return {
                        isBold: false,
                        isChecked: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        InlineSwitch
    </template>
    <template #gallery>
        <CheckBox label="Is Bold" v-model="isBold" />

        <InlineSwitch label="Inline Switch 1" v-model="isChecked" :isBold="isBold" />
        <InlineSwitch label="Inline Switch 2" v-model="isChecked" :isBold="isBold" />
    </template>
    <template #result>
        {{isChecked}}
    </template>
</GalleryAndResult>`
            });
            currencyBoxGallery = vue_1.defineComponent({
                name: "CurrencyBoxGallery",
                components: {
                    GalleryAndResult,
                    CurrencyBox: currencyBox_1.default
                },
                data() {
                    return {
                        value: 1.23
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        CurrencyBox
    </template>
    <template #gallery>
        <CurrencyBox label="Currency 1" v-model="value" />
        <CurrencyBox label="Currency 2" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            emailBoxGallery = vue_1.defineComponent({
                name: "EmailBoxGallery",
                components: {
                    GalleryAndResult,
                    EmailBox: emailBox_1.default
                },
                data() {
                    return {
                        value: "ted@rocksolidchurchdemo.com"
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        EmailBox
    </template>
    <template #gallery>
        <EmailBox label="EmailBox 1" v-model="value" />
        <EmailBox label="EmailBox 2" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            numberUpDownGallery = vue_1.defineComponent({
                name: "NumberUpDownGallery",
                components: {
                    GalleryAndResult,
                    NumberUpDown: numberUpDown_1.default
                },
                data() {
                    return {
                        value: 1
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        NumberUpDown
    </template>
    <template #gallery>
        <NumberUpDown label="NumberUpDown 1" v-model="value" />
        <NumberUpDown label="NumberUpDown 2" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            staticFormControlGallery = vue_1.defineComponent({
                name: "StaticFormControlGallery",
                components: {
                    GalleryAndResult,
                    StaticFormControl: staticFormControl_1.default
                },
                data() {
                    return {
                        value: "This is some text"
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        StaticFormControl
    </template>
    <template #gallery>
        <StaticFormControl label="StaticFormControl 1" v-model="value" />
        <StaticFormControl label="StaticFormControl 2" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            addressControlGallery = vue_1.defineComponent({
                name: "AddressControlGallery",
                components: {
                    GalleryAndResult,
                    AddressControl: addressControl_1.default
                },
                data() {
                    return {
                        value: addressControl_1.getDefaultAddressControlModel()
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        AddressControl
    </template>
    <template #gallery>
        <AddressControl label="Address 1" v-model="value" />
        <AddressControl label="Address 2" v-model="value" />
    </template>
    <template #result>
        <pre>{{JSON.stringify(value, null, 2)}}</pre>
    </template>
</GalleryAndResult>`
            });
            toggleGallery = vue_1.defineComponent({
                name: "ToggleGallery",
                components: {
                    GalleryAndResult,
                    TextBox: textBox_1.default,
                    DropDownList: dropDownList_1.default,
                    Toggle: toggle_1.default
                },
                data() {
                    return {
                        trueText: "On",
                        falseText: "Off",
                        btnSize: "",
                        sizeOptions: [
                            { value: "lg", text: "Large" },
                            { value: "md", text: "Medium" },
                            { value: "sm", text: "Small" },
                            { value: "xs", text: "Extra Small" },
                        ],
                        value: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Toggle
    </template>
    <template #gallery>
        <TextBox label="True Text" v-model="trueText" />
        <TextBox label="False Text" v-model="falseText" />
        <DropDownList label="Button Size" v-model="btnSize" :options="sizeOptions" />

       <Toggle label="Toggle 1" v-model="value" :trueText="trueText" :falseText="falseText" :btnSize="btnSize" />
       <Toggle label="Toggle 2" v-model="value" :trueText="trueText" :falseText="falseText" :btnSize="btnSize" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            progressTrackerGallery = vue_1.defineComponent({
                name: "ProgressTrackerGallery",
                components: {
                    GalleryAndResult,
                    NumberUpDown: numberUpDown_1.default,
                    ProgressTracker: progressTracker_1.default
                },
                data() {
                    return {
                        value: 0,
                        items: [
                            { key: "S", title: "Start", subtitle: "The beginning" },
                            { key: "1", title: "Step 1", subtitle: "The first step" },
                            { key: "2", title: "Step 2", subtitle: "The second step" },
                            { key: "3", title: "Step 3", subtitle: "The third step" },
                            { key: "4", title: "Step 4", subtitle: "The fourth step" },
                            { key: "5", title: "Step 5", subtitle: "The fifth step" },
                            { key: "6", title: "Step 6", subtitle: "The sixth step" },
                            { key: "7", title: "Step 7", subtitle: "The seventh step" },
                            { key: "8", title: "Step 8", subtitle: "The eighth step" },
                            { key: "F", title: "Finish", subtitle: "The finish" }
                        ]
                    };
                },
                template: `
<GalleryAndResult :splitWidth="false">
    <template #header>
        ProgressTracker
    </template>
    <template #gallery>
        <NumberUpDown label="Index" v-model="value" :min="0" :max="100" />
    </template>
    <template #result>
        <ProgressTracker :items="items" :currentIndex="value" />
    </template>
</GalleryAndResult>`
            });
            itemsWithPreAndPostHtmlGallery = vue_1.defineComponent({
                name: "ItemsWithPreAndPostHtmlGallery",
                components: {
                    GalleryAndResult,
                    TextBox: textBox_1.default,
                    ItemsWithPreAndPostHtml: itemsWithPreAndPostHtml_1.default
                },
                data() {
                    return {
                        value: [
                            { preHtml: '<div class="row"><div class="col-sm-6">', postHtml: "</div>", slotName: "item1" },
                            { preHtml: '<div class="col-sm-6">', postHtml: "</div></div>", slotName: "item2" }
                        ],
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        ItemsWithPreAndPostHtml
    </template>
    <template #gallery>
        <TextBox label="Item 1 - Pre Html" v-model="value[0].preHtml" />
        <TextBox label="Item 1 - Post Html" v-model="value[0].postHtml" />
        <TextBox label="Item 2 - Pre Html" v-model="value[1].preHtml" />
        <TextBox label="Item 2 - Post Html" v-model="value[1].postHtml" />
    </template>
    <template #result>
        <ItemsWithPreAndPostHtml :items="value">
            <template #item1>
                <div style="background-color: #fcc; padding: 5px;">This is item 1</div>
            </template>
            <template #item2>
                <div style="background-color: #ccf; padding: 5px;">This is item 2</div>
            </template>
        </ItemsWithPreAndPostHtml>
    </template>
</GalleryAndResult>`
            });
            fullscreenGallery = vue_1.defineComponent({
                name: "FullscreenGallery",
                components: {
                    GalleryAndResult,
                    CheckBox: checkBox_1.default,
                    Fullscreen: fullscreen_1.default
                },
                data() {
                    return {
                        colors: Array.apply(0, Array(256)).map((_, index) => `rgb(${index}, ${index}, ${index})`),
                        pageOnly: true,
                        value: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Fullscreen
    </template>
    <template #gallery>
        <CheckBox v-model="pageOnly" label="Is Page Only" />

        <Fullscreen v-model="value" :isPageOnly="pageOnly">
            <CheckBox v-model="value" label="Fullscreen" />
            <div v-for="c in colors" :style="{ background: c, height: '5px' }"></div>
        </Fullscreen>
    </template>
    <template #result>
    </template>
</GalleryAndResult>`
            });
            panelGallery = vue_1.defineComponent({
                name: "PanelGallery",
                components: {
                    GalleryAndResult,
                    CheckBox: checkBox_1.default,
                    Panel: panel_1.default
                },
                data() {
                    return {
                        colors: Array.apply(0, Array(256)).map((_, index) => `rgb(${index}, ${index}, ${index})`),
                        collapsableValue: true,
                        drawerValue: false,
                        hasAside: false,
                        hasDrawer: true,
                        hasFullscreen: false,
                        isFullscreenPageOnly: true,
                        value: true
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Panel
    </template>
    <template #gallery>
        <CheckBox v-model="collapsableValue" label="Collapsable" />
        <CheckBox v-model="value" label="Panel Open" />
        <CheckBox v-model="hasDrawer" label="Has Drawer" />
        <CheckBox v-model="hasAside" label="Has Aside" />
        <CheckBox v-model="hasFullscreen" label="Has Fullscreen" />
        <CheckBox v-model="isFullscreenPageOnly" label="Page Only Fullscreen" />

        <Panel v-model="value" v-model:isDrawerOpen="drawerValue" :hasCollapse="collapsableValue" :hasFullscreen="hasFullscreen" :isFullscreenPageOnly="isFullscreenPageOnly" title="Panel Title">
            <template v-if="hasDrawer" #drawer>
                <div style="text-align: center;">Drawer Content</div>
            </template>

            <template v-if="hasAside" #titleAside>
                <span class="label label-warning">Warning</span>
            </template>

            <template v-if="hasAside" #actionAside>
                <span class="panel-action">
                    <i class="fa fa-star-o"></i>
                </span>
            </template>

            <div v-for="c in colors" :style="{ background: c, height: '5px' }"></div>
        </Panel>
    </template>
    <template #result>
    </template>
</GalleryAndResult>`
            });
            personPickerGallery = vue_1.defineComponent({
                name: "PersonPickerGallery",
                components: {
                    GalleryAndResult,
                    PersonPicker: personPicker_1.default
                },
                data() {
                    return {
                        value: undefined
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        PersonPicker
    </template>
    <template #gallery>
        <PersonPicker v-model="value" label="Person" />
    </template>
    <template #result>
        <span v-if="value">{{ JSON.stringify(value) }}</span>
    </template>
</GalleryAndResult>`
            });
            galleryComponents = {
                textBoxGallery,
                datePickerGallery,
                dateRangePickerGallery,
                dateTimePickerGallery,
                datePartsPickerGallery,
                radioButtonListGallery,
                dialogGallery,
                checkBoxGallery,
                inlineCheckBoxGallery,
                switchGallery,
                inlineSwitchGallery,
                checkBoxListGallery,
                listBoxGallery,
                phoneNumberBoxGallery,
                dropDownListGallery,
                helpBlockGallery,
                formRulesGallery,
                colorPickerGallery,
                numberBoxGallery,
                numberRangeBoxGallery,
                genderDropDownListGallery,
                socialSecurityNumberBoxGallery,
                timePickerGallery,
                ratingGallery,
                currencyBoxGallery,
                emailBoxGallery,
                numberUpDownGallery,
                staticFormControlGallery,
                addressControlGallery,
                toggleGallery,
                progressTrackerGallery,
                itemsWithPreAndPostHtmlGallery,
                fullscreenGallery,
                panelGallery,
                personPickerGallery
            };
            galleryTemplate = Object.keys(galleryComponents).sort().map(g => `<${g} />`).join("");
            exports_1("default", vue_1.defineComponent({
                name: "Example.ControlGallery",
                components: Object.assign({ Panel: panel_1.default }, galleryComponents),
                template: `
<Panel type="block" hasFullscreen>
    <template v-slot:title>
        <i class="fa fa-flask"></i>
        Obsidian Control Gallery
    </template>
    <template v-slot:default>
        ${galleryTemplate}
    </template>
</Panel>`
            }));
        }
    };
});
//# sourceMappingURL=controlGallery.js.map