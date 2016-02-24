import React from 'react';
import classNames from 'classnames';
import TabsFilter from 'popup/views/TabsFilter';
import Tab from 'popup/views/Tab';
import './index.less';
//
// Component that renders list of open tabs.
//
export default class Tabs extends React.Component {
  //
  // Type checking the component's properties and state.
  //
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    state: React.PropTypes.shape({
      data: React.PropTypes.array
    })
  };
  //
  // Constructor.
  //
  constructor (props) {
    // Call base class constructor.
    super(props);
    // Set initial state.
    this.state = {data: []};
  }
  //
  // Highlight matched pattern.
  //
  highlight (match: string) {
    return (match ? `<strong>${match}</strong>` : match);
  }
  //
  // Update state based on filter keyword.
  //
  updateState (kwd: string) {
    this.setState({
      data: this.props.data.map(tab => {
        let re = new RegExp(kwd, 'gi'),
            _tab = {};
        // Make a copy of tab object.
        Object.keys(tab).forEach(key => {_tab[key] = tab[key]});
        // If title or url matches kwd, then show the tab.
        // Otherwise hide it.
        if (re.test(_tab.title) || re.test(_tab.url)) {
          _tab.title = _tab.title.replace(re, ::this.highlight);
          _tab.url = _tab.url.replace(re, ::this.highlight);
          delete _tab.nomatch;
        }
        else {
          _tab.nomatch = true;
        }
        // Return the updated tab.
        return _tab;
      })
    });
  }
  //
  // Set state to given data.
  //
  componentWillMount () {
    this.setState({data: this.props.data});
  }
  //
  // Render function.
  //
  render () {
    // View contains the list of open tabs.
    return (
      <div className="keepingtabs">
        <div className="tabsfilter">
          <TabsFilter onUpdate={::this.updateState}/>
        </div>
        <ul className="tabs">
          {this.state.data.map(tab => (<Tab data={tab} key={tab.id}/>))}
        </ul>
      </div>
    );
  }
}
