import React from 'react';
import classNames from 'classnames';
import Message from 'common/Message';
import './index.less';
//
// Component that renders a link to a particular open tab.
//
export default class Tab extends React.Component {
  //
  // Type checking the component's properties.
  //
  static propTypes = {
    data: React.PropTypes.shape({
      favIconUrl: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title: React.PropTypes.string,
      active: React.PropTypes.boolean,
      windowId: React.PropTypes.number,
      id: React.PropTypes.number
    })
  };
  //
  // Focus on the open tab corresponding to this component.
  //
  focus () {
    Message.send('focusTab', this.props.data);
  }
  //
  // Render function.
  //
  render () {
    // Add 'active' class if it is the current focused tab.
    // Also, add the 'nomatch' class if this tab's title doesn't
    // match the search box value.
    let tabClasses = classNames({
      'tab': true,
      'active': this.props.data.active,
      'nomatch': this.props.data.nomatch
    });
    // View contains the favicon, title and url of the tab.
    return (
      <li>
        <ul className={tabClasses} onClick={::this.focus}>
          <li className="favicon">
            <img src={this.props.data.favIconUrl}/>
          </li>
          <li className="title">
            <span className="title"
              dangerouslySetInnerHTML={{__html: this.props.data.title}}
            />
            <br/>
            <span className="url"
              dangerouslySetInnerHTML={{__html: this.props.data.url}}
            />
          </li>
        </ul>
      </li>
    );
  }
}
