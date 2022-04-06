System.register(["vue", "../Util/component"], function (exports_1, context_1) {
    "use strict";
    var vue_1, component_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "InlineSlider",
                components: {},
                props: {
                    modelValue: {
                        type: Number,
                        default: 0
                    },
                    isIntegerOnly: {
                        type: Boolean,
                        default: false
                    },
                    min: {
                        type: Number,
                        default: 0
                    },
                    max: {
                        type: Number,
                        default: 100
                    },
                    showValueBar: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    "update:modelValue"
                ],
                setup(props, { emit }) {
                    const internalValue = component_1.useVModelPassthrough(props, "modelValue", emit);
                    const sliderElement = vue_1.ref(null);
                    const thumbStyle = vue_1.computed(() => {
                        return {
                            left: `${percentValue.value * 100}%`
                        };
                    });
                    const percentValue = vue_1.computed(() => {
                        if (props.min <= props.max) {
                            return (internalValue.value - props.min) / (props.max - props.min);
                        }
                        return 0;
                    });
                    const leftSliderStyle = vue_1.computed(() => {
                        const value = Math.round(percentValue.value * 10000);
                        return {
                            flexBasis: `${value / 100}%`
                        };
                    });
                    const rightSliderStyle = vue_1.computed(() => {
                        const value = Math.round(percentValue.value * 10000);
                        return {
                            flexBasis: `${100 - (value / 100)}%`
                        };
                    });
                    const showMinValue = vue_1.computed(() => percentValue.value >= 0.1);
                    const showMaxValue = vue_1.computed(() => percentValue.value <= 0.9);
                    const constrainValue = (value) => {
                        if (props.isIntegerOnly) {
                            value = Math.round(value);
                        }
                        if (value < props.min) {
                            value = props.min;
                        }
                        else if (value > props.max) {
                            value = props.max;
                        }
                        return value;
                    };
                    const constrainInternalValueAndUpdate = () => {
                        const value = constrainValue(internalValue.value);
                        if (value !== internalValue.value) {
                            internalValue.value = value;
                        }
                    };
                    const calculateDragValue = (clientX) => {
                        if (sliderElement.value) {
                            const rect = sliderElement.value.getBoundingClientRect();
                            const xPosition = clientX - rect.left;
                            const xConstrained = Math.min(Math.max(xPosition, 0), rect.width);
                            const percent = xConstrained / rect.width;
                            const valueRange = props.max - props.min;
                            const value = constrainValue((valueRange * percent) + props.min);
                            if (value !== internalValue.value) {
                                internalValue.value = value;
                            }
                        }
                    };
                    const onMouseDown = (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (ev.button === 0) {
                            calculateDragValue(ev.clientX);
                            window.addEventListener("mousemove", onMouseMove);
                            window.addEventListener("mouseup", onMouseUp);
                        }
                    };
                    const onTouchDown = (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (ev.touches.length === 1) {
                            calculateDragValue(ev.touches[0].clientX);
                            window.addEventListener("touchmove", onTouchMove);
                            window.addEventListener("touchup", onTouchUp);
                        }
                    };
                    const onMouseMove = (ev) => {
                        calculateDragValue(ev.clientX);
                    };
                    const onMouseUp = () => {
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                    };
                    const onTouchMove = (ev) => {
                        calculateDragValue(ev.touches[0].clientX);
                    };
                    const onTouchUp = () => {
                        window.removeEventListener("touchmove", onTouchMove);
                        window.removeEventListener("touchup", onTouchUp);
                    };
                    constrainInternalValueAndUpdate();
                    return {
                        internalValue,
                        leftSliderStyle,
                        onMouseDown,
                        onTouchDown,
                        rightSliderStyle,
                        sliderElement,
                        showMaxValue,
                        showMinValue,
                        thumbStyle
                    };
                },
                template: `
<div style="margin-left: calc(var(--slider-handle-height) / 2); margin-right: calc(var(--slider-handle-height) / 2);">
    <div v-if="showValueBar" class="d-flex" style="position: relative; margin-bottom: 3px;">
        <span v-if="showMinValue" class="text-muted">{{ min }}</span>
        <span style="flex-grow: 1"></span>
        <span v-if="showMaxValue" class="text-muted">{{ max }}</span>

        <span :style="thumbStyle" style="position: absolute;">
            <span style="background: var(--slider-progress-bg); border-radius: 3px; padding: 1px 5px; color: #fff; font-size: 14px; margin-left: -50%; display: block; margin-right: 50%;">
                {{ internalValue }}
            </span>
        </span>
    </div>

    <div ref="sliderElement" class="d-flex" style="height: var(--slider-handle-height); align-items: center; position: relative;" @mousedown="onMouseDown" @touchdown="onTouchDown">
        <span :style="leftSliderStyle" style="background-color: var(--slider-progress-bg); height: var(--slider-height); border-top-left-radius: calc(var(--slider-height) / 2); border-bottom-left-radius: calc(var(--slider-height) / 2); flex-grow: 1;"></span>
        <span :style="rightSliderStyle" style="background-color: var(--slider-bg); height: var(--slider-height); border-top-right-radius: calc(var(--slider-height) / 2); border-bottom-right-radius: calc(var(--slider-height) / 2); flex-grow: 1;"></span>

        <span :style="thumbStyle" style="position: absolute; width: var(--slider-handle-height); height: var(--slider-handle-height); margin-left: calc(0px - calc(var(--slider-handle-height) / 2)); cursor: pointer; background: var(--slider-handle-bg); border: 1px solid var(--slider-handle-border-color); border-radius: var(--slider-handle-height);" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></span>
    </div>
</div>
`
            }));
        }
    };
});
//# sourceMappingURL=inlineSlider.js.map