System.register(['vue'], (function (exports) {
    'use strict';
    var defineComponent, ref, watch;
    return {
        setters: [function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            watch = module.watch;
        }],
        execute: (function () {

            var TabbedContent = exports('default', defineComponent({
                name: "TabbedContent",
                props: {
                    tabList: {
                        type: Array,
                        required: true
                    }
                },
                setup(props) {
                    const active = ref(0);
                    const classes = ref([]);
                    let timeout;
                    watch(() => props.tabList, () => {
                        active.value = 0;
                        classes.value = props.tabList.map((item, i) => {
                            let list = "tab-pane fade";
                            if (i == active.value) {
                                list += " active in";
                            }
                            return list;
                        });
                    }, { immediate: true });
                    watch(active, (current, previous) => {
                        classes.value[previous] = "tab-pane fade active";
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            classes.value[previous] = "tab-pane fade";
                            classes.value[current] = "tab-pane fade active in";
                        }, 150);
                    });
                    return {
                        active,
                        classes
                    };
                },
                template: `
<div>
    <ul class="nav nav-tabs margin-b-lg">
        <li v-for="(item, i) in tabList" :key="i" @click.prevent="active = i" :class="{active: active == i}">
            <a href="#" :aria-expanded="active == i">
                <slot name="tab" :item="item" />
            </a>
        </li>
    </ul>

    <div class="tab-content">
        <div v-for="(item, i) in tabList" :key="i" :class="classes[i]">
            <slot name="tabpane" :item="item" />
        </div>
    </div>
</div>
`
            }));

        })
    };
}));
