import AltSingleton from 'common/Alt';

class TabsAction {
  //
  // Set tabs data.
  //
  setTabs (tabs) {
    return tabs;
  }
  //
  // Filter tabs data based on keyword.
  //
  filterTabs (keyword) {
    return keyword;
  }
}

export default AltSingleton.createActions(TabsAction);
