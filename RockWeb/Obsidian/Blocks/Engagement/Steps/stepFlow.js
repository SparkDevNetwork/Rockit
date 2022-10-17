System.register(['tslib', '@Obsidian/Utility/block', 'vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/rockButton', '@Obsidian/Templates/block', '@Obsidian/Controls/sectionHeader', '@Obsidian/Controls/rockForm', '@Obsidian/Controls/slidingDateRangePicker', '@Obsidian/Controls/numberBox', '@Obsidian/Controls/dropDownList', '@Obsidian/Utility/numberUtils', '@Obsidian/Utility/guid', '@Obsidian/Utility/url'], (function (exports) {
    'use strict';
    var __awaiter, useInvokeBlockAction, useConfigurationValues, defineComponent, computed, reactive, ref, Alert, RockButton, Block, SectionHeader, RockForm, SlidingDateRangePicker, NumberBox, DropDownList, toDecimalPlaces, emptyGuid, syncRefsWithQueryParams;
    return {
        setters: [function (module) {
            __awaiter = module.__awaiter;
        }, function (module) {
            useInvokeBlockAction = module.useInvokeBlockAction;
            useConfigurationValues = module.useConfigurationValues;
        }, function (module) {
            defineComponent = module.defineComponent;
            computed = module.computed;
            reactive = module.reactive;
            ref = module.ref;
        }, function (module) {
            Alert = module["default"];
        }, function (module) {
            RockButton = module["default"];
        }, function (module) {
            Block = module["default"];
        }, function (module) {
            SectionHeader = module["default"];
        }, function (module) {
            RockForm = module["default"];
        }, function (module) {
            SlidingDateRangePicker = module["default"];
        }, function (module) {
            NumberBox = module["default"];
        }, function (module) {
            DropDownList = module["default"];
        }, function (module) {
            toDecimalPlaces = module.toDecimalPlaces;
        }, function (module) {
            emptyGuid = module.emptyGuid;
        }, function (module) {
            syncRefsWithQueryParams = module.syncRefsWithQueryParams;
        }],
        execute: (function () {

            const defaultSettings = {
                nodeWidth: 12,
                nodeVerticalSpacing: 12,
                nodeHorizontalSpacing: 200,
                chartHeight: 900
            };
            function round(num) {
                return toDecimalPlaces(num, 2);
            }
            const FlowNodeDiagramLevel = defineComponent({
                name: "FlowNodeDiagramLevel",
                props: {
                    levelData: {
                        type: Array,
                        required: true
                    },
                    levelNumber: {
                        type: Number,
                        required: true
                    }
                },
                events: {
                    showTooltip: (_html, _e) => true
                },
                setup(props, { emit }) {
                    const visibleNodes = computed(() => {
                        return props.levelData.filter(node => node.height > 0);
                    });
                    function flowPoints({ sourcePoint, targetPoint, thickness }) {
                        const oneThirdX = round((targetPoint.x - sourcePoint.x) / 3) + sourcePoint.x;
                        const twoThirdsX = round((targetPoint.x - sourcePoint.x) * 2 / 3) + sourcePoint.x;
                        const sourceBottom = sourcePoint.y + thickness;
                        const targetBottom = targetPoint.y + thickness;
                        const start = `M${sourcePoint.x} ${sourcePoint.y}`;
                        const curve1 = `C${oneThirdX} ${sourcePoint.y} ${twoThirdsX} ${targetPoint.y} ${targetPoint.x} ${targetPoint.y}`;
                        const vertical1 = `V${targetBottom}`;
                        const curve2 = `C${twoThirdsX} ${targetBottom} ${oneThirdX} ${sourceBottom} ${sourcePoint.x} ${sourceBottom}`;
                        const vertical2 = `V${sourcePoint.y}`;
                        const end = "Z";
                        return start + curve1 + vertical1 + curve2 + vertical2 + end;
                    }
                    function textTransform({ x, y }) {
                        return `rotate(-90, ${x - 6}, ${y})`;
                    }
                    function nodeClass(node) {
                        return `node node-${node.id} level-${props.levelNumber}`;
                    }
                    function flowClass(flow) {
                        return `edge node-${flow.sourceId} node-${flow.targetId} level-${props.levelNumber - 1}_${props.levelNumber}`;
                    }
                    function onHoverFlow(flow, e) {
                        emit("showTooltip", flow.tooltip, e);
                    }
                    function onHoverNode(node, e) {
                        emit("showTooltip", `<strong>${node.name}</strong><br>Total Steps Taken: ${node.totalUnits}`, e);
                    }
                    function onUnHover() {
                        emit("showTooltip");
                    }
                    return {
                        visibleNodes,
                        flowPoints,
                        textTransform,
                        nodeClass,
                        flowClass,
                        onHoverFlow,
                        onHoverNode,
                        onUnHover
                    };
                },
                template: `
<g v-if="levelNumber == 1">
    <text v-for="node in visibleNodes" key="node.id + 'text'" :x="node.x - 6" :y="node.y" :transform="textTransform(node)" dx="-3" font-size="12" text-anchor="end">
        {{ node.name }}
    </text>
</g>
<g v-if="levelNumber > 1">
    <template v-for="node in levelData" key="node.id + 'flows'">
        <path
            v-for="(flow, index) in node.inFlows"
            key="node.id + 'flow' + index"
            :d="flowPoints(flow)"
            fill="rgb(170, 170, 170, 0.6)"
            @mousemove="onHoverFlow(flow, $event)"
            @mouseout="onUnHover"
            :class="flowClass(flow)"
        ></path>
    </template>
</g>
<g>
    <rect
        v-for="node in levelData"
        key="node.id" :x="node.x"
        :y="node.y"
        :width="node.width"
        :height="node.height"
        :fill="node.color"
        :class="nodeClass(node)"
        @mousemove="onHoverNode(node, $event)"
        @mouseout="onUnHover"
    ></rect>
</g>
`
            });
            var FlowNodeDiagram = defineComponent({
                name: "FlowNodeDiagram",
                components: { FlowNodeDiagramLevel },
                props: {
                    flowNodes: {
                        type: Array,
                        default: () => []
                    },
                    flowEdges: {
                        type: Array,
                        default: () => []
                    },
                    settings: {
                        type: Object,
                        default: () => ({})
                    },
                    isLoading: {
                        type: Boolean,
                        default: false
                    }
                },
                setup(props) {
                    const settings = computed(() => {
                        const settings = Object.assign({}, defaultSettings);
                        Object.entries(props.settings).forEach(([key, value]) => {
                            if (value !== undefined && value !== null) {
                                settings[key] = value;
                            }
                        });
                        return settings;
                    });
                    const nodeCount = computed(() => props.flowNodes.length);
                    const levelsCount = computed(() => props.flowEdges.reduce((count, edge) => Math.max(count, edge.level), 0));
                    const chartWidth = computed(() => {
                        const calculated = 24 + (settings.value.nodeWidth * levelsCount.value) + (settings.value.nodeHorizontalSpacing * (levelsCount.value - 1));
                        return Math.max(calculated, 200);
                    });
                    const chartHeight = computed(() => nodeCount.value > 0 ? settings.value.chartHeight : 50);
                    const diagramData = computed(() => {
                        const orderedNodes = [...props.flowNodes].sort((nodeA, nodeB) => nodeA.order - nodeB.order);
                        if (levelsCount.value == 0) {
                            return [];
                        }
                        const data = [];
                        const { nodeWidth, nodeHorizontalSpacing, nodeVerticalSpacing, chartHeight } = settings.value;
                        const totalNodeVerticalGap = nodeVerticalSpacing * (nodeCount.value - 1);
                        let previousTotalUnits = 0;
                        let useableHeight = chartHeight - totalNodeVerticalGap - 50;
                        let previousX = 0;
                        let currentX = 24;
                        const flowPositionData = [[]];
                        for (let level = 1; level <= levelsCount.value; level++) {
                            flowPositionData.push([]);
                            const levelFlows = props.flowEdges.filter(flow => flow.level == level);
                            const totalLevelUnits = levelFlows.reduce((tot, { units }) => tot + units, 0);
                            if (level > 1) {
                                useableHeight = round(totalLevelUnits / previousTotalUnits * useableHeight);
                            }
                            let currentY = (chartHeight - (useableHeight + totalNodeVerticalGap)) / 2;
                            const levelNodes = orderedNodes.map(node => {
                                const nodeInFlows = levelFlows.filter(flow => flow.targetId == node.id).sort((flowA, flowB) => {
                                    const nodeOrderA = orderedNodes.findIndex(node => node.id == flowA.sourceId);
                                    const nodeOrderB = orderedNodes.findIndex(node => node.id == flowB.sourceId);
                                    return nodeOrderA - nodeOrderB;
                                });
                                const totalUnits = nodeInFlows.reduce((total, flow) => total + flow.units, 0);
                                const height = round(totalUnits / totalLevelUnits * useableHeight);
                                const nodeFlowPosition = {
                                    id: node.id,
                                    nextLeftY: currentY,
                                    nextRightY: currentY
                                };
                                flowPositionData[level].push(nodeFlowPosition);
                                const inFlows = nodeInFlows.map(flow => {
                                    const sourcePoint = { x: previousX + nodeWidth, y: 0 };
                                    const targetPoint = { x: currentX, y: nodeFlowPosition.nextLeftY };
                                    const thickness = round(flow.units / totalUnits * height);
                                    nodeFlowPosition.nextLeftY += thickness;
                                    if (level > 1) {
                                        const prevNodeFlowPosition = flowPositionData[level - 1].find(node => node.id == flow.sourceId);
                                        if (prevNodeFlowPosition) {
                                            sourcePoint.y = prevNodeFlowPosition.nextRightY;
                                            prevNodeFlowPosition.nextRightY += thickness;
                                        }
                                    }
                                    return Object.assign(Object.assign({}, flow), { sourcePoint,
                                        targetPoint,
                                        thickness });
                                });
                                const levelNode = Object.assign(Object.assign({}, node), { x: currentX, y: currentY, width: nodeWidth, height,
                                    totalUnits,
                                    inFlows });
                                currentY += height + (height > 0 ? nodeVerticalSpacing : 0);
                                return levelNode;
                            });
                            previousTotalUnits = totalLevelUnits;
                            previousX = currentX;
                            currentX += nodeWidth + nodeHorizontalSpacing;
                            data.push(levelNodes);
                        }
                        return data;
                    });
                    const tooltip = reactive({
                        isShown: false,
                        html: "",
                        x: 0,
                        y: 0,
                        side: "left"
                    });
                    function showTooltip(html, e) {
                        if (html && e) {
                            tooltip.isShown = true;
                            tooltip.html = html;
                            tooltip.x = e.offsetX + 15;
                            tooltip.y = e.offsetY + 15;
                            if (e.clientX + 250 > document.documentElement.clientWidth) {
                                tooltip.x = 0;
                                tooltip.side = "right";
                            }
                            else {
                                tooltip.side = "left";
                            }
                        }
                        else {
                            tooltip.isShown = false;
                        }
                    }
                    return {
                        settings,
                        nodeCount,
                        levelsCount,
                        chartWidth,
                        chartHeight,
                        diagramData,
                        tooltip,
                        showTooltip
                    };
                },
                template: `
<v-style>
.flow-node-diagram-container {
    position: relative;
    width: max-content;
    max-width: 100%;
    margin: 0 auto;
}

.flow-node-diagram-container .flow-tooltip {
    position: absolute;
    background: #fff;
    {{ tooltip.side }}: {{ tooltip.x }}px;
    top: {{ tooltip.y }}px;
    max-width: 260px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
}

.flow-node-diagram-container svg {
    width: {{ chartWidth }}px;
    max-width: 100%;
    height: auto;
    min-height: 50px;
}

.flow-node-diagram-container .loadingContainer {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,.75);
}

.flow-node-diagram-container .loadingContainer h3 {
    margin: 0;
}

.flow-node-diagram-container .fade-enter-from,
.flow-node-diagram-container .fade-leave-to {
    opacity: 0;
}

.flow-node-diagram-container .fade-enter-active,
.flow-node-diagram-container .fade-leave-active {
    transition: opacity .2s ease-in-out;
}

.step-flow-svg .edge:hover {
    fill: rgba(170, 170, 170, 0.8);
}
</v-style>

<div class="flow-node-diagram-container">
    <div class="flow-tooltip" v-html="tooltip.html" v-if="tooltip.isShown" />

    <svg class="step-flow-svg mx-auto" :width="chartWidth" :height="chartHeight" :viewBox="'0 0 ' + chartWidth + ' ' + chartHeight">
        <FlowNodeDiagramLevel
            v-for="(level, levelNum) in diagramData"
            :key="'level' + levelNum"
            :levelData="level"
            :levelNumber="levelNum + 1"
            @showTooltip="showTooltip"
        />
    </svg>

    <transition name="fade" appear>
        <div v-if="isLoading" class="loadingContainer">
            <h3>Loading...</h3>
        </div>
    </transition>
</div>
`
            });

            var stepFlow = exports('default', defineComponent({
                name: "Steps.StepFlow",
                components: {
                    Block,
                    Alert,
                    RockButton,
                    SectionHeader,
                    RockForm,
                    SlidingDateRangePicker,
                    NumberBox,
                    DropDownList,
                    FlowNodeDiagram,
                },
                setup() {
                    var _a;
                    const invokeBlockAction = useInvokeBlockAction();
                    const configurationValues = useConfigurationValues();
                    const flowNodes = ref([]);
                    const flowEdges = ref([]);
                    const isLoading = ref(false);
                    const dateRange = ref(null);
                    const maxLevels = ref(4);
                    const campus = ref(emptyGuid);
                    syncRefsWithQueryParams({ dateRange, maxLevels, campus });
                    const campusOptions = ref([
                        {
                            value: emptyGuid,
                            text: "All Campuses",
                            category: null
                        },
                        ...((_a = configurationValues.campuses) !== null && _a !== void 0 ? _a : [])
                    ]);
                    const settings = ref({
                        nodeWidth: configurationValues.nodeWidth,
                        nodeVerticalSpacing: configurationValues.nodeVerticalSpacing,
                        nodeHorizontalSpacing: configurationValues.nodeHorizontalSpacing,
                        chartHeight: configurationValues.chartHeight
                    });
                    function fetchData() {
                        var _a, _b, _c, _d;
                        return __awaiter(this, void 0, void 0, function* () {
                            if (isLoading.value) {
                                return;
                            }
                            isLoading.value = true;
                            const startDateString = (((_a = dateRange.value) === null || _a === void 0 ? void 0 : _a.lowerDate) || "").replace(/-/g, "/");
                            const startDate = startDateString.length > 0 ? new Date(startDateString).toISOString() : undefined;
                            const endDateString = (((_b = dateRange.value) === null || _b === void 0 ? void 0 : _b.upperDate) || "").replace(/-/g, "/");
                            const endDate = endDateString.length > 0 ? new Date(endDateString).toISOString() : undefined;
                            const dateRangeParam = dateRange.value ? Object.assign({}, (dateRange.value)) : { rangeType: -1 };
                            dateRangeParam.lowerDate = startDate;
                            dateRangeParam.upperDate = endDate;
                            const response = yield invokeBlockAction("GetData", {
                                dateRange: dateRangeParam,
                                maxLevels: maxLevels.value,
                                campus: campus.value,
                            });
                            isLoading.value = false;
                            if (response.data) {
                                flowEdges.value = (_c = response.data.edges) !== null && _c !== void 0 ? _c : [];
                                flowNodes.value = (_d = response.data.nodes) !== null && _d !== void 0 ? _d : [];
                            }
                            else {
                                throw new Error(response.errorMessage || "An error occurred");
                            }
                        });
                    }
                    fetchData();
                    return {
                        flowNodes,
                        flowEdges,
                        isLoading,
                        dateRange,
                        maxLevels,
                        campus,
                        campusOptions,
                        settings,
                        configurationValues,
                        fetchData
                    };
                },
                template: `
<Block title="Step Flow">
    <template v-if="configurationValues.programName" #default>
        <SectionHeader :title="configurationValues.programName + ' Path Flow'" :description="'The flow below shows how individuals move through the ' + configurationValues.stepTypeCount + ' step types in the ' + configurationValues.programName + ' Path program. You can filter the steps shown by date range or the number of levels to limit&nbsp;to.'" />

        <RockForm @submit="fetchData">
            <div class="row form-row d-flex align-items-start flex-wrap">
                <div class="col-xs-12 col-lg-3">
                    <SlidingDateRangePicker v-model="dateRange" formGroupClasses="" label="Step Completion Date Range" help="Limit steps to those that have been completed in the provided date range." />
                </div>
                <NumberBox v-model="maxLevels" :decimalCount="0" :minimumValue="2" rules="required" formGroupClasses="col" label="Max Levels to Display" help="The maximum number of levels to show in the flow. It's possible that an individual could take the same level twice in the course of completing a step program." />
                <DropDownList v-model="campus" formGroupClasses="col" label="Campus" :items="campusOptions" :showBlankItem="false" />
                <div class="col flex-grow-0">
                    <div class="form-group">
                        <label class="control-label">&nbsp;</label>
                        <RockButton class="btn-square" type="submit" :disabled="isLoading"><i class="fa fa-refresh" :class="{'fa-spin': isLoading}"></i></RockButton>
                    </div>
                </div>
            </div>
        </RockForm>

        <FlowNodeDiagram :flowNodes="flowNodes" :flowEdges="flowEdges" :isLoading="isLoading" :settings="settings" />
    </template>

    <template v-else #default>
        <Alert alert-type="warning">No Step Program ID Provided</Alert>
    </template>
</Block>`
            }));

        })
    };
}));
