import { Message } from 'common/Message';
//
// API to manage open tabs
//
class _Tabs {
  //
  // Listen for requests to list of open tabs, and to
  // focus on a given tab
  //
  constructor () {
    Message.listen('getOpenTabs', (...args) => {
      let respond = typeof(args[0]) == 'function' ?
                    args[0] :
                    args[1];

      this.get(respond);
    });
    Message.listen('focusTab', tab => {
      this.focus(tab);
    });
  }
  //
  // Get the list of recently open tabs
  //
  get (callback: Function) {
    callback = callback || (tabs => {});
    chrome.tabs.query({}, tabs => {
      let _tabs = [];
      tabs.forEach(tab => {
        _tabs.push({
          id: tab.id,
          url: tab.url,
          title: tab.title,
          active: tab.active,
          windowId: tab.windowId,
          favIconUrl: tab.favIconUrl || (
            'chrome://favicon/' +
            tab.url.split('/').slice(0, 3).join('/')
          )
        });
      });
      callback(_tabs);
    });
  }
  //
  // Focus on a particular tab
  //
  focus (tab: Object) {
    chrome.windows.update(tab.windowId, {focused: true});
    chrome.tabs.update(tab.id, {active: true});
  }
}

export var Tabs = new _Tabs();
