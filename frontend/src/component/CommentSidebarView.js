import SidebarView from './SidebarView.js';
import stateManager from '../util/StateManagementUtil.js';
import isSame from '../util/EqualityFunctions.js';

import debug from 'debug';

const viewLogger = new debug('view:comments');

class CommentSidebarView extends SidebarView {
  constructor(applicationView, htmlDocument) {
    super(applicationView, htmlDocument, applicationView.state.ui.commentSideBar, applicationView.state.uiPrefs.commentSideBar);

    this.config = applicationView.state;

    // handler binding
    this.updateView = this.updateView.bind(this);

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
    const createdBy = stateManager.findItemInState(this.config.stateNames.users,{id: item.createdBy},isSame);
    return `${item.content} - ${createdBy.username}`;
  }

  getModifierForStateItem(name, item) {
    return 'inactive';
  }

  getSecondaryModifierForStateItem(name, item) {
    let result = 'inactive'
    if (item.createdBy === this.applicationView.controller.getLoggedInUserId()) {
      result = 'normal';
    }
    return result;
  }

  eventClickItem(event) {
    event.preventDefault();
    viewLogger(event.target);
    const id = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
    viewLogger(`Comment ${event.target.innerText} with id ${id} clicked`, 20);
    this.applicationView.handleDeleteComment(id);
  }


  updateView(name, newState) {
    viewLogger('Updating view');
    viewLogger(newState);
    if (newState && newState.Comments) {
      viewLogger(newState.Comments);
      this.createResultsForState(name, newState.Comments);
    }
  }

  getDragData(event) {}
}

export default CommentSidebarView;
