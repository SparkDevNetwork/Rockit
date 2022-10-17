System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            const CountdownTimer = exports('default', defineComponent({
                name: "CountdownTimer",
                props: {
                    modelValue: {
                        type: Number,
                        required: true
                    }
                },
                data() {
                    return {
                        handle: null
                    };
                },
                computed: {
                    timeString() {
                        const minutes = Math.floor(this.modelValue / 60);
                        const seconds = Math.floor(this.modelValue % 60);
                        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
                    },
                },
                methods: {
                    onInterval() {
                        if (this.modelValue <= 0) {
                            this.$emit("update:modelValue", 0);
                            return;
                        }
                        this.$emit("update:modelValue", Math.floor(this.modelValue - 1));
                    }
                },
                mounted() {
                    if (this.handle) {
                        clearInterval(this.handle);
                    }
                    this.handle = setInterval(() => this.onInterval(), 1000);
                },
                unmounted() {
                    if (this.handle) {
                        clearInterval(this.handle);
                        this.handle = null;
                    }
                },
                template: `
<span>{{timeString}}</span>`
            }));

        })
    };
}));
