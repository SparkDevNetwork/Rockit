System.register(['@Obsidian/Utility/page', '@Obsidian/Utility/guid'], (function (exports) {
    'use strict';
    var loadJavaScriptAsync, newGuid;
    return {
        setters: [function (module) {
            loadJavaScriptAsync = module.loadJavaScriptAsync;
        }, function (module) {
            newGuid = module.newGuid;
        }],
        execute: (function () {

            exports('useDragReorder', useDragReorder);

            const dragulaScriptPromise = loadJavaScriptAsync("/Scripts/dragula.min.js", () => window.dragula !== undefined);
            class DragDropService {
                constructor(identifier) {
                    this.sourceContainers = [];
                    this.targetContainers = [];
                    this.id = identifier;
                    this.options = {
                        accepts: this.drakeAccepts.bind(this),
                        copy: this.drakeCopy.bind(this),
                        moves: this.drakeMoves.bind(this),
                        revertOnSpill: true
                    };
                    this.drake = window.dragula([], this.options);
                    this.drake.on("drag", this.drakeEventDrag.bind(this));
                    this.drake.on("drop", this.drakeEventDrop.bind(this));
                    this.drake.on("over", this.drakeEventOver.bind(this));
                    this.drake.on("out", this.drakeEventOut.bind(this));
                    this.drake.on("cancel", this.drakeEventCancel.bind(this));
                    this.drake.on("dragend", this.drakeEventEnd.bind(this));
                    this.drake.on("shadow", this.drakeEventShadow.bind(this));
                }
                isFinished() {
                    return this.sourceContainers.length === 0 && this.targetContainers.length === 0;
                }
                destroy() {
                    this.drake.destroy();
                }
                addSourceContainer(container, options) {
                    const containerIndex = this.sourceContainers.findIndex(c => c.element === container);
                    if (containerIndex === -1) {
                        this.sourceContainers.push({
                            element: container,
                            options: options
                        });
                    }
                    this.updateDrakeContainers();
                }
                addTargetContainer(container, options) {
                    const containerIndex = this.targetContainers.findIndex(c => c.element === container);
                    if (containerIndex === -1) {
                        this.targetContainers.push({
                            element: container,
                            options: options
                        });
                    }
                    this.updateDrakeContainers();
                }
                removeSourceContainer(container) {
                    const containerIndex = this.sourceContainers.findIndex(c => c.element === container);
                    if (containerIndex !== -1) {
                        this.sourceContainers.splice(containerIndex, 1);
                    }
                    this.updateDrakeContainers();
                }
                removeTargetContainer(container) {
                    const containerIndex = this.targetContainers.findIndex(c => c.element === container);
                    if (containerIndex !== -1) {
                        this.targetContainers.splice(containerIndex, 1);
                    }
                    this.updateDrakeContainers();
                }
                updateDrakeContainers() {
                    this.drake.containers = this.sourceContainers.map(c => c.element)
                        .concat(...this.targetContainers.map(c => c.element));
                }
                drakeCopy(el, container) {
                    var _a;
                    const elementOptions = this.sourceContainers.find(c => c.element === container);
                    if ((elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.options.copyElement) !== undefined) {
                        if (typeof elementOptions.options.copyElement === "function") {
                            const sourceIndex = Array.from(container.children).indexOf(el);
                            return elementOptions.options.copyElement({
                                element: el,
                                sourceContainer: container,
                                sourceIndex: sourceIndex,
                                sourceSibling: (_a = el.nextElementSibling) !== null && _a !== void 0 ? _a : undefined
                            });
                        }
                        else {
                            return elementOptions.options.copyElement;
                        }
                    }
                    return false;
                }
                drakeMoves(el, container, handle, sibling) {
                    if (!el || !container || !handle) {
                        return false;
                    }
                    const elementOptions = this.sourceContainers.find(c => c.element === container);
                    if (!elementOptions) {
                        return false;
                    }
                    this.options.mirrorContainer = elementOptions.options.mirrorContainer || container;
                    if (elementOptions.options.startDrag) {
                        const sourceIndex = Array.from(container.children).indexOf(el);
                        return elementOptions.options.startDrag({
                            element: el,
                            sourceContainer: container,
                            sourceIndex,
                            sourceSibling: sibling !== null && sibling !== void 0 ? sibling : undefined
                        }, handle);
                    }
                    if (elementOptions.options.handleSelector) {
                        return Array.from(container.querySelectorAll(elementOptions.options.handleSelector))
                            .some(n => n.contains(handle));
                    }
                    return true;
                }
                drakeAccepts(el, target, source, sibling) {
                    if (!el || !source || !target) {
                        return false;
                    }
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    const targetOptions = this.targetContainers.find(c => c.element === target);
                    if (!sourceOptions || !targetOptions || !this.internalOperation) {
                        return false;
                    }
                    const realSibling = sibling && sibling.classList.contains("gu-transit") ? sibling.nextElementSibling : sibling;
                    const targetIndex = realSibling ? Array.from(target.children).indexOf(realSibling) - 1 : target.children.length - 1;
                    if (sourceOptions.options.acceptDrop !== undefined) {
                        return sourceOptions.options.acceptDrop(Object.assign(Object.assign({}, this.internalOperation), { targetContainer: target, targetIndex, targetSibling: realSibling !== null && realSibling !== void 0 ? realSibling : undefined }));
                    }
                    return true;
                }
                drakeEventDrag(el, source) {
                    var _a;
                    const sourceIndex = Array.from(source.children).indexOf(el);
                    this.internalOperation = {
                        element: el,
                        sourceContainer: source,
                        sourceIndex,
                        sourceSibling: (_a = el.nextElementSibling) !== null && _a !== void 0 ? _a : undefined
                    };
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    if (!sourceOptions) {
                        return;
                    }
                    if (sourceOptions.options.dragBegin) {
                        sourceOptions.options.dragBegin(Object.assign({}, this.internalOperation));
                    }
                }
                drakeEventDrop(el, target, source, sibling) {
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    const targetOptions = this.targetContainers.find(c => c.element === target);
                    if (!sourceOptions || !targetOptions || !this.internalOperation) {
                        return;
                    }
                    const targetIndex = Array.from(target.children).indexOf(el);
                    if (sourceOptions.options.dragDrop) {
                        sourceOptions.options.dragDrop(Object.assign(Object.assign({}, this.internalOperation), { element: el, targetContainer: target, targetIndex, targetSibling: sibling !== null && sibling !== void 0 ? sibling : undefined }));
                    }
                }
                drakeEventCancel(el, lastContainer, source) {
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    if (!sourceOptions || !this.internalOperation) {
                        return;
                    }
                    if (sourceOptions.options.dragCancel) {
                        sourceOptions.options.dragCancel(Object.assign({}, this.internalOperation));
                    }
                }
                drakeEventOver(el, target, source) {
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    const targetOptions = this.targetContainers.find(c => c.element === target);
                    if (!sourceOptions || !targetOptions || !this.internalOperation) {
                        return;
                    }
                    if (sourceOptions.options.dragOver) {
                        sourceOptions.options.dragOver(Object.assign(Object.assign({}, this.internalOperation), { targetContainer: target }));
                    }
                }
                drakeEventOut(el, target, source) {
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    const targetOptions = this.targetContainers.find(c => c.element === target);
                    if (!sourceOptions || !targetOptions || !this.internalOperation) {
                        return;
                    }
                    if (sourceOptions.options.dragOut) {
                        sourceOptions.options.dragOut(Object.assign(Object.assign({}, this.internalOperation), { targetContainer: target }));
                    }
                }
                drakeEventEnd(el) {
                    const sourceOptions = this.sourceContainers.find(c => { var _a; return c.element === ((_a = this.internalOperation) === null || _a === void 0 ? void 0 : _a.sourceContainer); });
                    if (!sourceOptions || !this.internalOperation || this.internalOperation.element !== el) {
                        return;
                    }
                    if (sourceOptions.options.dragEnd) {
                        sourceOptions.options.dragEnd(Object.assign({}, this.internalOperation));
                    }
                }
                drakeEventShadow(el, target, source) {
                    const sourceOptions = this.sourceContainers.find(c => c.element === source);
                    const targetOptions = this.targetContainers.find(c => c.element === target);
                    if (!sourceOptions || !targetOptions || !this.internalOperation) {
                        return;
                    }
                    if (sourceOptions.options.dragShadow) {
                        sourceOptions.options.dragShadow(Object.assign(Object.assign({}, this.internalOperation), { shadow: el }));
                    }
                }
            }
            const knownServices = {};
            function getExistingDragDropService(identifier) {
                return knownServices[identifier];
            }
            function getDragDropService(identifier) {
                if (knownServices[identifier]) {
                    return knownServices[identifier];
                }
                const service = new DragDropService(identifier);
                knownServices[identifier] = service;
                return service;
            }
            function destroyService(service) {
                service.destroy();
                delete knownServices[service.id];
            }
            function getTargetOptions(value) {
                if (!value) {
                    return null;
                }
                if (typeof value === "string") {
                    return {
                        id: value
                    };
                }
                else if (typeof value === "object" && value.id) {
                    return value;
                }
                else {
                    return null;
                }
            }
            const DragSource = exports('DragSource', {
                mounted(element, binding) {
                    if (!binding.value || !binding.value.id) {
                        console.error("DragSource must have a valid identifier.");
                        return;
                    }
                    dragulaScriptPromise.then(() => {
                        const service = getDragDropService(binding.value.id);
                        service.addSourceContainer(element, binding.value);
                    });
                },
                unmounted(element, binding) {
                    if (!binding.value || !binding.value.id) {
                        return;
                    }
                    const service = getExistingDragDropService(binding.value.id);
                    if (service) {
                        service.removeSourceContainer(element);
                        if (service.isFinished()) {
                            destroyService(service);
                        }
                    }
                }
            });
            const DragTarget = exports('DragTarget', {
                mounted(element, binding) {
                    const options = getTargetOptions(binding.value);
                    if (!options) {
                        console.error("DragTarget must have a valid identifier.");
                        return;
                    }
                    dragulaScriptPromise.then(() => {
                        if (options) {
                            const service = getDragDropService(options.id);
                            service.addTargetContainer(element, options);
                        }
                    });
                },
                unmounted(element, binding) {
                    const options = getTargetOptions(binding.value);
                    if (!options) {
                        return;
                    }
                    const service = getExistingDragDropService(options.id);
                    if (service) {
                        service.removeTargetContainer(element);
                        if (service.isFinished()) {
                            destroyService(service);
                        }
                    }
                }
            });
            const DragReorder = exports('DragReorder', {
                mounted(element, binding) {
                    if (!binding.value || !binding.value.id) {
                        console.error("DragReorder must have a valid identifier.");
                        return;
                    }
                    dragulaScriptPromise.then(() => {
                        const service = getDragDropService(binding.value.id);
                        service.addSourceContainer(element, binding.value);
                        service.addTargetContainer(element, binding.value);
                    });
                },
                unmounted(element, binding) {
                    if (!binding.value || !binding.value.id) {
                        return;
                    }
                    const service = getExistingDragDropService(binding.value.id);
                    if (service) {
                        service.removeTargetContainer(element);
                        service.removeSourceContainer(element);
                        if (service.isFinished()) {
                            destroyService(service);
                        }
                    }
                }
            });
            function useDragReorder(values, reorder) {
                return {
                    id: newGuid(),
                    copyElement: false,
                    handleSelector: ".reorder-handle",
                    dragDrop(operation) {
                        if (operation.targetIndex === undefined || operation.sourceIndex === operation.targetIndex) {
                            return;
                        }
                        if (!values.value || operation.sourceIndex >= values.value.length) {
                            return;
                        }
                        const targetIndex = operation.sourceIndex > operation.targetIndex
                            ? operation.targetIndex
                            : operation.targetIndex + 1;
                        const value = values.value[operation.sourceIndex];
                        const beforeValue = targetIndex < values.value.length ? values.value[targetIndex] : null;
                        values.value.splice(operation.sourceIndex, 1);
                        values.value.splice(operation.targetIndex, 0, value);
                        if (reorder) {
                            reorder(value, beforeValue);
                        }
                    }
                };
            }

        })
    };
}));
