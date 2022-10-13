System.register(['vue', './rockFormField.js', '@Obsidian/Utility/component', '@Obsidian/Utility/form', '@Obsidian/Utility/guid', '@Obsidian/ValidationRules', './rockLabel.js', './helpBlock.js', './javaScriptAnchor.js'], (function (exports) {
    'use strict';
    var defineComponent, ref, computed, watch, RockFormField;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
        }, function (module) {
            RockFormField = module["default"];
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: (function () {

            var rating = exports('default', defineComponent({
                name: "Rating",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: 0
                    },
                    maxRating: {
                        type: Number,
                        default: 5
                    }
                },
                setup(props, { emit }) {
                    const internalValue = ref(props.modelValue);
                    const hoverValue = ref(null);
                    const showClear = computed(() => internalValue.value > 0);
                    watch(() => props.modelValue, () => internalValue.value = props.modelValue);
                    watch(internalValue, () => emit("update:modelValue", internalValue.value));
                    const setRating = (value) => {
                        internalValue.value = value;
                    };
                    const onClear = (e) => {
                        e.preventDefault();
                        setRating(0);
                        return false;
                    };
                    const classForRating = (position) => {
                        var _a;
                        const filledCount = Math.min(props.maxRating, (_a = hoverValue.value) !== null && _a !== void 0 ? _a : internalValue.value);
                        return position <= filledCount ? "fa fa-rating-selected" : "fa fa-rating-unselected";
                    };
                    const setHover = (position) => {
                        hoverValue.value = position;
                    };
                    const clearHover = () => {
                        hoverValue.value = null;
                    };
                    return {
                        classForRating,
                        clearHover,
                        hoverValue,
                        internalValue,
                        onClear,
                        setHover,
                        setRating,
                        showClear
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-rating"
    name="rock-rating">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div class="rating-input">
                <i v-for="i in maxRating" :key="i" :class="classForRating(i)" @click="setRating(i)" @mouseover="setHover(i)" @mouseleave="clearHover()"></i>
                <a v-if="showClear" class="clear-rating" href="#" v-on:click="onClear" @mouseover="setHover(0)" @mouseleave="clearHover()">
                    <span class="fa fa-remove"></span>
                </a>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
