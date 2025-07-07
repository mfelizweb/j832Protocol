export var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["CREATE"] = 0] = "CREATE";
    ChangeType[ChangeType["UPDATE"] = 1] = "UPDATE";
    ChangeType[ChangeType["DELETE"] = 2] = "DELETE";
    ChangeType[ChangeType["TRANSFER"] = 3] = "TRANSFER";
    ChangeType[ChangeType["AUDIT"] = 4] = "AUDIT";
})(ChangeType || (ChangeType = {}));
