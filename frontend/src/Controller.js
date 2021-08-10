import debug from 'debug';
import downloader from "./network/DownloadManager.ts";
import stateManager from "./state/StateManagementUtil.js";
import isSame from "./util/EqualityFunctions";
import notifier from "./notification/NotificationManager";
import SocketListener from "./socket/SocketListener";
import socketManager from "./socket/SocketManager";

const cLogger = debug('controller');

class Controller extends SocketListener{
    constructor() {
        super();
    }


    connectToApplication(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        this.config = this.applicationView.state;

        // setup Async callbacks for the fetch requests
        this.callbackForUsers = this.callbackForUsers.bind(this);
        this.callbackForEntries = this.callbackForEntries.bind(this);
        this.callbackForCreateEntry = this.callbackForCreateEntry.bind(this);
        this.callbackForCreateComment = this.callbackForCreateComment.bind(this);

        // state listener
        this.stateChangeListener = this.stateChangeListener.bind(this);

        stateManager.addChangeListenerForName(this.config.stateNames.entries, this.stateChangeListener);

        return this;
    }

    stateChangeListener(name, value) {
        cLogger(`State changes ${name}`);
        cLogger(value);
        this.applicationView.setState({
            isLoggedIn: this.isLoggedIn(),
            loggedInUserId: this.getLoggedInUserId(),
            selectedEntry: {},
            entries: value
        });
    }

