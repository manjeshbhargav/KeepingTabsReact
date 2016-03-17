import React from 'react';
import TabsAction from 'popup/actions/Tabs';
import './index.less';

export default class TabsFilter extends React.Component {
  //
  // KeyUp handler.
  //
  keyup () {
    setTimeout((() => {
      // Perform filterTabs() action.
      TabsAction.filterTabs(this.refs.keyword.value);
    }), 50);
  }
  //
  // Render function.
  //
  render () {
    return (
      <input type="text"
        placeholder="Find tabs"
        ref="keyword"
        onKeyUp={::this.keyup}
        autoFocus={true}
      />
    );
  }
}
