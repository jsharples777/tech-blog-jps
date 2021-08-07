import debug from 'debug';
import browserUtil from '../util/BrowserUtil.js';

const avLogger = new debug('view')

export default class AbstractView {
  constructor(applicationView, htmlDocument, uiConfig, uiPrefs) {
    this.applicationView = applicationView;
    this.document = document;
    this.uiConfig = uiConfig;
    this.uiPrefs = uiPrefs;

    // state change listening
    this.stateChangedHandler = this.stateChangedHandler.bind(this);

    // event handlers
    this.eventStartDrag = this.eventStartDrag.bind(this);
    this.eventClickItem = this.eventClickItem.bind(this);
  }

  onDocumentLoaded() {
    throw new Error('implement in sub-class');
  }

  stateChangedHandler(name, value) {
    this.updateView(name, value);
  }

  /* abstract */
  updateView(name, newState) {
    throw new Error('Must be implemented in subclass');
  }

  eventStartDrag(event) {
    avLogger('Abstract View : drag start', 10);
    const data = JSON.stringify(this.getDragData(event));
    avLogger(data, 10);
    event.dataTransfer.setData(this.applicationView.state.ui.draggable.draggableDataKeyId, data);
  }

  eventClickItem(event) {
    throw new Error('Must be implemented in subclass');
  }

  getDragData(event) {
    throw new Error('Must be implemented in subclass');
  }

  getIdForStateItem(name, item) {
    throw new Error('Must be implemented in subclass');
  }

  getLegacyIdForStateItem(name, item) {
    throw new Error('Must be implemented in subclass');
  }

  getDisplayValueForStateItem(name, item) {
    throw new Error('Must be implemented in subclass');
  }

  getModifierForStateItem(name, item) {
    throw new Error('Must be implemented in subclass');
  }

  getSecondaryModifierForStateItem(name, item) {
    throw new Error('Must be implemented in subclass');
  }

  createResultsForState(name, newState) {
    avLogger('Abstract View : creating Results', 10);
    avLogger(newState);
    const domConfig = this.uiConfig.dom;
    // remove the previous items from list
    const viewEl = document.getElementById(domConfig.resultsId);
    browserUtil.removeAllChildren(viewEl);

    // add the new children
    newState.map((item, index) => {

      const childEl = this.document.createElement(domConfig.resultsElementType);
      browserUtil.addRemoveClasses(childEl,domConfig.resultsClasses);

      // add the key ids for selection
      childEl.setAttribute(domConfig.resultDataKeyId, this.getIdForStateItem(name, item));
      childEl.setAttribute(domConfig.resultLegacyDataKeyId, this.getLegacyIdForStateItem(name, item));
      childEl.setAttribute(domConfig.resultDataSourceId, domConfig.resultDataSourceValue);
      const displayText = this.getDisplayValueForStateItem(name, item);
      // add modifiers for patient state
      const modifier = this.getModifierForStateItem(name, item);
      const secondModifier = this.getSecondaryModifierForStateItem(name, item);
      switch (modifier) {
        case 'normal': {
          avLogger('Abstract View: normal item', 10);
          browserUtil.addRemoveClasses(childEl,domConfig.modifierClassNormal);
          if (domConfig.iconNormal !== '') {
            childEl.innerHTML = displayText + domConfig.iconNormal;
          } else {
            childEl.innerText = displayText;
          }

          switch (secondModifier) {
            case 'warning': {
              browserUtil.addRemoveClasses(childEl,domConfig.modifierClassNormal,false);
              browserUtil.addRemoveClasses(childEl,domConfig.modifierClassWarning,true);
              if (domConfig.iconWarning !== '') {
                childEl.innerHTML += domConfig.iconWarning;
              }
              break;
            }
            case 'normal': {}
          }

          break;
        }
        case 'active': {
          avLogger('Abstract View: active item', 10);
          browserUtil.addRemoveClasses(childEl,domConfig.modifierClassActive);
          if (domConfig.iconActive !== '') {
            childEl.innerHTML = displayText + domConfig.iconActive;
          } else {
            childEl.innerText = displayText;
          }
          switch (secondModifier) {
            case 'warning': {
              browserUtil.addRemoveClasses(childEl,domConfig.modifierClassNormal,false);
              browserUtil.addRemoveClasses(childEl,domConfig.modifierClassWarning,true);
              if (domConfig.iconWarning !== '') {
                childEl.innerHTML += domConfig.iconWarning;
              }
              break;
            }
            case 'normal': {}
          }
          break;
        }
        case 'inactive': {
          avLogger('Abstract View: inactive item', 10);
          browserUtil.addRemoveClasses(childEl,domConfig.modifierClassInactive);
          if (domConfig.iconInactive !== '') {
            childEl.innerHTML = displayText + domConfig.iconInactive;
          } else {
            childEl.innerText = displayText;
          }
          switch (secondModifier) {
            case 'warning': {
              if (domConfig.iconWarning !== '') {
                childEl.innerHTML += domConfig.iconWarning;
              }
              break;
            }
            case 'normal': {}
          }
          break;
        }
      }
      // add draggable actions
      if (domConfig.isDraggable) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', this.eventStartDrag);
      }
      // add selection actions
      if (domConfig.isClickable) {
        childEl.addEventListener('click', this.eventClickItem);
      }
      avLogger(`Abstract View: Adding child ${item.id}`);
      viewEl.appendChild(childEl);
    });
  }
}
