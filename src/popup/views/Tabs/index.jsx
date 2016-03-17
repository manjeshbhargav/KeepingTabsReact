import React from 'react';
import classNames from 'classnames';
import Tab from 'popup/views/Tab';
import TabsFilter from 'popup/views/TabsFilter';
import TabsStore from 'popup/stores/Tabs';
import connectToStores from 'node_modules/alt-utils/lib/connectToStores';
import './index.less';
//
// Component that renders list of open tabs.
//
@connectToStores
export default class Tabs extends React.Component {
  //
  // Type checking the component's properties and state.
  //
  static propTypes = {
    filteredTabs: React.PropTypes.array
  };
  //
  // Subscribe to the tabs store.
  //
  static getStores () {
    return [ TabsStore ];
  }
  //
  // Get updated props from the tabs store.
  //
  static getPropsFromStores () {
    var filteredTabs = TabsStore.getState()['filteredTabs'];
    return { filteredTabs };
  }
  //
  // Render function.
  //
  render () {
    // View contains the list of open tabs.
    return (
      <div className="keepingtabs">
        <div className="tabsfilter">
          <TabsFilter/>
        </div>
        <ul className="tabs">
          {this.props.filteredTabs.map(tab => (<Tab data={tab} key={tab.id}/>))}
        </ul>
      </div>
    );
  }
}
