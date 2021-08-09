export default interface SocketListener {
    handleDataChangedByAnotherUser(message:string):void;

    handleMessage(message:string):void;

    getCurrentUser():bigint;
}

