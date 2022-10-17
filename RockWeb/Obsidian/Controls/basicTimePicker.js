System.register(['vue', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/stringUtils'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch, toNumber, padLeft;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }, function (module) {
            toNumber = module.toNumber;
        }, function (module) {
            padLeft = module.padLeft;
        }],
        execute: (function () {

            var BasicTimePicker = exports('default', defineComponent({
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
                    const internalHour = ref(null);
                    const internalMinute = ref(null);
                    const internalMeridiem = ref("AM");
                    const internalValue = ref("");
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
                        const values = /(\d+)(?::(\d+))?/.exec(internalValue.value);
                        const value = {};
                        if (values !== null) {
                            value.hour = toNumber(values[1]) + (internalMeridiem.value === "PM" ? 12 : 0);
                            value.minute = values.length > 2 ? toNumber(values[2]) : 0;
                            value.hour = Math.max(0, Math.min(23, value.hour));
                            value.minute = Math.max(0, Math.min(59, value.minute));
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
                    watch(() => props.modelValue, () => {
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
                        internalValue.value = `${internalHour.value}:${padLeft(internalMinute.value.toString(), 2, "0")}`;
                    }, { immediate: true });
                    return {
                        internalHour,
                        internalMinute,
                        internalMeridiem,
                        internalValue,
                        keyPress,
                        updateValue,
                        toggleMeridiem
                    };
                },
                template: `
<div class="input-group input-width-md">
    <input class="form-control" type="text" v-model="internalValue" @change="updateValue" @keypress="keyPress" :disabled="disabled" />
    <span class="input-group-btn"><button class="btn btn-default" @click="toggleMeridiem" :disabled="disabled">{{ internalMeridiem }}</button></span>
</div>
`
            }));

        })
    };
}));
