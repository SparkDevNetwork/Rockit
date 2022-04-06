System.register(["../Util/http"], function (exports_1, context_1) {
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
    var http_1, CategoryTreeItemProvider;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            CategoryTreeItemProvider = class CategoryTreeItemProvider {
                getItems(parentGuid) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const options = {
                            parentGuid: parentGuid,
                            entityTypeGuid: this.entityTypeGuid,
                            entityTypeQualifierColumn: this.entityTypeQualifierColumn,
                            entityTypeQualifierValue: this.entityTypeQualifierValue,
                            lazyLoad: false
                        };
                        const response = yield http_1.post("/api/v2/Controls/CategoryPicker/childTreeItems", {}, options);
                        if (response.isSuccess && response.data) {
                            return response.data;
                        }
                        else {
                            console.log("Error", response.errorMessage);
                            return [];
                        }
                    });
                }
                getRootItems() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield this.getItems(this.rootCategoryGuid);
                    });
                }
                getChildItems(item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return this.getItems(item.value);
                    });
                }
            };
            exports_1("CategoryTreeItemProvider", CategoryTreeItemProvider);
        }
    };
});
//# sourceMappingURL=treeItemProviders.js.map