import debug from 'debug';

const sDebug = debug('socket');

class SocketManager{
    constructor() {
        this.callbackForMessage = this.callbackForMessage.bind(this);
    }

    callbackForMessage(message) {
        sDebug(`Received message : ${message}`);
    }

    connectToApplication(applicationView) {
        sDebug('Connecting to application');
        this.applicationView = applicationView;
        sDebug('Creating socket connection');
        this.socket = io();
        sDebug('Waiting for messages');
        this.socket.on('message',this.callbackForMessage);
    }

    sendMessage(message) {
        this.socket.emit('message',message);
    }
}

let socketManager = new SocketManager();
export default socketManager;