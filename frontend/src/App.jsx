/* eslint "react/react-in-jsx-scope":"off" */
/* eslint "react/jsx-no-undef":"off" */
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import moment from 'moment';

import controller from './Controller.js';
import CommentSidebarView from "./component/CommentSidebarView";
import BlogEntry from "./component/BlogEntry.jsx";
import stateManager from "./util/StateManagementUtil";
import isSame from "./util/EqualityFunctions";
import DetailsSidebarView from "./component/DetailsSidebarView";
import socketManager from "./util/SocketManager";


const logger = debug('app');

class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            loggedInUserId: -1,
            entries: [],
            selectedEntry: {},
            applyUserFilter:false,
            stateNames: {
                users: 'users',
                entries: 'entries',
                selectedEntry: 'selectedEntry',
            },
            apis: {
                users: '/users',
                entries: '/blog',
                entry: '/blog',
                comment: '/comment',
                login: '/login',
            },
            ui: {
                alert: {
                    modalId: "alert",
                    titleId: "alert-title",
                    contentId: "alert-content",
                    cancelButtonId: "alert-cancel",
                    confirmButtonId: "alert-confirm",
                    closeButtonId: "alert-close",
                    hideClass: "d-none",
                    showClass: "d-block",
                },
                navigation: {
                    showMyEntriesId: 'navigationItemDashboard',
                    addNewEntryId: 'navigationItemAddNewEntry',
                    showAllEntriesId: 'navigationItemShowAll'
                },
                blogEntry: {},
                entryDetailsSideBar: {
                    dom: {
                        sideBarId: 'detailsSideBar',
                        formId: 'details',
                        titleId: 'title',
                        contentId: 'content',
                        changedOnId: 'changedOn',
                        resultDataKeyId: 'id',
                        isDraggable: false,
                        isClickable: true,
                    },
                },
                commentSideBar: {
                    dom: {
                        sideBarId: 'commentSideBar',
                        headerId: 'commentHeader',
                        resultsId: 'comments',
                        resultsElementType: 'button',
                        resultsElementAttributes: [
                            ['type', 'button'],
                        ],
                        resultsClasses: 'list-group-item my-list-item truncate-comment list-group-item-action',
                        resultDataKeyId: 'id',
                        resultLegacyDataKeyId: 'id',
                        modifierClassNormal: 'float-right list-group-item-primary text-right',
                        modifierClassInactive: 'float-left list-group-item-dark text-left',
                        modifierClassActive: 'list-group-item-primary',
                        modifierClassWarning: 'list-group-item-warning',
                        iconNormal: '<i class="fas fa-trash-alt"></i>',
                        iconInactive: '',
                        iconActive: '',
                        iconWarning: '',
                        isDraggable: false,
                        isClickable: true,
                        newFormId: "newComment",
                        commentId: "comment",
                        submitCommentId: "submitComment",
                    },
                },
            },
            uiPrefs: {
                navigation: {},
                blogEntry: {},
                commentSideBar: {
                    view: {
                        location: 'right',
                        expandedSize: '50%',
                    },
                },
                entryDetailsSideBar: {
                    view: {
                        location: 'left',
                        expandedSize: '35%',
                    },
                }
            },
            controller: {
                events: {
                    entry: {
                        eventDataKeyId: 'entry-id',
                    },
                },
                dataLimit: {
                },
            },
        };
        // event handlers
        this.cancelDelete = this.cancelDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);

        this.handleShowMyEntries = this.handleShowMyEntries.bind(this);
        this.handleSelectEntryComments = this.handleSelectEntryComments.bind(this);
        this.handleShowEditEntry = this.handleShowEditEntry.bind(this);
        this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);

        this.controller = controller.connectToApplication(this, window.localStorage);
        socketManager.connectToApplication(this);

    }

    getCurrentUser() {
        return controller.getLoggedInUserId();
    }

    handleDataChangedByAnotherUser(message) {
        logger('Received new data, passing to Controller');
        controller.handleDataChangedByAnotherUser(message);
    }

    alert(title,content) {
        this.titleEl.textContent = title;
        this.contentEl.textContent = content;
        this.modalEl.classList.remove(this.state.ui.alert.hideClass);
        this.modalEl.classList.add(this.state.ui.alert.showClass);
    }

    render() {
        logger("Rendering App");
        logger(this.state.entries);
        logger(this.state.applyUserFilter);

        let entriesToDisplay = this.state.entries;
        if (this.state.applyUserFilter && controller.isLoggedIn() && (controller.getLoggedInUserId() > 0)) {
            entriesToDisplay = entriesToDisplay.filter((entry) => {
                return (entry.createdBy === controller.getLoggedInUserId());
            });
        }
        const blog = entriesToDisplay.map((entry, index) =>
            <BlogEntry
                key={index}
                uiConfig={this.state.ui.blogEntry}
                uiPrefs={this.state.uiPrefs.blogEntry}
                entry={entry}
                showCommentsHandler={this.handleSelectEntryComments}
                editEntryHandler={this.handleShowEditEntry}
                deleteEntryHandler={this.handleDeleteEntry}
            />
        );
        return (
            <div className="Root row ml-1">
                {blog}
            </div>
        );
    }

    cancelDelete(event) {
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
    }

    confirmDelete(event) {
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
        let entryId = this.modalEl.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Delete Entry ${entryId}`);
        if (entryId) {
            // find the entry from the state manager
            entryId = parseInt(entryId);
            const entry = stateManager.findItemInState(this.state.stateNames.entries,{id:entryId},isSame);
            if (entry) {
                // delete the entry using the controller and remove the state manager
                controller.deleteEntry(entry);
                stateManager.removeItemFromState(this.state.stateNames.entries,entry,isSame);
            }
        }
    }

    componentDidMount() {
        logger('component Did Mount');

        // add the additional views and configure them
        this.commentView = new CommentSidebarView(this, document);
        this.commentView.onDocumentLoaded(); // reset the view state

        this.detailsView = new DetailsSidebarView(this,document);
        this.detailsView.onDocumentLoaded();

        // navigation item handlers
        document.getElementById(this.state.ui.navigation.addNewEntryId).addEventListener('click', this.handleAddEntry);
        document.getElementById(this.state.ui.navigation.showMyEntriesId).addEventListener('click', this.handleShowMyEntries);

        // alert modal dialog setup
        this.modalEl = document.getElementById(this.state.ui.alert.modalId);
        this.titleEl = document.getElementById(this.state.ui.alert.titleId);
        this.contentEl = document.getElementById(this.state.ui.alert.contentId);
        this.cancelBtnEl = document.getElementById(this.state.ui.alert.cancelButtonId);
        this.confirmBtnEl = document.getElementById(this.state.ui.alert.confirmButtonId);
        this.closeBtnEl = document.getElementById(this.state.ui.alert.closeButtonId);

        // event listeners for the confirm delete of entry
        this.cancelBtnEl.addEventListener('click',this.cancelDelete);
        this.confirmBtnEl.addEventListener('click',this.confirmDelete);
        this.closeBtnEl.addEventListener('click',this.cancelDelete);

        // ok lets try get things done
        this.controller.initialise();
    }

    hideAllSideBars() {
        this.commentView.eventHide(null);
        this.detailsView.eventHide(null);
    }

    handleShowMyEntries(event) {
        logger('Handling Show My Entries');
        this.hideAllSideBars();
        if (!controller.isLoggedIn()) {
            window.location.href = this.state.apis.login;
            return;
        }
        this.setState({applyUserFilter:true});
    }

    handleAllEntries(event) {
        logger('Handling Show All Entries');
        this.setState({applyUserFilter:false});
        this.hideAllSideBars();
    }

    handleAddEntry(event) {
        logger('Handling Add Entry');
        event.preventDefault();
        this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!controller.isLoggedIn()) {
            window.location.href = this.state.apis.login;
            return;
        }
        // find the current user
        let creator = stateManager.findItemInState(this.state.stateNames.users,
            {id: controller.getLoggedInUserId()},
             isSame);
        logger(creator);
        // create an empty entry
        let entry = {
            title: '',
            content: '',
            createdBy: creator.id,
            changedOn: parseInt(moment().format('YYYYMMDDHHmmss')),
            Comments: [],
            User: {
                id: creator.id,
                username: creator.username
            }
        }
        logger(entry);
        this.setState({selectedEntry:entry});
        stateManager.setStateByName(this.state.stateNames.selectedEntry,entry);
        this.detailsView.eventShow(event);
    }

    handleAddComment(event) {
        logger('Handling Add Comment');
        event.preventDefault();
        // get the comment element
        let commentEl = document.getElementById(this.state.ui.commentSideBar.dom.commentId);
        if (commentEl.value.trim().length === 0) return;

        // prevent anything from happening if we are not logged in
        if (!controller.isLoggedIn()) {
            window.location.href = this.state.apis.login;
            return;
        }
        // find the current user
        let creator = stateManager.findItemInState(this.state.stateNames.users,
            {id: controller.getLoggedInUserId()},
            isSame);
        logger(creator);
        // find the selected entry
        let entry = stateManager.getStateByName(this.state.stateNames.selectedEntry);
        if (entry && commentEl) {
            // create an empty comment
            let comment = {
                createdBy: creator.id,
                commentOn: entry.id,
                changedOn: parseInt(moment().format('YYYYMMDDHHmmss')),
                content: commentEl.value.trim()
            }
            commentEl.value = '';
            controller.addComment(comment);
            logger(comment);
        }
    }

    handleSelectEntryComments(event) {
        logger('Handling Select Entry Comments');
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Show Edit Entry ${entryId}`);
        if (entryId) {
            // find the entry from the state manager
            entryId = parseInt(entryId);
            const entry = stateManager.findItemInState(this.state.stateNames.entries,{id:entryId},isSame);
            logger(entry);
            if (entry) {
                // select the entry and open the details sidebar
                this.setState({selectedEntry:entry});
                stateManager.setStateByName(this.state.stateNames.selectedEntry,entry);
                this.commentView.eventShow(event);
            }
        }
    }

    handleShowEditEntry(event) {
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Show Edit Entry ${entryId}`);
        if (entryId) {
            // find the entry from the state manager
            entryId = parseInt(entryId);
            const entry = stateManager.findItemInState(this.state.stateNames.entries,{id:entryId},isSame);
            logger(entry);
            if (entry) {
                // select the entry and open the details sidebar
                this.setState({selectedEntry:entry});
                stateManager.setStateByName(this.state.stateNames.selectedEntry,entry);
                this.detailsView.eventShow(event);
            }
        }
    }

    handleDeleteEntry(event) {
        event.preventDefault();
        this.hideAllSideBars();
        let entryId = event.target.getAttribute(this.state.controller.events.entry.eventDataKeyId);
        logger(`Handling Delete Entry ${entryId}`);
        if (entryId) {
            this.modalEl.setAttribute(this.state.controller.events.entry.eventDataKeyId,entryId);
            // find the entry from the state manager
            entryId = parseInt(entryId);
            const entry = stateManager.findItemInState(this.state.stateNames.entries,{id:entryId},isSame);
            this.alert(entry.title,"Are you sure you want to delete this blog entry?")
        }
    }

    handleDeleteComment(id) {
        controller.deleteComment(id);
    }

    handleUpdateEntry(entry) {
        this.hideAllSideBars();
        controller.updateEntry(entry);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        logger('component Did Update');
    }
}

//localStorage.debug = 'app view controller api local-storage state-manager';
//localStorage.debug = 'app view controller state-manager view:comments view:blogentry view:details';
//localStorage.debug = 'app view controller socket';
debug.log = console.info.bind(console);

const element = <Root className="container-fluid justify-content-around"/>;

ReactDOM.render(element, document.getElementById('root'));
