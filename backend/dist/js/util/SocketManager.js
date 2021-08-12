"use strict";
var debug = require("debug");
var socket_io_1 = require("socket.io");
var socketDebug = debug('socket');
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        this.io = null;
    }
    SocketManager.prototype.connectToServer = function (httpServer) {
        socketDebug('Connecting up to the HTTP server');
        this.io = new socket_io_1.Server(httpServer);
    };
    SocketManager.prototype.listen = function () {
        var _this = this;
        socketDebug('starting to listen for connections');
        if (this.io)
            this.io.on('connection', function (socket) {
                socketDebug('Sockets: a user connected');
                socket.on('disconnect', function () {
                    socketDebug('Sockets: user disconnected');
                });
                socket.on('message', function (msg) {
                    socketDebug("Sockets: Received message " + msg);
                    if (_this.io)
                        _this.io.emit('message', msg);
                    socketDebug("Sockets: Sending message " + msg);
                });
            });
    };
    SocketManager.prototype.sendMessage = function (message) {
        socketDebug("Sending data " + message);
        if (this.io)
            this.io.emit('data', JSON.stringify(message));
    };
    return SocketManager;
}());
var socketManager = new SocketManager();
module.exports = socketManager;
//# sourceMappingURL=SocketManager.js.map