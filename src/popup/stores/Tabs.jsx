import AltSingleton from 'common/Alt';
import TabsAction from 'popup/actions/Tabs';

class TabsStore {
  //
  // Initialize store state and bind it to TabsAction.
  //
  constructor () {
    this.tabs = [];
    this.filteredTabs = [];
    this.bindActions(TabsAction);
  }
  //
  // Set tabs data.
  //
  onSetTabs (tabs) {
    this.tabs = tabs.map(tab => (tab));
    this.filteredTabs = tabs.map(tab => (tab));
  }
  //
  // Filter tabs data based on keyword.
  //
  onFilterTabs (keyword) {
    // Highlight matched pattern
    let highlight = (match) => {
      return (match ? `<strong>${match}</strong>` : match);
    };
    // Filter tabs based on keyword
    this.filteredTabs = this.tabs.map(tab => {
      let re = new RegExp(keyword, 'gi'),
          _tab = {...tab};
      // If title or url matches kwd, then show the tab.
      // Otherwise hide it.
      if (re.test(_tab.title) || re.test(_tab.url)) {
        _tab.title = _tab.title.replace(re, highlight);
        _tab.url = _tab.url.replace(re, highlight);
        delete _tab.nomatch;
      }
      else {
        _tab.nomatch = true;
      }
      // Return the updated tab.
      return _tab;
    });
  }
}

export default AltSingleton.createStore(TabsStore, 'TabsStore');
