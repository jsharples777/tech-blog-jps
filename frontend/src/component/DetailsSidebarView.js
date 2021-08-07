import moment from 'moment';
import debug from 'debug';

import SidebarView from './SidebarView.js';
import stateManager from '../util/StateManagementUtil.js';

const viewLogger = new debug('view:details');

class DetailsSidebarView extends SidebarView {
  constructor(applicationView, htmlDocument) {
    super(applicationView, htmlDocument, applicationView.state.ui.entryDetailsSideBar, applicationView.state.uiPrefs.entryDetailsSideBar);

    this.config = applicationView.state;

    // handler binding
    this.updateView = this.updateView.bind(this);

    // field and form elements
    this.formEl = document.getElementById(this.uiConfig.dom.formId);
    this.titleEl = document.getElementById(this.uiConfig.dom.titleId);
    this.contentEl = document.getElementById(this.uiConfig.dom.contentId);
    this.changeOnEl = document.getElementById(this.uiConfig.dom.changedOnId);

    // register state change listening
    stateManager.addChangeListenerForName(this.config.stateNames.selectedEntry, this.stateChangedHandler);

    // listen for form submissions
    this.formEl.addEventListener('submit',this.eventClickItem);
  }

  getIdForStateItem(name, item) {
    return item.id;
  }

  getLegacyIdForStateItem(name, item) {
    return item.id;
  }

  eventClickItem(event) {
    event.preventDefault();
    viewLogger('Handling submit Details Sidebar View');
    viewLogger(event.target);
    let entry = stateManager.getStateByName(this.config.stateNames.selectedEntry);
    viewLogger(entry);
    entry.title = this.titleEl.value.trim();
    entry.content = this.contentEl.value.trim();
    entry.changedOn = parseInt(moment().format('YYYYMMDDHHmmss'));
    viewLogger(entry);
    this.titleEl.value = '';
    this.contentEl.value = '';
    this.changeOnEl.innerText = 'Last Changed On:';
    this.applicationView.handleUpdateEntry(entry);
  }


  updateView(name, newState) {
    viewLogger('Handling update of Details Sidebar View');
    viewLogger(newState);
    if (newState && newState.title) {
      this.titleEl.value = newState.title;
      this.contentEl.value = newState.content;
      this.changeOnEl.innerText = "Last Changed On: " + moment(newState.changedOn,'YYYYMMDDHHmmss').format('DD/MM/YYYY');
    }
    else {
      this.titleEl.value = '';
      this.contentEl.innerText = '';
      this.changeOnEl.innerText = "Last Changed On: ";
    }
  }

}

export default DetailsSidebarView;
