import React from 'react';
import './index.less';

export default class TabsFilter extends React.Component {
  //
  // Type checking properties.
  //
  static propTypes = {
    onUpdate: React.PropTypes.func.isRequired
  };
  //
  // KeyUp handler.
  //
  keyup () {
    setTimeout((() => {
      // Call onUpdate() to rerender only matching tabs.
      this.props.onUpdate(this.refs.keyword.value);
    }).bind(this), 50);
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
        autofocus
      />
    );
  }
}
