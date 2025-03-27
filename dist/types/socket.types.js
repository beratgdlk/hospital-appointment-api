"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStatus = void 0;
// Patient call statuses
var CallStatus;
(function (CallStatus) {
    CallStatus["WAITING"] = "waiting";
    CallStatus["CALLED"] = "called";
    CallStatus["COMPLETED"] = "completed";
    CallStatus["MISSED"] = "missed";
})(CallStatus || (exports.CallStatus = CallStatus = {}));
