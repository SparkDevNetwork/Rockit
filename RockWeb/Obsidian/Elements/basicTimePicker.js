System.register(["vue", "../Services/number", "../Services/string"], function (exports_1, context_1) {
    "use strict";
    var vue_1, vue_2, number_1, string_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
                vue_2 = vue_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_2.defineComponent({
                name: "BasicTimePicker",
                components: {},
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: ["update:modelValue"],
                setup(props, { emit }) {
                    const internalHour = vue_2.ref(null);
                    const internalMinute = vue_2.ref(null);
                    const internalMeridiem = vue_2.ref("AM");
                    const internalValue = vue_2.ref("");
                    function keyPress(e) {
                        if (e.key === "a" || e.key === "p" || e.key === "A" || e.key == "P") {
                            internalMeridiem.value = e.key === "a" || e.key === "A" ? "AM" : "PM";
                            maybeUpdateValue();
                            e.preventDefault();
                            return false;
                        }
                        if (/^[0-9:]$/.test(e.key) === false) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    }
                    function updateValue() {
                        const values = /(\d+):(\d+)/.exec(internalValue.value);
                        const value = {};
                        if (values !== null) {
                            value.hour = number_1.toNumber(values[1]) + (internalMeridiem.value === "PM" ? 12 : 0);
                            value.minute = number_1.toNumber(values[2]);
                        }
                        emit("update:modelValue", value);
                    }
                    function maybeUpdateValue() {
                        const values = /(\d+):(\d+)/.exec(internalValue.value);
                        if (values !== null) {
                            updateValue();
                        }
                    }
                    function toggleMeridiem(e) {
                        e.preventDefault();
                        internalMeridiem.value = internalMeridiem.value === "AM" ? "PM" : "AM";
                        maybeUpdateValue();
                        return false;
                    }
                    vue_1.watch(() => props.modelValue, () => {
                        if (props.modelValue.hour) {
                            if (props.modelValue.hour > 12) {
                                internalHour.value = props.modelValue.hour - 12;
                            }
                            else {
                                internalHour.value = props.modelValue.hour;
                            }
                            if (props.modelValue.hour >= 12) {
                                internalMeridiem.value = "PM";
                            }
                        }
                        else {
                            internalHour.value = null;
                        }
                        if (props.modelValue.minute) {
                            internalMinute.value = props.modelValue.minute;
                        }
                        else if (internalHour.value != null) {
                            internalMinute.value = 0;
                        }
                        else {
                            internalMinute.value = null;
                        }
                        if (internalHour.value === null || internalMinute.value === null) {
                            return;
                        }
                        internalValue.value = `${internalHour.value}:${string_1.padLeft(internalMinute.value.toString(), 2, "0")}`;
                    }, { immediate: true });
                    return {
                        internalHour,
                        internalMinute,
                        internalMeridiem,
                        internalValue,
                        keyPress,
                        updateValue,
                        maybeUpdateValue,
                        toggleMeridiem
                    };
                },
                template: `
<div class="input-group input-width-md">
    <input class="form-control" type="text" v-model="internalValue" v-on:change="updateValue" v-on:keypress="keyPress" :disabled="disabled" />
    <span class="input-group-btn"><button class="btn btn-default" v-on:click="toggleMeridiem" :disabled="disabled">{{ internalMeridiem }}</button></span>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=basicTimePicker.js.map