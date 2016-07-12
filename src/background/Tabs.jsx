import Message from 'common/Message';
//
// API to manage open tabs
//
class Tabs {
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
      callback(tabs.map(tab => {
        let { id, url, title, active, windowId, favIconUrl } = tab;

        favIconUrl = favIconUrl || (
          'chrome://favicon/' +
          tab.url.split('/').slice(0, 3).join('/')
        );
        return { id, url, title, active, windowId, favIconUrl };
      }));
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

export default new Tabs();
