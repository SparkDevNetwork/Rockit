System.register([], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var currentModalCount;
    var __moduleName = context_1 && context_1.id;
    function smoothScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    exports_1("smoothScrollToTop", smoothScrollToTop);
    function trackModalState(state) {
        const body = document.body;
        const cssClasses = ["modal-open"];
        if (state) {
            currentModalCount++;
        }
        else {
            currentModalCount = currentModalCount > 0 ? currentModalCount - 1 : 0;
        }
        if (currentModalCount > 0) {
            for (const cssClass of cssClasses) {
                body.classList.add(cssClass);
            }
        }
        else {
            for (const cssClass of cssClasses) {
                body.classList.remove(cssClass);
            }
        }
    }
    exports_1("trackModalState", trackModalState);
    function loadJavaScriptAsync(source, isScriptLoaded, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isScriptLoaded) {
                if (isScriptLoaded()) {
                    return true;
                }
            }
            else {
                const scripts = Array.from(document.getElementsByTagName("script"));
                if (scripts.filter(s => s.src === source).length > 0) {
                    return true;
                }
            }
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = source;
            if (attributes) {
                for (const key in attributes) {
                    script.setAttribute(key, attributes[key]);
                }
            }
            try {
                yield new Promise((resolve, reject) => {
                    script.addEventListener("load", () => resolve());
                    script.addEventListener("error", () => reject());
                    document.getElementsByTagName("head")[0].appendChild(script);
                });
                if (isScriptLoaded) {
                    return isScriptLoaded();
                }
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    exports_1("loadJavaScriptAsync", loadJavaScriptAsync);
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                smoothScrollToTop
            });
            currentModalCount = 0;
        }
    };
});
//# sourceMappingURL=page.js.map