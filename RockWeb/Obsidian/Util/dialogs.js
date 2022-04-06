System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function alert(message) {
        return new Promise(resolve => {
            bootbox.dialog({
                message,
                buttons: {
                    ok: {
                        label: "OK",
                        className: "btn-primary",
                        callback: () => resolve()
                    }
                }
            });
        });
    }
    exports_1("alert", alert);
    function confirm(message) {
        return new Promise(resolve => {
            bootbox.dialog({
                message,
                buttons: {
                    ok: {
                        label: "OK",
                        className: "btn-primary",
                        callback: function () {
                            resolve(true);
                        }
                    },
                    cancel: {
                        label: "Cancel",
                        className: "btn-default",
                        callback: function () {
                            resolve(false);
                        }
                    }
                }
            });
        });
    }
    exports_1("confirm", confirm);
    function confirmDelete(typeName, additionalMessage) {
        let message = `Are you sure you want to delete this ${typeName}?`;
        if (additionalMessage) {
            message += ` ${additionalMessage}`;
        }
        return confirm(message);
    }
    exports_1("confirmDelete", confirmDelete);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dialogs.js.map