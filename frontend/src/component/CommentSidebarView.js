import SidebarView from './SidebarView.js';
import stateManager from '../util/StateManagementUtil.js';
import isSame from '../util/EqualityFunctions.js';

import debug from 'debug';
import controller from "../Controller";

const viewLogger = debug('view:comments');

class CommentSidebarView extends SidebarView {
    constructor(applicationView, htmlDocument) {
        super(applicationView, htmlDocument, applicationView.state.ui.commentSideBar, applicationView.state.uiPrefs.commentSideBar);

        this.config = applicationView.state;

        // handler binding
        this.updateView = this.updateView.bind(this);

        // elements
        this.commentHeaderEl = htmlDocument.getElementById(this.uiConfig.dom.headerId);
        this.newCommentFormEl = htmlDocument.getElementById(this.uiConfig.dom.newFormId);
        this.newCommentFormEl.addEventListener('submit', this.applicationView.handleAddComment);
        this.newCommentTextEl = htmlDocument.getElementById(this.uiConfig.dom.commentId);
        this.newCommentSubmitEl = htmlDocument.getElementById(this.uiConfig.dom.submitCommentId);

        // register state change listening
        stateManager.addChangeListenerForName(this.config.stateNames.selectedEntry, this.stateChangedHandler);
    }

    getIdForStateItem(name, item) {
        return item.id;
    }

    getLegacyIdForStateItem(name, item) {
        return item.id;
    }

    getDisplayValueForStateItem(name, item) {
        viewLogger(`Getting display value for comment ${item.id} with content ${item.content}`)
        // find the user for the item from the createdBy attribute
        const createdBy = stateManager.findItemInState(this.config.stateNames.users, {id: item.createdBy}, isSame);
        return `${item.content} - ${createdBy.username}         `;
    }

    getModifierForStateItem(name, item) {
        let result = 'inactive'
        if (item.createdBy === controller.getLoggedInUserId()) {
            result = 'normal';
        }
        return result;
    }

    getSecondaryModifierForStateItem(name, item) {
        return 'normal';
    }

    eventClickItem(event) {
        event.preventDefault();
        let entry = stateManager.getStateByName(this.config.stateNames.selectedEntry);

        viewLogger(event.target);
        let id = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        viewLogger(`Comment ${event.target.innerText} with id ${id} clicked`, 20);
        if (id) {
            id = parseInt(id);
            // find the comment in the selected entry
            let comment = entry.Comments.find((comment) => comment.id === id);
            if (comment) {
                viewLogger(`Comment created by ${comment.createdBy} and current user is ${controller.getLoggedInUserId()}`);
                // only able to delete if the comment was created by the current user
                if (comment.createdBy === controller.getLoggedInUserId()) {
                    this.applicationView.handleDeleteComment(parseInt(id));
                }
            }
        }
    }


    updateView(name, newState) {
        viewLogger('Updating view');
        viewLogger(newState);
        if (controller.isLoggedIn()) {
            this.newCommentTextEl.removeAttribute("readonly");
            this.newCommentSubmitEl.removeAttribute("disabled");
        } else {
            this.newCommentTextEl.setAttribute("readonly", true);
            this.newCommentSubmitEl.setAttribute("disabled", true);

        }

        if (newState && newState.Comments) {
            this.commentHeaderEl.innerHTML = newState.title;
            viewLogger(newState.Comments);
            this.createResultsForState(name, newState.Comments);
        }
    }

    getDragData(event) {
    }
}

export default CommentSidebarView;