    /*
    *
    * Call back functions for database operations
    *
     */
    callbackForUsers(data, status) {
        cLogger('callback for all users');
        let users = [];
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            users = data;
        }
        stateManager.setStateByName(this.config.stateNames.users, users);
    }

    callbackForEntries(data, status) {
        cLogger('callback for all entries');
        let entries = [];
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            entries = data;
        }
        stateManager.setStateByName(this.config.stateNames.entries, entries);
    }

    callbackForCreateEntry(data, status) {
        cLogger('callback for create entry');
        let entry = null;
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            entry = data;
        }
        stateManager.addNewItemToState(this.config.stateNames.entries, entry);
    }

    callbackForCreateComment(data, status) {
        cLogger('callback for create comment');
        let comment = null;
        if (status >= 200 && status <= 299) { // do we have any data?
            comment = data;
            cLogger(comment);
            // find the corresponding entry in state
            let entry = stateManager.findItemInState(this.config.stateNames.entries, {id: comment.commentOn}, isSame);
            cLogger(entry);
            if (entry) {
                cLogger('callback for create comment - updating entry');
                // update the entry with the new comment
                entry.Comments.push(comment);
                // update the entry in the state manager
                stateManager.updateItemInState(this.config.stateNames.entries, entry, isSame);
                // reselect the same entry
                stateManager.setStateByName(this.config.stateNames.selectedEntry, entry);
                cLogger(entry);
            }
        }

    }

    /*
    *
    *   API calls
    *
     */

    getAllUsers() {
        cLogger('Getting All Users');
        const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.users,
            type: 'GET',
            params: {},
            callback: this.callbackForUsers,
        };
        downloader.addApiRequest(jsonRequest, true);
    }

    getAllEntries() {
        cLogger('Getting All Entries');
        const jsonRequest = {
            url: this.getServerAPIURL() + this.config.apis.entries,
            type: 'GET',
            params: {},
            callback: this.callbackForEntries,
        };
        downloader.addApiRequest(jsonRequest, true);
    }

    apiDeleteComment(id) {
        const deleteCommentCB = function (data, status) {
            cLogger('callback for delete comment');
            if (status >= 200 && status <= 299) { // do we have any data?
                cLogger(data);
            }
        }

        if (id) {
            const jsonRequest = {
                url: this.getServerAPIURL() + this.config.apis.comment,
                type: 'DELETE',
                params: {
                    id: id
                },
                callback: deleteCommentCB,
            };
            downloader.addApiRequest(jsonRequest);
        }
    }

    apiDeleteEntry(entry) {
        const deleteCB = function (data, status) {
            cLogger('callback for delete entry');
            if (status >= 200 && status <= 299) { // do we have any data?
                cLogger(data);
            }
        }

        if (entry) {
            const jsonRequest = {
                url: this.getServerAPIURL() + this.config.apis.entries,
                type: 'DELETE',
                params: {
                    id: entry.id
                },
                callback: deleteCB,
            };
            downloader.addApiRequest(jsonRequest);
        }
    }

    apiCreateEntry(entry) {
        if (entry) {
            const jsonRequest = {
                url: this.getServerAPIURL() + this.config.apis.entries,
                type: 'POST',
                params: entry,
                callback: this.callbackForCreateEntry,
            };
            downloader.addApiRequest(jsonRequest, true);
        }
    }

    apiCreateComment(comment) {
        if (comment) {
            const jsonRequest = {
                url: this.getServerAPIURL() + this.config.apis.comment,
                type: 'POST',
                params: comment,
                callback: this.callbackForCreateComment,
            };
            downloader.addApiRequest(jsonRequest, true);
        }
    }

    apiUpdateEntry(entry) {
        const updateCB = function (data, status) {
            cLogger('callback for update entry');
            if (status >= 200 && status <= 299) { // do we have any data?
                cLogger(data);
            }
        }

        if (entry) {
            const jsonRequest = {
                url: this.getServerAPIURL() + this.config.apis.entries,
                type: 'PUT',
                params: entry,
                callback: updateCB,
            };
            downloader.addApiRequest(jsonRequest);
        }
    }

    /*
    *
    * Simple Application state (URL, logged in user)
    *
     */
    getServerAPIURL() {
        let result = "/api";
        if ((window.ENV) && (window.ENV.serverURL)) {
            result = window.ENV.serverURL;
        }
        return result;
    }

    isLoggedIn() {
        let isLoggedIn = false;
        try {
            if (loggedInUserId) {
                isLoggedIn = true;
            }
        } catch (error) {
        }
        cLogger(`Are logged in: ${isLoggedIn}`);
        return isLoggedIn;
    }

    getLoggedInUserId() {
        let result = -1;
        try {
            if (loggedInUserId) {
                result = loggedInUserId;
            }
        } catch (error) {
        }
        cLogger(`Logged in user id: ${result}`);
        return result;
    }

    /*
      Get the base data for the application (users, entries)
     */
    initialise() {
        cLogger('Initialising data state');
        // listen for socket events
        socketManager.setListener(this);
        // load the users
        this.getAllUsers();
        // load the entries
        this.getAllEntries();
    }

    // Lets delete a comment
    deleteComment(id) {
        let entry = stateManager.getStateByName(this.config.stateNames.selectedEntry);
        if (entry) {
            cLogger(`Handling delete comment for ${entry.id} and comment ${id}`);
            // find the comment in the entry and remove it from the state
            let comments = entry.Comments;
            const foundIndex = comments.findIndex(element => element.id === id);
            if (foundIndex >= 0) {
                // remove comment from the array
                cLogger('Found comment in entry - removing');
                comments.splice(foundIndex, 1);
                cLogger(entry);
                // update the statement manager
                stateManager.setStateByName(this.config.stateNames.selectedEntry, entry);
                stateManager.updateItemInState(this.config.stateNames.entries, entry, isSame);
            }
        }
        this.apiDeleteComment(id);
    }

    deleteEntry(entry) {
        if (entry) {
            cLogger(`Handling delete entry for ${entry.id}`);
            // update the state manager
            stateManager.removeItemFromState(this.config.stateNames.entries, entry, isSame);
            // initiate a call to remove from the database
            this.apiDeleteEntry(entry);
        }
    }

    updateEntry(entry) {
        if (entry) {
            cLogger(entry);
            if (entry.id) {
                cLogger(`Handling update for entry ${entry.id}`);
                // update the state manager
                stateManager.updateItemInState(this.config.stateNames.entries, entry, isSame);
                // update the database
                this.apiUpdateEntry(entry);
            } else {
                cLogger(`Handling create for entry`);
                // new entry
                this.apiCreateEntry(entry);
            }
        }
    }

    addComment(comment) {
        if (comment) {
            cLogger(comment);
            cLogger(`Handling create for comment`);


            this.apiCreateComment(comment);
        }
    }

    /*
    *  sockets -
    *  Handling data changes by other users
    *
     */

    handleMessage(message) {
        cLogger(message);
    }

    getCurrentUser() {
        return this.getLoggedInUserId();
    }

    handleDataChangedByAnotherUser(message) {
        cLogger(`Handling data change ${message.type} on object type ${message.objectType} made by user ${message.user}`);
        const changeUser = stateManager.findItemInState(this.config.stateNames.users,{id:message.user},isSame);
        let stateObj = message.data;
        cLogger(stateObj);
        // ok lets work out where this change belongs
        try {
            switch (message.type) {
                case "create": {
                    switch (message.objectType) {
                        case "Comment": {
                            // updating comments is more tricky as it is a sub object of the blog entry
                            // find the entry in question
                            const changedEntry = stateManager.findItemInState(this.config.stateNames.entries, {id: stateObj.commentOn}, isSame);
                            if (changedEntry) {
                                // add the new comment
                                changedEntry.Comments.push(stateObj);
                                // update the state
                                stateManager.updateItemInState(this.config.stateNames.entries, changedEntry, isSame);
                                // was this entry current open by the user?
                                const currentSelectedEntry = stateManager.getStateByName(this.config.stateNames.selectedEntry);
                                if (currentSelectedEntry) {
                                    if (currentSelectedEntry.id === changedEntry.id) {
                                        stateManager.setStateByName(this.config.stateNames.selectedEntry, changedEntry);
                                    }
                                }
                                let username = "unknown";
                                if (changeUser) {
                                    username = changeUser.username;
                                }
                                notifier.show(changedEntry.title,`${username} added comment ${stateObj.content}`);
                            }
                            break;
                        }
                        case "BlogEntry": {
                            // add the new item to the state
                            stateManager.addNewItemToState(this.config.stateNames.entries, stateObj);
                            let username = "unknown";
                            if (changeUser) {
                                username = changeUser.username;
                            }

                            notifier.show(stateObj.title,`${username} added new entry`);
                            break;
                        }
                        case "User": {
                            // add the new item to the state
                            stateManager.addNewItemToState(this.config.stateNames.users, stateObj);

                            notifier.show(stateObj.username,`${stateObj.username} has just registered.`,'message');
                            break;
                        }
                    }
                    break;
                }
                case "update": {
                    switch (message.objectType) {
                        case "BlogEntry": {
                            // update the item in the state
                            stateManager.updateItemInState(this.config.stateNames.entries, stateObj, isSame);
                            // the entry could be selected by this (different user) but that would only be for comments, which is not what changed, so we are done
                            break;
                        }
                    }
                    break;
                }
                case "delete": {
                    switch (message.objectType) {
                        case "Comment": {
                            // removing comments is more tricky as it is a sub object of the blog entry
                            // find the entry in question
                            const changedEntry = stateManager.findItemInState(this.config.stateNames.entries, {id: stateObj.commentOn}, isSame);
                            cLogger(changedEntry);
                            if (changedEntry) {
                                // remove the comment
                                let comments = changedEntry.Comments;
                                const foundIndex = comments.findIndex(element => element.id === stateObj.id);
                                if (foundIndex >= 0) {
                                    // remove comment from the array
                                    cLogger('Found comment in entry - removing');
                                    comments.splice(foundIndex, 1);
                                    cLogger(changedEntry);

                                    // update the state
                                    stateManager.updateItemInState(this.config.stateNames.entries, changedEntry, isSame);
                                    // was this entry current open by the user?
                                    const currentSelectedEntry = stateManager.getStateByName(this.config.stateNames.selectedEntry);
                                    if (currentSelectedEntry) {
                                        if (currentSelectedEntry.id === changedEntry.id) {
                                            stateManager.setStateByName(this.config.stateNames.selectedEntry, changedEntry);
                                        }
                                    }
                                }

                            }
                            break;
                        }
                        case "BlogEntry": {
                            cLogger(`Deleting Blog Entry with id ${stateObj.id}`);
                            const deletedEntry = stateManager.findItemInState(this.config.stateNames.entries,stateObj,isSame);
                            cLogger(deletedEntry);
                            if (deletedEntry) {
                                cLogger(`Deleting Blog Entry with id ${deletedEntry.id}`);
                                stateManager.removeItemFromState(this.config.stateNames.entries, deletedEntry, isSame);
                                // the current user could be accessing the comments in the entry that was just deleted
                                const currentSelectedEntry = stateManager.getStateByName(this.config.stateNames.selectedEntry);
                                if (currentSelectedEntry) {
                                    if (currentSelectedEntry.id === deletedEntry.id) {
                                        cLogger(`Deleted entry is selected by user, closing sidebars`);
                                        // ask the application to close any access to the comments
                                        this.applicationView.hideAllSideBars();
                                    }
                                }
                            }

                            break;
                        }
                    }
                    break;
                }
            }
        } catch (err) {
            cLogger(err);
        }

    }
}

const
    controller = new Controller();

export default controller;
