System.register(['tslib', 'vue', '@Obsidian/Controls/rockFormField', '@Obsidian/Utility/page', '@Obsidian/Utility/guid', '@Obsidian/Utility/fullscreen', '@Obsidian/Utility/component'], (function (exports) {
    'use strict';
    var __awaiter, defineComponent, ref, computed, watch, onMounted, nextTick, RockFormField, loadJavaScriptAsync, newGuid, isFullscreen, exitFullscreen, enterFullscreen, updateRefValue;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            defineComponent = module.defineComponent;
            ref = module.ref;
            computed = module.computed;
            watch = module.watch;
            onMounted = module.onMounted;
            nextTick = module.nextTick;
        }, function (module) {
            RockFormField = module["default"];
        }, function (module) {
            loadJavaScriptAsync = module.loadJavaScriptAsync;
        }, function (module) {
            newGuid = module.newGuid;
        }, function (module) {
            isFullscreen = module.isFullscreen;
            exitFullscreen = module.exitFullscreen;
            enterFullscreen = module.enterFullscreen;
        }, function (module) {
            updateRefValue = module.updateRefValue;
        }],
        execute: (function () {

            const aceScriptPromise = loadJavaScriptAsync("/Scripts/ace/ace.js", () => !!window.ace);
            function getAceTheme(theme) {
                if (!theme || theme.toLowerCase() === "rock") {
                    return "github";
                }
                return theme.toLowerCase();
            }
            function getAceMode(mode) {
                if (!mode) {
                    return "text";
                }
                return mode.toLowerCase();
            }
            var codeEditor = exports('default', defineComponent({
                name: "CodeEditor",
                components: {
                    RockFormField
                },
                props: {
                    modelValue: {
                        type: String,
                        default: ""
                    },
                    theme: {
                        type: String,
                        default: "rock"
                    },
                    mode: {
                        type: String,
                        default: "text"
                    },
                    noLineWrap: {
                        type: Boolean,
                        default: false
                    },
                    editorHeight: {
                        type: Number,
                        required: false
                    },
                    mergeFields: {
                        type: Array,
                        required: false
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: {
                    "update:modelValue": (_value) => true
                },
                setup(props, { emit }) {
                    let editor;
                    const internalValue = ref(props.modelValue);
                    const uniqueId = newGuid();
                    const codeEditorClass = computed(() => {
                        return "code-editor-container";
                    });
                    const codeEditorId = computed(() => {
                        return `codeeditor-div-${uniqueId}`;
                    });
                    const codeEditorStyle = computed(() => {
                        return {
                            position: "relative",
                            height: `${editorHeight.value}px`
                        };
                    });
                    const hasMergeFields = computed(() => {
                        return !!props.mergeFields && props.mergeFields.length > 0;
                    });
                    const editorHeight = computed(() => {
                        var _a;
                        let height = (_a = props.editorHeight) !== null && _a !== void 0 ? _a : 200;
                        if (hasMergeFields.value) {
                            height -= 40;
                        }
                        return height;
                    });
                    watch(() => [props.theme, props.mode, props.noLineWrap, props.disabled], () => {
                        if (editor) {
                            editor.setTheme(`ace/theme/${getAceTheme(props.theme)}`);
                            editor.getSession().setMode(`ace/mode/${getAceMode(props.mode)}`);
                            editor.getSession().setUseWrapMode(!props.noLineWrap);
                            editor.setReadOnly(props.disabled);
                        }
                    });
                    watch(() => props.modelValue, () => {
                        updateRefValue(internalValue, props.modelValue);
                    });
                    watch(internalValue, () => {
                        emit("update:modelValue", internalValue.value);
                    });
                    onMounted(() => __awaiter(this, void 0, void 0, function* () {
                        yield aceScriptPromise;
                        editor = ace.edit(codeEditorId.value);
                        editor.setTheme(`ace/theme/${getAceTheme(props.theme)}`);
                        editor.getSession().setMode(`ace/mode/${getAceMode(props.mode)}`);
                        editor.getSession().setUseWrapMode(!props.noLineWrap);
                        editor.setShowPrintMargin(false);
                        editor.setReadOnly(props.disabled);
                        editor.$blockScrolling = Infinity;
                        editor.commands.addCommand({
                            name: "Toggle Fullscreen",
                            bindKey: "F11",
                            exec: () => __awaiter(this, void 0, void 0, function* () {
                                if (isFullscreen()) {
                                    exitFullscreen();
                                }
                                else {
                                    enterFullscreen(editor.container, () => editor.resize());
                                }
                                editor.resize();
                            })
                        });
                        editor.getSession().on("change", () => {
                            updateRefValue(internalValue, editor.getValue());
                        });
                        nextTick(() => {
                            editor.resize();
                        });
                    }));
                    return {
                        codeEditorClass,
                        codeEditorId,
                        codeEditorStyle,
                        editorHeight,
                        internalValue,
                        hasMergeFields
                    };
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-code-editor"
    name="codeeditor">
    <template #default="{uniqueId, field}">
        <div class="control-wrapper">
            <div v-if="hasMergeFields" class="codeeditor-header margin-b-md clearfix">
            </div>

            <div :class="codeEditorClass"
                :style="codeEditorStyle">
                <pre v-once
                    :id="codeEditorId"
                    class="position-absolute inset-0 m-0 ace_editor">{{ internalValue }}</pre>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));

        })
    };
}));
