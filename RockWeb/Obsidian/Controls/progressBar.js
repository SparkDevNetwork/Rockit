System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
        }],
        execute: (function () {

            var progressBar = exports('default', defineComponent({
                name: "ProgressBar",
                props: {
                    percent: {
                        type: Number,
                        required: true
                    }
                },
                computed: {
                    boundedPercent() {
                        if (this.percent < 0) {
                            return 0;
                        }
                        if (this.percent > 100) {
                            return 100;
                        }
                        return this.percent;
                    },
                    roundedBoundedPercent() {
                        return Math.round(this.boundedPercent);
                    },
                    style() {
                        return `width: ${this.boundedPercent}%;`;
                    }
                },
                template: `
<div class="progress">
    <div class="progress-bar" role="progressbar" :aria-valuenow="roundedBoundedPercent" aria-valuemin="0" aria-valuemax="100" :style="style">
        <span class="sr-only">{{roundedBoundedPercent}}% Complete</span>
    </div>
</div>`
            }));

        })
    };
}));
