System.register(['vue', '@Obsidian/Controls/alert', '@Obsidian/Controls/entityTagList', '@Obsidian/Utility/block', '@Obsidian/Utility/tooltip', '@Obsidian/Utility/popover'], (function (exports) {
   'use strict';
   var defineComponent, ref, computed, nextTick, Alert, EntityTagList, useConfigurationValues, tooltip, popover;
   return {
      setters: [function (module) {
         defineComponent = module.defineComponent;
         ref = module.ref;
         computed = module.computed;
         nextTick = module.nextTick;
      }, function (module) {
         Alert = module["default"];
      }, function (module) {
         EntityTagList = module["default"];
      }, function (module) {
         useConfigurationValues = module.useConfigurationValues;
      }, function (module) {
         tooltip = module.tooltip;
      }, function (module) {
         popover = module.popover;
      }],
      execute: (function () {

         var badges = exports('default', defineComponent({
             name: "Crm.PersonDetail.Badges",
             components: {
                 Alert,
                 EntityTagList
             },
             setup() {
                 var _a, _b, _c, _d, _e;
                 const config = useConfigurationValues();
                 const containerRef = ref(null);
                 const topLeftBadges = computed(() => {
                     var _a, _b;
                     return (_b = (_a = config.topLeftBadges) === null || _a === void 0 ? void 0 : _a.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; }).join("")) !== null && _b !== void 0 ? _b : "";
                 });
                 const topMiddleBadges = computed(() => {
                     var _a, _b;
                     return (_b = (_a = config.topMiddleBadges) === null || _a === void 0 ? void 0 : _a.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; }).join("")) !== null && _b !== void 0 ? _b : "";
                 });
                 const topRightBadges = computed(() => {
                     var _a, _b;
                     return (_b = (_a = config.topRightBadges) === null || _a === void 0 ? void 0 : _a.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; }).join("")) !== null && _b !== void 0 ? _b : "";
                 });
                 const bottomLeftBadges = computed(() => {
                     var _a, _b;
                     return (_b = (_a = config.bottomLeftBadges) === null || _a === void 0 ? void 0 : _a.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; }).join("")) !== null && _b !== void 0 ? _b : "";
                 });
                 const bottomRightBadges = computed(() => {
                     var _a, _b;
                     return (_b = (_a = config.bottomRightBadges) === null || _a === void 0 ? void 0 : _a.map(b => { var _a; return (_a = b.html) !== null && _a !== void 0 ? _a : ""; }).join("")) !== null && _b !== void 0 ? _b : "";
                 });
                 const script = [
                     ...(_a = config.topLeftBadges) !== null && _a !== void 0 ? _a : [],
                     ...(_b = config.topMiddleBadges) !== null && _b !== void 0 ? _b : [],
                     ...(_c = config.topRightBadges) !== null && _c !== void 0 ? _c : [],
                     ...(_d = config.bottomLeftBadges) !== null && _d !== void 0 ? _d : [],
                     ...(_e = config.bottomRightBadges) !== null && _e !== void 0 ? _e : []
                 ]
                     .map(b => { var _a; return (_a = b.javaScript) !== null && _a !== void 0 ? _a : ""; }).join("");
                 if (script !== "") {
                     console.log("script", script);
                     nextTick(() => {
                         const scriptNode = document.createElement("script");
                         scriptNode.type = "text/javascript";
                         scriptNode.appendChild(document.createTextNode(script));
                         document.body.appendChild(scriptNode);
                     });
                 }
                 nextTick(() => {
                     if (!containerRef.value) {
                         return;
                     }
                     tooltip(Array.from(containerRef.value.querySelectorAll(".rockbadge[data-toggle=\"tooltip\"]")));
                     popover(Array.from(containerRef.value.querySelectorAll(".rockbadge[data-toggle=\"popover\"]")));
                 });
                 return {
                     bottomLeftBadges,
                     bottomRightBadges,
                     containerRef,
                     entityKey: config.personKey,
                     entityTypeGuid: "72657ED8-D16E-492E-AC12-144C5E7567E7",
                     lazyMode: "eager",
                     topLeftBadges,
                     topMiddleBadges,
                     topRightBadges
                 };
             },
             template: `
<div ref="containerRef" class="card card-badges">
    <div class="card-badge-top">
        <div class="rockbadge-container" v-html="topLeftBadges"></div>

        <div class="rockbadge-container" v-html="topMiddleBadges"></div>

        <div class="rockbadge-container" v-html="topRightBadges"></div>
    </div>

    <div class="card-badge-bottom">
        <div class="rockbadge-container rockbadge-container-xs" v-html="bottomLeftBadges"></div>

        <div class="rockbadge-container rockbadge-container-xs">
            <EntityTagList :entityTypeGuid="entityTypeGuid"
                :entityKey="entityKey"
                :lazyMode="lazyMode" />
         </div>

        <div class="rockbadge-container rockbadge-container-xs" v-html="bottomRightBadges"></div>
   </div>
</div>
`
         }));

      })
   };
}));
