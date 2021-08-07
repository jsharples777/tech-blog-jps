import AbstractView from './AbstractView.js';

class SidebarView extends AbstractView {
  constructor(applicationView, htmlDocument, uiConfig, uiPrefs) {
    super(applicationView, htmlDocument, uiConfig, uiPrefs);
    // event handlers
    this.eventHide = this.eventHide.bind(this);
    this.eventShow = this.eventShow.bind(this);
  }

  onDocumentLoaded() { // this should be called once at startup
    // hide the side bar panel
    this.eventHide(null);

    // add the event listener for the close button
    const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
    const closeButtonEl = sidePanelEl.querySelector('.close');
    if (closeButtonEl) {
      closeButtonEl.addEventListener('click', this.eventHide);
    }
  }

  __showHide(newStyleValue) {
    const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
    switch (this.uiPrefs.view.location) {
      case 'left': {
        sidePanelEl.style.width = newStyleValue;
        break;
      }
      case 'right': {
        sidePanelEl.style.width = newStyleValue;
        break;
      }
      case 'bottom': {
        sidePanelEl.style.height = newStyleValue;
        break;
      }
      case 'top': {
        sidePanelEl.style.height = newStyleValue;
        break;
      }
    }
  }

  eventHide(event) {
    if (event) event.preventDefault();
    this.__showHide('0%');
  }

  eventShow(event) {
    this.__showHide(this.uiPrefs.view.expandedSize);
  }
}

export default SidebarView;
