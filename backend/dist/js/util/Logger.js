"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_1 = __importDefault(require("fs"));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getLogFile = function () {
        if (Logger.logFile === null) {
            Logger.logFile = fs_1.default.createWriteStream(__dirname + '/../log/server.log', { flags: 'w' });
        }
        return Logger.logFile;
    };
    Logger.log = function (message, debugDepth) {
        if (debugDepth === void 0) { debugDepth = 5; }
        if ((message === null) || (message === undefined))
            return;
        if (!this.debugOn)
            return;
        if (debugDepth > this.debugDepth)
            return;
        if (this.debugOn) {
            console.log(message);
            Logger.getLogFile().write(new Date().toString() + ":" + message + '\n');
        }
    };
    Logger.setLevel = function (newLevel) {
        Logger.debugDepth = newLevel;
    };
    Logger.setOn = function () {
        Logger.debugOn = true;
    };
    Logger.setOff = function () {
        Logger.debugOn = false;
    };
    Logger.debugOn = true;
    Logger.debugDepth = 1000;
    return Logger;
}());
module.exports = { Logger: Logger };
module.exports = Logger;
//# sourceMappingURL=Logger.js.map